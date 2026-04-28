package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sangeet/base62/internal/auth"
	"github.com/sangeet/base62/internal/db"
)

func registerRoutes(r *gin.Engine, authHandler *auth.AuthHandler) {
	r.POST("/login", authHandler.LoginHandler)
	r.POST("/register", authHandler.RegisterHandler)

	api := r.Group("/api")
	api.Use(auth.AuthMiddleware())
	{
		api.GET("/me", authHandler.GetProfileHandler)
	}
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables from the system")
	}

	db.Connect()

	userRepo := auth.NewUserRepository(db.Pool)

	authHandler := auth.NewAuthHandler(userRepo)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://base62-seven.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	registerRoutes(r, authHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on port %s", port)
	r.Run(":" + port)
}
