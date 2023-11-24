package data_a

import (
	"database/sql"
	"fmt"
	"github.com/JunboLi-Ray/R/app/constant"
)

type Repo struct {
	db *sql.DB
}

func NewRepo() *Repo {
	db, err := sql.Open("mysql",
		fmt.Sprintf("username:password@tcp(hostname:port)/database_name",
			constant.DBUserName,
			constant.DBPassword,
			constant.DBHost,
			constant.DBPort,
			constant.DBDataBaseBasic,
		),
	)
	if err != nil {
		panic(err.Error())
	}
	return &Repo{
		db: db,
	}
}

func (r *Repo) insert(obj *DataA) error {
	insertQuery := "INSERT INTO data_a (user_name, action, content) VALUES (?, ?, ?)"
	_, err := r.db.Exec(insertQuery, obj.UserName, obj.Action, obj.Content)
	return err
}

func (r *Repo) query() ([]*DataA, error) {
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
