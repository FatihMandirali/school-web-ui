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
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import useList from "./service/useList";
import usePostPaymentPlan from "./service/usePostPaymentPlan";
import useChangeStatus from "./service/useChangeStatus";
import MDSnackbar from "../../components/MDSnackbar";
import MDInput from "../../components/MDInput";
import { validationSchema } from "./validations/studentPaymentValidation";

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
  const [installment, setInstallment] = useState(1);
  const [paymentType, setPaymentType] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openChangePopup, setOpenChangePopup] = useState(false);
  const { service, get } = useList(email);
  const { serviceUpdate, post } = usePostPaymentPlan();
  const { postStatus } = useChangeStatus();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sendForm, setSendForm] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleEditClick = (id) => () => {
    window.location.href = `/user_detail/${id}`;
  };

  const handleChangeStatusClick = (id) => () => {
    setSelectedId(id);
    console.log(id);
    setOpenChangePopup(true);
  };
  const sendChangeStatus = () => async () => {
    setOpenDialog(true);
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, öğrenci ödeme işlemi başarılı bir şekilde güncellendi."
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
          icon={<PublishedWithChangesIcon />}
          label="Change"
          className="textPrimary"
          onClick={handleChangeStatusClick(id)}
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

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      totalAmount: 0,
      firstPaymentDate: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(selectedId, values.totalAmount, values.firstPaymentDate, installment);

      console.log(res);
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        await postStatus(selectedId);
        window.location.href = "/student_notrecords";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  const handleChangeInstallment = (event) => {
    console.log(event.target.value);
    setPaymentType(event.target.value);
  };

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Kayıtsız Öğrenciler</h1>
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
      <Modal
        open={openChangePopup}
        onClose={() => setOpenChangePopup(false)}
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
            Öğrenci kayıdını aktifleştirmek istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenChangePopup(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={sendChangeStatus()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ödeme Planı</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <MDInput
                onChange={handleChange}
                type="number"
                label="Toplam Ödenecek Tutar"
                fullWidth
                name="totalAmount"
              />
              {sendForm === true && errors.totalAmount && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.totalAmount}</Alert>
                </Stack>
              )}
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ödeme Türü</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={paymentType}
                  label="Ödeme Türü"
                  onChange={handleChangeInstallment}
                >
                  <MenuItem value={1}>Peşin</MenuItem>
                  <MenuItem value={2}>Taksit</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {paymentType === 2 && (
              <Box mt={2}>
                <MDInput
                  onChange={(e) => setInstallment(e.target.value)}
                  type="number"
                  label="Taksit Sayısı"
                  fullWidth
                  value={installment}
                  name="installment"
                />
                {sendForm === true && installment <= 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">Lütfen sıfırdan büyük değer girin.</Alert>
                  </Stack>
                )}
              </Box>
            )}

            <Box mt={2}>
              <MDInput
                id="date"
                label="İlk taksit ödemesi"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="firstPaymentDate"
                onChange={handleChange}
                lang="tr-TR"
              />
              {sendForm === true && errors.firstPaymentDate && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.firstPaymentDate}</Alert>
                </Stack>
              )}
            </Box>

            {serviceUpdate.serviceStatus === "loading" ? (
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
                  onClick={() => setSendForm(true)}
                  variant="gradient"
                  color="dark"
                >
                  &nbsp;Onayla
                </MDButton>
              </MDBox>
            )}
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
