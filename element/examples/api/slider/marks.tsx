import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Slider({
    dataIndex: 'age',
    label: '显示标记',
    props: {
      range: true,
      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: {
          style: {
            color: '#1989FA',
          },
          label: '50%',
        },
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
        labelPosition="left"
        labelWidth="150px">
      </Form>
    }
  }
})