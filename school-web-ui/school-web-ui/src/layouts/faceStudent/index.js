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
import Tooltip from "@mui/material/Tooltip";
import PaymentIcon from "@mui/icons-material/Payment";
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import MDInput from "../../components/MDInput";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDTypography from "../../components/MDTypography";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import { validationSchema } from "../students/validations/studentPaymentValidation";
import MDSnackbar from "../../components/MDSnackbar";
import usePostPaymentPlan from "../students/service/usePostPaymentPlan";
import useChangeStatus from "../students/service/useChangeStatus";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const [email, setEmail] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { service, get } = useList(email);
  const [paymentType, setPaymentType] = useState(1);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [installment, setInstallment] = useState(0);
  const { postStatus } = useChangeStatus();
  const { serviceUpdate, post } = usePostPaymentPlan();

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleEditClick = (id) => () => {
    window.location.href = `/faceStudent_detail/${id}`;
  };
  const handleStudentPaymentDetailClick = (id) => () => {
    window.location.href = `/student_paymentdetail/${id}`;
  };
  const handleNewPaymentClick = (id) => () => {
    setSelectedId(id);
    setOpenDialog(true);
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: 'lightblue',
            },
            paper: {
              boxShadow: 'none',
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: 'lightblue',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: '6px 15px',
            },
          },
        },
      },
    });
  const columnss = [
    {
      name: "StudentName",
      label: "Adı",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const StudentName = service.data[dataIndex].StudentName;
          const StudentSurname = service.data[dataIndex].StudentSurname;
          return (
            <>
              {StudentName} {StudentSurname}
            </>
          );
        },
      },
    },
    {
      name: "StudentPhoneNumber",
      label: "Telefon",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "StudentEmail",
      label: "Mail",
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
      name: "IsActive",
      label: "Aktiflik",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{value === 1 ? "Aktif" : "Aktif Değil"}</div>;
        },
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
          const IsAnswered = service.data[dataIndex].IsAnswered;
          return (
            <>
              <Tooltip title="Detay">
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />
              </Tooltip>
              ,
              <Tooltip title={IsAnswered === 1 ? "Ödeme Detay" : "Ödeme Planı Oluştur"}>
                <GridActionsCellItem
                  icon={IsAnswered === 1 ? <PaymentIcon /> : <AddCardIcon />}
                  label="PaymentCreate"
                  className="textPrimary"
                  onClick={
                    IsAnswered === 1
                      ? handleStudentPaymentDetailClick(id)
                      : handleNewPaymentClick(id)
                  }
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
        await postStatus(selectedId);
        openSuccessSB();
        window.location.href = "/faceStudent";
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
      <DashboardNavbar pageName="Birebir Öğrenciler" />
      <MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/faceStudent_create" style={{ color: "#FFF" }}>
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
                title={"Bire Bir Dersler"}
                data={service.data}
                columns={columnss}
                options={options}
              />
            </ThemeProvider>
          </>
        )}
      </MDBox>
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
                  className="specificSelectBox"
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
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
