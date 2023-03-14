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

import { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import { sessionStorageService } from "../../httpservice/sessionStorageService";
import MDInput from "../../components/MDInput";
import useUpdate from "./services/useUpdate";
import MDSnackbar from "../../components/MDSnackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const [opening, setOpening] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const [availablePassword, setAvailablePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const { post } = useUpdate();

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
      content="Tebrikler, Şifre başarıyla güncellendi."
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

  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
  };
  const logOut = () => {
    setOpening(true);
  };
  const logOutConfirm = () => {
    sessionStorageService.returnClearToken();
    localStorage.removeItem("fullName")
    window.location.href = "/authentication/sign-in";
  };
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const btnChangePassword = async () => {
    setSendForm(true);
    if (
      availablePassword === "" ||
      availablePassword === " " ||
      newPasswordRepeat === "" ||
      newPasswordRepeat === " " ||
      newPassword === "" ||
      newPassword === " " ||
      newPassword !== newPasswordRepeat
    ) {
      return;
    }
    const res = await post(availablePassword, newPassword);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      setOpenDialog(false);
      sessionStorageService.returnClearToken();
      window.location.href = "/authentication/sign-in";
    } else {
      setErrorMsg("Şifre güncellenirken bir hata oluştu");
      openErrorSB();
    }
  };
  const changePasswordDialog = () => {
    setOpenDialog(true);
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Ayarlar</MDTypography>
          <MDTypography variant="body2" color="text">
            Seçenekleri inceleyin
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Solmenü Renk Ayarları</MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main;

                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main;
                    }

                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Solmenü Tipi</MDTypography>
          <MDTypography variant="button" color="text">
            Solmenü Tip Ayarlarını Seçin
          </MDTypography>

          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              Koyu
            </MDButton>
            <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
              <MDButton
                color="dark"
                variant="gradient"
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
              >
                Şeffaf
              </MDButton>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              Beyaz
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">Üstmenü Sabitle</MDTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDButton
            color="info"
            variant="gradient"
            onClick={() => changePasswordDialog()}
            fullWidth
          >
            ŞİFRE DEĞİŞTİR
          </MDButton>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDButton color="dark" variant="gradient" onClick={() => logOut()} fullWidth>
            Çıkış Yap
          </MDButton>
        </MDBox>
      </MDBox>
      <Modal
        open={opening}
        onClose={() => setOpening(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Çıkış yapmak istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpening(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => logOutConfirm()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Şifre Değiştir</DialogTitle>
        <DialogContent>
          <MDBox mt={2} mb={2}>
            <MDInput
              type="password"
              onChange={(event) => setAvailablePassword(event.target.value)}
              label="Mevcut Şifre"
              fullWidth
              name="availablePassword"
            />
            {sendForm === true && availablePassword === "" && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">Lütfen mevcut şifrenizi girin</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              onChange={(event) => setNewPassword(event.target.value)}
              label="Yeni Şifre"
              fullWidth
              name="newPassword"
            />
            {sendForm === true && newPassword === "" && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">Lütfen yeni şifrenizi girin</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              onChange={(event) => setNewPasswordRepeat(event.target.value)}
              label="Yeni Şifre Tekrar"
              fullWidth
              name="newPasswordRepeat"
            />
            {sendForm === true && (newPasswordRepeat === "" || newPasswordRepeat !== newPassword) && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">Lütfen yeni şifrenizi tekrar girin</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium" />
            <MDButton onClick={() => btnChangePassword()} variant="gradient" color="dark">
              &nbsp;ŞİFRE DEĞİŞTİR
            </MDButton>
          </MDBox>
        </DialogContent>
      </Dialog>
      {renderSuccessSB}
      {renderErrorSB}
    </ConfiguratorRoot>
  );
}

export default Configurator;
