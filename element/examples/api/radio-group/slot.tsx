import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .RadioGroup({
    dataIndex: 'hobits',
    label: '爱好',
    options: [
      { label: '学习', value: 'study' },
      { label: '看书', value: 'reading' }
    ],
    slots: {
      option(item) {
        return <span>{item.label}-{item.value}</span>
      }
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