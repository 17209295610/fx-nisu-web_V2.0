// 删除或注释掉以下代码
// const getVisitorCount = async () => {
//   try {
//     const response = await fetch('/.netlify/functions/visitor')
//     if (!response.ok) throw new Error('Network response was not ok')
//     const data = await response.json()
//     pv.value = data.count
//   } catch (error) {
//     console.error('获取访问量失败：', error)
//   }
// }