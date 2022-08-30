import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailCourseTypeComponent from "../../components/DetailCourseType/DetailCourseTypeComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Kurs Tipi Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailCourseTypeComponent
              courseId={serviceDetail.data.CourseId}
              courseName={serviceDetail.data.CourseName}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailBranch;
