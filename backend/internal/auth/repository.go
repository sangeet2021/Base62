package auth

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	db *pgxpool.Pool
}

type User struct {
	ID        int       `db:"id" json:"id"`
	Username  string    `db:"username" json:"username"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"-"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func NewUserRepository(db *pgxpool.Pool) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) createUser(ctx context.Context, email string, username string, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	query := `INSERT INTO users (email, password, username) VALUES ($1, $2, $3)`
	_, err = r.db.Exec(ctx, query, email, string(hashedPassword), username)
	return err
}

func (r *UserRepository) getUserByEmail(ctx context.Context, email string) (*User, error) {
	query := `SELECT id, username, email, password, created_at FROM users WHERE email = $1`
	row := r.db.QueryRow(ctx, query, email)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) getUserByUsername(ctx context.Context, username string) (*User, error) {
	query := `SELECT id, username, email, password, created_at FROM users WHERE username = $1`
	row := r.db.QueryRow(ctx, query, username)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) getUserById(ctx context.Context, userID int) (*User, error) {
	query := `SELECT id, username, email, password, created_at FROM users WHERE id = $1`
	row := r.db.QueryRow(ctx, query, userID)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.CreatedAt)
	if err != nil {
		log.Printf("Scan error: %v", err)
		return nil, err
	}
	return &user, nil
}
