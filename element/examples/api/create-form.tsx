import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from '../../src/'
import type { BaseInfo } from '../types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Input({
    dataIndex: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
      clearable: true
    },
    rule: [
      { required: true, message: '请输入姓名', trigger: 'never' }
    ]
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={2} form={formData} items={items} labelWidth="120px">
      </Form>
    }
  }
})