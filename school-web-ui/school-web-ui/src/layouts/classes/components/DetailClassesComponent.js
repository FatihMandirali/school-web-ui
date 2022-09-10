import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import useBranchList from "../service/useBranchList";
import useTeacherList from "../service/useTeacherList";
import useCourseList from "../service/useCourseList";
import { validationSchema } from "../validations/classValidation";
import MDSnackbar from "../../../components/MDSnackbar";

function CreateClasses(props) {
  const { serviceBranch, getBranch } = useBranchList();
  const { serviceTeacher, getTeacher } = useTeacherList();
  const { service: postService, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const { serviceCourse, getCourse } = useCourseList();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [branchId] = useState(props.branchId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [classId] = useState(props.classId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [teacherId] = useState(props.teacherId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [courseType] = useState(props.courseType);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [className] = useState(props.className);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Sınıf başarılı bir şekilde güncellendi."
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

  const btnDeleteBranch = async () => {
    const res = await postDelete(classId);
    if (res.serviceStatus === "loaded") {
      window.location.href = `/classes`;
    } else {
      setErrorMsg(res.errorMessage);
      openErrorSB();
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      className,
      courseId: courseType,
      teacherId,
      branchId,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        classId,
        values.className,
        values.courseId,
        values.teacherId,
        values.branchId
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
    if (values.branchId === undefined) return;
    await getTeacher(values.branchId);
  }, [values.branchId]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Sınıf Adı"
              fullWidth
              name="className"
              value={values.className}
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
                defaultValue={values.courseId}
                name="courseId"
                value={values.courseId}
                className="specificSelectBox"
              >
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
                defaultValue={values.branchId}
                name="branchId"
                value={values.branchId}
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
          {values.branchId > 0 && serviceTeacher.serviceStatus === "loaded" && (
            <FormControl mb={5} fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Öğretmen</InputLabel>
              <Select
                label="Öğretmen"
                displayEmpty
                variant="outlined"
                margin="dense"
                fullWidth
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={handleChange}
                defaultValue={values.teacherId}
                name="teacherId"
                value={values.teacherId}
                className="specificSelectBox"
              >
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
      {renderSuccessSB}
      {renderErrorSB}
    </>
  );
}

export default CreateClasses;
