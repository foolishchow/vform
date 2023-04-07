import type {
  SwitchProps
} from 'ant-design-vue'
import {
  Switch
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型 switch
 */
export interface VSwitchItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, SwitchProps>
  slots?: {
    checkedChildren?: JSX.Element | { (): JSX.Element }
    unCheckedChildren?: JSX.Element | { (): JSX.Element }
  },
  transfer?: VTransfer<any, any>
}
registerRender({
  type: 'Switch',
  render(props, item) {
    return <Switch {...mergeProps(props.form, item.props)}
      checked={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:checked={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
      v-slots={item.slots ?? {}} />
  }
})