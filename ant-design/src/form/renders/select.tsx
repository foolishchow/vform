import type {
  SelectProps,
} from 'ant-design-vue'
import {
  Select,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型 select
 */
export interface VSelectItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, SelectProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'Select',
  render: (props, item) => {
    return <Select
      {...mergeProps(props.form, item.props)}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})