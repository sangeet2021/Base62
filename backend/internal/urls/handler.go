package urls

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ShortenRequest struct {
	LongURL string `json: "long_url" binding: "required,url"`
}