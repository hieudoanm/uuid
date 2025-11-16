package utils

import (
	"encoding/json"
	"fmt"
)

// Status ...
type Status struct {
	Indicator string `json:"indicator"`
}

// Response ...
type Response struct {
	Status Status `json:"status"`
}

// PrintStatus ...
func PrintStatus(url string) {
	fmt.Println(url)
	responseByte, getError := Get(url, Options{})
	if getError != nil {
		fmt.Println("Error: ", getError)
		return
	}
	// Parse response
	var response Response
	jsonError := json.Unmarshal(responseByte, &response)
	if jsonError != nil {
		fmt.Println("Error: ", jsonError)
		return
	}
	fmt.Println("Success")
}
