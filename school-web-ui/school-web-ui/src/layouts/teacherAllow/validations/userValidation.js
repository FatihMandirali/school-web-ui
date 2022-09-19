import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  teacherId: Yup.number().min(1, "Lütfen öğretmen seçin"),
});
