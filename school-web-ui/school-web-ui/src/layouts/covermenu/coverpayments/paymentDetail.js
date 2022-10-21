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

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePaymentList from "./service/usePaymentDetailList";
import MDSnackbar from "../../../components/MDSnackbar";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";
import MDTypography from "../../../components/MDTypography";

function Tables() {
  const { id } = useParams();
  const { service, get } = usePaymentList();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentData, setPaymentData] = useState({
    studentPayment: [],
    totalPaymentPlan: [],
    totalFee: [],
  });

  // const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  // const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Ödeme işlemi başarılı bir şekilde onaylandı."
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
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  useEffect(async () => {
    const res = await get(id);
    if (res.serviceStatus === "loaded") {
      setPaymentData(res.data);
    }
  }, []);

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 200 },
    {
      field: "EndDate",
      headerName: "Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "Amount",
      headerName: "Ödeme Tutarı",
      minWidth: 200,
    },
    {
      field: "Events",
      headerName: "Ödeme Durumu",
      minWidth: 200,
      valueGetter: (params) => (params.value <= 0 ? "Ödenmedi" : "Ödendi"),
    },
  ];
  const columnsSupplementaryPayment = [
    { field: "DownAmount", headerName: "Ek Ödenen Tutarı", width: 200 },
    {
      field: "DownType",
      headerName: "Ek Ödeme Tipi",
      minWidth: 200,
      valueGetter: (params) => (params.value === 1 ? "İlk Kayıt Ödemesi" : "Ara Ödeme"),
    },
    {
      field: "PaymentDate",
      headerName: "Ek Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğrenci Ücret Ödeme" />
      <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          {`Toplam Ödenecek Tutar : ${
            paymentData.totalFee.length > 0 ? paymentData.totalFee[0].TotalFee : 0
          }`}
        </MDTypography>
      </MDBox>
      <MDBox>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={paymentData.studentPayment}
            columns={columns}
            pageSize={5}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.PaymentStudentId}
            loading={service.serviceStatus === "loading"}
          />
        </div>
      </MDBox>
      <MDBox mt={2}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={paymentData?.totalPaymentPlan}
            columns={columnsSupplementaryPayment}
            pageSize={5}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.DownPaymentId}
            loading={service.serviceStatus === "loading"}
          />
        </div>
      </MDBox>
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
