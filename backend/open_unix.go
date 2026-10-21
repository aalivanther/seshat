//go:build !windows

package main

// openWindows solo existe en Windows; fuera, el camino normal (open/xdg-open)
// es el bueno.
func openWindows(string) bool { return false }
