import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ICampaign, ICampaignForm } from "@/types/Campaign";
import campaignService from "@/services/campaign.service";

const schema = yup.object().shape({
  name: yup.string().required("Mohon masukkan nama penggalangan dana"),
  description: yup.string().required("Mohon masukkan deskripsi penggalangan dana"),
  slug: yup.string().required("Mohon masukkan slug penggalangan dana"),
  image: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan foto penggalangan dana"),
  targetAmount: yup.string().required("Mohon masukkan target penggalangan dana"),
  category: yup.string().required("Mohon pilih kategori penggalangan dana"),
  deadline: yup
    .mixed<DateValue>()
    .required("Mohon masukkan tanggal akhir pengumpulan penggalangan dana"),
});

const useAddCampaignModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  const addCampaign = async (payload: ICampaign) => {
    const res = await campaignService.addCampaign(payload);
    return res;
  };

  const {
    mutate: mutateAddCampaign,
    isPending: isPendingMutateAddCampaign,
    isSuccess: isSuccessMutateAddCampaign,
  } = useMutation({
    mutationFn: addCampaign,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Penggalangan Dana berhasil ditambahkan!",
      });
      reset();
    },
  });

  const handleAddCampaign = (data: ICampaignForm) => {
    const payload = {
      ...data,
      deadline: toDateStandard(data.deadline as DateValue),
      targetAmount: Number(data.targetAmount),
      image: data.image,
    };
    mutateAddCampaign(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCampaign,
    isPendingMutateAddCampaign,
    isSuccessMutateAddCampaign,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,

    setValue,
  };
};

export default useAddCampaignModal;
