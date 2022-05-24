import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .CheckboxGroup({
    dataIndex: 'hobits',
    label: '兴趣爱好',
    options: [
      { name: '学习', value1: 'study' },
      { name: '看书', value1: 'reading' }
    ],
    optionConfig: {
      label: 'name',
      value: 'value1'
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