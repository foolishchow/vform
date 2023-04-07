# TimePicker 时间选择器

用于选择或输入日期

## 任意时间点

可以选择任意时间

提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开 `arrow-control` 属性则通过界面上的箭头进行选择。


<demo src="../../examples/api/time-picker/basic.tsx" />

## 限制时间选择范围

您也可以限制时间选择范围。

通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。


<demo src="../../examples/api/time-picker/control.tsx" />

## 任意时间范围

:::warning 定制
在时间范围选择的时候，我们分别使用`dataIndex` 和 `dataIndexEnd` 属性，配置 `开始时间` 和 `结束时间`
:::

可选择任意的时间范围

添加 `is-range` 属性即可选择时间范围。 同样支持 `arrow-control` 属性。


<demo src="../../examples/api/time-picker/range.tsx" />

## 属性 

`TimePicker` 完全继承了 `ElTimePicker`的属性 您可以从下面的链接里找到相关文档
- [Element ElTimePicker ](https://element-plus.org/zh-CN/component/time-picker.html)
- [Element ElTimePicker  的属性](https://element-plus.org/zh-CN/component/time-picker.html#timepicker-%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
export type VTimePickerProps = VueProps<typeof ElTimePicker>
export type VBaseTimePickerProps = Omit<VTimePickerProps, 'isRange'>

export type VSingleTimePickerProps = Omit<VBaseTimePickerProps, 'startPlaceholder' | 'endPlaceholder' | 'rangeSeparator'> & {
  isRange?: false | undefined
}

export interface VSingleTimePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VSingleTimePickerProps>
  transfer?: VTransfer<Into<T, Key>, dayjs.Dayjs | number | Date>
}

export type VRangeTimePickerProps = Omit<VBaseTimePickerProps, 'placeholder'> & {
  isRange: true
}

export interface VRangeTimePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  EndKey extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  dataIndexEnd: EndKey
  props?: VPropDef<T, VRangeTimePickerProps>
  transfer?: VTransfer<Into<T, Key | EndKey>, dayjs.Dayjs | number | Date>
}


export type VTimePickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> = (VSingleTimePicker<T, Key> | VRangeTimePicker<T, Key>)

```