import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MuiPhoneNumber from "material-ui-phone-number";
import MDInput from "../MDInput";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import { validationSchema } from "../../layouts/students/validations/studentValidation";
import useBranchList from "../../layouts/students/service/useBranchList";
import MDSnackbar from "../MDSnackbar";
import useCountryList from "../../layouts/students/service/useCountryList";
import useClassList from "../../layouts/students/service/useClassList";
import useCoverList from "../../layouts/students/service/useCoverList";
import useUpdate from "../../layouts/students/service/useUpdate";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import useDelete from "../../layouts/students/service/useDelete";

function DetailStudentComponent(props) {
  console.log(props);
  const { serviceDelete, postDelete } = useDelete();
  const { service, get } = useCountryList();
  const { serviceBranch, getBranch } = useBranchList();
  const { serviceClass, getClass } = useClassList();
  const { serviceCover, getCover } = useCoverList();
  const { postService, post } = useUpdate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isActiveRecord] = useState(false);

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentId] = useState(props.studentId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentNo] = useState(props.studentNo);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentName] = useState(props.studentName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentSurname] = useState(props.studentSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentTcOrPassNo] = useState(props.studentTcOrPassNo);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adress] = useState(props.adress);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentEmail] = useState(props.studentEmail);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [branchId] = useState(props.branchId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [country] = useState(props.country);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentPerId] = useState(props.studentPerId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentPerId2, setStudentPerId2] = useState(props.studentPerId2);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentPerId3, setStudentPerId3] = useState(props.studentPerId3);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentPhoneNumber, setStudentPhoneNumber] = useState(props.studentPhoneNumber);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [studentClass] = useState(props.studentClass);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Öğrenci başarılı bir şekilde güncellendi."
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
    await getClass(branchId);
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      studentNo,
      studentName,
      studentSurName: studentSurname,
      studentIdName: studentTcOrPassNo,
      adress,
      country,
      email: studentEmail,
      classId: studentClass,
      branchId,
      studentPerId,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        studentId,
        values.studentNo,
        values.studentName,
        values.studentSurName,
        values.studentIdName,
        values.adress,
        values.country,
        values.email,
        values.classId,
        values.branchId,
        studentPhoneNumber,
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

  const btnDeleteStudent = async () => {
    const res = await postDelete(studentId);
    if (res.serviceStatus === "loaded") {
      window.location.href = `/student_records`;
    } else {
      setErrorMsg(res.errorMessage);
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğrenci Detay" />
      <MDBox>
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
                  value={values.studentNo}
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
                  value={values.studentName}
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
                  value={values.studentSurName}
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
                  value={values.studentIdName}
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
                  value={values.adress}
                />
                {sendForm === true && errors.adress && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.adress}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Email"
                  fullWidth
                  name="email"
                  value={values.email}
                />
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
                    className="specificSelectBox"
                    value={values.branchId}
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
                    value={values.classId}
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
                    className="specificSelectBox"
                    value={values.country}
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
                    className="specificSelectBox"
                    value={values.studentPerId}
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
                    className="specificSelectBox"
                    value={studentPerId2}
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
                    className="specificSelectBox"
                    value={studentPerId3}
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
                  onChange={(e) => setStudentPhoneNumber(e)}
                  defaultCountry="tr"
                  name="coverPhoneNumber"
                  fullWidth
                  value={studentPhoneNumber}
                />
              </MDBox>
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
                  <MDButton
                    type="button"
                    onClick={() => btnDeleteStudent()}
                    color="error"
                    fullWidth
                  >
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

export default DetailStudentComponent;
