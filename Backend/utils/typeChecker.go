package utils

import "strconv"

func IsValidFloat(value string) bool {
	// Attempt to parse the value as a float
	_, err := strconv.ParseFloat(value, 64)
	return err == nil
}
