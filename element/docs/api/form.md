# 表单

## 快速开始

`form` 完全继承了 `ElForm` 的所有方法

```ts
export interface VFormInstance<T extends object> {
  /**
  * 触发表单验证
  */
  validate: (callback?: FormValidateCallback | undefined) => FormValidationResult;
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void;
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void;
  obtainValidateFields: (props: Arrayable<FormItemProp>) => FormItemContext[];
  doValidateField: (props?: Arrayable<FormItemProp>) => Promise<boolean>;
  validateField: (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) => FormValidationResult;
  scrollToField: (prop: FormItemProp) => void;
}
```
<demo src="../../examples/api/create-form.tsx" 
  file="../../examples/types.ts" />

## 属性  

表单`Form`的属性完全继承了`element-plus`的[表单`Form`属性](https://element-plus.org/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7)   


额外的添加了如下属性

| 名称     |   类型    | 必传  | 默认值  | 描述                |
| :------- | :-------: | ----- | ------- | ------------------- |
| `form`   | `object`  | `yes` | -       | 表单绑定数据        |
| `items`  |  `Array`  | `yes` | -       | 描述，支持 markdown |
| `search` | `boolean` | `no`  | `false` | 是否为搜索表单      |
| `row`    | `number`  | `no`  | `3`     | 一行显示几列        |

```ts
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
```


