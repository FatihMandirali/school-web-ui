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
      <DashboardNavbar pageName="Öğretmen İzin Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailTeacherComponent
              allowTeacherId={serviceDetail.data.AllowTeacherId}
              branchId={serviceDetail.data.BranchId}
              lessonId={serviceDetail.data.LessonId}
              startClock={serviceDetail.data.Clock.split("-")[0]}
              endClock={serviceDetail.data.Clock.split("-")[1]}
              allowDay={serviceDetail.data.AllowDay}
              teacherId={serviceDetail.data.TeacherId}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateUser;
