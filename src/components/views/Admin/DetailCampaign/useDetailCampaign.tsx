import { ToasterContext } from "@/contexts/ToasterContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import campaignService from "@/services/campaign.service";
import { ICampaign, ICampaignForm } from "@/types/Campaign";

const useDetailCampaign = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCampaignByID = async () => {
    const { data } = await campaignService.getCampaignById(`${query.id}`);
    return data.data;
  };

  const { data: dataCampaign, refetch: refetchCampaign } = useQuery({
    queryKey: ["Campaign"],
    queryFn: getCampaignByID,
    enabled: isReady,
  });

  const updateCampaign = async (payload: ICampaign) => {
    const { data } = await campaignService.updateCampaign(`${query.id}`, payload);
    return data.data;
  };
  const {
    mutate: mutateUpdateCampaign,
    isPending: isPendingMutateUpdateCampaign,
    isSuccess: isSuccessMutateUpdateCampaign,
  } = useMutation({
    mutationFn: (payload: ICampaign) => updateCampaign(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchCampaign();
      setToaster({
        type: "success",
        message: "Berhasil update penggalangan dana",
      });
    },
  });

  const handleUpdateCampaign = (data: ICampaign) => mutateUpdateCampaign(data);
  console.log('handleUpdateCampaign', handleUpdateCampaign)
  const handleUpdateInfo = (data: ICampaignForm) => {
    const payload = {
      ...data,
      deadline: toDateStandard(data.deadline as DateValue),
    };
    mutateUpdateCampaign(payload);
  };

  return {
    dataCampaign,
    handleUpdateInfo,
    handleUpdateCampaign,
    isPendingMutateUpdateCampaign,
    isSuccessMutateUpdateCampaign,
  };
};

export default useDetailCampaign;
