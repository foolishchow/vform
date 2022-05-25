
# 开始使用

## 特点
- 基于对象的表单配置选项   
  - 基于 `element-plus` 表单，构建了一套基于配置的 `动态表单渲染` 的方式
  - 提炼 `栅格` 、 `表单元素` 、`表单验证` 等常用表单布局配置到对象
  - 解耦 `script` 与 `template/jsx` , 减少编程过程中 `script` 与 `template/jsx` 上下文切换
- 动态化的配置，尽可能的动态化选项配置
- 天生的拓展自定义能力
- 不改变样式，不侵入样式

::: tip  设计的初衷

动态表单其实并没有改变什么，却又改变了些什么

- 抽离 `表单元素` 的设置， 并实现集中配置， 让单独的表单元素的逻辑集中到一处
- 表单元素的配置不仅仅是简单的静态配置，它应该也必须具备动态配置的能力 (所有我们有了`DynamicDef`)
- 表单页面只关心 `表单数据`  和 `表单业务` ，表单元素的逻辑可以解耦出去

:::


## 安装
```bash
npm install vform-element --save-dev
```


## 使用

```tsx
import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-element'

type FormBean = {
  name: string
}

const builder = useFormBuilder<FormBean>()
  .Input({
    label: '用户名',
    dataIndex: 'name'
  })


export default defineComponent({
  setup() {
    const formData = reactive<FormBean>({} as any)
    const Form = builder.form()
    const FormOptions = builder.build()

    return () => {
      return <Form form={formData} items={FormOptions} />
    }
  }
})
```

<demo src="../../examples/guide/get-start.tsx">