package fonts

const ansiReset = "\033[0m"

func Bold(text string) string {
	return "\033[1m" + text + ansiReset
}

// Italic returns the input string in italic (may not work on all terminals).
func Italic(text string) string {
	return "\033[3m" + text + ansiReset
}

// Underline returns the input string underlined.
func Underline(text string) string {
	return "\033[4m" + text + ansiReset
}
