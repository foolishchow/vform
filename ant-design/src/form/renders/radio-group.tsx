import type {
  RadioGroupProps,
} from 'ant-design-vue'
import {
  RadioGroup,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';


/**
 *  类型  radio-group
 */
export interface VRadioGroupItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  props?: VPropDef<T, RadioGroupProps>
}

registerRender({
  type: 'RadioGroup',
  render(props, item) {
    return <RadioGroup {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      value={getWithTransfer(props.form, item.dataIndex)}
      // @ts-ignore
      onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e)}
    />
  }
})