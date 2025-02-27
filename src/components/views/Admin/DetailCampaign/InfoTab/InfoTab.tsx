import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICampaignForm } from "@/types/Campaign";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataCampaign: ICampaignForm;
  onUpdate: (data: ICampaignForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataCampaign, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    dataCategory,
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataCampaign) {
      setValueUpdateInfo("name", `${dataCampaign?.name}`);
      setValueUpdateInfo("slug", `${dataCampaign?.slug}`);
      setValueUpdateInfo("targetAmount", `${dataCampaign?.targetAmount}`);
      setValueUpdateInfo("description", `${dataCampaign?.description}`);
      setValueUpdateInfo("category", `${dataCampaign?.category}`);
      setValueUpdateInfo("status", `${dataCampaign?.status}`);
      setValueUpdateInfo("deadline", toInputDate(`${dataCampaign?.deadline}`));
    }
  }, [dataCampaign]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Penggalangan Dana</h1>
        <p className="w-full text-small text-default-400">Atur penggalangan dana</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCampaign?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama Penggalangan Dana"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                  labelPlacement="outside"
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCampaign?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                  labelPlacement="outside"
                ></Input>
              )}
            />

          </Skeleton>
          <Skeleton isLoaded={!!dataCampaign?.targetAmount} className="rounded-lg">
            <Controller
              name="targetAmount"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Target Penggalangan Dana"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.targetAmount !== undefined}
                  errorMessage={errorsUpdateInfo.targetAmount?.message}
                  labelPlacement="outside"
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCampaign?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={dataCampaign?.category}
                  defaultItems={dataCategory?.data.data || []}
                  label="Kategori Penggalangan Dana"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
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
          </Skeleton>
          <Skeleton isLoaded={!!dataCampaign?.deadline} className="rounded-lg">
            <Controller
              name="deadline"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Akhir Penggalangan Dana"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.deadline !== undefined}
                  errorMessage={errorsUpdateInfo.deadline?.message}
                  hideTimeZone
                  showMonthAndYearPickers
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCampaign} className="rounded-lg">
            <Controller
              name="status"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status Penggalangan Dana"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.status !== undefined}
                  errorMessage={errorsUpdateInfo.status?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataCampaign?.status === "approved" ? "approved" :
                      dataCampaign?.status === "completed" ? "completed" :
                        dataCampaign?.status === "rejected" ? "rejected" :
                          "pending"
                  ]}
                  disabledKeys={dataCampaign?.status === "rejected" ? ["approved", "pending", "completed"] : []}
                >
                  <SelectItem key="approved">
                    Disetujui
                  </SelectItem>
                  <SelectItem key="rejected">
                    Ditolak
                  </SelectItem>
                  <SelectItem key="pending">
                    Pending
                  </SelectItem>
                  <SelectItem key="completed">
                    Selesai
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataCampaign?.description}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Deskripsi Penggalangan Dana"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  labelPlacement="outside"
                ></Textarea>
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="success"
            className="mt-2 disabled:bg-default-500 bg-teal-600"
            disabled={isPendingUpdate || !dataCampaign?._id}
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
    </Card >
  );
};

export default InfoTab;
