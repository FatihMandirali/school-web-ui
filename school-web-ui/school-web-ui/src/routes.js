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
import CreateFinance from "layouts/finance/craeteFinance";
import DetailUser from "layouts/users/detailUser";
import DetailBranch from "layouts/branchs/detailBranch";
import DetailFinance from "layouts/finance/detailFinance";
import UnAuthorization from "layouts/authentication/un-authorization";
import CourseType from "layouts/coursetype";
import CreateCourseType from "layouts/coursetype/craeteCourseType";
import DetailCourseType from "layouts/coursetype/detailCourseType";
import Classes from "layouts/classes";
import CreateClasses from "layouts/classes/createClasses";
import DetailClasses from "layouts/classes/detailClasses";
import Announcement from "layouts/announcement/index";
import CreateAnnouncement from "layouts/announcement/craeteAnnouncement";
import DetailAnnouncement from "layouts/announcement/detailAnnoncement";
import Covers from "layouts/covers";
import CoverCreate from "layouts/covers/createCover";
import CoverDetail from "layouts/covers/detailCover";
import Lessons from "layouts/lessons";
import LessonsCreate from "layouts/lessons/craeteLesson";
import LessonsDetail from "layouts/lessons/detailLesson";
import StudentRecord from "layouts/students/index";
import StudentCreate from "layouts/students/createStudent";
import StudentNotRecord from "layouts/students/indexNotRecord";
import Teacher from "layouts/teacher";
import TeacherCreate from "layouts/teacher/createTeacher";
import TeacherDetail from "layouts/teacher/detailTeacher";
import PaymentDetail from "layouts/students/paymentDetail";
import LessonProgram from "layouts/classes/lessonProgram";
import RollCall from "layouts/classes/rollcall";
import Oneonone from "layouts/oneonone";
import OneononeCreate from "layouts/oneonone/createOneOnOne";
// @mui icons
import Icon from "@mui/material/Icon";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CampaignIcon from "@mui/icons-material/Campaign";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import EditOffIcon from "@mui/icons-material/EditOff";
import FaceIcon from "@mui/icons-material/Face";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

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
    name: "Yönetici İşlemleri",
    key: "users",
    icon: <GroupIcon />,
    route: "/users",
    component: <Users />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "student_paymentdetail",
    icon: <GroupIcon />,
    route: "/student_paymentdetail/:id",
    component: <PaymentDetail />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "lesson_program",
    icon: <GroupIcon />,
    route: "/lesson_program/:id",
    component: <LessonProgram />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Yoklama",
    key: "lesson_program",
    icon: <GroupIcon />,
    route: "/roll_call/:id",
    component: <RollCall />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Veli İşlemleri",
    key: "covers",
    icon: <EscalatorWarningIcon />,
    route: "/covers",
    component: <Covers />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teacher",
    icon: <FaceIcon />,
    route: "/teacher",
    component: <Teacher />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teachercreate",
    icon: <FaceIcon />,
    route: "/teacher_create",
    component: <TeacherCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teacherdetail",
    icon: <FaceIcon />,
    route: "/teacher_detail/:id",
    component: <TeacherDetail />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kayıtlı Öğrenci İşlemleri",
    key: "student_records",
    icon: <SchoolIcon />,
    route: "/student_records",
    component: <StudentRecord />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Kayıtsız Öğrenci İşlemleri",
    key: "student_notrecords",
    icon: <EditOffIcon />,
    route: "/student_notrecords",
    component: <StudentNotRecord />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Kayıtlı Öğrenci İşlemleri",
    key: "student_create",
    icon: <SchoolIcon />,
    route: "/student_create",
    component: <StudentCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Veli Oluştur",
    key: "covercreate",
    icon: <EscalatorWarningIcon />,
    route: "/cover_create",
    component: <CoverCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Veli Detay",
    key: "coverdetail",
    icon: <EscalatorWarningIcon />,
    route: "/cover_detail/:id",
    component: <CoverDetail />,
    role: "admin1",
    isActive: false,
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
    name: "Duyuru İşlemleri",
    key: "announcements",
    icon: <CampaignIcon />,
    route: "/announcements",
    component: <Announcement />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessons",
    icon: <AutoStoriesIcon />,
    route: "/lessons",
    component: <Lessons />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessonscreate",
    icon: <AutoStoriesIcon />,
    route: "/lesson_create",
    component: <LessonsCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessonsdetail",
    icon: <AutoStoriesIcon />,
    route: "/lesson_detail/:id",
    component: <LessonsDetail />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Duyuru Oluştur",
    key: "announcementscreate",
    icon: <CampaignIcon />,
    route: "/announcement_create",
    component: <CreateAnnouncement />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Duyuru Güncelle",
    key: "announcementsdetail",
    icon: <CampaignIcon />,
    route: "/announcement_detail/:id",
    component: <DetailAnnouncement />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs İşlemleri",
    key: "courseType",
    icon: <LocalLibraryIcon />,
    route: "/courseTypes",
    component: <CourseType />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Sınıf İşlemleri",
    key: "classes",
    icon: <TableRestaurantIcon />,
    route: "/classes",
    component: <Classes />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Bire bir ders",
    key: "classes",
    icon: <AccountTreeIcon />,
    route: "/oneonone",
    component: <Oneonone />,
    role: "admin1",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Bire bir ders",
    key: "classes",
    icon: <AccountTreeIcon />,
    route: "/oneonone_create",
    component: <OneononeCreate />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sınıf Oluştur",
    key: "classescreate",
    icon: <TableRestaurantIcon />,
    route: "/classes_create",
    component: <CreateClasses />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sınıf Detay",
    key: "classesdetail",
    icon: <TableRestaurantIcon />,
    route: "/classes_detail/:id",
    component: <DetailClasses />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs Türü Oluştur",
    key: "coursetypecreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/courseType_create",
    component: <CreateCourseType />,
    role: "admin1",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs Türü Güncelle",
    key: "coursetypeupdate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/courseType_detail/:id",
    component: <DetailCourseType />,
    role: "admin1",
    isActive: false,
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
    name: "Yetersiz Yetki",
    key: "un-authorization",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/unauthorization",
    component: <UnAuthorization />,
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
