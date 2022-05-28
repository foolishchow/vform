import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import { ref, watchEffect, computed } from 'vue';
import type { dayjs } from 'element-plus';
import type { DeepKey, Into, VFormProps, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { ElDatePicker } from 'element-plus'
import { registerRender } from '../register';
import type { VBaseDatePickerProps, DateRangePickerType, VDatePickerSlots } from './date-picker'

export type VDateRangePickerItemProps = Omit<VBaseDatePickerProps, 'placeholder'> & {
  type: DateRangePickerType
}

export interface VDateRangePickerItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  EndKey extends DeepKey<T> = Key
  > extends VBaseItem<T, Key> {
  dataIndexEnd: EndKey
  props?: VPropDef<T, VDateRangePickerItemProps>
  transfer?: VTransfer<Into<T, Key | EndKey> | null, number | Date | undefined | null>
  slots?: VDatePickerSlots
}

registerRender({
  type: 'DateRangePicker',
  render(props, item) {
    const Value = computed({
      get() {
        return [
          getWithTransfer(props.form, item.dataIndex, item.transfer),
          // @ts-ignore
          getWithTransfer(props.form, item.dataIndexEnd, item.transfer),
        ]
      },
      set(value) {
        if (!value) {
          console.info(value)
          // @ts-ignore
          setWithTransfer(props.form, item.dataIndex, null, item.transfer);
          // @ts-ignore
          setWithTransfer(props.form, item.dataIndexEnd, null, item.transfer);
          return
        }
        // @ts-ignore
        setWithTransfer(props.form, item.dataIndex, value[0], item.transfer);
        // @ts-ignore
        setWithTransfer(props.form, item.dataIndexEnd, value[1], item.transfer);
      }
    })
    const pickerProps = ref<any>()
    watchEffect(() => {
      // @ts-ignore
      pickerProps.value = mergeProps(props.form, item.props)
    })
    // @ts-ignore
    return () => {
      return <ElDatePicker {...(pickerProps.value ?? {})}
        modelValue={Value.value}
        onUpdate:modelValue={e => Value.value = e}
        v-slots={item.slots} />
    }
  }
})

