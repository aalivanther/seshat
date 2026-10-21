//go:build !windows

package main

import "os"

// En macOS y Linux un hijo directo muere con la sesión. Estos no-op dejan
// el mismo código compilable en los dos sistemas.
func superviseProcess(_ *os.Process) {}

func closeProcessGroup() {}
