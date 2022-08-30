import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailClassesComponent from "./components/DetailClassesComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailClasses() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Sınıf Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailClassesComponent
              classId={serviceDetail.data.ClassId}
              branchId={serviceDetail.data.BranchId}
              teacherId={serviceDetail.data.TeacherId}
              courseType={serviceDetail.data.CourseType}
              className={serviceDetail.data.ClassName}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailClasses;
