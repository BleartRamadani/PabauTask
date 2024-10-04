import { getBookingById } from "@/helpers/get-booking-by-id";
import Link from "next/link";
import React from "react";

interface Param {
  id:string
}

interface ParamProp {
  params: Param
}

async function page({ params }:ParamProp) {
  const id = params.id;

  const booking = await getBookingById(id);
  const spanClass = 'font-extrabold text-slate-900'
  return (
    <div className="w-full h-full flex-center text-center">
      <div className="w-[90%] m-auto flex-center flex-col gap-10">
        <h1 className="bg-main-blue text-white font-bold text-lg px-4 rounded-2xl py-2">
          This Booking is with <span className={spanClass}>{booking.doctor_name}</span> <br /> For <span className={spanClass}>{booking.service}</span> and
          it ends on <span className={spanClass}>{booking.end_time}</span>
        </h1>

        <div className="rounded-lg overflow-hidden">
          <Link href={"/"} className="px-14 bg-slate-950 block text-white py-3">Go Back</Link>
        </div>
      </div>
    </div>
  );
}

export default page;
