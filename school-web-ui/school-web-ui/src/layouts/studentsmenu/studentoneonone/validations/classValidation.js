import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  className: Yup.string().required("Lütfen adını girin."),
  branchId: Yup.number().min(1, "Lütfen şube seçin"),
  teacherId: Yup.number().min(1, "Lütfen öğretmen seçin"),
  courseId: Yup.number().min(1, "Lütfen kurs seçin"),
});
