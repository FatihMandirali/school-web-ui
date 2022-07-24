import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  finansTypeName: Yup.string().required("Lütfen şube adını girin."),
});
