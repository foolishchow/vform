# TimeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59


::: info 
TimeSelect demo 还没有编写
:::


## 属性 

`TimeSelect` 完全继承了 `ElTimeSelect`的属性 您可以从下面的链接里找到相关文档
- [Element ElTimeSelect ](https://element-plus.org/zh-CN/component/time-select.html)
- [Element ElTimeSelect  的属性](https://element-plus.org/zh-CN/component/time-select.html#%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
export type VTimeSelectProps = VueProps<typeof ElTimeSelect>
export interface VTimeSelectItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VTimeSelectProps>
  transfer?: VTransfer<Into<T, Key>, dayjs.Dayjs | number | Date>
}

```