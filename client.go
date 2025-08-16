package main

import (
	"bytes"
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

const BASE_URL = "http://localhost:8080"

func getNotes() {
	response, err := http.Get(BASE_URL + "/notes")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var notes []note
	json.Unmarshal(responseData, &notes)
	fmt.Println(notes)

}

func getNote(id string) {
	response, err := http.Get(BASE_URL + "/notes/" + id)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	var data note
	json.Unmarshal(responseData, &data)
	fmt.Println(data)
}

func post() {
	postBody := note{ID: "2", Title: "Fun Fact", Body: "All vertebrates are fish"}
	bodyBytes, err := json.Marshal(&postBody)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	requestBody := bytes.NewReader(bodyBytes)

	resp, err := http.Post(BASE_URL+"/notes", "application?json", requestBody)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	s := string(body)
	fmt.Print("Posted: ")
	fmt.Println(s)
}

func deleteNote(id string) {
	// create delete request
	client := http.DefaultClient
	request, err := http.NewRequest(http.MethodDelete, BASE_URL+"/notes/"+id, nil)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	// send delete request
	response, err := client.Do(request)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var data note
	json.Unmarshal(responseData, &data)
	fmt.Println("Deleted: ", data)
}

func editNote(id string) {
	// simulate user inputed update
	updatedNote := note{ID: "1", Body: "Math=Done Science Orchestra"}
	bodyBytes, err := json.Marshal(&updatedNote)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	requestBody := bytes.NewReader(bodyBytes)

	// create patch request
	client := http.DefaultClient
	request, err := http.NewRequest(http.MethodPatch, BASE_URL+"/notes/"+id, requestBody)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	// send patch request
	response, err := client.Do(request)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var note note
	json.Unmarshal(responseData, &note)
	fmt.Println("Updated: ", note)

}

func main() {
	post()
	getNotes()
	getNote("2")
	deleteNote("2")
	getNotes()
	editNote("1")
	getNotes()
}
