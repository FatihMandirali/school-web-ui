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
import { useParams } from "react-router-dom";
import AddCardIcon from "@mui/icons-material/AddCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
import Icon from "@mui/material/Icon";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import usePaymentList from "./service/usePaymentDetailList";
import MDButton from "../../components/MDButton";
import usePutPaymentId from "./service/usePutPaymentId";
import useSupplementarypayment from "./service/useSupplementarypayment";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../tableContentLanguage";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import StudentPaymentSummaryComponent from "../../components/StudentPaymentSummary/StudentPaymentSummaryComponent";

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
  const { servicePayment, postPayment } = useSupplementarypayment();
  const [paymentId, setPaymentId] = useState();
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [sendForm, setSendForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [remainingPayment, setRemainingPayment] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentData, setPaymentData] = useState({
    studentPayment: [],
    totalPaymentPlan: [],
    totalFee: [],
  });

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
    const res = await get(id);
    if (res.serviceStatus === "loaded") {
      setPaymentData(res.data);
      // eslint-disable-next-line no-shadow
      let paymentAmount = 0;
      let remainingAmount = 0;
      // eslint-disable-next-line array-callback-return
      res.data.totalPaymentPlan.map((item) => {
        paymentAmount += item.DownAmount;
      });
      // eslint-disable-next-line array-callback-return
      res.data.studentPayment
        .filter((x) => x.Events === 1)
        // eslint-disable-next-line array-callback-return
        .map((item) => {
          paymentAmount += item.Amount;
        });
      // eslint-disable-next-line array-callback-return
      res.data.studentPayment
        .filter((x) => x.Events === 0)
        // eslint-disable-next-line array-callback-return
        .map((item) => {
          remainingAmount += item.Amount;
        });
      setPaymentAmount(paymentAmount);
      setRemainingPayment(remainingAmount);
    }
  }, []);

  const handleEditClick = (selectedPaymentId) => () => {
    setPaymentId(selectedPaymentId);
    setPaymentPopup(true);
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 200 },
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
      width: 150,
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
  const columnsSupplementaryPayment = [
    { field: "DownAmount", headerName: "Ek Ödenen Tutarı", width: 200 },
    {
      field: "DownType",
      headerName: "Ek Ödeme Tipi",
      minWidth: 200,
      valueGetter: (params) => (params.value === 1 ? "İlk Kayıt Ödemesi" : "Ara Ödeme"),
    },
    {
      field: "PaymentDate",
      headerName: "Ek Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
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
  const supplementaryPayment = () => {
    setOpenDialog(true);
  };
  const confirmSupplementaryPayment = async () => {
    setSendForm(true);
    if (amount <= 0) return;
    const res = await postPayment(id, amount);
    if (res.serviceStatus === "loaded") {
      window.location.reload();
    } else {
      setErrorMsg("Ek ödeme yapılırken bir hata oluştu");
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğrenci Ücret Ödeme" />
      <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" />
        <MDButton
          onClick={() => supplementaryPayment()}
          size="small"
          variant="gradient"
          color="dark"
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Ek Ödeme
        </MDButton>
      </MDBox>
      <StudentPaymentSummaryComponent
        paymentAmount={paymentAmount}
        paymentData={
          paymentData.totalFee.length > 0
            ? paymentData.totalFee[0].TotalFee.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })
            : "0"
        }
        remainingPayment={remainingPayment}
      />
      <MDBox mt={2}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={paymentData.studentPayment.filter((item) => item.Amount > 0)}
            columns={columns}
            pageSize={5}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.PaymentStudentId}
            loading={service.serviceStatus === "loading"}
          />
        </div>
      </MDBox>
      <MDBox mt={2}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={paymentData?.totalPaymentPlan}
            columns={columnsSupplementaryPayment}
            pageSize={5}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.DownPaymentId}
            loading={service.serviceStatus === "loading"}
          />
        </div>
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
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ek Ödeme</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <MDInput
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              label="Ek Ödenecek Tutar"
              fullWidth
              name="totalAmount"
            />
            {sendForm === true && amount <= 0 && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">Lütfen sıfırdan yüksek değer girin</Alert>
              </Stack>
            )}
          </Box>

          {servicePayment.serviceStatus === "loading" ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <MDBox
              pt={2}
              py={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h6" fontWeight="medium" />
              <MDButton
                type="submit"
                onClick={() => confirmSupplementaryPayment()}
                variant="gradient"
                color="dark"
              >
                &nbsp;Onayla
              </MDButton>
            </MDBox>
          )}
        </DialogContent>
      </Dialog>
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
