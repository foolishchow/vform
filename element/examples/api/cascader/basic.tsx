import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { Options } from './options'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '点击展开',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      options: Options
    }
  })
  .Cascader({
    dataIndex: 'choices',
    label: '悬浮展开',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      props: {
        expandTrigger: 'hover'
      },
      options: Options
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