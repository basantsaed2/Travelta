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
import {AddFinancialAccountLayout, AddLeadLayout, AddSupplierLayout, CartLayout, CheckoutLayout, CurrentBookingLayout, CustomersLayout , EditFinancialAccountLayout, EditSupplierLayout, FinancialAccountLayout, LeadLayout, ManualBookingLayout, PastBookingLayout, PlansLayout, SupplierLayout, UpcomingBookingLayout} from "./Layouts/AllLayouts";
import { LandingPage } from "./Pages/AllPages";
import CheckOutProcessLayout from "./Layouts/AgentLayouts/CheckOutProcess/CheckOutProcessLayout";
import InComing from "./Pages/Dashboard/AgentDashboard/ComingSoon/ComingSoon";
import WalletLayOut from "./Layouts/AgentLayouts/Wallet/WalletLayOut";
import AddWallet from "./Pages/Dashboard/AgentDashboard/Wallet/AddWallet";
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
const AppWalletLayOut= () => (
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
            path: '',
            element: <AppLayoutAgent/>,
            children: [
              {
                path: '',
                element: <AgentHomePage/>,
              },

              {
                path: 'IncomingPage',
                element: <InComing/>,
              },

              {
                path: 'wallet',
                element: <WalletLayOut/>

              },

              {
                path: 'users',
                element: <UsersLayout />,
                children: [
                  {
                    path: 'customers',
                    element: <CustomersLayout />,
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
                      }
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
                ]
              },
              {
                path: 'booking_list',
                element: <BookingListLayout />,
                children: [
                  {
                    path: 'current_booking',
                    element: <CurrentBookingLayout />,
                  },
                  {
                    path: 'past_booking',
                    element: <PastBookingLayout />,
                  },
                  {
                    path: 'upcoming_booking',
                    element: <UpcomingBookingLayout />,
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
                    element: <AppWalletLayOut/>,
                    children:[
                      {
                        path: "",
                        element: <WalletLayOut/>,
                      },
                      {
                        path: "add",
                        element: <AddWallet/>,
                      },

                    ]
    
                  },
                ]
              },

              {
                path: "checkOut_process",
                element: <CheckOutProcessLayout />,
              },
            ]
          },
        ],
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

]);
