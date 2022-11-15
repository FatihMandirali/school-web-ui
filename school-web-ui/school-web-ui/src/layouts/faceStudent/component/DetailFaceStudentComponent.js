import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import MuiPhoneNumber from "material-ui-phone-number";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../../components/MDInput";
import MDBox from "../../../components/MDBox";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import { validationSchema } from "../validations/updateFaceStudentValidation";
import MDSnackbar from "../../../components/MDSnackbar";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import useLessonList from "../service/useLessonList";
import MDButton from "../../../components/MDButton";

function DetailFaceStudentComponent(props) {
  const { getLesson } = useLessonList();
  const { service: postService, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lessons, setLessons] = useState([]);
  const [subLessons, setSubLessons] = useState([]);
  const [chooseLesson, setChooseLessons] = useState([]);

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentId] = useState(props.data[0].StudentId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentName] = useState(props.data[0].StudentName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentSurname] = useState(props.data[0].StudentSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentTcOrPassNo] = useState(props.data[0].StudentTcOrPassNo);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentEmail] = useState(props.data[0].StudentEmail);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [phone, setPhone] = useState(props.data[0].StudentPhoneNumber);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [schoolName] = useState(props.data[0].SchoolName);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(async () => {
    const res = await getLesson();
    const notChooseLesson = [];
    const chooseLessonList = [];
    if (res.serviceStatus === "loaded") {
      // eslint-disable-next-line array-callback-return
      res.data.map((x) => {
        console.log(x);
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment,no-empty
        if (props.data.find((y) => y.LessonId === x.LessonId)) {
          // eslint-disable-next-line react/prop-types,react/destructuring-assignment
          chooseLessonList.push(props.data.find((y) => y.LessonId === x.LessonId));
        } else notChooseLesson.push(x);
      });
      console.log(notChooseLesson);
      setLessons(notChooseLesson);
      setChooseLessons(chooseLessonList);
      setSubLessons(res.data);
    }
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Birebir öğrenci başarılı bir şekilde güncellendi."
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

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      StudentName: studentName,
      StudentSurname: studentSurname,
      StudentTcOrPassNo: studentTcOrPassNo,
      StudentEmail: studentEmail,
      SchoolName: schoolName,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      if (chooseLesson.length <= 0) return;
      const res = await post(
        studentId,
        values.StudentName,
        values.StudentSurname,
        values.StudentTcOrPassNo,
        values.StudentEmail,
        phone,
        chooseLesson,
        values.SchoolName
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
        LessonId: event.target.value,
        LessonName: lessons.find((x) => x.LessonId === event.target.value).LessonName,
        LessonCount: 0,
        LessonRemainder: 0,
      },
    ]);
    const newLesson = lessons.filter((x) => x.LessonId !== event.target.value);
    setLessons(newLesson);
  };

  const lessonSelectedDelete = (id) => {
    const deletedLesson = subLessons.find((x) => x.LessonId === id);
    setLessons([...lessons, deletedLesson]);
    setChooseLessons(chooseLesson.filter((x) => x.LessonId !== id));
  };

  const onChangeLessonCount = (count, id, remainderCount) => {
    setChooseLessons([
      ...chooseLesson.filter((x) => x.LessonId !== id),
      {
        LessonId: id,
        LessonName: subLessons.find((x) => x.LessonId === id).LessonName,
        LessonCount: parseInt(count, 10),
        LessonRemainder: remainderCount,
      },
    ]);
  };

  const onChangeLessonRemainderCount = (count, id, lessonCount) => {
    setChooseLessons([
      ...chooseLesson.filter((x) => x.LessonId !== id),
      {
        LessonId: id,
        LessonName: subLessons.find((x) => x.LessonId === id).LessonName,
        LessonCount: lessonCount,
        LessonRemainder: count,
      },
    ]);
  };

  const btnDeleteBranch = async () => {
    const res = await postDelete(studentId);
    if (res.serviceStatus === "loaded") {
      window.location.href = `/faceStudent`;
    } else {
      setErrorMsg("Silme yapılırken bir hata oluştu");
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Birebir Öğrenci Detay" />
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
                  name="StudentName"
                  value={values.StudentName}
                />
                {sendForm === true && errors.StudentName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.StudentName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Soyadı"
                  fullWidth
                  name="StudentSurname"
                  value={values.StudentSurname}
                />
                {sendForm === true && errors.StudentSurname && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.StudentSurname}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Tc"
                  fullWidth
                  name="StudentTcOrPassNo"
                  value={values.StudentTcOrPassNo}
                />
                {sendForm === true && errors.StudentTcOrPassNo && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.StudentTcOrPassNo}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Mail"
                  fullWidth
                  name="StudentEmail"
                  value={values.StudentEmail}
                />
                {sendForm === true && errors.StudentEmail && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.StudentEmail}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Okulu"
                  fullWidth
                  name="SchoolName"
                  value={values.SchoolName}
                />
                {sendForm === true && errors.SchoolName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.SchoolName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MuiPhoneNumber
                  onChange={(e) => setPhone(e)}
                  defaultCountry="tr"
                  name="phone"
                  fullWidth
                  value={phone}
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
                  <Box
                    key={item.LessonId}
                    component="span"
                    ml={1}
                    mb={1}
                    sx={{ border: "1px dashed grey" }}
                  >
                    <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>
                      {item.LessonName}
                    </b>
                    <MDInput
                      type="number"
                      onChange={(event) =>
                        onChangeLessonCount(event.target.value, item.LessonId, item.LessonRemainder)
                      }
                      label="Toplam Ders Sayısı"
                      fullWidth
                      value={item.LessonCount}
                    />
                    <br />
                    <br />
                    <MDInput
                      type="number"
                      onChange={(event) =>
                        onChangeLessonRemainderCount(
                          event.target.value,
                          item.LessonId,
                          item.LessonCount
                        )
                      }
                      label="Kalan Ders Sayısı"
                      disabled
                      fullWidth
                      value={item.LessonRemainder}
                    />
                    <Button>
                      <ClearIcon
                        onClick={() => lessonSelectedDelete(item.LessonId)}
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
                  <MDButton type="button" onClick={() => btnDeleteBranch()} color="error" fullWidth>
                    SİL
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

export default DetailFaceStudentComponent;
