# InputNumber 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法
要使用它，只需使用 `InputNumber(config)` 配置即可，变量的初始值即为默认值。

<demo src="../../examples/api/input-number/basic.tsx" />

::: tip
当输入无效的字符串到输入框时，由于错误，输入值将把 `NaN` 导入到上层
:::

## 禁用状态
`disabled`属性接受一个 `Boolean`,设置为true即可禁用整个组件。   

如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性， 默认最小值为 `0`。

<demo src="../../examples/api/input-number/disabled.tsx" />

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

<demo src="../../examples/api/input-number/step.tsx" />


## 严格步进

`stepStrictly`属性接受一个`Boolean`。

如果这个属性被设置为 `true`，则只能输入步进的倍数。

<demo src="../../examples/api/input-number/step-strictly.tsx" />

## 精度
设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

<demo src="../../examples/api/input-number/precision.tsx" />

::: tip
`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。
:::


## 不同的输入框尺寸
使用 `size` 属性额外配置尺寸

可选的尺寸大小为：`large` 或 `small`


## 按钮位置

设置 `controlsPosition` 属性可以控制按钮位置。

默认为两侧,可设置为`right`


## 属性配置

`InputNumer` 完全继承了 `ElInputNumber`的属性   

支持的事件也可以在`props`中配置   

您可以从下面的链接里找到相关文档
- [Element InputNumer 数字输入框](https://element-plus.org/zh-CN/component/input-number.html)
- [Element InputNumer 数字输入框 的属性](https://element-plus.org/zh-CN/component/input-number.html#%E5%B1%9E%E6%80%A7)
- [Element InputNumer 数字输入框 的事件](https://element-plus.org/zh-CN/component/input-number.html#%E4%BA%8B%E4%BB%B6)

## `typescript`类型声明
```typescript
type InputNumberProps = VueProps<typeof ElInputNumber>
export interface VInputNumberItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 input-number
   */
  /**
   * `element-plus InputNumber`的属性
   */
  props?: VPropDef<T, InputNumberProps>
}
```

