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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Grid, FormControl, FormControlLabel, FormGroup, InputLabel, Select } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import httpservice from "../../httpservice/httpservice";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Label } from "@mui/icons-material";

function AttendanceList() {
  const [data, setData] = useState([]);
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(moment().startOf("day").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().add(1, "days").format("YYYY-MM-DD"));

  const getDataApi = async () => {
    try {
      const res = await httpservice.get(
        `JoinTakesControllers/JoinList?startDate=${startDate}&endDate=${endDate}`
      );
      const value = {
        data: res.data,
      };
      setData(res.data);
    } catch (error) {
      console.log("errorr", error);
    }
  };
  useEffect(() => {
    getDataApi();
  }, []);
  const handleEditClick = (id) => () => {
    window.location.href = `/lesson_detail/${id}`;
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: "lightblue",
            },
            paper: {
              boxShadow: "none",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: "lightblue",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: "6px 15px",
            },
          },
        },
      },
    });
  const columnss = [
    {
      name: "StudentName",
      label: "Adı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "StudentSurname",
      label: "Soyadı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ClassName",
      label: "Sınıfı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "LessonName",
      label: "Dersi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "SendDate",
      label: "Devamsızlık Tarihi",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ wordBreak: "break-word" }}>
              {moment(value).format("YYYY-MM-DD HH:mm")}
            </div>
          );
        },
      },
    },
    // {
    //   name: "actions",
    //   label: "Detay",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       const id = service.data[dataIndex].LessonId;
    //       return (
    //         <>
    //           <GridActionsCellItem
    //             icon={<EditIcon />}
    //             label="Edit"
    //             className="textPrimary"
    //             onClick={handleEditClick(id)}
    //             color="inherit"
    //           />
    //         </>
    //       );
    //     },
    //   },
    // },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    filter: false,
    download: false,
    print: false,
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 100, 200, 500],
    textLabels: {
      body: {
        noMatch: "Üzgünüz, eşleşen kayıt bulunamadı",
      },
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Yoklama Listesi" />
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
          <label>Başlangıç ​​tarihi</label>
            <Flatpickr
              options={{ dateFormat: "Y-m-d" }}
              placeholder="Başlangıç ​​tarihi"
              style={{ marginRight: "10px" }}
              value={startDate}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              onChange={(date) => {
                setStartDate(moment(date[0]).format("YYYY-MM-DD"));
              }}
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <label>Bitiş tarihi</label>
            <Flatpickr
              options={{ dateFormat: "Y-m-d" }}
              placeholder="Bitiş tarihi"
              style={{ marginRight: "10px" }}
              value={endDate}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              onChange={(date) => {
                setEndDate(moment(date[0]).format("YYYY-MM-DD"));
              }}
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <MDButton style={{marginTop:"30px"}} size="md" variant="gradient" color="dark" onClick={() => getDataApi()}>
              <Icon sx={{ fontWeight: "bold" }}>search</Icon>
              &nbsp;Aramak
            </MDButton>
          </Grid>
        </Grid>
        {/* <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/lesson_create" style={{ color: "#FFF" }}>
            <MDButton size="small" variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;ekle
            </MDButton>
          </Link>
        </MDBox> */}
        <>
        <div style={{marginTop:"30px"}}>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable title={"Yoklama Listesi"} data={data} columns={columnss} options={options} />
          </ThemeProvider>
          </div>
        </>
      </MDBox>
    </DashboardLayout>
  );
}

export default AttendanceList;
