import { ElSlider } from 'element-plus'
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

//#region slider
export type VSliderProps = VueProps<typeof ElSlider>
export interface VSliderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 slider
   */
  /**
   * `element-plus slider`的属性
   */
  props?: VPropDef<T, VSliderProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'Slider',
  render(props, item) {
    return <ElSlider {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})
//#endregion





