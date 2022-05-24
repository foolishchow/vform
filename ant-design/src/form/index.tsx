import { Form } from 'ant-design-vue'
import { defineComponent, Ref, ref } from 'vue'
import type { VValidateTrigger, VFormProps, InstanceOf, DynamicDef } from './types'

type FormRef = InstanceOf<typeof Form> & FormExpose
import type { InternalNamePath, NamePath, ValidateOptions } from 'ant-design-vue/es/form/interface'
import type { FormExpose } from 'ant-design-vue/lib/form/Form'
import { VFormRender } from './form-render'
import { PropTypes } from '../utils/vue-types'
import { VFormItem } from './renders'


function validate(formRef: Ref<FormRef | undefined>, nameList?: NamePath[] | string, options?: ValidateOptions) {
  return new Promise(resolve => {
    if (formRef.value) {
      formRef.value.validate(nameList, options).then(
        () => {
          resolve(true)
        },
        () => {
          resolve(false)
        },
      )
    } else {
      resolve(true)
    }
  })
}


const VForm = defineComponent({
  name: 'VForm',
  inheritAttrs: false,
  props: {
    validateTrigger: PropTypes.any<VValidateTrigger | VValidateTrigger[]>(),
    search: PropTypes.bool,
    form: PropTypes.object<any>().isRequired,
    items: PropTypes.array().isRequired,
    row: PropTypes.number.def(3),
    buttons: PropTypes.array(),
    onButtonClick: PropTypes.func(),
  },
  setup(props, context) {
    const formRef = ref<FormRef>()
    context.expose({
      validate: (nameList?: NamePath[] | string, options?: ValidateOptions) => {
        return validate(formRef, nameList, options)
      },
      validateFields: (nameList?: NamePath[] | string, options?: ValidateOptions) => {
        return formRef.value?.validateFields(nameList, options)
      },
      getFieldsValue: (nameList?: true | InternalNamePath[]) => {
        return formRef.value?.getFieldsValue(nameList)
      },
      clearValidate(name?: NamePath) {
        return formRef.value?.clearValidate(name)
      },
      scrollToField: (name: NamePath, options?: {}) => formRef.value?.scrollToField(name, options),
    })

    return () => {

      return (
        <Form class={[`v-form v-form__row_${props.row} ${props.search ? 'is-search' : ''}`, context.attrs.class]} model={props.form} ref={formRef}
          v-slots={{
            default: () => {
              return <>
                {context.slots?.before?.()}
                {VFormRender(props as VFormProps<any>)}
                {context.slots?.default?.()}
              </>
            }
          }} />
      )
    }
  },
})

export interface VFormInstance<T extends object> extends Omit<FormExpose, 'validate'> {
  $: import('vue').ComponentInternalInstance
  $props: VFormProps<T> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps
  /**
   * 触发表单验证
   */
  validate(nameList?: NamePath[] | string, options?: ValidateOptions): Promise<boolean>
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
 * // 创建一个 `vForm<FormBean>` 组件，
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
 *              return <input v-model:value={data.searchText} />
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
 *
 * })
 * ```
 */
export interface VForm<T extends object> {
  new(props: VFormProps<T>): VFormInstance<T>
  /**
   * 触发表单验证
   */
  validate(nameList?: NamePath[] | string, options?: ValidateOptions): Promise<boolean>

  /**
   * 验证指定field
   */
  validateFields: (
    nameList?: NamePath[] | string,
    options?: ValidateOptions,
  ) => Promise<{
    [key: string]: any
  }>
  /**
   * 获取field value
   */
  getFieldsValue: (nameList?: InternalNamePath[] | true) => {
    [key: string]: any
  }
  /**
   * 清除表单验证
   */
  clearValidate(name?: NamePath): void
  /**
   * scroll to field
   */
  scrollToField: (name: NamePath, options?: {}) => void
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
/**
 * 创建子选项 只是为了类型提示
 * @param items
 * @returns
 */
export function createVFormOption<T extends object>(items: DynamicDef<T, VFormItem<T>>[]): DynamicDef<T, VFormItem<T>>[] {
  return items
}


