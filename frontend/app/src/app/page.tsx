import BookingList from "@/components/BookingList";
import { getBookings } from "@/helpers/get-booking-by-id";


const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <div className="flex-center flex-col gap-5 border-2 border-main-blue rounded-sm py-4 px-2 w-full lg:w-[90%] lg:m-auto lg:h-fit">
        <h1 className="font-semibold uppercase bg-main-blue h-12 flex-center text-white rounded-sm shadow-main-shadow px-4 lg:text-2xl">
          Current booking count: {bookings.length}
        </h1>
        <ul className="p-2 text-center flex flex-col gap-2 overflow-x-scroll h-[70vh] lg:flex-row lg:flex-wrap lg:items-center lg:justify-center ">
          {bookings.map((booking: {start_time: string, date: string, id: string }, idx: number) => (
            <li key={idx} className="lg:w-1/4 xl:w-1/6 2xl:1/8" >
              <BookingList booking={booking} />
            </li>
          ))}
        </ul>
      </div> 
    </div>
  );
};

export default Home;
