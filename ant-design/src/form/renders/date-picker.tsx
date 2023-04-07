import type {
  DatePickerProps,
} from 'ant-design-vue'
import {
  DatePicker,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import type { Dayjs } from 'dayjs'

/**
 * 类型  date-picker
 */
export interface VDatePickerItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, DatePickerProps>
  transfer?: VTransfer<Into<T, Key>, Dayjs | undefined>
}
registerRender({
  type: 'DatePicker',
  render(props, item) {
    // @ts-ignore
    return <DatePicker {...mergeProps(props.form, item.props)}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})