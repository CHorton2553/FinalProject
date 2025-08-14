package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type note struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}

const BASE_URL = "https://localhost:8080"

func get() {
	response, err := http.Get(BASE_URL + "/notes")
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	var notes []note
	json.Unmarshal(responseData, &notes)
	fmt.Println(notes)
}

func main() {
	get()
}
