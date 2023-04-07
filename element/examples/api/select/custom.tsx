import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

const options = [{
  label1: '糕点',
  children1: [
    {
      value1: '选项1',
      label1: '黄金糕'
    }, {
      value1: '选项3',
      label1: '蚵仔煎'
    }, {
      value1: '选项4',
      label1: '龙须面'
    },
  ]
}, {
  label1: '其他',
  children1: [
    {
      value1: '选项2',
      label1: '双皮奶',
      disabled1: true
    }, {
      value1: '选项51',
      label1: '北京烤鸭'
    }
  ]
}]
const FormBuilder = useFormBuilder<BaseInfo>()
  .Select({
    dataIndex: 'name',
    label: '自定义option',
    option: options,
    optionConfig: {
      label: 'label1',
      value: 'value1',
      children: 'children1',
      disabled: 'disabled1'
    }
  })




export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      city: 3.7
    } as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items}
        labelWidth="100px">
      </Form>
    }
  }
})