/**
 * 下载文件调用
 * @param 接口返回数据 文件名
 */
export default{
  downloadFile: function(res, fileName) {
    if (!res) {
      return
    }
    let url = window.URL.createObjectURL(new Blob([res]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)// 文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
    console.log(1111)
  }
}
