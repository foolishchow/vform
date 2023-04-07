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
    },
    slots: {
      default({ node, data }) {
        return <>
          <span>{data.label}</span>
          {!node.isLeaf ? <span > ({data.children?.length}) </span> : null}
        </>
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