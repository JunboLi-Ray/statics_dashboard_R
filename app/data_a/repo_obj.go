package data_a

import "time"

type DataA struct {
	ID         int64
	UserName   string
	Action     string
	Content    string
	CreateTime time.Time
	UpdateTime time.Time
}
