import { ElForm, FormInstance, FormItemContext, FormValidateCallback, FormValidationResult } from 'element-plus'
import { defineComponent, Ref, ref, SetupContext } from 'vue'
import type { VFormProps } from './types'
import { SDFormRender } from './form-render'
import { PropTypes } from '../utils/vue-types'
import { omit } from 'lodash-es'
import { Arrayable } from 'element-plus/es/utils'
import { FormItemProp } from 'element-plus/lib/components'
type FormRef = FormInstance


function exposeMethods(formRef: Ref<FormRef | undefined>, context: SetupContext) {
  context.expose({
    validate(...args: any[]) {
      return formRef.value?.validate(...args)
    },
    addField(field: FormItemContext) {
      return formRef.value?.addField(field)
    },
    removeField(field: FormItemContext) {
      return formRef.value?.removeField(field)
    },
    resetFields(props?: Arrayable<FormItemProp> | undefined) {
      return formRef.value?.resetFields(props)
    },
    clearValidate(props?: Arrayable<FormItemProp> | undefined) {
      return formRef.value?.clearValidate(props)
    },
    get isValidatable() {
      return formRef.value?.isValidatable
    },
    obtainValidateFields(props: Arrayable<FormItemProp>) {
      return formRef.value?.obtainValidateFields(props)
    },
    doValidateField(props?: Arrayable<FormItemProp>) {
      return formRef.value?.doValidateField(props)
    },
    validateField(props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) {
      return formRef.value?.validateField(props, callback)
    },
    scrollToField(prop: FormItemProp) {
      return formRef.value?.scrollToField(prop)
    }
  })
}
const FormProps = {
  search: PropTypes.bool,
  form: PropTypes.object<any>().isRequired,
  items: PropTypes.array().isRequired,
  row: PropTypes.number.def(3),
  buttons: PropTypes.array(),
  onButtonClick: PropTypes.func(),
}
const FormPropsNames = Object.keys(FormProps)
const VForm = defineComponent({
  name: 'VForm',
  inheritAttrs: false,
  props: FormProps,
  setup(props, context) {
    const formRef = ref<FormRef>()

    exposeMethods(formRef, context)

    return () => {
      const formProps = omit(context.attrs, FormPropsNames)
      return (
        <ElForm {...formProps}
          class={[`v-form v-form__row_${props.row} ${props.search ? 'is-search' : ''}`, context.attrs.class]}
          model={props.form} ref={formRef}
          v-slots={{
            default: () => {
              return <>
                {context.slots?.before?.()}
                {SDFormRender(props as VFormProps<any>)}
                {context.slots?.default?.()}
              </>
            }
          }} />
      )
    }
  },
})

export interface VFormInstance<T extends object> {
  $: import('vue').ComponentInternalInstance
  $props: VFormProps<T> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & {
    onValidate?: ((prop: FormItemProp, isValid: boolean, message: string) => any) | undefined;
  }
  /**
  * 触发表单验证
  */
  validate: (callback?: FormValidateCallback | undefined) => FormValidationResult;
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void;
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void;
  isValidatable: import("vue").ComputedRef<boolean>;
  obtainValidateFields: (props: Arrayable<FormItemProp>) => FormItemContext[];
  doValidateField: (props?: Arrayable<FormItemProp>) => Promise<boolean>;
  validateField: (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) => FormValidationResult;
  scrollToField: (prop: FormItemProp) => void;
}

/**
 * 一个泛型VForm组件
 *
 * ```typescript
 * import { defineComponent, reactive } from 'vue'
 * // 这是 搜索form的类型
 * interface FormBean {
 *    searchText?: string
 *    searchType?: 1|2|3
 * }
 * // 创建一个 `VForm<FormBean>` 组件，
 * // 这一步只是为了给 `VForm` 添加泛型
 * const SearchForm = createVForm<FormBean>()
 * const Page = defineComponent({
 *    setup(){
 *      const search = reactive({
 *        data: {} as FormBean
 *      })
 *      const SearchFormOptions = createVFormOption<FormBean>([
 *        {
 *            dataIndex: 'searchText',
 *            label: '关键字',
 *            customRender(data) {
 *              return <input v-model:modalValue={data.searchText} />
 *            },
 *        }
 *      ])
 *      return ()=>{
 *        return <SearchForm
 *                  items={SearchFormOptions}
 *                  form={search.data}
 *                />
 *      }
 *    }
 * })
 * ```
 */
export interface VForm<T extends object> {
  new(props: VFormProps<T>): VFormInstance<T>
}
/**
 * 创建一个具有类型提示的form组件
 *
 *```typescript
 * interface FormBean {
 *    searchText: string
 *    searchType: 1|2|3
 * }
 * const SearchForm = createVForm<FormBean>()
 * ```
 *
 * @template T
 * @demo 你可以这样创建一个指定类型的Form组件

 * @returns VForm<T>
 */
export function createVForm<T extends object>(): VForm<T> {
  return VForm as any
}


