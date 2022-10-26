import Card from "@mui/material/Card";
import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import EditorToolbar, { modules } from "../editor/EditorToolbar";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import { validationSchema } from "../validations";
import MDSnackbar from "../../../../components/MDSnackbar";
import useClassList from "../service/useClassList";
import useLessonList from "../service/useLessonList";

function DetailHomeworkComponent(props) {
  const { service } = useClassList();
  const { serviceLessonList } = useLessonList();
  const { serviceUpdate, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [description, setDescription] = useState(props.homeWorkDescription);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [classId] = useState(props.classId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [homeworkId] = useState(props.homeworkId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [lessonId] = useState(props.lessonId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [endDate] = useState(props.endDate);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Ödev başarılı bir şekilde güncellendi."
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
      lessonId,
      classId,
      endDate,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        description,
        values.lessonId,
        values.classId,
        values.endDate,
        homeworkId
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  const btnDeleteHomework = async () => {
    await postDelete(homeworkId);
    window.location.href = `/teacherHomework`;
  };

  return (
    <MDBox>
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox pt={4} pb={3} px={3}>
            {service.serviceStatus === "loaded" && (
              <FormControl mb={5} fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Sınıf</InputLabel>
                <Select
                  label="Sınıf"
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
                  <MenuItem key={0} value={0}>
                    Seçiniz
                  </MenuItem>
                  {service.data.map((u) => (
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

            {serviceLessonList.serviceStatus === "loaded" && (
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
                  <MenuItem key={0} value={0}>
                    Seçiniz
                  </MenuItem>
                  {serviceLessonList.data.map((u) => (
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

            <MDBox mb={2}>
              <TextField
                id="datetime-local"
                label="Ödev Bitiş Tarihi"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
              />
              {sendForm === true && errors.endDate && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.endDate}</Alert>
                </Stack>
              )}
            </MDBox>
            <MDBox mb={2}>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                name="description"
                value={description}
                onChange={setDescription}
                placeholder="Lütfen Açıklamanızı Yazın..."
                modules={modules}
              />
            </MDBox>

            {serviceUpdate.serviceStatus === "loading" ? (
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
                <MDButton type="button" onClick={() => btnDeleteHomework()} color="error" fullWidth>
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
  );
}

export default DetailHomeworkComponent;
