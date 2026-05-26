package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sangeet/base62/internal/auth"
	"github.com/sangeet/base62/internal/urls"
)

func SetupRouter(authHandler *auth.AuthHandler, linkHandler *urls.LinkHandler) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://base62-seven.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.OPTIONS("/*any", func(c *gin.Context) {
    c.Status(204)
})

	r.POST("/login", authHandler.LoginHandler)
	r.POST("/register", authHandler.RegisterHandler)

	r.GET("/s/:short_id", linkHandler.RedirectHandler)

	api := r.Group("/api")
	api.Use(auth.AuthMiddleware())
	{
		api.GET("/me", authHandler.GetProfileHandler)
		api.POST("/shorten", linkHandler.ShortenHandler)
		api.GET("/links", linkHandler.GetAllLinksHandler)
		api.GET("/links/:id", linkHandler.GetLinkDetailsHandler)
	}
	return r
}
