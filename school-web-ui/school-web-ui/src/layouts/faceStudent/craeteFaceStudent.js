import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import { validationSchema } from "./validations/faceStudentValidation";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import useLessonList from "./service/useLessonList";

function CreateFinance() {
  const { getLesson } = useLessonList();
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [lessons, setLessons] = useState([]);
  const [subLessons, setSubLessons] = useState([]);
  const [chooseLesson, setChooseLessons] = useState([]);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(async () => {
    const res = await getLesson();
    if (res.serviceStatus === "loaded") {
      setLessons(res.data);
      setSubLessons(res.data);
    }
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Birebir öğrenci başarılı bir şekilde eklendi."
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
      name: "",
      surName: "",
      idNo: "",
      email: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      if (chooseLesson.length <= 0) return;
      const res = await post(
        values.name,
        values.surName,
        values.idNo,
        values.email,
        phone,
        chooseLesson
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/faceStudent";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  const lessonChoose = (event) => {
    setChooseLessons([
      ...chooseLesson,
      {
        lessonId: event.target.value,
        name: lessons.find((x) => x.LessonId === event.target.value).LessonName,
        count: 0,
      },
    ]);
    const newLesson = lessons.filter((x) => x.LessonId !== event.target.value);
    setLessons(newLesson);
  };

  const lessonSelectedDelete = (id) => {
    const deletedLesson = subLessons.find((x) => x.LessonId === id);
    setLessons([...lessons, deletedLesson]);
    setChooseLessons(chooseLesson.filter((x) => x.lessonId !== id));
  };

  const onChangeLessonCount = (count, id) => {
    chooseLesson.find((x) => x.lessonId === id).count = parseInt(count, 10);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Birebir Öğrenci Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput type="text" onChange={handleChange} label="Adı" fullWidth name="name" />
                {sendForm === true && errors.name && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.name}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Soyadı"
                  fullWidth
                  name="surName"
                />
                {sendForm === true && errors.surName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.surName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Öğrenci numarası"
                  fullWidth
                  name="idNo"
                />
                {sendForm === true && errors.idNo && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.idNo}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" onChange={handleChange} label="Mail" fullWidth name="email" />
                {sendForm === true && errors.email && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.email}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MuiPhoneNumber
                  onChange={(e) => setPhone(e)}
                  defaultCountry="tr"
                  name="phone"
                  fullWidth
                />
                {sendForm === true && phone.length <= 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">Telefon numarasını girin</Alert>
                  </Stack>
                )}
              </MDBox>

              <FormControl mb={5} fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Ders</InputLabel>
                <Select
                  label="Ders"
                  displayEmpty
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={(event) => lessonChoose(event)}
                  defaultValue={0}
                  name="lessonId"
                  className="specificSelectBox"
                >
                  <MenuItem key={0} value={0}>
                    Seçiniz
                  </MenuItem>
                  {lessons.map((u) => (
                    <MenuItem key={u.LessonId} value={u.LessonId}>
                      {u.LessonName}
                    </MenuItem>
                  ))}
                </Select>
                {sendForm === true && chooseLesson.length <= 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      Lütfen ders seçin ve alınacak ders sayısını girin
                    </Alert>
                  </Stack>
                )}
              </FormControl>
              <Grid
                mt={3}
                textAlign="center"
                container
                spacing={2}
                style={{ justifyContent: "center", textAlign: "center" }}
              >
                {chooseLesson.map((item) => (
                  <Box component="span" ml={1} mb={1} sx={{ border: "1px dashed grey" }}>
                    <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>
                      {item.name}
                    </b>
                    <MDInput
                      type="number"
                      onChange={(event) => onChangeLessonCount(event.target.value, item.lessonId)}
                      label="Ders Sayısı"
                      fullWidth
                    />
                    <Button>
                      <ClearIcon
                        onClick={() => lessonSelectedDelete(item.lessonId)}
                        style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                      />
                    </Button>
                  </Box>
                ))}
              </Grid>

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

export default CreateFinance;
