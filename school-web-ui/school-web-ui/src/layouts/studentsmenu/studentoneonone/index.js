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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState } from "react";
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const [email, setEmail] = useState(0);
  const { service, get } = useList(email);

  const getMuiTheme = () =>
  createTheme({
    components: {
      MUIDataTable: {
        styleOverrides: {
          root: {
            backgroundColor: 'lightblue',
          },
          paper: {
            boxShadow: 'none',
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: 'lightblue',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '6px 15px',
          },
        },
      },
    },
  });
const columnss = [
  {
    name: "TeacherName",
    label: "Öğretmen Adı",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "TeacherSurname",
    label: "Öğretmen Soyadı",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "Times",
    label: "Tarih",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return <div style={{}}>{new Date(value).toLocaleString()}</div>;
      },
    },
  },
  {
    name: "ClockTime",
    label: "Ders Saati",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const options = {
  filterType: "checkbox",
  responsive: "standard",
  filter: false,
  download: false,
  print: false,
  selectableRows: "none",
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 100, 200, 500],
  textLabels: {
    body: {
      noMatch: "Üzgünüz, eşleşen kayıt bulunamadı",
    },
  },
}

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Bire bir dersler" />
      <MDBox>
        {service.serviceStatus === "loaded" && (
          <>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Devamsızlıklar"}
              data={service.data}
              columns={columnss}
              options={options}
            />
          </ThemeProvider>
          </>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
