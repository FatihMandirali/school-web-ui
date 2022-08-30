import { useEffect, useState } from "react";
import {
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Modal,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useLessonByProgramList from "./service/useLessonByProgramList";
import useFindOneOnOneQuery from "./service/useFindOneOnOneQuery";
import MDSnackbar from "../../components/MDSnackbar";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateOneOnOne() {
  const { serviceLessonList, getLesson } = useLessonByProgramList();
  const { getOneonOne } = useFindOneOnOneQuery();
  const [sendForm, setSendForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg] = useState("");
  const [lesson, setLesson] = useState("");
  const [date, setDate] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  // const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const data = [
    {
      clock: "09:00-09:40",
      teacherName: "fatih mandıralı",
      lessonName: "Matematik",
    },
    {
      clock: "10:00-10:40",
      teacherName: "fatih mandıralı",
      lessonName: "Fen",
    },
  ];

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Bire bir ders başarıyla seçildi."
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
  }, []);

  const searchOneofOne = async () => {
    // todo: lesson seçildi ve tarih kontrolü yap
    const res = await getOneonOne(lesson, date);
    console.log(res);
    setOpenDialog(false);
    setSendForm(true);
  };
  const chooseOneonOne = async () => {
    setOpenModal(true);
  };
  const btnSaveOneonOne = async () => {
    openSuccessSB();
    setOpenModal(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Bire Bir Ders Oluştur" />
      {openDialog === false && (
        <Box>
          <Grid container spacing={1}>
            {data.map((item) => (
              <Grid
                textAlign="center"
                mt={1}
                fontSize={13}
                item
                xs={3}
                onClick={() => chooseOneonOne()}
              >
                <CardActionArea>
                  <Card>
                    <span>
                      <b>Saat :</b> {item.clock}
                    </span>
                    <span>
                      <b>Ders :</b> {item.lessonName}
                    </span>
                    <span>
                      <b>Öğretmen :</b> {item.teacherName}
                    </span>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {renderSuccessSB}
      {renderErrorSB}
      <Dialog maxWidth="xl" fullWidth open={openDialog}>
        <DialogTitle>Bire bir ders sorgula</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <MDInput
              id="datetime-local"
              label="Bitiş Tarihi"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              name="sharingEndDate"
              onChange={(event) => setDate(event.target.value)}
              value={date}
            />
          </Box>

          <Box mt={2}>
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
                  onChange={(event) => setLesson(event.target.value)}
                  defaultValue={0}
                  name="lessonId"
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
                {sendForm === true && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">Lütfen ders seçiniz.</Alert>
                  </Stack>
                )}
              </FormControl>
            )}
          </Box>
          <MDBox
            pt={2}
            py={2}
            px={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h6" fontWeight="medium" />
            <MDButton
              type="submit"
              onClick={() => searchOneofOne()}
              variant="gradient"
              color="dark"
            >
              &nbsp;Sorgula
            </MDButton>
          </MDBox>
        </DialogContent>
      </Dialog>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Birebir dersi onaylamak istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenModal(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => btnSaveOneonOne()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default CreateOneOnOne;
