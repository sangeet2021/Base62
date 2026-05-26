package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sangeet/base62/internal/auth"
	"github.com/sangeet/base62/internal/db"
	"github.com/sangeet/base62/internal/router"
	"github.com/sangeet/base62/internal/urls"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables from the system")
	}

	pool, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	userRepo := auth.NewUserRepository(pool)
	authHandler := auth.NewAuthHandler(userRepo)

	linkRepo := urls.NewLinkRepository(pool)
	linkService := urls.NewLinkService(linkRepo)
	linkHandler := urls.NewLinkHandler(linkService)

	r := router.SetupRouter(authHandler, linkHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on port %s", port)
	r.Run("0.0.0.0:" + port)
}
