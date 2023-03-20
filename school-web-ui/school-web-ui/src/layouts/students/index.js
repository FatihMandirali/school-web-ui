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
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import Tooltip from "@mui/material/Tooltip";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const [email, setEmail] = useState(0);
  const { service, get } = useList(email);

  const handleEditClick = (id) => () => {
    window.location.href = `/student_detail/${id}`;
  };
  const handlePaymentClick = (id) => () => {
    window.location.href = `/student_paymentdetail/${id}`;
  };
  const getMuiTheme = () =>
    createTheme({
      components: {},
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
      name: "StudentTcOrPassNo",
      label: "Kimlik Bilgisi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "BranchName",
      label: "Şube",
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
      name: "actions",
      label: "İşlemler",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const id = service.data[dataIndex].StudentId;
          return (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />
              ,
              <Tooltip title="Ödeme Detay">
                <GridActionsCellItem
                  icon={<PaymentIcon />}
                  label="Payment"
                  className="textPrimary"
                  onClick={handlePaymentClick(id)}
                  color="inherit"
                />
              </Tooltip>
            </>
          );
        },
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
      <DashboardNavbar pageName="Kayıtlı Öğrenciler" />
      <MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/student_create" style={{ color: "#FFF" }}>
            <MDButton size="small" variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;ekle
            </MDButton>
          </Link>
        </MDBox>
        {service.serviceStatus === "loaded" && (
          <>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Kayıtlı Öğrenciler"}
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
