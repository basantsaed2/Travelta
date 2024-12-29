import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from 'react-icons/io';
import { MdFlightTakeoff } from "react-icons/md";

const MenuSideAgent = ({ isSidebarCollapsed , onLinkClick  }) => {

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const hideSide = auth.hideSidebar;
  const stateLink = auth.sidebar ? JSON.parse(auth.sidebar) : {};

    // Initialize component state from `auth.sidebar` state
    /* Home */
    const [isActiveHome, setIsActiveHome] = useState(stateLink.isActiveHome ?? true);
    const [isActiveHomeIcon, setIsActiveHomeIcon] = useState(stateLink.isActiveHomeIcon ?? true);

    /* Users */
    const [isOpenUsers, setIsOpenUsers] = useState(stateLink.isOpenUsers ?? false);
    const [isActiveUsersIcon, setIsActiveUsersIcon] = useState(stateLink.isActiveUsersIcon ?? false);
    const [isActiveUsers, setIsActiveUsers] = useState(stateLink.isActiveUsers ?? false);
    const [isActiveCustomers, setIsActiveCustomers] = useState(stateLink.isActiveCustomers ?? false);
    const [isActiveLeads, setIsActiveLeads] = useState(stateLink.isActiveLeads ?? false);
    const [isActiveSuppliers, setIsActiveSuppliers] = useState(stateLink.isActiveSuppliers ?? false);

    /* Booking */
    const [isOpenBooking, setIsOpenBooking] = useState(stateLink.isOpenBooking ?? false);
    const [isActiveBookingIcon, setIsActiveBookingIcon] = useState(stateLink.isActiveBookingIcon ?? false);
    const [isActiveBooking, setIsActiveBooking] = useState(stateLink.isActiveBooking ?? false);
    const [isActiveManualBooking, setIsActiveManualBooking] = useState(stateLink.isActiveManualBooking ?? false);

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
    }

    // Handler functions to manage navigation state
    /* Home */
    const handleClickHome = useCallback(() => {
        handleStateLinks();
        setIsActiveHome(true);
        setIsActiveHomeIcon(true);

    }, []);
    useEffect(() => {
            const part = pathName.split('/');
            const result = part.slice(0, 2).join('/');
            if (result == "/dashboard_agent") {
                handleClickHome()
            }
    }, [location])

    /* Users */
    const handleClickUsers = useCallback(() => {
      handleStateLinks()

      setIsOpenUsers(true);
      setIsActiveUsersIcon(true);
      setIsActiveUsers(true);
      setIsActiveCustomers(true);
      setIsActiveLeads(true);
      setIsActiveSuppliers(true);
     }, []);
     useEffect(() => {
            const part = pathName.split('/');
            const result = part.slice(0, 3).join('/');

            // Only navigate if on `/dashboard/setting` but not already on any sub-route
            if (
                   result === "/dashboard_agent/users" &&
                   !["/dashboard_agent/users/customers","/dashboard_agent/users/leads","/dashboard_agent/users/suppliers"].some(path => pathName.startsWith(path))
            ) {
              handleClickUsers();
              navigate('/dashboard_agent/users/customers');
            }
            console.log('result', result);
     }, [pathName]);

     const handleClickCustomers = useCallback(() => {
            handleStateLinks()

            setIsOpenUsers(true);
            setIsActiveUsersIcon(true);
            setIsActiveUsers(true);
            setIsActiveCustomers(true);
     }, []);
     useEffect(() => {
            const part = pathName.split('/');
            const result = part.slice(0, 4).join('/');
            if (result == "/dashboard_agent/users/customers") {
              handleClickCustomers()
            }
     }, [location])

     const handleClickLeads = useCallback(() => {
      handleStateLinks()

      setIsOpenUsers(true);
      setIsActiveUsersIcon(true);
      setIsActiveUsers(true);
      setIsActiveLeads(true);
    }, []);
    useEffect(() => {
          const part = pathName.split('/');
          const result = part.slice(0, 4).join('/');
          if (result == "/dashboard_agent/users/leads") {
            handleClickLeads()
          }
    }, [location])

    const handleClickSuppliers= useCallback(() => {
      handleStateLinks()

      setIsOpenUsers(true);
      setIsActiveUsersIcon(true);
      setIsActiveUsers(true);
      setIsActiveSuppliers(true);
    }, []);
    useEffect(() => {
          const part = pathName.split('/');
          const result = part.slice(0, 4).join('/');
          if (result == "/dashboard_agent/users/suppliers") {
            handleClickSuppliers()
          }
    }, [location])

     /* Booking */
     const handleClickBooking = useCallback(() => {
      handleStateLinks()

      setIsOpenBooking(true);
      setIsActiveBookingIcon(true);
      setIsActiveBooking(true);
      setIsActiveManualBooking(true);
     }, []);
     useEffect(() => {
            const part = pathName.split('/');
            const result = part.slice(0, 3).join('/');

            // Only navigate if on `/dashboard/setting` but not already on any sub-route
            if (
                   result === "/dashboard_agent/booking" &&
                   !["/dashboard_agent/booking/manual_booking",].some(path => pathName.startsWith(path))
            ) {
              handleClickBooking();
              navigate('/dashboard_agent/booking/manual_booking');
            }
            console.log('result', result);
     }, [pathName]);

      /* Manual Booking */

     const handleClickManualBooking = useCallback(() => {
      handleStateLinks()

        setIsOpenBooking(true);
        setIsActiveBookingIcon(true);
        setIsActiveBooking(true);
        setIsActiveManualBooking(true);
      }, []);
      useEffect(() => {
            const part = pathName.split('/');
            const result = part.slice(0, 4).join('/');
            if (result == "/dashboard_agent/booking/manual_booking") {
              handleClickManualBooking()
            }
      }, [location])



  return (
    <div className="space-y-4">

      {/* Home */}
      <Link to="/dashboard_agent"
            onMouseMove={() => setIsActiveHomeIcon(true)}
            onMouseOut={() => setIsActiveHomeIcon(false)}
            onClick={() => { handleClickHome(); onLinkClick(); }}
            className={`
            ${isActiveHome ? 'active' : ''}
           flex items-center ${
          isSidebarCollapsed ? "justify-center" : "justify-start"
        } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
        >
            <div className="flex font-semibold text-xl items-center gap-x-2">
                <FaHome
                className={`${isActiveHomeIcon || isActiveHome ? 'text-mainColor' : 'text-white'}`}/>
                {!isSidebarCollapsed && (
                  <span className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveHome ? "text-mainColor" : "text-white"}`}>Home</span>
                )}
            </div>
      </Link>

      {/* Users */}
      <Link to="users"
        onMouseMove={() => setIsActiveUsersIcon(true)}
        onMouseOut={() => setIsActiveUsersIcon(false)}
        onClick={() => { handleClickUsers(); onLinkClick(); }}
        className={`
          ${isActiveUsers ? 'active' : ''}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
                <FaUsers 
                      className={`${isActiveUsersIcon || isActiveUsers ? 'text-mainColor' : 'text-white'}`}
                />
               {!isSidebarCollapsed && (
                  <span className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveUsers ? "text-mainColor" : "text-white"}`}>Users</span>
                )}
        </div>
        {!isSidebarCollapsed && (
                <IoIosArrowForward className={`${isActiveUsers ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
        )}
      </Link>
      <div className={`${isOpenUsers && !isSidebarCollapsed ? "h-17" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
            <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                    <Link to={"users/customers"} onClick={handleClickCustomers}>
                          <li
                                  className={`${isActiveCustomers ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                  }>
                                  Customers
                          </li>
                    </Link>
                    <Link to={"users/leads"} onClick={handleClickLeads}>
                          <li
                                  className={`${isActiveLeads ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                  }>
                                  Leads
                          </li>
                    </Link>
                    <Link to={"users/suppliers"} onClick={handleClickSuppliers}>
                          <li
                                  className={`${isActiveSuppliers ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                  }>
                                  Suppliers
                          </li>
                    </Link>
            </ul>

      </div>

        {/* Booking */}
        <Link to="booking"
        onMouseMove={() => setIsActiveBookingIcon(true)}
        onMouseOut={() => setIsActiveBookingIcon(false)}
        onClick={() => { handleClickBooking(); onLinkClick(); }}
        className={`
          ${isActiveBooking ? 'active' : ''}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
                <MdFlightTakeoff  
                      className={`${isActiveBookingIcon || isActiveBooking ? 'text-mainColor' : 'text-white'}`}
                />
               {!isSidebarCollapsed && (
                  <span className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveBooking ? "text-mainColor" : "text-white"}`}>Booking</span>
                )}
        </div>
        {!isSidebarCollapsed && (
                <IoIosArrowForward className={`${isActiveBooking ? 'text-mainColor rotate-90' : 'text-white rotate-0'} text-xl transition-all duration-300 group-hover:text-mainColor`} />
        )}
      </Link>
      <div className={`${isOpenBooking && !isSidebarCollapsed ? "h-17" : "h-0 "} overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}>
            <ul className='list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2'>
                    <Link to={"booking/manual_booking"} onClick={handleClickManualBooking}>
                          <li
                                  className={`${isActiveManualBooking ? 'rounded-xl bg-white text-mainColor' : 'text-white'}
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`
                                  }>
                                  Manual Booking
                          </li>
                    </Link>
            </ul>

      </div>

    </div>
  );
};

export default MenuSideAgent;
