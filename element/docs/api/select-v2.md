# Select V2 虚拟列表选择器


在某些使用情况下，单个选择器可能最终加载数万行数据。 将这么多的数据渲染至 DOM 中可能会给浏览器带来负担，从而造成性能问题。 

## 基础用法

::: tip 
当前这个组件貌似有点问题  
所以不放置demo了
:::



## 配置选项

`SelectV2` 完全继承了 `ElSelectV2`的属性 您可以从下面的链接里找到相关文档
- [Element ElSelectV2 ](https://element-plus.org/zh-CN/component/select-v2.html)
- [Element ElSelectV2  的属性](https://element-plus.org/zh-CN/component/select-v2.html#select-v2-%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript

/**
 *  select props
 */
type VSelectV2Props = VueProps<typeof ElSelectV2>
/**
 *  select
 */
export interface VSelectV2Item<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * props
   */
  props?: VPropDef<T, VSelectV2Props>

  slots?: {
    /**
     * slot for render option
     * 自定义 Option 模板
     */
    default?: (option: any, index: number) => JSX.Element | JSX.Element[] | string

    prefix?: () => JSX.Element | JSX.Element[] | string

    empty?: () => JSX.Element | JSX.Element[] | string
  }
}
```