import type {
  AutoCompleteProps,
} from 'ant-design-vue'
import {
  AutoComplete,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型  auto-complete
 */
export interface VAutoCompleteItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  props?: VPropDef<T, AutoCompleteProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'AutoComplete',
  render(props, item) {
    return <AutoComplete {...mergeProps(props.form, item.props)}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer?.set)}
    />
  }
})