import formattedDate from "@/helpers/date-formation";
import Link from "next/link";
import React from "react";

interface Booking {
  id: string;  
  date: string; 
  start_time: string; 
}

interface BookingListProps {
  booking: Booking;
}

function BookingList({ booking }: BookingListProps) {
  const date = formattedDate(booking.date);

  return (
    <Link
      href={`/booking/${booking.id}`}
      className=" block py-1 bg-blue-70 text-white hover:bg-main-blue focus-within:bg-main-blue px-1 font-medium transition-all scale-95 hover:scale-100"
    >
      A Booking on <span className="font-bold text-slate-900">{date}</span> {" "}
      starting at <br />{" "}
      <span className="font-bold text-slate-900">{booking.start_time}</span>
    </Link>
  );
}

export default BookingList;
