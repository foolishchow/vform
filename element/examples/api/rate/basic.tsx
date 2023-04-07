import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Rate({
    dataIndex: 'name',
    label: '评价',
  })




export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      city: 3.7
    } as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items}
        labelWidth="100px">
      </Form>
    }
  }
})