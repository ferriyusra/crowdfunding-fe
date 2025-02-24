import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICampaign } from "@/types/Campaign";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: ICampaign) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    resetUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Sampul Penggalangan Dana</h1>
        <p className="w-full text-small text-default-400">Atur Sampul Penggalangan Dana</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Sampul Penggalangan Dana
            </p>
            <Skeleton
              className="aspect-video rounded-lg"
              isLoaded={!!currentImage}
            >
              <Image
                src={currentImage}
                alt="banner"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2">
            <Controller
              name="image"
              control={controlUpdateImage}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onUpload={(files) => handleUploadImage(files, onChange)}
                  onDelete={() => handleDeleteImage(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateImage.image !== undefined}
                  isDropable
                  errorMessage={errorsUpdateImage.image?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={
                    <p className="text-sm font-medium text-default-700">
                      Unggah sampul baru
                    </p>
                  }
                />
              )}
            />
          </div>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500 bg-teal-600"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {" "}
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              <p className="text-white">Simpan Perubahan</p>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
