import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  endDate: Yup.string().required("Ödev bitiş tarihi girin."),
  lessonId: Yup.number().min(1, "Lütfen ders seçin"),
  classId: Yup.number().min(1, "Lütfen sınıf seçin"),
});
