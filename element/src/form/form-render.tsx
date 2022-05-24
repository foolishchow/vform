import { ElButton, ElCol, ElFormItem, ElRow } from 'element-plus';
import type { VFormProps, DeepKey, DynamicDef } from './types';
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
    dynamicItem: PropTypes.any<DynamicDef<any, VFormItem<any>>>(),
    itemIndex: PropTypes.number.isRequired
  },
  setup(props, context) {
    const item = ref<VFormItem<any>>()
    watchEffect(() => {
      item.value = getDynamic(props.formProps.form, props.dynamicItem)
    })
    return () => {
      return renderFormLabel(props.formProps, item.value!, props.itemIndex)
    }
  }
})

/**
 * 渲染组件form Item
 */
export function renderFormLabel<T extends object, Key extends DeepKey<T> = DeepKey<T>>(
  props: VFormProps<T>,
  dynamicItem: VFormItem<T, Key>,
  itemIndex: number
) {
  const itemSpan = Math.floor(24 / (props.row ?? 3));
  const item = dynamicItem
  if (!item) {
    return undefined
  }
  const render = getLabelRender(item)
  if (render) {
    // @ts-ignore
    return render(props, item, itemSpan, itemIndex, renderItem)
  }
  // @ts-ignore
  return renderDefaultFormLabel(props, item, itemSpan)
}

function renderFormButtons<T extends object>(
  props: VFormProps<T>
) {
  const buttons = props.buttons ?? []
  if (buttons.length == 0) {
    return undefined
  }
  const itemSpan = Math.floor(24 / (props.row ?? 3));
  return <ElCol span={itemSpan}>
    <ElFormItem>
      {buttons.map(btn => {
        return (
          <ElButton {...(btn.props || {})} onClick={props.onButtonClick?.bind(null, btn.action)}>
            {btn.text}
          </ElButton>
        );
      })}
    </ElFormItem>
  </ElCol>
}

/**
 * 循环渲染表单item
 * @param props 表单属性
 * @returns
 */
export function SDFormRender<T extends object>(
  props: VFormProps<T>
) {
  return (
    <ElRow v-slots={{
      default: () => {
        return <>
          {(props.items ?? []).map((dynamicItem, index) => {
            return <FormItemHolder key={index} formProps={props} dynamicItem={dynamicItem} itemIndex={index} />
          })}
          {renderFormButtons(props)}
        </>
      }
    }} />
  );
}
