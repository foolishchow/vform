import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import { ref, watchEffect, computed } from 'vue';
import type { dayjs } from 'element-plus';
import type { DeepKey, Into, VFormProps, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { ElDatePicker } from 'element-plus'
import { registerRender } from '../register';
import type { IDatePickerType } from 'element-plus/lib/components/date-picker/src/date-picker.type';
import type { DateCell } from 'element-plus/es/components/date-picker/src/date-picker.type';

/**
 * 单选类型
 */
export type SinglePickerType = ('year' | 'month' | 'date' | 'week' | 'datetime' | 'dates')
/**
 * 单选类型
 */
export type DatePickerType = Extract<IDatePickerType, SinglePickerType>
/**
 * 单选类型
 */
export type DateRangePickerType = Exclude<IDatePickerType, DatePickerType>

export type ElDatePickerProps = VueProps<typeof ElDatePicker>
export type VBaseDatePickerProps = Omit<ElDatePickerProps, 'type'>

export type VDatePickerProps = Omit<VBaseDatePickerProps, 'startPlaceholder' | 'endPlaceholder'> & {
  type: DatePickerType | undefined
}

export interface VDatePickerItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VDatePickerProps>
  transfer?: VTransfer<Into<T, Key>, Date | number>
  slots?: VDatePickerSlots
}


export interface VDatePickerSlots {
  /**
   * 自定义内容
   */
  default?(cell: DateCell): JSX.Element | JSX.Element[]
  /**
   * 自定义范围分割符内容
   */
  'range-separator'?(): JSX.Element | JSX.Element[]
}

registerRender({
  type: 'DatePicker',
  render(props, item) {
    const Value = computed({
      get() {
        return getWithTransfer(props.form, item.dataIndex, item.transfer)
      },
      set(value) {
        // @ts-ignore
        setWithTransfer(props.form, item.dataIndex, value, item.transfer);
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

