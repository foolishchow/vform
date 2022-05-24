import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-ant-design'

type FormBean = {
  name: string
}

const builder = useFormBuilder<FormBean>()
  .Input({
    label: '用户名',
    dataIndex: 'name',
    props: {
      placeholder: "请输入用户名"
    }
  })


export default defineComponent({
  setup() {
    const formData = reactive<FormBean>({} as any)
    const Form = builder.form()
    const FormOptions = builder.build()

    return () => {
      return <Form form={formData} items={FormOptions} />
    }
  }
})