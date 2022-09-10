import Card from "@mui/material/Card";
import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import { validationSchema } from "./validations/announcementValidation";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateAnnouncement() {
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
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
      content="Tebrikler, Duyuru başarılı bir şekilde eklendi."
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

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      title: "",
      text: "",
      adminId: 0,
      locationId: 0,
      createdDate: "",
      sharingEndDate: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        values.title,
        values.text,
        values.adminId,
        values.locationId,
        values.createdDate,
        values.sharingEndDate
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/announcements";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Duyuru Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Başlık"
                  fullWidth
                  name="title"
                />
                {sendForm === true && errors.title && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.title}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Açıklama"
                  fullWidth
                  name="text"
                />
                {sendForm === true && errors.text && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.text}</Alert>
                  </Stack>
                )}
              </MDBox>

              <FormControl mb={5} fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Yayınlanacak Sayfa</InputLabel>
                <Select
                  label="Yayınlanacak Sayfa"
                  displayEmpty
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleChange}
                  defaultValue={0}
                  name="locationId"
                  className="specificSelectBox"
                >
                  <MenuItem key={0} value={0}>
                    Seçiniz
                  </MenuItem>
                  <MenuItem key={1} value={1}>
                    Giriş Sayfası
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Öğrenci Sayfası
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    Öğretmen Sayfası
                  </MenuItem>
                  <MenuItem key={4} value={4}>
                    Veli Sayfası
                  </MenuItem>
                  <MenuItem key={5} value={5}>
                    Öğrenci ve Veli Sayfası
                  </MenuItem>
                </Select>
                {sendForm === true && errors.locationId && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.locationId}</Alert>
                  </Stack>
                )}
              </FormControl>

              <MDBox mb={2}>
                <TextField
                  id="datetime-local"
                  label="Başlangıç Tarihi"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="createdDate"
                  onChange={handleChange}
                />
                {sendForm === true && errors.createdDate && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.createdDate}</Alert>
                  </Stack>
                )}
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  id="datetime-local"
                  label="Bitiş Tarihi"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  name="sharingEndDate"
                  onChange={handleChange}
                />
                {sendForm === true && errors.sharingEndDate && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.sharingEndDate}</Alert>
                  </Stack>
                )}
              </MDBox>

              {postService.serviceStatus === "loading" ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress color="secondary" />
                </Stack>
              ) : (
                <MDBox mt={4} mb={1}>
                  <MDButton type="submit" onClick={() => setSendForm(true)} color="dark" fullWidth>
                    Oluştur
                  </MDButton>
                </MDBox>
              )}
            </MDBox>
          </form>
        </Card>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateAnnouncement;
