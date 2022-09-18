import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  branchName: Yup.string().required("Lütfen şube adını girin."),
});
