# statics_dashboard_R
base on antd charts、yarn、golang、postgres，data insert and custom show platform

antd charts: https://ant-design-charts.antgroup.com/zh/examples/flowchart/basic/#basic


## Install

#### backend
* golang: https://go.dev/dl/
* <code>postgres</code>

#### web
* node: https://nodejs.org/en
* <code>yarn</code>


## Run

#### backend
* <code>go build cmd/r-restapi/main.go</code>
* <code>./main</code>

#### web
* <code>cd frontend</code>
* <code>export NODE_OPTIONS="--openssl-legacy-provider"</code>
* <code>yarn start</code>