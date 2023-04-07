import { ElUpload, UploadFile } from 'element-plus'
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

//#region rate
type UploadProps = VueProps<typeof ElUpload>
export interface VUploadItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus {@link ElUpload}`的属性
   */
  props?: VPropDef<T, UploadProps>
  slots?: {
    /**
     * 自定义默认内容
     */
    default?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 触发文件选择框的内容
     */
    trigger?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 提示说明文字
     */
    tip?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 缩略图模板的内容
     */
    file?: (option: { file: UploadFile }) => (JSX.Element | JSX.Element[] | string)
  },
}

registerRender({
  type: 'Upload',
  render(props, item) {
    return <ElUpload {...mergeProps(props.form, item.props)}
      v-slots={item.slots ?? {}} />
  }
})
//#endregion





