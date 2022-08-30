import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailClassesComponent from "./components/DetailClassesComponent";

function DetailClasses() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Kullanıcı Detay</h1>
          </MDTypography>
        </MDBox>
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
