# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。  

::: warning 这是一个封装过的组件
`Select`和`Element-Plus`中的`ElSelect`有些不一样哦

#### 额外拓展的属性
- 添加了 `option` 属性，用以定义内部的选项, 使选项更具语义化
- 添加了 `optionConfig` 属性，用以定义选项的状态 `value`、`label`、`disabled`、`children`
:::

## 基础使用

下面的例子展示了基础使用以及自定义渲染模板

<demo src="../../examples/api/select/basic.tsx" />

## group 选项组

默认的选项组配置

<demo src="../../examples/api/select/group.tsx" />


## 自定义option数据类型

当我们的数据类型和默认数据类型不相同时，可以使用 `optionConfig` 来指定数据类型

<demo src="../../examples/api/select/custom.tsx" /> 

## 动态绑定option数据类型

开发中常见的异步获取 `select` 选项数据

<demo src="../../examples/api/select/dynamic.tsx" />


## 配置选项

`Select` 完全继承了 `ElSelect`的属性 您可以从下面的链接里找到相关文档
- [Element ElSelect ](https://element-plus.org/zh-CN/component/select.html)
- [Element ElSelect  的属性](https://element-plus.org/zh-CN/component/select.html#select-%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
/**
 *  select props
 */
type VSelectProps = VueProps<typeof ElSelect>
/**
 *  select
 */
export interface VSelectItem<
  T extends object, Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  /**
   * props
   */
  props?: VPropDef<T, VSelectProps>
  /**
   * options defalut is {@link VSelectOptions}[]
   */
  option?: DynamicDef<T, any[]>
  /**
   * option
   */
  optionConfig?: VSelectOptionConfig
  transfer?: VTransfer<Into<T, Key>, string | number>
  slots?: {
    /**
     * slot for render option
     */
    option?: (option: any, index: number) => JSX.Element | JSX.Element[] | string
    /**
     * slot for render group option
     */
    optionGroup?: (option: any, index: number) => string

    prefix?: () => JSX.Element | JSX.Element[] | string

    empty?: () => JSX.Element | JSX.Element[] | string
  }
}
```