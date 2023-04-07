# 表单元素

| 名称        | 类型              | 动态  | 必传  | 默认值 | 描述                                                     |
| :---------- | :---------------- | :---: | :---: | :----: | :------------------------------------------------------- |
| `dataIndex` | `string`          |   -   | `yes` |   -    | 绑定表单数据的`key`<br>关联到`modelValue`与`props`字段上 |
| `label`     | `string`          | `yes` | `yes` |   -    | 描述，支持 markdown                                      |
| `rule`      | `Array`           | `yes` | `no`  |   -    | 表单配置项验证规则，`element-plus` 的表单验证规则        |
| `vIf`       | `(data)=>boolean` |   -   | `no`  |  `3`   | 是否渲染                                                 |
| `props`     | `object`          | `yes` | `no`  |   -    | 表单元素属性<br>不同的表单元素有不同的属性类型           |

```ts
export interface BaseItem<
  T extends object, 
  Key extends DeepKey<T> = DeepKey<T>
>{
  /**
   * 占用多个区域
   */
  colSpan?: number
  /**
   * 对应的字段
   */
  dataIndex: Key
  /**
   * label #1
   */
  label: DynamicDef<T, string> 
  /**
   * 验证规则
   */
  rule?: DynamicDef<T, ValidationRule[]>
  /**
   * 是否渲染
   */
  vIf?: DynamicDef<T, boolean>
}
```
::: info DynamicDef
  所有`DynamicDef`声明的类型，都是可以动态计算的类型
  ```ts
  export interface _DynamicDef<T, Option> {
    (data: T): Option
  }
  /**
   * @param {T} 表单form的数据，即传入`From`的`form`属性
   */
  export type DynamicDef<T, Option> =
    | Option
    | _DynamicDef<T, Option>;
  ```
:::

::: info 关于属性配置
我们只是对表单元素的属性配置进行了**微调**，以实现快速配置渲染   
若您在使用中遇到相关配置问题，您可以优先遵循 [element-plus](https://element-plus.org/zh-CN/component/form.html) 官方配置文档
:::



<!-- 

### Input Number 数字输入框

### Select 选择器


### RadioGroup 单选框 -->