package urls

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ShortenRequest struct {
	LongURL string `json: "long_url" binding: "required,url"`
}

type LinkHandler struct {
	service *LinkService
}

func NewLinkHandler(service *LinkService) *LinkHandler {
	return &LinkHandler{
		service: service,
	}
}

// Short link handler
func (h *LinkHandler) ShortenHandler(c *gin.Context) {
	var req ShortenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL provided"})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not identified"})
		return
	}

	link, err := h.service.CreateShortLink(c.Request.Context(), userID.(int), req.LongURL)
	if err!=nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : "Could not shorten URL"})
		return
	}
	c.JSON(http.StatusCreated, link)
}

func (h *LinkHandler) RedirectHandler (c *gin.Context){
	shortID := c.Param("short_id")

	link, err := h.service.GetLongURL(c.Request.Context(), shortID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error" : "Link not found"})
		return
	}

	c.Redirect(http.StatusFound, link.LongURL)
}
