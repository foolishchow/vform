import { ElSwitch } from 'element-plus'
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

//#region switch
export type VSwitchProps = VueProps<typeof ElSwitch>
export interface VSwitchItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 switch
   */
  /**
   * `element-plus switch`的属性
   */
  props?: VPropDef<T, VSwitchProps>
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'Switch',
  render(props, item) {
    return <ElSwitch {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any, item?.transfer)}
    />
  }
})
//#endregion





