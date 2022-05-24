import type { RangePickerProps } from 'ant-design-vue/lib/date-picker';
import { DeepKey, Into, VFormProps, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import { RangePicker } from 'ant-design-vue'
import { ref, watchEffect, computed } from 'vue';
import { Dayjs } from 'dayjs';
import type { VBaseItem } from '.';
import { registerRender } from '../register';

export interface VDateRangePickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>, EndKey extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型  date-range-picker
   */
  dataIndexEnd: EndKey
  props?: VPropDef<T, RangePickerProps>
  transfer?: VTransfer<Into<T, Key | EndKey>, Dayjs>
}

export function renderDateRangePicker<T extends object, Key extends DeepKey<T> = DeepKey<T>>(
  props: VFormProps<T>,
  item: VDateRangePickerItem<T, Key>
) {
  const Value = computed({
    get() {
      return [
        getWithTransfer(props.form, item.dataIndex, item.transfer),
        getWithTransfer(props.form, item.dataIndexEnd, item.transfer),
      ]
    },
    set(value) {
      if (!value) {
        setWithTransfer(props.form, item.dataIndex, null as any, item.transfer);
        setWithTransfer(props.form, item.dataIndexEnd, null as any, item.transfer);
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
    pickerProps.value = mergeProps(props.form, item.props)
  })
  // @ts-ignore
  return () => {
    return <RangePicker {...(pickerProps.value ?? {})}
      v-model:value={Value.value} />
  }

}

registerRender({
  type: 'DateRangePicker',
  render(props, item) {
    return renderDateRangePicker(props, item)
  }
})