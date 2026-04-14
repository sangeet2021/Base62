package auth

import(
	"context"

	"github.com/sangeet/base62/internal/db"
)

type User struct {
	ID int
	Email string
	Password string
	CreatedAt string
}

func createUser (email string, password string) error {
	query := `INSERT INTO users (email, password) VALUES ($1, $2)`
	_, err := db.Pool.Exec(context.Background(), query, email, password)
	return err
}

func getUserByEmail(email string) (*User, error) {
	query := `SELECT id, email, password, created_at FROM users WHERE email = $1`
	row := db.Pool.QueryRow(context.Background(), query, email)

	var user User
	err := row.Scan(&user.ID, &user.Email, &user.Password, &user.CreatedAt)
	if err!= nil{
		return nil, err
	}

	return &user, nil
}