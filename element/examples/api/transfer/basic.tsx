import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

interface Option {
  key: number
  label: string
  disabled: boolean
}

const generateData = (): Option[] => {
  const data: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const FormBuilder = useFormBuilder<BaseInfo>()
  .Transfer({
    dataIndex: 'name',
    label: '',
    props: {
      titles: ['Source', 'Target'],
      buttonTexts: ['To left', 'To right'],
      format: {
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      },
      data: generateData()
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