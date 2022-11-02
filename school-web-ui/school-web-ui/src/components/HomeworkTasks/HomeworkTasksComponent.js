import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import localizedTextsMap from "../../tableContentLanguage";
import MDButton from "../MDButton";

function HomeworkTasksComponent({
  openTaskCompletedDialog,
  clickOpenTaskCompletedDialog,
  studentTasks,
  columnStudents,
  chooseTemporarySelectedRows,
  temporarySelectedRows,
  isSelected,
  saveHomeworkTask,
}) {
  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={openTaskCompletedDialog}
      onClose={clickOpenTaskCompletedDialog}
    >
      <DialogTitle>Sınıf Listesi</DialogTitle>
      <DialogContent>
        <div style={{ height: 400, width: "100%" }}>
          {studentTasks.length <= 0 ? (
            <b style={{ textAlign: "center", margin: "auto" }}>
              Bu sınıfa ait öğrenci bulunmamaktadır
            </b>
          ) : (
            <DataGrid
              rows={studentTasks}
              columns={columnStudents}
              pageSize={15}
              pagination
              localeText={localizedTextsMap}
              rowsPerPageOptions={[5, 10, 15]}
              checkboxSelection
              getRowId={(row) => row.StudentId}
              onSelectionModelChange={(ids) => {
                if (!isSelected) return;
                const selectedIDs = new Set(ids);
                console.log(studentTasks);
                // eslint-disable-next-line no-shadow
                const selectedRows = studentTasks.filter((row) => selectedIDs.has(row.StudentId));
                console.log(selectedRows);
                console.log(ids);

                chooseTemporarySelectedRows(ids);
              }}
              selectionModel={temporarySelectedRows}
            />
          )}
        </div>

        <br />
        {isSelected ? (
          studentTasks.length <= 0 ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={9} />

              <Grid item xs={3}>
                <MDButton
                  onClick={saveHomeworkTask}
                  style={{ float: "right" }}
                  variant="gradient"
                  color="success"
                >
                  KAYDET
                </MDButton>
              </Grid>
            </Grid>
          )
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
}

export default HomeworkTasksComponent;
