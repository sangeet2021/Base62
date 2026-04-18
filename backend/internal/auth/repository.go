package auth

import (
	"context"
	"log"
	"time"

	"github.com/sangeet/base62/internal/db"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int
	Username  string
	Email     string
	Password  string
	CreatedAt time.Time
}

func createUser(email string, username string, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	query := `INSERT INTO users (email, password, username) VALUES ($1, $2, $3)`
	_, err = db.Pool.Exec(context.Background(), query, email, string(hashedPassword), username)
	return err
}

func getUserByEmail(email string) (*User, error) {
	query := `SELECT id, username, email, password, created_at FROM users WHERE email = $1`
	row := db.Pool.QueryRow(context.Background(), query, email)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}

	return &user, nil
}

func getUserByUsername(username string) (*User, error) {
	query := `SELECT id, username, email, password, create_at FROM users WHERE username = $1`
	row := db.Pool.QueryRow(context.Background(), query, username)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}
	return &user, nil
}

func getUserById(userID int) (*User, error) {
	query := `SELECT id, username, email, password, created_at FROM users WHERE id = $1`
	row := db.Pool.QueryRow(context.Background(), query, userID)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}
	return &user, nil
}
