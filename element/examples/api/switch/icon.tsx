import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { Check, Close } from '@element-plus/icons-vue'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Switch({
    dataIndex: 'name',
    label: '',
    props: {
      activeIcon: <Check />,
      inactiveIcon: <Close />
    }
  })
  .Switch({
    dataIndex: 'age',
    label: '',
    props: {
      inlinePrompt: true,
      activeIcon: <Check />,
      inactiveIcon: <Close />
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