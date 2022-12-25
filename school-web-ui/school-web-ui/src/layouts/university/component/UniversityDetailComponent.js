import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import { validationSchema } from "../validations/universityValidation";
import MDSnackbar from "../../../components/MDSnackbar";

function CreateAnnouncement(props) {
  console.log(props);
  const { service, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [announcementId] = useState(props.announcementId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [announcementText] = useState(props.announcementText);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [announcementTitle] = useState(props.announcementTitle);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [createdDate] = useState(props.createDate);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [sharingEndDate] = useState(props.createDate);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [locationId] = useState(props.locationId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminName] = useState(props.adminName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminSurname] = useState(props.adminSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [relaseDate] = useState(props.relaseDate);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [endDate] = useState(props.endDate);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Duyuru başarılı bir şekilde güncellendi."
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

  const btnDelete = async () => {
    await postDelete(announcementId);
    window.location.href = `/university`;
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: announcementTitle,
      text: announcementText,
      adminId: 0,
      locationId,
      createdDate: relaseDate,
      sharingEndDate: endDate,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        announcementId,
        values.title,
        values.text,
        values.adminId,
        values.locationId,
        values.createdDate,
        values.sharingEndDate
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = `/university`;
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Üniversite"
              fullWidth
              name="title"
              disabled
              value={values.title}
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
              label="URL(*Lütfen url girin)"
              fullWidth
              name="text"
              value={values.text}
            />
            {sendForm === true && errors.text && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.text}</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Ekleyen Yönetici"
              fullWidth
              name="text"
              disabled
              value={`${adminName} ${adminSurname}`}
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
              value={values.createdDate}
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
              value={values.sharingEndDate}
            />
            {sendForm === true && errors.sharingEndDate && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.sharingEndDate}</Alert>
              </Stack>
            )}
          </MDBox>

          {service.serviceStatus === "loading" ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" onClick={() => setSendForm(true)} color="dark" fullWidth>
                Güncelle
              </MDButton>
            </MDBox>
          )}

          {serviceDelete.serviceStatus === "loading" ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <MDBox mt={4} mb={1}>
              <MDButton type="button" onClick={() => btnDelete()} color="error" fullWidth>
                SİL
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      </form>
      {renderSuccessSB}
      {renderErrorSB}
    </>
  );
}

export default CreateAnnouncement;
