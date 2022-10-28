import Grid from "@mui/material/Grid";

// eslint-disable-next-line react/prop-types
function StudentPaymentSummaryComponent({ remainingPayment, paymentAmount, paymentData }) {
  return (
    <Grid container spacing={2}>
      <Grid item xl={4}>
        <div
          style={{
            border: "2px solid rgb(230, 235, 240)",
            padding: "10px",
            borderRadius: "7px",
            height: "70px",
            backgroundColor: "rgb(236, 75, 72)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              float: "left",
              marginLeft: "10px",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            <span>Toplam Ödenecek Tutar</span>
          </div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              width: "80%",
              float: "left",
              marginLeft: "10px",
              color: "rgb(66,66,66)",
            }}
          >
            <span style={{ float: "left", color: "white" }}>{paymentData}</span>
          </div>
          <br />
        </div>
      </Grid>
      <Grid item xl={4} xm={4} xs={4}>
        <div
          style={{
            border: "2px solid rgb(230, 235, 240)",
            padding: "10px",
            borderRadius: "7px",
            height: "70px",
            backgroundColor: "rgb(55, 145, 238)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              float: "left",
              marginLeft: "10px",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            <span>Ödenen Tutar</span>
          </div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              width: "80%",
              float: "left",
              marginLeft: "10px",
              color: "rgb(66,66,66)",
            }}
          >
            <span style={{ float: "left", color: "white" }}>
              {paymentAmount.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </span>
          </div>
          <br />
        </div>
      </Grid>
      <Grid item xl={4} xm={4} xs={4}>
        <div
          style={{
            border: "2px solid rgb(230, 235, 240)",
            padding: "10px",
            borderRadius: "7px",
            height: "70px",
            backgroundColor: "rgb(236, 75, 72)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              float: "left",
              marginLeft: "10px",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            <span>Kalan Tutar</span>
          </div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: "bold",
              width: "80%",
              float: "left",
              marginLeft: "10px",
              color: "rgb(66,66,66)",
            }}
          >
            <span style={{ float: "left", color: "white" }}>
              {remainingPayment.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </span>
          </div>
          <br />
        </div>
      </Grid>
    </Grid>
  );
}

export default StudentPaymentSummaryComponent;
