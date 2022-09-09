import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailFinanceComponent from "../../components/DetailFinance/DetailFinanceComponent";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Ödeme Tipi Detay</h1>
          </MDTypography>
        </MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailFinanceComponent
              finansTypeId={serviceDetail.data.FinansTypeId}
              finansTypeName={serviceDetail.data.FinansTypeName}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailBranch;
