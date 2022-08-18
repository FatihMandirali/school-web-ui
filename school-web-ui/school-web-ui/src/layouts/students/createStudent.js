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
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCountryList from "./service/useCountryList";
import useCreate from "./service/useCreate";
import useBranchList from "./service/useBranchList";
import useClassList from "./service/useClassList";
import useCoverList from "./service/useCoverList";
import { validationSchema } from "./validations/studentValidation";
import MDSnackbar from "../../components/MDSnackbar";

function CreateStudent() {
  const { service, get } = useCountryList();
  const { serviceBranch, getBranch } = useBranchList();
  const { serviceClass, getClass } = useClassList();
  const { serviceCover, getCover } = useCoverList();
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [studentPerId2, setStudentPerId2] = useState(0);
  const [studentPerId3, setStudentPerId3] = useState(0);
  const [isActiveRecord] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Kullanıcı başarılı bir şekilde eklendi."
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
    await get();
    await getBranch();
    await getCover();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      studentNo: "",
      studentName: "",
      studentSurName: "",
      studentIdName: "",
      adress: "",
      country: 0,
      email: "",
      classId: 0,
      branchId: 0,
      studentPerId: 0,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        values.studentNo,
        values.studentName,
        values.studentSurName,
        values.studentIdName,
        values.adress,
        values.country,
        values.email,
        values.classId,
        values.branchId,
        phone,
        values.studentPerId,
        studentPerId2,
        studentPerId3,
        isActiveRecord
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

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Öğrenci Oluştur</h1>
          </MDTypography>
        </MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Öğrenci Numarası"
                  fullWidth
                  name="studentNo"
                />
                {sendForm === true && errors.studentNo && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.studentNo}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Adı"
                  fullWidth
                  name="studentName"
                />
                {sendForm === true && errors.studentName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.studentName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="studentSurName"
                  type="text"
                  onChange={handleChange}
                  label="Soyadı"
                  fullWidth
                />
                {sendForm === true && errors.studentSurName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.studentSurName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="studentIdName"
                  type="text"
                  onChange={handleChange}
                  label="Kimlik Bilgisi"
                  fullWidth
                />
                {sendForm === true && errors.studentIdName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.studentIdName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Adres"
                  fullWidth
                  name="adress"
                />
                {sendForm === true && errors.adress && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.adress}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" onChange={handleChange} label="Email" fullWidth name="email" />
                {sendForm === true && errors.email && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.email}</Alert>
                  </Stack>
                )}
              </MDBox>

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

              {service.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Ülkesi</InputLabel>
                  <Select
                    label="Ülkesi"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="country"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {service.data.map((u) => (
                      <MenuItem key={u.Id} value={u.Id}>
                        {u.Name}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.country && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.country}</Alert>
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

              {serviceCover.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Veli 1</InputLabel>
                  <Select
                    label="Veli 1"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="studentPerId"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceCover.data.map((u) => (
                      <MenuItem key={u.CoverId} value={u.CoverId}>
                        {u.CoverName} {u.CoverSurname}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.studentPerId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.studentPerId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              {serviceCover.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Veli 2</InputLabel>
                  <Select
                    label="Veli 2"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={() => setStudentPerId2()}
                    defaultValue={0}
                    name="studentPerId2"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceCover.data.map((u) => (
                      <MenuItem key={u.CoverId} value={u.CoverId}>
                        {u.CoverName} {u.CoverSurname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {serviceCover.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Veli 3</InputLabel>
                  <Select
                    label="Veli 3"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={() => setStudentPerId3()}
                    defaultValue={0}
                    name="studentPerId3"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceCover.data.map((u) => (
                      <MenuItem key={u.CoverId} value={u.CoverId}>
                        {u.CoverName} {u.CoverSurname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <MDBox mb={2}>
                <MuiPhoneNumber
                  onChange={(e) => setPhone(e)}
                  defaultCountry="tr"
                  name="coverPhoneNumber"
                  fullWidth
                />
              </MDBox>
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

export default CreateStudent;