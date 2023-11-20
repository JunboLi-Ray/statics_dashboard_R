import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { TypeConversion } from './utils/FormItemBuilder';
import { Config } from './utils/FormItemConfig';

export default class EasyForm extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    record: PropTypes.object,
    models: PropTypes.object,
  };

  renderFormItem = (item) => {
    var config = Config(item);
    return <Form.Item {...config} key={item.title} label={item.title} name={item.dataIndex}>
      {item.formRender?item.formRender:TypeConversion(item)}
    </Form.Item>
  };

  buildFields() {
    const { record, models } = this.props;
    const fields = [];
     models.columns.forEach(column => {
      if(column.formType !== undefined || column.formRender !== undefined) {
        var field = column;
        field.type = column.formType;
        field.formRender = column.formRender;
        fields.push(field)
      }
    });
    fields.forEach((field) => {
      if (record !== undefined) {
        field.initialValue = record[field.dataIndex];
      }
    });
    return fields;
  }

  render() {
    return <Form ref={this.formRef}>{this.buildFields().map((item) => this.renderFormItem(item))}</Form>;
  }
}
