# Upload 上传


## 基础使用

<demo src="../../examples/api/upload/basic.tsx" />


## 配置选项

`Upload` 完全继承了 `ElUpload`的属性 您可以从下面的链接里找到相关文档
- [Element ElUpload ](https://element-plus.org/zh-CN/component/upload.html)
- [Element ElUpload  的属性](https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)


::: danger 注意
这只是一个简单的封装  

不建议您在业务中直接使用   

建议您在使用中根据具体的业务进行分装
:::

## `typescript`声明

```typescript
type UploadProps = VueProps<typeof ElUpload>
export interface VUploadItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus {@link ElUpload}`的属性
   */
  props?: VPropDef<T, UploadProps>
  slots?: {
    /**
     * 自定义默认内容
     */
    default?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 触发文件选择框的内容
     */
    trigger?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 提示说明文字
     */
    tip?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 缩略图模板的内容
     */
    file?: (option: { file: UploadFile }) => (JSX.Element | JSX.Element[] | string)
  },
}

```