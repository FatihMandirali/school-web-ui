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

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "../../components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import useList from "./service/useList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../tableContentLanguage";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function Tables() {
  const [email, setEmail] = useState(0);
  const { service, get } = useList(email);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Sınav İşlemleri" />
      <MDBox>
        <form>
          <MDBox pt={4} pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid md={6}>
                {/* <input type="file" /> */}
                <Button
                  variant="contained"
                  component="label"
                  id="file"
                  style={{ color: "#fff", marginBottom: "10px" }}
                >
                  Upload Text File
                  <input type="file" hidden />
                </Button>
                <InputLabel style={{ marginBottom: "5px" }} htmlFor="file">
                  sınav dökümanını yüklemek için. tıklayınız bu döküman txt olmak zorunda
                </InputLabel>
              </Grid>
              <Grid md={6}>
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Kurs</InputLabel>
                  <Select
                    label="Sınav Türünü Seçiniz"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    // onChange={handleChange}
                    defaultValue={0}
                    name="courseId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {/* {serviceCourse.data.map((u) => (
                      <MenuItem key={u.CourseId} value={u.CourseId}>
                      {u.CourseName}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={12}>
                <InputLabel
                  style={{ marginBottom: "5px", fontSize: "18px", marginTop: "10px" }}
                  htmlFor="file"
                >
                  cevap anahtarı girmek istrtseniz textArea doldurunuz
                </InputLabel>
                <TextareaAutosize
                  aria-label="Buraya yaz"
                  minRows={10}
                  placeholder="Buraya yaz...."
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "transparent",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
              <MDButton type="submit" color="dark" fullWidth>
                gönder
              </MDButton>
            </Grid>
          </MDBox>
        </form>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
