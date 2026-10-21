package main

import "sync"

// onceReset devuelve un sync.Once virgen: los tests necesitan poder regenerar
// la llave con otra carpeta de datos.
func onceReset() sync.Once { return sync.Once{} }
