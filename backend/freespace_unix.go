//go:build unix

package main

import "syscall"

// freeGB: espacio libre en la carpeta de datos, en GB. Devuelve 0 si no se
// puede saber (entonces no se bloquea nada: mejor seguir que impedirlo por
// no poder medir).
func freeGB(path string) float64 {
	var st syscall.Statfs_t
	if syscall.Statfs(path, &st) != nil {
		return 0
	}
	return float64(st.Bavail) * float64(st.Bsize) / 1e9
}
