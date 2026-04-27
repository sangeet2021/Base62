package urls

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct {
	db *pgxpool.Pool
}

type Link struct {
	ID        int       `db:"id" json:"id"`
	UserID    int       `db:"user_id" json:"user_id"`
	LongURL   string    `db:"long_url" json:"long_url"`
	ShortID   string    `db:"short_id" json:"short_id"`
	Clicks    int       `db:"clicks" json:"clicks"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func (r *LinkRepository) CreateShortLink(ctx context.Context, link *Link) error {
	query := `INSERT INTO links(long_url, short_id, clicks) VALUES ($1, $2, $3, $4)`
	_, err := r.db.Exec(ctx, query, link.UserID, link.LongURL, link.ShortID, link.Clicks)

	return err
}
