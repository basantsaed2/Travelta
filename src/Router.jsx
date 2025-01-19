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
import {AddFinancialAccountLayout, AddLeadLayout, AddRoomAmenityLayout, AddRoomExtraLayout, AddRoomLayout, AddRoomTypeLayout, AddSupplierLayout, AddWalletLayout, CartLayout, CheckoutLayout, CurrentBookingLayout, CustomersLayout , EditFinancialAccountLayout, EditRoomAmenityLayout, EditRoomExtraLayout, EditRoomTypeLayout, EditSupplierLayout, FinancialAccountLayout, LeadLayout, ManualBookingLayout, PastBookingLayout, PlansLayout, RoomExtraLayout, RoomTypeLayout, SupplierLayout, UpcomingBookingLayout, WalletLayout} from "./Layouts/AllLayouts";
import { LandingPage } from "./Pages/AllPages";
import CheckOutProcessLayout from "./Layouts/AgentLayouts/CheckOutProcess/CheckOutProcessLayout";
import InComing from "./Pages/Dashboard/AgentDashboard/ComingSoon/ComingSoon";

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
const AppWalletLayout= () => (
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
const AppRoomType= () => (
  <>
  <Outlet />
  </>
);
const AppRoomExtra= () => (
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

              // {
              //   path: 'wallet',
              //   element: <WalletLayout/>

              // },

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
                        path:"add",
                        element:<AddRoomLayout/>
                      }
                    ]
                  }
                ]

              }
            ]
          },
        ],
      },

]);
