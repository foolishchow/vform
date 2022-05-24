# DatePicker 日期选择器

## 选择某一天
以 `日` 为基本单位，基础的日期选择控件   

基本单位由 type 属性指定。 

<demo src="../../examples/api/date-picker/basic.tsx" />

## 快捷选项 & 可选区间

通过 `shortcuts` 配置快捷选项，   

禁用日期通过 `disabledDate` 设置，传入函数

<demo src="../../examples/api/date-picker/quick-option.tsx" />

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

<demo src="../../examples/api/date-picker/formats.tsx" />


## 时间范围

:::warning 定制
在时间范围选择的时候，我们分别使用`dataIndex` 和 `dataIndexEnd` 属性，配置 `开始时间` 和 `结束时间`
:::

<demo src="../../examples/api/date-picker/date-range.tsx" />

## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。   
你也可以使用 `defaultValue` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, `default-value` 则会设置左边窗口的默认值。

<demo src="../../examples/api/date-picker/default-value.tsx" />

## 日期格式

使用 `format` 指定输入框的展示格式。   

使用 `value-format` 指定绑定值的格式。   

默认情况下，组件接受并返回`Date`对象。    

在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 `Day.js` 支持的 `format` 参数。

<demo src="../../examples/api/date-picker/value-format.tsx" />

## 数据转换

::: warning 定制化
只是一个定制化的选项,`element-plus`不包含这个属性
:::

如果后台需要的是精确到秒的时间戳，这个时候我们就需要做变换了   
使用 `transfer` 属性可以简单实现

<demo src="../../examples/api/date-picker/value-transfer.tsx" />


## 设置自定义前缀的内容

前缀内容可以被自定义。   

当你从其他vue组件或由渲染函数生成的组件中导入组件时, 你可以设置 `prefix-icon` 属性来定制前缀内容

<demo src="../../examples/api/date-picker/custom-preffix.tsx" />


## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据   

<demo src="../../examples/api/date-picker/custom-cell.tsx" 
file="../../examples/api/date-picker/custom-cell.css" />


## 属性

`DatePicker` 完全继承了 `ElDatePicker`的属性 您可以从下面的链接里找到相关文档
- [Element ElDatePicker ](https://element-plus.org/zh-CN/component/date-picker.html)
- [Element ElDatePicker  的属性](https://element-plus.org/zh-CN/component/date-picker.html#%E5%B1%9E%E6%80%A7)


## `typescript`类型

```typescript
export type SinglePickerType = ('year' | 'month' | 'date' | 'week' | 'datetime' | 'dates')
export type DatePickerType = Extract<IDatePickerType, SinglePickerType>
export type DateRangePickerType = Exclude<IDatePickerType, DatePickerType>

export type VDatePickerProps = VueProps<typeof ElDatePicker>
export type VBaseDatePickerProps = Omit<VDatePickerProps, 'type'>

export type VSingleDatePickerProps = Omit<VBaseDatePickerProps, 'startPlaceholder' | 'endPlaceholder'> & {
  type: DatePickerType
}

export interface VSingleDatePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VSingleDatePickerProps>
  transfer?: VTransfer<Into<T, Key>, Dayjs | number | Date>
  slots?: VDatePickerSlots
}

export type VRangeDatePickerProps = Omit<VBaseDatePickerProps, 'placeholder'> & {
  type: DateRangePickerType
}

export interface VRangeDatePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  EndKey extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  dataIndexEnd: EndKey
  props?: VPropDef<T, VRangeDatePickerProps>
  transfer?: VTransfer<Into<T, Key | EndKey>, Dayjs | number | Date>
  slots?: VDatePickerSlots
}

export interface VDatePickerSlots {
  /**
   * 自定义内容
   */
  default?(cell: DateCell): JSX.Element | JSX.Element[]
  /**
   * 自定义范围分割符内容
   */
  'range-separator'?(): JSX.Element | JSX.Element[]
}
export type VDatePickerItem<
  T extends object, 
  Key extends DeepKey<T> = DeepKey<T>
> = (VSingleDatePicker<T, Key> | VRangeDatePicker<T, Key>)
```
