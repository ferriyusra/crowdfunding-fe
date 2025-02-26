import { IDonate } from "@/types/Donation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import donationService from "@/services/donation.service";
import campaignService from "@/services/campaign.service";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";

const schema = yup.object().shape({
  name: yup.string(),
  message: yup.string(),
  amount: yup.string(),
  isShowName: yup.string(),
});

const useDetailCampaign = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getCampaignBySlug = async () => {
    const { data } = await campaignService.getCampaignBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataCampaign, isLoading: isLoadingDataCampaign } = useQuery({
    queryKey: ["CampaignBySlug"],
    queryFn: getCampaignBySlug,
    enabled: router.isReady
  });

  const currentGetDonateByCampaignIdQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}`;
  const getDonateByCampaignId = async (params: string) => {
    const { data } = await donationService.getFundraisingDonation(`${dataCampaign?._id}`, params);
    return data.data;
  }

  const { data: dataDonate, isLoading: isLoadingDataDonate } = useQuery({
    queryKey: ["DonateByCampaignId"],
    queryFn: () => getDonateByCampaignId(`${currentGetDonateByCampaignIdQuery}`),
    enabled: !!dataCampaign && router.isReady
  });

  const addDonation = async (payload: IDonate) => {
    const { data } = await donationService.createDonation(payload, dataCampaign?.slug);
    return data.data;
  }

  const {
    mutate: mutateAddDonation,
    isPending: isPendingAddDonation,
  } = useMutation({
    mutationFn: addDonation,
    onError: (error) => {
      setToaster({
        type: 'error',
        message: error.message,
      })
    },
    onSuccess: (result) => {
      const transactionToken = result.payment.token;
      (window as any).snap.pay(transactionToken);
    }
  });

  const handleAddDonation = (data: IDonate) => {
    const payload: IDonate = {
      ...data,
      campaigns: dataCampaign?._id as string,
    };
    mutateAddDonation(payload);
  }

  return {
    control,
    handleSubmitForm,
    errors,
    reset,
    watch,
    getValues,
    setValue,
    handleAddDonation,
    dataCampaign,
    isLoadingDataCampaign,
    mutateAddDonation,
    isPendingAddDonation,
    dataDonate,
    isLoadingDataDonate
  }
}

export default useDetailCampaign;