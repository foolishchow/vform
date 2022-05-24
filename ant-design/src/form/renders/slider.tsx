import type {
  SliderProps,
} from 'ant-design-vue'
import {
  Slider,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';

/**
 * 类型 slider
 */
export interface VSliderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  props?: VPropDef<T, SliderProps>
  transfer?: VTransfer<any, any>
}

registerRender({
  type: 'Slider',
  render: (props, item) => {
    return <Slider {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
    />
  }
})