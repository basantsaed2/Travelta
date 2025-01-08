import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaCode } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
const MenuSideAgent = ({ isSidebarCollapsed, onLinkClick }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const hideSide = auth.hideSidebar;
  const stateLink = auth.sidebar ? JSON.parse(auth.sidebar) : {};

  // Initialize component state from `auth.sidebar` state
  /* Home */
  const [isActiveHome, setIsActiveHome] = useState(
    stateLink.isActiveHome ?? true
  );
  const [isActiveHomeIcon, setIsActiveHomeIcon] = useState(
    stateLink.isActiveHomeIcon ?? true
  );

  /* Users */
  const [isOpenUsers, setIsOpenUsers] = useState(
    stateLink.isOpenUsers ?? false
  );
  const [isActiveUsersIcon, setIsActiveUsersIcon] = useState(
    stateLink.isActiveUsersIcon ?? false
  );
  const [isActiveUsers, setIsActiveUsers] = useState(
    stateLink.isActiveUsers ?? false
  );
  const [isActiveCustomers, setIsActiveCustomers] = useState(
    stateLink.isActiveCustomers ?? false
  );
  const [isActiveLeads, setIsActiveLeads] = useState(
    stateLink.isActiveLeads ?? false
  );
  const [isActiveSuppliers, setIsActiveSuppliers] = useState(
    stateLink.isActiveSuppliers ?? false
  );

  /* Booking */
  const [isOpenBooking, setIsOpenBooking] = useState(
    stateLink.isOpenBooking ?? false
  );
  const [isActiveBookingIcon, setIsActiveBookingIcon] = useState(
    stateLink.isActiveBookingIcon ?? false
  );
  const [isActiveBooking, setIsActiveBooking] = useState(
    stateLink.isActiveBooking ?? false
  );
  const [isActiveManualBooking, setIsActiveManualBooking] = useState(
    stateLink.isActiveManualBooking ?? false
  );

  /* Booking List*/
  const [isOpenBookingList, setIsOpenBookingList] = useState(
    stateLink.isOpenBookingList ?? false
  );
  const [isActiveBookingListIcon, setIsActiveBookingListIcon] = useState(
    stateLink.isActiveBookingListIcon ?? false
  );
  const [isActiveBookingList, setIsActiveBookingList] = useState(
    stateLink.isActiveBookingList ?? false
  );
  const [isActiveUpcomingBookingList, setIsActiveUpcomingBookingList] =
    useState(stateLink.isActiveUpcomingBookingList ?? false);
  const [isActiveCurrentBookingList, setIsActiveCurrentBookingList] = useState(
    stateLink.isActiveCurrentBookingList ?? false
  );
  const [isActivePastBookingList, setIsActivePastBookingList] = useState(
    stateLink.isActivePastBookingList ?? false
  );

  // Operation
  const [isOpenOperation, setIsOpenOperation] = useState(
    stateLink.isOpenOperation ?? false
  );
  const [isActiveOperationIcon, setIsActiveOperationIcon] = useState(
    stateLink.isActiveOperationIcon ?? false
  );
  const [isActiveOperation, setIsActiveOperation] = useState(
    stateLink.isActiveOperation ?? false
  );

  // Requests

  const [isOpenRequests, setIsOpenRequests] = useState(
    stateLink.isOpenRequests ?? false
  );
  const [isActiveRequestsIcon, setIsActiveRequestsIcon] = useState(
    stateLink.isActiveRequestsIcon ?? false
  );
  const [isActiveRequests, setIsActiveRequests] = useState(
    stateLink.isActiveRequests ?? false
  );

  // Inventory

  const [isOpenInventory, setIsOpenInventory] = useState(
    stateLink.isOpenInventory ?? false
  );
  const [isActiveInventoryIcon, setIsActiveInventoryIcon] = useState(
    stateLink.isActiveInventoryIcon ?? false
  );
  const [isActiveInventory, setIsActiveInventory] = useState(
    stateLink.isActiveInventory ?? false
  );

  // Accounting
  const [isOpenAccounting, setIsOpenAccounting] = useState(
    stateLink.isOpenAccounting ?? false
  );
  const [isActiveAccountingIcon, setIsActiveAccountingIcon] = useState(
    stateLink.isActiveAccountingIcon ?? false
  );
  const [isActiveAccounting, setIsActiveAccounting] = useState(
    stateLink.isActiveAccounting ?? false
  );

  // Settings
  const [isOpenSetting, setIsOpenSetting] = useState(
    stateLink.isOpenSetting ?? false
  );
  const [isActiveSettingIcon, setIsActiveSettingIcon] = useState(
    stateLink.isActiveSettingIcon ?? false
  );
  const [isActiveSetting, setIsActiveSetting] = useState(
    stateLink.isActiveSetting ?? false
  );

  // Helper function to save the current active links state
  const saveActiveLinksState = useCallback(() => {
    const activeLinks = {
      isActiveHome,
      isActiveHomeIcon,

      isOpenUsers,
      isActiveUsersIcon,
      isActiveUsers,
      isActiveCustomers,
      isActiveLeads,
      isActiveSuppliers,

      isOpenBooking,
      isActiveBookingIcon,
      isActiveBooking,
      isActiveManualBooking,

      isOpenBookingList,
      isActiveBookingListIcon,
      isActiveBookingList,
      isActiveUpcomingBookingList,
      isActiveCurrentBookingList,
      isActivePastBookingList,

      isOpenOperation,
      isActiveOperationIcon,
      isActiveOperation,

      isActiveRequests,
      isActiveRequestsIcon,
      isOpenRequests,

      isActiveInventory,
      isActiveInventoryIcon,
      isOpenInventory,

      isActiveSetting,
      isActiveSettingIcon,
      isOpenSetting,

      isActiveAccounting,
      isActiveAccountingIcon,
      isOpenAccounting,
    };
    auth.sidebar = JSON.stringify(activeLinks);
  }, [
    isActiveHome,
    isActiveHomeIcon,

    isOpenUsers,
    isActiveUsersIcon,
    isActiveUsers,
    isActiveCustomers,
    isActiveLeads,
    isActiveSuppliers,

    isOpenBooking,
    isActiveBookingIcon,
    isActiveBooking,
    isActiveManualBooking,

    isOpenBookingList,
    isActiveBookingListIcon,
    isActiveBookingList,
    isActiveUpcomingBookingList,
    isActiveCurrentBookingList,
    isActivePastBookingList,

    isOpenOperation,
    isActiveOperationIcon,
    isActiveOperation,

    isActiveRequests,
    isActiveRequestsIcon,
    isOpenRequests,

    isActiveInventory,
    isActiveInventoryIcon,
    isOpenInventory,

    isActiveSetting,
    isActiveSettingIcon,
    isOpenSetting,

    isActiveAccounting,
    isActiveAccountingIcon,
    isOpenAccounting,
  ]);

  // Save state to sidebar at auth when any link state changes
  useEffect(() => {
    saveActiveLinksState();
  }, [
    isActiveHome,
    isActiveHomeIcon,

    isOpenUsers,
    isActiveUsersIcon,
    isActiveUsers,
    isActiveCustomers,
    isActiveLeads,
    isActiveSuppliers,

    isOpenBooking,
    isActiveBookingIcon,
    isActiveBooking,
    isActiveManualBooking,

    isOpenBookingList,
    isActiveBookingListIcon,
    isActiveBookingList,
    isActiveUpcomingBookingList,
    isActiveCurrentBookingList,
    isActivePastBookingList,

    isOpenOperation,
    isActiveOperationIcon,
    isActiveOperation,

    isActiveRequests,
    isActiveRequestsIcon,
    isOpenRequests,

    isActiveInventory,
    isActiveInventoryIcon,
    isOpenInventory,

    isActiveSetting,
    isActiveSettingIcon,
    isOpenSetting,

    isActiveAccounting,
    isActiveAccountingIcon,
    isOpenAccounting,
  ]);

  // Handler functions to manage all state
  const handleStateLinks = () => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);

    setIsOpenUsers(false);
    setIsActiveUsersIcon(false);
    setIsActiveUsers(false);
    setIsActiveCustomers(false);
    setIsActiveLeads(false);
    setIsActiveSuppliers(false);

    setIsOpenBooking(false);
    setIsActiveBookingIcon(false);
    setIsActiveBooking(false);
    setIsActiveManualBooking(false);

    setIsOpenBookingList(false);
    setIsActiveBookingListIcon(false);
    setIsActiveBookingList(false);
    setIsActiveUpcomingBookingList(false);
    setIsActiveCurrentBookingList(false);
    setIsActivePastBookingList(false);

    setIsOpenOperation(false);
    setIsActiveOperationIcon(false);
    setIsActiveOperation(false);

    setIsActiveRequests(false);
    setIsActiveRequestsIcon(false);
    setIsOpenRequests(false);

    setIsActiveInventory(false);
    setIsActiveInventoryIcon(false);
    setIsOpenInventory(false);

    setIsActiveAccounting(false);
    setIsActiveAccountingIcon(false);
    setIsOpenAccounting(false);

    setIsActiveSetting(false);
    setIsActiveSettingIcon(false);
    setIsOpenSetting(false);
  };

  // Handler functions to manage navigation state
  /* Home */
  const handleClickHome = useCallback(() => {
    handleStateLinks();
    setIsActiveHome(true);
    setIsActiveHomeIcon(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 2).join("/");
    if (result == "/dashboard_agent") {
      handleClickHome();
    }
  }, [location]);

  /* Users */
  const handleClickUsers = useCallback(() => {
    handleStateLinks();

    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveCustomers(true);
    setIsActiveLeads(true);
    setIsActiveSuppliers(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (
      result === "/dashboard_agent/users" &&
      ![
        "/dashboard_agent/users/customers",
        "/dashboard_agent/users/leads",
        "/dashboard_agent/users/suppliers",
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickUsers();
      navigate("/dashboard_agent/users/customers");
    }
    console.log("result", result);
  }, [pathName]);

  const handleClickCustomers = useCallback(() => {
    handleStateLinks();

    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveCustomers(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/users/customers") {
      handleClickCustomers();
    }
  }, [location]);

  const handleClickLeads = useCallback(() => {
    handleStateLinks();

    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveLeads(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/users/leads") {
      handleClickLeads();
    }
  }, [location]);

  const handleClickSuppliers = useCallback(() => {
    handleStateLinks();

    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveSuppliers(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/users/suppliers") {
      handleClickSuppliers();
    }
  }, [location]);

  /* Booking */
  const handleClickBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBooking(true);
    setIsActiveBookingIcon(true);
    setIsActiveBooking(true);
    setIsActiveManualBooking(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (
      result === "/dashboard_agent/booking" &&
      !["/dashboard_agent/booking/manual_booking"].some((path) =>
        pathName.startsWith(path)
      )
    ) {
      handleClickBooking();
      navigate("/dashboard_agent/booking/manual_booking");
    }
    console.log("result", result);
  }, [pathName]);

  /* Manual Booking */
  const handleClickManualBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBooking(true);
    setIsActiveBookingIcon(true);
    setIsActiveBooking(true);
    setIsActiveManualBooking(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/booking/manual_booking") {
      handleClickManualBooking();
    }
  }, [location]);

  /* Booking List */
  const handleClickBookingList = useCallback(() => {
    handleStateLinks();

    setIsOpenBookingList(true);
    setIsActiveBookingListIcon(true);
    setIsActiveBookingList(true);
    setIsActiveCurrentBookingList(true);
    setIsActivePastBookingList(true);
    setIsActiveUpcomingBookingList(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (
      result === "/dashboard_agent/booking_list" &&
      ![
        "/dashboard_agent/booking_list/current_booking",
        "/dashboard_agent/booking_list/past_booking",
        "/dashboard_agent/booking_list/upcoming_booking",
      ].some((path) => pathName.startsWith(path))
    ) {
      setIsOpenBookingList();
      navigate("/dashboard_agent/booking_list/upcoming_booking");
    }
    console.log("result", result);
  }, [pathName]);

  /* Current Booking */
  const handleClickCurrentBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBookingList(true);
    setIsActiveBookingListIcon(true);
    setIsActiveBookingList(true);
    setIsActiveCurrentBookingList(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/booking_list/current_booking") {
      handleClickCurrentBooking();
    }
  }, [location]);

  /* Upcoming Booking */
  const handleClickUpcomingBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBookingList(true);
    setIsActiveBookingListIcon(true);
    setIsActiveBookingList(true);
    setIsActiveUpcomingBookingList(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/booking_list/upcoming_booking") {
      handleClickUpcomingBooking();
    }
  }, [location]);

  /* Past Booking */
  const handleClickPastBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBookingList(true);
    setIsActiveBookingListIcon(true);
    setIsActiveBookingList(true);
    setIsActivePastBookingList(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/booking_list/past_booking") {
      handleClickPastBooking();
    }
  }, [location]);

  // Operation
  const handleClickOperation = useCallback(() => {
    handleStateLinks();

    setIsOpenOperation(true);
    setIsActiveOperationIcon(true);
    setIsActiveOperation(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result == "/dashboard_agent/IncomingPage") {
      handleClickOperation();
    }
    console.log("result", result);
  }, [location]);

  // Requests
  const handleClickRequests = useCallback(() => {
    handleStateLinks();

    setIsOpenRequests(true);
    setIsActiveRequestsIcon(true);
    setIsActiveRequests(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result === "/dashboard_agent/IncomingPage") {
      handleClickRequests();
      
    }
    console.log("result", result);
  }, [location]);

  // Inventory
  const handleClickInventory = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result === "/dashboard_agent/IncomingPage") {
      handleClickInventory();
     
    }
    console.log("result", result);
  }, [location]);

  // Accounting
  const handleClickAccounting = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result === "/dashboard_agent/IncomingPage") {
      handleClickAccounting();
    
    }
    console.log("result", result);
  }, [location]);

  // Setting
  const handleClickSetting = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result === "/dashboard_agent/IncomingPage") {
      handleClickSetting();
      
    }
    console.log("result", result);
  }, [location]);

  return (
    <div className="space-y-4 w-full">
      {/* Home */}
      <Link
        to="/dashboard_agent"
        onMouseMove={() => setIsActiveHomeIcon(true)}
        onMouseOut={() => setIsActiveHomeIcon(false)}
        onClick={() => {
          handleClickHome();
          onLinkClick();
        }}
        className={`
            ${isActiveHome ? "active" : ""}
           flex items-center ${
             isSidebarCollapsed ? "justify-center" : "justify-start"
           } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaHome
            className={`${
              isActiveHomeIcon || isActiveHome ? "text-mainColor" : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveHome ? "text-mainColor" : "text-white"
              }`}
            >
              Home
            </span>
          )}
        </div>
      </Link>

      {/* Users */}
      <Link
        to="users"
        onMouseMove={() => setIsActiveUsersIcon(true)}
        onMouseOut={() => setIsActiveUsersIcon(false)}
        onClick={handleClickUsers}
        className={`
          ${isActiveUsers ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaUsers
            className={`${
              isActiveUsersIcon || isActiveUsers
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveUsers ? "text-mainColor" : "text-white"
              }`}
            >
              Users
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveUsers ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${
          isOpenUsers && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"users/customers"}
            onClick={() => {
              handleClickCustomers();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveCustomers
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Customers
            </li>
          </Link>
          <Link
            to={"users/leads"}
            onClick={() => {
              handleClickLeads();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveLeads
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Leads
            </li>
          </Link>
          <Link
            to={"users/suppliers"}
            onClick={() => {
              handleClickSuppliers();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveSuppliers
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Suppliers
            </li>
          </Link>
        </ul>
      </div>

      {/* Booking */}
      <Link
        to="booking"
        onMouseMove={() => setIsActiveBookingIcon(true)}
        onMouseOut={() => setIsActiveBookingIcon(false)}
        onClick={() => {
          handleClickBooking();
          onLinkClick();
        }}
        className={`
          ${isActiveBooking ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <MdFlightTakeoff
            className={`${
              isActiveBookingIcon || isActiveBooking
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveBooking ? "text-mainColor" : "text-white"
              }`}
            >
              New Booking
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveBooking
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${
          isOpenBooking && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"booking/manual_booking"}
            onClick={handleClickManualBooking}
          >
            <li
              className={`${
                isActiveManualBooking
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Manual Booking
            </li>
          </Link>
        </ul>
      </div>

      {/* Booking List */}
      <Link
        to="booking_list"
        onMouseMove={() => setIsActiveBookingListIcon(true)}
        onMouseOut={() => setIsActiveBookingListIcon(false)}
        onClick={() => {
          handleClickBookingList();
        }}
        className={`
          ${isActiveBookingList ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <RiCheckDoubleLine
            className={`${
              isActiveBookingListIcon || isActiveBookingList
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveBookingList ? "text-mainColor" : "text-white"
              }`}
            >
              Booking List
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveBookingList
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${
          isOpenBookingList && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"booking_list/upcoming_booking"}
            onClick={() => {
              handleClickUpcomingBooking();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveUpcomingBookingList
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              UpComing
            </li>
          </Link>
          <Link
            to={"booking_list/current_booking"}
            onClick={() => {
              handleClickCurrentBooking();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveCurrentBookingList
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Current
            </li>
          </Link>
          <Link
            to={"booking_list/past_booking"}
            onClick={() => {
              handleClickPastBooking();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActivePastBookingList
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Past
            </li>
          </Link>
        </ul>
      </div>

      {/* Operation */}
       
        <Link
        to="IncomingPage"
        onMouseMove={() => setIsActiveOperationIcon(true)}
        onMouseOut={() => setIsActiveOperationIcon(false)}
        onClick={handleClickOperation}
        className={`
          ${isActiveOperation ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaWrench 
            className={`${
              isActiveOperationIcon || isActiveOperation
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveOperation ? "text-mainColor" : "text-white"
              }`}
            >
              Operation
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveOperation ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

        {/* Requests */}
       
        <Link
        to="IncomingPage"
        onMouseMove={() => setIsActiveRequestsIcon(true)}
        onMouseOut={() => setIsActiveRequestsIcon(false)}
        onClick={handleClickRequests}
        className={`
          ${isActiveRequests ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaCode 
            className={`${
              isActiveRequestsIcon || isActiveRequests
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveRequests ? "text-mainColor" : "text-white"
              }`}
            >
              Requests
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveRequests ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

        {/* Inventory */}
       
        <Link
        to="IncomingPage"
        onMouseMove={() => setIsActiveInventoryIcon(true)}
        onMouseOut={() => setIsActiveInventoryIcon(false)}
        onClick={handleClickInventory}
        className={`
          ${isActiveInventory ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaBriefcase 
            className={`${
              isActiveInventoryIcon || isActiveInventory
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveInventory ? "text-mainColor" : "text-white"
              }`}
            >
              Inventory
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveInventory ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

       {/* Accounting */}
       
       <Link
        to="IncomingPage"
        onMouseMove={() => setIsActiveAccountingIcon(true)}
        onMouseOut={() => setIsActiveAccountingIcon(false)}
        onClick={handleClickAccounting}
        className={`
          ${isActiveAccounting ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaDatabase 
            className={`${
              isActiveAccountingIcon || isActiveAccounting
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveAccounting ? "text-mainColor" : "text-white"
              }`}
            >
              Accounting
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveAccounting ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

         {/* Settings */}
         <Link
        to="IncomingPage"
        onMouseMove={() => setIsActiveSettingIcon(true)}
        onMouseOut={() => setIsActiveSettingIcon(false)}
        onClick={handleClickSetting}
        className={`
          ${isActiveSetting? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaCog 
            className={`${
              isActiveSettingIcon || isActiveSetting
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveSetting ? "text-mainColor" : "text-white"
              }`}
            >
              Settings
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveSetting ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>



    </div>
  );
};

export default MenuSideAgent;
