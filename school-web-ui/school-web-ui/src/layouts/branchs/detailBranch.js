import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailBranchComponent from "../../components/DetailBranch/DetailBranchComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Şube Detay" />
      <MDBox>
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
