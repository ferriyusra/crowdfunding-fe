import useChangeUrl from "@/hooks/useChangeUrl";
import campaignService from "@/services/campaign.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCampaign = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCampaigns = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await campaignService.getCampaigns(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataCampaigns,
    isLoading: isLoadingCampaigns,
    isRefetching: isRefetchingCampaigns,
    refetch: refetchCampaigns,
  } = useQuery({
    queryKey: ["Campaigns", currentPage, currentLimit, currentSearch],
    queryFn: () => getCampaigns(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCampaigns,
    isRefetchingCampaigns,
    isLoadingCampaigns,
    refetchCampaigns,
    selectedId,
    setSelectedId,
  };
};

export default useCampaign;
