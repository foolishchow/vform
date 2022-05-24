import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from './types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Input({
    dataIndex: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
      clearable: true
    },
    rule: [
      { required: true, message: '请输入姓名1' }
    ]
  })
  .InputNumber({
    dataIndex: 'age',
    label: '年龄',
    props: {
      placeholder: '请输入年龄'
    },
    rule: [
      { required: true, message: '请输入年龄' }
    ]
  })
  .Select(() => {
    return {
      label: '性别',
      dataIndex: 'sex',
      option: [{
        value: 0,
        label: '女'
      }, {
        value: 1,
        label: '男'
      }],
      props: {
        placeholder: '请选择'
      }
    }
  })
  .Rate({
    label: '评分',
    dataIndex: 'rate',
    props: {
      allowHalf: true,
    }
  })

export default defineComponent({
  name: 'basic',
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={2} form={formData} items={items} labelWidth="120px"></Form>
    }
  }
})