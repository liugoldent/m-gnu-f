function getPreviousDayTimestamp() {
  const today = new Date()

  // 前一天
  const previousDay = new Date(today)
  previousDay.setDate(today.getDate() - 1)

  // 將前一天的日期轉換為時間戳
  const previousDayTimestamp = previousDay.getTime()

  return previousDayTimestamp
}

function getPreviousTwoDays() {
  const today = new Date()

  // 前一天
  const previousDay = new Date(today)
  previousDay.setDate(today.getDate() - 1)

  // 前一天是星期幾
  const previousDayOfWeek = previousDay.getDay()

  // 如果前一天是星期六（6），則再減去一天
  if (previousDayOfWeek === 6) {
    previousDay.setDate(previousDay.getDate() - 1)
  }

  // 前兩天
  const previousTwoDays = new Date(today)
  previousTwoDays.setDate(today.getDate() - 2)

  // 前兩天是星期幾
  const previousTwoDaysOfWeek = previousTwoDays.getDay()

  // 如果前兩天是星期六（6）或星期日（0），則分別減去一天或兩天
  if (previousTwoDaysOfWeek === 6) {
    previousTwoDays.setDate(previousTwoDays.getDate() - 1)
  } else if (previousTwoDaysOfWeek === 0) {
    previousTwoDays.setDate(previousTwoDays.getDate() - 2)
  }
  // toLocaleDateString：變成字串格式
  // getTime()：為數字格式
  return {
    previousDay: previousDay.getTime(),
    previousTwoDays: previousTwoDays.getTime()
  }
}

export { getPreviousDayTimestamp, getPreviousTwoDays }
