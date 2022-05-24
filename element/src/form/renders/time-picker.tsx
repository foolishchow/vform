import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import { ref, watchEffect, computed } from 'vue';
import type { dayjs } from 'element-plus';
import type { DeepKey, Into, VFormProps, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { ElTimePicker } from 'element-plus'
import { registerRender } from '../register';

export type VTimePickerProps = VueProps<typeof ElTimePicker>
export type VBaseTimePickerProps = Omit<VTimePickerProps, 'isRange'>

export type VSingleTimePickerProps = Omit<VBaseTimePickerProps, 'startPlaceholder' | 'endPlaceholder' | 'rangeSeparator'> & {
  isRange?: false | undefined
}

export interface VSingleTimePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  props?: VPropDef<T, VSingleTimePickerProps>
  transfer?: VTransfer<Into<T, Key>, dayjs.Dayjs | number | Date>
}

export type VRangeTimePickerProps = Omit<VBaseTimePickerProps, 'placeholder'> & {
  isRange: true
}

export interface VRangeTimePicker<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  EndKey extends DeepKey<T> = DeepKey<T>
  > extends VBaseItem<T, Key> {
  dataIndexEnd: EndKey
  props?: VPropDef<T, VRangeTimePickerProps>
  transfer?: VTransfer<Into<T, Key | EndKey>, dayjs.Dayjs | number | Date>
}


export type VTimePickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> = (VSingleTimePicker<T, Key> | VRangeTimePicker<T, Key>)


function isRange(props: Partial<VSingleTimePickerProps | VRangeTimePickerProps>): props is VRangeTimePickerProps {
  return props.isRange == true
}

function merge<T extends object>(props: VFormProps<T>, item: VTimePickerItem<T>) {
  return mergeProps(props.form, item.props as VPropDef<T, VSingleTimePickerProps | VRangeTimePickerProps>)
}
registerRender({
  type: 'TimePicker',
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
      return <ElTimePicker {...(pickerProps.value ?? {})}
        modelValue={Value.value}
        onUpdate:modelValue={e => Value.value = e}
      />
    }
  }
})

