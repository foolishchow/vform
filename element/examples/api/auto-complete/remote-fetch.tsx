import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

interface LinkItem {
  value: string
  link: string
}



const loadAll = (): Promise<LinkItem[]> => {
  return Promise.resolve([
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ])
}

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}


const FormBuilder = useFormBuilder<BaseInfo>()
  .AutoComplete(() => {

    const links = ref<LinkItem[]>([])
    loadAll().then(result => {
      links.value = result
    })

    let timeout: NodeJS.Timeout
    const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
      const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    }

    return {
      dataIndex: 'name',
      label: '姓名',
      props: {
        placeholder: 'Please Input',
        clearable: true,
        triggerOnFocus: false,
        fetchSuggestions: querySearchAsync,
        onSelect(item) {
          console.log(item)
        }
      }
    }
  })

export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({} as any)
    const Form = FormBuilder.form()
    const items = FormBuilder.build()
    return () => {
      return <Form row={1} form={formData} items={items} >
      </Form>
    }
  }
})