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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useEffect } from "react";
import useAnnouncementList from "../../../layouts/authentication/sign-in/service/useAnnouncementList";

function DefaultNavbar({ transparent, light }) {
  const { service, get } = useAnnouncementList();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(async () => {
    await get(1);
  }, []);

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        {service.serviceStatus === "loaded" && (
          <div style={{ marginLeft: "30px" }}>
            <h4>Duyurular</h4>
            <ul>
              {/* eslint-disable-next-line array-callback-return */}
              {service.data.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>{item.AnnouncementText}</li>
              ))}
            </ul>
          </div>
        )}
      </MDBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
};

export default DefaultNavbar;
