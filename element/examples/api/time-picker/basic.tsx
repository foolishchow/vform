import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .TimePicker({
    dataIndex: 'name',
    label: '请选择日期',
    props: {
      placeholder: '请选择日期',
    }
  })
  .TimePicker({
    dataIndex: 'age',
    label: '请选择日期',
    props: {
      placeholder: '请选择日期',
      arrowControl: true
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items}
        labelWidth="100px">
      </Form>
    }
  }
})