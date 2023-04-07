# 拓展性

## 自定义渲染

动态表单提供了便捷的自定义渲染能力

```typescript 
import { registerRender } from 'vform-ant-design';
export interface SimpleLabel<
  T extends object = any, 
  Key extends DeepKey<T> = DeepKey<T>
> extends SDBaseItem<T, Key> {
  preffix?: string
  suffix?: string
}
declare module 'vform-ant-design/lib/index'{
  export interface VFormItemTypes<
    T extends object = any, 
    Key extends DeepKey<T> = DeepKey<T>
  > {
    'label-simple': SimpleLabel<T, Key>
  }
}
registerRender({
  type: 'label-simple',
  render(props, item) {
    return <span>
      {item.preffix ?? undefined}
      {dotGet(props.form, item.dataIndex)}
      {item.suffix ?? undefined}
    </span>
  }
})
```

## 简单的自定义

<demo src="../../examples/guide/custom-render.tsx"></demo>