import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailLessonComponent from "../../components/DetailLesson/DetailLessonComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ders Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailLessonComponent
              lessonId={serviceDetail.data.LessonId}
              lessonName={serviceDetail.data.LessonName}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailBranch;
