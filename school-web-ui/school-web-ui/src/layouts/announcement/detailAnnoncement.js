import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import AnnouncementDetailComponent from "./component/AnnouncementDetailComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Duyuru Detay" />
      <MDBox>
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
