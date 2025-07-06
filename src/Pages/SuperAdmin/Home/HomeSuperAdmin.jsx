import React from "react";
import BarChart from "../BarChart";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";

const HomeSuperAdmin = () => {
  return (
    <div className=" mx-5! ">
      {/* title */}
      <span className="font-medium text-[20px] text-mainColor">
        {" "}
        Overview Stats
      </span>
      {/* boxs */}
      <div className="flex flex-wrap justify-between w-[95%] gap-2">
        {/*Tourism Companies  */}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor  min-w-[168px]  h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor">
            Tourism Companies
          </span>
        </div>
        {/*  Hotels*/}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor w-[168px] h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor">Hotels </span>
        </div>
        {/* Total Bookings */}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor w-[168px] h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor"> Total Bookings</span>
        </div>
        {/*  Pending*/}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor w-[168px] h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor">Pending </span>
        </div>
        {/*  Active Subscriptions*/}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor w-[168px] h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor">
            Active Subscriptions{" "}
          </span>
        </div>
        {/* Clients */}
        <div className="flex flex-col gap-2 py-3 px-2 mt-5 bg-fivethColor w-[168px] h-[92px] rounded-[10px]">
          <i className="text-[24px] font-medium text-mainColor">45</i>
          <span className="text-[15px]   text-mainColor">Clients </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-5 md:flex-row">
        <div className="w-full md:w-2/3">
          <BarChart />
        </div>

        <div className="flex flex-col w-full space-y-4 md:w-1/3">
          <span className="font-medium text-[24px] text-mainColor">
            Quick Actions:
          </span>

          <Link
            to="/page1"
            className="flex items-center gap-2 p-3 text-white rounded-lg shadow bg-mainColor hover:bg-white hover:text-mainColor hover:border-mainColor hover:border-[2px]"
          >
            <IoIosAdd />
            Add Tourism Company
          </Link>

          <Link
            to="/page1"
            className="flex items-center gap-2 p-3 text-white rounded-lg shadow bg-mainColor hover:bg-white hover:text-mainColor hover:border-mainColor hover:border-[2px]"
          >
            <IoIosAdd />
            Add Hotel
          </Link>

          <Link
            to="/page1"
            className="flex items-center gap-2 p-3 text-white rounded-lg shadow bg-mainColor hover:bg-white hover:text-mainColor hover:border-mainColor hover:border-[2px]"
          >
            <BiSolidBadgeCheck />
            Approve Sign Up
          </Link>

          <Link
            to="/page1"
            className="flex items-center gap-2 p-3 text-white rounded-lg shadow bg-mainColor hover:bg-white hover:text-mainColor hover:border-mainColor hover:border-[2px]"
          >
            <FaBell />
            Send Notification{" "}
          </Link>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col w-full my-5">
        {/* Container Flex للـ Activity و Alerts */}
        <div className="flex flex-col w-full gap-5 lg:flex-row">
          {/* Recent Activity */}
          <div className="flex flex-col flex-1">
            <span className="font-medium text-[20px] text-mainColor mb-2">
              Recent Activity:
            </span>
            <div className="flex flex-col w-full">
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                Subscription plan updated for (Holiday Tours)
              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                New hotel added (Nile Hotel) 3 hours ago
              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                New booking created by agent (Ali Travel).{" "}
              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                New hotel added (Nile Hotel) 3 hours ago.{" "}
              </span>
            </div>
          </div>

          {/* Alerts */}
          <div className="flex flex-col flex-1 ">
            <span className="font-medium text-[20px] text-mainColor mb-2">
              Alerts:
            </span>
            <div className="flex flex-col w-full">
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                3 subscriptions will expire in 5 days.{" "}
              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
5 bookings require review.              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
                3 subscriptions will expire in 5 days.{" "}
              </span>
              <span className="px-2 py-5 font-normal mb-3 bg-bghome text-mainColor text-[15px] w-full">
5 bookings require review.              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSuperAdmin;
