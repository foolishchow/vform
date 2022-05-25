import { ElButton, ElRow } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder, InstanceOf } from 'vform-element'
import type { BaseInfo } from '../types'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Input({
    dataIndex: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
      clearable: true
    },
    rule: [
      { required: true, message: '请输入姓名', trigger: 'never' }
    ]
  })
  .InputNumber({
    dataIndex: 'age',
    label: '年龄',
    props: {
      placeholder: '请输入年龄'
    },
    rule: [
      { required: true, message: '请输入年龄' }
    ]
  })
  .Select(() => {
    return {
      label: '性别',
      dataIndex: 'sex',
      option: [{
        value: 0,
        label: '女'
      }, {
        value: 1,
        label: '男'
      }],
      props: {
        placeholder: '请选择'
      }
    }
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    const formRef = ref<InstanceOf<typeof Form>>()

    async function validate() {
      if (!formRef.value) return
      await formRef.value.validate()
      console.info(formData)
    }

    function clearValidate() {
      formRef.value?.clearValidate()
    }
    return () => {
      return <Form row={1} ref={formRef} form={formData} items={items} labelWidth="120px" onValidate={(...args) => { console.info(args) }}>
        <ElRow>
          <ElButton type="primary" onClick={validate}>验证</ElButton>
          <ElButton onClick={clearValidate}>清除验证</ElButton>
        </ElRow>
      </Form>
    }
  }
})