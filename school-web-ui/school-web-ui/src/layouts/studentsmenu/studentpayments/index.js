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
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { jwtDecode } from "../../../httpservice/jwtDecode";
import { sessionStorageService } from "../../../httpservice/sessionStorageService";
import localizedTextsMap from "../../../tableContentLanguage";
import MDTypography from "../../../components/MDTypography";
import StudentPaymentSummaryComponent from "../../../components/StudentPaymentSummary/StudentPaymentSummaryComponent";

function Tables() {
  const { service, get } = useList();
  const [remainingPayment, setRemainingPayment] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentData, setPaymentData] = useState({
    studentPayment: [],
    totalPaymentPlan: [],
    totalFee: [],
  });

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    {
      field: "StudentSurname",
      headerName: "Soyadı",
      minWidth: 200,
    },
    {
      field: "Amount",
      headerName: "Aylık Tutar",
      minWidth: 200,
    },
    {
      field: "EndDate",
      headerName: "Son Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "Events",
      headerName: "Ödenme Durumu",
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

  useEffect(async () => {
    const res = jwtDecode.returnGetJwtDecode(sessionStorageService.returnGetAccessToken());
    if (res === null) {
      sessionStorageService.returnClearToken();
      window.location.href = "/authentication/sign-in";
    }
    const resService = await get(parseInt(res.Id, 10));
    if (resService.serviceStatus === "loaded") {
      setPaymentData(resService.data);
      // eslint-disable-next-line no-shadow
      let paymentAmount = 0;
      let remainingAmount = 0;
      // eslint-disable-next-line array-callback-return
      resService.data.totalPaymentPlan.map((item) => {
        paymentAmount += item.DownAmount;
      });
      // eslint-disable-next-line array-callback-return
      resService.data.studentPayment
        .filter((x) => x.Events === 1)
        // eslint-disable-next-line array-callback-return
        .map((item) => {
          paymentAmount += item.Amount;
        });
      // eslint-disable-next-line array-callback-return
      resService.data.studentPayment
        .filter((x) => x.Events === 0)
        // eslint-disable-next-line array-callback-return
        .map((item) => {
          remainingAmount += item.Amount;
        });
      setPaymentAmount(paymentAmount);
      setRemainingPayment(remainingAmount);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ödeme Planı" />
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          {`Toplam Ödenecek Tutar : ${
            paymentData.totalFee.length > 0 ? paymentData.totalFee[0].TotalFee : 0
          }`}
        </MDTypography>
      </MDBox>
      <StudentPaymentSummaryComponent
        paymentAmount={paymentAmount}
        paymentData={
          paymentData?.totalFee?.length > 0
            ? paymentData?.totalFee[0]?.TotalFee?.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })
            : "0"
        }
        remainingPayment={remainingPayment}
      />
      <MDBox mt={2}>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={paymentData.studentPayment.filter((item) => item.Amount > 0)}
            columns={columns}
            pageSize={9}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.PaymentStudentId}
            rowsPerPageOptions={[5, 10, 15]}
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
    </DashboardLayout>
  );
}

export default Tables;
