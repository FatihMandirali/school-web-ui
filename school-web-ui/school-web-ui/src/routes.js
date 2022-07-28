/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CreateUser from "layouts/users/createUser";
import Branchs from "layouts/branchs";
import BranchsCreate from "layouts/branchs/createBranch";
import Finance from "layouts/finance";
import CreateFinance from "layouts/finance/craeteFinance";
import DetailUser from "layouts/users/detailUser";
import DetailBranch from "layouts/branchs/detailBranch";
import DetailFinance from "layouts/finance/detailFinance";

// @mui icons
import Icon from "@mui/material/Icon";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentIcon from "@mui/icons-material/Payment";

const routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    role: "admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    role: "admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kullanıcı İşlemleri",
    key: "users",
    icon: <GroupIcon />,
    route: "/users",
    component: <Users />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Şube İşlemleri",
    key: "branchs",
    icon: <ApartmentIcon />,
    route: "/branchs",
    component: <Branchs />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödeme İşlemleri",
    key: "finances",
    icon: <PaymentIcon />,
    route: "/finances",
    component: <Finance />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödeme İşlemi Oluştur",
    key: "financecreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/finance_create",
    component: <CreateFinance />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Şube Oluştur",
    key: "branchscreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/branch_create",
    component: <BranchsCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kullanıcı Oluştur",
    key: "usercreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user_create",
    component: <CreateUser />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kullanıcı Detay",
    key: "userdetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user_detail/:id",
    component: <DetailUser />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Finans Detay",
    key: "financedetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/finance_detail/:id",
    component: <DetailFinance />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Şube Detay",
    key: "branchdetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/branch_detail/:id",
    component: <DetailBranch />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    role: "admin11",
    isActive: false,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
    role: "admin111",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    role: "admin11111",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    role: "admin1121",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    role: "admin1",
    isActive: false,
  },
];

export default routes;
