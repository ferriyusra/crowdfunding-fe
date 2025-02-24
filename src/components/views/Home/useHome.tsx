import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import campaignService from "@/services/campaign.service";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    // const res = ;
    // const { data } = res;
    return null;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  const getCampaigns = async (params: string) => {
    const res = await campaignService.getCampaigns(params);
    const { data } = res;
    return data;
  };

  const currentCampaignQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}`;

  const { data: dataFeaturedCampaigns, isLoading: isLoadingFeaturedCampaigns } =
    useQuery({
      queryKey: ["FeaturedCampaigns"],
      queryFn: () => getCampaigns(`${currentCampaignQuery}`),
    });

  const { data: dataLatestCamapaigns, isLoading: isLoadingLatestCampaigns } = useQuery(
    {
      queryKey: ["LatestCampaigns"],
      queryFn: () => getCampaigns(currentCampaignQuery),
    },
  );

  return {
    dataBanners,
    isLoadingBanners,
    dataFeaturedCampaigns,
    isLoadingFeaturedCampaigns,
    dataLatestCamapaigns,
    isLoadingLatestCampaigns,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
