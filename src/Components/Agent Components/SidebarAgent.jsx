import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  styled,
  useTheme,
} from "@mui/material";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaUsers as PeopleIcon } from "react-icons/fa";
import { MdFlightTakeoff as FlightIcon } from "react-icons/md";
import { RiCheckDoubleLine as CheckIcon } from "react-icons/ri";
import { FaCreditCard as CreditCardIcon } from "react-icons/fa";
import { FaCode as CodeIcon } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";
import { FaBriefcase as BusinessIcon } from "react-icons/fa";
import { FaDatabase as StorageIcon } from "react-icons/fa";
import { FaCog as SettingsIcon } from "react-icons/fa";
import { FaUserCog as PersonIcon } from "react-icons/fa";
import { IoIosArrowUp as ExpandLess } from "react-icons/io";
import { IoIosArrowDown as ExpandMore } from "react-icons/io";
import Logo from "../../Assets/Images/Logo";

const drawerWidth = 240;

const CustomScrollbarContainer = styled('div')({
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  backgroundColor: "#0D47A1",
}));

const SidebarAgent = ({
  isSidebarCollapsed,
  onToggleSidebar,
  isSidebarVisible,
  onLinkClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [openMainMenu, setOpenMainMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Sync menu states with current path
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/dashboard_agent/users")) {
      setOpenMainMenu("users");
    }
    else if (path.startsWith("/dashboard_agent/booking/manual_booking") ||
      path.startsWith("/dashboard_agent/booking/booking_engine")) {
      setOpenMainMenu("booking");
    }
    else if (path.startsWith("/dashboard_agent/booking_list")) {
      setOpenMainMenu("bookingList");
    }
    else if (path.startsWith("/dashboard_agent/requests")) {
      setOpenMainMenu("requests");
    }
    else if (path.startsWith("/dashboard_agent/inventory")) {
      setOpenMainMenu("inventory");
    }
    else if (path.startsWith("/dashboard_agent/accounting")) {
      setOpenMainMenu("accounting");
    }
    else if (path.startsWith("/dashboard_agent/hrm")) {
      setOpenMainMenu("hrm");
    }
    else if (path.startsWith("/dashboard_agent/setting")) {
      setOpenMainMenu("settings");
    }
  }, [location.pathname]);

  const handleToggle = (menu, isSubMenu = false, parentMenu = null) => {
    if (isSubMenu) {
      setOpenSubMenu(openSubMenu === menu ? null : menu);
      setOpenMainMenu(parentMenu);
    } else {
      setOpenMainMenu(openMainMenu === menu ? null : menu);
      if (menu !== "accounting") {
        setOpenSubMenu(null);
      }
    }

    if (!isSubMenu && openMainMenu !== menu) {
      switch (menu) {
        case "users":
          navigate("/dashboard_agent/users/leads");
          break;
        case "booking":
          navigate("/dashboard_agent/booking/manual_booking");
          break;
        case "bookingList":
          navigate("/dashboard_agent/booking_list/upcoming_booking");
          break;
        case "requests":
          navigate("/dashboard_agent/requests");
          break;
        case "inventory":
          navigate("/dashboard_agent/inventory/tour/list");
          break;
        case "accounting":
          navigate("/dashboard_agent/accounting/ledger");
          break;
        case "hrm":
          navigate("/dashboard_agent/hrm/department");
          break;
        case "settings":
          navigate("/dashboard_agent/setting/financial_account");
          break;
        case "subscription":
          navigate("/dashboard_agent/subscriptions");
          break;
        default:
          break;
      }
    }
    onLinkClick();
  };

  const isActive = (path, exact = false) => {
    if (path === "/dashboard_agent") {
      return location.pathname === path;
    }

    // Special handling for request paths
    if (path.startsWith("/dashboard_agent/requests")) {
      if (exact) {
        return location.pathname === path;
      }
      // Match specific request paths exactly
      if (path === "/dashboard_agent/requests/add_request" ||
        path === "/dashboard_agent/requests/work_station") {
        return location.pathname === path;
      }
      // For the main requests path, match it and its direct children
      return location.pathname === "/dashboard_agent/requests" ||
        location.pathname.startsWith("/dashboard_agent/requests/");
    }

    // Default behavior for other paths
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };


  const renderNestedItem = (text, path, icon, nested = false, exact = false) => (
    <ListItem
      key={path}
      disablePadding
      sx={{
        pl: nested ? 4 : 0,
      }}
    >
      <ListItemButton
        selected={isActive(path, exact)}
        onClick={() => {
          navigate(path);
          onLinkClick();
        }}
        sx={{
          color: '#fff',
          borderRadius: '8px',
          padding: '8px',
          margin: '4px 8px',
          justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          minHeight: '40px',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#0D47A1',
            '& .MuiListItemIcon-root': {
              color: '#0D47A1',
            },
          },
          '&.Mui-selected': {
            backgroundColor: '#fff',
            color: '#0D47A1',
            '& .MuiListItemIcon-root': {
              color: '#0D47A1',
            },
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#fff',
            color: '#0D47A1',
          },
        }}
      >
        <ListItemIcon sx={{
          minWidth: 'auto',
          marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {React.cloneElement(icon, { size: 18 })}
        </ListItemIcon>
        {!isSidebarCollapsed && <ListItemText primary={text} />}
      </ListItemButton>
    </ListItem>
  );

  const renderExpandableItem = (text, path, menuKey, subItems, parentMenu) => (
    <React.Fragment key={path}>
      <ListItem disablePadding sx={{ pl: 4 }}>
        <ListItemButton
          selected={isActive(path)}
          onClick={() => handleToggle(menuKey, true, parentMenu)}
          sx={{
            color: '#fff',
            borderRadius: '8px',
            padding: '8px',
            margin: '4px 8px',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
            minHeight: '40px',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#0D47A1',
              '& .MuiListItemIcon-root': {
                color: '#0D47A1',
              },
            },
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#0D47A1',
              '& .MuiListItemIcon-root': {
                color: '#0D47A1',
              },
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#fff',
              color: '#0D47A1',
            },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{
              minWidth: 'auto',
              marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
              color: 'inherit',
            }}>
              <span style={{ fontSize: '18px' }}>•</span>
            </ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary={text} />}
          </div>
          {!isSidebarCollapsed && (
            openSubMenu === menuKey ? <ExpandLess size={18} /> : <ExpandMore size={18} />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={openSubMenu === menuKey && !isSidebarCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((item) => renderNestedItem(item.text, item.path, <span style={{ fontSize: '18px' }}>•</span>, true))}
        </List>
      </Collapse>
    </React.Fragment>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSidebarCollapsed ? theme.spacing(7) : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarCollapsed ? theme.spacing(7) : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0D47A1",
          color: '#fff',
          borderRight: 'none',
        },
        display: { xs: isSidebarVisible ? "block" : "none", lg: "block" },
      }}
    >
      <DrawerHeader>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: '100%',
          padding: isSidebarCollapsed ? '0 8px' : '8px 16px',
        }}>
          <Logo />
          {!isSidebarCollapsed && (
            <span style={{
              fontWeight: "bold",
              fontSize: '1.1rem',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}>
              Travelta
            </span>
          )}
        </div>
      </DrawerHeader>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      <CustomScrollbarContainer>
        <List>
          {/* Home */}
          {renderNestedItem("Home", "/dashboard_agent", <HomeIcon />, false, true)}

          {/* Users */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/users")}
              onClick={() => handleToggle("users")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <PeopleIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Users" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "users" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "users" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Leads", "/dashboard_agent/users/leads", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Customers", "/dashboard_agent/users/customers", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Suppliers", "/dashboard_agent/users/suppliers", <span style={{ fontSize: '18px' }}>•</span>, true)}
            </List>
          </Collapse>

          {/* Booking */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/booking")}
              onClick={() => handleToggle("booking")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <FlightIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="New Booking" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "booking" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "booking" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Manual Booking", "/dashboard_agent/booking/manual_booking", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Booking Engine", "/dashboard_agent/booking/booking_engine", <span style={{ fontSize: '18px' }}>•</span>, true)}
            </List>
          </Collapse>

          {/* Booking List */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/booking_list")}
              onClick={() => handleToggle("bookingList")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <CheckIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Booking List" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "bookingList" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "bookingList" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Upcoming", "/dashboard_agent/booking_list/upcoming_booking", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Current", "/dashboard_agent/booking_list/current_booking", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Past", "/dashboard_agent/booking_list/past_booking", <span style={{ fontSize: '18px' }}>•</span>, true)}
            </List>
          </Collapse>

          {/* Booking Payment */}
          {renderNestedItem("Booking Payment", "/dashboard_agent/booking_payments", <CreditCardIcon />, false)}

          {/* Subscription */}
          {renderNestedItem("Subscriptions", "/dashboard_agent/subscriptions", <FaFileArchive />, false)}

          {/* Requests */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/requests")}
              onClick={() => handleToggle("requests")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <CodeIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Requests" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "requests" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "requests" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem(
                "Request List",
                "/dashboard_agent/requests",
                <span style={{ fontSize: '18px' }}>•</span>,
                true,
                true // exact match
              )}
              {renderNestedItem(
                "New Request",
                "/dashboard_agent/requests/add_request",
                <span style={{ fontSize: '18px' }}>•</span>,
                true,
                true // exact match
              )}
              {renderNestedItem(
                "Work Station",
                "/dashboard_agent/requests/work_station",
                <span style={{ fontSize: '18px' }}>•</span>,
                true,
                true // exact match
              )}
            </List>
          </Collapse>

          {/* Inventory */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/inventory")}
              onClick={() => handleToggle("inventory")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <BusinessIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Inventory" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "inventory" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "inventory" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Tour", "/dashboard_agent/inventory/tour/list", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderExpandableItem("Room", "/dashboard_agent/inventory/room/list", "room", [
                { text: "Room List", path: "/dashboard_agent/inventory/room/list" },
                { text: "Room Setting", path: "/dashboard_agent/inventory/room/setting_room" },
              ], "inventory")}
            </List>
          </Collapse>

          {/* Accounting */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/accounting")}
              onClick={() => handleToggle("accounting")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <StorageIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Accounting" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "accounting" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "accounting" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("General Ledger", "/dashboard_agent/accounting/ledger", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Payment Receivable", "/dashboard_agent/accounting/payment_receivable", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderExpandableItem("Owner", "/dashboard_agent/accounting/owner_transaction/owner", "owner", [
                { text: "Owner List", path: "/dashboard_agent/accounting/owner_transaction/owner" },
                { text: "Transactions", path: "/dashboard_agent/accounting/owner_transaction/transaction" },
              ], "accounting")}
              {renderExpandableItem("Payable", "/dashboard_agent/accounting/payable_to_supplier/payable_supplier", "payable", [
                { text: "Payable to Supplier", path: "/dashboard_agent/accounting/payable_to_supplier/payable_supplier" },
                { text: "Paid Supplier", path: "/dashboard_agent/accounting/payable_to_supplier/paid_supplier" },
                { text: "Overdue", path: "/dashboard_agent/accounting/payable_to_supplier/over_due" },
              ], "accounting")}
              {renderExpandableItem("Revenue", "/dashboard_agent/accounting/revenue/list_revenue", "revenue", [
                { text: "Revenue List", path: "/dashboard_agent/accounting/revenue/list_revenue" },
                { text: "Revenue Category", path: "/dashboard_agent/accounting/revenue/category_revenue" },
              ], "accounting")}
              {renderExpandableItem("Expenses", "/dashboard_agent/accounting/expenses/list_expenses", "expenses", [
                { text: "Expenses List", path: "/dashboard_agent/accounting/expenses/list_expenses" },
                { text: "Expenses Category", path: "/dashboard_agent/accounting/expenses/category_expenses" },
              ], "accounting")}
            </List>
          </Collapse>

          {/* HRM */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/hrm")}
              onClick={() => handleToggle("hrm")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <PersonIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="HRM" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "hrm" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "hrm" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Department", "/dashboard_agent/hrm/department", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Agent", "/dashboard_agent/hrm/agent", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Employee", "/dashboard_agent/hrm/employee", <span style={{ fontSize: '18px' }}>•</span>, true)}
            </List>
          </Collapse>

          {/* Settings */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive("/dashboard_agent/setting")}
              onClick={() => handleToggle("settings")}
              sx={{
                color: '#fff',
                borderRadius: '8px',
                padding: '8px',
                margin: '4px 8px',
                justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                minHeight: '40px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                  '& .MuiListItemIcon-root': {
                    color: '#0D47A1',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#fff',
                  color: '#0D47A1',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  marginRight: isSidebarCollapsed ? 0 : theme.spacing(2),
                  color: 'inherit',
                }}>
                  <SettingsIcon size={18} />
                </ListItemIcon>
                {!isSidebarCollapsed && <ListItemText primary="Settings" />}
              </div>
              {!isSidebarCollapsed && (
                openMainMenu === "settings" ? <ExpandLess size={18} /> : <ExpandMore size={18} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMainMenu === "settings" && !isSidebarCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNestedItem("Financial Account", "/dashboard_agent/setting/financial_account", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Roles", "/dashboard_agent/setting/roles", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Admin Account", "/dashboard_agent/setting/admin_account", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Wallet", "/dashboard_agent/setting/wallet", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Currency", "/dashboard_agent/setting/currency", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Tax", "/dashboard_agent/setting/tax", <span style={{ fontSize: '18px' }}>•</span>, true)}
              {renderNestedItem("Group", "/dashboard_agent/setting/group", <span style={{ fontSize: '18px' }}>•</span>, true)}
            </List>
          </Collapse>
        </List>
      </CustomScrollbarContainer>
    </Drawer>
  );
};

export default SidebarAgent;