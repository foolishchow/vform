import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { ElFormItem, ElSelect } from 'element-plus'

const options = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶',
  disabled: true
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项51',
  label: '北京烤鸭'
}]
const FormBuilder = useFormBuilder<BaseInfo>()
  .Select(() => {
    const opt = ref<any[]>([])
    setTimeout(() => {
      opt.value = options
    })
    return {
      dataIndex: 'name',
      label: '选项禁用',
      option: () => {
        return opt.value
      }
    }
  })



export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      city: 3.7
    } as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build() as any
    return () => {
      return <Form row={1} form={formData} items={items}
        labelWidth="100px">
      </Form>
    }
  }
})