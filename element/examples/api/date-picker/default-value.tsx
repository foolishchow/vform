import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'name',
    label: '请选择日期',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      defaultValue: new Date(2010, 9, 1)
    }
  })
  .DateRangePicker({
    dataIndex: 'age',
    label: '日期区间',
    dataIndexEnd: 'sex',
    props: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      defaultValue: [new Date(2010, 9, 1), new Date(2010, 10, 1)]
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