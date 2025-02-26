import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service"
import campaignService from "@/services/campaign.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounce = useDebounce();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  }

  const {
    data: dataProfile
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady
  });

  const getCampaignsSearch = async () => {
    const params = `search=${search}limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}`;
    const res = await campaignService.getCampaignsAndStatusApproved(params);
    const { data } = res;
    return data;
  };

  const { data: dataCampaignsSearch, isLoading: isLoadingCampaignsSearch, isRefetching: isRefetchingCampaignsSearch } =
    useQuery({
      queryKey: ["CampaignsSearch", search],
      queryFn: getCampaignsSearch,
      enabled: !!search,
    });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  }

  return {
    dataProfile,

    dataCampaignsSearch,
    isLoadingCampaignsSearch,
    isRefetchingCampaignsSearch,
    handleSearch,
    search,
    setSearch,
  }
}

export default useLandingPageLayoutNavbar