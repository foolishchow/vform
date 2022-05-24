import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import { ref, watchEffect, computed } from 'vue';
import type { dayjs } from 'element-plus';
import type { DeepKey, Into, VFormProps, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { ElDatePicker } from 'element-plus'
import { registerRender } from '../register';
import type { IDatePickerType } from 'element-plus/lib/components/date-picker/src/date-picker.type';
import type { DateCell } from 'element-plus/es/components/date-picker/src/date-picker.type';

export type SinglePickerType = ('year' | 'month' | 'date' | 'week' | 'datetime' | 'dates')
export type DatePickerType = Extract<IDatePickerType, SinglePickerType>
export type DateRangePickerType = Exclude<IDatePickerType, DatePickerType>

export type VDatePickerProps = VueProps<typeof ElDatePicker>
export type VBaseDatePickerProps = Omit<VDatePickerProps, 'type'>

export type VSingleDatePickerProps = Omit<VBaseDatePickerProps, 'startPlaceholder' | 'endPlaceholder'> & {
  type: DatePickerType | undefined
}

export interface VSingleDatePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VSingleDatePickerProps>
  transfer?: VTransfer<Into<T, Key>, dayjs.Dayjs | number | Date>
  slots?: VDatePickerSlots
}

export type VRangeDatePickerProps = Omit<VBaseDatePickerProps, 'placeholder'> & {
  type: DateRangePickerType
}

export interface VRangeDatePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  EndKey extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  dataIndexEnd: EndKey
  props?: VPropDef<T, VRangeDatePickerProps>
  transfer?: VTransfer<Into<T, Key | EndKey> | undefined, dayjs.Dayjs | number | Date | undefined>
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
export type VDatePickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> = (VSingleDatePicker<T, Key> | VRangeDatePicker<T, Key>)

const RangeList: DateRangePickerType[] = ['datetimerange', 'daterange', 'monthrange']

function isRange(props: Partial<VSingleDatePickerProps | VRangeDatePickerProps>): props is VRangeDatePickerProps {
  return RangeList.includes(props.type ?? null as any)
}

function merge<T extends object>(props: VFormProps<T>, item: VDatePickerItem<T>) {
  return mergeProps(props.form, item.props as VPropDef<T, VSingleDatePickerProps | VRangeDatePickerProps>)
}
registerRender({
  type: 'DatePicker',
  render(props, item) {
    const Value = computed({
      get() {
        const itemProps = merge(props, item);
        if (isRange(itemProps)) {
          return [
            getWithTransfer(props.form, item.dataIndex, item.transfer),
            // @ts-ignore
            getWithTransfer(props.form, item.dataIndexEnd, item.transfer),
          ]
        }
        return getWithTransfer(props.form, item.dataIndex, item.transfer)
      },
      set(value) {
        const itemProps = merge(props, item);
        if (isRange(itemProps)) {
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
          return
        }
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

