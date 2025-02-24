import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  DatePicker,
} from "@heroui/react";
import useAddCampaignModal from "./useAddCampaignModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCampaigns: () => void;
}

const AddCampaignModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCampaigns } = props;

  const {
    control,
    errors,
    preview,
    handleSubmitForm,
    handleAddCampaign,
    isPendingMutateAddCampaign,
    isSuccessMutateAddCampaign,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    dataCategory,
    setValue,
  } = useAddCampaignModal();

  useEffect(() => {
    if (isSuccessMutateAddCampaign) {
      onClose();
      refetchCampaigns();
    }
  }, [isSuccessMutateAddCampaign]);

  const disbaledSubmit =
    isPendingMutateAddCampaign ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  useEffect(() => {
    setValue("deadline", now(getLocalTimeZone()));
  }, [onOpenChange])

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddCampaign)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Penggalangan Dana</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <div className="flex flex-col gap-4 mb-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Nama Penggalangan Dana"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  name="targetAmount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Target Penggalangan Dana"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.targetAmount !== undefined}
                      errorMessage={errors.targetAmount?.message}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Kategori Penggalangan Dana"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Cari Kategori disini..."
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="deadline"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Tanggal Mulai Acara"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errors.deadline !== undefined}
                      errorMessage={errors.deadline?.message}
                      hideTimeZone
                      showMonthAndYearPickers
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Deskripsi Penggalangan Dana"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    ></Textarea>
                  )}
                />

              </div>
              <p className="text-sm font-bold">Sampul Gambar Penggalangan Dana</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    onDelete={() => handleDeleteImage(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    isDropable
                    errorMessage={errors.image?.message}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disbaledSubmit}
            >
              Batal
            </Button>
            <Button color="success" type="submit" disabled={disbaledSubmit} className="bg-teal-600">
              {isPendingMutateAddCampaign ? (
                <Spinner size="sm" color="white" />
              ) : (
                <p className="text-white">Tambah Penggalangan Dana</p>
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal >
  );
};

export default AddCampaignModal;
