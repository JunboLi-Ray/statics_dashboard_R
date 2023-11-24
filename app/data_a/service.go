package data_a

import (
	"context"
	"errors"
	"log"
)

type Service struct {
	repo *Repo
}

func NewService() *Service {
	return &Service{
		repo: NewRepo(),
	}
}

func (s *Service) GetList(ctx context.Context) ([]*DataA, error) {
	return s.repo.query(ctx)
}

func (s *Service) Add(ctx context.Context, obj *DataA) error {
	err := paramCheck(obj)
	if err != nil {
		return err
	}
	log.Println("Add", *obj)
	return s.repo.insert(ctx, obj)
}

func paramCheck(obj *DataA) error {
	if obj.UserName == "" || obj.Action == "" || obj.Content == "" {
		return errors.New("param error")
	}
	return nil
}
