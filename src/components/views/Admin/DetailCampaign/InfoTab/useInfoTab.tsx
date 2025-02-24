import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Mohon masukkan nama penggalangan dana"),
  status: yup.string(),
  description: yup.string().required("Mohon masukkan deskripsi penggalangan dana"),
  slug: yup.string().required("Mohon masukkan slug penggalangan dana"),
  targetAmount: yup.string().required("Mohon masukkan target penggalangan dana"),
  category: yup.string().required("Mohon pilih kategori penggalangan dana"),
  deadline: yup
    .mixed<DateValue>()
    .required("Mohon masukkan tanggal akhir pengumpulan penggalangan dana"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    watch: watchUpdateInfo,
    getValues: getValuesUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });


  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    watchUpdateInfo,
    getValuesUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  };
};

export default useInfoTab;
