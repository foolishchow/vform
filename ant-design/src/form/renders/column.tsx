import { Col } from 'ant-design-vue';
import { VBaseItem } from '.';
import { registerRender } from '../register';
import { DeepKey } from '../types';

/**
  * 类型 Column
  */
export interface VColumnItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends Partial<VBaseItem<T, Key>> {


}

registerRender({
  type: 'Column',
  labelRender(props, item, validateTrigger, itemSpan, itemIndex) {
    return <Col span={itemSpan * (item.colSpan ?? 1)}></Col>
  }
})