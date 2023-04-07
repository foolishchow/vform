import type {
  InputProps,
} from 'ant-design-vue'
import {
  Input,
} from 'ant-design-vue'
import type { VBaseItem } from '.';
import { PropTypes } from '../../utils/vue-types';
import { registerRender } from '../register';
import type { DeepKey, Into, VPropDef, VTransfer } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils';


Input.props.autocomplete = PropTypes.string.def('off')

/**
 * 类型 input
 */
export interface VInputItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends VBaseItem<T, Key> {
  /**
   * `ant-design-vue Input`的属性
   */
  props?: VPropDef<T, InputProps>
  slots?: {
    prefix?: JSX.Element | { (): JSX.Element }
    suffix?: JSX.Element | { (): JSX.Element }
  }
  transfer?: VTransfer<Into<T, Key>, string | number>
}
registerRender({
  type: 'Input',
  render(props, item) {
    return () => {
      return <Input {...mergeProps(props.form, item.props)}
        value={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
        // @ts-ignore
        onUpdate:value={e => setWithTransfer(props.form, item.dataIndex, e, item?.transfer)}
        // v-model:value={props.form[item.dataIndex]}
        v-slots={item.slots ?? {}} />
    }
  }
})
