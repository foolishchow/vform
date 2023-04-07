import type { ButtonProps, FormProps } from 'element-plus'
import type { VFormItem } from './renders';


export type isAny<Data> = 0 extends 1 & Data ? true : false;
export type DeepKey<Data> = Data extends (infer T)[] ? DeepKey<T> : 0 extends 1 & Data ? string : _DeepKeyOf<Data>
export type _DeepKeyOf<Data> = 0 extends 1 & Data
  ? never
  : Data extends (infer T)[]
  ? _DeepKeyOf<T>
  : Data extends object
  ? {
    [Key in keyof Data & (string | number)]: `${Key}` | `${Key}.${_DeepKeyOf<Data[Key]>}`
  }[keyof Data & (string | number)]
  : never;

export type DeepFlatten<Data, Keys extends string = DeepKey<Data>> = {
  [key in Keys]: Into<Data, key>
}

export type Into<T extends Record<keyof any, any>, Key extends string> =
  Key extends `${infer Start}.${infer End}` ?
  Start extends keyof T ? Into<T[Start], End> : never
  : Key extends keyof T ? T[Key] : never

export type InstanceOf<T> = T extends { new(...args: any[]): infer U } ? U : never

export type KeyOf<Data> = {
  [Key in keyof Data & (string | number)]: `${Key}`
}[keyof Data & (string | number)]

export type ValueOf<T> = T[keyof T];

export type VueProps<T> = T extends { new(...args: any): { $props: (infer Props) } } ? Omit<Props, 'ref'> : never

export interface _DynamicDef<T, Option> {
  (data: T): Option
}
export type DynamicDef<T, Option> =
  | Option
  | _DynamicDef<T, Option>;

export type VPropDef<T, Props> = DynamicDef<T, Partial<Props>>

export interface VTransfer<T, CompValue = any> {
  /**
   * 将 `表单的值` 转换为 `组件能够识别` 的值
   */
  get: (formVal: T) => (CompValue | null | undefined)
  /**
   * 将 `组件回填的值` 转换为 `表单需要` 的值
   */
  set: (compVal: CompValue) => (T | null | undefined)
}

export interface VFormButtonItem {
  /**
   * 按钮文字
   */
  text: string
  /**
   * 按钮触发的action
   */
  action: string
  /**
   * 自定义按钮props
   */
  props?: ButtonProps
}

export interface VFormProps<T extends object> extends Partial<Omit<FormProps, 'model'>> {
  /**
   * 是否是搜索表单
   *
   * 如果设置为`true` 会给form添加一个`is-search`的class
   *
   * @default false
   *
   */
  search?: boolean
  /**
   * 表单数据
   */
  form: T
  /**
   * 表单配置
   */
  items: VFormItem<T, any>[]
  /**
   * @default 3
   */
  row?: number
  /**
   * 按钮配置
   */
  buttons?: VFormButtonItem[]
  /**
   * 按钮点击事件
   * @param action
   */
  onButtonClick?(action: string): void
}











