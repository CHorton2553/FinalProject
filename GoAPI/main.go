package main

/*
import (
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
)
*/

type note struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

var notes = []note{}
