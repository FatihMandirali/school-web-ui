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

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { useEffect, useState } from "react";
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

function Tables() {
  const { get } = useList();
  const [announcement, setAnnouncement] = useState([]);

  useEffect(async () => {
    const res = await get(4);
    if (res.serviceStatus === "loaded") {
      setAnnouncement(res.data);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Duyurular" />
      {/* eslint-disable-next-line array-callback-return */}
      {announcement.length <= 0 ? (
        <Alert severity="warning">
          <AlertTitle>Duyuru bulunmamaktadır.</AlertTitle>
        </Alert>
      ) : (
        announcement.map((item) => (
          <Alert style={{ marginBottom: "10px" }} key={item.AnnouncementId} severity="info">
            <AlertTitle>{item.AnnouncementTitle}</AlertTitle>
            {item.AnnouncementText}
          </Alert>
        ))
      )}
    </DashboardLayout>
  );
}

export default Tables;
