# Transfer 穿梭框


## 基础用法

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。

可以使用 `titles` 、`button-texts` 、`render-content` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。    

并且，数据项的渲染还可以使用 `scoped-slot` 进行自定义。 对于列表底部的内容区，提供了两个具名 `slot`：`left-footer` 和 `right-footer`。    

此外，如果希望某些数据项在初始化时就被勾选，可以使用 `left-default-checked` 和 `right-default-checked` 属性。    

最后，本例还展示了 `change` 事件的用法。


<demo src="../../examples/api/transfer/basic.tsx" />


## 配置选项

`Transfer` 完全继承了 `ElTransfer`的属性 您可以从下面的链接里找到相关文档
- [Element Transfer ](https://element-plus.org/zh-CN/component/transfer.html)
- [Element Transfer  的属性](https://element-plus.org/zh-CN/component/transfer.html#%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
type TransferProps = VueProps<typeof ElTransfer>
export interface VTransferItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus {@link ElRate}`的属性
   */
  props?: VPropDef<T, TransferProps>
  slots?: {
    /**
     * 自定义数据项的内容， 参数为 { option }
     */
    default?: (param: { option: any }) => (JSX.Element | JSX.Element[] | string)
    /**
     * 左侧列表底部的内容
     */
    "left-footer"?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 右侧列表底部的内容
     */
    "right-footer	"?: () => (JSX.Element | JSX.Element[] | string)
  },
  transfer?: VTransfer<Into<T, Key>, string | number>
}

```