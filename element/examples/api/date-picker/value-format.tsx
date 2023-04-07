import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'name',
    label: '默认',
    props: {
      type: 'date',
      placeholder: '请选择日期',
    }
  })
  .Custom({
    customRender(data) {
      if (!data.name) {
        return <span>未选择</span>
      }
      return <span>{data.name?.toString()}</span>
    }
  })
  .DatePicker({
    dataIndex: 'brithday',
    label: 'YYYY-MM-DD',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'YYYY-MM-DD'
    }
  })
  .Custom({
    label: '',
    customRender(data) {
      if (!data.brithday) {
        return <span>未选择</span>
      }
      return <span>{data.brithday?.toString()}</span>
    }
  })
  .DatePicker({
    dataIndex: 'age',
    label: 'Timestamp',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'x'
    }
  })
  .Custom({
    label: '',
    customRender(data) {
      console.info(`aaaa`)
      if (!data.age) {
        return <span>未选择</span>
      }
      return <span>{data.age?.toString()}</span>
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