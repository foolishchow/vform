import type {
  RateProps,
} from 'ant-design-vue'
import {
  Rate,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型 rate
 */
export interface VRateItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {

  /**
   * `ant-design-vue rate`的属性
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
    return <Rate {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
      v-slots={item.slots ?? {}} />
  }
})