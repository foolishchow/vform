import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import { Options } from './options'


const FormBuilder = useFormBuilder<BaseInfo>()
  .Cascader({
    dataIndex: 'hobits',
    label: '展开所有(默认)',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      props: {
        multiple: true
      },
      options: Options
    }
  })
  .Cascader({
    dataIndex: 'choices',
    label: '折叠已选项',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      collapseTags: true,
      props: {
        multiple: true,
        expandTrigger: 'hover'
      },
      options: Options
    }
  })
  .Cascader({
    dataIndex: 'friuts',
    label: '折叠已选项(tooltip)',
    props: {
      placeholder: 'Please Select',
      clearable: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      props: {
        multiple: true,
        expandTrigger: 'hover'
      },
      options: Options
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} labelWidth="200px"
        form={formData} items={items} />
    }
  }
})