package main

import (
	"errors"
	"net/http"
	"slices"

	"strings"

	"github.com/gin-gonic/gin"
)

type note struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

var notes = []note{
	{ID: "1", Title: "Homework", Body: "Math Science Orchestra"}}

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

func noteByTitle(c *gin.Context) {
	title := c.Param("title")
	note, err := getNoteByTitle(title, false)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Note not found."})
	}
	c.IndentedJSON(http.StatusOK, note)
}

func getNoteByTitle(title string, delete bool) (*note, error) {
	for i, n := range notes {
		if strings.EqualFold(n.Title, title) {
			foundNote := &notes[i]
			if delete {
				notes = slices.Delete(notes, i, i+1)
			}
			return foundNote, nil
		}
	}
	return nil, errors.New("note not found")
}

func getNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, notes)
}

func deleteNote(c *gin.Context) {
	title := c.Param("title")
	note, err := getNoteByTitle(title, true)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Note not found."})
	}
	c.IndentedJSON(http.StatusOK, note)
}

func editNote(c *gin.Context) {
	title := c.Param("title")

	var updatedNote note

	if err := c.BindJSON(&updatedNote); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

}

func main() {
	router := gin.Default()
	router.POST("/notes", createNote)
	router.GET("/notes", getNotes)
	router.GET("/notes/:title", noteByTitle)
	router.DELETE("/notes/:title", deleteNote)
	router.PATCH("/notes:title", editNote)
	router.Run("localhost:8080")
}
