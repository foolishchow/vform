# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。


## 基础使用

有两种触发子菜单的方式

只需为 `Cascader` 的`options`属性指定选项数组即可渲染出一个级联选择器。   
通过 `props.expandTrigger` 可以定义展开子级菜单的触发方式。

<demo src="../../examples/api/cascader/basic.tsx"
file="../../examples/api/cascader/options.tsx" />

## 有禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的

本例中，`options`指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。   
在默认情况下，`Cascader` 会检查数据中每一项的`disabled`字段是否为`true`，   
如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`props.disabled`属性来指定。   
当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。


<demo src="../../examples/api/cascader/disabled-option.tsx"
file="../../examples/api/cascader/options.tsx" />

## 一键清空  

通过`clearable`设置输入框可清空

::: details 代码示例
```tsx{9}
import { useFormBuilder } from 'vform-element'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '点击展开',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      options: DisabledOptions
    }
  })
```
:::


## 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。   
`showAllLevels` 定义了是否显示完整的路径   
- 默认为`true` 展示所有层级
- 设置为`false`时 只展示最后一级

::: details 代码示例
```tsx{9}
import { useFormBuilder } from 'vform-element'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '点击展开',
    props: {
      placeholder: 'Please Select',
      showAllLevels: false,
      options: DisabledOptions
    }
  })
```
:::

## 多选

在`Cascader`的属性配置中设置`multiple: true`即可开启多选   

::: details 代码示例
```tsx{9}
import { useFormBuilder } from 'vform-element'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '点击展开',
    props: {
      props: {
        multiple: true
      },
    }
  })
```
:::

<demo src="../../examples/api/cascader/multiple.tsx"
file="../../examples/api/cascader/options.tsx" />

::: tip
- `collapseTags:true` 在多选模式下折叠已选项
- `collapseTagsTooltip:true` 在多选模式下为折叠的已选项提供一个`tooltip`
:::

::: danger
  `collapseTags:true` 仅在多选模式下生效
:::


## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。   
可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。




<demo src="../../examples/api/cascader/check-strictly.tsx"
file="../../examples/api/cascader/options.tsx" />

## 动态加载
当选中某一级时，动态加载该级下的选项。   
通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。    
`lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。    
为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)。 否则，将以有无子节点来判断其是否为叶子节点。


<demo src="../../examples/api/cascader/dynamic-load.tsx" />


## 可搜索

可以快捷地搜索选项并选择。

通过添加`filterable`来启用过滤。 `Cascader` 会匹配所有节点的标签和它们的亲节点的标签，是否包含有输入的关键字。 
你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

<demo src="../../examples/api/cascader/filterable.tsx" />

## 自定义节点内容

可以自定义备选项的节点内容

你可以通过 `scoped slot` 自定义节点的内容。 使用 `scoped slot` 会传入两个参数`node`和`data`，分别表示当前节点的 `Node` 对象和当前节点的数据。

<demo src="../../examples/api/cascader/slots.tsx" />



## 配置选项

`Cascader` 完全继承了 `ElCascader`的属性 您可以从下面的链接里找到相关文档
- [Element ElCascader 级联选择器](https://element-plus.org/zh-CN/component/cascader.html)
- [Element ElCascader 级联选择器 的属性](https://element-plus.org/zh-CN/component/cascader.html#cascader-%E5%B1%9E%E6%80%A7)
- [Element ElCascader 级联选择器 的属性 `Props`选项](https://element-plus.org/zh-CN/component/cascader.html#props)


## `typescript`声明

```typescript
type VCascaderProps = Omit<VueProps<typeof ElCascader>, 'props'> & {
  props?: Omit<CascaderProps, 'expandTrigger'> & {
    expandTrigger?: 'click' | 'hover'
  }
}
export interface VCascaderItem<
  T extends object, Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  /**
   * 类型  cascader
   */
  props?: VPropDef<T, VCascaderProps>,
  slots?: {
    /**
     * 自定义展示模板
     */
    default?(data: { node: Node, data: any }): (JSX.Element | JSX.Element[] | string)
    /**
     * 无匹配选项时的内容
     */
    empty?(): (JSX.Element | JSX.Element[] | string)
  }
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, CascaderValue>
}
```

