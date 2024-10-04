"use client";

import React, { useState } from "react";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import { convertTo12HourFormat } from "@/helpers/convert-time";
import postBooking from "@/helpers/post-booking";
import { useRouter } from "next/navigation";

function Page() {
  const currentDate = getCurrentDate();
  const [formData, setFormData] = useState({
    service: "A",
    doctor_name: "Dr. ",
    start_time: "",
    end_time: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(formData);

    const { service, doctor_name, start_time, end_time, date } = formData;
    

    if (!doctor_name) {
      setError("Doctor Name is invalid!");
      return;
    }
    if (!start_time) {
      setError("You need to set the starting Time!");
      return;
    }
    if (!end_time) {
      setError("You need to set the ending Time!");
      return;
    }
    if (!date) {
      setError("You need to select a Date!");
      return;
    }

    const start_time_12hr= convertTo12HourFormat(start_time);
    const end_time_12hr = convertTo12HourFormat(end_time);

    const selectedDate = new Date(date);
    const todaysDate = new Date(currentDate);

    const splitCurrentDate = currentDate.split("-");

    if (selectedDate.getFullYear() < todaysDate.getFullYear()) {
      setError(
        `Please select a Year that is no earlier than ${splitCurrentDate[0]}!`
      );

      return;
    } else if (
      selectedDate.getFullYear() === todaysDate.getFullYear() &&
      selectedDate.getMonth() < todaysDate.getMonth()
    ) {
      setError(
        `Please select a Month that is no earlier than ${splitCurrentDate[1]}!`
      );
      return;
    } else if (
      selectedDate.getFullYear() === todaysDate.getFullYear() &&
      selectedDate.getMonth() === todaysDate.getMonth() &&
      selectedDate.getDate() < todaysDate.getDate()
    ) {
      setError(
        `Please select a Day that is no earlier than ${splitCurrentDate[2]}!`
      );
      return console.log("Year and month are equal, but the day is wrong");
    }

    const isoDate = selectedDate.toISOString().split("T")[0];

    const booking = {
      service: `Service ${service}`,
      doctor_name,
      start_time: start_time_12hr,
      end_time: end_time_12hr,
      date: isoDate,
    };

    const result = await postBooking(booking);

    if (result.status === 201) {
      console.log(result.message);
      handleSuccessMsg(result.message);
    } else {
      setError(result.message);
    }
  }

  function handleSuccessMsg(msg: string) {
    setSuccessMessage(msg); 
    setError("");

    setTimeout(() => {
      setSuccessMessage("");
      router.push("/");
    }, 3000);
  }

  const serviceRooms = "ABCDEF".split("");

  return (
    <form
      onSubmit={handleSubmitForm}
      className="border-2 border-main-blue w-[65%] xl:w-[800px]"
    >
      <h1 className="font-semibold uppercase bg-main-blue h-12 flex-center text-white rounded-sm shadow-main-shadow px-4 mb-4 lg:text-3xl lg:h-14">
        Book an Appointment
      </h1>
      <div className="div-grid  sm:items-center">
        <div className="first">
          <label htmlFor="service">Service</label>
          <select
            name="service"
            id="service"
            value={formData.service}
            onChange={handleChange}
            className="ml-4"
          >
            {serviceRooms.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
        <div className="sec">
          <label htmlFor="doctor_name">Doctor Name</label>
          <input
            type="text"
            id="doctor_name"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            className="bg-[#C9D1DB] block lg:inline-block outline-none mt-1 focus:border-[1px] focus:border-main-blue h-7 ps-2"
          />
        </div>
        <div className="third">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="outline-[1px] outline-blue-70 outline-none focus:outline-2 focus:outline-main-blue rounded px-2 ml-2"
          />
        </div>
        <div className="fourth">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-fit outline-[1px] outline-blue-70 outline-none focus:outline-2 focus:outline-main-blue rounded px-2 ml-2"
          />
        </div>
        <div className="fifth">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            min={currentDate}
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-fit outline-[1px] outline-blue-70 outline-none focus:outline-2 focus:outline-main-blue rounded px-2 ml-2"
          />
        </div>
        {error.length !== 0 && (
          <div className="text-red-700 text-sm -mt-3 text-center font-bold">
            {error}
          </div>
        )}
        {successMessage.length !== 0 && (
          <div className="text-green-500 text-sm -mt-3 text-center font-bold">
            {successMessage}
          </div>
        )}
      </div>

      <div className="border-black border-2 w-fit m-auto mt-4 mb-2 rounded-lg overflow-hidden">
        <button
          type="submit"
          className="w-full bg-slate-950 block text-white py-2 px-3"
        >
          Submit Page
        </button>
      </div>
    </form>
  );
}

export default Page;
