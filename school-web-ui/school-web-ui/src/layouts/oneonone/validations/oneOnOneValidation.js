import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  startTime: Yup.string().required("Lütfen saat aralığı girin."),
  endTime: Yup.string().required("Lütfen saat aralığı girin."),
  times: Yup.date().required("Lütfen tarih girin."),
  studentId: Yup.number().min(1, "Lütfen öğrenci seçin"),
  teacherId: Yup.number().min(1, "Lütfen öğretmen seçin"),
  lessonId: Yup.number().min(1, "Lütfen ders seçin"),
});
