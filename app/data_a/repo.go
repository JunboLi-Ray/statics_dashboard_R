package data_a

import (
	"context"
	"fmt"
	"log"

	"database/sql"
	"github.com/JunboLi-Ray/R/app/constant"
	_ "github.com/go-sql-driver/mysql"
)

type Repo struct {
	db *sql.DB
}

func NewRepo() *Repo {
	dataSourceName := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v",
		constant.DBUserName,
		constant.DBPassword,
		constant.DBHost,
		constant.DBPort,
		constant.DBDataBaseBasic,
	)
	log.Println("db url", dataSourceName)
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		panic(err.Error())
	}
	return &Repo{
		db: db,
	}
}

func (r *Repo) insert(_ context.Context, obj *DataA) error {
	insertQuery := "INSERT INTO data_a (user_name, action, content) VALUES (?, ?, ?)"
	_, err := r.db.Exec(insertQuery, obj.UserName, obj.Action, obj.Content)
	return err
}

func (r *Repo) query(_ context.Context) ([]*DataA, error) {
	selectQuery := "SELECT * FROM data_a"
	rows, err := r.db.Query(selectQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// 遍历查询结果
	result := make([]*DataA, 0)
	for rows.Next() {
		obj := &DataA{}
		err = rows.Scan(&obj.ID, &obj.UserName, &obj.Action, &obj.Content, &obj.CreateTime, &obj.UpdateTime)
		if err != nil {
			return nil, err
		}
		result = append(result, obj)
	}
	return result, rows.Err()
}
