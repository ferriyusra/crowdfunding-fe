import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CAMPAIGN } from "./Campaign.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import AddCampaignModal from "./AddCampaignModal";
import DeleteCampaignModal from "./DeleteCampaignModal";
import useCampaign from "./useCampaign";
import { convertIDR } from "@/utils/currency";

const Campaign = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataCampaigns,
    isLoadingCampaigns,
    isRefetchingCampaigns,
    refetchCampaigns,
    selectedId,
    setSelectedId,
  } = useCampaign();

  const addCampaignModal = useDisclosure();
  const deleteCampaignModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (campaign: Record<string, unknown>, columnKey: Key) => {
      const cellValue = campaign[columnKey as keyof typeof campaign];

      switch (columnKey) {
        case "image":
          return (
            <Image
              className="aspect-video w-36 object-cover rounded-lg"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={200}
            />
          );
        case "targetAmount":
          return convertIDR(Number(cellValue))
        case "collectedAmount":
          return convertIDR(Number(cellValue))
        case "status":
          return (
            <Chip
              color={
                cellValue === "completed" || cellValue === "approved" ? "success"
                  : cellValue === "pending" ? "warning"
                    : "danger"
              }
              size="lg"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip >
          )
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/campaign/${campaign._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${campaign._id}`);
                deleteCampaignModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingCampaigns || isRefetchingCampaigns}
          columns={COLUMN_LISTS_CAMPAIGN}
          emptyContent="Penggalangan Dana kosong"
          onClickButtonTopContent={addCampaignModal.onOpen}
          buttonTopContentLabel="Tambah Penggalangan Dana"
          renderCell={renderCell}
          totalPages={dataCampaigns?.pagination.totalPages}
          data={dataCampaigns?.data || []}
        />
      )}
      <AddCampaignModal
        refetchCampaigns={refetchCampaigns}
        {...addCampaignModal}
      />
      <DeleteCampaignModal
        refetchCampaigns={refetchCampaigns}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        {...deleteCampaignModal}
      />
    </section>
  );
};

export default Campaign;
