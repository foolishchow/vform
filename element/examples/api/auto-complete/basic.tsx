import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'

interface RestaurantItem {
  value: string
  link: string
}

const loadAll = (): Promise<RestaurantItem[]> => {
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
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const FormBuilder = useFormBuilder<BaseInfo>()
  .AutoComplete(() => {

    const restaurants = ref<RestaurantItem[]>([])
    loadAll().then(result => {
      restaurants.value = result
    })

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
      // call callback function to return suggestions
      cb(results)
    }

    return {
      dataIndex: 'name',
      label: '姓名',
      props: {
        placeholder: 'Please Input',
        clearable: true,
        triggerOnFocus: false,
        fetchSuggestions: querySearch,
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