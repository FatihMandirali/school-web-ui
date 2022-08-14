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
import Icon from "@mui/material/Icon";
import { Link, useParams } from "react-router-dom";
import AddCardIcon from "@mui/icons-material/AddCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Modal } from "@mui/material";
import usePaymentList from "./service/usePaymentDetailList";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import usePutPaymentId from "./service/usePutPaymentId";
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
  const { id } = useParams();
  const { service, get } = usePaymentList();
  const { post } = usePutPaymentId();
  const [paymentId, setPaymentId] = useState();
  const [paymentPopup, setPaymentPopup] = useState(false);
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
      content="Tebrikler, Ödeme işlemi başarılı bir şekilde onaylandı."
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
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  useEffect(async () => {
    await get(id);
  }, []);

  const handleEditClick = (selectedPaymentId) => () => {
    setPaymentId(selectedPaymentId);
    setPaymentPopup(true);
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 100 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 100 },
    {
      field: "EndDate",
      headerName: "Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "Amount",
      headerName: "Ödeme Tutarı",
      minWidth: 200,
    },
    {
      field: "Events",
      headerName: "Ödeme Durumu",
      minWidth: 200,
      valueGetter: (params) => (params.value <= 0 ? "Ödenmedi" : "Ödendi"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ödeme Yap",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        params.row.Events <= 0 ? (
          <GridActionsCellItem
            icon={<AddCardIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.row.PaymentStudentId)}
            color="inherit"
          />
        ) : (
          <span />
        ),
      ],
    },
  ];

  const sendPayment = async () => {
    const res = await post(paymentId, 1);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      window.location.href = `/student_paymentdetail/${id}`;
    } else {
      setErrorMsg(res.errorMessage);
      openErrorSB();
    }
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
              getRowId={(row) => row.PaymentStudentId}
              rowsPerPageOptions={[5, 10, 15]}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
      <Modal
        open={paymentPopup}
        onClose={() => setPaymentPopup(false)}
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
            Ödemeyi yapmak istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setPaymentPopup(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => sendPayment()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
      {renderSuccessSB}
      {renderErrorSB}
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
