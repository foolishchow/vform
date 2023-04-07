import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import type { dayjs } from 'element-plus';
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { ElTimeSelect } from 'element-plus'
import { registerRender } from '../register';

export type VTimeSelectProps = VueProps<typeof ElTimeSelect>
export interface VTimeSelectItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VTimeSelectProps>
  transfer?: VTransfer<Into<T, Key>, dayjs.Dayjs | number | Date>
}


registerRender({
  type: 'TimeSelect',
  render(props, item) {
    return <ElTimeSelect {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any)}
    />
  }
})

