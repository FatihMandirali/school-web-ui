import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailBranchComponent from "../../components/DetailBranch/DetailBranchComponent";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Şube Detay</h1>
          </MDTypography>
        </MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailBranchComponent
              branchId={serviceDetail.data.BranchId}
              branchName={serviceDetail.data.BranchName}
              isActive={serviceDetail.data.IsActive}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailBranch;
