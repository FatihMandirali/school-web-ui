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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import { CardActionArea, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import useList from "./service/useList";
import useCoverList from "./service/useCoverList";
import useCreate from "./service/useCreate";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import MDSnackbar from "../../components/MDSnackbar";

function Tables() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [covers, setCovers] = useState([]);
  const [autoSelecetCovers, setAutoSelecetCovers] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const { get } = useList();
  const { getCover } = useCoverList();
  const { post } = useCreate();

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
      content="Tebrikler, Sms başarılı bir şekilde gönderildi."
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

  useEffect(async () => {
    const res = await get();
    if (res.serviceStatus === "loaded") {
      setData(res.data.Response.Balance.SmsTotal);
    } else {
      setData("Şuan için gösterilemiyor");
    }
    const resCover = await getCover();
    if (resCover.serviceStatus === "loaded") {
      const coversArray = [];
      setCovers(resCover.data);
      // eslint-disable-next-line array-callback-return
      resCover.data.map((item) => {
        coversArray.push({ id: item.CoverId, label: `${item.CoverName} ${item.CoverSurname}` });
      });
      setAutoSelecetCovers(coversArray);
    }
  }, []);

  const btnOpenDialog = () => {
    setOpenDialog(true);
  };

  const coverSelectedDelete = (item) => {
    console.log(item);
    setSelectedCovers(selectedCovers.filter((x) => x.id !== item.id));
    setAutoSelecetCovers([...autoSelecetCovers, item]);
  };

  const coverSelected = (event) => {
    if (event === null) return;
    console.log(event);
    setAutoSelecetCovers(autoSelecetCovers.filter((x) => x.id !== event.id));
    setSelectedCovers([...selectedCovers, autoSelecetCovers.find((x) => x.id === event.id)]);
  };
  const ApplySendForm = async () => {
    setSendForm(true);
    if (message === "" || message === " " || selectedCovers.length <= 0) return;
    const phones = [];
    // eslint-disable-next-line array-callback-return
    selectedCovers.map((item) => {
      phones.push(covers.find((x) => x.CoverId === item.id).CoverPhoneNumber);
    });

    const res = await post(phones, message);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      window.location.href = "/sms";
    } else {
      setErrorMsg("Sms gönderilirken bir sorun oluştu");
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Sms İşlemleri" />
      <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" />
        <MDButton onClick={() => btnOpenDialog()} size="small" variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>send</Icon>
          &nbsp;SMS GÖNDER
        </MDButton>
      </MDBox>
      <Box>
        <Grid container spacing={0.5}>
          <Grid textAlign="center" bgcolor="white" item mb={5} xs={3}>
            <CardActionArea>
              <Card style={{ padding: "50px" }}>
                <span>
                  <span style={{ fontSize: "20px" }}>Kalan Sms Sayısı : </span>
                  <b style={{ fontSize: "20px" }}>{data}</b>
                </span>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Box>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sms Gönder</DialogTitle>
        <DialogContent>
          <MDInput
            style={{ marginTop: "5px" }}
            type="text"
            onChange={(event) => setMessage(event.target.value)}
            label="Mesaj"
            fullWidth
            name="msj"
          />
          {sendForm === true && (message === "" || message === " ") && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">Lütfen mesajı girin</Alert>
            </Stack>
          )}
          <br />
          <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            onChange={(event, newValue) => {
              coverSelected(newValue);
            }}
            options={autoSelecetCovers}
            renderInput={(params) => <TextField {...params} label="Veliler" />}
            style={{
              height: "15px",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "20px",
              float: "left",
            }}
          />
          {sendForm === true && selectedCovers.length <= 0 && (
            <Stack sx={{ width: "100%", marginTop: "15px" }} spacing={2}>
              <Alert severity="error">Lütfen gönderilecek veliyi</Alert>
            </Stack>
          )}
          <Grid mt={10} textAlign="center" container spacing={2}>
            {selectedCovers.map((item) => (
              <Box component="span" ml={2} mb={2} sx={{ border: "1px dashed grey" }}>
                <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>{item.label}</b>
                <Button>
                  <ClearIcon
                    onClick={() => coverSelectedDelete(item)}
                    style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                  />
                </Button>
              </Box>
            ))}
          </Grid>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" onClick={() => ApplySendForm()} color="dark" fullWidth>
              Gönder
            </MDButton>
          </MDBox>
        </DialogContent>
      </Dialog>
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
