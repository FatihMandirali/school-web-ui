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
import Users from "layouts/users";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
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
import StudentDetail from "layouts/students/detailStudentRecord";
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
import CoverStudents from "layouts/covermenu/coverstudents";
import CoverPayments from "layouts/covermenu/coverpayments";
import CoverNotJoin from "layouts/covermenu/covernotjoin";
import CoverAnnouncement from "layouts/covermenu/coverannouncement";
import TeacherAnnouncement from "layouts/teachermenu/teacherannouncement";
import TeacherOneOnOne from "layouts/teachermenu/teacheroneonone";
import TeacherLessonProgram from "layouts/teachermenu/teacherLessonProgram";
import StudentAnnouncement from "layouts/studentsmenu/studentannouncement";
import StudentPayment from "layouts/studentsmenu/studentpayments";
import StudentOneOnOne from "layouts/studentsmenu/studentoneonone";
import StudentLessonProgram from "layouts/studentsmenu/studentLessonProgram";
import FaceStudent from "layouts/faceStudent";
import FaceStudentCreate from "layouts/faceStudent/craeteFaceStudent";
import FaceStudentDetail from "layouts/faceStudent/detailFaceStudent";
import Sms from "layouts/sms";
import TeacherAllow from "layouts/teacherAllow";
import TeacherAllowCreate from "layouts/teacherAllow/createTeacherAllow";
import TeacherAllowDetail from "layouts/teacherAllow/detailTeacherAllow";
import Homework from "layouts/homework";
import TeacherHomework from "layouts/teachermenu/teacherHomework";
import TeacherHomeworkCreate from "layouts/teachermenu/teacherHomework/craeteTeacherHomework";
import TeacherHomeworkDetail from "layouts/teachermenu/teacherHomework/detail";
import CoverPaymentDetail from "layouts/covermenu/coverpayments/paymentDetail";
import CoverHomework from "layouts/covermenu/coverstudents/coverHomework";
import CoverHomeworkDetail from "layouts/covermenu/coverstudents/detailHomework";
import StudentMenuHomework from "layouts/studentsmenu/studenthomework";
import StudentMenuHomeworkDetail from "layouts/studentsmenu/studenthomework/detail";
import HomeworkDetail from "layouts/homework/detail";
import Exams from "layouts/exam";
import TeacherRollCall from "layouts/teachermenu/teacherRollCall";
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
import PaymentIcon from "@mui/icons-material/Payment";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SmsIcon from "@mui/icons-material/Sms";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import QuizIcon from "@mui/icons-material/Quiz";

const routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    role: "SignIn",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Yönetici İşlemleri",
    key: "users",
    icon: <GroupIcon />,
    route: "/users",
    component: <Users />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Duyurular",
    key: "studentAnnouncement",
    icon: <CampaignIcon />,
    route: "/studentAnnouncement",
    component: <StudentAnnouncement />,
    role: "Student",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödeme Planı",
    key: "studentPaymentPlan",
    icon: <PaymentIcon />,
    route: "/studentPaymentPlan",
    component: <StudentPayment />,
    role: "Student",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Birebir dersler",
    key: "studentOneOnOne",
    icon: <SupervisorAccountIcon />,
    route: "/studentOneOnOne",
    component: <StudentOneOnOne />,
    role: "Student",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ders Programı",
    key: "studentLessonProgram",
    icon: <HistoryEduIcon />,
    route: "/studentLessonProgram",
    component: <StudentLessonProgram />,
    role: "Student",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "studentmenuhomework",
    icon: <HomeWorkIcon />,
    route: "/studentmenuhomework",
    component: <StudentMenuHomework />,
    role: "Student",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "studentmenuhomework",
    icon: <HomeWorkIcon />,
    route: "/studentmenuhomework_detail/:id",
    component: <StudentMenuHomeworkDetail />,
    role: "Student",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Duyurular",
    key: "teacherAnnouncement",
    icon: <CampaignIcon />,
    route: "/teacherAnnouncement",
    component: <TeacherAnnouncement />,
    role: "Teacher",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Bire Bir Dersler",
    key: "teacherOneOnOne",
    icon: <SupervisorAccountIcon />,
    route: "/teacherOneOnOne",
    component: <TeacherOneOnOne />,
    role: "Teacher",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "teacherHomework",
    icon: <HomeWorkIcon />,
    route: "/teacherHomework",
    component: <TeacherHomework />,
    role: "Teacher",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "teacherHomework_create",
    icon: <HomeWorkIcon />,
    route: "/teacherHomework_create",
    component: <TeacherHomeworkCreate />,
    role: "Teacher",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "teacherHomework_detail",
    icon: <HomeWorkIcon />,
    route: "/teacherHomework_detail/:id",
    component: <TeacherHomeworkDetail />,
    role: "Teacher",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ders Programı",
    key: "teacherLessonProgram",
    icon: <HistoryEduIcon />,
    route: "/teacherLessonProgram",
    component: <TeacherLessonProgram />,
    role: "Teacher",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Duyurular",
    key: "announcements",
    icon: <CampaignIcon />,
    route: "/coverAnnouncement",
    component: <CoverAnnouncement />,
    role: "Cover",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğrenciler",
    key: "coverStudents",
    icon: <EscalatorWarningIcon />,
    route: "/coverStudents",
    component: <CoverStudents />,
    role: "Cover",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödeme Planı",
    key: "coverPayments",
    icon: <PaymentIcon />,
    route: "/coverPayments",
    component: <CoverPayments />,
    role: "Cover",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Devamsızlıklar",
    key: "coverNotJoin",
    icon: <RemoveDoneIcon />,
    route: "/coverNotJoin",
    component: <CoverNotJoin />,
    role: "Cover",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "coverstudent_paymentdetail",
    icon: <GroupIcon />,
    route: "/coverstudent_paymentdetail/:id",
    component: <CoverPaymentDetail />,
    role: "Cover",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "coverstudent_homeworks",
    icon: <GroupIcon />,
    route: "/coverstudent_homeworks/:classId/student/:studentId",
    component: <CoverHomework />,
    role: "Cover",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "coverstudent_homeworks_detail",
    icon: <GroupIcon />,
    route: "/coverstudent_homeworks_detail/:id",
    component: <CoverHomeworkDetail />,
    role: "Cover",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "student_paymentdetail",
    icon: <GroupIcon />,
    route: "/student_paymentdetail/:id",
    component: <PaymentDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğrenci Ödeme İşlemleri",
    key: "lesson_program",
    icon: <GroupIcon />,
    route: "/lesson_program/:id",
    component: <LessonProgram />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Yoklama",
    key: "lesson_program",
    icon: <GroupIcon />,
    route: "/roll_call/:id",
    component: <RollCall />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Yoklama",
    key: "roll_call_teacher",
    icon: <GroupIcon />,
    route: "/roll_call",
    component: <TeacherRollCall />,
    role: "Teacher",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Veli İşlemleri",
    key: "covers",
    icon: <EscalatorWarningIcon />,
    route: "/covers",
    component: <Covers />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teacher",
    icon: <FaceIcon />,
    route: "/teacher",
    component: <Teacher />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teachercreate",
    icon: <FaceIcon />,
    route: "/teacher_create",
    component: <TeacherCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "teacherdetail",
    icon: <FaceIcon />,
    route: "/teacher_detail/:id",
    component: <TeacherDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğretmen İşlemleri",
    key: "student_detail",
    icon: <FaceIcon />,
    route: "/student_detail/:id",
    component: <StudentDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kayıtlı Öğrenciler",
    key: "student_records",
    icon: <SchoolIcon />,
    route: "/student_records",
    component: <StudentRecord />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Kayıtsız Öğrenciler",
    key: "student_notrecords",
    icon: <EditOffIcon />,
    route: "/student_notrecords",
    component: <StudentNotRecord />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Kayıtlı Öğrenci İşlemleri",
    key: "student_create",
    icon: <SchoolIcon />,
    route: "/student_create",
    component: <StudentCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Veli Oluştur",
    key: "covercreate",
    icon: <EscalatorWarningIcon />,
    route: "/cover_create",
    component: <CoverCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Veli Detay",
    key: "coverdetail",
    icon: <EscalatorWarningIcon />,
    route: "/cover_detail/:id",
    component: <CoverDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Şube İşlemleri",
    key: "branchs",
    icon: <ApartmentIcon />,
    route: "/branchs",
    component: <Branchs />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Duyuru İşlemleri",
    key: "announcements",
    icon: <CampaignIcon />,
    route: "/announcements",
    component: <Announcement />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessons",
    icon: <AutoStoriesIcon />,
    route: "/lessons",
    component: <Lessons />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessonscreate",
    icon: <AutoStoriesIcon />,
    route: "/lesson_create",
    component: <LessonsCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ders İşlemleri",
    key: "lessonsdetail",
    icon: <AutoStoriesIcon />,
    route: "/lesson_detail/:id",
    component: <LessonsDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Duyuru Oluştur",
    key: "announcementscreate",
    icon: <CampaignIcon />,
    route: "/announcement_create",
    component: <CreateAnnouncement />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Duyuru Güncelle",
    key: "announcementsdetail",
    icon: <CampaignIcon />,
    route: "/announcement_detail/:id",
    component: <DetailAnnouncement />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs İşlemleri",
    key: "courseTypes",
    icon: <LocalLibraryIcon />,
    route: "/courseTypes",
    component: <CourseType />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Sınıf İşlemleri",
    key: "classes",
    icon: <TableRestaurantIcon />,
    route: "/classes",
    component: <Classes />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Bire bir ders",
    key: "oneonone",
    icon: <AccountTreeIcon />,
    route: "/oneonone",
    component: <Oneonone />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Bire bir ders",
    key: "classes",
    icon: <AccountTreeIcon />,
    route: "/oneonone_create",
    component: <OneononeCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sınıf Oluştur",
    key: "classescreate",
    icon: <TableRestaurantIcon />,
    route: "/classes_create",
    component: <CreateClasses />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sınıf Detay",
    key: "classesdetail",
    icon: <TableRestaurantIcon />,
    route: "/classes_detail/:id",
    component: <DetailClasses />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs Türü Oluştur",
    key: "coursetypecreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/courseType_create",
    component: <CreateCourseType />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kurs Türü Güncelle",
    key: "coursetypeupdate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/courseType_detail/:id",
    component: <DetailCourseType />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ödeme İşlemi Oluştur",
    key: "financecreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/finance_create",
    component: <CreateFinance />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Şube Oluştur",
    key: "branchscreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/branch_create",
    component: <BranchsCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kullanıcı Oluştur",
    key: "usercreate",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user_create",
    component: <CreateUser />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Kullanıcı Detay",
    key: "userdetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user_detail/:id",
    component: <DetailUser />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Yetersiz Yetki",
    key: "un-authorization",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/unauthorization",
    component: <UnAuthorization />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Finans Detay",
    key: "financedetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/finance_detail/:id",
    component: <DetailFinance />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Şube Detay",
    key: "branchdetail",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/branch_detail/:id",
    component: <DetailBranch />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Birebir Öğrenciler",
    key: "faceStudent",
    icon: <SupervisorAccountIcon />,
    route: "/faceStudent",
    component: <FaceStudent />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Birebir Öğrenciler",
    key: "faceStudent_create",
    icon: <SupervisorAccountIcon />,
    route: "/faceStudent_create",
    component: <FaceStudentCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Birebir Öğrenciler",
    key: "faceStudent_detail",
    icon: <SupervisorAccountIcon />,
    route: "/faceStudent_detail/:id",
    component: <FaceStudentDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sms İşlemleri",
    key: "sms",
    icon: <SmsIcon />,
    route: "/sms",
    component: <Sms />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İzinleri",
    key: "teacher_allow",
    icon: <AirlineSeatIndividualSuiteIcon />,
    route: "/teacher_allow",
    component: <TeacherAllow />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Öğretmen İzinleri",
    key: "teacher_allow",
    icon: <AirlineSeatIndividualSuiteIcon />,
    route: "/teacher_allow_create",
    component: <TeacherAllowCreate />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Öğretmen İzinleri",
    key: "teacher_allow",
    icon: <AirlineSeatIndividualSuiteIcon />,
    route: "/teacher_allow_detail/:id",
    component: <TeacherAllowDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "homework",
    icon: <HomeWorkIcon />,
    route: "/homework",
    component: <Homework />,
    role: "Admin",
    isActive: true,
  },
  {
    type: "collapse",
    name: "Ödevler",
    key: "homework",
    icon: <HomeWorkIcon />,
    route: "/homework_detail/:id",
    component: <HomeworkDetail />,
    role: "Admin",
    isActive: false,
  },
  {
    type: "collapse",
    name: "Sınav İşlemleri",
    key: "exams",
    icon: <QuizIcon />,
    route: "/exams",
    component: <Exams />,
    role: "Admin",
    isActive: true,
  },
];

export default routes;
