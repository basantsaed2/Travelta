// import {} from "./layouts/Layouts";
import App from "./App";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import SignUpAgent from "./Pages/Authentication/SignUpAgent";
import SignUpSupplier from "./Pages/Authentication/SignUpSupplier";
import SignUpFreelancer from "./Pages/Authentication/SignUpFreelancer";
import SignUpAffilate from "./Pages/Authentication/SignUpAffilate"
import Login from "./Pages/Authentication/Login";
import AgentLayout from "./Layouts/AgentLayouts/AgentLayout";
import AgentHomePage from "./Pages/Dashboard/AgentDashboard/Home/AgentHomePage";  
import {AddAdminAccountLayout, AddAgentLayout, AddCategoryExpensesLayout, AddCategoryRevenueLayout, AddCurrencyLayout, AddDepartmentLayout, AddEmployeeLayout, AddFinancialAccountLayout, AddGroupLayout, AddLeadLayout, AddOwnerLayout, AddPositionLayout, AddRoomAmenityLayout, AddRoomExtraLayout, AddRoomLayout, AddRoomTypeLayout, AddSupplierLayout, AddTaxLayout, AddTourLayout, AddWalletLayout, AdminAccountLayout, BookingPaymentLayout, CartLayout, CategoryExpensesLayout, CategoryRevenueLayout, CheckoutLayout, CurrencyAgentLayout, CurrentBookingLayout, CustomersLayout , DepartmentLayout, EditAdminAccountLayout, EditAgentLayout, EditCategoryExpensesLayout, EditCategoryRevenueLayout, EditCurrencyLayout, EditDepartmentLayout, EditEmployeeLayout, EditFinancialAccountLayout, EditGroupLayout, EditOwnerLayout, EditPositionLayout, EditRoomAmenityLayout, EditRoomExtraLayout, EditRoomLayout, EditRoomPricingLayout, EditRoomTypeLayout, EditSupplierLayout, EditTaxLayout, EditTourLayout, EmployeeLayout, FinancialAccountLayout, GroupLayout, HotelBookingDetailsLayout, InvoiceAgentLayout, LeadLayout, LedgerLayout, ListExpensesLayout, ManualBookingLayout, OwnerTransactionLayout, PastBookingLayout, PlansLayout, PositionLayout, RoomAvailabilityLayout, RoomExtraLayout, RoomGalleryLayout, RoomLayout, RoomPricingLayout, RoomTypeLayout, SupplierLayout, TaxLayout, UpcomingBookingLayout, WalletLayout} from "./Layouts/AllLayouts";
import { LandingPage } from "./Pages/AllPages";
import CheckOutProcessLayout from "./Layouts/AgentLayouts/CheckOutProcess/CheckOutProcessLayout";
import HomeSuperAdmin from "./Pages/SuperAdmin/Home/HomeSuperAdmin";

import ClientLayout from "./Layouts/SuperAdminLayouts/ClientLayout/ClientLayout";
import HotelsLayout from "./Layouts/SuperAdminLayouts/HotelsLayout/HotelsLayout";
import AdminLayout from "./Layouts/SuperAdminLayouts/AdminLayouts/AdminLayout";
import AgentProfileLayout from "./Layouts/SuperAdminLayouts/AgentProfileLayout/AgentProfileLayout";
import BookingSuperLayout from "./Layouts/SuperAdminLayouts/BookingLayout/BookingSuperLayout";
import TourismLayout from "./Layouts/SuperAdminLayouts/TourismLayout/TourismLayout";
import PendingPaymentLayout from "./Layouts/SuperAdminLayouts/PendingPaymetLayout/PendingPaymentLayout";
import PlanLayout from "./Layouts/SuperAdminLayouts/PlansLayout/PlanLayout";
import TicketLayout from "./Layouts/SuperAdminLayouts/TicketLayout/TicketLayout";
import SubscriptionLayout from "./Layouts/SuperAdminLayouts/SubscriptionLayout/SubscriptionLayout";

import SuperAdminLayout from "./Layouts/SuperAdminLayouts/SuperAdminLayout";
import LoginSuper from "./Pages/Authentication/LoginSuper";
import AddClient from "./Pages/SuperAdmin/Clinet/AddClient";
import AddHotels from "./Pages/SuperAdmin/Hotels/AddHotels";
import SignApproveLayout from "./Layouts/SuperAdminLayouts/SignUpApproveLayout/SignApproveLayout";
import AddAdmin from "./Pages/SuperAdmin/Admin/AddAdmin";
import AddAgent from "./Pages/SuperAdmin/AgentProfile/AddAgent";
import AddBooking from "./Pages/SuperAdmin/Booking/AddBooking";
import AddToueism from "./Pages/SuperAdmin/Tourism/AddToueism";
import AddPending from "./Pages/SuperAdmin/PendingPayment/AddPending";
import AddPlan from "./Pages/SuperAdmin/Plans/AddPlan";
import AddTicket from "./Pages/SuperAdmin/TicketingSystem/AddTicket";
import AddSubscription from "./Pages/SuperAdmin/Subscription/AddSubscription";
import CountryLayout from "./Layouts/SuperAdminLayouts/SettingLayout/CountryLayout";
import AddCountry from "./Pages/SuperAdmin/Settings/Tabs/Country/AddCountry";
import UpdateCountry from "./Pages/SuperAdmin/Settings/Tabs/Country/UpdateCountry";
import CityLayout from "./Layouts/SuperAdminLayouts/SettingLayout/CityLayout";
import AddCity from "./Pages/SuperAdmin/Settings/Tabs/City/AddCity";
import UpdateCity from "./Pages/SuperAdmin/Settings/Tabs/City/UpdateCity";
import ZoneLayout from "./Layouts/SuperAdminLayouts/SettingLayout/ZoneLayout";
import AddZone from "./Pages/SuperAdmin/Settings/Tabs/Zone/AddZone";
import UpdateZone from "./Pages/SuperAdmin/Settings/Tabs/Zone/UpdateZone";
import PaymentLayout from "./Layouts/SuperAdminLayouts/SettingLayout/PaymentLayout";
import AddPayment from "./Pages/SuperAdmin/Settings/Tabs/Paymeny/AddPayment";
import UpdatePayment from "./Pages/SuperAdmin/Settings/Tabs/Paymeny/UpdatePayment";
import Settings from "./Pages/SuperAdmin/Settings/Settings";
import SettingLayout from "./Layouts/SuperAdminLayouts/SettingLayout/SettingLayout";
import UpdateClient from "./Pages/SuperAdmin/Clinet/UpdateClient";
import UpdateHotel from "./Pages/SuperAdmin/Hotels/UpdateHotel";
import UpdatePlan from "./Pages/SuperAdmin/Plans/UpdatePlan";
import UpdateSubscription from "./Pages/SuperAdmin/Subscription/UpdateSubscription";
import UpdateTicket from "./Pages/SuperAdmin/TicketingSystem/UpdateTicket";
import UpdateTourism from "./Pages/SuperAdmin/Tourism/UpdateTourism";
import UpdateBooking from "./Pages/SuperAdmin/Booking/UpdateBooking";
import UpdateAgent from "./Pages/SuperAdmin/AgentProfile/UpdateAgent";
import UpdateAdmin from "./Pages/SuperAdmin/Admin/UpdateAdmin";
import CurrencyLayout from "./Layouts/SuperAdminLayouts/SettingLayout/CurrencyLayout";
import AddCurrency from "./Pages/SuperAdmin/Settings/Tabs/Currency/AddCurrency";
import UpdateCurrency from "./Pages/SuperAdmin/Settings/Tabs/Currency/UpdateCurrency";
import PaymentMethodLayout from "./Layouts/SuperAdminLayouts/SettingLayout/PaymentMethodLayout";
import AddPaymentMethod from "./Pages/SuperAdmin/Settings/Tabs/PaymentMethod/AddPaymentMethod";
import RequestListLayout from "./Layouts/AgentLayouts/Requests/RequestListLayout";
import NewRequestLayout from "./Layouts/AgentLayouts/Requests/NewRequestLayout";
import WorkStationLayout from "./Layouts/AgentLayouts/Requests/WorkStationLayout";
import InvoiceLayout from "./Layouts/SuperAdminLayouts/FinancialLayout/InvoiceLayout/InvoiceLayout";
import AddInvoiceLayout from "./Layouts/SuperAdminLayouts/FinancialLayout/InvoiceLayout/AddInvoiceLayout";
import FlightProfileLayout from "./Layouts/BookingListLayout/Upcoming/FlightDeatilsLayout";
import VisaProfileLayout from "./Layouts/BookingListLayout/Upcoming/VisaDetailsLayout";
import TourProfileLayout from "./Layouts/BookingListLayout/Upcoming/TourDetailsLayout";
import BusProfileLayout from "./Layouts/BookingListLayout/Upcoming/BusDetailsLayout";
import HotelProfileLayout from "./Layouts/BookingListLayout/Upcoming/HotelDetailsLayout";
import ProfileLayout from "./Layouts/AgentLayouts/Users/Leads/ProfileLayout";
import ProfileSupplierLayout from "./Layouts/AgentLayouts/Users/Suppliers/ProfileSupplierLayout";
import ProfileCustomerLayout from "./Layouts/AgentLayouts/Users/Customers/ProfileLayout";
import EditLeadLayout from "./Layouts/AgentLayouts/Users/Leads/EditLeadLayout";
import FlightLayout from "./Layouts/BookingListLayout/past/FlightLayout";
import VisaLayout from "./Layouts/BookingListLayout/past/VisaLayout";
import TourLayout from "./Layouts/BookingListLayout/past/TourLayout";
import BusLayout from "./Layouts/BookingListLayout/past/BusLayout";
import HotelLayout from "./Layouts/BookingListLayout/past/HotelLayout";
import FlightDeatilsLayout from "./Layouts/BookingListLayout/Current/FlightDeatilsLayout";
import VisaDetailsLayout from "./Layouts/BookingListLayout/Current/VisaDetailsLayout";
import TourDeatilsLayout from "./Layouts/BookingListLayout/Current/TourDeatilsLayout";
import BusDetailsLayout from "./Layouts/BookingListLayout/Current/BusDetailsLayout";
import HotelDetailsLayout from "./Layouts/BookingListLayout/Current/HotelDetailsLayout";
import DetailsCurrentLayout from "./Layouts/BookingListLayout/DetailsCurrentLayout";
import DetailsPastLayout from "./Layouts/BookingListLayout/DetailsPastLayout";
import DetailsUpcomingLayout from "./Layouts/BookingListLayout/DetailsUpcomingLayout";
import ManualBookingLayoutSuper from "./Layouts/SuperAdminLayouts/PendingPaymetLayout/ManualBookingLayoutSuper";
import WalletLayoutSuper from "./Layouts/SuperAdminLayouts/PendingPaymetLayout/WalletLayoutSuper";
import TourTypeLayout from "./Layouts/SuperAdminLayouts/SettingLayout/ToutTypeLayout";
import AddTourType from "./Pages/SuperAdmin/Settings/Tabs/TourType/AddTourType";
import BookingInvoiceLayout from "./Layouts/AgentLayouts/BookingPayments/BookingInvoiceLayout";
import InvoicePage from "./Components/Agent Components/InvoicePage";
import TourGalleryLayout from "./Layouts/AgentLayouts/Inventory/Tours/TourGallery/TourGalleryLayout";
import TourPageLayout from "./Layouts/AgentLayouts/Inventory/Tours/TourReview/TourPageLayout";
import BookingEngineLayout from "./Layouts/BookingLayout/BookingEngineLayout";
import TransactionLayout from "./Layouts/AgentLayouts/Users/Suppliers/TransactionLayout";
import DetailsTransactionLayout from "./Layouts/AgentLayouts/Users/Suppliers/DetailsTransactionLayout";
// import Accounting from "./Pages/Dashboard/AgentDashboard/Accounting/";
import AccountSupplierLayout from "./Layouts/AgentLayouts/Accounting/AccountSupplierLayout";
import TransactionAccountLayout from "./Layouts/AgentLayouts/Accounting/TransactionAccountLayout";
// import InvoiceAccountLayout from "./Layouts/AgentLayouts/Accounting/InvoiceAccountLayout";
import PayableToSupplierLayout from "./Layouts/AgentLayouts/Accounting/PayableToSupplierLayout/PayableToSupplierLayout";
import PaidSupplierLayout from "./Layouts/AgentLayouts/Accounting/PayableToSupplierLayout/PaidSupplierLayout";
import OverDueLayout from "./Layouts/AgentLayouts/Accounting/PayableToSupplierLayout/OverDueLayout";
import OwnerLayout from "./Layouts/AgentLayouts/Accounting/OwnerTransaction/OwnerLayout";
import PaymentRecivableLayout from "./Layouts/AgentLayouts/Accounting/PaymentRecivableLayout/PaymentRecivableLayout";
import ListRevenueLayout from "./Layouts/AgentLayouts/Accounting/AccountRevenueLayout/ListRevenueLayout";
import AgentHRMLayout from "./Layouts/AgentLayouts/HRM/Agent/AgentHRMLayout";


const AppLayoutAgent = () => (
    <>
      <AgentLayout/>
    </>
  );
const UsersLayout = () => (
  <>
  <Outlet />
  </>
);


const AppLeadLayout = () => (
  <>
  <Outlet />
  </>
);
const AppSupplierLayout = () => ( 
  <>
  <Outlet />
  </>
);
const BookingLayout = () => (
  <>
  <Outlet />
  </>
);
const BookingListLayout = () => (
  <>
  <Outlet />
  </>
);

const RequestsApp = () => (
  <>
  <Outlet />
  </>
);
const AppSetting= () => (
  <>
  <Outlet />
  </>
);
const AppFinancialAccount= () => (
  <>
  <Outlet />
  </>
);
const AppWalletLayout= () => (
  <>
  <Outlet />
  </>
);

const AppCurrencyLayout= () => (
  <>
  <Outlet />
  </>
);
const AppTaxLayout= () => (
  <>
  <Outlet />
  </>
);
const AppGroupLayout= () => (
  <>
  <Outlet />
  </>
);
const AppInventory= () => (
  <>
  <Outlet />
  </>
);
const AppInventoryRoom= () => (
  <>
  <Outlet />
  </>
);
const AppInventoryRoomSetting= () => (
  <>
  <Outlet />
  </>
);
const AppRoomLayout= () => (
  <>
  <Outlet />
  </>
);
const AppRoomExtra= () => (
  <>
  <Outlet />
  </>
);
const AppRoomPricingLayout= () => (
  <>
  <Outlet />
  </>
);

// super admin
const AppLayoutAdmin = () => (
  <>
    <SuperAdminLayout/>
  </>
);

const AppClientLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppHotelLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppAdminLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppAgentProfileLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppBookingLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppPendingLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppTicketLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppSubscriptionLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppPlanLayOut= () => (
  <>
  <Outlet />
  </>
);

const AppTourismLayOut= () => (
  <>
  <Outlet />
  </>
);
// const AppSuperSetting= () => (
//   <SettingLayout>
//   <Outlet />
// </SettingLayout>
// );

const AppCountry= () => (
  <>
  <Outlet />
  </>
);
const AppCity= () => (
  <>
  <Outlet />
  </>
);

const AppZone= () => (
  <>
  <Outlet />
  </>
);

const AppPayment= () => (
  <>
  <Outlet />
  </>
);
const AppPaymentMethod= () => (
  <>
  <Outlet />
  </>
);

const AppCurrency= () => (
  <>
  <Outlet />
  </>
);
const AppFinancial= () => (
  <>
  <Outlet />
  </>
);
const AppInvoice= () => (
  <>
  <Outlet />
  </>
);

const AppFinancialagent= () => (
  <>
  <Outlet />
  </>
);
const AppSubscriptionAgentLayout= () => (
  <>
  <Outlet />
  </>
);
const AppInvoiceAgent= () => (
  <>
  <Outlet />
  </>
);

const AppUpcomingBooking= () => (
  <>
  <Outlet />
  </>
);
const AppPastBooking= () => (
  <>
  <Outlet />
  </>
);
const AppCurrentBooking= () => (
  <>
  <Outlet />
  </>
);
const AppCustomer= () => (
  <>
  <Outlet />
  </>
);
const AppPosition= () => (  
  <>
  <Outlet />
  </>
);
const AppTour= () => (
  <>
  <Outlet />
  </>
);
const AppBookingPayment= () => (
  <>
  <Outlet />
  </>
);
const AppTourLayout= () => (
  <>
  <Outlet />
  </>
);
const AppInventoryTour= () => (
  <>
  <Outlet />
  </>
);
const AppExpenses= () => (
  <>
  <Outlet />
  </>
);
const AppPayable= () => (
  <>
  <Outlet />
  </>
);
const AppAccounting= () => (
  <>
  <Outlet />
  </>
);
const AppBookingEngine =() => (
  <>
  <Outlet />
  </>
);
const AppOwnerTransaction =() => (
  <>
  <Outlet />
  </>
);
const AppPaymentRecivable =() => (
  <>
  <Outlet />
  </>
);
const AppRevenue =() => (
  <>
  <Outlet />
  </>
);
const AppAdminAccount =() => (
  <>
  <Outlet />
  </>
);
const AppHRM =() => (
    <>
    <Outlet />
    </>
);
const AppHRMDepartment=() => (
  <>
  <Outlet />
  </>
);
const AppHRMagency=() => (
  <>            
  <Outlet />
  </>
);
const AppHRMEmployee=() => (
  <>
  <Outlet />
  </>
);
const AppCategoryRevenueLayout =() => (
  <>
  <Outlet />
  </>
);
const AppCategoryExpensesLayout=() => (
  <>
  <Outlet />
  </>
);
export const router = createBrowserRouter([

    {
      path: "/",
      element: <LandingPage />,
    },
    {
        path: "/sign_agent",
        element: <SignUpAgent />,
    },
    {
        path: "/sign_supplier",
        element: <SignUpSupplier />,
    },
    {
        path: "/sign_freelance",
        element: <SignUpFreelancer />,
    },
    {
        path: "/sign_affiliate",
        element: <SignUpAffilate />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
      path: "/login_super",
      element: <LoginSuper />,
  },
    {
      path: "/dashboard/plans",
      element: <PlansLayout />,
    },
    {
      path: "/dashboard/cart",
      element: <CartLayout />,
    },
    {
      path: "/dashboard/checkout",
      element: <CheckoutLayout/>,
    },

      /* Admin Routes*/
      {
        element: <ProtectedRoute allowedRoles={['agent']} />,
        path: '/dashboard_agent',
        children: [


          {
            path: 'InvoicePage',
            element: <InvoicePage/>,
          },

          {
            path: '',
            element: <AppLayoutAgent/>,
            children: [
              {
                path: '',
                element: <AgentHomePage/>,
              },

              {
                path: 'accounting',
                element: <AppAccounting/>,
                children:[
                  {
                    path:"ledger",
                    element: <LedgerLayout/>
                  },
                  {
                    path:"payment_recivable",
                    element:<PaymentRecivableLayout/>,
                  },
                  {
                    path:"owner_transaction",
                    element:<AppOwnerTransaction/>,
                    children:[
                      {
                        path:"owner",
                        element:<Outlet/>,
                        children:[
                          {
                            path:"",
                            element:<OwnerLayout/>,
                          },
                          {
                            path:"add",
                            element:<AddOwnerLayout/>
                          },
                          {
                            path:"edit/:ownerId",
                            element:<EditOwnerLayout/>
                          }
                        ]
                      },
                      {
                        path:"transaction",
                        element:<OwnerTransactionLayout/>,
                      },
                  ]},

                  {path:"payable_to_supplier",
                    element:<AppPayable/>,
                    children:[
                      {
                        path:"payable_supplier",
                        element:<PayableToSupplierLayout/>,
                      },
                      {
                        path:"paid_supplier",
                        element:<PaidSupplierLayout/>,
                      },
                      {
                        path:"over_due",
                        element:<OverDueLayout/>,
                      }
                  ]},

                  {
                    path:"revenue",
                    element:<AppRevenue/>,
                    children:[
                      {
                        path:"list_revenue",
                        element:<ListRevenueLayout/>,
                      },
                      {
                        path:"category_revenue",
                        element:<AppCategoryRevenueLayout/>,
                        children :[
                          {
                            path:"",
                            element:<CategoryRevenueLayout/>,
                          },
                          {
                            path:"add",
                            element:<AddCategoryRevenueLayout/>,
                          },
                          {
                            path:"edit/:categoryRevenueId",
                            element:<EditCategoryRevenueLayout/>,
                          },
                        ]
                      }             
                  ]},
                  {
                    path:"expenses",
                    element:<AppExpenses/>,
                    children:[
                      {
                        path:"category_expenses",
                        element:<AppCategoryExpensesLayout/>,
                        children :[
                          {
                            path:"",
                            element:<CategoryExpensesLayout/>,
                          },
                          {
                            path:"add",
                            element:<AddCategoryExpensesLayout/>,
                          },
                          {
                            path:"edit/:categoryExpensesId",
                            element:<EditCategoryExpensesLayout/>,
                          },
                        ]
                      },
                      {
                        path:"list_expenses",
                        element:<ListExpensesLayout/>,
                      }
                    ]
                  },
                ]
              },
   
              {
                path: 'users',
                element: <UsersLayout />,
                children: [
                  {
                    path: 'customers',
                    element: <AppCustomer />,
                    children: [
                    {path: '',
                      element: <CustomersLayout/>
                    },
                    {path: 'profiles/:id',
                      element: <ProfileCustomerLayout/>
                    }
                  ]
                },
                  {
                    path: 'leads',
                    element: <AppLeadLayout />,
                    children: [
                      {path: '',
                        element: <LeadLayout/>
                      },
                      {path: 'add',
                        element: <AddLeadLayout/>
                      },
                      {path: 'profile/:id',
                        element: <ProfileLayout/>
                      },
                      {path: 'edit/:leadId',
                        element: <EditLeadLayout/>
                      },
                    ]
                  },
                  {
                    path: 'suppliers',
                    element: <AppSupplierLayout />,
                    children: [
                      {path: '',
                        element: <SupplierLayout/>
                      },
                      {path: 'add',
                        element: <AddSupplierLayout/>
                      },
                      {path: 'edit/:supplierId',
                        element: <EditSupplierLayout/>
                      },
                      {path: 'profile/:id',
                        element: <ProfileSupplierLayout/>
                      },
                      {path: 'transaction/:id',
                        element: <TransactionLayout/>
                      },
                      {path: 'transaction_details/:id',
                        element: <DetailsTransactionLayout/>
                      }

                   
                    ]
                  },

    
                ]
              },
              {
                path: 'booking',
                element: <BookingLayout />,
                children: [
                  {
                    path: 'manual_booking',
                    element: <ManualBookingLayout />,
                  },
                  {
                    path: 'booking_engine',
                    element: <AppBookingEngine />,
                    children:[
                      {
                        path: '',
                        element: <BookingEngineLayout />,
                      },
                      {
                        path: 'details',
                        element: <HotelBookingDetailsLayout />,
                      },
                    ]
                  },
                ]
              },
              {
                path: 'booking_list',
                element: <BookingListLayout />,
                children: [
                  {
                    path: 'current_booking',
                    element: <AppCurrentBooking />,
                    children:[
                      {
                       path:"",
                       element:<CurrentBookingLayout/>
                      },
                      {
                        path:"details/:current_id",
                        element:<DetailsCurrentLayout/>
                       },
                     ]
                  },
                  {
                    path: 'past_booking',
                    element: <AppPastBooking />,
                    children:[
                      {
                       path:"",
                       element:<PastBookingLayout/>
                      },
                      {
                       path:"details_past/:past_id",
                       element:<DetailsPastLayout/>
                      },
                     ]
                  },
                  {
                    path: 'upcoming_booking',
                    element: <AppUpcomingBooking />,
                    children:[
                     {
                      path:"",
                      element:<UpcomingBookingLayout/>
                     },
                     {
                      path:"details_upcoming/:upcoming_id",
                      element:<DetailsUpcomingLayout/>
                     },
                    ]

                    
                  },
                ]
              },

              // {
              //   path: "financial",
              //   element: <AppFinancialagent/>,
              //   children:[
              //     {
              //       path: "invoice",
              //       element: <AppInvoiceAgent/>,
              //       children:[
              //           {
              //             path: "",
              //             element: <InvoiceAgentLayout/>,
              //           },       
              //           {
              //             path: "add",
              //             element: <AddInvoiceAgentLayout/>,
              //           },
              //           {
              //           path: "edit/:accountId",
              //           element: <EditFinancialAccountLayout/>,
              //           },
              //       ]
              //     },
              //   ]
              // },

              
              {
                path: "subscriptions",
                element: <AppSubscriptionAgentLayout/>,
                children:[
                  {
                    path: "invoice",
                    element: <AppInvoiceAgent/>,
                    children:[
                        {
                          path: "",
                          element: <InvoiceAgentLayout/>,
                        },       
                    ]
                  },
                ]
              },

              {
                path: "setting",
                element: <AppSetting/>,
                children:[
                  {
                    path: "financial_account",
                    element: <AppFinancialAccount/>,
                    children:[
                        {
                          path: "",
                          element: <FinancialAccountLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddFinancialAccountLayout/>,
                        },
                        {
                        path: "edit/:accountId",
                        element: <EditFinancialAccountLayout/>,
                        },
                    ]
                  },
                  {
                    path: 'wallet',
                    element: <AppWalletLayout/>,
                    children:[
                      {
                        path: "",
                        element: <WalletLayout/>,
                      },
                      {
                        path: "add",
                        element: <AddWalletLayout/>,
                      },

                    ]
    
                  },

                  {
                    path: "currency",
                    element: <AppCurrency />,
                    children: [
                      {
                        path: "",
                        element: <CurrencyAgentLayout />, // Default payment list page
                      },
                      {
                        path: "add",
                        element: <AddCurrencyLayout />, // Add new payment (without tabs)
                      },
                      {
                        path: "edit/:currency_Id",
                        element: <EditCurrencyLayout />, // Edit existing payment
                      },
                    ],
                  },

                  {
                    path: 'tax',
                    element: <AppTaxLayout/>,
                    children:[
                      {
                        path: "",
                        element: <TaxLayout/>,
                      },
                      {
                        path: "add",
                        element: <AddTaxLayout/>,
                      },
                      {
                        path: "edit/:taxId",
                        element: <EditTaxLayout/>,
                      },
                    ]
    
                  },

                  {
                    path: 'group',
                    element: <AppGroupLayout/>,
                    children:[
                      {
                        path: "",
                        element: <GroupLayout/>,
                      },
                      {
                        path: "add",
                        element: <AddGroupLayout/>,
                      },
                      {
                        path: "edit/:groupId",
                        element: <EditGroupLayout/>,
                      },
                    ]
    
                  },

                  {
                    path: "admin_account",
                    element: <AppAdminAccount/>,
                    children:[
                        {
                          path: "",
                          element: <AdminAccountLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddAdminAccountLayout/>,
                        },
                        {
                        path: "edit/:adminAccountId",
                        element: <EditAdminAccountLayout/>,
                        },
                    ]
                  },

                  {
                    path: "roles",
                    element: <AppPosition/>,
                    children:[
                        {
                          path: "",
                          element: <PositionLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddPositionLayout/>,
                        },
                        {
                        path: "edit/:roleId",
                        element: <EditPositionLayout/>,
                        },
                    ]
                  },

                ]
              },

              {
                path: "hrm",
                element: <AppHRM/>,
                children:[
                  {
                    path: "department",
                    element: <AppHRMDepartment/>,
                    children:[
                        {
                          path: "",
                          element: <DepartmentLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddDepartmentLayout/>,
                        },
                        {
                        path: "edit/:departmentId",
                        element: <EditDepartmentLayout/>,
                        },
                    ]
                  },
                  {
                    path: "agent",
                    element: <AppHRMagency/>,
                    children:[
                        {
                          path: "",
                          element: <AgentHRMLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddAgentLayout/>,
                        },
                        {
                        path: "edit/:agencyId",
                        element: <EditAgentLayout/>,
                        },
                    ]
                  },
                  {
                    path: "employee",
                    element: <AppHRMEmployee/>,
                    children:[
                        {
                          path: "",
                          element: <EmployeeLayout/>,
                        },       
                        {
                          path: "add",
                          element: <AddEmployeeLayout/>,
                        },
                        {
                        path: "edit/:employeeId",
                        element: <EditEmployeeLayout/>,
                        },
                    ]
                  }
                ]
              },

              {
                path: "checkOut_process",
                element: <CheckOutProcessLayout />,
              },

              {
                path:"inventory",
                element: <AppInventory/>,
                children:[
                  {
                    path:"room",
                    element:<AppInventoryRoom/>,
                    children:[
                      {
                        path:"setting_room",
                        element:<AppInventoryRoomSetting/>,
                        children:[
                          {
                            path:"",
                            element:<RoomTypeLayout/>,
                          },
                          {
                            path:"add_type",
                            element:<AddRoomTypeLayout/>
                          },
                          {
                            path:"edit_type/:roomTypeId",
                            element:<EditRoomTypeLayout/>
                          },
                          {
                            path:"add_extra",
                            element:<AddRoomExtraLayout/>
                          },
                          {
                            path:"edit_extra/:roomExtraId",
                            element:<EditRoomExtraLayout/>
                          },
                          {
                            path:"add_amenity",
                            element:<AddRoomAmenityLayout/>
                          },
                          {
                            path:"edit_amenity/:roomAmenityId",
                            element:<EditRoomAmenityLayout/>
                          },
                        ]

                      },
                      {
                        path:"list",
                        element:<AppRoomLayout/>,
                        children:[
                          {
                            path:"",
                            element:<RoomLayout/>,
                          },
                          {
                            path:"add",
                            element:<AddRoomLayout/>,
                          },
                          {
                            path:"edit/:roomId",
                            element:<EditRoomLayout/>,
                          },
                          {
                            path:"pricing/:roomId",
                            element:<AppRoomPricingLayout/>,
                            children:[
                              {
                                path:"",
                                element:<RoomPricingLayout/>,
                              },
                              {
                                path:"edit/:pricingId",
                                element:<EditRoomPricingLayout/>,
                              },
                            ]
                          },
                          {
                            path:"gallery/:galleryId",
                            element:<RoomGalleryLayout/>,
                          },
                          {
                            path:"availability/:availableId",
                            element:<RoomAvailabilityLayout/>,
                          },
                    ]
                      }
                ]

                  },
                  {
                    path:"tour",
                    element:<AppInventoryTour/>,
                    children:[
                      {
                        path:"list",
                        element:<AppTourLayout/>,
                        children:[
                          {
                            path:"",
                            element:<TourPageLayout/>,
                          },
                          {
                            path:"add",
                            element:<AddTourLayout/>,
                          },
                          {
                            path:"edit/:tourId",
                            element:<EditTourLayout/>,
                          },
                          {
                            path:"gallery/:TourId",
                            element:<TourGalleryLayout/>,
                          },
                    ]
                      }
                ]

                  }
            ]
              },

              {
                path: 'requests',
                element: <RequestsApp />,
                children: [
                  {
                    path: 'request_list',
                    element: <RequestListLayout />,
                  },
                  {
                    path: 'new_request',
                    element: <NewRequestLayout />,
                  },
                  {
                    path: 'work_station',
                    element: <WorkStationLayout />,
                  },
                ]
              },

              {
                path:'booking_payments',
                element:<AppBookingPayment/>,
                children:[
                  {
                    path: "",
                    element: <BookingPaymentLayout/>,
                  },
                  {
                    path: "invoice/:id",
                    element: <BookingInvoiceLayout/>,
                  },
                ]
              }
            ],
      },
    ]
    },

      // Super Admin Routes

      {
        element: <ProtectedRoute allowedRoles={['SuperAdmin']} />,
        path: '/super_admin',
        children: [
          {
            path: '',
            element: <AppLayoutAdmin/>,
            children: [
              {
                path: '',
                element: <HomeSuperAdmin/>,
              },

              {
                path: 'client',
                element: <AppClientLayOut/>,
                children:[
                  {
                    path: "",
                    element: <ClientLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddClient/>,
                  },
                  {
                    path: "update/:id",
                    element: <UpdateClient/>,
                  },

                ]

              },

              {
                path: 'hotels',
                element: <AppHotelLayOut/>,
                children:[
                  {
                    path: "",
                    element: <HotelsLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddHotels/>,
                  },

                  {
                    path: "update/:id",
                    element: <UpdateHotel/>,
                  },

                ]

              },

             

              {
                path: 'admin',
                element: <AppAdminLayOut/>,
                children:[
                  {
                    path: "",
                    element: <AdminLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddAdmin/>,
                  },
                  {
                    path: "update/:id",
                    element: <UpdateAdmin/>,
                  },

                ]

              },
              {
                path: 'agent_profile',
                element: <AppAgentProfileLayOut/>,
                children:[
                  {
                    path: "",
                    element: <AgentProfileLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddAgent/>,
                  },

                  {
                    path: "update/:id",
                    element: <UpdateAgent/>,
                  },
                ]

              },
              {
                path: 'booking',
                element: <AppBookingLayOut/>,

                children:[
                  {
                    path: "",
                    element: <BookingSuperLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddBooking/>,
                  },
                  {
                    path: "update/:id",
                    element: <UpdateBooking/>,
                  },

                ]

              },
              
              {
                path: 'tourism',
                element: <AppTourismLayOut/>,
                children:[
                  {
                    path: "",
                    element: <TourismLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddToueism/>,
                  },

                  {
                    path: "update/:id",
                    element: <UpdateTourism/>,
                  },
                ]

              },

              {
                path: 'pending_payment',
                element: <AppPendingLayOut/>,

                children:[
                  {
                    path: "",
                    element: <PendingPaymentLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddPending/>,
                  },

                  {
                    path: "update/:id",
                    element: <UpdatePayment/>,
                  },
                ]

              },
              {
                path: 'plans',
                element: <AppPlanLayOut/>,
                children:[
                  {
                    path: "",
                    element: <PlanLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddPlan/>,
                  },
                  {
                    path: "update/:id",
                    element: <UpdatePlan/>,
                  },

                ]

              },
              {
                path: 'ticketing_system',
                element: <AppTicketLayOut/>,

                children:[
                  {
                    path: "",
                    element: <TicketLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddTicket/>,
                  },
                  {
                    path: "update/:id",
                    element: <UpdateTicket/>,
                  },

                ]


              },

              {
                path: 'subscriptions',
                element: <AppSubscriptionLayOut/>,
                children:[
                  {
                    path: "",
                    element: <SubscriptionLayout/>,
                  },
                  {
                    path: "add",
                    element: <AddSubscription/>,
                  },

                  {
                    path: "update/:id",
                    element: <UpdateSubscription/>,
                  },

                ]

              },
              {
                path: "settings",
                element: <SettingLayout />,
                children: [
                  {
                    path: "countries",
                    element: <AppCountry />,
                    children: [
                      {
                        path: "",
                        element: <CountryLayout />, // Default country list page
                      },
                      {
                        path: "add",
                        element: <AddCountry />, // Add new country (without tabs)
                      },
                      {
                        path: "edit/:countryId",
                        element: <UpdateCountry />, // Edit existing country
                      },
                    ],
                  },
                  {
                    path: "city",
                    element: <AppCity />,
                    children: [
                      {
                        path: "",
                        element: <CityLayout />, // Default city list page
                      },
                      {
                        path: "add",
                        element: <AddCity />, // Add new city (without tabs)
                      },
                      {
                        path: "edit/:cityId",
                        element: <UpdateCity />, // Edit existing city
                      },
                    ],
                  },
                  {
                    path: "zone",
                    element: <AppZone />,
                    children: [
                      {
                        path: "",
                        element: <ZoneLayout />, // Default zone list page
                      },
                      {
                        path: "add",
                        element: <AddZone />, // Add new zone (without tabs)
                      },
                      {
                        path: "edit/:zoneId",
                        element: <UpdateZone />, // Edit existing zone
                      },
                    ],
                  },
                  {
                    path: "payment",
                    element: <AppPayment />,
                    children: [
                      {
                        path: "",
                        element: <PaymentLayout />, // Default payment list page
                      },
                      {
                        path: "add",
                        element: <AddPayment />, // Add new payment (without tabs)
                      },
                      {
                        path: "edit/:paymentId",
                        element: <UpdatePayment />, // Edit existing payment
                      },
                    ],
                  },
                  {
                    path: "payment_method",
                    element: <AppPaymentMethod />,
                    children: [
                      {
                        path: "",
                        element: <PaymentMethodLayout />, // Default payment list page
                      },
                      {
                        path: "add",
                        element: <AddPaymentMethod />, // Add new payment (without tabs)
                      },
                    
                    ],
                  },
                  {
                    path: "currency",
                    element: <AppCurrency />,
                    children: [
                      {
                        path: "",
                        element: <CurrencyLayout />, // Default payment list page
                      },
                      {
                        path: "add",
                        element: <AddCurrency />, // Add new payment (without tabs)
                      },
                      {
                        path: "edit/:currencyId",
                        element: <UpdateCurrency />, // Edit existing payment
                      },
                    ],
                  },
                ],
              }
              ,

              {
                path: 'signApprove',
                element: <SignApproveLayout/>

              },

            ]
          },
        ],
      },

      // Super Admin Routes
      // {
      //   element: <ProtectedRoute allowedRoles={['SuperAdmin']} />,
      //   path: '/super_admin',
      //   children: [
      //     {
      //       path: '',
      //       element: <AppLayoutAdmin/>,
      //       children: [
      //         {
      //           path: '',
      //           element: <HomeSuperAdmin/>,
      //         },

      //         {
      //           path: 'client',
      //           element: <AppClientLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <ClientLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddClient/>,
      //             },
      //             {
      //               path: "update/:id",
      //               element: <UpdateClient/>,
      //             },

      //           ]

      //         },

      //         {
      //           path: 'hotels',
      //           element: <AppHotelLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <HotelsLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddHotels/>,
      //             },

      //             {
      //               path: "update/:id",
      //               element: <UpdateHotel/>,
      //             },

      //           ]

      //         },

             

      //         {
      //           path: 'admin',
      //           element: <AppAdminLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <AdminLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddAdmin/>,
      //             },
      //             {
      //               path: "update/:id",
      //               element: <UpdateAdmin/>,
      //             },

      //           ]

      //         },
      //         {
      //           path: 'agent_profile',
      //           element: <AppAgentProfileLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <AgentProfileLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddAgent/>,
      //             },

      //             {
      //               path: "update/:id",
      //               element: <UpdateAgent/>,
      //             },
      //           ]

      //         },
      //         {
      //           path: 'booking',
      //           element: <AppBookingLayOut/>,

      //           children:[
      //             {
      //               path: "",
      //               element: <BookingSuperLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddBooking/>,
      //             },
      //             {
      //               path: "update/:id",
      //               element: <UpdateBooking/>,
      //             },

      //           ]

      //         },
              
      //         {
      //           path: 'tourism',
      //           element: <AppTourismLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <TourismLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddToueism/>,
      //             },

      //             {
      //               path: "update/:id",
      //               element: <UpdateTourism/>,
      //             },
      //           ]

      //         },

      //         {
      //           path: 'pending_payment',
      //           element: <AppPendingLayOut/>,

      //           children:[

                 

      //             {
      //               path: "",
      //               element: <PendingPaymentLayout/>,
      //             },

      //             {
      //               path: "manualBooking_Pending",
      //               element: <ManualBookingLayoutSuper/>,
      //             },

      //             {
      //               path: "wallet_super",
      //               element: <WalletLayoutSuper/>,
      //             },



      //             {
      //               path: "add",
      //               element: <AddPending/>,
      //             },

      //             {
      //               path: "update/:id",
      //               element: <UpdatePayment/>,
      //             },
      //           ]

      //         },
      //         {
      //           path: 'plans',
      //           element: <AppPlanLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <PlanLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddPlan/>,
      //             },
      //             {
      //               path: "update/:id",
      //               element: <UpdatePlan/>,
      //             },

      //           ]

      //         },
      //         {
      //           path: 'ticketing_system',
      //           element: <AppTicketLayOut/>,

      //           children:[
      //             {
      //               path: "",
      //               element: <TicketLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddTicket/>,
      //             },
      //             {
      //               path: "update/:id",
      //               element: <UpdateTicket/>,
      //             },

      //           ]


      //         },

      //         {
      //           path: 'subscriptions',
      //           element: <AppSubscriptionLayOut/>,
      //           children:[
      //             {
      //               path: "",
      //               element: <SubscriptionLayout/>,
      //             },
      //             {
      //               path: "add",
      //               element: <AddSubscription/>,
      //             },

      //             {
      //               path: "update/:id",
      //               element: <UpdateSubscription/>,
      //             },

      //           ]

      //         },
      //         {
      //           path: "settings",
      //           element: <SettingLayout />,
      //           children: [
      //             {
      //               path: "countries",
      //               element: <AppCountry />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <CountryLayout />, // Default country list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddCountry />, // Add new country (without tabs)
      //                 },
      //                 {
      //                   path: "edit/:countryId",
      //                   element: <UpdateCountry />, // Edit existing country
      //                 },
      //               ],
      //             },
      //             {
      //               path: "city",
      //               element: <AppCity />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <CityLayout />, // Default city list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddCity />, // Add new city (without tabs)
      //                 },
      //                 {
      //                   path: "edit/:cityId",
      //                   element: <UpdateCity />, // Edit existing city
      //                 },
      //               ],
      //             },
      //             {
      //               path: "zone",
      //               element: <AppZone />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <ZoneLayout />, // Default zone list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddZone />, // Add new zone (without tabs)
      //                 },
      //                 {
      //                   path: "edit/:zoneId",
      //                   element: <UpdateZone />, // Edit existing zone
      //                 },
      //               ],
      //             },
      //             {
      //               path: "payment",
      //               element: <AppPayment />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <PaymentLayout />, // Default payment list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddPayment />, // Add new payment (without tabs)
      //                 },
      //                 {
      //                   path: "edit/:paymentId",
      //                   element: <UpdatePayment />, // Edit existing payment
      //                 },
      //               ],
      //             },
      //             {
      //               path: "payment_method",
      //               element: <AppPaymentMethod />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <PaymentMethodLayout />, // Default payment list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddPaymentMethod />, // Add new payment (without tabs)
      //                 },
                    
      //               ],
      //             },
      //             {
      //               path: "currency",
      //               element: <AppCurrency />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <CurrencyLayout />, // Default payment list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddCurrency />, // Add new payment (without tabs)
      //                 },
      //                 {
      //                   path: "edit/:currencyId",
      //                   element: <UpdateCurrency />, // Edit existing payment
      //                 },
      //               ],
      //             },

      //             {
      //               path: "tour_type",
      //               element: <AppTour />,
      //               children: [
      //                 {
      //                   path: "",
      //                   element: <TourTypeLayout />, // Default zone list page
      //                 },
      //                 {
      //                   path: "add",
      //                   element: <AddTourType />, // Add new zone (without tabs)
      //                 },
      //                 // {
      //                 //   path: "edit/:zoneId",
      //                 //   element: <UpdateZone />, // Edit existing zone
      //                 // },
      //               ],
      //             },
      //           ],
      //         }
      //         ,

      //         {
      //           path: 'signApprove',
      //           element: <SignApproveLayout/>

      //         },

      //         {
      //           path: "financial",
      //           element: <AppFinancial/>,
      //           children:[
      //             {
      //               path: "invoice",
      //               element: <AppInvoice/>,
      //               children:[
      //                   {
      //                     path: "",
      //                     element: <InvoiceLayout/>,
      //                   },       
      //                   {
      //                     path: "add",
      //                     element: <AddInvoiceLayout/>,
      //                   },
      //                   {
      //                   path: "edit/:accountId",
      //                   element: <EditFinancialAccountLayout/>,
      //                   },
      //               ]
      //             },
           


                  

      //           ]
      //         },

              

              

      //       ]
      //     },
      //   ],
      // },

]);
