package urls

import (
	"context"
	"crypto/rand"
	"math/big"
)

type LinkService struct {
	repo *LinkRepository
}

func NewLinkService(repo *LinkRepository) *LinkService {
	return &LinkService{
		repo: repo,
	}
}

func (s *LinkService) CreateShortLink(ctx context.Context, userID int, longURL string) (*Link, error) {
	shortID := generateBase62ID(6)

	newLink := &Link{
		UserID:  userID,
		LongURL: longURL,
		ShortID: shortID,
		Clicks:  0,
	}

	err := s.repo.CreateShortLink(ctx, newLink)
	if err != nil {
		return nil, err
	}

	return newLink, err
}

func generateBase62ID(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	result := make([]byte, length)
	for i := range result {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		result[i] = charset[num.Int64()]
	}
	return string(result)
}

func (s *LinkService) GetLongURL(ctx context.Context, shortID string) (*Link, error) {
	link, err := s.repo.GetByShortID(ctx, shortID)
	if err != nil {
		return nil, err
	}

	_ = s.repo.IncrementClickCount(ctx, shortID)

	return link, nil
}

func (s *LinkService) GetLinkDetails(ctx context.Context, linkID int, userID int) (*Link, error) {
	return s.repo.GetLinkByID(ctx, linkID, userID)
}
