package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type note struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

var notes = []note{}

// create note with new note data
func createNote(c *gin.Context) {
	var newNote note
	// bind the JSON data of new note to newNote
	if err := c.BindJSON(&newNote); err != nil {
		return
	}
	// add to notes
	notes = append(notes, newNote)
	c.IndentedJSON(http.StatusCreated, newNote)
}

// function: get note
func getNote(c *gin.Context)

// function: create folder

// function: add to library

// function: get library

func main() {
	router := gin.Default()
	router.POST("/notes", createNote)
}
