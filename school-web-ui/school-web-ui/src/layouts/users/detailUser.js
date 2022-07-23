import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useRoleList from "./service/useRoleList";
import useCreate from "./service/useCreate";
import useBranchList from "./service/useBranchList";

function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setuserName] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [pass, setPass] = useState("");
  const [branch, setBranch] = useState("");
  const [tc, setTc] = useState("");
  const { service, get } = useRoleList();
  const { serviceBranch, getBranch } = useBranchList();
  const { service: postService, post } = useCreate();

  useEffect(() => {
    get();
    getBranch();
  }, []);
  const handleChange = (item) => {
    console.log(item.target.value);
    setRoleId(item.target.value);
  };
  const handleChangeBranch = (item) => {
    console.log(item.target.value);
    setBranch(item.target.value);
  };

  const createUser = async (e) => {
    e.preventDefault();
    await post(firstName, surname, userName, roleId, pass, branch, tc);
  };

  return (
    <DashboardLayout>
      <MDBox>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Kullanıcı Oluştur</h1>
          </MDTypography>
        </MDBox>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  label="Adı"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  label="Soyad"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setuserName(e.target.value)}
                  label="Kullanıcı Adı"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" onChange={(e) => setTc(e.target.value)} label="TC" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  label="Şifre"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="password" label="Şifre Tekrar" fullWidth />
              </MDBox>
              {service.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Rolü</InputLabel>
                  <Select
                    label="Rolü"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                  >
                    {service.data.map((u) => (
                      <MenuItem value={u.RoleId}>{u.RoleName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {serviceBranch.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Bölgesi</InputLabel>
                  <Select
                    label="Bölgesi"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChangeBranch}
                  >
                    {serviceBranch.data.map((u) => (
                      <MenuItem value={u.BranchId}>{u.BranchName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {postService.serviceStatus === "loading" ? (
                "Yüklüyor"
              ) : (
                <MDBox mt={4} mb={1}>
                  <MDButton onClick={createUser} color="info" fullWidth>
                    Oluştur
                  </MDButton>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateUser;
