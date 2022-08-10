import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailTeacherComponent from "./components/DetailTeacherComponent";

function CreateUser() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Öğretmen Detay</h1>
          </MDTypography>
        </MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailTeacherComponent
              branchId={serviceDetail.data.BranchId}
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
