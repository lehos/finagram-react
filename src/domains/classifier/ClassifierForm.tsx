import React from 'react'
import {Form, Input, Checkbox, Button} from 'antd'

import {Classifier} from '.'
import {Spacer} from '@/ui';

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    offset: 8
  }
}

type Props = {
  onOk: () => any
}

export function ClassifierForm(props: Props) {
  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item label="Название ед. ч.">
          <Input placeholder="Название в единственном числе" />
        </Form.Item>

        <Form.Item label="Название множ. ч.">
          <Input placeholder="Название во множественном числе" />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Checkbox>Разделять по типу операции</Checkbox>
          <div>
            <Checkbox>Использовать в переводах</Checkbox>
          </div>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
        </Form.Item>

        <div style={{textAlign: "right"}}>
          <Button>
            Отмена
          </Button>

          <Spacer inline width={10} />

          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </div>
      </Form>
    </div>
  )
}
