import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'name',
    label: '周',
    props: {
      type: 'week',
      placeholder: '请选择日期',
      format: '[Week] ww',
    }
  })
  .DatePicker({
    dataIndex: 'brithday',
    label: '月',
    props: {
      type: 'month',
      placeholder: '请选择日期',
    }
  })
  .DatePicker({
    dataIndex: 'age',
    label: '年',
    props: {
      type: 'year',
      placeholder: '请选择日期',
    }
  })
  .DatePicker({
    dataIndex: 'city',
    label: 'Dates',
    props: {
      type: 'dates',
      placeholder: '请选择日期',
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