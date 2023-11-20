import moment from 'moment';




const IsDateStrReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

/**
 * 区分字符串和时间戳
 * @param {*} d
 */
function isDateStr(d, fmt) {
  let t = d;
  const f = fmt || 'YYYY-MM-DD';
  if (!IsDateStrReg.test(t)) {
    t = moment(Number(t)).format(f);
  }
  return moment(t, f);
}

function parseTime(time) {
  if (typeof(time) == "number") {
      var textStr = String(time);
      while (textStr.length > 10) {
        time = parseInt(time/1000);
        textStr = String(time);
      }
  }
  return moment(time, 'YYYY-MM-DD HH:mm')
}

/**
 * 把日期类型的初始值改为moment对象，支持字符串和时间戳，字符串‘-’分割
 * @param {*} item
 */
function transform(item) {
  switch (item.type) {
    case 'DatePicker':
      return item.initialValue && parseTime(item.initialValue);
    case 'RangePicker':
      return (
        Array.isArray(item.initialValue) && [
          parseTime(item.initialValue[0]),
          parseTime(item.initialValue[1])
        ]
      );
    default:
      return item.initialValue;
  }
}

export function Config(item) {
  const cfg = {
    initialValue: transform(item),
    rules: [
      {
        required: typeof item.required === 'boolean' ? item.required : false,
        message: `请输入${item.title}!`
      }
    ]
  };

  if (item.valuePropName !== undefined) {
    cfg.valuePropName = item.valuePropName
  }

  if (typeof item.validator === 'function') {
    cfg.rules.push({
      validator: item.validator
    });
  }

  return cfg;
}
