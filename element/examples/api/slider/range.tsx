import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Slider({
    dataIndex: 'name',
    label: '范围选择',
    props: {
      range: true,
      showStops: true,
      max: 10
    }
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      // name: [4, 8]
    } as any)
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