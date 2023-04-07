import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Switch({
    dataIndex: 'name',
    label: '开关',
  })
  .Switch({
    dataIndex: 'age',
    label: '背景色',
    props: {
      activeColor: "#13ce66",
      inactiveColor: '#ff4949'
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