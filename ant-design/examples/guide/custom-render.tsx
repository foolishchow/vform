import { defineComponent, reactive } from 'vue';
import { useFormBuilder, registerRender, dotGet, DeepKey, VBaseItem } from 'vform-ant-design';


export interface SimpleLabel<T extends object = any, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  preffix?: string
  suffix?: string
}
// @ts-ignore
declare module "vform-ant-design/lib/index" {
  export interface VFormItemTypes<T extends object = any, Key extends DeepKey<T> = DeepKey<T>> {
    LabelSimple: SimpleLabel<T, Key>
  }
}
// 由于是demo 上面的声明合并并不会生效
declare module "vform-ant-design/src/form/renders/index" {
  export interface VFormItemTypes<T extends object = any, Key extends DeepKey<T> = DeepKey<T>> {
    LabelSimple: SimpleLabel<T, Key>
  }
}
registerRender({
  type: 'LabelSimple',
  render(props, item) {
    return <span>
      <span style="color:#999">{item.preffix ?? undefined}</span>
      {dotGet(props.form, item.dataIndex)}
      {item.suffix ?? undefined}
    </span>
  }
})

const builder = useFormBuilder<any>()
  .LabelSimple({
    label: "名称",
    dataIndex: "name",
    preffix: "- prefix - ",
    suffix: '- suffix- '
  })
const formItems = builder.build()

export default defineComponent({
  neme: 'common-form',

  setup() {

    const formData = reactive<any>({
      name: '  this is custom '
    })
    const SDForm = builder.form()
    return () => {
      return <SDForm form={formData} items={formItems} row={1}>

      </SDForm>
    }
  }
})