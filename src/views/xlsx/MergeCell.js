export default class MergeCell {
  #map

  #size

  constructor(headers, data) {
    this.headerMerge = []
    this.headerValue = []
    this.bodyMapList = []
    this.#map = new Map()
    this.deep = 0
    this.init(headers, data)
  }

  /** 数据初始化 */
  init(headers, data) {
    this.#size = this.getCellsSize(headers)
    this.getBodyMapList(headers)
    this.mergeHeadersCell(headers, 0, 0)
    this.getHeadersValue(headers, 0, 0, this.getCellsSize(headers))
    this.bodyValue = data.map((item) =>
      this.bodyMapList.map((key) => item[key])
    )
    this.headerValue.pop()
    this.deep = this.getDeep(headers)
  }

  /** 获取表头最大深度 */
  getDeep(headers) {
    return this.#map.get(headers)[0]
  }

  /** 根据节点获取深度广度 */
  getCellsSize(list) {
    if (this.#map.has(list)) {
      return this.#map.get(list)
    }
    if (list?.length) {
      let rows = -1
      let cols = list.length - 1
      list.forEach((item) => {
        if (item.children) {
          const size = this.getCellsSize(item.children)
          rows = Math.max(size[0], rows)
          cols += size[1]
        }
      })
      this.#map.set(list, [rows + 1, cols])
      return [rows + 1, cols]
    }
  }

  /** 合并表头 */
  mergeHeadersCell = (headers, row, col) => {
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      if (!cell.children?.length) {
        if (row !== this.#size[0]) {
          this.headerMerge.push({
            s: { r: row, c: col + i },
            e: { r: this.#size[0], c: col + i }
          })
        }
      } else {
        const size = this.#map.get(cell.children)
        this.headerMerge.push({
          s: { r: row, c: col + i },
          e: { r: row, c: col + size[1] + i }
        })
        this.mergeHeadersCell(cell.children, row + 1, col + i)
        col += size[1]
      }
    }
  }

  /** 表头赋值 */
  getHeadersValue(headers, row, col, size) {
    if (!this.headerValue[row]) {
      this.headerValue[row] = new Array(col).fill('')
    }
    if (!headers?.length) {
      this.headerValue[row].push('')
      row < size[0] && this.getHeadersValue(null, row + 1, col, size)
      return
    }
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      this.headerValue[row].push(cell.name)
      if (cell.children?.length) {
        const len = this.getCellsSize(cell.children)[1]
        const emptyNameList = new Array(len).fill('')
        this.headerValue[row].push(...emptyNameList)
      }
      this.getHeadersValue(cell.children, row + 1, col + i, size)
    }
  }

  /** 正文prop对应 */
  getBodyMapList(list) {
    if (list?.length) {
      list.forEach((item) => {
        if (!item.children) {
          this.bodyMapList.push(item.prop)
        } else {
          this.getBodyMapList(item.children)
        }
      })
    }
  }
}
