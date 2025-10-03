/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"bufio"
	"fmt"
	"log"
	"mark/api"
	"mark/data"
	"mark/fonts"
	"os"
	"strings"
	"time"

	"github.com/AlecAivazis/survey/v2"
	markdown "github.com/MichaelMure/go-term-markdown"
	"github.com/briandowns/spinner"
	"github.com/spf13/cobra"
)

// genAiCmd represents the gen command
var genAiCmd = &cobra.Command{
	Use:   "gen",
	Short: "Generate a response from a selected AI model",
	Long: `The 'gen' command allows you to interactively select an AI model
and enter a prompt. The tool will then send your prompt to the selected
model and display the AI-generated response in your terminal.

This command supports a wide range of models such as DeepSeek, Gemini,
LLaMA, Gemma, Phi, and more — ideal for quickly testing model output
from the command line.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Step 1: Choose model
		var model string

		modelPrompt := &survey.Select{
			Message:  "Choose a model:",
			Options:  data.Models,
			Default:  "gemini-2.5-flash",
			PageSize: 1,
		}
		if err := survey.AskOne(modelPrompt, &model); err != nil {
			log.Fatalf("Failed to choose model: %v", err)
		}

		// Step 2: Enter prompt
		fmt.Printf("%s %s ", fonts.Green("?"), fonts.Bold("Enter a prompt:"))

		var prompt string
		// To support full-line input with spaces:
		scanner := bufio.NewReader(os.Stdin)
		prompt, err := scanner.ReadString('\n')
		if err != nil {
			log.Fatalf("Failed to read input: %v", err)
		}

		prompt = strings.TrimSpace(prompt)

		// Spinner starts
		s := spinner.New(spinner.CharSets[14], 100*time.Millisecond) // Use desired style
		s.Suffix = " Generating response ..."
		s.Start()

		// Generate response
		output, err := api.Generate(model, prompt)

		// Stop spinner
		s.Stop()

		if err != nil {
			log.Fatalf("Error getting response: %v", err)
		}

		// Output result
		fmt.Println("")
		fmt.Println("Response:")
		fmt.Println("")

		rendered := markdown.Render(output, 80, 6)
		fmt.Println(string(rendered))
	},
}

func init() {
	rootCmd.AddCommand(genAiCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// genAiCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// genAiCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
