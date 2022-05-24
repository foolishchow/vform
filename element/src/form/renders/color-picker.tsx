import { ElColorPicker } from 'element-plus';
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'

type VColorPickerProps = VueProps<typeof ElColorPicker>
export interface VColorPickerItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 ColorPicker
   */
  props?: VPropDef<T, VColorPickerProps>
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, string>
}

registerRender({
  type: 'ColorPicker',
  render(props, item) {
    return <ElColorPicker
      {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})