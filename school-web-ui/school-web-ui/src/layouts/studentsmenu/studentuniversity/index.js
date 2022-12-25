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
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Modal } from "@mui/material";
import * as React from "react";
import useList from "./service/useList";
import useApplyUniversity from "./service/useApplyUniversity";
import useStudentUniversity from "./service/useStudentUniversity";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";
import MDButton from "../../../components/MDButton";
import MDSnackbar from "../../../components/MDSnackbar";
import { jwtDecode } from "../../../httpservice/jwtDecode";
import { sessionStorageService } from "../../../httpservice/sessionStorageService";

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
  const { service, get } = useList();
  const { post } = useApplyUniversity();
  const { getStudentUniversity } = useStudentUniversity();
  const [universityName, setUniversityName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeUniList, setActiveUniList] = useState([]);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, İşlem başarılı bir şekilde gerçekleşti."
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

  const handleEditClick = (uniName) => () => {
    setUniversityName(uniName);
    setOpenModal(true);
  };
  const submitUniversity = () => async () => {
    const res = await post(universityName);
    if (res.serviceStatus === "error") {
      setErrorMsg("İşlem gerçekleşemedi");
      openErrorSB();
      return;
    }
    openSuccessSB();
    setOpenModal(false);
    window.location.href = "/studentUniversty";
  };

  useEffect(async () => {
    const resStudentUniversity = await getStudentUniversity(
      jwtDecode.returnGetJwtDecode(sessionStorageService.returnGetAccessToken()).Id
    );
    const res = await get();
    if (res.serviceStatus === "loaded") {
      const newActiveUniList = [];
      res.data.map((x) => {
        newActiveUniList.push({
          AnnouncementTitle: x.AnnouncementTitle,
          AnnouncementText: x.AnnouncementText,
          RelaseDate: x.RelaseDate,
          EndDate: x.EndDate,
          AnnouncementId: x.AnnouncementId,
          IsApply:
            resStudentUniversity.data.filter((y) => y.Name === x.AnnouncementTitle).length > 0,
        });
      });
      setActiveUniList(newActiveUniList);
    }
  }, []);

  const columns = [
    { field: "AnnouncementTitle", headerName: "Üniversite", width: 250 },
    {
      field: "AnnouncementText",
      headerName: "URL",
      width: 250,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "RelaseDate",
      headerName: "Yayın Tarihi",
      width: 180,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "EndDate",
      headerName: "Bitiş Tarihi",
      width: 180,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "IsApply",
      headerName: "Başvuru",
      width: 100,
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Başvur",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) =>
        params.row.IsApply
          ? []
          : [
              <GridActionsCellItem
                icon={<SendIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(params.row.AnnouncementTitle)}
                color="inherit"
              />,
            ],
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Üniversite" />
      <MDBox>
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={activeUniList}
            columns={columns}
            pageSize={8}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.AnnouncementId}
            rowsPerPageOptions={[5, 10, 15]}
            loading={service.serviceStatus === "loading"}
          />
        </div>
      </MDBox>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            Üniversite için başvurmak istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenModal(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={submitUniversity()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
      {renderErrorSB}
      {renderSuccessSB}
    </DashboardLayout>
  );
}

export default Tables;
