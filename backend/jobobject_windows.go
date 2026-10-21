//go:build windows

package main

// N17 — PROCESOS HIJOS EN WINDOWS.
//
// Matar solo al padre deja vivos a los nietos. Si a Seshat la cierran a lo
// bruto (Administrador de tareas, cierre de sesión, cuelgue), el apagado
// limpio ni siquiera corre.
//
// La solución nativa de Windows es un Job Object con
// JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE: todo proceso asignado al job —y todos los
// hijos que ese proceso cree después— muere cuando se cierra el ÚLTIMO handle
// del job. Como el único handle lo tiene Seshat, la muerte de Seshat (limpia o
// no) se lleva el árbol entero. El kernel lo garantiza; no depende de que
// nuestro código llegue a correr.
//
// Todo con stdlib: kernel32.dll cargada al vuelo, cero dependencias, cero CGO
// (el mismo patrón que fatal_windows.go). Si algo falla, se registra y la app
// sigue: un huérfano es molesto, no arrancar es fatal.

import (
	"log"
	"os"
	"sync"
	"syscall"
	"unsafe"
)

var (
	kernel32                     = syscall.NewLazyDLL("kernel32.dll")
	procCreateJobObjectW         = kernel32.NewProc("CreateJobObjectW")
	procSetInformationJobObject  = kernel32.NewProc("SetInformationJobObject")
	procAssignProcessToJobObject = kernel32.NewProc("AssignProcessToJobObject")
	procOpenProcess              = kernel32.NewProc("OpenProcess")
)

const (
	jobObjectExtendedLimitInformation = 9          // JOBOBJECTINFOCLASS
	limitKillOnJobClose               = 0x00002000 // JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE
	processSetQuota                   = 0x0100     // PROCESS_SET_QUOTA
	processTerminate                  = 0x0001     // PROCESS_TERMINATE
)

// Layout binario de JOBOBJECT_EXTENDED_LIMIT_INFORMATION (winnt.h). Los tamaños
// deben coincidir EXACTAMENTE con los del SDK: uintptr cubre SIZE_T/ULONG_PTR
// tanto en 32 como en 64 bits.
type ioCounters struct {
	ReadOperationCount  uint64
	WriteOperationCount uint64
	OtherOperationCount uint64
	ReadTransferCount   uint64
	WriteTransferCount  uint64
	OtherTransferCount  uint64
}

type jobBasicLimitInformation struct {
	PerProcessUserTimeLimit int64
	PerJobUserTimeLimit     int64
	LimitFlags              uint32
	MinimumWorkingSetSize   uintptr
	MaximumWorkingSetSize   uintptr
	ActiveProcessLimit      uint32
	Affinity                uintptr
	PriorityClass           uint32
	SchedulingClass         uint32
}

type jobExtendedLimitInformation struct {
	BasicLimitInformation jobBasicLimitInformation
	IoInfo                ioCounters
	ProcessMemoryLimit    uintptr
	JobMemoryLimit        uintptr
	PeakProcessMemoryUsed uintptr
	PeakJobMemoryUsed     uintptr
}

var (
	jobOnce   sync.Once
	jobHandle syscall.Handle
)

// ensureJob crea (una sola vez) el job anónimo con KILL_ON_JOB_CLOSE.
// Devuelve 0 si no se pudo: el llamante simplemente no asigna nada.
func ensureJob() syscall.Handle {
	jobOnce.Do(func() {
		h, _, err := procCreateJobObjectW.Call(0, 0) // sin atributos, sin nombre
		if h == 0 {
			log.Printf("job object: no pude crearlo (%v) — un proceso hijo podría quedar suelto al salir", err)
			return
		}
		var info jobExtendedLimitInformation
		info.BasicLimitInformation.LimitFlags = limitKillOnJobClose
		ok, _, err := procSetInformationJobObject.Call(
			h,
			uintptr(jobObjectExtendedLimitInformation),
			uintptr(unsafe.Pointer(&info)),
			unsafe.Sizeof(info),
		)
		if ok == 0 {
			log.Printf("job object: no pude configurar KILL_ON_JOB_CLOSE (%v)", err)
			_ = syscall.CloseHandle(syscall.Handle(h))
			return
		}
		jobHandle = syscall.Handle(h)
	})
	return jobHandle
}

// superviseProcess ata el proceso recién arrancado al job. Desde Windows 8 los
// jobs anidan, así que funciona aunque Seshat ya viva dentro de otro job (algo
// que hacen instaladores y algunas terminales).
func superviseProcess(p *os.Process) {
	if p == nil {
		return
	}
	job := ensureJob()
	if job == 0 {
		return
	}
	// os.Process no expone su HANDLE: se reabre por PID con los permisos justos.
	ph, _, err := procOpenProcess.Call(processSetQuota|processTerminate, 0, uintptr(p.Pid))
	if ph == 0 {
		log.Printf("job object: no pude abrir el proceso %d (%v)", p.Pid, err)
		return
	}
	defer syscall.CloseHandle(syscall.Handle(ph))
	if ok, _, err := procAssignProcessToJobObject.Call(uintptr(job), ph); ok == 0 {
		log.Printf("job object: no pude asignar el proceso %d (%v)", p.Pid, err)
		return
	}
	log.Printf("job object: proceso (PID %d) atado a Seshat — morirá con ella", p.Pid)
}

// closeProcessGroup cierra el handle del job en el apagado limpio: es la señal
// que dispara la matanza del árbol (padre + runners) inmediatamente, sin
// esperar a que el kernel recoja el proceso.
func closeProcessGroup() {
	job := jobHandle
	if job == 0 {
		return
	}
	jobHandle = 0
	_ = syscall.CloseHandle(job)
}
