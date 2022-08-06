import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailCoverComponent from "./components/DetailCoverComponent";

function DetailCover() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Veli Detay</h1>
          </MDTypography>
        </MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailCoverComponent
              coverId={serviceDetail.data.CoverId}
              coverName={serviceDetail.data.CoverName}
              coverSurname={serviceDetail.data.CoverSurname}
              coverEmail={serviceDetail.data.CoverEmail}
              coverPhoneNumber={serviceDetail.data.CoverPhoneNumber}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailCover;
