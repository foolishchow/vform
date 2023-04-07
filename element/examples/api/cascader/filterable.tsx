import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { Options } from './options'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '单选',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      filterable: true,
      options: Options
    }
  })
  .Cascader({
    dataIndex: 'choices',
    label: '多选',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      filterable: true,
      options: Options,
      props: {
        multiple: true
      }
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items} >
      </Form>
    }
  }
})