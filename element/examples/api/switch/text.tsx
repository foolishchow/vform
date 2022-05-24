import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Switch({
    dataIndex: 'name',
    label: '',
    props: {
      activeText: 'Pay by month',
      inactiveText: 'Pay by year'
    }
  })
  .Switch({
    dataIndex: 'age',
    label: '',
    props: {
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
      activeText: 'Pay by month',
      inactiveText: 'Pay by year'
    }
  })
  .Switch({
    dataIndex: 'address',
    label: '',
    props: {
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
      inlinePrompt: true,
      activeText: '是',
      inactiveText: '否'
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