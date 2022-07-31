/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function Basic() {
  const goToHomePage = () => {
    window.location.href = "/dashboard";
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <Alert severity="warning">Üzgünüm, Bu sayfa için yetkiniz yetersiz.</Alert>
          <Button onClick={goToHomePage} color="secondary">
            Anasayfa
          </Button>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
