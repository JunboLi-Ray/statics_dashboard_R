package data_a

type Service struct {
	repo *Repo
}

func NewService() *Service {
	return &Service{
		repo: NewRepo(),
	}
}

func (s *Service) GetList() ([]*DataA, error) {
	return s.repo.query()
}
