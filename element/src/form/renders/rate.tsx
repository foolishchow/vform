import { ElRate } from 'element-plus'
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

//#region rate
type RateProps = VueProps<typeof ElRate>
export interface VRateItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus {@link ElRate}`的属性
   */
  props?: VPropDef<T, RateProps>
  slots?: {
    character?: JSX.Element | { (): JSX.Element }
  },
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'Rate',
  render(props, item) {
    return <ElRate {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
      v-slots={item.slots ?? {}} />
  }
})
//#endregion





