import type {
  InputNumberProps,
} from 'ant-design-vue'
import {
  InputNumber,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型 input-number
 */
export interface VInputNumberItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * `ant-design-vue Input`的属性
   */
  props?: VPropDef<T, InputNumberProps>
  slots?: {
    addonBefore?: JSX.Element | { (): JSX.Element }
    addonAfter?: JSX.Element | { (): JSX.Element }
  },
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'InputNumber',
  render(props, item) {
    return <InputNumber {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
      // v-model:value={props.form[item.dataIndex]}
      v-slots={item.slots ?? {}} />
  }
})