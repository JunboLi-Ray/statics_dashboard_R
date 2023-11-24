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
	group.POST("/add", controller.add)
}

func (controller *Controller) getList(c *gin.Context) {
	resp, err := controller.service.GetList(c.Request.Context())
	if err != nil {
		c.JSON(400, nil)
		return
	}
	c.JSON(200, resp)
}

func (controller *Controller) add(c *gin.Context) {
	obj := &DataA{}
	err := c.ShouldBindJSON(obj)
	if err != nil {
		c.JSON(400, nil)
		return
	}
	err = controller.service.Add(c.Request.Context(), obj)
	if err != nil {
		c.JSON(400, nil)
		return
	}
	c.JSON(200, nil)
}
