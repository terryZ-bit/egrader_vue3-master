import { VxeColumnPropTypes } from 'vxe-table'
import XEUtils from 'xe-utils'

const typeYesOrNoList = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
]

const typeNullList = [{ label: '暂无', value: null }]

export const formatYesOrNo: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = typeYesOrNoList.find((item) => item.value === cellValue)
  return item ? item.label : ''
}
export const formatTime: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss')
}

export const formatNullToCh: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = typeNullList.find((item) => item.value === cellValue)
  return item ? item.label : cellValue
}

export const GMTToStr = function (time) {
  const date = new Date(time)
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  )
}
