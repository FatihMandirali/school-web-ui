import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function CoverAddForStudent({ openDialog, setClickOpenDialog }) {
  console.log(openDialog);
  return (
    <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={setClickOpenDialog(false)}>
      <DialogTitle>Veli Oluştur</DialogTitle>
      <DialogContent>Deneme</DialogContent>
    </Dialog>
  );
}

export default CoverAddForStudent;
