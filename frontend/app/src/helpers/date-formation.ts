export default function formattedDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate
}


export function getCurrentDate() {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')

  const currentDate = `${year}-${month}-${day}`
  return currentDate
}
