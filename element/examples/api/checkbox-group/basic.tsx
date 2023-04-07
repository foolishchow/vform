import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .CheckboxGroup({
    dataIndex: 'hobits',
    label: '爱好',
    options: [
      { label: '学习', value: 'study' },
      { label: '看书', value: 'reading' }
    ],
  })
  .CheckboxGroup({
    dataIndex: 'choices',
    label: '展示边框',
    border: true,
    options: [
      { label: '学习', value: 'study' },
      { label: '看书', value: 'reading' }
    ],
  })
  .CheckboxGroup({
    dataIndex: 'friuts',
    label: '禁用',
    options: [
      { label: '学习', value: 'study', disabled: true },
      { label: '看书', value: 'reading' }
    ],
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