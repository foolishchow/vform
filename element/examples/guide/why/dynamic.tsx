import { defineComponent, reactive, ref } from 'vue';
import { BaseInfo, getSexOpt } from './UserForm';
import { useFormBuilder, VFormInstance } from 'vform-element';
import { ElButton, ElFormItem } from 'element-plus';


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
      option: () => SexOpt.value,
      props: {
        placeholder: "请选择性别",
        clearable: true,
      },
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
      type: 'date'
    },
    rule: [
      { required: true, message: '请选择生日' }
    ],
    transfer: {
      get(formVal: any) {
        return formVal ? Number(formVal) * 1000 : undefined
      },
      set(compVal: any) {
        return compVal ? compVal / 1000 : undefined
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
        <ElFormItem >
          <ElButton type="primary" onClick={submitButton}>提交</ElButton>
        </ElFormItem>
      </Form>
    }
  }
})