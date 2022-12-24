import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  title: Yup.string().required("Lütfen üniversite seçin."),
  // title: Yup.number().min(1, "Lütfen Üniversite seçin."),
  text: Yup.string().required("Lütfen açıklama girin."),
  createdDate: Yup.date().required("Lütfen başlangıç tarihi seçiniz."),
  sharingEndDate: Yup.date()
    .required("Lütfen bitiş tarihini seçiniz.")
    .min(
      Yup.ref("createdDate"),
      // eslint-disable-next-line no-use-before-define
      ({ min }) => `Lütfen başlangıç tarihinden sonraki bir tarihi seçiniz. ${formatDate(min)}!!`
    ),
});

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
