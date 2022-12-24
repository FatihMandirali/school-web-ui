import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import UniversityDetailComponent from "./component/UniversityDetailComponent";
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
            <UniversityDetailComponent
              announcementId={serviceDetail.data.AnnouncementId}
              announcementText={serviceDetail.data.AnnouncementText}
              announcementTitle={serviceDetail.data.AnnouncementTitle}
              createDate={serviceDetail.data.CreateDate}
              relaseDate={serviceDetail.data.RelaseDate}
              endDate={serviceDetail.data.EndDate}
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
