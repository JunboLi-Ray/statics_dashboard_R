package restful

import (
	"github.com/JunboLi-Ray/R/app/data_a"
	"github.com/gin-gonic/gin"
)

func RunServer() {
	r := gin.Default()
	groups := r.Group("/api")
	initService(groups)
	_ = r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func initService(groups *gin.RouterGroup) {
	controllerA := data_a.NewController()
	controllerA.RegisterRoute(groups)
}
