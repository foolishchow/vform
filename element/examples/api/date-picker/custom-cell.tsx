import { defineComponent, reactive, ref } from 'vue'
import { useFormBuilder } from 'vform-element'
import type { BaseInfo } from '@examples/types'
import type { DateCell } from 'element-plus/es/components/date-picker/src/date-picker.type'
import './custom-cell.css'
const holidays = [
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
]

const isHoliday = ({ dayjs }: DateCell) => {
  return holidays.includes(dayjs!.format('YYYY-MM-DD'))
}

const FormBuilder = useFormBuilder<BaseInfo>()
  .DatePicker({
    dataIndex: 'name',
    label: '请选择日期',
    props: {
      type: 'date',
      placeholder: '请选择日期',
      valueFormat: 'YYYY-MM-DD',
      popperClass: 'custom-cell-wrapper'
    },
    slots: {
      default(cell) {
        return <div class={["cell", { current: cell.isCurrent }]}>
          <span class="text">{cell.text}</span>
          {isHoliday(cell) ? <span class="holiday" /> : null}
        </div>
      },
    }
  })


export default defineComponent({
  setup(props, context) {
    const formData = reactive<BaseInfo>({
      name: '2021-10-02'
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