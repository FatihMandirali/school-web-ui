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
import { GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Badge from "@mui/material/Badge";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import useList from "./service/useList";
import useHomeworkTaskCompletedStudents from "./service/useHomeworkTaskCompletedStudents";
import useHomeworkTaskStudents from "./service/useHomeworkTaskStudents";
import MDButton from "../../components/MDButton";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import "../../assets/filter-css/filterbtn.css";
// eslint-disable-next-line import/order
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// eslint-disable-next-line import/order
import CircularProgress from "@mui/material/CircularProgress";
// eslint-disable-next-line import/order
import Stack from "@mui/material/Stack";
import HomeworkTasksComponent from "../../components/HomeworkTasks/HomeworkTasksComponent";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const { service, get } = useList(new Date().toDateString());
  const { getTasksStudents } = useHomeworkTaskStudents();
  const { getTasksCompletedStudents } = useHomeworkTaskCompletedStudents();
  const [invisible, setInvisible] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [openTaskCompletedDialog, setOpenTaskCompletedDialog] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [studentTasks, setStudentTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [temporarySelectedRows, setTemporarySelectedRows] = useState([]);

  const handleEditClick = (id) => () => {
    window.location.href = `/homework_detail/${id}`;
  };

  const clickOpenTaskCompletedDialog = () => {
    setOpenTaskCompletedDialog(false);
  };

  const chooseTemporarySelectedRows = (ids) => {
    setTemporarySelectedRows(ids);
  };
  const handleTaskCompletedClick = (id, homeworkId) => async () => {
    const resCompleted = await getTasksCompletedStudents(0, homeworkId);
    if (resCompleted.serviceStatus === "loaded") {
      const ids = [];
      // eslint-disable-next-line array-callback-return
      resCompleted.data
        .filter((x) => x.IsActive === 1)
        // eslint-disable-next-line array-callback-return
        .map((item) => {
          ids.push(item.StudentId);
        });
      setTemporarySelectedRows(ids);
    }
    console.log(resCompleted);
    const res = await getTasksStudents(id);
    setIsLoading(true);
    if (res.serviceStatus === "loaded") {
      setStudentTasks(res.data);
    }
    setOpenTaskCompletedDialog(true);
    setIsLoading(false);
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: 'lightblue',
            },
            paper: {
              boxShadow: 'none',
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: 'lightblue',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: '6px 15px',
            },
          },
        },
      },
    });
  const columnss = [
    {
      name: "HomeWorkDescription",
      label: "Açıklama",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{value.replace(/<\/?[^>]+(>|$)/g, "")}</div>;
        },
      },
    },
    {
      name: "DateOfTime",
      label: "Ödev Tarihi",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{new Date(value).toLocaleString()}</div>;
        },
      },
    },
    {
      name: "LessonName",
      label: "Ders Adı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "TeacherName",
      label: "Öğretmen Adı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ClassName",
      label: "Sınıf",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ControlType",
      label: "Ödev Durumu",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{value === 1 ? "Kontrol edildi" : "Kontrol edilmedi"}</div>;
        },
      },
    },
    {
      name: "actions",
      label: "İşlemler",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const id = service.data[dataIndex].HomeworkId;
          const ClassId = service.data[dataIndex].ClassId;
          return (
            <>
              <Tooltip title="Detay">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        </Tooltip>,
        <Tooltip title="Teslim Listesi">
          <GridActionsCellItem
            icon={<TaskAltIcon />}
            label="TaskCompleted"
            className="textPrimary"
            onClick={handleTaskCompletedClick(ClassId, id)}
            color="inherit"
          />
        </Tooltip>
            </>
          );
        },
      },
    },
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

  const columnStudents = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
  ];

  const openFilterDialog = () => {
    setOpenFilter(true);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Badge color="secondary" variant="dot" invisible={invisible}>
          <FilterListIcon
            className="filterbtn"
            ml={1}
            fontSize="medium"
            onClick={() => openFilterDialog()}
          >
            Filtrele
          </FilterListIcon>
        </Badge>
      </GridToolbarContainer>
    );
  }

  const btnFilter = async () => {
    await get(createdDate);
    setOpenFilter(false);
    setInvisible(false);
  };

  const toggleDrawer = () => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpenFilter(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ödevler" />
      <MDBox>
        {isLoading ? (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          service.serviceStatus === "loaded" && (
            <>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Ödevler"}
                data={service.data}
                columns={columnss}
                options={options}
              />
            </ThemeProvider>
            </>
          )
        )}
      </MDBox>
      <Drawer anchor="right" open={openFilter} onClose={toggleDrawer()}>
        <MDBox mt={2} style={{ padding: "10px" }}>
          <b>Filtre Ekle</b>
        </MDBox>
        <MDBox style={{ padding: "10px" }}>
          <TextField
            id="datetime-local"
            label="Ödev Tarihi"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            name="createdDate"
            onChange={(event) => setCreatedDate(event.target.value)}
            value={createdDate}
          />
        </MDBox>
        <MDBox style={{ padding: "10px" }}>
          <MDButton
            style={{ backgroundColor: "#0877E5", color: "white", borderRadius: "10px" }}
            type="submit"
            fullWidth
            onClick={() => btnFilter()}
          >
            FİLTRELE
          </MDButton>
        </MDBox>
      </Drawer>

      <HomeworkTasksComponent
        columnStudents={columnStudents}
        openTaskCompletedDialog={openTaskCompletedDialog}
        clickOpenTaskCompletedDialog={clickOpenTaskCompletedDialog}
        studentTasks={studentTasks}
        chooseTemporarySelectedRows={chooseTemporarySelectedRows}
        temporarySelectedRows={temporarySelectedRows}
        isSelected={false}
      />
    </DashboardLayout>
  );
}

export default Tables;
