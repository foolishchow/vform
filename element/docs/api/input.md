# Input 输入框

## 基础用法  

<demo src="../../examples/api/input/basic.tsx" 
  file="../../examples/types.ts" />
  
## 禁用状态  
通过 `disabled` 属性指定是否禁用 input 组件

<demo src="../../examples/api/input/disabled.tsx" 
  file="../../examples/types.ts" />


## 一键清空  
使用`clearable`属性即可得到一个可一键清空的输入框   

<demo src="../../examples/api/input/clearable.tsx" 
  file="../../examples/types.ts" />

## 格式化

使用`formatter`和`parser`格式化数据

<demo src="../../examples/api/input/formatter.tsx" 
  file="../../examples/types.ts" />

## 密码框
使用 `showPassword` 属性即可得到一个可切换显示隐藏的密码框

<demo src="../../examples/api/input/passwd.tsx" 
  file="../../examples/types.ts" />



## 带图标的输入框

带有图标标记输入类型   

要在输入框中添加图标，你可以简单地使用 prefix-icon 和 suffix-icon 属性。 另外， prefix 和 suffix 命名的插槽也能正常工作。

<demo src="../../examples/api/input/icon.tsx" 
  file="../../examples/types.ts" />

:::tip 插槽配置
  我们将插槽变为可选属性配置,   
  可选的插槽对应了`ElInput`的所有插槽
  ```typescript
  export interface VInputItem {
    slots?: {
      prefix?: JSX.Element | { (): JSX.Element }
      suffix?: JSX.Element | { (): JSX.Element }
      prepend?: JSX.Element | { (): JSX.Element }
      append?: JSX.Element | { (): JSX.Element }
    }
  }
  ```
:::

## 文本域
用于输入多行文本信息可缩放的输入框。 设置 `type="textarea"` 即可

文本域高度可通过 `rows` 属性控制

<demo src="../../examples/api/input/textarea.tsx" 
  file="../../examples/types.ts" />

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

<demo src="../../examples/api/input/textarea-autosize.tsx" 
  file="../../examples/types.ts" />

## 复合型输入框
可以在输入框中前置或后置一个元素，通常是标签或按钮。

可通过 `slot` 来指定在 `Input` 中分发的前置或者后置的内容。

<demo src="../../examples/api/input/slots.tsx" 
  file="../../examples/types.ts" />

## 尺寸
使用 `size` 属性改变输入框大小。 可选值:  `large`, `small`.


## 配置选项

Input 完全继承了 `ElInput`的属性 您可以从下面的链接里找到相关文档
- [Element Input 输入框](https://element-plus.org/zh-CN/component/input.html)
- [Element Input 输入框 的属性](https://element-plus.org/zh-CN/component/input.html#input-%E5%B1%9E%E6%80%A7)

如果您使用了`typescript`，我们提供了类型提示,配置一个`Input`输入框大概有如下可选项  
> 高亮的部分为大多数表单元素通用配置
```typescript{5-24}
export interface VInputItem<
  T extends object, 
  Key extends DeepKey<T> = DeepKey<T>
> {
  /**
   * 占用多个区域
   */
  colSpan?: number
  /**
   * 对应的字段
   */
  dataIndex: Key
  /**
   * label
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
  /**
   * `element-plus Input`的属性
   */
  props?: VPropDef<T, InputProps>
  /**
   * 插槽
   */ 
  slots?: {
    prefix?: JSX.Element | { (): JSX.Element }
    suffix?: JSX.Element | { (): JSX.Element }
    prepend?: JSX.Element | { (): JSX.Element | string }
    append?: JSX.Element | { (): JSX.Element | string }
  }
}
```




