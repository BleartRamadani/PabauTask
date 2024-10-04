export async function getBookings() {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getBookingById(id: string) {
  const result = await getBookings()

  const bookingId: number = JSON.parse(id)

 
  const booking = result.find((object: any) => object.id === bookingId)

  return booking
}