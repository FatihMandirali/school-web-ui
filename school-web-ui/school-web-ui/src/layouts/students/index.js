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
import Footer from "examples/Footer";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";

function Tables() {
  const [email, setEmail] = useState(0);
  const { service, get } = useList(email);

  const handleEditClick = (id) => () => {
    window.location.href = `/user_detail/${id}`;
  };
  const handlePaymentClick = (id) => () => {
    window.location.href = `/student_paymentdetail/${id}`;
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
    {
      field: "StudentNo",
      headerName: "Öğrenci Numarası",
      minWidth: 200,
      // valueGetter: (params) => (params.row.adminRole === 1 ? "Admin" : "Değil"),
    },
    {
      field: "StudentTcOrPassNo",
      headerName: "Kimlik Bilgisi",
      minWidth: 200,
    },
    {
      field: "StudentPhoneNumber",
      headerName: "Telefon",
      minWidth: 200,
    },
    {
      field: "StudentEmail",
      headerName: "Mail",
      minWidth: 200,
    },
    {
      field: "ClassName",
      headerName: "Sınıf",
      minWidth: 200,
    },
    {
      field: "Adress",
      headerName: "Adres",
      minWidth: 200,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<PaymentIcon />}
          label="Payment"
          className="textPrimary"
          onClick={handlePaymentClick(id)}
          color="inherit"
        />,
      ],
    },
  ];

  const changePage = (page) => {
    console.log("page");
    console.log(page);
    setEmail(page);
    useEffect(() => {
      get(email);
    }, [email]);
  };

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Kayıtlı Öğrenciler</h1>
          </MDTypography>
          <Link to="/student_create" style={{ color: "#FFF" }}>
            <MDButton variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;ekle
            </MDButton>
          </Link>
        </MDBox>
        <br />
        {service.serviceStatus === "loaded" && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={100}
              pagination
              getRowId={(row) => row.StudentId}
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={(newPage) => changePage(newPage)}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
