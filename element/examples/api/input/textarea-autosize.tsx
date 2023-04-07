import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Input({
    dataIndex: 'name',
    label: '姓名',
    props: {
      type: 'textarea',
      autosize: true,
      placeholder: '请输入姓名',
      clearable: true
    }
  })
  .Input({
    dataIndex: 'age',
    label: 'age',
    props: {
      type: 'textarea',
      autosize: { minRows: 2, maxRows: 4 },
      placeholder: '请输入姓名',
      clearable: true
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items} labelWidth="150px">
      </Form>
    }
  }
})