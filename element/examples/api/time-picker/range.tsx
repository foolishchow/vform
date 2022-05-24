import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .TimePicker({
    dataIndex: 'name',
    dataIndexEnd: 'age',
    label: '请选择日期',
    props: {
      isRange: true,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
    }
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      name: new Date(2016, 9, 10, 8, 40),
      age: new Date(2016, 9, 10, 9, 40)
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