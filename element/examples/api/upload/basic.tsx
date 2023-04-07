import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { ElButton, ElMessage, ElMessageBox, UploadUserFile } from 'element-plus'

const FormBuilder = useFormBuilder<BaseInfo>()
  .Upload(() => {
    const fileList = ref<UploadUserFile[]>([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    return {
      dataIndex: 'name',
      label: '',
      props: {
        fileList: fileList.value,
        limit: 3,
        multiple: true,
        action: "https://jsonplaceholder.typicode.com/posts/",
        onPreview(uploadFile) {
          console.log(uploadFile)
        },
        onRemove(file, uploadFiles) {
          console.log(file, uploadFiles)
        },
        onExceed(files, uploadFiles) {
          ElMessage.warning(
            `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
            } totally`
          )
        },
        beforeRemove(uploadFile, uploadFiles) {
          return ElMessageBox.confirm(
            `Cancel the transfert of ${uploadFile.name} ?`
          ).then(
            () => true,
            () => false
          )
        }
      },
      slots: {
        default() {
          return <ElButton type="primary">Click to upload</ElButton>
        },
        tip() {
          return <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        }
      }
    }
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      city: 3.7
    } as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items}
        labelWidth="100px">
      </Form>
    }
  }
})