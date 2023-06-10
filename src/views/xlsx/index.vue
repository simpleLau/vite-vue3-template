<template>
  <div @click="exportFile">下载</div>
</template>

<script setup name="XlsxExample">
import { utils, writeFileXLSX } from 'xlsx'

const mergedCells = [
  {
    name: '序号',
    prop: 'id'
  },
  {
    name: '姓名',
    prop: 'name'
  },
  {
    name: '性别',
    prop: 'sex'
  },
  {
    name: '公司概况',
    children: [
      {
        name: '职位',
        prop: 'jobTitle'
      },
      {
        name: '项目',
        children: [
          {
            name: '项目时长',
            prop: 'projectTime'
          },
          {
            name: '项目描述',
            prop: 'projectDesc'
          },
          {
            name: '金额',
            children: [
              {
                name: '总金额',
                prop: 'total'
              },
              {
                name: '利润',
                prop: 'profit'
              }
            ]
          }
        ]
      },
      {
        name: '公司名称',
        prop: 'companyName'
      }
    ]
  },
  {
    name: '备注',
    prop: 'remark'
  }
]

const list = [
  {
    id: 0,
    name: '张三',
    sex: '男',
    jobTitle: '区域经理',
    projectTime: '3天',
    projectDesc: '暂无描述',
    total: 998,
    profit: 9.98,
    companyName: '阿里巴巴',
    remark: '暂无'
  },
  {
    id: 1,
    name: '李四',
    sex: '女',
    jobTitle: 'CEO',
    projectTime: '30天',
    projectDesc: '稳了',
    total: 998,
    profit: 9.98,
    companyName: '中石油',
    remark: '暂无'
  }
]

const getCellsPosition = (headers, bodys) => {
  const map = new Map()

  const getCellsSize = (list) => {
    if (map.has(list)) {
      return map.get(list)
    }
    if (list?.length) {
      let rows = -1
      let cols = list.length - 1
      list.forEach((item) => {
        if (item.children) {
          const size = getCellsSize(item.children)
          rows = Math.max(size[0], rows)
          cols += size[1]
        }
      })
      map.set(list, [rows + 1, cols])
      return [rows + 1, cols]
    }
  }

  const size = getCellsSize(headers)
  const headerMerge = []
  const mergeHeadersCell = (headers, row, col) => {
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      if (!cell.children?.length) {
        if (row !== size[0]) {
          headerMerge.push({
            s: { r: row, c: col + i },
            e: { r: size[0], c: col + i }
          })
        }
      } else {
        const size = map.get(cell.children)
        headerMerge.push({
          s: { r: row, c: col + i },
          e: { r: row, c: col + size[1] + i }
        })
        mergeHeadersCell(cell.children, row + 1, col + i)
        col += size[1]
      }
    }
  }
  const headerValue = []

  const getHeadersValue = (headers, row, col) => {
    if (!headerValue[row]) {
      headerValue[row] = new Array(col).fill('')
    }
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      headerValue[row].push(cell.name)
      if (cell.children?.length) {
        const len = getCellsSize(cell.children)[1]
        const emptyNameList = new Array(len).fill('')
        headerValue[row].push(...emptyNameList)
        getHeadersValue(cell.children, row + 1, col + i)
      }
    }
  }

  const bodyMapList = []
  const getBodyMapList = (list) => {
    if (list?.length) {
      list.forEach((item) => {
        if (!item.children) {
          bodyMapList.push(item.prop)
        } else {
          getBodyMapList(item.children)
        }
      })
    }
  }

  getBodyMapList(headers)
  mergeHeadersCell(headers, 0, 0)
  getHeadersValue(headers, 0, 0)

  return {
    headerMerge,
    headerValue,
    bodyValue: bodys.map((item) => bodyMapList.map((key) => item[key])),
    deep: map.get(headers)[0]
  }
}
// 导出多表头结构
function exportFile() {
  const ws = utils.json_to_sheet([])
  const { headerValue, headerMerge, bodyValue, deep } = getCellsPosition(
    mergedCells,
    list
  )
  ws['!merges'] = headerMerge
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  utils.sheet_add_aoa(ws, headerValue, { origin: 'A1' }) // 将js数据转换为工作表
  utils.sheet_add_aoa(ws, bodyValue, { origin: `A${deep + 2}` }) // 将js数据转换为工作表
  writeFileXLSX(wb, `${+new Date()}.xlsx`)
}
</script>
