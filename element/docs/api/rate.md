# Rate 评分

## 基础用法

评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 `colors` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

<demo src="../../examples/api/rate/basic.tsx" />

## 允许半选

属性 `allowHalf` 允许出现半星

<demo src="../../examples/api/rate/allow-half.tsx" />

## 辅助文字

用辅助文字直接地表达对应分数

为组件设置 `show-text` 属性会在右侧显示辅助文字。 通过设置 `texts` 可以为每一个分值指定对应的辅助文字。 `texts` 为一个数组，长度应等于最大值 `max`。

<demo src="../../examples/api/rate/texts.tsx" />

## 其它 icon

当有多层评价时，可以用不同类型的 `icon` 区分评分层级

设置`icon-classes`属性可以自定义不同分段的图标。 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名。 本例还使用 `void-icon-class` 指定了未选中时的图标类名。

<demo src="../../examples/api/rate/icons.tsx" />

## 只读

只读的评分用来展示分数， 允许出现半星

为组件设置 `disabled` 属性表示组件为只读，支持小数分值。 此时若设置 `show-score`，则会在右侧显示目前的分值。 可以提供 `score-template` 作为显示模板，模板为一个包含了 {value} 的字符串，{value} 会被解析为分值。 模板为一个包含了 {value} 的字符串，{value} 会被解析为分值。

<demo src="../../examples/api/rate/readonly.tsx" />

## 自定义样式

`element-plus` 可以为 `rate` 组件设置自定义样式。[详情](https://element-plus.org/zh-CN/component/rate.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F) 




## 配置选项

`Rate` 完全继承了 `ElRate`的属性 您可以从下面的链接里找到相关文档
- [Element ElRate ](https://element-plus.org/zh-CN/component/rate.html)
- [Element ElRate  的属性](https://element-plus.org/zh-CN/component/rate.html#rate-%E5%B1%9E%E6%80%A7)


## `typescript`声明

```typescript
type RateProps = VueProps<typeof ElRate>
export interface VRateItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus ElRate`的属性
   */
  props?: VPropDef<T, RateProps>
  slots?: {
    character?: JSX.Element | { (): JSX.Element }
  },
  transfer?: VTransfer<Into<T, Key>, string | number>
}
```