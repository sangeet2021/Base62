package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestBody struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

func LoginHandler(c *gin.Context){
	var req RequestBody
	if err := c.ShouldBindJSON(&req); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error" : "Invalid request format"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H {
		"message" : "Login Succesful",
		"email" : req.Email,
	})
}