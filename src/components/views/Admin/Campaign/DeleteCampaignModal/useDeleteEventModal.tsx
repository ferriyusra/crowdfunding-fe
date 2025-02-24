import { ToasterContext } from "@/contexts/ToasterContext";
import campaignService from "@/services/campaign.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCampaignModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCampaign = async (id: string) => {
    const res = await campaignService.deleteCampaign(id);
    return res;
  }

  const {
    mutate: mutateDeleteCampaign,
    isPending: isPendingMutateDeleteCampaign,
    isSuccess: isSuccessMutateDeleteCampaign,
  } = useMutation({
    mutationFn: deleteCampaign,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message
      })
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Penggalangan Dana berhasil dihapus"
      })
    }
  })

  return {
    mutateDeleteCampaign,
    isPendingMutateDeleteCampaign,
    isSuccessMutateDeleteCampaign,
  }
}

export default useDeleteCampaignModal;