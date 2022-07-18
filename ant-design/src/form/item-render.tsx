import { Col, Form } from 'ant-design-vue';
import "./renders"
import type { VValidateTrigger, VFormProps, DeepKey, FormRenderExtra } from './types';
import { getItemRender } from './register';
import { getDataIndex, getDynamic } from './utils';
import { VFormItem } from './renders';
const FormItem = Form.Item

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
  formValidateTrigger: VValidateTrigger | VValidateTrigger[] | undefined,
  itemSpan: number,
  extra?: FormRenderExtra
) {
  if (getDynamic(props.form, item.vIf) === false) {
    return null;
  }
  const validateTrigger = item.validateTrigger ?? formValidateTrigger ?? '';
  const span = itemSpan * (item.colSpan || 1);
  let rule = getDynamic(props.form, item.rule);
  return <Col span={span} key={item.dataIndex} >
    <FormItem
      label={getDynamic(props.form, item.label)}
      name={getDataIndex(item.dataIndex, extra?.dataIndexPreffix)}
      rules={rule} validateTrigger={validateTrigger}>
      {renderItem(props, item, extra)}
    </FormItem>
  </Col>
}

/**
 * 渲染动态组件 内部的元素
 * @param props 表单的属性
 * @param item 当前的item
 * @returns
 */
export function renderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>>(
  props: VFormProps<T>,
  item: VFormItem<T, Key>,
  extra?: FormRenderExtra
) {
  const render = getItemRender(item)
  if (render) {
    return render(props, item, extra)
  }
  // @ts-ignore
  if (item.customRender) {
    // @ts-ignore
    return item.customRender(props.form, extra)
  }
  return <span>no render for type [{item.type}]</span>
}