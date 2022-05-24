import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption, ElRow, ElCol, ElDatePicker, FormRules } from 'element-plus';
import { computed, defineComponent, reactive, ref } from 'vue';
import { BaseInfo, getSexOpt } from './UserForm'
import { ValueOf } from 'element-plus/lib/components/table/src/table-column/defaults';
import { InstanceOf } from 'vform-element'

type RuleOption = { [key in keyof BaseInfo]?: ValueOf<FormRules> }
const Rules: RuleOption = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'never' }
  ],
  sex: [
    { required: true, message: '请选择性别' }
  ],
  brithday: [
    { required: true, message: '请选择生日' }
  ],
}


export default defineComponent({
  name: 'home-common-form',

  setup() {
    const formData = reactive<BaseInfo>({})
    const formRef = ref<InstanceOf<typeof ElForm>>()

    async function submitButton() {
      formRef.value?.validate()
    }

    const SexOpt = ref<any[]>()
    getSexOpt().then(opt => {
      SexOpt.value = opt
    })

    const brithday = computed<number | undefined>({
      get() {
        const val = formData.brithday
        return val ? Number(val) * 1000 : undefined
      },
      set(val) {
        formData.brithday = val ? val / 1000 : undefined
      }
    })


    return () => {
      return <ElForm ref={formRef} model={formData}>
        <ElRow>
          <ElCol span={12}>
            <ElFormItem label="姓名" prop="name" rules={Rules.name}>
              <ElInput v-model:modelValue={formData.name} placeholder="请输入姓名" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol span={12}></ElCol>
          <ElCol span={12}>
            <ElFormItem label="性别" prop="sex" rules={Rules.sex}>
              <ElSelect v-model:modelValue={formData.sex} placeholder="请选择性别" clearable  >
                {SexOpt.value?.map(option => <ElOption key={option.value} label={option.label} value={option.value} />)}
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol span={12}></ElCol>
          <ElCol span={12}>
            <ElFormItem label="生日" prop="brithday" rules={Rules.brithday}>
              <ElDatePicker v-model:modelValue={brithday.value} placeholder="请选择生日" clearable format='YYYY-MM-DD' valueFormat='x' />
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElFormItem >
          <ElButton type="primary" onClick={submitButton}>提交</ElButton>
        </ElFormItem>
      </ElForm>
    }
  }
})