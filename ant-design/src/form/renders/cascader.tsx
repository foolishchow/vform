import type {
  CascaderProps,
} from 'ant-design-vue'
import {
  Cascader,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';
import type { ValueType as CascaderValueType } from 'ant-design-vue/lib/vc-cascader/Cascader';

/**
   * 类型  cascader
   */
export interface VCascaderItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, CascaderProps>,
  transfer?: VTransfer<Into<T, Key>, CascaderValueType>
}

registerRender({
  type: 'Cascader',
  render: (props, item) => {
    return <Cascader {...mergeProps(props.form, item.props)}
      // @ts-ignore
      // v-model:value={props.form[item.dataIndex]}
      value={getWithTransfer(props.form, item.dataIndex, item?.transfer?.get)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer?.set)}
    />
  }
})
