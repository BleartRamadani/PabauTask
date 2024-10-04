export default async function postBooking(booking: {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}) {
  try {
    const res = await fetch("http://host.docker.internal:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      return {
        status: res.status,
        message: `Error: ${res.status} ${errorMessage}`,
      };
    }

    console.log("response", res);
    const data = await res.text();

    return {
      status: res.status,
      message: data,
    };
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.error(error)
      return {
        status: 500,
        message: error.message
      }
    } else {
      console.error('Unexpected error:', error)
      return {
        status: 500,
        message: 'An unexpected error ocurred'
      }
    }
  }
}
