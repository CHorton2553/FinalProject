package main

import (
	"errors"
	"net/http"
	"slices"

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

func noteByID(c *gin.Context) {
	id := c.Param("id")
	note, err := getNoteByID(id, false)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Note not found."})
	}
	c.IndentedJSON(http.StatusOK, note)
}

func getNoteByID(id string, delete bool) (*note, error) {
	for i, note := range notes {
		if note.ID == id {
			foundNote := &notes[i]
			if delete {
				deletedNote := notes[i]
				notes = slices.Delete(notes, i, i+1)
				return &deletedNote, nil
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
	id := c.Param("id")
	note, err := getNoteByID(id, true)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Note not found."})
	}
	c.IndentedJSON(http.StatusOK, note)
}

func editNote(c *gin.Context) {
	id := c.Param("id")
	// bind json input to updatedNote
	var updatedNote note
	if err := c.BindJSON(&updatedNote); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// find the note int notes by id
	for i, note := range notes {
		if note.ID == id {
			// Update the fields that were provided in request
			if updatedNote.Title != "" {
				notes[i].Title = updatedNote.Title
			}
			if updatedNote.Body != "" {
				notes[i].Body = updatedNote.Body
			}
			c.JSON(http.StatusOK, notes[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Note not found"})
}

func main() {
	router := gin.Default()
	router.POST("/notes", createNote)
	router.GET("/notes", getNotes)
	router.GET("/notes/:id", noteByID)
	router.DELETE("/notes/:id", deleteNote)
	router.PATCH("/notes/:id", editNote)
	router.Run("localhost:8080")
}
