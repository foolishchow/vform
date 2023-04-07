import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Slider({
    dataIndex: 'age',
    label: '垂直模式',
    props: {
      vertical: true,
      height: `200px`
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items}
        labelPosition="left"
        labelWidth="150px">
      </Form>
    }
  }
})