import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Skeleton,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";
import useCampaignFilter from "./useCampaignFilter";

const CampaignFilter = () => {
  const { control, dataCategories, isSuccessGetCategories, setValue } =
    useCampaignFilter();
  const {
    handleChangeCategory,
    currentCategory,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
    }
  }, [isSuccessGetCategories]);

  return (
    <div className="top-20 h-fit w-full rounded-xl border p-4 lg:sticky lg:w-80">
      <h4 className="text-xl font-semibold">Filter Donasi</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategories ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategories?.data.data || []}
                  label="Kategori Donasi"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
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

          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignFilter;
