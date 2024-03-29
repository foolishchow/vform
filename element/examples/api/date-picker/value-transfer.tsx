import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'age',
    label: '默认',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'x'
    },
    transfer: {
      get(formVal) {
        if (formVal) {
          return Number(formVal) * 1000
        }
        return null
      },
      set(compVal) {
        if (compVal) {
          return Number(compVal) / 1000
        }
        return null
      }
    }
  })
  .Custom({
    customRender(data) {
      if (!data.age) {
        return <span>未选择</span>
      }
      return <span>{data.age?.toString()}</span>
    }
  })
  .DateRangePicker({
    colSpan: 2,
    dataIndex: 'brithday',
    dataIndexEnd: 'sex',
    label: 'YYYY-MM-DD',
    props: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'x'
    },
    transfer: {
      get(formVal) {
        if (formVal) {
          return Number(formVal) * 1000
        }
        return null
      },
      set(compVal) {
        if (compVal) {
          return Number(compVal) / 1000
        }
        return null
      }
    }
  })
  .Custom({
    label: '',
    colSpan: 2,
    customRender(data) {
      if (!data.brithday) {
        return <span>未选择</span>
      }
      return <span>{data.brithday?.toString()} --  {data.sex?.toString()}</span>
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={2} form={formData} items={items}
        labelWidth="120px">
      </Form>
    }
  }
})