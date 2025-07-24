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
import { FaUserCog } from "react-icons/fa";
import { set } from "date-fns";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePayment, MdOutlineMoneyOff, MdAttachMoney } from "react-icons/md";

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
    stateLink.isActiveInventoryTour ?? false
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

  //ledger
  const [isActiveLedger, setIsActiveLedger] = useState(
    stateLink.isActiveLedger ?? false
  );
  //Payment Receivable 
  const [isActivePaymentRecivable, setIsActivePaymentRecivable] = useState(
    stateLink.isActivePaymentRecivable ?? false
  );


  // is open O.E
  const [isOpenOwnerTransaction, setIsOpenOwnerTransaction] = useState(
    stateLink.isOpenOwnerTransaction ?? false
  );
  const [isActiveOwnerTransactionIcon, setIsActiveOwnerTransactionIcon] = useState(
    stateLink.isActiveOwnerTransactionIcon ?? false
  );
  const [isActiveOwnerTransaction, setIsActiveOwnerTransaction] = useState(
    stateLink.isActiveOwnerTransaction ?? false
  );
  // O.E List 
  const [isOpenOwner, setIsOpenOwner] = useState(
    stateLink.isOpenOwner ?? false
  );
  const [isActiveOwner, setIsActiveOwner] = useState(
    stateLink.isActiveOwner ?? false
  );

  // Transaction Preview
  const [isOpenTransaction, setIsOpenTransaction] = useState(
    stateLink.isOpenTransaction ?? false
  );
  const [isActiveTransaction, setIsActiveTransaction] = useState(
    stateLink.isActiveTransaction ?? false
  );

  // Payable Supplier
  const [isOpenPayable, setIsOpenPayable] = useState(
    stateLink.isOpenPayable ?? false
  );
  const [isActivePayableIcon, setIsActivePayableIcon] = useState(
    stateLink.isActivePayableIcon ?? false
  );
  const [isActivePayable, setIsActivePayable] = useState(
    stateLink.isActivePayable ?? false
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


  //Accounting Expenses
  const [isOpenExpenses, setIsOpenExpenses] = useState(
    stateLink.isOpenExpenses ?? false
  );
  const [isActiveExpensesIcon, setIsActiveExpensesIcon] = useState(
    stateLink.isActiveExpensesIcon ?? false
  );
  const [isActiveExpenses, setIsActiveExpenses] = useState(
    stateLink.isActiveExpenses ?? false
  );
  //Accounting Expenses List
  const [isOpenListExpenses, setIsOpenListExpenses] = useState(
    stateLink.isOpenListExpenses ?? false
  );
  const [isActiveListExpenses, setIsActiveListExpenses] = useState(
    stateLink.isActiveListExpenses ?? false
  );

  //Accounting Expenses Category
  const [isOpenCategoryExpenses, setIsOpenCategoryExpenses] = useState(
    stateLink.isOpenCategoryExpenses ?? false
  );
  const [isActiveCategoryExpenses, setIsActiveCategoryExpenses] = useState(
    stateLink.isActiveCategoryExpenses ?? false
  );

  // Accounting Revenue
  const [isOpenRevenue, setIsOpenRevenue] = useState(
    stateLink.isOpenRevenue ?? false
  );
  const [isActiveRevenueIcon, setIsActiveRevenueIcon] = useState(
    stateLink.isActiveRevenueIcon ?? false
  );
  const [isActiveRevenue, setIsActiveRevenue] = useState(
    stateLink.isActiveRevenue ?? false
  );
  //Accounting Revenue List
  const [isOpenListRevenue, setIsOpenListRevenue] = useState(
    stateLink.isOpenListRevenue ?? false
  );
  const [isActiveListRevenue, setIsActiveListRevenue] = useState(
    stateLink.isActiveListRevenue ?? false
  );

  //Accounting Revenue Category
  const [isOpenCategoryRevenue, setIsOpenCategoryRevenue] = useState(
    stateLink.isOpenCategoryRevenue ?? false
  );
  const [isActiveCategoryRevenue, setIsActiveCategoryRevenue] = useState(
    stateLink.isActiveCategoryRevenue ?? false
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
  const [isActivePosition, setIsActivePosition] = useState(
    stateLink.isActivePosition ?? false
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


  // HRM
  const [isOpenHRM, setIsOpenHRM] = useState(
    stateLink.isOpenHRM ?? false
  );
  const [isActiveHRMIcon, setIsActiveHRMIcon] = useState(
    stateLink.isActiveHRMIcon ?? false
  );
  const [isActiveHRM, setIsActiveHRM] = useState(
    stateLink.isActiveHRM ?? false
  );
  //HRM Department
  const [isActiveHRMDepartment, setIsActiveHRMDepartment] = useState(
    stateLink.isActiveHRMDepartment ?? false
  );
  //HRM Employee
  const [isActiveHRMEmployee, setIsActiveHRMEmployee] = useState(
    stateLink.isActiveHRMEmployee ?? false
  );
  //HRM Agent
  const [isActiveHRMAgent, setIsActiveHRMAgent] = useState(
    stateLink.isActiveHRMAgent ?? false
  );

  //Subscriptions
  const [isOpenSubscriptions, setIsOpenSubscriptions] = useState(
    stateLink.isOpenSubscriptions ?? false
  );
  const [isActiveSubscription, setIsActiveSubscription] = useState(
    stateLink.isActiveSubscription ?? false
  );
  const [isActiveSubscriptionIcon, setIsActiveSubscriptionIcon] = useState(
    stateLink.isActiveSubscriptionIcon ?? false
  );
  //Subscriptions Invoice
  const [isActiveSubscriptionInvoice, setIsActiveSubscriptionInvoice] = useState(
    stateLink.isActiveSubscriptionInvoice ?? false
  );

  // Helper function to save the current active links state 
  const saveActiveLinksState = useCallback(() => {
    const activeLinks = {
      isActiveHome, isActiveHomeIcon,
      isOpenUsers, isActiveUsersIcon, isActiveUsers, isActiveCustomers, isActiveLeads, isActiveSuppliers,
      isOpenBooking, isActiveBookingIcon, isActiveBooking, isActiveManualBooking, isActiveBookingEngine,
      isOpenBookingList, isActiveBookingListIcon, isActiveBookingList, isActiveUpcomingBookingList,
      isActiveCurrentBookingList, isActivePastBookingList, isOpenBookingPayment, isActiveBookingPaymentIcon,
      isActiveBookingPayment, isOpenFinancial, isActiveFinancialIcon, isActiveFinancial, isActiveInvoice,
      isOpenOperation, isActiveOperationIcon, isActiveOperation, isActiveRequests, isActiveRequestsIcon,
      isOpenRequests, isActiveRequestList, isActiveNewRequest, isActiveWorkStation, isActiveInventory,
      isActiveInventoryIcon, isOpenInventory, isActiveSetting, isActiveSettingIcon, isOpenSetting,
      isActiveFinancialAccount, isActiveWallet, isActiveAdminAccount, isActivePosition, isOpenHRM,
      isActiveHRMIcon, isActiveHRM, isActiveHRMDepartment, isActiveHRMEmployee, isActiveHRMAgent,
      isOpenAccounting, isActiveAccountingIcon, isActiveAccounting, isActiveLedger, isOpenExpenses,
      isActiveExpensesIcon, isActiveExpenses, isOpenListExpenses, isActiveListExpenses,
      isOpenCategoryExpenses, isActiveCategoryExpenses, isOpenRevenue, isActiveRevenueIcon,
      isActiveRevenue, isOpenListRevenue, isActiveListRevenue, isOpenCategoryRevenue, isActiveCategoryRevenue,
      isOpenOwnerTransaction, isActiveOwnerTransactionIcon, isActiveOwnerTransaction, isOpenOwner, isActiveOwner,
      isOpenTransaction, isActiveTransaction, isActivePaymentRecivable, isOpenPayable, isActivePayableIcon,
      isActivePayable, isOpenPayableToSupplier, isActivePayableToSupplier, isOpenPaidSupplier, isActivePaidSupplier,
      isOpenOverDue, isActiveOverDue, isActiveCurrency, isActiveTax, isActiveGroup, isOpenInventoryRoom,
      isActiveInventoryRoom, isActiveInventoryRoomIcon, isOpenInventoryTour, isActiveInventoryTour,
      isActiveInventoryTourIcon, isOpenInventoryRoomSetting, isActiveInventoryRoomSetting,
      isOpenInventoryRoomPreview, isActiveInventoryRoomPreview, isOpenInventoryTourPreview,
      isActiveInventoryTourPreview, isOpenSubscriptions, isActiveSubscription, isActiveSubscriptionIcon,
      isActiveSubscriptionInvoice
    };
    auth.sidebar = JSON.stringify(activeLinks);
  }, [
    isActiveHome, isActiveHomeIcon, isOpenUsers, isActiveUsersIcon, isActiveUsers, isActiveCustomers,
    isActiveLeads, isActiveSuppliers, isOpenBooking, isActiveBookingIcon, isActiveBooking,
    isActiveManualBooking, isActiveBookingEngine, isOpenBookingList, isActiveBookingListIcon,
    isActiveBookingList, isActiveUpcomingBookingList, isActiveCurrentBookingList, isActivePastBookingList,
    isOpenBookingPayment, isActiveBookingPaymentIcon, isActiveBookingPayment, isOpenFinancial,
    isActiveFinancialIcon, isActiveFinancial, isActiveInvoice, isOpenOperation, isActiveOperationIcon,
    isActiveOperation, isActiveRequests, isActiveRequestsIcon, isOpenRequests, isActiveRequestList,
    isActiveNewRequest, isActiveWorkStation, isActiveInventory, isActiveInventoryIcon, isOpenInventory,
    isActiveSetting, isActiveSettingIcon, isOpenSetting, isActiveFinancialAccount, isActiveWallet,
    isActiveAdminAccount, isActivePosition, isOpenHRM, isActiveHRMIcon, isActiveHRM, isActiveHRMDepartment,
    isActiveHRMEmployee, isActiveHRMAgent, isOpenAccounting, isActiveAccountingIcon, isActiveAccounting,
    isActiveLedger, isOpenExpenses, isActiveExpensesIcon, isActiveExpenses, isOpenListExpenses,
    isActiveListExpenses, isOpenCategoryExpenses, isActiveCategoryExpenses, isOpenRevenue,
    isActiveRevenueIcon, isActiveRevenue, isOpenListRevenue, isActiveListRevenue, isOpenCategoryRevenue,
    isActiveCategoryRevenue, isOpenOwnerTransaction, isActiveOwnerTransactionIcon, isActiveOwnerTransaction,
    isOpenOwner, isActiveOwner, isOpenTransaction, isActiveTransaction, isActivePaymentRecivable,
    isOpenPayable, isActivePayableIcon, isActivePayable, isOpenPayableToSupplier, isActivePayableToSupplier,
    isOpenPaidSupplier, isActivePaidSupplier, isOpenOverDue, isActiveOverDue, isActiveCurrency,
    isActiveTax, isActiveGroup, isOpenInventoryRoom, isActiveInventoryRoom, isActiveInventoryRoomIcon,
    isOpenInventoryTour, isActiveInventoryTour, isActiveInventoryTourIcon, isOpenInventoryRoomSetting,
    isActiveInventoryRoomSetting, isOpenInventoryRoomPreview, isActiveInventoryRoomPreview,
    isOpenInventoryTourPreview, isActiveInventoryTourPreview, isOpenSubscriptions, isActiveSubscription,
    isActiveSubscriptionIcon, isActiveSubscriptionInvoice
  ]);

  // Save state to sidebar at auth when any link state changes
  useEffect(() => {
    saveActiveLinksState();
  }, [
    isActiveHome, isActiveHomeIcon, isOpenUsers, isActiveUsersIcon, isActiveUsers, isActiveCustomers,
    isActiveLeads, isActiveSuppliers, isOpenBooking, isActiveBookingIcon, isActiveBooking,
    isActiveManualBooking, isActiveBookingEngine, isOpenBookingList, isActiveBookingListIcon,
    isActiveBookingList, isActiveUpcomingBookingList, isActiveCurrentBookingList, isActivePastBookingList,
    isOpenBookingPayment, isActiveBookingPaymentIcon, isActiveBookingPayment, isOpenFinancial,
    isActiveFinancialIcon, isActiveFinancial, isActiveInvoice, isOpenOperation, isActiveOperationIcon,
    isActiveOperation, isActiveRequests, isActiveRequestsIcon, isOpenRequests, isActiveRequestList,
    isActiveNewRequest, isActiveWorkStation, isActiveInventory, isActiveInventoryIcon, isOpenInventory,
    isActiveSetting, isActiveSettingIcon, isOpenSetting, isActiveFinancialAccount, isActiveWallet,
    isActiveAdminAccount, isActivePosition, isOpenHRM, isActiveHRMIcon, isActiveHRM, isActiveHRMDepartment,
    isActiveHRMEmployee, isActiveHRMAgent, isOpenAccounting, isActiveAccountingIcon, isActiveAccounting,
    isActiveLedger, isOpenExpenses, isActiveExpensesIcon, isActiveExpenses, isOpenListExpenses,
    isActiveListExpenses, isOpenCategoryExpenses, isActiveCategoryExpenses, isOpenRevenue,
    isActiveRevenueIcon, isActiveRevenue, isOpenListRevenue, isActiveListRevenue, isOpenCategoryRevenue,
    isActiveCategoryRevenue, isOpenOwnerTransaction, isActiveOwnerTransactionIcon, isActiveOwnerTransaction,
    isOpenOwner, isActiveOwner, isOpenTransaction, isActiveTransaction, isActivePaymentRecivable,
    isOpenPayable, isActivePayableIcon, isActivePayable, isOpenPayableToSupplier, isActivePayableToSupplier,
    isOpenPaidSupplier, isActivePaidSupplier, isOpenOverDue, isActiveOverDue, isActiveCurrency,
    isActiveTax, isActiveGroup, isOpenInventoryRoom, isActiveInventoryRoom, isActiveInventoryRoomIcon,
    isOpenInventoryTour, isActiveInventoryTour, isActiveInventoryTourIcon, isOpenInventoryRoomSetting,
    isActiveInventoryRoomSetting, isOpenInventoryRoomPreview, isActiveInventoryRoomPreview,
    isOpenInventoryTourPreview, isActiveInventoryTourPreview, isOpenSubscriptions, isActiveSubscription,
    isActiveSubscriptionIcon, isActiveSubscriptionInvoice
  ]);


  // Handler functions to manage all state
  const handleStateLinks = () => {
    setIsActiveHome(false);
    setIsActiveHomeIcon(false);

    //User
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

    setIsActiveRequests(false);
    setIsActiveRequestsIcon(false);
    setIsOpenRequests(false);
    setIsActiveRequestList(false);
    setIsActiveNewRequest(false);
    setIsActiveWorkStation(false);

    setIsActiveInventory(false);
    setIsActiveInventoryIcon(false);
    setIsOpenInventory(false);

    //Accounting
    setIsActiveLedger(false)
    setIsActivePaymentRecivable(false);

    setIsActiveTransaction(false)
    setIsOpenTransaction(false)

    setIsActiveOwner(false)
    setIsOpenOwner(false)

    setIsOpenOverDue(false)
    setIsActiveOverDue(false)

    setIsOpenPaidSupplier(false)
    setIsActivePaidSupplier(false)

    setIsOpenPayableToSupplier(false)
    setIsActivePayableToSupplier(false)

    setIsActiveCategoryExpenses(false)
    setIsOpenCategoryExpenses(false)
    setIsActiveListExpenses(false)
    setIsOpenListExpenses(false)

    setIsActiveCategoryRevenue(false)
    setIsOpenCategoryRevenue(false)
    setIsActiveListRevenue(false)
    setIsOpenListRevenue(false)

    // HRM
    setIsActiveHRMDepartment(false);
    setIsActiveHRMEmployee(false);
    setIsActiveHRMAgent(false);

    //Inventory
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

    setIsOpenSubscriptions(false);
    setIsActiveSubscription(false);
    setIsActiveSubscriptionIcon(false);
    setIsActiveSubscriptionInvoice(false);


    //Setting
    setIsActiveFinancialAccount(false);
    setIsActiveAdminAccount(false);
    setIsActivePosition(false);
    setIsActiveWallet(false);
    setIsActiveCurrency(false);
    setIsActiveTax(false);
    setIsActiveGroup(false);
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

  //Users
  const handleClickUsers = (e) => {
    e.preventDefault(); // Prevent default navigation issues
    setIsOpenUsers((prev) => !prev); // Properly toggle dropdown
    setIsActiveUsersIcon((prev) => !prev);
    setIsActiveUsers((prev) => !prev);
  };
  // ✅ Ensure Users closes when clicking it again
  useEffect(() => {
    const result = pathName.split("/").slice(0, 3).join("/");
    if (
      result === "/dashboard_agent/users" &&
      ![
        "/dashboard_agent/users/customers",
        "/dashboard_agent/users/leads",
        "/dashboard_agent/users/suppliers",
      ].some((path) => pathName.startsWith(path))
    ) {
      if (!isOpenUsers) {
        setIsOpenUsers(true);
      }
      navigate("/dashboard_agent/users/customers");
    }
  }, [location, isOpenUsers]);

  // ✅ Keep Users open when clicking Customers
  const handleClickCustomers = useCallback(() => {
    handleStateLinks();
    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveCustomers(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/users/customers")) {
      handleClickCustomers();
    }
  }, [location, handleClickCustomers]);

  // ✅ Keep Users open when clicking Leads
  const handleClickLeads = useCallback(() => {
    handleStateLinks();
    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveLeads(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/users/leads")) {
      handleClickLeads();
    }
  }, [location, handleClickLeads]);

  // ✅ Keep Users open when clicking Suppliers
  const handleClickSuppliers = useCallback(() => {
    handleStateLinks();
    setIsOpenUsers(true);
    setIsActiveUsersIcon(true);
    setIsActiveUsers(true);
    setIsActiveSuppliers(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/users/suppliers")) {
      handleClickSuppliers();
    }
  }, [location, handleClickSuppliers]);

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
    const result = part.slice(0, 4).join("/");

    if (
      result === "/dashboard_agent/booking" &&
      !["/dashboard_agent/booking/manual_booking", "/dashboard_agent/booking/booking_engine",
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickBooking();
      navigate("/dashboard_agent/booking/manual_booking");
    }
  }, [location]); // Fixed dependency


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
        "/dashboard_agent/requests",
        "/dashboard_agent/requests/add_request",
        "/dashboard_agent/requests/work_station",
      ].some((path) => pathName.startsWith(path))
    ) {
      handleClickBookingList();
      navigate("/dashboard_agent/requests");
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
    if (result == "/dashboard_agent/requests") {
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
    if (result == "/dashboard_agent/requests/add_request") {
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
  const handleClickAccounting = (e) => {
    e.preventDefault();

    setIsOpenAccounting((prev) => !prev);
    setIsActiveAccountingIcon((prev) => !prev);
    setIsActiveAccounting((prev) => !prev);
  };
  useEffect(() => {
    const result = pathName.split("/").slice(0, 3).join("/");

    // Prevent overriding navigation if already inside a sub-route
    if (
      result === "/dashboard_agent/accounting" &&
      ![
        "/dashboard_agent/accounting/ledger",
        "/dashboard_agent/accounting/payment_receivable",
        "/dashboard_agent/accounting/owner_transaction/owner",
        "/dashboard_agent/accounting/owner_transaction/transaction",
        "/dashboard_agent/accounting/payable_to_supplier/payable_supplier",
        "/dashboard_agent/accounting/payable_to_supplier/paid_supplier",
        "/dashboard_agent/accounting/payable_to_supplier/over_due",
        "/dashboard_agent/accounting/revenue/list_revenue",
        "/dashboard_agent/accounting/revenue/category_revenue",
        "/dashboard_agent/accounting/expenses/list_expenses",
        "/dashboard_agent/accounting/expenses/category_expenses",
      ].some((path) => pathName.startsWith(path)) // Prevent overriding active sub-routes
    ) {
      if (!isOpenAccounting) {
        setIsOpenAccounting(true);
      }
      navigate("/dashboard_agent/accounting/ledger"); // Ensure the default route is correct
    }
  }, [location]);

  //Ledger
  const handleClickLedger = useCallback(() => {
    handleStateLinks();
    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);
    setIsActiveLedger(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/ledger")) {
      handleClickLedger();
    }
  }, [location, handleClickLedger]);

  //payment recivable
  const handleClickPaymentRecivable = useCallback(() => {
    handleStateLinks();
    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);
    setIsActivePaymentRecivable(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/payment_receivable")) {
      handleClickPaymentRecivable();
    }
  }, [location, handleClickPaymentRecivable]);

  // Owner List & Transactions (O.W)
  const handleClickOwnerTransaction = useCallback(() => {
    handleStateLinks();

    // Open Accounting Dropdown
    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    // Open O.W Dropdown
    setIsOpenOwnerTransaction((prev) => !prev);
    setIsActiveOwnerTransaction((prev) => !prev);
    setIsActiveOwnerTransactionIcon((prev) => !prev);
  }, []);

  const handleClickOwner = useCallback(() => {
    handleClickOwnerTransaction(); // Ensure parent (O.W) is open

    setIsOpenOwner((prev) => !prev);
    setIsActiveOwner((prev) => !prev);
  }, []);

  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/owner_transaction/owner")) {
      handleClickOwner();
    }
  }, [location, handleClickOwner]);

  // Transactions
  const handleClickTransaction = useCallback(() => {
    handleClickOwnerTransaction(); // Ensure parent (O.W) is open

    setIsOpenTransaction((prev) => !prev);
    setIsActiveTransaction((prev) => !prev);
  }, []);

  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/owner_transaction/transaction")) {
      handleClickTransaction();
    }
  }, [location, handleClickTransaction]);

  // payable
  const handleClickPayable = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenPayable((prev) => !prev);
    setIsActivePayable((prev) => !prev);
    setIsActivePayableIcon((prev) => !prev);
  }, []);

  // payable TO Supplier
  const handleClickPayableToSupplier = useCallback(() => {
    handleStateLinks();
    handleClickPayable();

    setIsOpenPayableToSupplier((prev) => !prev);
    setIsActivePayableToSupplier((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/payable_to_supplier/payable_supplier")) {
      handleClickPayableToSupplier();
    }
  }, [location, handleClickPayableToSupplier]);

  // payable TO Supplier 
  const handleClickPaidSupplier = useCallback(() => {
    handleStateLinks();
    handleClickPayable();

    setIsOpenPaidSupplier((prev) => !prev);
    setIsActivePaidSupplier((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/payable_to_supplier/paid_supplier")) {
      handleClickPaidSupplier();
    }
  }, [location, handleClickPaidSupplier]);

  // payable overDue 
  const handleClickOverDue = useCallback(() => {
    handleStateLinks();
    handleClickPayable();

    setIsOpenOverDue((prev) => !prev);
    setIsActiveOverDue((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/payable_to_supplier/over_due")) {
      handleClickOverDue();
    }
  }, [location, handleClickOverDue]);

  //Revenu
  const handleClickRevenue = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenRevenue((prev) => !prev);
    setIsActiveRevenue((prev) => !prev);
    setIsActiveRevenueIcon((prev) => !prev);
  }, []);

  //Revenu List
  const handleClickListRevenue = useCallback(() => {
    handleStateLinks();
    handleClickRevenue();

    setIsOpenListRevenue((prev) => !prev);
    setIsActiveListRevenue((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/revenue/list_revenue")) {
      handleClickListRevenue();
    }
  }, [location, handleClickListRevenue]);

  //Revenu Category
  const handleClickCategoryRevenue = useCallback(() => {
    handleStateLinks();
    handleClickRevenue();

    setIsOpenCategoryRevenue((prev) => !prev);
    setIsActiveCategoryRevenue((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/revenue/category_revenue")) {
      handleClickCategoryRevenue();
    }
  }, [location, handleClickCategoryRevenue]);

  //Expenses
  const handleClickExpenses = useCallback(() => {
    handleStateLinks();

    setIsOpenAccounting(true);
    setIsActiveAccountingIcon(true);
    setIsActiveAccounting(true);

    setIsOpenExpenses((prev) => !prev);
    setIsActiveExpenses((prev) => !prev);
    setIsActiveExpensesIcon((prev) => !prev);
  }, []);

  //Expenses List
  const handleClickListExpenses = useCallback(() => {
    handleStateLinks();
    handleClickExpenses();

    setIsOpenListExpenses((prev) => !prev);
    setIsActiveListExpenses((prev) => !prev);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/expenses/list_expenses")) {
      handleClickListExpenses();
    }
  }, [location, handleClickListExpenses]);

  //Expenses Category
  const handleClickCategoryExpenses = useCallback(() => {
    handleStateLinks();
    handleClickExpenses();

    setIsOpenCategoryExpenses((prev) => !prev);
    setIsActiveCategoryExpenses((prev) => !prev);;
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/accounting/expenses/category_expenses")) {
      handleClickCategoryExpenses();
    }
  }, [location, handleClickCategoryExpenses]);

  //HRM
  const handleClickHRM = (e) => {
    e.preventDefault();
    setIsOpenHRM((prev) => !prev);
    setIsActiveHRMIcon((prev) => !prev);
    setIsActiveHRM((prev) => !prev);
  };
  useEffect(() => {
    const result = pathName.split("/").slice(0, 3).join("/");
    if (
      result === "/dashboard_agent/hrm" &&
      ![
        "/dashboard_agent/hrm/department",
        "/dashboard_agent/hrm/employee",
        "/dashboard_agent/hrm/agent",
      ].some((path) => pathName.startsWith(path))
    ) {
      if (!isOpenHRM) {
        setIsOpenHRM(true);
      }
      navigate("/dashboard_agent/hrm/department");
    }
  }, [location, isOpenHRM]);

  const handleClickHRMDepartment = useCallback(() => {
    handleStateLinks();
    setIsOpenHRM(true);
    setIsActiveHRMIcon(true);
    setIsActiveHRM(true);
    setIsActiveHRMDepartment(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/hrm/department")) {
      handleClickHRMDepartment();
    }
  }, [location, handleClickHRMDepartment]);

  const handleClickHRMEmployee = useCallback(() => {
    handleStateLinks();
    setIsOpenHRM(true);
    setIsActiveHRMIcon(true);
    setIsActiveHRM(true);
    setIsActiveHRMEmployee(true);
  }, []);

  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/hrm/employee")) {
      handleClickHRMEmployee();
    }
  }, [location, handleClickHRMEmployee]);

  const handleClickHRMAgent = useCallback(() => {
    handleStateLinks();
    setIsOpenHRM(true);
    setIsActiveHRMIcon(true);
    setIsActiveHRM(true);
    setIsActiveHRMAgent(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/hrm/agent")) {
      handleClickHRMAgent();
    }
  }, [location, handleClickHRMAgent]);

  // Setting
  const handleClickSetting = (e) => {
    e.preventDefault();
    setIsOpenSetting((prev) => !prev);
    setIsActiveSettingIcon((prev) => !prev);
    setIsActiveSetting((prev) => !prev);
  };
  useEffect(() => {
    const result = pathName.split("/").slice(0, 3).join("/");
    if (
      result === "/dashboard_agent/setting" &&
      ![
        "/dashboard_agent/setting/financial_account",
        "/dashboard_agent/setting/wallet",
        "/dashboard_agent/setting/admin_account",
        "/dashboard_agent/setting/roles",
        "/dashboard_agent/setting/currency",
        "/dashboard_agent/setting/tax",
        "/dashboard_agent/setting/group",
      ].some((path) => pathName.startsWith(path))
    ) {
      if (!isOpenSetting) {
        setIsOpenSetting(true);
      }
      navigate("/dashboard_agent/setting/financial_account");
    }
  }, [location, isOpenSetting]);

  const handleClickSettingFinancialAccount = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveFinancialAccount(true);
  }, []);

  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/financial_account")) {
      handleClickSettingFinancialAccount();
    }
  }, [location, handleClickSettingFinancialAccount]);

  const handleClickSettingAdminAccount = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveAdminAccount(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/admin_account")) {
      handleClickSettingAdminAccount();
    }
  }, [location, handleClickSettingAdminAccount]);

  const handleClickSettingRoles = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActivePosition(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/roles")) {
      handleClickSettingRoles();
    }
  }, [location, handleClickSettingRoles]);

  const handleClickSettingWallet = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveWallet(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/wallet")) {
      handleClickSettingWallet();
    }
  }, [location, handleClickSettingWallet]);

  const handleClickSettingCurrency = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveCurrency(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/currency")) {
      handleClickSettingCurrency();
    }
  }, [location, handleClickSettingCurrency]);

  const handleClickSettingTax = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveTax(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/tax")) {
      handleClickSettingTax();
    }
  }, [location, handleClickSettingTax]);

  const handleClickSettingGroup = useCallback(() => {
    handleStateLinks();
    setIsOpenSetting(true);
    setIsActiveSettingIcon(true);
    setIsActiveSetting(true);
    setIsActiveGroup(true);
  }, []);
  useEffect(() => {
    if (pathName.startsWith("/dashboard_agent/setting/group")) {
      handleClickSettingGroup();
    }
  }, [location, handleClickSettingGroup]);


  // Subscription
  const handleClickSubscription = useCallback(() => {
    handleStateLinks();

    setIsOpenSubscriptions(true);
    setIsActiveSubscriptionIcon(true);
    setIsActiveSubscription(true);
    setIsActiveSubscriptionInvoice(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 3).join("/");

    if (result === "/dashboard_agent/subscriptions" &&
      ![
        "/dashboard_agent/subscriptions/invoice",
      ]
    ) {
      handleClickSubscription();
      navigate("/dashboard_agent/subscriptions/invoice");
    }
  }, [location]);

  const handleClickSubscriptionInvoice = useCallback(() => {
    handleStateLinks();

    setIsOpenSubscriptions(true);
    setIsActiveSubscriptionIcon(true);
    setIsActiveSubscription(true);
    setIsActiveSubscriptionInvoice(true);
  }, []);
  useEffect(() => {
    const part = pathName.split("/");
    const result = part.slice(0, 4).join("/");
    if (result == "/dashboard_agent/subscriptions/invoice") {
      handleClickSubscriptionInvoice();
    }
  }, [location]);

  return (
    <div className="space-y-2 w-full h-full">
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
           flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-start"
          } hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaHome
            className={`${isActiveHomeIcon || isActiveHome ? "text-mainColor" : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveHome ? "text-mainColor" : "text-white"
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
            className={`${isActiveUsersIcon || isActiveUsers
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveUsers ? "text-mainColor" : "text-white"
                }`}
            >
              Users
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveUsers ? "text-mainColor rotate-90" : "text-white rotate-0"
              } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${isOpenUsers && !isSidebarCollapsed ? "h-17" : "h-0 "
          } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"users/leads"}
            onClick={() => {
              handleClickLeads();
              onLinkClick();
            }}
          >
            <li
              className={`${isActiveLeads
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
                }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Leads
            </li>
          </Link>
          <Link
            to={"users/customers"}
            onClick={() => {
              handleClickCustomers();
              onLinkClick();
            }}
          >
            <li
              className={`${isActiveCustomers
                  ? "rounded-xl bg-white text-mainColor"
                  : "text-white"
                }
                          text-xl font-TextFontLight rounded-xl px-4 py-1  hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Customers
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
              className={`${isActiveSuppliers
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
            className={`${isActiveBookingIcon || isActiveBooking
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveBooking ? "text-mainColor" : "text-white"
                }`}
            >
              New Booking
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveBooking
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
              } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${isOpenBooking && !isSidebarCollapsed ? "h-17" : "h-0 "
          } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"booking/manual_booking"}
            onClick={handleClickManualBooking}
          >
            <li
              className={`${isActiveManualBooking
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
              className={`${isActiveBookingEngine
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
            className={`${isActiveBookingListIcon || isActiveBookingList
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveBookingList ? "text-mainColor" : "text-white"
                }`}
            >
              Booking List
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveBookingList
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
              } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${isOpenBookingList && !isSidebarCollapsed ? "h-17" : "h-0 "
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
              className={`${isActiveUpcomingBookingList
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
              className={`${isActiveCurrentBookingList
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
              className={`${isActivePastBookingList
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
            className={`${isActiveBookingPaymentIcon || isActiveBookingPayment
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveBookingPayment ? "text-mainColor" : "text-white"
                }`}
            >
              Booking Payment
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveBookingPayment
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
              } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>

      {/* Financial List */}
      {/* <Link
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
      </div> */}


      {/* Subscription List */}
      <Link
        to="subscriptions"
        onMouseMove={() => setIsActiveSubscriptionIcon(true)}
        onMouseOut={() => setIsActiveSubscriptionIcon(false)}
        onClick={() => {
          handleClickSubscription();
        }}
        className={`
          ${isActiveSubscription ? "active" : ""}
         flex items-center 
         ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-xl items-center gap-x-2">
          <FaFileArchive
            className={`${isActiveSubscriptionIcon || isActiveSubscription
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-base transition-all duration-300 group-hover:text-mainColor font-TextFontRegular ml-2 ${isActiveSubscription ? "text-mainColor" : "text-white"
                }`}
            >
              Subscription
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveSubscription
                ? "text-mainColor rotate-90"
                : "text-white rotate-0"
              } text-xl transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${isOpenSubscriptions && !isSidebarCollapsed ? "h-17" : "h-0 "
          } overflow-hidden flex items-start justify-end  w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"invoice"}
            onClick={() => {
              handleClickSubscriptionInvoice();
              onLinkClick();
            }}
          >
            <li
              className={`${isActiveSubscriptionInvoice
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
      {/* <Link
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
      </Link> */}
      {/* Requests */}
      <Link
        to="requests"
        onMouseMove={() => setIsActiveRequestsIcon(true)}
        onMouseOut={() => setIsActiveRequestsIcon(false)}
        onClick={handleClickRequests}
        className={`${isActiveRequests ? "active" : ""
          } flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-lg items-center gap-x-2"> {/* Increased font size here */}
          <FaCode
            className={`${isActiveRequestsIcon || isActiveRequests
                ? "text-mainColor"
                : "text-white"
              } text-xl`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-[17px] font-semibold transition-all duration-300 group-hover:text-mainColor ml-2 ${isActiveRequests ? "text-mainColor" : "text-white"}`}
            >
              Requests
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveRequests ? "text-mainColor rotate-90" : "text-white rotate-0"} text-lg transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`${isOpenRequests && !isSidebarCollapsed ? "h-17" : "h-0 "
          } overflow-hidden flex items-start justify-end w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-2">
          <Link
            to={"requests"}
            onClick={() => {
              handleClickRequestList();
              onLinkClick();
            }}
          >
            <li
              className={`${isActiveRequestList ? "rounded-xl bg-white text-mainColor" : "text-white"
                } text-lg font-TextFontRegular rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}
            >
              Request List
            </li>
          </Link>
          <Link
            to={"requests/add_request"}
            onClick={() => {
              handleClickNewRequest();
              onLinkClick();
            }}
          >
            <li
              className={`${isActiveNewRequest ? "rounded-xl bg-white text-mainColor" : "text-white"
                } text-lg font-TextFontRegular rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}
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
              className={`${isActiveWorkStation ? "rounded-xl bg-white text-mainColor" : "text-white"
                } text-lg font-TextFontRegular rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}
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
        className={`${isActiveInventory ? "active" : ""
          } flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex font-semibold text-lg items-center gap-x-2"> {/* Increased font size here */}
          <FaBriefcase
            className={`${isActiveInventoryIcon || isActiveInventory ? "text-mainColor" : "text-white"
              } text-xl`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-[17px] font-semibold transition-all duration-300 group-hover:text-mainColor ml-2 ${isActiveInventory ? "text-mainColor" : "text-white"
                }`}
            >
              Inventory
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveInventory ? "text-mainColor rotate-90" : "text-white rotate-0"
              } text-lg transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </div>

      <div
        className={`${isOpenInventory && !isSidebarCollapsed ? "h-17" : "h-0 "
          } overflow-hidden flex items-start justify-end w-full transition-all duration-700`}
      >
        <ul className="list-disc w-full transition-all duration-700 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <li
              onMouseMove={() => setIsActiveInventoryRoomIcon(true)}
              onMouseOut={() => setIsActiveInventoryRoomIcon(false)}
              onClick={handleClickInventoryRoom}
              className={`${isActiveInventoryRoom ? "active" : ""
                } flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
            >
              <div className="flex font-semibold text-xl items-center gap-x-2"> {/* Increased font size here */}
                <MdOutlineBedroomChild
                  className={`${isActiveInventoryRoomIcon || isActiveInventoryRoom
                      ? "text-mainColor"
                      : "text-white"
                    } text-lg`}
                />
                {!isSidebarCollapsed && (
                  <span
                    className={`text-lg font-TextFontRegular transition-all duration-300 group-hover:text-mainColor ml-2 ${isActiveInventoryRoom ? "text-mainColor" : "text-white"
                      }`}
                  >
                    Room
                  </span>
                )}
              </div>
              {!isSidebarCollapsed && (
                <IoIosArrowForward
                  className={`${isActiveInventoryRoom ? "text-mainColor rotate-90" : "text-white rotate-0"
                    } text-lg transition-all duration-300 group-hover:text-mainColor`}
                />
              )}
            </li>
            <div
              className={`${isOpenInventoryRoom && !isSidebarCollapsed ? "h-17" : "h-0 "
                } overflow-hidden flex items-start justify-end w-full transition-all duration-700`}
            >
              <ul className="list-disc w-full pl-10 transition-all duration-700 flex flex-col gap-y-4">
                <Link
                  to={"inventory/room/list"}
                  onClick={() => {
                    handleClickInventoryRoomPreview();
                    onLinkClick();
                  }}
                >
                  <li
                    className={`${isActiveInventoryRoomPreview
                        ? "rounded-xl bg-white text-mainColor"
                        : "text-white"
                      } text-lg font-TextFontRegular rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}
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
                    className={`${isActiveInventoryRoomSetting
                        ? "rounded-xl bg-white text-mainColor"
                        : "text-white"
                      } text-lg font-TextFontRegular rounded-xl px-4 py-1 hover:bg-white transition-all duration-300 hover:text-mainColor`}
                  >
                    Room Setting
                  </li>
                </Link>
              </ul>
            </div>
            <Link
              to="inventory/tour/list"
              onMouseMove={() => setIsActiveInventoryIcon(true)}
              onMouseOut={() => setIsActiveInventoryIcon(false)}
              onClick={() => {
                handleClickInventoryTour();
                onLinkClick();
              }}
              className={`${isActiveInventoryTour ? "active" : ""
                } flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-start"} hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
            >
              <div className="flex font-semibold text-lg items-center gap-x-2"> {/* Increased font size here */}
                <FaMapMarkedAlt
                  className={`${isActiveInventoryTour || isActiveInventory
                      ? "text-mainColor"
                      : "text-white"
                    } text-lg`}
                />
                {!isSidebarCollapsed && (
                  <span
                    className={`text-lg font-TextFontRegular transition-all duration-300 group-hover:text-mainColor ml-2 ${isActiveInventoryTour ? "text-mainColor" : "text-white"
                      }`}
                  >
                    Tour
                  </span>
                )}
              </div>
              {!isSidebarCollapsed && (
                <IoIosArrowForward
                  className={`${isActiveInventoryTour ? "text-mainColor rotate-90" : "text-white rotate-0"
                    } text-lg transition-all duration-300 group-hover:text-mainColor`}
                />
              )}
            </Link>
          </div>
        </ul>
      </div>


      {/* Accounting */}
      <Link
        to="accounting/ledger"
        onMouseMove={() => setIsActiveAccountingIcon(true)}
        onMouseOut={() => setIsActiveAccountingIcon(false)}
        onClick={handleClickAccounting}
        className={`${isActiveAccounting ? "active" : ""
          } flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300`}
      >
        <div className="flex items-center gap-x-2">
          <FaDatabase
            className={`${isActiveAccountingIcon || isActiveAccounting
                ? "text-mainColor"
                : "text-white"
              }`}
          />
          {!isSidebarCollapsed && (
            <span
              className={`text-[17px] font-semibold ml-2 group-hover:text-mainColor ${isActiveAccounting ? "text-mainColor" : "text-white"
                }`}
            >
              Accounting
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveAccounting ? "text-mainColor rotate-90" : "text-white rotate-0"
              } text-lg transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div
        className={`overflow-hidden w-full transition-all duration-700 ${isOpenAccounting && !isSidebarCollapsed ? "max-h-[800px]" : "max-h-0"
          }`}
      >
        <ul className="list-none w-full pl-5 transition-all duration-700 flex flex-col gap-y-1">
          {/* Ledger Link */}
          <Link to={"accounting/ledger"} onClick={() => { handleClickLedger(); onLinkClick(); }}>
            <li
              className={`text-[16px] font-medium p-2 rounded-lg transition-all duration-300 ${isActiveLedger ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                }`}
            >
              - General Ledger
            </li>
          </Link>

          {/* payment_receivable Link */}
          <Link to={"accounting/payment_receivable"} onClick={() => { handleClickPaymentRecivable(); onLinkClick(); }}>
            <li
              className={`text-[16px] font-medium p-2 rounded-lg transition-all duration-300 ${isActivePaymentRecivable ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                }`}
            >
              - Payment Receivable
            </li>
          </Link>

          {/* O.E Dropdown (Owner List & Transactions) */}
          <li
            onMouseEnter={() => setIsActiveOwnerTransaction(true)}
            onMouseLeave={() => setIsActiveOwnerTransaction(false)}
            onClick={handleClickOwnerTransaction}
            className={`flex items-center font-medium text-[16px] justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer ${isActiveOwnerTransaction ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
              }`}
          >
            <div className="flex items-center gap-2">
              <GrTransaction className={isActiveOwnerTransaction ? "text-mainColor" : "text-white"} />
              {!isSidebarCollapsed && <span>O.E</span>}
            </div>
            {!isSidebarCollapsed && (
              <IoIosArrowForward
                className={`transition-transform duration-300 ${isActiveOwnerTransaction ? "rotate-90 text-mainColor" : "rotate-0 text-white"
                  }`}
              />
            )}
          </li>

          {/* Owner List & Transactions (Expandable) */}
          <div
            className={`overflow-hidden transition-all duration-500 ${isOpenOwnerTransaction ? "max-h-[300px]" : "max-h-0"
              }`}
          >
            <ul className="list-disc pl-6 transition-all duration-500 flex flex-col gap-y-2">
              {/* Owner List */}
              <Link to={"accounting/owner_transaction/owner"} onClick={() => { handleClickOwner(); onLinkClick(); }}>
                <li
                  className={`text-[16px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActiveOwner ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                    }`}
                >
                  Owners
                </li>
              </Link>

              {/* Transactions */}
              <Link to={"accounting/owner_transaction/transaction"} onClick={() => { handleClickTransaction(); onLinkClick(); }}>
                <li
                  className={`text-[16px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActiveTransaction ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                    }`}
                >
                  Transactions
                </li>
              </Link>
            </ul>
          </div>

          {/* Payable to Supplier Dropdown */}
          <li
            onMouseEnter={() => setIsActivePayable(true)}
            onMouseLeave={() => setIsActivePayable(false)}
            onClick={handleClickPayable}
            className={`flex items-center font-medium text-[16px] justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer ${isActivePayable ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
              }`}
          >
            <div className="flex items-center gap-2">
              <MdOutlinePayment className={isActivePayable ? "text-mainColor" : "text-white"} />
              {!isSidebarCollapsed && <span>Payable</span>}
            </div>
            {!isSidebarCollapsed && (
              <IoIosArrowForward
                className={`transition-transform duration-300 ${isActivePayable ? "rotate-90 text-mainColor" : "rotate-0 text-white"
                  }`}
              />
            )}
          </li>
          {/* Payable to Supplier Expandable Section */}
          <div
            className={`overflow-hidden transition-all duration-500 ${isOpenPayable ? "max-h-[300px]" : "max-h-0"}`}
          >
            <ul className="list-disc pl-6 transition-all duration-500 flex flex-col gap-y-2">
              {/* Payable to Supplier */}
              <Link to={"accounting/payable_to_supplier/payable_supplier"} onClick={() => { handleClickPayableToSupplier(); onLinkClick(); }}>
                <li
                  className={`text-md font-semibold px-2 py-2 rounded-lg transition-all duration-300 ${isActivePayableToSupplier ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                    }`}
                >
                  Payable To Supplier
                </li>
              </Link>

              {/* Paid Supplier */}
              <Link to={"accounting/payable_to_supplier/paid_supplier"} onClick={() => { handleClickPaidSupplier(); onLinkClick(); }}>
                <li
                  className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActivePaidSupplier ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                    }`}
                >
                  Paid Supplier
                </li>
              </Link>

              {/* Over Due */}
              <Link to={"accounting/payable_to_supplier/over_due"} onClick={() => { handleClickOverDue(); onLinkClick(); }}>
                <li
                  className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActiveOverDue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                    }`}
                >
                  Over Due
                </li>
              </Link>
            </ul>
          </div>

          {/* Revenue Section */}
          <li
            onMouseEnter={() => setIsActiveRevenue(true)}
            onMouseLeave={() => setIsActiveRevenue(false)}
            onClick={handleClickRevenue}
            className={`flex items-center font-semibold text-md justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
            ${isActiveRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}`}
          >
            <div className="flex items-center gap-2">
              <MdAttachMoney className={isActiveRevenue ? "text-mainColor" : "text-white"} />
              {!isSidebarCollapsed && <span>Revenue</span>}
            </div>
            {!isSidebarCollapsed && (
              <IoIosArrowForward
                className={`transition-transform duration-300 ${isActiveRevenue ? "rotate-90 text-mainColor" : "rotate-0 text-white"}`}
              />
            )}
          </li>

          {/* Revenue Dropdown */}
          <div className={`overflow-hidden transition-all duration-500 ${isOpenRevenue ? "max-h-[300px]" : "max-h-0"}`}>
            <ul className="list-disc pl-6 transition-all duration-500 flex flex-col gap-y-2">
              {/* Revenue List */}
              <Link to={"accounting/revenue/list_revenue"} onClick={() => { handleClickListRevenue(); onLinkClick(); }}>
                <li className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActiveListRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                  }`}>
                  Revenue List
                </li>
              </Link>

              {/* Revenue Category */}
              <Link to={"accounting/revenue/category_revenue"} onClick={() => { handleClickCategoryRevenue(); onLinkClick(); }}>
                <li className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActiveCategoryRevenue ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                  }`}>
                  Revenue Category
                </li>
              </Link>
            </ul>
          </div>

          {/* Expenses Section */}
          <li
            onMouseEnter={() => setIsActiveExpenses(true)}
            onMouseLeave={() => setIsActiveExpenses(false)}
            onClick={handleClickExpenses}
            className={`flex items-center font-semibold text-md justify-between p-2 rounded-lg transition-all duration-300 cursor-pointer
            ${isActiveExpenses ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}`}
          >
            <div className="flex items-center gap-2">
              <MdOutlineMoneyOff className={isActiveExpenses ? "text-mainColor" : "text-white"} />
              {!isSidebarCollapsed && <span>Expenses</span>}
            </div>
            {!isSidebarCollapsed && (
              <IoIosArrowForward
                className={`transition-transform duration-300 ${isActiveExpenses ? "rotate-90 text-mainColor" : "rotate-0 text-white"}`}
              />
            )}
          </li>

          {/* Expenses Dropdown */}
          <div className={`overflow-hidden transition-all duration-500 ${isOpenExpenses ? "max-h-[300px]" : "max-h-0"}`}>
            <ul className="list-disc pl-6 transition-all duration-500 flex flex-col gap-y-2">
              {/* Expenses List */}
              <Link to={"accounting/expenses/list_expenses"} onClick={() => { handleClickListExpenses(); onLinkClick(); }}>
                <li className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActiveListExpenses ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                  }`}>
                  Expenses List
                </li>
              </Link>

              {/* Expenses Category */}
              <Link to={"accounting/expenses/category_expenses"} onClick={() => { handleClickCategoryExpenses(); onLinkClick(); }}>
                <li className={`text-md font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isActiveCategoryExpenses ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"
                  }`}>
                  Expenses Category
                </li>
              </Link>
            </ul>
          </div>
        </ul>
      </div>

      {/* HRM */}
      <Link
        to="hrm/department"
        onMouseMove={() => setIsActiveHRMIcon(true)}
        onMouseOut={() => setIsActiveHRMIcon(false)}
        onClick={handleClickHRM}
        className={`
        ${isActiveHRM ? "active" : ""}
        flex items-center 
        ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300
      `}
      >
        <div className="flex items-center gap-x-2">
          <FaUserCog className={`${isActiveHRMIcon || isActiveHRM ? "text-mainColor" : "text-white"} text-xl`} />
          {!isSidebarCollapsed && (
            <span className={`text-[17px] font-semibold ml-2 group-hover:text-mainColor ${isActiveHRM ? "text-mainColor" : "text-white"}`}>
              HRM
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveHRM ? "text-mainColor rotate-90" : "text-white rotate-0"} text-lg transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div className={`${isOpenHRM && !isSidebarCollapsed ? "h-15" : "h-0"} overflow-hidden flex items-start justify-end w-full transition-all duration-700`}>
        <ul className="list-none w-full pl-6 flex flex-col gap-y-2 transition-all duration-700">
          {[
            { label: 'Department', to: 'hrm/department', isActive: isActiveHRMDepartment, onClick: handleClickHRMDepartment },
            { label: 'Agent', to: 'hrm/agent', isActive: isActiveHRMAgent, onClick: handleClickHRMAgent },
            { label: 'Employee', to: 'hrm/employee', isActive: isActiveHRMEmployee, onClick: handleClickHRMEmployee },
          ].map(({ label, to, isActive, onClick }) => (
            <Link to={to} key={label} onClick={() => { onClick(); onLinkClick(); }}>
              <li className={`text-[16px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}`}>
                - {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Settings */}
      <Link
        to="setting"
        onMouseMove={() => setIsActiveSettingIcon(true)}
        onMouseOut={() => setIsActiveSettingIcon(false)}
        onClick={handleClickSetting}
        className={`
        ${isActiveSetting ? "active" : ""}
        flex items-center 
        ${isSidebarCollapsed ? "justify-center" : "justify-between"} 
        hover:rounded-xl p-2 hover:bg-white hover:text-mainColor group transition-all duration-300
      `}
      >
        <div className="flex items-center gap-x-2">
          <FaCog className={`${isActiveSettingIcon || isActiveSetting ? "text-mainColor" : "text-white"} text-xl`} />
          {!isSidebarCollapsed && (
            <span className={`text-[17px] font-semibold ml-2 group-hover:text-mainColor ${isActiveSetting ? "text-mainColor" : "text-white"}`}>
              Settings
            </span>
          )}
        </div>
        {!isSidebarCollapsed && (
          <IoIosArrowForward
            className={`${isActiveSetting ? "text-mainColor rotate-90" : "text-white rotate-0"} text-lg transition-all duration-300 group-hover:text-mainColor`}
          />
        )}
      </Link>
      <div className={`${isOpenSetting && !isSidebarCollapsed ? "h-15" : "h-0"} overflow-hidden flex items-start justify-end w-full transition-all duration-700`}>
        <ul className="list-none w-full pl-6 flex flex-col gap-y-2 transition-all duration-700">
          {[
            { label: 'Financial Account', to: 'setting/financial_account', isActive: isActiveFinancialAccount, onClick: handleClickSettingFinancialAccount },
            { label: 'Roles', to: 'setting/roles', isActive: isActivePosition, onClick: handleClickSettingRoles },
            { label: 'Admin Account', to: 'setting/admin_account', isActive: isActiveAdminAccount, onClick: handleClickSettingAdminAccount },
            { label: 'Wallet', to: 'setting/wallet', isActive: isActiveWallet, onClick: handleClickSettingWallet },
            { label: 'Currency', to: 'setting/currency', isActive: isActiveCurrency, onClick: handleClickSettingCurrency },
            { label: 'Tax', to: 'setting/tax', isActive: isActiveTax, onClick: handleClickSettingTax },
            { label: 'Group', to: 'setting/group', isActive: isActiveGroup, onClick: handleClickSettingGroup },
          ].map(({ label, to, isActive, onClick }) => (
            <Link to={to} key={label} onClick={() => { onClick(); onLinkClick(); }}>
              <li className={`text-[16px] font-medium px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? "bg-white text-mainColor" : "text-white hover:bg-white hover:text-mainColor"}`}>
                - {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default MenuSideAgent;
