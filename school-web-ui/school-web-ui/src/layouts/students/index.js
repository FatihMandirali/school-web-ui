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

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import Tooltip from "@mui/material/Tooltip";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function Tables() {
  const [email, setEmail] = useState(0);
  const { service, get } = useList(email);

  const handleEditClick = (id) => () => {
    window.location.href = `/student_detail/${id}`;
  };
  const handlePaymentClick = (id) => () => {
    window.location.href = `/student_paymentdetail/${id}`;
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 200 },
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
        <Tooltip title="Ödeme Detay">
          <GridActionsCellItem
            icon={<PaymentIcon />}
            label="Payment"
            className="textPrimary"
            onClick={handlePaymentClick(id)}
            color="inherit"
          />
        </Tooltip>,
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
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={8}
              pagination
              getRowId={(row) => row.StudentId}
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={(newPage) => changePage(newPage)}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
