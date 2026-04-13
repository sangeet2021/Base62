package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Connect() {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		log.Fatal("Database key is not set in dotenv")
	}

	var err error
	Pool, err = pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatal("Failed to connect to the database", err)
	}

	if err := Pool.Ping(context.Background()); err != nil {
		log.Fatal("Database is unreachable")
	}

	log.Println("connected to the database")
}
