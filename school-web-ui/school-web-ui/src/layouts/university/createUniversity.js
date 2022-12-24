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
import useUniversityList from "./service/useUniversityList";
import { validationSchema } from "./validations/universityValidation";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateAnnouncement() {
  const { service: postService, post } = useCreate();
  const { service, get } = useUniversityList();
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
      title: 0,
      text: "",
      adminId: 0,
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
        window.location.href = "/university";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Üniversite Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox>
                {service.serviceStatus === "loaded" && (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Üniversite</InputLabel>
                    <Select
                      label="Üniversite"
                      displayEmpty
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      onChange={handleChange}
                      defaultValue={service.data[0].Name}
                      name="title"
                      className="specificSelectBox"
                    >
                      {service.data.map((u) => (
                        <MenuItem key={u.Name} value={u.Name}>
                          {u.Name}
                        </MenuItem>
                      ))}
                    </Select>
                    {sendForm === true && errors.title && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">{errors.title}</Alert>
                      </Stack>
                    )}
                  </FormControl>
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
