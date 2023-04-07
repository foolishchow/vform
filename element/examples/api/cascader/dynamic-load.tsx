import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

let id = 0
const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '动态加载',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map((item) => ({
              value: ++id,
              label: `Option - ${id}`,
              leaf: level >= 2,
            }))
            // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
            resolve(nodes)
          }, 1000)
        },
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