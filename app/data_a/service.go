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
	result, err := s.repo.query(ctx)
	if err != nil {
		log.Println("error", err.Error())
		return nil, err
	}
	return result, nil
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
