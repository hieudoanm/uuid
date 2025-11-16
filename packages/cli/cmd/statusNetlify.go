// Package cmd ...
package cmd

import (
	"mark/utils"

	"github.com/spf13/cobra"
)

// netlifyCmd represents the statusVercel command
var netlifyCmd = &cobra.Command{
	Use:   "netlify",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Check Status
		var url string = "https://www.netlifystatus.com/api/v2/status.json"
		utils.PrintStatus(url)
	},
}

func init() {
	statusCmd.AddCommand(netlifyCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// netlifyCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// netlifyCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
