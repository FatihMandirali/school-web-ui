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

function Tables() {
  const { service, get } = useList(0);

  const handleEditClick = (id) => () => {
    window.location.href = `/announcement_detail/${id}`;
  };

  const columns = [
    { field: "AnnouncementTitle", headerName: "Başlık", width: 200 },
    { field: "AnnouncementText", headerName: "Açıklama", width: 200 },
    { field: "CreateDate", headerName: "Oluşturulma Tarihi", width: 200 },
    { field: "LocationId", headerName: "Paylaşılma Yeri", width: 200 },
    { field: "AdminName", headerName: "Admin Adı", width: 200 },
    { field: "AdminSurname", headerName: "Admin Soyadı", width: 200 },
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

  useEffect(() => {
    get();
  }, []);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Duyurular</h1>
          </MDTypography>
          <Link to="/announcement_create" style={{ color: "#FFF" }}>
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
              pageSize={10}
              pagination
              getRowId={(row) => row.AnnouncementId}
              rowsPerPageOptions={[5, 10, 15]}
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
