package data_a

import (
	"github.com/gin-gonic/gin"
)

type Controller struct {
}

func NewController() *Controller {
	return &Controller{}
}

func (controller *Controller) RegisterRoute(r gin.IRouter) {
	group := r.Group("/data_a")
	group.GET("/list", controller.getList)
	group.POST("/insert", controller.insert)
}

func (controller *Controller) getList(c *gin.Context) {
	resp := gin.H{
		"data": []DataAStruct{
			{
				FieldA:      "数据1",
				FieldB:      "数据1",
				FieldC:      "数据1",
				FieldD:      "数据1",
				CreatedTime: "2023-10-01 14:00:00",
			},
			{
				FieldA:      "数据2",
				FieldB:      "数据2",
				FieldC:      "数据2",
				FieldD:      "数据2",
				CreatedTime: "2023-10-01 14:00:00",
			},
			{
				FieldA:      "数据3",
				FieldB:      "数据3",
				FieldC:      "数据3",
				FieldD:      "数据3",
				CreatedTime: "2023-10-01 14:00:00",
			},
		},
	}
	c.JSON(200, resp)
}

func (controller *Controller) insert(c *gin.Context) {
	c.JSON(200, nil)
}
