# Slider 滑块

## 基础用法

在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值


<demo src="../../examples/api/slider/basic.tsx" />

## 离散值

选项可以是离散的

改变 `step` 的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

<demo src="../../examples/api/slider/step.tsx" />


## 带有输入框的滑块

通过输入框设置精确数值

设置 `show-input` 属性会在右侧显示一个输入框

<demo src="../../examples/api/slider/input.tsx" />

## 范围选择

支持选择某一数值范围

配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

<demo src="../../examples/api/slider/range.tsx" />

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

<demo src="../../examples/api/slider/vertical.tsx" />

## 显示标记

设置 `marks` 属性可以在滑块上显示标记。

<demo src="../../examples/api/slider/marks.tsx" />


## 配置选项

`Slider` 完全继承了 `ElSlider`的属性 您可以从下面的链接里找到相关文档
- [Element ElSlider ](https://element-plus.org/zh-CN/component/slider.html)
- [Element ElSlider  的属性](https://element-plus.org/zh-CN/component/slider.html#%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
export interface VSliderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * `element-plus slider`的属性
   */
  props?: VPropDef<T, VSliderProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}
```