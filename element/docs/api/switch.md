# Switch 开关

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 `active-color` 属性与 `inactive-color` 属性来设置开关的背景色。


<demo src="../../examples/api/switch/basic.tsx" />

## 尺寸

使用 `size` 设置大小


## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。 
使用 `inline-prompt` 属性来控制文本是否显示在点内。

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

<demo src="../../examples/api/switch/text.tsx" />


## 显示自定义图标

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 使用 `inline-prompt` 属性来控制图标显示在点内。

<demo src="../../examples/api/switch/icon.tsx" />


## 扩展的 value 类型

设置 `active-value` 和 `inactive-value` 属性，接受 `Boolean`, `String` 或 `Number` 类型的值。 接受`Boolean`, `String`或 `Number` 类型的值。

<demo src="../../examples/api/switch/value.tsx" />

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean` ，设置 `true` 即可禁用。

<demo src="../../examples/api/switch/disabled.tsx" />

## 加载状态

设置 `loading` 属性，接受一个 `Boolean` ，设置 `true` 即加载中状态。

<demo src="../../examples/api/switch/loading.tsx" />


## 阻止切换

设置 `beforeChange` 属性，若返回 `false` 或者返回 `Promise` 且被 `reject`，则停止切换。

<demo src="../../examples/api/switch/before-change.tsx" />

## 属性 

`Switch` 完全继承了 `ElSwitch`的属性 您可以从下面的链接里找到相关文档
- [Element ElSwitch ](https://element-plus.org/zh-CN/component/switch.html)
- [Element ElSwitch  的属性](https://element-plus.org/zh-CN/component/switch.html#%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
export type VSwitchProps = VueProps<typeof ElSwitch>
export interface VSwitchItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 switch
   */
  /**
   * `element-plus switch`的属性
   */
  props?: VPropDef<T, VSwitchProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}
```