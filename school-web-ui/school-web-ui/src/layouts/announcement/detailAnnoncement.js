import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import AnnouncementDetailComponent from "./component/AnnouncementDetailComponent";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Duyuru Detay</h1>
          </MDTypography>
        </MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <AnnouncementDetailComponent
              announcementId={serviceDetail.data.AnnouncementId}
              announcementText={serviceDetail.data.AnnouncementText}
              announcementTitle={serviceDetail.data.AnnouncementTitle}
              createDate={serviceDetail.data.CreateDate}
              locationId={serviceDetail.data.LocationId}
              adminName={serviceDetail.data.AdminName}
              adminSurname={serviceDetail.data.AdminSurname}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailBranch;
