/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import { CardActionArea, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import useList from "./service/useList";
import useTeacherList from "./service/useTeacherList";
import useCoverList from "./service/useCoverList";
import useRecorStudentList from "./service/useRecorStudentList";
import useNotRecordList from "./service/useNotRecordList";
import useCreate from "./service/useCreate";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import MDInput from "../../components/MDInput";
import MDSnackbar from "../../components/MDSnackbar";

function Tables() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [covers, setCovers] = useState([]);
  const [recordStudents, setRecordStudents] = useState([]);
  const [notRecordStudents, setNotRecordStudents] = useState([]);
  const [coversAll, setCoversAll] = useState([]);
  const [recordStudentsAll, setRecordStudentsAll] = useState([]);
  const [notRecordStudentsAll, setNotRecordStudentsAll] = useState([]);
  const [teachersAll, setTeachersAll] = useState([]);
  const [autoSelecetCovers, setAutoSelecetCovers] = useState([]);
  const [autoSelecetNotRecordStudents, setAutoSelecetNotRecordStudents] = useState([]);
  const [autoSelecetRecordStudents, setAutoSelecetRecordStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [autoSelecetTeachers, setAutoSelecetTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedRecordStudents, setSelectedRecordStudents] = useState([]);
  const [selectedNotRecordStudents, setSelectedNotRecordStudents] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const { get } = useList();
  const { getTeacherList } = useTeacherList();
  const { getCover } = useCoverList();
  const { getRecordStudent } = useRecorStudentList();
  const { getNotRecordList } = useNotRecordList();
  const { post } = useCreate();

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Sms başarılı bir şekilde gönderildi."
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
    const res = await get();
    if (res.serviceStatus === "loaded") {
      setData(res.data.Response.Balance.SmsTotal);
    } else {
      setData("Şuan için gösterilemiyor");
    }
    const resNotRecordStudent = await getNotRecordList();
    if (resNotRecordStudent.serviceStatus === "loaded") {
      const notRecordStudentArray = [];
      notRecordStudentArray.push({
        id: 0,
        label: "Tüm Kayıtsız Öğrenciler",
        type: "NOT_RECORD_STUDENT",
      });
      // eslint-disable-next-line array-callback-return
      resNotRecordStudent.data.map((item) => {
        notRecordStudentArray.push({
          id: item.StudentId,
          label: `${item.StudentName} ${item.StudentSurname}`,
          type: "NOT_RECORD_STUDENT",
        });
      });
      setNotRecordStudents(notRecordStudentArray);
      setNotRecordStudentsAll(resNotRecordStudent.data);
      setAutoSelecetNotRecordStudents(notRecordStudentArray);
    }

    const resRecordStudent = await getRecordStudent();
    if (resRecordStudent.serviceStatus === "loaded") {
      const recordStudentArray = [];
      recordStudentArray.push({ id: 0, label: "Tüm Kayıtlı Öğrenciler", type: "RECORD_STUDENT" });
      // eslint-disable-next-line array-callback-return
      resRecordStudent.data.map((item) => {
        recordStudentArray.push({
          id: item.StudentId,
          label: `${item.StudentName} ${item.StudentSurname}`,
          type: "RECORD_STUDENT",
        });
      });
      setRecordStudents(recordStudentArray);
      setRecordStudentsAll(resRecordStudent.data);
      setAutoSelecetRecordStudents(recordStudentArray);
    }
    const resTeacher = await getTeacherList();
    if (resTeacher.serviceStatus === "loaded") {
      const teachersArray = [];
      teachersArray.push({ id: 0, label: "Tüm Öğretmenler", type: "TEACHER" });
      // eslint-disable-next-line array-callback-return
      resTeacher.data.map((item) => {
        teachersArray.push({
          id: item.TeacherId,
          label: `${item.TeacherName} ${item.TeacherSurname}`,
          type: "TEACHER",
        });
      });
      setTeachers(teachersArray);
      setTeachersAll(resTeacher.data);
      setAutoSelecetTeachers(teachersArray);
    }
    const resCover = await getCover();
    if (resCover.serviceStatus === "loaded") {
      const coversArray = [];
      coversArray.push({ id: 0, label: "Tüm Veliler", type: "COVER" });
      // eslint-disable-next-line array-callback-return
      resCover.data.map((item) => {
        coversArray.push({
          id: item.CoverId,
          label: `${item.CoverName} ${item.CoverSurname}`,
          type: "COVER",
        });
      });
      setCovers(coversArray);
      setCoversAll(resCover.data);
      setAutoSelecetCovers(coversArray);
    }
  }, []);

  const btnOpenDialog = () => {
    setOpenDialog(true);
  };

  const coverSelectedDelete = (item) => {
    if (item.type === "COVER") {
      if (item.id === 0) {
        setAutoSelecetCovers(covers);
        setSelectedCovers([]);
      } else {
        setSelectedCovers(selectedCovers.filter((x) => x.id !== item.id));
        setAutoSelecetCovers([...autoSelecetCovers, item]);
      }
    } else if (item.type === "TEACHER") {
      if (item.id === 0) {
        setAutoSelecetTeachers(teachers);
        setSelectedTeachers([]);
      } else {
        setSelectedTeachers(selectedTeachers.filter((x) => x.id !== item.id));
        setAutoSelecetTeachers([...autoSelecetTeachers, item]);
      }
    } else if (item.type === "RECORD_STUDENT") {
      if (item.id === 0) {
        setAutoSelecetRecordStudents(recordStudents);
        setSelectedRecordStudents([]);
      } else {
        setSelectedRecordStudents(selectedRecordStudents.filter((x) => x.id !== item.id));
        setAutoSelecetRecordStudents([...autoSelecetRecordStudents, item]);
      }
    } else if (item.type === "NOT_RECORD_STUDENT") {
      if (item.id === 0) {
        setAutoSelecetNotRecordStudents(notRecordStudents);
        setSelectedNotRecordStudents([]);
      } else {
        setSelectedNotRecordStudents(selectedRecordStudents.filter((x) => x.id !== item.id));
        setAutoSelecetNotRecordStudents([...autoSelecetNotRecordStudents, item]);
      }
    } else if (item.type === "PHONE_NUMBER") {
      setSelectedCovers(selectedCovers.filter((x) => x.label !== item.label));
    }
  };

  const coverSelected = (event, type) => {
    if (event === null) return;
    if (type === "COVER") {
      if (event.id === 0) {
        setAutoSelecetCovers([]);
        setSelectedCovers([autoSelecetCovers.find((x) => x.id === event.id)]);
      } else {
        setAutoSelecetCovers(autoSelecetCovers.filter((x) => x.id !== event.id));
        setSelectedCovers([...selectedCovers, autoSelecetCovers.find((x) => x.id === event.id)]);
      }
    } else if (type === "TEACHER") {
      if (event.id === 0) {
        setAutoSelecetTeachers([]);
        setSelectedTeachers([autoSelecetTeachers.find((x) => x.id === event.id)]);
      } else {
        setAutoSelecetTeachers(autoSelecetTeachers.filter((x) => x.id !== event.id));
        setSelectedTeachers([
          ...selectedTeachers,
          autoSelecetTeachers.find((x) => x.id === event.id),
        ]);
      }
    } else if (type === "RECORD_STUDENT") {
      if (event.id === 0) {
        setAutoSelecetRecordStudents([]);
        setSelectedRecordStudents([autoSelecetRecordStudents.find((x) => x.id === event.id)]);
      } else {
        setAutoSelecetRecordStudents(autoSelecetRecordStudents.filter((x) => x.id !== event.id));
        setSelectedRecordStudents([
          ...selectedRecordStudents,
          autoSelecetRecordStudents.find((x) => x.id === event.id),
        ]);
      }
    } else if (type === "NOT_RECORD_STUDENT") {
      if (event.id === 0) {
        setAutoSelecetNotRecordStudents([]);
        setSelectedNotRecordStudents([autoSelecetNotRecordStudents.find((x) => x.id === event.id)]);
      } else {
        setAutoSelecetNotRecordStudents(
          autoSelecetNotRecordStudents.filter((x) => x.id !== event.id)
        );
        setSelectedNotRecordStudents([
          ...selectedNotRecordStudents,
          autoSelecetNotRecordStudents.find((x) => x.id === event.id),
        ]);
      }
    } else if (type === "PHONE_NUMBER") {
      setSelectedCovers([...selectedCovers, { id: 0, label: event, type: "PHONE_NUMBER" }]);
    }
  };
  const ApplySendForm = async () => {
    setSendForm(true);
    if (message === "" || message === " ") return;
    const phones = [];
    console.log(selectedCovers);

    const selectedCoverList = selectedCovers.filter((x) => x.type === "COVER");
    const selectedPhoneNumberList = selectedCovers.filter((x) => x.type === "PHONE_NUMBER");
    const selectedTeacherList = selectedTeachers.filter((x) => x.type === "TEACHER");
    const selectedRecordStudentList = selectedRecordStudents.filter(
      (x) => x.type === "RECORD_STUDENT"
    );
    const selectedNotRecordStudentList = selectedNotRecordStudents.filter(
      (x) => x.type === "NOT_RECORD_STUDENT"
    );

    if (selectedNotRecordStudentList.length > 0) {
      if (selectedNotRecordStudentList[0].id === 0) {
        // eslint-disable-next-line array-callback-return
        notRecordStudentsAll.map((item) => {
          phones.push(item.StudentPhoneNumber);
        });
      } else {
        // eslint-disable-next-line array-callback-return
        selectedNotRecordStudentList.map((item) => {
          phones.push(notRecordStudentsAll.find((x) => x.StudentId === item.id).StudentPhoneNumber);
        });
      }
    }

    if (selectedRecordStudentList.length > 0) {
      if (selectedRecordStudentList[0].id === 0) {
        // eslint-disable-next-line array-callback-return
        recordStudentsAll.map((item) => {
          phones.push(item.StudentPhoneNumber);
        });
      } else {
        // eslint-disable-next-line array-callback-return
        selectedRecordStudentList.map((item) => {
          phones.push(recordStudentsAll.find((x) => x.StudentId === item.id).StudentPhoneNumber);
        });
      }
    }

    if (selectedTeacherList.length > 0) {
      if (selectedTeacherList[0].id === 0) {
        // eslint-disable-next-line array-callback-return
        teachersAll.map((item) => {
          phones.push(item.TeacherPhone);
        });
      } else {
        // eslint-disable-next-line array-callback-return
        selectedTeacherList.map((item) => {
          phones.push(teachersAll.find((x) => x.TeacherId === item.id).TeacherPhone);
        });
      }
    }

    if (selectedCoverList.length > 0) {
      if (selectedCoverList[0].id === 0) {
        // eslint-disable-next-line array-callback-return
        coversAll.map((item) => {
          phones.push(item.CoverPhoneNumber);
        });
      } else {
        // eslint-disable-next-line array-callback-return
        selectedCoverList.map((item) => {
          phones.push(coversAll.find((x) => x.CoverId === item.id).CoverPhoneNumber);
        });
      }
    }

    // eslint-disable-next-line array-callback-return
    selectedPhoneNumberList.map((item) => {
      phones.push(item.label);
    });
    console.log(phones);
    const newPhones = [];
    // eslint-disable-next-line array-callback-return
    phones.map((item) => {
      newPhones.push(item.replaceAll(" ", "").replaceAll("+90", ""));
    });

    console.log(newPhones);

    if (newPhones.length <= 0) {
      setErrorMsg("Lütfen herhangi bir numara girin veya seçin.");
      openErrorSB();
      return;
    }

    const res = await post(newPhones, message);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      window.location.href = "/sms";
    } else {
      setErrorMsg("Sms gönderilirken bir sorun oluştu");
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Sms İşlemleri" />
      <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" />
        <MDButton onClick={() => btnOpenDialog()} size="small" variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>send</Icon>
          &nbsp;SMS GÖNDER
        </MDButton>
      </MDBox>
      <Box>
        <Grid container spacing={0.5}>
          <Grid textAlign="center" bgcolor="white" item mb={5} xs={3}>
            <CardActionArea>
              <Card style={{ padding: "50px" }}>
                <span>
                  <span style={{ fontSize: "20px" }}>Kalan Sms Sayısı : </span>
                  <b style={{ fontSize: "20px" }}>{data}</b>
                </span>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Box>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sms Gönder</DialogTitle>
        <DialogContent>
          <MDInput
            style={{ marginTop: "5px" }}
            type="text"
            onChange={(event) => setMessage(event.target.value)}
            label="Mesaj"
            fullWidth
            name="msj"
          />
          {sendForm === true && (message === "" || message === " ") && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">Lütfen mesajı girin</Alert>
            </Stack>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <MDInput
                style={{ marginTop: "15px" }}
                type="text"
                onChange={(event) => setPhoneNumber(event.target.value)}
                label="Numara*(5334445500)"
                fullWidth
                name="phoneNumber"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDButton
                style={{ marginTop: "15px" }}
                type="button"
                onClick={() => coverSelected(phoneNumber, "PHONE_NUMBER")}
                color="info"
                fullWidth
              >
                Ekle
              </MDButton>
            </Grid>
          </Grid>
          <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            onChange={(event, newValue) => {
              coverSelected(newValue, "COVER");
            }}
            options={autoSelecetCovers}
            renderInput={(params) => <TextField {...params} label="Veliler" />}
            style={{
              height: "15px",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "20px",
              float: "left",
            }}
          />
          <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            onChange={(event, newValue) => {
              coverSelected(newValue, "TEACHER");
            }}
            options={autoSelecetTeachers}
            renderInput={(params) => <TextField {...params} label="Öğretmenler" />}
            style={{
              height: "15px",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "30px",
              float: "left",
            }}
          />
          <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            onChange={(event, newValue) => {
              coverSelected(newValue, "RECORD_STUDENT");
            }}
            options={autoSelecetRecordStudents}
            renderInput={(params) => <TextField {...params} label="Kayıtlı Öğrenciler" />}
            style={{
              height: "15px",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "50px",
              float: "left",
            }}
          />
          <Autocomplete
            fullWidth
            id="free-solo-demo"
            freeSolo
            onChange={(event, newValue) => {
              coverSelected(newValue, "NOT_RECORD_STUDENT");
            }}
            options={autoSelecetNotRecordStudents}
            renderInput={(params) => <TextField {...params} label="Kayıtsız Öğrenciler" />}
            style={{
              height: "15px",
              margin: "auto",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "50px",
              float: "left",
            }}
          />
          <Grid mt={35} textAlign="center" container spacing={2}>
            {selectedCovers.map((item) => (
              <Box component="span" ml={2} mb={2} sx={{ border: "1px dashed grey" }}>
                <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>{item.label}</b>
                <Button>
                  <ClearIcon
                    onClick={() => coverSelectedDelete(item)}
                    style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                  />
                </Button>
              </Box>
            ))}
            {selectedTeachers.map((item) => (
              <Box component="span" ml={2} mb={2} sx={{ border: "1px dashed grey" }}>
                <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>{item.label}</b>
                <Button>
                  <ClearIcon
                    onClick={() => coverSelectedDelete(item)}
                    style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                  />
                </Button>
              </Box>
            ))}
            {selectedRecordStudents.map((item) => (
              <Box component="span" ml={2} mb={2} sx={{ border: "1px dashed grey" }}>
                <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>{item.label}</b>
                <Button>
                  <ClearIcon
                    onClick={() => coverSelectedDelete(item)}
                    style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                  />
                </Button>
              </Box>
            ))}
            {selectedNotRecordStudents.map((item) => (
              <Box component="span" ml={2} mb={2} sx={{ border: "1px dashed grey" }}>
                <b style={{ padding: "2px", marginLeft: "10px", fontSize: "15px" }}>{item.label}</b>
                <Button>
                  <ClearIcon
                    onClick={() => coverSelectedDelete(item)}
                    style={{ margin: "auto", alignContent: "center", textAlign: "center" }}
                  />
                </Button>
              </Box>
            ))}
          </Grid>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" onClick={() => ApplySendForm()} color="dark" fullWidth>
              Gönder
            </MDButton>
          </MDBox>
        </DialogContent>
      </Dialog>
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
