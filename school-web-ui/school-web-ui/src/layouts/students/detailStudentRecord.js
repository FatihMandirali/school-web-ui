import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DetailUserComponent from "../../components/DetailUser/DetailUserComponent";

function CreateUser() {
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
            <DetailUserComponent
              adminName={serviceDetail.data.AdminName}
              adminRole={serviceDetail.data.AdminRole}
              adminSurname={serviceDetail.data.AdminSurname}
              branchId={serviceDetail.data.BranchId}
              username={serviceDetail.data.username}
              isActive={serviceDetail.data.IsActive}
              adminId={serviceDetail.data.AdminId}
              tc={serviceDetail.data.AdminTcOrPasaportNo}
              password={serviceDetail.data.PASSWORD}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateUser;
