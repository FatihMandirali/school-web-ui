import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailTeacherComponent from "./components/DetailTeacherComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateUser() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğretmen Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailTeacherComponent
              branchId={serviceDetail.data.BranchId}
              isBusy={serviceDetail.data.IsBusy}
              classId={serviceDetail.data.ClassId}
              emailAdress={serviceDetail.data.EmailAdress}
              lessonId={serviceDetail.data.LessonId}
              teacherName={serviceDetail.data.TeacherName}
              teacherSurname={serviceDetail.data.TeacherSurname}
              teacherPhone={serviceDetail.data.TeacherPhone}
              tcOrPasaportNo={serviceDetail.data.TcOrPasaportNo}
              adminName={serviceDetail.data.AdminName}
              adminSurname={serviceDetail.data.AdminSurname}
              teacherId={serviceDetail.data.TeacherId}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateUser;
