import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const sleep = (time = 1000) => {
  return new Promise<void>((r) => {
    setTimeout(() => {
      r()
    }, time)
  })
}
const FormBuilder = useFormBuilder<BaseInfo>()
  .Switch(() => {

    const loading = ref(false)
    const beforeChange = async () => {
      loading.value = true
      await sleep()
      loading.value = false
      return true
    }

    return {
      dataIndex: 'name',
      label: '开关',
      props: () => {
        return {
          loading: loading.value,
          beforeChange
        }
      }
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