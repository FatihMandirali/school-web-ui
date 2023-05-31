/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import httpservice from "../../httpservice/httpservice";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";



function Home() {
    const [data, setData] = useState([])
    const getData = async () => {
      try {
        const res = await httpservice.get(`MainPage/List`);
        const value = {
          data: res.data,
        };
        setData(value?.data);
      } catch (error) {
        console.log("errorr", error);
      }
    };
  
    useEffect(() => {
      getData();
      console.log("data", data)
    }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="AnaSayfa" />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="people"
                title="Tüm öğrenciler"
                count={data?.allStudents}
                percentage={{
                  color: "success"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="contacts"
                title="kayıtlı Öğrenciler"
                count={data?.recordStudents}
                percentage={{
                  color: "dark",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="face6"
                title="Birebir Öğrenciler"
                count={data?.faceStudents}
                percentage={{
                  color: "dark"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="admin_panel_settings"
                title="Tüm Öğretmenler"
                count={data?.allTeacher}
                percentage={{
                  color: "dark"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_pin"
                title="Birebir Öğretmenler"
                count={data?.faceTeacher}
                percentage={{
                  color: "dark"
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_search"
                title="Ön Kayıtlı Öğrenciler"
                count={data?.allStudents - data?.recordStudents}
                percentage={{
                  color: "dark"
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;