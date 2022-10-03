import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailCoverComponent from "./components/DetailCoverComponent";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function DetailCover() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Veli Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <DetailCoverComponent
              coverId={serviceDetail.data.CoverId}
              coverName={serviceDetail.data.CoverName}
              coverSurname={serviceDetail.data.CoverSurname}
              coverEmail={serviceDetail.data.CoverEmail}
              coverPhoneNumber={serviceDetail.data.CoverPhoneNumber}
              coverPhoneNumber2={serviceDetail.data.CoverPhoneNumber2}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailCover;
