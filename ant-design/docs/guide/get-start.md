
# 开始使用

## 特点
- 基于对象的表单配置选项   
  - 基于 `ant-design-vue` 表单，构建了一套基于配置的 `动态表单渲染` 的方式
  - 提炼 `栅格` 、 `表单元素` 、`表单验证` 等常用表单布局配置到对象
  - 解耦 `script` 与 `template/jsx` , 减少编程过程中 `script` 与 `template/jsx` 上下文切换
- 动态化的配置，尽可能的动态化选项配置
- 天生的拓展自定义能力
- 不改变样式，不侵入样式

## 安装
```bash
npm install vform-ant-design --save-dev
```


## 使用

```tsx
import { defineComponent, reactive } from 'vue'
import { useFormBuilder } from 'vform-ant-design'

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
