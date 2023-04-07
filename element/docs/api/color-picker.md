# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

<demo src="../../examples/api/color-picker/basic.tsx" />


## 配置选项

`ColorPicker` 完全继承了 `ElColorPicker`的属性 您可以从下面的链接里找到相关文档
- [Element ElColorPicker ](https://element-plus.org/zh-CN/component/color-picker.html)
- [Element ElColorPicker  的属性](https://element-plus.org/zh-CN/component/color-picker.html#%E5%B1%9E%E6%80%A7)

## `typescript`声明
```typescript
type VColorPickerProps = VueProps<typeof ElColorPicker>
export interface VColorPickerItem<
  T extends object, 
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  /**
   * 类型 ColorPicker
   */
  props?: VPropDef<T, VColorPickerProps>
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, string>
}
```