import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import useBranchList from "./service/useBranchList";
import useTeacherList from "./service/useTeacherList";
import useCourseList from "./service/useCourseList";
import { validationSchema } from "./validations/classValidation";
import MDSnackbar from "../../components/MDSnackbar";

function CreateClasses() {
  const { serviceBranch, getBranch } = useBranchList();
  const { serviceTeacher, getTeacher } = useTeacherList();
  const { service: postService, post } = useCreate();
  const { serviceCourse, getCourse } = useCourseList();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [branchId] = useState(0);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Sınıf başarılı bir şekilde eklendi."
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
    await getBranch();
    await getCourse();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      className: "",
      courseId: 0,
      teacherId: 0,
      branchId,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.className, values.courseId, values.teacherId, values.branchId);
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
    await getTeacher(values.branchId);
  }, [values.branchId]);

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Sınıf Oluştur</h1>
          </MDTypography>
        </MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Sınıf Adı"
                  fullWidth
                  name="className"
                />
                {sendForm === true && errors.className && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.className}</Alert>
                  </Stack>
                )}
              </MDBox>

              {serviceCourse.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Kurs</InputLabel>
                  <Select
                    label="Kurs"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="courseId"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceCourse.data.map((u) => (
                      <MenuItem key={u.CourseId} value={u.CourseId}>
                        {u.CourseName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.courseId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.courseId}</Alert>
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
              {values.branchId > 0 && serviceTeacher.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Rehber Öğretmeni</InputLabel>
                  <Select
                    label="Sınıf Rehber Öğretmeni"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="teacherId"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceTeacher.data.map((u) => (
                      <MenuItem key={u.TeacherId} value={u.TeacherId}>
                        {u.TeacherName} {u.TeacherSurname}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.teacherId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.teacherId}</Alert>
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

export default CreateClasses;
