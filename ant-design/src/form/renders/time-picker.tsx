import type {
  TimePickerProps,
} from 'ant-design-vue'
import {
  TimePicker,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';


/**
 * 类型 time-picker
 */
export interface VTimePickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  props?: VPropDef<T, TimePickerProps>
  slots?: {
    checkedChildren?: JSX.Element | { (): JSX.Element }
    unCheckedChildren?: JSX.Element | { (): JSX.Element }
  },
  transfer?: VTransfer<any, any>
}

registerRender({
  type: 'TimePicker',
  render(props, item) {
    // @ts-ignore
    return <TimePicker {...mergeProps(props.form, item.props)}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})