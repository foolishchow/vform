import type {
  CheckboxGroupProps,
} from 'ant-design-vue'
import {
  CheckboxGroup,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型  radio-group
 */
export interface VCheckboxGroupItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, CheckboxGroupProps>
  transfer?: VTransfer<any, any>
}
registerRender({
  type: 'CheckboxGroup',
  render(props, item) {
    return <CheckboxGroup {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})