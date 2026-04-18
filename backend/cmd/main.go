package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sangeet/base62/internal/auth"
	"github.com/sangeet/base62/internal/db"
)

func registerRoutes(r *gin.Engine){
	r.POST("/login", auth.LoginHandler)
	r.POST("/register", auth.RegisterHandler)

	api := r.Group("/api")
	api.Use(auth.AuthMiddleware())
	{
		api.GET("/me", auth.GetProfileHandler)
	}
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(".env file not found!")
	}

	db.Connect()

	r := gin.Default()

	registerRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on port %s", port)
	r.Run(":" + port)
}
