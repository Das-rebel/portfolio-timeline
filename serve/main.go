package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	bucket := "subhajit-das-portfolio"
	path := r.URL.Path
	if path == "/" {
		path = "/index.html"
	}
	path = strings.TrimSuffix(path, "/")

	url := fmt.Sprintf("https://storage.googleapis.com/%s%s", bucket, path)
	
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("User-Agent", "Mozilla/5.0 (compatible; CloudRun)")
	
	client := &http.Client{Timeout: 10 * http.Second}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode >= 400 {
		// Fallback to index.html
		indexUrl := fmt.Sprintf("https://storage.googleapis.com/%s/index.html", bucket)
		resp, err = client.Get(indexUrl)
		if err != nil {
			http.Error(w, "Service unavailable", 503)
			return
		}
	}
	defer resp.Body.Close()

	for k, v := range resp.Header {
		if k == "Content-Type" || k == "Cache-Control" || k == "Content-Length" {
			w.Header().Set(k, v[0])
		}
	}
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("Listening on :8080")
	http.ListenAndServe(":8080", nil)
}
