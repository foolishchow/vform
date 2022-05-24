# 自动补全

您可以根据当前输入的内容获取对应的输入建议。

## 基础使用
`Autodcomplete` 组件提供输入建议。 

`fetchSuggestions` 属性为返回建议输入的方法。 

在此示例中， `querySearch(queryString, cb)` 方法通过 `cb(data)` 给 `Autocomplete` 组件返回建议。

<demo src="../../examples/api/auto-complete/basic.tsx" />


## 自定义模板
自定义如何显示输入建议。

使用 `scoped slot` 自定义输入建议。 在这个范围中，你可以使用 `item` 键来访问当前输入建议对象。

<demo src="../../examples/api/auto-complete/scoped-slot.tsx"  />

:::tip 改变
`vue3`的`scope-slot`与`slot`被统一了
:::


## 远程搜索
从服务端搜索数据。

<demo src="../../examples/api/auto-complete/remote-fetch.tsx"  />


## 配置选项

AutoComplete 完全继承了 `ElInput`的属性 您可以从下面的链接里找到相关文档
- [Element AutoComplete 自动补全](https://element-plus.org/zh-CN/component/input.html#%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8)
- [Element AutoComplete 自动补全 的属性](https://element-plus.org/zh-CN/component/input.html#autocomplete-attributes)

如果您使用了`typescript`，我们提供了类型提示,配置一个`AutoComplete`输入框大概有如下可选项  

```typescript
type AutocompleteProps = InputProps & VueProps<typeof ElAutocomplete>
export interface VAutoCompleteItem<
T extends object, 
Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, AutocompleteProps>
  slots?: {
    prefix?: JSX.Element | { (): JSX.Element }
    suffix?: JSX.Element | { (): JSX.Element }
    prepend?: JSX.Element | { (): JSX.Element | string }
    append?: JSX.Element | { (): JSX.Element | string }
    default?: { (scope: { item: any }): JSX.Element | JSX.Element[] | string }
  }
}
```