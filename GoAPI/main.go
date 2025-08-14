package main

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type note struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

var notes = []note{
	{ID: "1", Title: "Homework", Body: "Math\nScience\nOrchestra"},
}

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

func noteByID(c *gin.Context) {
	id := c.Param("id")
	note, err := getNoteByID(id)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Note not found."})
	}
	c.IndentedJSON(http.StatusOK, note)
}

func getNoteByID(id string) (*note, error) {
	for i, n := range notes {
		if n.ID == id {
			return &notes[i], nil
		}
	}
	return nil, errors.New("note not found")
}

func getNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, notes)
}

func main() {
	router := gin.Default()
	router.POST("/notes", createNote)
	router.GET("/notes", getNotes)
	router.GET("/notes/:id", noteByID)
	router.Run("localhost:8080")
}
