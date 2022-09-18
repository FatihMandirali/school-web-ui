import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import useBranchList from "../service/useBranchList";
import { validationSchema } from "../validations/userValidation";
import MDSnackbar from "../../../components/MDSnackbar";
import useClassList from "../../students/service/useClassList";
import useLessonList from "../service/useLessonList";

function CreateTeacher(props) {
  const { serviceLesson, getLesson } = useLessonList();
  const { serviceClass, getClass } = useClassList();
  const { serviceBranch, getBranch } = useBranchList();
  const { service: postService, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [branchId] = useState(props.branchId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [classId] = useState(props.classId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [emailAdress] = useState(props.emailAdress);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [lessonId] = useState(props.lessonId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [teacherName] = useState(props.teacherName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [teacherSurname] = useState(props.teacherSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [teacherPhone, setTeacherPhone] = useState(props.teacherPhone);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [tcOrPasaportNo] = useState(props.tcOrPasaportNo);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminName] = useState(props.adminName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminSurname] = useState(props.adminSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [teacherId] = useState(props.teacherId);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Öğretmen başarılı bir şekilde güncellendi."
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
    await getClass(branchId);
    await getBranch();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      teacherName,
      teacherSurname,
      tcPaspNo: tcOrPasaportNo,
      emailAdress,
      branchId,
      lessonId,
      classId,
      teacherId,
      teacherPhone,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        teacherId,
        values.teacherName,
        values.teacherSurname,
        values.tcPaspNo,
        values.emailAdress,
        values.branchId,
        teacherPhone,
        values.lessonId,
        values.classId
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
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

  const btnDeleteTeacher = async () => {
    await postDelete(teacherId);
    window.location.href = `/teacher`;
  };

  return (
    <>
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
                value={values.teacherName}
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
                value={values.teacherSurname}
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
                value={values.tcPaspNo}
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
                value={values.emailAdress}
              />
              {sendForm === true && errors.emailAdress && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.emailAdress}</Alert>
                </Stack>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MuiPhoneNumber
                onChange={(e) => setTeacherPhone(e)}
                defaultCountry="tr"
                name="coverPhoneNumber"
                fullWidth
                value={teacherPhone}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="admininfo"
                disabled
                type="text"
                onChange={handleChange}
                label="Admin"
                fullWidth
                value={`${adminName} ${adminSurname}`}
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
                  defaultValue={values.lessonId}
                  name="lessonId"
                  className="specificSelectBox"
                >
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
                  defaultValue={values.branchId}
                  name="branchId"
                  className="specificSelectBox"
                >
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
                  defaultValue={values.classId}
                  name="classId"
                  className="specificSelectBox"
                >
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
                <MDButton type="button" onClick={() => btnDeleteTeacher()} color="error" fullWidth>
                  SİL
                </MDButton>
              </MDBox>
            )}
          </MDBox>
        </form>
      </Card>
      {renderSuccessSB}
      {renderErrorSB}
    </>
  );
}

export default CreateTeacher;
