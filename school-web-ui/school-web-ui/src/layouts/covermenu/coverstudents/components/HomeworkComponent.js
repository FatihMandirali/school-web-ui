import Card from "@mui/material/Card";
import { useState } from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import MDBox from "../../../../components/MDBox";
import MDSnackbar from "../../../../components/MDSnackbar";
import useClassList from "../service/useClassList";
import useLessonList from "../service/useLessonList";

function DetailHomeworkComponent(props) {
  const { service } = useClassList();
  const { serviceLessonList } = useLessonList();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg] = useState("");

  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [description] = useState(props.homeWorkDescription);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [classId] = useState(props.classId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [lessonId] = useState(props.lessonId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [endDate] = useState(props.endDate);

  const closeSuccessSB = () => setSuccessSB(false);
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

  return (
    <MDBox>
      <Card>
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
                disabled
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                defaultValue={classId}
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
                disabled
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                defaultValue={lessonId}
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
              disabled
              fullWidth
              name="endDate"
              value={endDate}
            />
          </MDBox>
          <MDBox mb={2}>
            <iframe style={{ width: "100%" }} srcDoc={description} />
          </MDBox>
        </MDBox>
      </Card>
      {renderSuccessSB}
      {renderErrorSB}
    </MDBox>
  );
}

export default DetailHomeworkComponent;
