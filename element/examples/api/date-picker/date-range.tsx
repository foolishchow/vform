import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DateRangePicker({
    dataIndex: 'name',
    label: '日期区间',
    dataIndexEnd: 'age',
    props: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    },
    slots: {
      "range-separator"() {
        return <span>----</span>
      }
    }
  })
  .DateRangePicker({
    label: '时间区间',
    dataIndex: 'progress',
    dataIndexEnd: 'friuts',
    props: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  })
  .DateRangePicker({
    label: '月份区间',
    dataIndex: 'brithday',
    dataIndexEnd: 'city',
    props: {
      type: 'monthrange',
      startPlaceholder: '开始月份',
      endPlaceholder: '结束月份'
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