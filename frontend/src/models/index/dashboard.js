import React from 'react';
import {Bar, Column, Pie} from '@ant-design/charts';

export default class Chart1 extends React.Component {
  render() {
    const barData = [
      {year: '2015', value: 100},
      {year: '2016', value: 200},
      {year: '2017', value: 150},
      {year: '2018', value: 400},
      {year: '2019', value: 250},
    ];

    const pieData = [
      {type: '分类一', value: 27},
      {type: '分类二', value: 25},
      {type: '分类三', value: 18},
      {type: '分类四', value: 15},
      {type: '分类五', value: 10},
      {type: '其他', value: 5},
    ];

    const barConfig = {
      data: barData,
      xField: 'year',
      yField: 'value',
      height: 400,
    };

    const pieConfig = {
      data: pieData,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'inner',
        offset: '-30%',
        content: '{percentage}',
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{type: 'element-active'}],
    };

    const columnData = [
      {
        "product_type": "办公用品",
        "sex": "男",
        "order_amt": 8,
        "product_sub_type": "橡皮擦"
      },
      {
        "product_type": "办公用品",
        "sex": "男",
        "order_amt": 10,
        "product_sub_type": "书架"
      },
      {
        "product_type": "办公用品",
        "sex": "男",
        "order_amt": 20,
        "product_sub_type": "砚台"
      },
      {
        "product_type": "办公用品",
        "sex": "女",
        "order_amt": 13,
        "product_sub_type": "砚台"
      },
      {
        "product_type": "办公用品",
        "sex": "女",
        "order_amt": 21,
        "product_sub_type": "橡皮擦"
      },
      {
        "product_type": "办公用品",
        "sex": "女",
        "order_amt": 21,
        "product_sub_type": "书架"
      },
      {
        "product_type": "家电家具",
        "sex": "男",
        "order_amt": 13,
        "product_sub_type": "洗衣机"
      },
      {
        "product_type": "家电家具",
        "sex": "女",
        "order_amt": 2,
        "product_sub_type": "洗衣机"
      },
      {
        "product_type": "家电家具",
        "sex": "男",
        "order_amt": 5,
        "product_sub_type": "微波炉"
      },
      {
        "product_type": "家电家具",
        "sex": "男",
        "order_amt": 14,
        "product_sub_type": "电磁炉"
      },
      {
        "product_type": "家电家具",
        "sex": "女",
        "order_amt": 23,
        "product_sub_type": "微波炉"
      },
      {
        "product_type": "家电家具",
        "sex": "女",
        "order_amt": 23,
        "product_sub_type": "电磁炉"
      },
      {
        "product_type": "电子产品",
        "sex": "男",
        "order_amt": 33,
        "product_sub_type": "电脑"
      },
      {
        "product_type": "电子产品",
        "sex": "女",
        "order_amt": 4,
        "product_sub_type": "电脑"
      },
      {
        "product_type": "电子产品",
        "sex": "女",
        "order_amt": 23,
        "product_sub_type": "switch"
      },
      {
        "product_type": "电子产品",
        "sex": "男",
        "order_amt": 20.9,
        "product_sub_type": "switch"
      },
      {
        "product_type": "电子产品",
        "sex": "男",
        "order_amt": 5.9,
        "product_sub_type": "鼠标"
      },
      {
        "product_type": "电子产品",
        "sex": "女",
        "order_amt": 5.9,
        "product_sub_type": "鼠标"
      }
    ];
    const columnConfig = {
      data: columnData,
      xField: 'product_type',
      yField: 'order_amt',
      isGroup: true,
      isStack: true,
      seriesField: 'product_sub_type',
      groupField: 'sex',
    };

    return (
      <div>
        <div>
          <h2>柱状图</h2>
          <Bar {...barConfig} />
        </div>
        <div>
          <h2>饼图</h2>
          <Pie {...pieConfig} />
        </div>
        <div>
          <h2>饼图</h2>
          <Column {...columnConfig} />
        </div>
      </div>
    );
  }
}
