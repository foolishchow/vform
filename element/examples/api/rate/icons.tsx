import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Rate({
    dataIndex: 'address',
    label: '其他Icon',
    props: {
      icons: [ChatRound, ChatLineRound, ChatDotRound],
      voidIcon: ChatRound,
      colors: ['#409eff', '#67c23a', '#FF9900']
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