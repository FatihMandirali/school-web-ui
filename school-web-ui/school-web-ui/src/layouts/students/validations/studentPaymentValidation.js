import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  totalAmount: Yup.number().min(1, "Lütfen toplam miktarı seçin"),
  firstPaymentDate: Yup.date()
    .required("Lütfen ilk ödeme tarihini seçiniz.")
    .min(new Date(), "Lütfen bugünden önceki bir tarihi seçmeyiniz."),
});
