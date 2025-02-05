import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileArchive, FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaCode } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaCheckCircle } from "react-icons/fa";

import { MdHotel } from 'react-icons/md';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

const MenuSideSuperAdmin = ({ isSidebarCollapsed, onLinkClick }) => {
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
  
    /* Client */
    const [isOpenClient, setIsOpenClient] = useState(
      stateLink.isOpenClient ?? false
    );
    const [isActiveClientIcon, setIsActiveClientIcon] = useState(
      stateLink.isActiveClientIcon ?? false
    );
    const [isActiveClient, setIsActiveClient] = useState(
      stateLink.isActiveClient ?? false
    );
  
  
    // /* Torism */
    // const [isOpenTourism, setIsOpenTourism] = useState(
    //   stateLink.isOpenTourism ?? false
    // );
    // const [isActiveTourismIcon, setIsActiveTourismIcon] = useState(
    //   stateLink.isActiveTourismIcon ?? false
    // );
    // const [isActiveTourism, setIsActiveTourism] = useState(
    //   stateLink.isActiveTourism ?? false
    // );

       /* Hotels */
       const [isOpenHotels, setIsOpenHotels] = useState(
        stateLink.isOpenHotels ?? false
      );
      const [isActiveHotelsIcon, setIsActiveHotelsIcon] = useState(
        stateLink.isActiveHotelsIcon ?? false
      );
      const [isActiveHotels, setIsActiveHotels] = useState(
        stateLink.isActiveHotels ?? false
      );
    
         /* Admin */
         const [isOpenAdmin, setIsOpenAdmin] = useState(
            stateLink.isOpenAdmin ?? false
          );
          const [isActiveAdminIcon, setIsActiveAdminIcon] = useState(
            stateLink.isActiveAdminIcon ?? false
          );
          const [isActiveAdmin, setIsActiveAdmin] = useState(
            stateLink.isActiveAdmin ?? false
          );

              /* AgentProfile */
         const [isOpenAgentProfile, setIsOpenAgentProfile] = useState(
            stateLink.isOpenAgentProfile ?? false
          );
          const [isActiveAgentProfileIcon, setIsActiveAgentProfileIcon] = useState(
            stateLink.isActiveAgentProfileIcon ?? false
          );
          const [isActiveAgentProfile, setIsActiveAgentProfile] = useState(
            stateLink.isActiveAgentProfile ?? false
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

                      /* Pending Payment */
         const [isOpenPendingPayment, setIsOpenPendingPayment] = useState(
            stateLink.isOpenPendingPayment ?? false
          );
          const [isActivePendingPaymentIcon, setIsActivePendingPaymentIcon] = useState(
            stateLink.isActivePendingPaymentIcon ?? false
          );
          const [isActivePendingPayment, setIsActivePendingPayment] = useState(
            stateLink.isActivePendingPayment ?? false
          );
        
                             /* Plans */
         const [isOpenPlans, setIsOpenPlans] = useState(
            stateLink.isOpenPlans ?? false
          );
          const [isActivePlansIcon, setIsActivePlansIcon] = useState(
            stateLink.isActivePlansIcon ?? false
          );
          const [isActivePlans, setIsActivePlans] = useState(
            stateLink.isActivePlans ?? false
          );
       
                                      /* Ticket */
         const [isOpenTicket, setIsOpenTicket] = useState(
            stateLink.isOpenTicket ?? false
          );
          const [isActiveTicketIcon, setIsActiveTicketIcon] = useState(
            stateLink.isActiveTicketIcon ?? false
          );
          const [isActiveTicket, setIsActiveTicket] = useState(
            stateLink.isActiveTicket ?? false
          );
                                        /* Subscription */
                                        const [isOpenSubscription, setIsOpenSubscription] = useState(
                                            stateLink.isOpenSubscription ?? false
                                          );
                                          const [isActiveSubscriptionIcon, setIsActiveSubscriptionIcon] = useState(
                                            stateLink.isActiveSubscriptionIcon ?? false
                                          );
                                          const [isActiveSubscription, setIsActiveSubscription] = useState(
                                            stateLink.isActiveSubscription ?? false
                                          );
             /* Settings */
             const [isOpenSettings, setIsOpenSettings] = useState(
                stateLink.isOpenSettings ?? false
              );
              const [isActiveSettingsIcon, setIsActiveSettingsIcon] = useState(
                stateLink.isActiveSettingsIcon ?? false
              );
              const [isActiveSettings, setIsActiveSettings] = useState(
                stateLink.isActiveSettings ?? false
              );

                 /* Sign Approve  */
   const [isOpenSignUp, setIsOpenSignUp] = useState(
    stateLink.isOpenSignUp ?? false
  );
  const [isActiveSignUpIcon, setIsActiveSignUpIcon] = useState(
    stateLink.isActiveSignUpIcon ?? false
  );
  const [isActiveSignUp, setIsActiveSignUp] = useState(
    stateLink.isActiveSignUp ?? false
  );

  
    // Financial
    const [isOpenFinancial, setIsOpenFinancial] = useState(
      stateLink.isOpenFinancial ?? false
    );
    const [isActiveFinancialIcon, setIsActiveFinancialIcon] = useState(
      stateLink.isActiveFinancialIcon ?? false
    );
    const [isActiveFinancial, setIsActiveFinancial] = useState(
      stateLink.isActiveFinancial ?? false
    );
    const [isActiveInvoice, setIsActiveInvoice] = useState(
      stateLink.isActiveInvoice ?? false
    );
  

  
    // Helper function to save the current active links state
    const saveActiveLinksState = useCallback(() => {
      const activeLinks = {
        isActiveHome,
        isActiveHomeIcon,
  
        isOpenClient,
        isActiveClientIcon,
        isActiveClient,

        isOpenHotels,
        isActiveHotelsIcon,
        isActiveHotels,

        isOpenAdmin,
        isActiveAdminIcon,
        isActiveAdmin,

        isOpenAgentProfile,
        isActiveAgentProfileIcon,
        isActiveAgentProfile,

        isActiveBooking,
        isActiveBookingIcon,
        isOpenBooking,

  
        // isOpenTourism,
        // isActiveTourismIcon,
        // isActiveTourism,
       
        isOpenFinancial,
        isActiveFinancialIcon,
        isActiveFinancial,
        isActiveInvoice,
  
        isOpenPendingPayment,
        isActivePendingPaymentIcon,
        isActivePendingPayment,
    
  
        isOpenPlans,
        isActivePlansIcon,
        isActivePlans,
  
        isOpenTicket,
        isActiveTicketIcon,
        isActiveTicket,
  
        isOpenSubscription,
        isActiveSubscriptionIcon,
        isActiveSubscription,
  
        isOpenSettings,
        isActiveSettingsIcon,
        isActiveSettings,

        isOpenSignUp,
        isActiveSignUpIcon,
        isActiveSignUp,
      };
      auth.sidebar = JSON.stringify(activeLinks);
    }, [
        isActiveHome,
        isActiveHomeIcon,
  
        isOpenClient,
        isActiveClientIcon,
        isActiveClient,

  
        // isOpenTourism,
        // isActiveTourismIcon,
        // isActiveTourism,
       
        isOpenFinancial,
        isActiveFinancialIcon,
        isActiveFinancial,
        isActiveInvoice,
  
        isOpenPendingPayment,
        isActivePendingPaymentIcon,
        isActivePendingPayment,
    
        isOpenHotels,
        isActiveHotelsIcon,
        isActiveHotels,

        isOpenAdmin,
        isActiveAdminIcon,
        isActiveAdmin,

        isOpenAgentProfile,
        isActiveAgentProfileIcon,
        isActiveAgentProfile,

        isActiveBooking,
        isActiveBookingIcon,
        isOpenBooking,
  
        isOpenPlans,
        isActivePlansIcon,
        isActivePlans,
  
        isOpenTicket,
        isActiveTicketIcon,
        isActiveTicket,
  
        isOpenSubscription,
        isActiveSubscriptionIcon,
        isActiveSubscription,
  
        isOpenSettings,
        isActiveSettingsIcon,
        isActiveSettings,

        isOpenSignUp,
        isActiveSignUpIcon,
        isActiveSignUp,
    ]);
  
    // Save state to sidebar at auth when any link state changes
    useEffect(() => {
      saveActiveLinksState();
    }, [
        isActiveHome,
        isActiveHomeIcon,
  
        isOpenClient,
        isActiveClientIcon,
        isActiveClient,

        isOpenHotels,
        isActiveHotelsIcon,
        isActiveHotels,

        isOpenAdmin,
        isActiveAdminIcon,
        isActiveAdmin,

        isOpenAgentProfile,
        isActiveAgentProfileIcon,
        isActiveAgentProfile,

        isActiveBooking,
        isActiveBookingIcon,
        isOpenBooking,
  
        // isOpenTourism,
        // isActiveTourismIcon,
        // isActiveTourism,
       

        isOpenFinancial,
        isActiveFinancialIcon,
        isActiveFinancial,
        isActiveInvoice,
  
        isOpenPendingPayment,
        isActivePendingPaymentIcon,
        isActivePendingPayment,
    
  
        isOpenPlans,
        isActivePlansIcon,
        isActivePlans,
  
        isOpenTicket,
        isActiveTicketIcon,
        isActiveTicket,
  
        isOpenSubscription,
        isActiveSubscriptionIcon,
        isActiveSubscription,
  
        isOpenSettings,
        isActiveSettingsIcon,
        isActiveSettings,

        isOpenSignUp,
        isActiveSignUpIcon,
        isActiveSignUp,
    ]);
  
    // Handler functions to manage all state
    const handleStateLinks = () => {
      setIsActiveHome(false);
      setIsActiveHomeIcon(false);
  
      setIsOpenClient(false);
      setIsActiveClientIcon(false);
      setIsActiveClient(false);
   
  
      // setIsOpenTourism(false);
      // setIsActiveTourismIcon(false);
      // setIsActiveTourism(false);

      setIsOpenFinancial(false);
      setIsActiveFinancial(false);
      setIsActiveInvoice(false);
      setIsActiveFinancialIcon(false);
     
  
      setIsOpenHotels(false);
      setIsActiveHotelsIcon(false);
      setIsActiveHotels(false);

  
      setIsOpenAdmin(false);
      setIsActiveAdminIcon(false);
      setIsActiveAdmin(false);
  
  
      setIsOpenAgentProfile(false);
      setIsActiveAgentProfileIcon(false);
      setIsActiveAgentProfile(false);
  
      setIsOpenBooking(false);
      setIsActiveBookingIcon(false);
      setIsActiveBooking(false);
  
      setIsOpenPendingPayment(false);
      setIsActivePendingPaymentIcon(false);
      setIsActivePendingPayment(false);

      setIsOpenPlans(false);
      setIsActivePlansIcon(false);
      setIsActivePlans(false);

      setIsOpenTicket(false);
      setIsActiveTicketIcon(false);
      setIsActiveTicket(false);

      setIsOpenSubscription(false);
      setIsActiveSubscriptionIcon(false);
      setIsActiveSubscription(false);

      setIsOpenSettings(false);
      setIsActiveSettingsIcon(false);
      setIsActiveSettings(false);

      setIsOpenSignUp(false);
      setIsActiveSignUpIcon(false);
      setIsActiveSignUp(false);
      
      
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
      if (result == "/super_admin") {
        handleClickHome();
      }
    }, [location]);
  
    /* Client */
    const handleClickClient = useCallback(() => {
      handleStateLinks();
  
      setIsOpenClient(true);
      setIsActiveClientIcon(true);
      setIsActiveClient(true);

    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 3).join("/");
  
      // Only navigate if on `/dashboard/setting` but not already on any sub-route
      if (
        result === "/super_admin/client"
      ) {
        handleClickClient();
        
      }
      console.log("result", result);
    }, [location]);
  /* Tourism */
    // const handleClickTourism = useCallback(() => {
    //   handleStateLinks();
  
    //   setIsOpenTourism(true);
    //   setIsActiveTourismIcon(true);
    //   setIsActiveTourism(true);
      
    // }, []);
    // useEffect(() => {
    //   const part = pathName.split("/");
    //   const result = part.slice(0, 3).join("/");
    //   if (result == "/super_admin/tourism") {
    //     handleClickTourism();
    //   }
    // }, [location]);
  /* Hotels */
    const handleClickHotels = useCallback(() => {
      handleStateLinks();
  
      setIsOpenHotels(true);
      setIsActiveHotelsIcon(true);
      setIsActiveHotels(true);
     
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 3).join("/");
      if (result == "/super_admin/hotels") {
        handleClickHotels();
      }
    }, [location]);
  
    /* Admin */
    const handleClickAdmin = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAdmin(true);
      setIsActiveAdminIcon(true);
      setIsActiveAdmin(true);
    
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 3).join("/");
      if (result == "/super_admin/admin") {
        handleClickAdmin();
      }
    }, [location]);

    /* Agent Profile */
    const handleClickAgentProfile = useCallback(() => {
        handleStateLinks();

        setIsOpenAgentProfile(true);
        setIsActiveAgentProfileIcon(true);
        setIsActiveAgentProfile(true);
        
      }, []);
      useEffect(() => {
        const part = pathName.split("/");
        const result = part.slice(0, 3).join("/");
        if (
          result === "/super_admin/agent_profile"
        ) {
          handleClickAgentProfile();
        
        }
        console.log("result", result);
      }, [location]);


    /* Booking */
    const handleClickBooking = useCallback(() => {
      handleStateLinks();

      setIsOpenBooking(true);
      setIsActiveBookingIcon(true);
      setIsActiveBooking(true);
      
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 3).join("/");
      if (
        result === "/super_admin/booking"
      ) {
        handleClickBooking();
      
      }
      console.log("result", result);
    }, [location]);


        /* PendingPayment */
        const handleClickPendingPayment = useCallback(() => {
            handleStateLinks();
      
            setIsOpenPendingPayment(true);
            setIsActivePendingPaymentIcon(true);
            setIsActivePendingPayment(true);
            
          }, []);
          useEffect(() => {
            const part = pathName.split("/");
            const result = part.slice(0, 3).join("/");
            if (
              result === "/super_admin/pending_payment"
            ) {
                handleClickPendingPayment();
            
            }
            console.log("result", result);
          }, [location]);

         /* Plans */
         const handleClickPlans = useCallback(() => {
            handleStateLinks();
      
            setIsOpenPlans(true);
            setIsActivePlansIcon(true);
            setIsActivePlans(true);
            
          }, []);
          useEffect(() => {
            const part = pathName.split("/");
            const result = part.slice(0, 3).join("/");
            if (
              result === "/super_admin/plans"
            ) {
                handleClickPlans();
            
            }
            console.log("result", result);
          }, [location]);  
              /* Ticket */
          const handleClickTicket = useCallback(() => {
            handleStateLinks();
      
            setIsOpenTicket(true);
            setIsActiveTicketIcon(true);
            setIsActiveTicket(true);
            
          }, []);
          useEffect(() => {
            const part = pathName.split("/");
            const result = part.slice(0, 3).join("/");
            if (
              result === "/super_admin/ticketing_system"
            ) {
                handleClickTicket();
            
            }
            console.log("result", result);
          }, [location]);            
                  /* Subscription */
                  const handleClickSubscription = useCallback(() => {
                    handleStateLinks();
              
                    setIsOpenSubscription(true);
                    setIsActiveSubscriptionIcon(true);
                    setIsActiveSubscription(true);
                    
                  }, []);
                  useEffect(() => {
                    const part = pathName.split("/");
                    const result = part.slice(0, 3).join("/");
                    if (
                      result === "/super_admin/subscriptions"
                    ) {
                        handleClickSubscription();
                    
                    }
                    console.log("result", result);
                  }, [location]);            
        /* Settings */
        const handleClickSettings = useCallback(() => {
            handleStateLinks();
      
            setIsOpenSettings(true);
            setIsActiveSettingsIcon(true);
            setIsActiveSettings(true);
            
          }, []);
          useEffect(() => {
            const part = pathName.split("/");
            const result = part.slice(0, 4).join("/");
            if (
              result === "/super_admin/settings/countries" ||result === "/super_admin/settings/city" || result === "/super_admin/settings/zone" || result === "/super_admin/settings/payment"
              || result === "/super_admin/settings/zone" || result === "/super_admin/settings/currency" || result === "/super_admin/settings/payment_method"
            ) {
                handleClickSettings();
               
            }
            console.log("result", result);
          }, [location]);                      
  
   /* Signup */
   const handleClickSignUp = useCallback(() => {
    handleStateLinks();

    setIsOpenSignUp(true);
    setIsActiveSignUpIcon(true);
    setIsActiveSignUp(true);
  
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
    if (result == "/super_admin/signApprove") {
      handleClickSignUp();
    }
  }, [location]);
  
  // Function to handle financial section click
  const handleClickFinancial = useCallback(() => {
    setIsOpenFinancial(true);
    setIsActiveFinancial(true);
    setIsActiveFinancialIcon(true);
  }, []);

  // Function to handle invoice link click
  const handleClickInvoice = useCallback(() => {
    handleStateLinks();
    setIsOpenFinancial(true);
    setIsActiveFinancial(true);
    setIsActiveFinancialIcon(true);
    setIsActiveInvoice(true);
  }, [handleStateLinks]);

  // Ensure correct state when visiting financial section
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    if (result === "/super_admin/financial" && pathName === "/super_admin/financial") {
      handleClickFinancial();
      navigate("/super_admin/financial/invoice", { replace: true });
    }
  }, [pathName, navigate, handleClickFinancial]);

  // Ensure correct state when on the invoice page
  useEffect(() => {
    if (pathName === "/super_admin/financial/invoice") {
      handleClickInvoice();
    }
  }, [pathName, handleClickInvoice]);
  
 
  
  

  

  
  
  
  
 
  
  

  

  
    
          return (
            <div className="space-y-4 w-full">
              {/* Home */}
              <Link
                to="/super_admin"
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
                to="client"
                onMouseMove={() => setIsActiveClientIcon(true)}
                onMouseOut={() => setIsActiveClientIcon(false)}
                onClick={handleClickClient}
                className={`
                  ${isActiveClient ? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaUser 
                    className={`${
                      isActiveClientIcon || isActiveClient
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveClient ? "text-mainColor" : "text-white"
                      }`}
                    >
                      Client
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveClient ? "text-mainColor rotate-90" : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>
            
        
              {/* tourism companies*/}
              {/* <Link
                to="tourism"
                onMouseMove={() => setIsActiveTourismIcon(true)}
                onMouseOut={() => setIsActiveTourismIcon(false)}
                onClick={() => {
                  handleClickTourism();
                  onLinkClick();
                }}
                className={`
                  ${isActiveTourism ? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaMapMarkedAlt 
                    className={`${
                      isActiveTourismIcon || isActiveTourism
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveTourism ? "text-mainColor" : "text-white"
                      }`}
                    >
                     tourism companies
                    </span>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveTourism
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )}
              </Link> */}
            {/* Hotels*/}
            <Link
                to="hotels"
                onMouseMove={() => setIsActiveHotelsIcon(true)}
                onMouseOut={() => setIsActiveHotelsIcon(false)}
                onClick={() => {
                  handleClickHotels();
                  onLinkClick();
                }}
                className={`
                  ${isActiveHotels? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <MdHotel 
                    className={`${
                      isActiveHotelsIcon || isActiveHotels
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveHotels ? "text-mainColor" : "text-white"
                      }`}
                    >
                     Hotels
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveHotels
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>
       {/* Admin*/}
       <Link
                to="admin"
                onMouseMove={() => setIsActiveAdminIcon(true)}
                onMouseOut={() => setIsActiveAdminIcon(false)}
                onClick={() => {
                  handleClickAdmin();
                  onLinkClick();
                }}
                className={`
                  ${isActiveAdmin? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaUserShield 
                    className={`${
                      isActiveAdminIcon || isActiveAdmin
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveAdmin ? "text-mainColor" : "text-white"
                      }`}
                    >
                     Admin
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveAdmin
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>       

            {/* AgentProfile*/}
       <Link
                to="agent_profile"
                onMouseMove={() => setIsActiveAgentProfileIcon(true)}
                onMouseOut={() => setIsActiveAgentProfileIcon(false)}
                onClick={() => {
                  handleClickAgentProfile();
                  onLinkClick();
                }}
                className={`
                  ${isActiveAgentProfile? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaUserTie 
                    className={`${
                      isActiveAgentProfileIcon || isActiveAgentProfile
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveAgentProfile ? "text-mainColor" : "text-white"
                      }`}
                    >
                     Agent Profile
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveAgentProfile
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>        

                   {/* Booking*/}
       <Link
                to="booking"
                onMouseMove={() => setIsActiveBookingIcon(true)}
                onMouseOut={() => setIsActiveBookingIcon(false)}
                onClick={() => {
                  handleClickBooking();
                  onLinkClick();
                }}
                className={`
                  ${isActiveBooking? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaCalendarCheck 
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
                     Booking
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveBooking
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>            
        
                          {/* PendingPayment*/}
       <Link
                to="pending_payment"
                onMouseMove={() => setIsActivePendingPaymentIcon(true)}
                onMouseOut={() => setIsActivePendingPaymentIcon(false)}
                onClick={() => {
                  handleClickPendingPayment();
                  onLinkClick();
                }}
                className={`
                  ${isActivePendingPayment? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaMoneyCheckAlt 
                    className={`${
                      isActivePendingPaymentIcon || isActivePendingPayment
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActivePendingPayment ? "text-mainColor" : "text-white"
                      }`}
                    >
                     Pending Payment
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActivePendingPayment
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>   

                               {/* Plans*/}
       <Link
                to="plans"
                onMouseMove={() => setIsActivePlansIcon(true)}
                onMouseOut={() => setIsActivePlansIcon(false)}
                onClick={() => {
                  handleClickPlans();
                  onLinkClick();
                }}
                className={`
                  ${isActivePlans? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaTasks 
                    className={`${
                      isActivePlansIcon || isActivePlans
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActivePlans ? "text-mainColor" : "text-white"
                      }`}
                    >
                    Plans
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActivePlans
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>      

                                     {/* Ticketing*/}
       <Link
                to="ticketing_system"
                onMouseMove={() => setIsActiveTicketIcon(true)}
                onMouseOut={() => setIsActiveTicketIcon(false)}
                onClick={() => {
                  handleClickTicket();
                  onLinkClick();
                }}
                className={`
                  ${isActiveTicket? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaTicketAlt 
                    className={`${
                      isActiveTicketIcon || isActiveTicket
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveTicket ? "text-mainColor" : "text-white"
                      }`}
                    >
                    Ticketing System
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveTicket
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>         
         
                                        {/* Subscription*/}
       <Link
                to="subscriptions"
                onMouseMove={() => setIsActiveSubscriptionIcon(true)}
                onMouseOut={() => setIsActiveSubscriptionIcon(false)}
                onClick={() => {
                  handleClickSubscription();
                  onLinkClick();
                }}
                className={`
                  ${isActiveSubscription? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaClipboardList 
                    className={`${
                      isActiveSubscriptionIcon || isActiveSubscription
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveSubscription ? "text-mainColor" : "text-white"
                      }`}
                    >
                    Subscription
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveSubscription
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>   

                                               {/* Settings*/}
       <Link
                to="/super_admin/settings/countries"
                onMouseMove={() => setIsActiveSettingsIcon(true)}
                onMouseOut={() => setIsActiveSettingsIcon(false)}
                onClick={() => {
                  handleClickSettings();
                  onLinkClick();
                }}
                className={`
                  ${isActiveSettings? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FiSettings 
                    className={`${
                      isActiveSettingsIcon || isActiveSettings
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveSettings ? "text-mainColor" : "text-white"
                      }`}
                    >
                    Settings
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveSettings
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>       
{/* SignUp */}

<Link
                to="signApprove"
                onMouseMove={() => setIsActiveSignUpIcon(true)}
                onMouseOut={() => setIsActiveSignUpIcon(false)}
                onClick={() => {
                  handleClickSignUp();
                  onLinkClick();
                }}
                className={`
                  ${isActiveSignUp? "active" : ""}
                 flex items-center 
                 ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
              >
                <div className="flex font-semibold text-xl items-center gap-x-2">
                  <FaCheckCircle 
                    className={`${
                      isActiveSignUpIcon || isActiveSignUp
                        ? "text-mainColor"
                        : "text-white"
                    }`}
                  />
                  {!isSidebarCollapsed && (
                    <span
                      className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                        isActiveSignUp ? "text-mainColor" : "text-white"
                      }`}
                    >
                    Sign Up Approve
                    </span>
                  )}
                </div>
                {/* {!isSidebarCollapsed && (
                  <IoIosArrowForward
                    className={`${
                      isActiveSignUp
                        ? "text-mainColor rotate-90"
                        : "text-white rotate-0"
                    } text-xl transition-all duration-300 group-hover:text-mainColor`}
                  />
                )} */}
              </Link>       

              {/* Settings */}
                  <Link
                 to="/super_admin/financial"
                 onMouseMove={() => setIsActiveFinancialIcon(true)}
                 onMouseOut={() => setIsActiveFinancialIcon(false)}
                 onClick={handleClickFinancial}
                 className={`
                   ${isActiveFinancial? "active" : ""}
                  flex items-center 
                  ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
                 hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
               >
                 <div className="flex font-semibold text-xl items-center gap-x-2">
                   <FaFileArchive  
                     className={`${
                       isActiveFinancialIcon || isActiveFinancial
                         ? "text-mainColor"
                         : "text-white"
                     }`}
                   />
                   {!isSidebarCollapsed && (
                     <span
                       className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                         isActiveFinancial ? "text-mainColor" : "text-white"
                       }`}
                     >
                       Financial
                     </span>
                   )}
                 </div>
                 {!isSidebarCollapsed && (
                   <IoIosArrowForward
                     className={`${
                       isActiveFinancial ? "text-mainColor rotate-90" : "text-white rotate-0"
                     } text-xl transition-all duration-300 group-hover:text-mainColor`}
                   />
                 )}
               </Link>
               <div
                 className={`${
                   isOpenFinancial && !isSidebarCollapsed ? "h-17" : "h-0 "
                 } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
               >
                 <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
                   <Link
                     to={"/super_admin/financial/invoice"}
                     onClick={() => {
                       handleClickInvoice();
                       onLinkClick();
                     }}
                   >
                     <li
                       className={`${
                         isActiveInvoice
                           ? "rounded-xl bg-white text-mainColor"
                           : "text-white"
                       }
                                   text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                     >
                       Invoices
                     </li>
                   </Link>
         
               
                  
                 </ul>
               </div>
         
        
       
        
        
        
        
        
         
             
        
        
        
            </div>
          );
}

export default MenuSideSuperAdmin