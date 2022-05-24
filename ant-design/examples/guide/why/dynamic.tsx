import { defineComponent, reactive, ref } from 'vue';
import { BaseInfo, getSexOpt } from './UserForm';
import { useFormBuilder, VFormInstance } from 'vform-ant-design';
import { Button, FormItem } from 'ant-design-vue';
import dayjs from "dayjs"

const FormConfig = useFormBuilder<BaseInfo>()
  .Input({
    label: "姓名",
    dataIndex: "name",
    props: {
      placeholder: "请输入姓名",
    },
    rule: [
      { required: true, message: '请输入姓名' },
    ]
  })
  .Column({})
  .Select(() => {
    const SexOpt = ref<{ label: string, value: number }[]>([])
    getSexOpt().then(opt => {
      SexOpt.value = opt
    })
    return {
      label: "性别",
      dataIndex: "sex",
      props: () => ({
        placeholder: "请选择性别",
        allowClear: true,
        options: SexOpt.value,
      }),
      rule: [
        { required: true, message: '请选择性别' }
      ]
    }
  })
  .Column({})
  .DatePicker({
    label: "生日",
    dataIndex: "brithday",
    props: {
      placeholder: "请选择生日",
    },
    rule: [
      { required: true, message: '请选择生日' }
    ],
    transfer: {
      get(formVal) {
        return formVal ? dayjs(Number(formVal) * 1000) : undefined
      },
      set(compVal) {
        return compVal ? compVal.toDate().getTime() / 1000 : undefined
      }
    }
  })

export default defineComponent({
  name: 'home-dynamic-form',
  setup() {
    const formData = reactive<BaseInfo>({})
    const formRef = ref<VFormInstance<BaseInfo>>()
    async function submitButton() {
      formRef.value?.validate()
      console.info(JSON.parse(JSON.stringify(formData)))
    }
    const options = FormConfig.build()
    const Form = FormConfig.form()
    return () => {
      return <Form ref={formRef} form={formData} items={options} row={2}>
        <FormItem >
          <Button type="primary" onClick={submitButton}>提交</Button>
        </FormItem>
      </Form>
    }
  }
})