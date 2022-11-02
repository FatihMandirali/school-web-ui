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

import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import FilterListIcon from "@mui/icons-material/FilterList";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";
import MDButton from "../../../components/MDButton";
import useHomeworkList from "./service/useList";
import useHomeworkTaskStudents from "../../homework/service/useHomeworkTaskStudents";
import HomeworkTasksComponent from "../../../components/HomeworkTasks/HomeworkTasksComponent";

function Tables() {
  const { service, get } = useHomeworkList(new Date().toDateString());
  const [invisible, setInvisible] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [homeWorks, setHomeWorks] = useState([]);
  const { getTasksStudents } = useHomeworkTaskStudents();
  const [studentTasks, setStudentTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [temporarySelectedRows, setTemporarySelectedRows] = useState([]);
  const [openTaskCompletedDialog, setOpenTaskCompletedDialog] = useState(false);

  useEffect(async () => {
    const res = await get(new Date().toDateString());
    if (res.serviceStatus === "loaded") {
      setHomeWorks(res.data);
    }
  }, []);

  const clickOpenTaskCompletedDialog = () => {
    setOpenTaskCompletedDialog(false);
    setTemporarySelectedRows([]);
  };

  const chooseTemporarySelectedRows = (ids) => {
    setTemporarySelectedRows(ids);
  };
  const handleTaskCompletedClick = (id) => async () => {
    const res = await getTasksStudents(id);
    setIsLoading(true);
    if (res.serviceStatus === "loaded") {
      setStudentTasks(res.data);
    }
    setOpenTaskCompletedDialog(true);
    setIsLoading(false);
  };

  const columnStudents = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
  ];

  const handleEditClick = (id) => () => {
    window.location.href = `/studentmenuhomework_detail/${id}`;
  };

  const columns = [
    {
      field: "HomeWorkDescription",
      headerName: "Açıklama",
      width: 100,
      valueGetter: (params) => params.value.replace(/<\/?[^>]+(>|$)/g, ""),
    },
    {
      field: "DateOfTime",
      headerName: "Ödev Tarihi",
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    { field: "LessonName", headerName: "Ders Adı", width: 150 },
    { field: "TeacherName", headerName: "Öğretmen Adı", width: 150 },
    {
      field: "IsActive",
      headerName: "Ödev Durumu",
      width: 150,
      valueGetter: (params) =>
        // eslint-disable-next-line no-nested-ternary
        params.value === null
          ? "Kontrol Edilmedi"
          : params.value === 0
          ? "Ödev Yapılmadı"
          : "Ödev Yapıldı",
    },
    {
      field: "ControlDateTime",
      headerName: "Ödev Açıklanma Tarihi",
      width: 200,
      valueGetter: (params) =>
        // eslint-disable-next-line no-nested-ternary
        params.value === null ? "Kontrol Edilmedi" : new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Detay",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <Tooltip title="Detay">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.row.HomeworkId)}
            color="inherit"
          />
        </Tooltip>,
        <Tooltip title="Teslim Listesi">
          <GridActionsCellItem
            icon={<TaskAltIcon />}
            label="TaskCompleted"
            className="textPrimary"
            onClick={handleTaskCompletedClick(1)}
            color="inherit"
          />
        </Tooltip>,
      ],
    },
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
    const res = await get(createdDate);
    if (res.serviceStatus === "loaded") {
      setHomeWorks(res.data);
    }
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
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={homeWorks}
              columns={columns}
              pageSize={8}
              pagination
              localeText={localizedTextsMap}
              getRowId={(row) => row.HomeworkId}
              components={{ Toolbar: CustomToolbar }}
              rowsPerPageOptions={[5, 10, 15]}
              loading={service.serviceStatus === "loading"}
            />
          </div>
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
