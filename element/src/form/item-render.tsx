import { ElCol, ElFormItem } from 'element-plus';
import "./renders"
import type { VFormProps, DeepKey } from './types';
import { getItemRender } from './register';
import { getDataIndex, getDynamic } from './utils';
import { VFormItem } from './renders';
const FormItem = ElFormItem

/**
 * 默认渲染 FormItem and Col
 * @param props
 * @param item
 * @param formValidateTrigger
 * @param itemSpan
 * @returns
 */
export function renderDefaultFormLabel<T extends object, Key extends DeepKey<T> = DeepKey<T>>(
  props: VFormProps<T>,
  item: VFormItem<T, Key>,
  itemSpan: number
) {
  if (getDynamic(props.form, item.vIf) === false) {
    return null;
  }
  // const validateTrigger = item.validateTrigger ?? formValidateTrigger ?? '';
  const span = itemSpan * (item.colSpan || 1);
  let rule = getDynamic(props.form, item.rule);
  return <ElCol span={span} key={item.dataIndex} >
    <FormItem
      label={getDynamic(props.form, item.label)}
      prop={getDataIndex(item.dataIndex)}
      rules={rule} >
      {renderItem(props, item)}
    </FormItem>
  </ElCol>
}

/**
 * 渲染动态组件 内部的元素
 * @param props 表单的属性
 * @param item 当前的item
 * @returns
 */
export function renderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>>(
  props: VFormProps<T>,
  item: VFormItem<T, Key>
) {
  const render = getItemRender(item)
  if (render) {
    return render(props, item)
  }
  // @ts-ignore
  if (item.customRender) {
    // @ts-ignore
    return item.customRender(props.form)
  }
  return <span>no render for type [{item.type}]</span>
}