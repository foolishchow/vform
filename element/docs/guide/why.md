
:::warning 问题
前端的轮子千千万，已经有 `element-plus` 了， 为何还要造轮子？
:::

::: tip
通过一个具体场景，解释为什么要使用动态表单
:::


## 场景设定

假设我们有一个场景，需要录入用户的`姓名`、`性别`、`生日`这几个数据，其中
- 所有数据都必填
- 性别选项要从后台异步获取
- 生日要获取 时间戳(精确到秒)

## 不使用`vform-element`

常见的表单开发流程,这个场景有两个注意点   
- `brithday` 后台需要的是 `时间戳` , 需要做转换, 所以把 `brithday` 做成 `computed`
- `性别` 选项是一个异步获取的选项，使用 `ref` 实现动态绑定   

<demo src="../../examples/guide/why/common.tsx" />

::: info  总结  
上面的例子中，我们可以发现
- `formData` , `Rules` 是上下文的核心, 配置 Form 以及每个 FormItem 的时候都会用到
- `FormItem` 的 `prop` 属性和 `Item` 子项的 `v-model:xxx`  属性其实都可以用 `formData[Key]` 来统一
- 像 `select` 这种异步获取选项的，我们需要为 `Select` 创建 `ref` 实现数据双向绑定
- `birthday`这种需要 转换数据的操作 ，则还需要单独定义`ref`
- 我们会在`setup`中定义许多变量来实现类似`异步数据绑定`、`数据转换`等操作，并在后面的页面渲染中根据配置使用他们，

> 由此可以发现，在开发过程中，我们一直在 script 与 template/jsx 间上下文切换   

总体来看，我们为了业务的实现，定义了很多分散的业务处理，并需要在单独的指定到我们的渲染上   
:::


## 动态配置
<demo src="../../examples/guide/why/dynamic.tsx" />

::: info 总结

- #### 普通配置（姓名）
  - 对于普通的配置，我们将 `label`、`prop`、`v-model`、`rule` 集中到一起配置了   
  - 每个类型的表单元素，添加了`props`配置项来实现
- #### 数据转换（生日brithday）   
  - 需要进行数据转换的表单元素，添加了`transfer`配置项来实现
- #### 异步数据绑定   
  - 异步数据绑定，我们可以使用`Function`配置表单元素
```typescript
()=>{ //定义性别这个选项是一个Function
  const SexOpt = ref<{ label: string, value: number }[]>([])
  getSexOpt().then(opt => {
    SexOpt.value = opt
  })
  return {
    label: "性别",
    dataIndex: "sex",
    option: () => SexOpt.value,
    props: {
      placeholder: "请选择性别",
      clearable: true,
    },
    rule: [
      { required: true, message: '请选择性别' }
    ]
  }
}
```
:::


