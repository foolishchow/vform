import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-element'

import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .InputNumber({
    dataIndex: 'age',
    label: '年龄',
    props: {
      placeholder: '请输入年龄',
      min: 1,
      step: 0.1,
      precision: 2,
      max: 10,
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items} >
      </Form>
    }
  }
})