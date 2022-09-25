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
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Modal } from "@mui/material";
import useList from "./service/useList";
import useDelete from "./service/useDelete";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../tableContentLanguage";
import MDSnackbar from "../../components/MDSnackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Tables() {
  const [email, setEmail] = useState(0);
  const [deletedId, setDeletedId] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const { service, get } = useList(email);
  const { postDelete } = useDelete();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Silme başarılı bir şekilde eklendi."
      dateTime="şimdi"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Hata"
      content={errorMsg}
      dateTime="now"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleDeleteClick = (id) => () => {
    setDeletedId(id);
    setOpenPopup(true);
  };

  const btnDeleteClick = async () => {
    const res = await postDelete(deletedId);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      window.location.reload();
    } else {
      setErrorMsg("Silme işlemi yapılırken bir hata oluştu");
      openErrorSB();
    }
  };

  const columns = [
    { field: "StudentName", headerName: "Öğrenci Adı", width: 150 },
    { field: "StudentSurname", headerName: "Öğrenci Soyadı", width: 200 },
    { field: "TeacherName", headerName: "Öğretmen Adı", minWidth: 150 },
    { field: "TeacherSurname", headerName: "Öğretmen Soyadı", minWidth: 200 },
    { field: "LessonName", headerName: "Ders Adı", minWidth: 150 },
    {
      field: "Times",
      headerName: "Ders Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.row.Times).toLocaleString(),
    },
    {
      field: "ClockTime",
      headerName: "Ders Saati",
      minWidth: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Sil",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<Icon>delete</Icon>}
          label="Edit"
          className="textPrimary"
          onClick={handleDeleteClick(id)}
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
      <DashboardNavbar pageName="Bire bir dersler" />
      <MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/oneonone_create" style={{ color: "#FFF" }}>
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
              getRowId={(row) => row.OneOnOneId}
              localeText={localizedTextsMap}
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={(newPage) => changePage(newPage)}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
      {renderSuccessSB}
      {renderErrorSB}
      <Modal
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Birebir dersi silmek istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenPopup(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => btnDeleteClick()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
