import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { FaCreditCard, FaFileArchive, FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaCode } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { MdOutlineBedroomChild } from "react-icons/md";
import { MdOutlineFlight } from "react-icons/md";
import { FaArrowTurnDown } from "react-icons/fa6";

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
  const [isActiveBookingEngine, setIsActiveBookingEngine] = useState(
    stateLink.isActiveBookingEngine ?? false
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

   /* Booking Payment*/
   const [isOpenBookingPayment, setIsOpenBookingPayment] = useState(
    stateLink.isOpenBookingPayment ?? false
  );
  const [isActiveBookingPaymentIcon, setIsActiveBookingPaymentIcon] = useState(
    stateLink.isActiveBookingPaymentIcon ?? false
  );
  const [isActiveBookingPayment, setIsActiveBookingPayment] = useState(
    stateLink.isActiveBookingPayment ?? false
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

  const [isActiveRequestList, setIsActiveRequestList] =
  useState(stateLink.isActiveRequestList ?? false);
const [isActiveNewRequest, setIsActiveNewRequest] = useState(
  stateLink.isActiveNewRequest ?? false
);
const [isActiveWorkStation, setIsActiveWorkStation] = useState(
  stateLink.isActiveWorkStation ?? false
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
              //Inventory Room
              const [isOpenInventoryRoom, setIsOpenInventoryRoom] = useState(
                stateLink.isOpenInventoryRoom ?? false
              );
              const [isActiveInventoryRoomIcon, setIsActiveInventoryRoomIcon] = useState(
                stateLink.isActiveInventoryRoomIcon ?? false
              );
              const [isActiveInventoryRoom, setIsActiveInventoryRoom] = useState(
                  stateLink.isActiveInventoryRoom ?? false
              );
                      //Inventory Room Setting
                      const [isOpenInventoryRoomSetting, setIsOpenInventoryRoomSetting] = useState(
                          stateLink.isOpenInventoryRoomSetting ?? false
                      );
                      const [isActiveInventoryRoomSetting, setIsActiveInventoryRoomSetting] = useState(
                          stateLink.isActiveInventoryRoomSetting ?? false
                      );

                      //Inventory Room Preview
                      const [isOpenInventoryRoomPreview, setIsOpenInventoryRoomPreview] = useState(
                        stateLink.isOpenInventoryRoomPreview ?? false
                      );
                      const [isActiveInventoryRoomPreview, setIsActiveInventoryRoomPreview] = useState(
                          stateLink.isActiveInventoryRoomPreview ?? false
                      );

              //Inventory Tour
               const [isOpenInventoryTour, setIsOpenInventoryTour] = useState(
                stateLink.isOpenInventoryTour ?? false
              );
              const [isActiveInventoryTourIcon, setIsActiveInventoryTourIcon] = useState(
                stateLink.isActiveInventoryTourIcon ?? false
              );
              const [isActiveInventoryTour, setIsActiveInventoryTour] = useState(
                  stateLink.isActiveInventoryTour?? false
              );

                     //Inventory Tour Preview
                     const [isOpenInventoryTourPreview, setIsOpenInventoryTourPreview] = useState(
                      stateLink.isOpenInventoryTourPreview ?? false
                    );
                    const [isActiveInventoryTourPreview, setIsActiveInventoryTourPreview] = useState(
                        stateLink.isActiveInventoryTourPreview ?? false
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

  const [isActiveSupplierAccount, setIsActiveSupplierAccount] = useState(
    stateLink.isActiveSupplierAccount ?? false
  );

                //Inventory Room
                const [isOpenExpenses, setIsOpenExpenses] = useState(
                  stateLink.isOpenExpenses ?? false
                );
                const [isActiveExpensesIcon, setIsActiveExpensesIcon] = useState(
                  stateLink.isActiveExpensesIcon ?? false
                );
                const [isActiveExpenses, setIsActiveExpenses] = useState(
                    stateLink.isActiveExpenses?? false
                );
                        //Inventory Room Setting
                        const [isOpenListExpenses, setIsOpenListExpenses] = useState(
                            stateLink.isOpenListExpenses ?? false
                        );
                        const [isActiveListExpenses, setIsActiveListExpenses] = useState(
                            stateLink.isActiveListExpenses ?? false
                        );
  
                        //Inventory Room Preview
                        const [isOpenCategory, setIsOpenCategory] = useState(
                          stateLink.isOpenCategory ?? false
                        );
                        const [isActiveCategory, setIsActiveCategory] = useState(
                            stateLink.isActiveCategory ?? false
                        );

                        // revenue
                const [isOpenRevenue, setIsOpenRevenue] = useState(
                  stateLink.isOpenRevenue ?? false
                );
                const [isActiveRevenueIcon, setIsActiveRevenueIcon] = useState(
                  stateLink.isActiveRevenueIcon ?? false
                );
                const [isActiveRevenue, setIsActiveRevenue] = useState(
                    stateLink.isActiveRevenue?? false
                );
                        //Inventory Room Setting
                        const [isOpenListRevenue, setIsOpenListRevenue] = useState(
                            stateLink.isOpenListRevenue ?? false
                        );
                        const [isActiveListRevenue, setIsActiveListRevenue] = useState(
                            stateLink.isActiveListRevenue ?? false
                        );
  
                        //Inventory Room Preview
                        const [isOpenCategoryRevenue, setIsOpenCategoryRevenue] = useState(
                          stateLink.isOpenCategoryRevenue ?? false
                        );
                        const [isActiveCategoryRevenue, setIsActiveCategoryRevenue] = useState(
                            stateLink.isActiveCategoryRevenue ?? false
                        );

                        // is open O.T
                        const [isOpenOwnerTransaction, setIsOpenOwnerTransaction] = useState(
                          stateLink.isOpenOwnerTransaction ?? false
                        );
                        const [isActiveOwnerTransactionIcon, setIsActiveOwnerTransactionIcon] = useState(
                          stateLink.isActiveOwnerTransactionIcon ?? false
                        );
                        const [isActiveOwnerTransaction, setIsActiveOwnerTransaction] = useState(
                            stateLink.isActiveOwnerTransaction?? false
                        );
                                // isOpenPayableToSupplier
                                const [isOpenOwner, setIsOpenOwner] = useState(
                                    stateLink.isOpenOwner ?? false
                                );
                                const [isActiveOwner, setIsActiveOwner] = useState(
                                    stateLink.isActiveOwner ?? false
                                );
          
                                // isOpenPaidSupplier Preview
                                const [isOpenTransaction, setIsOpenTransaction] = useState(
                                  stateLink.isOpenTransaction ?? false
                                );
                                const [isActiveTransaction, setIsActiveTransaction] = useState(
                                    stateLink.isActiveTransaction ?? false
                                );

                                                    // is open PaymentRecivable
                        const [isOpenOwnerPaymentRecivable, setIsOpenPaymentRecivable] = useState(
                          stateLink.isOpenOwnerPaymentRecivable ?? false
                        );
                        const [isActivePaymentRecivableIcon, setIsActivePaymentRecivableIcon] = useState(
                          stateLink.isActivePaymentRecivableIcon ?? false
                        );
                        const [isActivePaymentRecivable, setIsActivePaymentRecivable] = useState(
                            stateLink.isActivePaymentRecivable?? false
                        );
                                // isOpenPayableToSupplier
                                const [isOpenRecivable, setIsOpenRecivable] = useState(
                                    stateLink.isOpenRecivable ?? false
                                );
                                const [isActiveRecivable, setIsActiveRecivable] = useState(
                                    stateLink.isActiveRecivable ?? false
                                );

               // is open payable
               const [isOpenPayable, setIsOpenPayable] = useState(
                stateLink.isOpenPayable ?? false
              );
              const [isActivePayableIcon, setIsActivePayableIcon] = useState(
                stateLink.isActivePayableIcon ?? false
              );
              const [isActivePayable, setIsActivePayable] = useState(
                  stateLink.isActivePayable?? false
              );
                      // isOpenPayableToSupplier
                      const [isOpenPayableToSupplier, setIsOpenPayableToSupplier] = useState(
                          stateLink.isOpenPayableToSupplier ?? false
                      );
                      const [isActivePayableToSupplier, setIsActivePayableToSupplier] = useState(
                          stateLink.isActivePayableToSupplier ?? false
                      );

                      // isOpenPaidSupplier Preview
                      const [isOpenPaidSupplier, setIsOpenPaidSupplier] = useState(
                        stateLink.isOpenPaidSupplier ?? false
                      );
                      const [isActivePaidSupplier, setIsActivePaidSupplier] = useState(
                          stateLink.isActivePaidSupplier ?? false
                      );  
                      
                      const [isOpenOverDue, setIsOpenOverDue] = useState(
                        stateLink.isOpenOverDue ?? false
                      );
                      const [isActiveOverDue, setIsActiveOverDue] = useState(
                          stateLink.isActiveOverDue ?? false
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
  const [isActiveFinancialAccount, setIsActiveFinancialAccount] = useState(
    stateLink.isActiveFinancialAccount ?? false
  );
  const [isActiveAdminAccount, setIsActiveAdminAccount] = useState(
    stateLink.isActiveAdminAccount ?? false
  );
  const [isActiveWallet, setIsActiveWallet] = useState(
    stateLink.isActiveWallet ?? false
  );

  const [isActiveCurrency, setIsActiveCurrency] = useState(
    stateLink.isActiveCurrency ?? false
  );
  const [isActiveTax, setIsActiveTax] = useState(
    stateLink.isActiveTax ?? false
  );

  const [isActiveGroup, setIsActiveGroup] = useState(
    stateLink.isActiveGroup ?? false
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
      isActiveBookingEngine,

      isOpenBookingList,
      isActiveBookingListIcon,
      isActiveBookingList,
      isActiveUpcomingBookingList,
      isActiveCurrentBookingList,
      isActivePastBookingList,

      isOpenBookingPayment,
      isActiveBookingPaymentIcon,
      isActiveBookingPayment,

      isOpenFinancial,
      isActiveFinancialIcon,
      isActiveFinancial,
      isActiveInvoice,

      isOpenOperation,
      isActiveOperationIcon,
      isActiveOperation,

      isActiveRequests,
      isActiveRequestsIcon,
      isOpenRequests,
      isActiveRequestList,
      isActiveNewRequest,
      isActiveWorkStation,

      isActiveInventory,
      isActiveInventoryIcon,
      isOpenInventory,

      isActiveSetting,
      isActiveSettingIcon,
      isOpenSetting,
      isActiveFinancialAccount,
      isActiveWallet,
      isActiveAdminAccount,

      isActiveAccounting,
      isActiveAccountingIcon,
      isOpenAccounting,
      isActiveSupplierAccount,
      isActiveCategory,
      isOpenCategory,
      isActiveListExpenses,
      isOpenListExpenses,
      isActiveExpenses,
      isActiveExpensesIcon,
      isOpenExpenses,

      isActiveCategoryRevenue,
      isOpenCategoryRevenue,
      isActiveListRevenue,
      isOpenListRevenue,
      isActiveRevenue,
      isActiveRevenueIcon,
      isOpenRevenue,

      isActiveOverDue,
      isOpenOverDue,
      isActivePaidSupplier,
      isOpenPaidSupplier,
      isActivePayableToSupplier,
      isOpenPayableToSupplier,
      isActivePayable,
      isActivePayableIcon,
      isOpenPayable,

      isActiveTransaction,
      isOpenTransaction,
      isActiveOwner,
      isOpenOwner,
      isActiveOwnerTransaction,
      isActiveOwnerTransactionIcon,
      isOpenOwnerTransaction,
      

      isActiveRecivable,
      isOpenRecivable,
      isActivePaymentRecivable,
      isActivePaymentRecivableIcon,
      isOpenOwnerPaymentRecivable,
      



      isActiveCurrency,
      isActiveTax,
      isActiveGroup,

      isOpenInventoryRoom,
      isActiveInventoryRoom,
      isActiveInventoryRoomIcon,

      isOpenInventoryTour,
      isActiveInventoryTour,
      isActiveInventoryTourIcon,

      isOpenInventoryRoomSetting,
      isActiveInventoryRoomSetting,

      isOpenInventoryRoomPreview,
      isActiveInventoryRoomPreview,

      isOpenInventoryTourPreview,
      isActiveInventoryTourPreview

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
    isActiveBookingEngine,
    isOpenBookingList,
    isActiveBookingListIcon,
    isActiveBookingList,
    isActiveUpcomingBookingList,
    isActiveCurrentBookingList,
    isActivePastBookingList,

    isOpenBookingPayment,
    isActiveBookingPaymentIcon,
    isActiveBookingPayment,

    isOpenFinancial,
    isActiveFinancialIcon,
    isActiveFinancial,
    isActiveInvoice,

    isOpenOperation,
    isActiveOperationIcon,
    isActiveOperation,

    isActiveRequests,
    isActiveRequestsIcon,
    isOpenRequests,
    isActiveRequestList,
    isActiveNewRequest,
    isActiveWorkStation,


    isActiveInventory,
    isActiveInventoryIcon,
    isOpenInventory,

    isActiveSetting,
    isActiveSettingIcon,
    isOpenSetting,
    isActiveFinancialAccount,
    isActiveWallet,
    isActiveAdminAccount,

    isActiveCurrency,
    isActiveTax,
    isActiveGroup,
    isActiveAccounting,
    isActiveAccountingIcon,
    isOpenAccounting,
    isActiveSupplierAccount,
    isActiveCategory,
    isOpenCategory,
    isActiveListExpenses,
    isOpenListExpenses,
    isActiveExpenses,
    isActiveExpensesIcon,
    isOpenExpenses,

    isActiveCategoryRevenue,
    isOpenCategoryRevenue,
    isActiveListRevenue,
    isOpenListRevenue,
    isActiveRevenue,
    isActiveRevenueIcon,
    isOpenRevenue,

    isActiveOverDue,
    isOpenOverDue,
    isActivePaidSupplier,
    isOpenPaidSupplier,
    isActivePayableToSupplier,
    isOpenPayableToSupplier,
    isActivePayable,
    isActivePayableIcon,
    isOpenPayable,

    isActiveTransaction,
    isOpenTransaction,
    isActiveOwner,
    isOpenOwner,
    isActiveOwnerTransaction,
    isActiveOwnerTransactionIcon,
    isOpenOwnerTransaction,

    isActiveRecivable,
    isOpenRecivable,
    isActivePaymentRecivable,
    isActivePaymentRecivableIcon,
    isOpenOwnerPaymentRecivable,

    isOpenInventoryRoom,
    isActiveInventoryRoom,
    isActiveInventoryRoomIcon,

    isOpenInventoryTour,
    isActiveInventoryTour,
    isActiveInventoryTourIcon,

    isOpenInventoryRoomSetting,
    isActiveInventoryRoomSetting,

    isOpenInventoryRoomPreview,
    isActiveInventoryRoomPreview,

    isOpenInventoryTourPreview,
    isActiveInventoryTourPreview
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
    isActiveBookingEngine,
    isOpenBookingList,
    isActiveBookingListIcon,
    isActiveBookingList,
    isActiveUpcomingBookingList,
    isActiveCurrentBookingList,
    isActivePastBookingList,

    isOpenBookingPayment,
    isActiveBookingPaymentIcon,
    isActiveBookingPayment,

    isOpenFinancial,
    isActiveFinancialIcon,
    isActiveFinancial,
    isActiveInvoice,

    isOpenOperation,
    isActiveOperationIcon,
    isActiveOperation,

    isActiveRequests,
    isActiveRequestsIcon,
    isOpenRequests,
    isActiveRequestList,
    isActiveNewRequest,
    isActiveWorkStation,


    isActiveInventory,
    isActiveInventoryIcon,
    isOpenInventory,

    isActiveSetting,
    isActiveSettingIcon,
    isOpenSetting,
    isActiveFinancialAccount,
    isActiveWallet,
    isActiveAdminAccount,

    isActiveCurrency,
    isActiveTax,
    isActiveGroup,


    isActiveAccounting,
    isActiveAccountingIcon,
    isOpenAccounting,
    isActiveSupplierAccount,

    isActiveCategory,
    isOpenCategory,
    isActiveListExpenses,
    isOpenListExpenses,
    isActiveExpenses,
    isActiveExpensesIcon,
    isOpenExpenses,

    isActiveCategoryRevenue,
    isOpenCategoryRevenue,
    isActiveListRevenue,
    isOpenListRevenue,
    isActiveRevenue,
    isActiveRevenueIcon,
    isOpenRevenue,

    isActiveOverDue,
    isOpenOverDue,
    isActivePaidSupplier,
    isOpenPaidSupplier,
    isActivePayableToSupplier,
    isOpenPayableToSupplier,
    isActivePayable,
    isActivePayableIcon,
    isOpenPayable,

    isActiveTransaction,
    isOpenTransaction,
    isActiveOwner,
    isOpenOwner,
    isActiveOwnerTransaction,
    isActiveOwnerTransactionIcon,
    isOpenOwnerTransaction,

    isActiveRecivable,
    isOpenRecivable,
    isActivePaymentRecivable,
    isActivePaymentRecivableIcon,
    isOpenOwnerPaymentRecivable,

    isOpenInventoryRoom,
    isActiveInventoryRoom,
    isActiveInventoryRoomIcon,

    isOpenInventoryTour,
    isActiveInventoryTour,
    isActiveInventoryTourIcon,

    isOpenInventoryRoomSetting,
    isActiveInventoryRoomSetting,

    isOpenInventoryRoomPreview,
    isActiveInventoryRoomPreview,

    isOpenInventoryTourPreview,
    isActiveInventoryTourPreview
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
    setIsActiveBookingEngine(false);

    setIsOpenBookingList(false);
    setIsActiveBookingListIcon(false);
    setIsActiveBookingList(false);
    setIsActiveUpcomingBookingList(false);
    setIsActiveCurrentBookingList(false);
    setIsActivePastBookingList(false);

    setIsOpenBookingPayment(false)
    setIsActiveBookingPaymentIcon(false)
    setIsActiveBookingPayment(false)

    setIsOpenFinancial(false);
    setIsActiveFinancial(false);
    setIsActiveInvoice(false);
    setIsActiveFinancialIcon(false);

    setIsOpenOperation(false);
    setIsActiveOperationIcon(false);
    setIsActiveOperation(false);
    setIsActiveWallet(false);
    setIsActiveCurrency(false)
    setIsActiveTax(false)
    setIsActiveGroup(false)

    setIsActiveRequests(false);
    setIsActiveRequestsIcon(false);
    setIsOpenRequests(false);
    setIsActiveRequestList(false);
    setIsActiveNewRequest(false);
    setIsActiveWorkStation(false);

    setIsActiveInventory(false);
    setIsActiveInventoryIcon(false);
    setIsOpenInventory(false);

    setIsActiveAccounting(false);
    setIsActiveAccountingIcon(false);
    setIsOpenAccounting(false);
    setIsActiveSupplierAccount(false);

    setIsActiveCategory(false)
    setIsOpenCategory(false)
    setIsActiveListExpenses(false)
    setIsOpenListExpenses(false)
    setIsActiveExpenses(false)
    setIsActiveExpensesIcon(false)
    setIsOpenExpenses(false)


    setIsActiveCategoryRevenue(false)
    setIsOpenCategoryRevenue(false)
    setIsActiveListRevenue(false)
    setIsOpenListRevenue(false)
    setIsActiveRevenue(false)
    setIsActiveRevenueIcon(false)
    setIsOpenRevenue(false)

    setIsActiveOverDue(false)
    setIsOpenOverDue(false)
    setIsActivePaidSupplier(false)
    setIsOpenPaidSupplier(false)
    setIsActivePayableToSupplier(false)
    setIsOpenPayableToSupplier(false)
    setIsActivePayable(false)
    setIsActivePayableIcon(false)
    setIsOpenPayable(false)

    setIsActiveTransaction(false)
    setIsOpenTransaction(false)
    setIsActiveOwner(false)
    setIsOpenOwner(false)
    setIsActiveOwnerTransaction(false)
    setIsActiveOwnerTransactionIcon(false)
    setIsOpenOwnerTransaction(false)

    setIsActiveRecivable(false)
    setIsOpenRecivable(false)
    setIsActivePaymentRecivable(false)
    setIsActivePaymentRecivableIcon(false)
    setIsOpenPaymentRecivable(false)
   

    setIsActiveSetting(false);
    setIsActiveSettingIcon(false);
    setIsOpenSetting(false);
    setIsActiveFinancialAccount(false);
    setIsActiveAdminAccount(false);
    
    setIsActiveInventoryRoom(false);
    setIsOpenInventoryRoom(false);
    setIsActiveInventoryRoomIcon(false);

    setIsActiveInventoryTour(false);
    setIsOpenInventoryTour(false);
    setIsActiveInventoryTourIcon(false);

    setIsActiveInventoryRoomSetting(false);
    setIsOpenInventoryRoomSetting(false);

    setIsActiveInventoryRoomPreview(false);
    setIsOpenInventoryRoomPreview(false);

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
    // setIsActiveLeads(true);
    // setIsActiveSuppliers(true);
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
  }, [location]);

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
    const pathName = location.pathname;
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");
  
    if (
      result === "/dashboard_agent/booking" &&
      !["/dashboard_agent/booking/manual_booking", "/dashboard_agent/booking/booking_engine", "/dashboard_agent/booking/booking_engine/details"].includes(pathName)
    ) {
      handleClickBooking();
      navigate("/dashboard_agent/booking/manual_booking");
    }
  }, [location.pathname]); // Fixed dependency
  

  /* Manual Booking */
  const handleClickManualBooking = useCallback(() => {
    handleStateLinks();

    setIsOpenBooking(true);
    setIsActiveBookingIcon(true);
    setIsActiveBooking(true);
    setIsActiveManualBooking(true);
    setIsActiveBookingEngine(false);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/booking/manual_booking") {
      handleClickManualBooking();
    }
  }, [location]);

    /* Manual Booking */
    const handleClickBookingEngine = useCallback(() => {
      handleStateLinks();
  
      setIsOpenBooking(true);
      setIsActiveBookingIcon(true);
      setIsActiveBooking(true);
      setIsActiveBookingEngine(true);
      setIsActiveManualBooking(false);
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 4).join("/");
      if (result == "/dashboard_agent/booking/booking_engine") {
        handleClickBookingEngine();
      }
    }, [location]);

  /* Booking List */
  const handleClickBookingList = useCallback(() => {
    handleStateLinks();

    setIsOpenBookingList(true);
    setIsActiveBookingListIcon(true);
    setIsActiveBookingList(true);
    // setIsActiveCurrentBookingList(true);
    // setIsActivePastBookingList(true);
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
      handleClickBookingList();
      navigate("/dashboard_agent/booking_list/upcoming_booking");
    }
    console.log("result", result);
  }, [location]);

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


    /* Booking payment */
    const handleClickBookingPayment = useCallback(() => {
      handleStateLinks();
  
      setIsOpenBookingPayment(true);
      setIsActiveBookingPaymentIcon(true);
      setIsActiveBookingPayment(true);
      // setIsActiveCurrentBookingList(true);
      // setIsActivePastBookingList(true);

    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 3).join("/");
  
      // Only navigate if on `/dashboard/setting` but not already on any sub-route
      if (
        result === "/dashboard_agent/booking_payments"
      ) {
        handleClickBookingPayment();

        // navigate("/dashboard_agent/booking_payments");
      }
      console.log("result", result);
    }, [location]);

  // Function to handle financial section click
  const handleClickFinancial = useCallback(() => {
    setIsOpenFinancial(true);
    setIsActiveFinancial(true);
    setIsActiveFinancialIcon(true);
    setIsActiveInvoice(true);
  }, []);

  // Function to handle invoice link click
  const handleClickInvoice = useCallback(() => {
    handleStateLinks();
    setIsOpenFinancial(true);
    setIsActiveFinancial(true);
    setIsActiveFinancialIcon(true);
    setIsActiveInvoice(true);
  }, []);

  // Ensure correct state when visiting financial section
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    if (result === "/dashboard_agent/financial" && pathName === "/dashboard_agent/financial") {
      handleClickFinancial();
      navigate("/dashboard_agent/financial/invoice", { replace: true });
    }
  }, [location]);

  // Ensure correct state when on the invoice page
  useEffect(() => {
    if (pathName === "/dashboard_agent/financial/invoice") {
      handleClickInvoice();
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
    if (result == "/dashboard_agent/accounting") {
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
    setIsActiveNewRequest(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (
      result === "/dashboard_agent/requests" &&
      ![
        "/dashboard_agent/requests/request_list",
        "/dashboard_agent/requests/new_request",
        "/dashboard_agent/requests/work_station",
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickBookingList();
      navigate("/dashboard_agent/requests/request_list");
    }
    console.log("result", result);
  }, [location]);

    /* RequestList */
    const handleClickRequestList = useCallback(() => {
      handleStateLinks();
  
      setIsOpenRequests(true);
      setIsActiveRequestsIcon(true);
      setIsActiveRequests(true);
      setIsActiveRequestList(true);
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 4).join("/");
      if (result == "/dashboard_agent/requests/request_list") {
        handleClickRequestList();
      }
    }, [location]);
  
    /* New Request */
    const handleClickNewRequest = useCallback(() => {
      handleStateLinks();
  
      setIsOpenRequests(true);
      setIsActiveRequestsIcon(true);
      setIsActiveRequests(true);
      setIsActiveNewRequest(true);
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 4).join("/");
      if (result == "/dashboard_agent/requests/new_request") {
        handleClickNewRequest();
      }
    }, [location]);
  
    /* Work station */
    const handleClickWorkStation = useCallback(() => {
      handleStateLinks();
  
      setIsOpenRequests(true);
      setIsActiveRequestsIcon(true);
      setIsActiveRequests(true);
      setIsActiveWorkStation(true);
    }, []);
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 4).join("/");
      if (result == "/dashboard_agent/requests/work_station") {
        handleClickWorkStation();
      }
    }, [location]);

  // Inventory
  const handleClickInventory = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);
  }, []);

   /* Inventory Room */
   const handleClickInventoryRoom = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);

    setIsOpenInventoryRoom(true);
    setIsActiveInventoryRoom(true);
    setIsActiveInventoryRoomIcon(true);
  }, []);

  const handleClickInventoryTour = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);

    setIsOpenInventoryTour(true);
    setIsActiveInventoryTour(true);
    setIsActiveInventoryTourIcon(true);
  }, []);

  const handleClickInventoryRoomPreview = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);

    setIsOpenInventoryRoom(true);
    setIsActiveInventoryRoom(true);
    setIsActiveInventoryRoomIcon(true);

    setIsOpenInventoryRoomPreview(true);
    setIsActiveInventoryRoomPreview(true);
  }, []);

  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 5).join("/");
    if (
      result === "/dashboard_agent/inventory/room/list") {
      handleClickInventoryRoomPreview();
    }
  }, [location]);


  /* Inventory Room Setting */
  const handleClickInventoryRoomSetting = useCallback(() => {
    handleStateLinks();

    setIsOpenInventory(true);
    setIsActiveInventoryIcon(true);
    setIsActiveInventory(true);

    setIsOpenInventoryRoom(true);
    setIsActiveInventoryRoom(true);
    setIsActiveInventoryRoomIcon(true);

    setIsOpenInventoryRoomSetting(true);
    setIsActiveInventoryRoomSetting(true);
  }, []);

  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 5).join("/");
    if (
      result === "/dashboard_agent/inventory/room/setting_room") {
        handleClickInventoryRoomSetting();
    }
  }, [location]);

  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 5).join("/");
    
    if (result === "/dashboard_agent/inventory/tour/list") {
      handleClickInventoryTour();
    }
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
    if (result === "/dashboard_agent/accounting"
      &&
      ![
        "/dashboard_agent/accounting/account_supplier"
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickAccounting();
    
    }
    console.log("result", result);
  }, [location]);

  const handleClickSuppliersAccount = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);
    setIsActiveSupplierAccount(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/accounting/account_supplier") {
      handleClickSuppliersAccount();
    }
  }, [location]);

  const handleClickExpenses = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenExpenses(true);
    setIsActiveExpenses(true);
    setIsActiveExpensesIcon(true);
  }, []);

  const handleClickListExpenses = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenExpenses(true);
    setIsActiveExpenses(true);
    setIsActiveExpensesIcon(true);

    setIsOpenListExpenses(true);
    setIsActiveListExpenses(true);
  }, []);

  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 5).join("/");
    if (
      result === "/dashboard_agent/accounting/expenses/list_expenses") {
      handleClickListExpenses();
    }
  }, [location]);


    /* Category */
    const handleClickCategory = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenExpenses(true);
      setIsActiveExpenses(true);
      setIsActiveExpensesIcon(true);
  
      setIsOpenCategory(true);
      setIsActiveCategory(true);
    }, []);
  
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 5).join("/");
      if (
        result === "/dashboard_agent/accounting/expenses/category_account") {
          handleClickCategory();
      }
    }, [location]);

    // revenue

    const handleClickRevenue = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenRevenue(true);
      setIsActiveRevenue(true);
      setIsActiveRevenueIcon(true);
    }, []);
  
    const handleClickListRevenue = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenRevenue(true);
      setIsActiveRevenue(true);
      setIsActiveRevenueIcon(true);
  
      setIsOpenListRevenue(true);
      setIsActiveListRevenue(true);
    }, []);
  
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 5).join("/");
      if (
        result === "/dashboard_agent/accounting/revenue/list_revenue") {
          handleClickListRevenue();
      }
    }, [location]);
  
  
      /* Category */
      const handleClickCategoryRevenue = useCallback(() => {
        handleStateLinks();
    
        setIsOpenAccounting(true);
        setIsActiveAccountingIcon(true);
        setIsActiveAccounting(true);
    
        setIsOpenRevenue(true);
        setIsActiveRevenue(true);
        setIsActiveRevenueIcon(true);
    
        setIsOpenCategoryRevenue(true);
        setIsActiveCategoryRevenue(true);
      }, []);
    
      useEffect(() => {
        const part = pathName.split("/");
        const result = part.slice(0, 5).join("/");
        if (
          result === "/dashboard_agent/accounting/revenue/category_revenue") {
            handleClickCategoryRevenue();
        }
      }, [location]);


    const handleClickOwnerTransaction = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenOwnerTransaction(true);
      setIsActiveOwnerTransaction(true);
      setIsActiveOwnerTransactionIcon(true);
    }, []);
  
    const handleClickOwner = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);

      setIsOpenOwnerTransaction(true);
      setIsActiveOwnerTransaction(true);
      setIsActiveOwnerTransactionIcon(true);
  
      setIsOpenOwner(true);
      setIsActiveOwner(true);
    }, []);
  
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 5).join("/");
      if (
        result === "/dashboard_agent/accounting/owner_transaction/owner") {
        handleClickOwner();
      }
    }, [location]);
  
  
      /* Category */
      const handleClickTransaction = useCallback(() => {
        handleStateLinks();
    
        setIsOpenAccounting(true);
        setIsActiveAccountingIcon(true);
        setIsActiveAccounting(true);
    
        setIsOpenOwnerTransaction(true);
        setIsActiveOwnerTransaction(true);
        setIsActiveOwnerTransactionIcon(true);
    
        setIsOpenTransaction(true);
        setIsActiveTransaction(true);
      }, []);
    
      useEffect(() => {
        const part = pathName.split("/");
        const result = part.slice(0, 5).join("/");
        if (
          result === "/dashboard_agent/accounting/owner_transaction/transaction") {
            handleClickTransaction();
        }
      }, [location]);
  

    // payable
    const handleClickPayable = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenPayable(true);
      setIsActivePayable(true);
      setIsActivePayableIcon(true);
    }, []);


  
    const handleClickPayableToSupplier = useCallback(() => {
      handleStateLinks();
  
      setIsOpenAccounting(true);
      setIsActiveAccountingIcon(true);
      setIsActiveAccounting(true);
  
      setIsOpenPayable(true);
      setIsActivePayable(true);
      setIsActivePayableIcon(true);
  
      setIsOpenPayableToSupplier(true);
      setIsActivePayableToSupplier(true);
    }, []);
  
    useEffect(() => {
      const part = pathName.split("/");
      const result = part.slice(0, 5).join("/");
      if (
        result === "/dashboard_agent/accounting/payable_to_supplier/payable_supplier") {
          handleClickPayableToSupplier();
      }
    }, [location]);
  
  
      /* Category */
      const handleClickPaidSupplier = useCallback(() => {
        handleStateLinks();
    
        setIsOpenAccounting(true);
        setIsActiveAccountingIcon(true);
        setIsActiveAccounting(true);
    
        setIsOpenPayable(true);
        setIsActivePayable(true);
        setIsActivePayableIcon(true);
    
        setIsOpenPaidSupplier(true);
        setIsActivePaidSupplier(true);
      }, []);
    
      useEffect(() => {
        const part = pathName.split("/");
        const result = part.slice(0, 5).join("/");
        if (
          result === "/dashboard_agent/accounting/payable_to_supplier/paid_supplier") {
            handleClickPaidSupplier();
        }
      }, [location]);
  
         /* overDue */
         const handleClickOverDue = useCallback(() => {
          handleStateLinks();
      
          setIsOpenAccounting(true);
          setIsActiveAccountingIcon(true);
          setIsActiveAccounting(true);
      
          setIsOpenPayable(true);
          setIsActivePayable(true);
          setIsActivePayableIcon(true);
      
          setIsOpenOverDue(true);
          setIsActiveOverDue(true);
        }, []);
      
        useEffect(() => {
          const part = pathName.split("/");
          const result = part.slice(0, 5).join("/");
          if (
            result === "/dashboard_agent/accounting/payable_to_supplier/over_due") {
              handleClickOverDue();
          }
        }, [location]);


          /* payment recivable */
  const handleClickPaymentRecivable = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenPaymentRecivable(true);
    setIsActivePaymentRecivable(true);

    setIsActivePaymentRecivableIcon(true);
  }, []);


  const handleClickRecivable = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);
    
    setIsOpenPaymentRecivable(true);
    setIsActivePaymentRecivable(true);
    
    setIsActivePaymentRecivableIcon(true);
    setIsOpenRecivable(true)
    setIsActiveRecivable(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/payment_recivable/recivable") {
      handleClickRecivable();
    }
  }, [location]);
    

  // Setting
  const handleClickSetting = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveFinancialAccount(true)
    setIsActiveWallet(true)
    setIsActiveCurrency(true)
    setIsActiveTax(true)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    // Only navigate if on `/dashboard/setting` but not already on any sub-route
    if (result === "/dashboard_agent/setting" &&
      ![
        "/dashboard_agent/setting/financial_account",
      ].some((path) => pathName.startsWith(path)) && ![
        "/dashboard_agent/setting/wallet",
      ].some((path) => pathName.startsWith(path)) && ![
          "/dashboard_agent/setting/admin_account",
      ].some((path) => pathName.startsWith(path)) && ![
        "/dashboard_agent/setting/currency",
      ].some((path) => pathName.startsWith(path)) && ![
        "/dashboard_agent/setting/tax",
      ].some((path) => pathName.startsWith(path)) && ![
        "/dashboard_agent/setting/group",
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickSetting();
      navigate("/dashboard_agent/setting/financial_account");
    }
  }, [location]);

  const handleClickFinancialAccount = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveFinancialAccount(true)
    setIsActiveWallet(false)
    setIsActiveAdminAccount(false)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/financial_account") {
      handleClickFinancialAccount();
    }
  }, [location]);

  const handleClickAdminAccount = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveAdminAccount(true)
  }, []);

  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/admin_account") {
      handleClickAdminAccount();
    }
  }, [location]);

  const handleClickWallet = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    
    setIsActiveWallet(true)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/wallet") {
      handleClickWallet();
    }
  }, [location]);

  const handleClickCurrency = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    
    setIsActiveCurrency(true)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/currency") {
      handleClickCurrency();
    }
  }, [location]);

  const handleClickTax = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    
    setIsActiveTax(true)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/tax") {
      handleClickTax();
    }
  }, [location]);

  const handleClickGroup = useCallback(() => {
    handleStateLinks();

    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    
    setIsActiveGroup(true)
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/setting/group") {
      handleClickGroup();
    }
  }, [location]);


  return (
    <div className="space-y-4 w-full h-full">
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
          <Link
            to={"booking/booking_engine"}
            onClick={handleClickBookingEngine}
          >
            <li
              className={`${
                isActiveBookingEngine
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
                Booking Engine
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
 {/* Booking payment */}
      <Link
        to="booking_payments"
        onMouseMove={() => setIsActiveBookingPaymentIcon(true)}
        onMouseOut={() => setIsActiveBookingPaymentIcon(false)}
        onClick={() => {
          handleClickBookingPayment();
        }}
        className={`
          ${isActiveBookingPayment ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaCreditCard
            className={`${
              isActiveBookingPaymentIcon || isActiveBookingPayment
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveBookingPayment ? "text-mainColor" : "text-white"
              }`}
            >
              Booking Payment
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveBookingPayment
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

        {/* Financial List */}
        <Link
        to="financial"
        onMouseMove={() => setIsActiveFinancialIcon(true)}
        onMouseOut={() => setIsActiveFinancialIcon(false)}
        onClick={() => {
          handleClickFinancial();
        }}
        className={`
          ${isActiveFinancial ? "active" : ""}
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
              isActiveFinancial
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
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
            to={"/dashboard_agent/financial/invoice"}
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
              Invoice
            </li>
          </Link>
      
       
        </ul>
      </div>

      {/* Operation */}     
      <Link
        to="accounting"
        onMouseMove={() => setIsActiveOperationIcon(true)}
        onMouseOut={() => setIsActiveOperationIcon(false)}
        onClick={() => {handleClickOperation();}}
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
        to="requests/request_list"
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
      <div
        className={`${
          isOpenRequests && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"requests/request_list"}
            onClick={() => {
              handleClickRequestList();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveRequestList
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Request List 
            </li>
          </Link>
          <Link
            to={"requests/new_request"}
            onClick={() => {
              handleClickNewRequest();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveNewRequest
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              New Request
            </li>
          </Link>
          <Link
            to={"requests/work_station"}
            onClick={() => {
              handleClickWorkStation();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveWorkStation
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Work Station
            </li>
          </Link>
        </ul>
      </div>

      {/* Inventory */}      
      <div
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
      </div>

      <div
        className={`${
          isOpenInventory && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full transition-all duration-700 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1"
            // to={"inventory/room"}
            // onClick={handleClickInventory}
          >

      <li
        onMouseMove={() => setIsActiveInventoryRoomIcon(true)}
        onMouseOut={() => setIsActiveInventoryRoomIcon(false)}
        onClick={handleClickInventoryRoom}
        className={`
          ${isActiveInventoryRoom ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <MdOutlineBedroomChild
            className={`${
              isActiveInventoryRoomIcon || isActiveInventoryRoom
                ? "text-mainColor"
                : "text-white"
            }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${
                isActiveInventoryRoom ? "text-mainColor" : "text-white"
              }`}
            >
              Room
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${
              isActiveInventoryRoom ? "text-mainColor rotate-90" : "text-white rotate-0"
            } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </li>
      
                    <div
                      className={`${
                        isOpenInventoryRoom && !isSidebarCollapsed ? "h-17" : "h-0 "
                      } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
                    >
                      <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-4">
                        {/* <Link
                          to={"inventory/room/setting_room"}
                          onClick={handleClickInventoryRoomSetting}
                        >
                          <li
                            className={`${
                              isActiveInventoryRoomPreview
                                ? "rounded-xl bg-white text-mainColor"
                                : "text-white"
                            }
                                        text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                          >
                            Room List
                          </li> */}

                              <Link
                                to={"inventory/room/list"}
                                onClick={() => {
                                    handleClickInventoryRoomPreview();
                                    onLinkClick();
                                  }}
                                >
                                  <li
                                    className={`${
                                      isActiveInventoryRoomPreview
                                        ? "rounded-xl bg-white text-mainColor"
                                        : "text-white"
                                    }
                                                text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                                  >
                                    Room List
                                  </li>
                              </Link>

                              <Link
                              to={"inventory/room/setting_room"}
                              onClick={() => {
                                handleClickInventoryRoomSetting();
                                onLinkClick();
                                }}
                              >
                                <li
                                className={`${
                                  isActiveInventoryRoomSetting
                                    ? "rounded-xl bg-white text-mainColor"
                                    : "text-white"
                                }
                                            text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                              >
                                Room Setting
                              </li>
                              </Link>
                      </ul>
                    </div>


                    <Link
  to="inventory/tour/list"
  onMouseMove={() => setIsActiveInventoryIcon(true)}
  onMouseOut={() => setIsActiveInventoryIcon(false)} // Fix: Set to false
  onClick={() => {
    handleClickInventoryTour();
    onLinkClick();
  }}
  className={`
    ${isActiveInventoryTour ? "active" : ""}
    flex items-center 
     ${isSidebarCollapsed ? "justify-center" : "justify-start"}
    hover:rounded-xl p-2 hover:bg-white hover:text-mainColor
    group transition-all duration-300`}
>
  <div className="flex font-semibold text-xl items-center gap-x-2">
    <FaMapMarkedAlt
      className={`${
        isActiveInventoryTourIcon || isActiveInventoryTour ? "text-mainColor" : "text-white"
      } transition-all duration-300 group-hover:text-mainColor`} // Ensure smooth transition
    />
    {!isSidebarCollapsed && (
      <span
        className={`text-base transition-all duration-300 font-TextFontRegular group-hover:text-mainColor ml-2 ${
          isActiveInventoryTour ? "text-mainColor" : "text-white"
        }`}
      >
        Tour
      </span>
    )}
  </div>  
</Link>


      
          </div>
        </ul>
      </div>



      {/* <div
        className={`${
          isOpenInventoryRoom && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"inventory/room"}
            onClick={handleClickInventoryRoomSetting}
          >
            <li
              className={`${
                isActiveInventoryRoomSetting
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Room Type
            </li>
          </Link>
        </ul>
      </div> */}

       {/* Accounting */}
       
       <Link
        to="accounting/account_supplier"
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

      <div
  className={`overflow-hidden w-full transition-all duration-700 ${
    isOpenAccounting && !isSidebarCollapsed ? "max-h-[800px]" : "max-h-0"
  }`}
>
<ul className="list-none pl-5 flex flex-col gap-y-2 transition-all duration-700">
  
  {/* Supplier Link */}
  <Link to={"accounting/account_supplier"} onClick={() => { handleClickSuppliersAccount(); onLinkClick(); }}>
    <li className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
      isActiveSupplierAccount ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
    }`}>
      Supplier
    </li>
  </Link>

    {/* O.T Section */}
    <li
    onMouseEnter={() => setIsActiveOwnerTransaction(true)}
    onMouseLeave={() => setIsActiveOwnerTransaction(false)}
    onClick={handleClickOwnerTransaction}
    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
      ${isActiveOwnerTransaction ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}
    `}
  >
    <div className="flex items-center gap-2">
      <MdOutlineBedroomChild className={isActiveOwnerTransaction ? "text-mainColor" : "text-white"} />
      {!isSidebarCollapsed && <span>O.T</span>}
    </div>
    {!isSidebarCollapsed && (
      <IoIosArrowForward className={`transition-transform duration-300 ${
        isActiveOwnerTransaction ? "rotate-90 text-mainColor" : "rotate-0 text-white"
      }`} />
    )}
  </li>

  {/* Expenses Dropdown */}
  <div className={`overflow-hidden transition-all duration-700 ${
    isOpenOwnerTransaction && !isSidebarCollapsed ? "max-h-[200px]" : "max-h-0"
  }`}>
    <ul className="pl-8 flex flex-col gap-y-2 transition-all duration-700">
      {/* List Expenses */}
      <Link to={"accounting/owner_transaction/owner"} onClick={() => { handleClickOwner(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveOwner ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          Owner
        </li>
      </Link>

      {/* Category */}
      <Link to={"accounting/owner_transaction/transaction"} onClick={() => { handleClickTransaction(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveTransaction ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          Transaction
        </li>
      </Link>
    </ul>
  </div>

   {/* payment Recivable Section */}
   <li
    onMouseEnter={() => setIsActivePaymentRecivable(true)}
    onMouseLeave={() => setIsActivePaymentRecivable(false)}
    onClick={handleClickPaymentRecivable}
    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
      ${isActivePaymentRecivable ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}
    `}
  >
    <div className="flex items-center gap-2">
      <MdOutlineBedroomChild className={isActivePaymentRecivable ? "text-mainColor" : "text-white"} />
      {!isSidebarCollapsed && <span>Payment Recivable</span>}
    </div>
    {!isSidebarCollapsed && (
      <IoIosArrowForward className={`transition-transform duration-300 ${
        isActivePaymentRecivable ? "rotate-90 text-mainColor" : "rotate-0 text-white"
      }`} />
    )}
  </li>

  {/* Expenses Dropdown */}
  <div className={`overflow-hidden transition-all duration-700 ${
    isOpenOwnerPaymentRecivable && !isSidebarCollapsed ? "max-h-[200px]" : "max-h-0"
  }`}>
    <ul className="pl-8 flex flex-col gap-y-2 transition-all duration-700">
      {/* List Expenses */}
      <Link to={"accounting/payment_recivable/recivable"} onClick={() => { handleClickRecivable(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveOwner ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          Recivable
        </li>
      </Link>
    </ul>
  </div>

  {/* Expenses Section */}
  <li
    onMouseEnter={() => setIsActiveExpenses(true)}
    onMouseLeave={() => setIsActiveExpenses(false)}
    onClick={handleClickExpenses}
    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
      ${isActiveExpenses ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}
    `}
  >
    <div className="flex items-center gap-2">
      <MdOutlineBedroomChild className={isActiveExpenses ? "text-mainColor" : "text-white"} />
      {!isSidebarCollapsed && <span>Expenses</span>}
    </div>
    {!isSidebarCollapsed && (
      <IoIosArrowForward className={`transition-transform duration-300 ${
        isActiveExpenses ? "rotate-90 text-mainColor" : "rotate-0 text-white"
      }`} />
    )}
  </li>

  {/* Expenses Dropdown */}
  <div className={`overflow-hidden transition-all duration-700 ${
    isOpenExpenses && !isSidebarCollapsed ? "max-h-[200px]" : "max-h-0"
  }`}>
    <ul className="pl-8 flex flex-col gap-y-2 transition-all duration-700">
      {/* List Expenses */}
      <Link to={"accounting/expenses/list_expenses"} onClick={() => { handleClickListExpenses(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveListExpenses ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          List Expenses
        </li>
      </Link>

      {/* Category */}
      <Link to={"accounting/expenses/category_account"} onClick={() => { handleClickCategory(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveCategory ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          Category
        </li>
      </Link>
    </ul>
  </div>

    {/* Revenue Section */}
    <li
    onMouseEnter={() => setIsActiveRevenue(true)}
    onMouseLeave={() => setIsActiveRevenue(false)}
    onClick={handleClickRevenue}
    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
      ${isActiveRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}
    `}
  >
    <div className="flex items-center gap-2">
      <MdOutlineBedroomChild className={isActiveRevenue ? "text-mainColor" : "text-white"} />
      {!isSidebarCollapsed && <span>Revenue</span>}
    </div>
    {!isSidebarCollapsed && (
      <IoIosArrowForward className={`transition-transform duration-300 ${
        isActiveRevenue ? "rotate-90 text-mainColor" : "rotate-0 text-white"
      }`} />
    )}
  </li>

  {/* Revenue Dropdown */}
  <div className={`overflow-hidden transition-all duration-700 ${
    isOpenRevenue && !isSidebarCollapsed ? "max-h-[200px]" : "max-h-0"
  }`}>
    <ul className="pl-8 flex flex-col gap-y-2 transition-all duration-700">
      {/* List Revenue */}
      <Link to={"accounting/revenue/list_revenue"} onClick={() => { handleClickListRevenue(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveListRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          List Revenue
        </li>
      </Link>

      {/* Category */}
      <Link to={"accounting/revenue/category_revenue"} onClick={() => { handleClickCategoryRevenue(); onLinkClick(); }}>
        <li className={`text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
          isActiveCategoryRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
        }`}>
          Category 
        </li>
      </Link>
    </ul>
  </div>

  {/* Payable Section */}
  <li
    onMouseEnter={() => setIsActivePayable(true)}
    onMouseLeave={() => setIsActivePayable(false)}
    onClick={handleClickPayable}
    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
      ${isActivePayable ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}
    `}
  >
    <div className="flex items-center gap-2">
      <MdOutlineBedroomChild className={isActivePayable ? "text-mainColor" : "text-white"} />
      {!isSidebarCollapsed && <span>Payable</span>}
    </div>
    {!isSidebarCollapsed && (
      <IoIosArrowForward className={`transition-transform duration-300 ${
        isActivePayable ? "rotate-90 text-mainColor" : "rotate-0 text-white"
      }`} />
    )}
  </li>

  {/* Payable Dropdown */}
  <div
                      className={`${
                        isOpenPayable && !isSidebarCollapsed ? "h-50" : "h-0 "
                      } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
                    >
                      <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-4">
                        {/* <Link
                          to={"inventory/room/setting_room"}
                          onClick={handleClickInventoryRoomSetting}
                        >
                          <li
                            className={`${
                              isActiveInventoryRoomPreview
                                ? "rounded-xl bg-white text-mainColor"
                                : "text-white"
                            }
                                        text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                          >
                            Room List
                          </li> */}

                              <Link
                                to={"accounting/payable_to_supplier/payable_supplier"}
                                onClick={() => {
                                    handleClickPayableToSupplier();
                                    onLinkClick();
                                  }}
                                >
                                  <li
                                    className={`${
                                      isActivePayableToSupplier
                                        ? "rounded-xl bg-white text-mainColor"
                                        : "text-white"
                                    }
                                                text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                                  >
                                    Payable To Supplier
                                  </li>
                              </Link>

                              <Link
                              to={"accounting/payable_to_supplier/paid_supplier"}
                              onClick={() => {
                                handleClickPaidSupplier();
                                onLinkClick();
                                }}
                              >
                                <li
                                className={`${
                                  isActivePaidSupplier
                                    ? "rounded-xl bg-white text-mainColor"
                                    : "text-white"
                                }
                                            text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                              >
                                Paid Supplier
                              </li>
                              </Link>

                              <Link
                              to={"accounting/payable_to_supplier/over_due"}
                              onClick={() => {
                                handleClickOverDue();
                                onLinkClick();
                                }}
                              >
                                <li
                                className={`${
                                  isActiveOverDue
                                    ? "rounded-xl bg-white text-mainColor"
                                    : "text-white"
                                }
                                            text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
                              >
                                Over Due
                              </li>
                              </Link>
                      </ul>
                    </div>
</ul>

</div>


         {/* Settings */}
         <Link
        to="setting"
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
      <div
        className={`${
          isOpenSetting && !isSidebarCollapsed ? "h-17" : "h-0 "
        } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"setting/financial_account"}
            onClick={() => {
              handleClickFinancialAccount();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveFinancialAccount
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Financial Account
            </li>
          </Link>

          <Link
            to={"setting/admin_account"}
            onClick={() => {
              handleClickAdminAccount();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveAdminAccount
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Admin Account
            </li>
          </Link>

          <Link
            to={"setting/wallet"}
            onClick={() => {
              handleClickFinancialAccount();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveWallet
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Wallet
            </li>
          </Link>

          <Link
            to={"setting/currency"}
            onClick={() => {
              handleClickCurrency();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveCurrency
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Currency
            </li>
          </Link>

          <Link
            to={"setting/tax"}
            onClick={() => {
              handleClickTax();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveTax
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Tax
            </li>
          </Link>

          <Link
            to={"setting/group"}
            onClick={() => {
              handleClickGroup();
              onLinkClick();
            }}
          >
            <li
              className={`${
                isActiveGroup
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
              }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Group
            </li>
          </Link>
         
        </ul>
      </div>



    </div>
  );
};

export default MenuSideAgent;
