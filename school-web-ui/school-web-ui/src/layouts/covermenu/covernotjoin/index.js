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
import { useEffect } from "react";
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const { service, get } = useList();

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
    name: "StudentName",
    label: "Adı",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "StudentSurname",
    label: "Soyadı",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "ClassName",
    label: "Sınıf",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "LessonName",
    label: "Ders",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "SendDate",
    label: "Devamsızlık Tarihi",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return <div style={{}}>{new Date(value).toLocaleString()}</div>;
      },
    },
  }
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
};

  useEffect(async () => {
    await get();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Devamsızlıklar" />
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
