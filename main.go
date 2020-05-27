package main

import (
	"context"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
)

var tpl = template.Must(template.ParseFiles("index.html"))

const port = ":8080"

// Page represents the page
type Page struct {
	Title   string
	Slides  []Slide
	Profile *Profile
}

// Slide represents an image slide
type Slide struct {
	Name string
	URL  string
}

// Profile represents a person
type Profile struct {
	Name       string
	Phone      string
	Profession string
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	images, err := ioutil.ReadDir("web/images")
	if err != nil {
		log.Fatal(err)
	}
	s := []Slide{}
	for _, i := range images {
		s = append(s, Slide{Name: i.Name(), URL: fmt.Sprintf("web/images/%s", i.Name())})
	}
	p := &Page{
		Title:  "The M Interior",
		Slides: s,
		Profile: &Profile{
			Name:       "Manoj Sharma",
			Phone:      "+91 9838741564",
			Profession: "Architect & Engineer",
		},
	}
	err = tpl.Execute(w, p)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	c := make(chan os.Signal)
	mux := http.NewServeMux()

	s := http.Server{
		Addr:    port,
		Handler: mux,
	}

	fs := http.FileServer(http.Dir("web"))
	mux.Handle("/web/", http.StripPrefix("/web/", fs))
	mux.HandleFunc("/", rootHandler)

	signal.Notify(c, os.Interrupt, os.Kill)
	go gracefulShutdown(c, &s)

	if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("failed to listen, err %v", err)
	}

}

func gracefulShutdown(c chan os.Signal, s *http.Server) {
	<-c
	log.Println("graceful shutdown begins...")
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := s.Shutdown(ctx); err != nil {
		log.Fatalf("gaceful shutdown failed, err %v", err)
	}
}
