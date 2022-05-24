import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Slider({
    dataIndex: 'name',
    label: '基础使用',
  })
  .Slider({
    dataIndex: 'age',
    label: '隐藏Tooltip',
    props: {
      showTooltip: false
    }
  })
  .Slider({
    dataIndex: 'address',
    label: '自定义Tooltip',
    props: {
      formatTooltip(val) {
        return val / 100
      }
    }
  })
  .Slider({
    dataIndex: 'city',
    label: '禁用',
    props: {
      disabled: true
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