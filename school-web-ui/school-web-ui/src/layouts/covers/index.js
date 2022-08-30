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
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function Tables() {
  const { service, get } = useList();

  const handleEditClick = (id) => () => {
    window.location.href = `/cover_detail/${id}`;
  };

  const columns = [
    { field: "CoverName", headerName: "Adı", width: 200 },
    { field: "CoverSurname", headerName: "Soyadı", minWidth: 400 },
    { field: "CoverEmail", headerName: "Mail", minWidth: 400 },
    {
      field: "CoverPhoneNumber",
      headerName: "Telefon Numarası",
      minWidth: 200,
      // valueGetter: (params) => (params.row.adminRole === 1 ? "Admin" : "Değil"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Detay",
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
      ],
    },
  ];

  const changePage = () => {
    useEffect(() => {
      get();
    }, []);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Veliler" />
      <MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/cover_create" style={{ color: "#FFF" }}>
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
              getRowId={(row) => row.CoverId}
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
