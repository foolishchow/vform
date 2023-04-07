import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'name',
    label: '请选择日期',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'YYYY-MM-DD'
    }
  })
  .Custom({
    label: '选中值',
    customRender(data) {
      if (!data.name) {
        return <span>未设置</span>
      }
      return <span>{data.name?.toString()}</span>
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