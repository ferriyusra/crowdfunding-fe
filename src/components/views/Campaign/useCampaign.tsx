import useChangeUrl from "@/hooks/useChangeUrl";
import campaignService from "@/services/campaign.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCampaign = () => {
  const router = useRouter();
  const {
    currentLimit,
    currentPage,
    currentCategory,
  } = useChangeUrl();

  const getCampaigns = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}`;
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
    queryKey: [
      "Campaigns",
      currentPage,
      currentLimit,
      currentCategory,
    ],
    queryFn: () => getCampaigns(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCampaigns,
    isLoadingCampaigns,
    isRefetchingCampaigns,
    refetchCampaigns,
  };
};

export default useCampaign;
