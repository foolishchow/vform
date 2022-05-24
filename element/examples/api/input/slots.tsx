import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { ElButton, ElIcon } from 'element-plus'
import { Calendar, Search } from '@element-plus/icons-vue'
const FormBuilder = useFormBuilder<BaseInfo>()
  .Input({
    dataIndex: 'age',
    label: '年龄',
    props: {
      placeholder: '使用 prefix 和 suffix 命名的插槽',
    },
    slots: {
      prepend() {
        return "Http://"
      },
      append() {
        return ".com"
      }
    }
  })
  .Input({
    dataIndex: 'name',
    label: '年龄',
    props: {
      placeholder: '使用 prefix 和 suffix 命名的插槽',
    },
    slots: {
      prepend() {
        return <ElButton icon="search" />
      }
    }
  })



export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items} labelWidth="150px">
      </Form>
    }
  }
})