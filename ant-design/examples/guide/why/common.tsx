import { Form, FormItem, Input, Button, Select, Row, Col, DatePicker } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form/interface'
import { computed, defineComponent, reactive, ref } from 'vue';
import { BaseInfo, getSexOpt } from './UserForm'
import type { FormExpose } from 'ant-design-vue/lib/form/Form';
import dayjs from "dayjs"

type RuleOption = { [key in keyof BaseInfo]?: Rule[] }
const Rules: RuleOption = {
  name: [
    { required: true, message: '请输入姓名' }
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
    const formRef = ref<FormExpose>()

    async function submitButton() {
      formRef.value?.validate()
    }

    const SexOpt = ref<any[]>()
    getSexOpt().then(opt => {
      SexOpt.value = opt
    })

    const brithday = computed<dayjs.Dayjs | undefined>({
      get() {
        const val = formData.brithday
        return val ? dayjs(Number(val) * 1000) : undefined
      },
      set(val) {
        formData.brithday = val ? val.toDate().getTime() / 1000 : undefined
      }
    })


    return () => {
      return <Form ref={formRef} model={formData}>
        <Row>
          <Col span={12}>
            <FormItem label="姓名" name="name" rules={Rules.name}>
              <Input v-model:value={formData.name} placeholder="请输入姓名" allowClear />
            </FormItem>
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <FormItem label="性别" name="sex" rules={Rules.sex}>
              <Select v-model:value={formData.sex} placeholder="请选择性别" allowClear options={SexOpt.value}  ></Select>
            </FormItem>
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <FormItem label="生日" name="brithday" rules={Rules.brithday}>
              <DatePicker v-model:value={brithday.value} placeholder="请选择生日" allowClear format='YYYY-MM-DD' />
            </FormItem>
          </Col>
        </Row>

        <FormItem >
          <Button type="primary" onClick={submitButton}>提交</Button>
        </FormItem>
      </Form>
    }
  }
})