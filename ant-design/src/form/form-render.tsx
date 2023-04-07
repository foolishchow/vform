import { Button, Col, FormItem, Row } from 'ant-design-vue';
import type { VFormProps, DeepKey, DynamicDef, FormRenderExtra } from './types';
import { getLabelRender } from './register';
import { getDynamic } from './utils';
import { renderDefaultFormLabel, renderItem } from './item-render';
import { defineComponent, ref, watchEffect } from 'vue';
import { PropTypes } from '../utils/vue-types';
import type { VFormItem } from './renders';

export const FormItemHolder = defineComponent({
  name: 'form-item-holder',
  props: {
    formProps: PropTypes.object<VFormProps<any>>().isRequired,
    dynamicItem: PropTypes.any<DynamicDef<any, VFormItem<any>>>().isRequired,
    itemIndex: PropTypes.number.isRequired,
    extra: PropTypes.any<FormRenderExtra>()
  },
  setup(props, context) {
    const item = ref<VFormItem<any>>()
    watchEffect(() => {
      item.value = getDynamic(
        props.formProps.form,
        props.dynamicItem
      )
    })
    return () => {
      return renderFormLabel(
        props.formProps,
        item.value!,
        props.itemIndex,
        props.extra
      )
    }
  }
})

/**
 * 渲染组件form Item
 */
export function renderFormLabel<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
>(
  props: VFormProps<T>,
  dynamicItem: VFormItem<T, Key>,
  itemIndex: number,
  extra?: FormRenderExtra
) {
  const formValidateTrigger = props.validateTrigger
  const itemSpan = Math.floor(24 / (props.row ?? 3));
  const item = dynamicItem
  if (!item) {
    return undefined
  }
  const render = getLabelRender(item)
  if (render) {
    return render(
      props,
      item,
      formValidateTrigger!,
      itemSpan,
      itemIndex,
      // @ts-ignore
      renderItem,
      extra
    )
  }
  return renderDefaultFormLabel(
    props,
    item,
    formValidateTrigger!,
    itemSpan,
    extra
  )
}

function renderFormButtons<T extends object>(
  props: VFormProps<T>
) {
  const buttons = props.buttons ?? []
  if (buttons.length == 0) {
    return undefined
  }
  const itemSpan = Math.floor(24 / props.row!);
  return <Col span={itemSpan}>
    <FormItem>
      {buttons.map(btn => {
        return (
          <Button
            {...(btn.props || {})}
            onClick={props.onButtonClick?.bind(null, btn.action)}>
            {btn.text}
          </Button>
        );
      })}
    </FormItem>
  </Col>
}

/**
 * 循环渲染表单item
 * @param props 表单属性
 * @returns
 */
export function VFormRender<T extends object>(
  props: VFormProps<T>
) {
  return (
    <Row v-slots={{
      default: () => {
        return <>
          {(props.items ?? []).map((dynamicItem, index) => {
            return <FormItemHolder
              key={index}
              formProps={props}
              dynamicItem={dynamicItem}
              itemIndex={index}
            />
            //renderFormLabel(props, dynamicItem, index)
          })}
          {renderFormButtons(props)}
        </>
      }
    }} />
  );
}
