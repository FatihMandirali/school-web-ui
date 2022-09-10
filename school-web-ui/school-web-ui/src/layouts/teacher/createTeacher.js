import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import useBranchList from "./service/useBranchList";
import { validationSchema } from "./validations/userValidation";
import MDSnackbar from "../../components/MDSnackbar";
import useClassList from "../students/service/useClassList";
import useLessonList from "./service/useLessonList";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateTeacher() {
  const { serviceLesson, getLesson } = useLessonList();
  const { serviceClass, getClass } = useClassList();
  const { serviceBranch, getBranch } = useBranchList();
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Öğretmen başarılı bir şekilde eklendi."
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
    await getLesson();
    await getClass();
    await getBranch();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      teacherName: "",
      teacherSurname: "",
      tcPaspNo: "",
      emailAdress: "",
      branchId: 0,
      lessonId: 0,
      classId: 0,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        values.teacherName,
        values.teacherSurname,
        values.tcPaspNo,
        values.emailAdress,
        values.branchId,
        phone,
        values.lessonId,
        values.classId
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/teacher";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  useEffect(async () => {
    console.log(values.branchId);
    if (values.branchId <= 0) return;
    await getClass(values.branchId);
  }, [values.branchId]);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğretmen Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Adı"
                  fullWidth
                  name="teacherName"
                />
                {sendForm === true && errors.teacherName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.teacherName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Soyad"
                  fullWidth
                  name="teacherSurname"
                />
                {sendForm === true && errors.teacherSurname && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.teacherSurname}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="tcPaspNo"
                  type="text"
                  onChange={handleChange}
                  label="TC ve Pasaport Numarası"
                  fullWidth
                />
                {sendForm === true && errors.tcPaspNo && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.tcPaspNo}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="emailAdress"
                  type="text"
                  onChange={handleChange}
                  label="Mail"
                  fullWidth
                />
                {sendForm === true && errors.emailAdress && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.emailAdress}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MuiPhoneNumber
                  onChange={(e) => setPhone(e)}
                  defaultCountry="tr"
                  name="coverPhoneNumber"
                  fullWidth
                />
              </MDBox>

              {serviceLesson.serviceStatus === "loaded" && (
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
                    onChange={handleChange}
                    defaultValue={0}
                    name="lessonId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceLesson.data.map((u) => (
                      <MenuItem key={u.LessonId} value={u.LessonId}>
                        {u.LessonName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.lessonId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.lessonId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              {serviceBranch.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Şube</InputLabel>
                  <Select
                    label="Şube"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="branchId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceBranch.data.map((u) => (
                      <MenuItem key={u.BranchId} value={u.BranchId}>
                        {u.BranchName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.branchId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.branchId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              {serviceClass.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Sınıfı</InputLabel>
                  <Select
                    label="Sınıfı"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="classId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceClass.data.map((u) => (
                      <MenuItem key={u.ClassId} value={u.ClassId}>
                        {u.ClassName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.classId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.classId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

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

export default CreateTeacher;
