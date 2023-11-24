package data_a

import (
	"github.com/gin-gonic/gin"
)

type Controller struct {
	service *Service
}

func NewController() *Controller {
	return &Controller{
		service: NewService(),
	}
}

func (controller *Controller) RegisterRoute(r gin.IRouter) {
	group := r.Group("/data_a")
	group.GET("/list", controller.getList)
	group.POST("/insert", controller.insert)
}

func (controller *Controller) getList(c *gin.Context) {
	resp, err := controller.service.GetList()
	if err != nil {
		c.JSON(400, nil)
		return
	}
	c.JSON(200, resp)
}

func (controller *Controller) insert(c *gin.Context) {
	c.JSON(200, nil)
}
