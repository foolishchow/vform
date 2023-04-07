# CheckboxGroup 多选框

在一组备选项中进行多选。


::: warning 这是一个封装过的组件
`CheckboxGroup`和`Element-Plus`中的`CheckboxGroup`有些不一样哦

#### 额外拓展的属性
- 添加了 `isButton` 属性，用以切换 `Checkbox` 和 `CheckboxButton` 展示类型
- 添加了 `option` 属性，用以定义内部的选项, 使选项更具语义化
- 添加了 `optionConfig` 属性，用以定义选项的状态 `value`、`label`、`disabled`、`name`
:::


## 默认Option类型
使用 `options` 定义选项，`options` 的默认 `typescript` 声明如下
```typescript
export interface Option {
  /** 展示的文字 */
  label: string
  /** 值 */
  value: any
  /** 禁用状态 */
  disabled?: bo
  /** 源生name属性 */
  name?: string
}
```

<demo src="../../examples/api/checkbox-group/basic.tsx" />

## 自定义Option类型
`options` 类型并不是固定不变的，如果你的数据格式不是这样的，您可以使用 `optionProps` 来告诉我们如何设置   

`optionConfig` 的 `typescript` 声明如下

```typescript
export interface OptionConfig {
  /**
    * label 字段名
    */
  label?: string
  /**
    * value 字段名
    */
  value?: string
  /**
    * 源生name字段名
    */
  name?: any
  /**
    * 禁用字段名
    */
  disabled?: string
}
```

<demo src="../../examples/api/checkbox-group/custom-option.tsx" />

## 展示为按钮

设置 `isButton` 即可以切换 `checkbox` 为按钮样式

<demo src="../../examples/api/checkbox-group/button.tsx" />

## 自定义渲染option

通过设置`slots.option`即可自定义选项的文字渲染   

```tsx
 slots: {
    option(item) {
      return <span>{item.label}-{item.value}</span>
    }
  }
```

<demo src="../../examples/api/checkbox-group/slot.tsx" />




## 配置选项

`CheckboxGroup` 完全继承了 `ElCheckboxGroup`的属性 您可以从下面的链接里找到相关文档
- [Element ElCheckboxGroup ](https://element-plus.org/zh-CN/component/checkbox.html)
- [Element ElCheckboxGroup  的属性](https://element-plus.org/zh-CN/component/checkbox.html#checkbox-group-%E5%B1%9E%E6%80%A7)

::: warning 额外拓展的属性
- 添加了 `isButton` 属性，用以切换 `Checkbox` 和 `CheckboxButton`展示类型
- 添加了 `option` 属性，用以定义内部的选项, 使选项更具语义化
- 添加了 `optionConfig` 属性，用以定义选项的状态 `value`、`label`、`disabled`、`name`
:::
## `typescript`声明

```typescript
type VCheckboxGroupProps = VueProps<typeof ElCheckboxGroup>

export interface VCheckboxGroupItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  > extends VBaseItem<T, Key> {
  /**
   * 类型  cascader
   */
  props?: VPropDef<T, VCheckboxGroupProps>,
  /**
   * 是否是 checkboxButton
   */
  isButton?: DynamicDef<T, boolean>
  /**
   * 是否展示border
   *
   * 只有`isButton`为`false`生效
   */
  border?: DynamicDef<T, boolean>
  /**
   * 选项 默认是 {@link VCommonOption}
   *
   * 为了`ts`验证，所以使用了`any`
   */
  options?: DynamicDef<T, VCommonOption[]> | DynamicDef<T, any[]>
  /**
   * 可选项配置
   */
  optionConfig?: VCommonOptionConfig
  /**
   * 插槽
   */
  slots?: {
    /**
     * 自定义展示模板
     */
    default?(): (JSX.Element | JSX.Element[] | string)
    /**
     * 无匹配选项时的内容
     */
    option?(option: any): (JSX.Element | JSX.Element[] | string)
  }
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, any>
}
```