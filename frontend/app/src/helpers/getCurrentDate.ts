export function getCurrentDate() {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}