package api

import (
	"encoding/json"
	"fmt"
	"mark/utils"
)

// Generate sends the prompt to the gaslit API and returns the AI's reply.
func Generate(model string, prompt string) (string, error) {
	url := "https://gaslit.vercel.app/api/generate"

	// Construct the request payload
	payload := map[string]interface{}{
		"model": model,
		"messages": []map[string]string{
			{"role": "user", "text": prompt},
		},
	}

	// Use your existing Post function
	var options utils.Options = utils.Options{}
	options.Body = payload
	body, err := utils.Post(url, options)
	if err != nil {
		return "", err
	}

	// Parse JSON response
	var response struct {
		Output string `json:"output"`
	}

	if err := json.Unmarshal([]byte(body), &response); err != nil {
		return "", fmt.Errorf("failed to parse response JSON: %w", err)
	}

	return response.Output, nil
}
