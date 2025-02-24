import useCampaign from "./useCampaign";
import CardCampaign from "@/components/ui/CardCampaign";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import DonationFooter from "./CampaignFooter";
import DonationFilter from "./CampaignFilter";
import Image from "next/image";
import { ICampaign } from "@/types/Campaign";

const Donation = () => {

  const router = useRouter();
  const { setUrlExplore } = useChangeUrl();
  const { dataCampaigns, isLoadingCampaigns, isRefetchingCampaigns } = useCampaign();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady])

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <div className="w-full lg:w-80">
        <DonationFilter />
      </div>
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingCampaigns && !isRefetchingCampaigns
            ? dataCampaigns?.data?.map((campaign: ICampaign) => (
              <CardCampaign
                campaign={campaign}
                key={`card-campaign-${campaign._id}`}
              />
            ))
            : Array.from({ length: 3 }).map((_, index) => (
              <CardCampaign
                key={`card-campaign-loading-${index}`}
                isLoading={true}
              />
            ))}
        </div>
        {!isLoadingCampaigns && dataCampaigns?.data?.length > 0 && (
          <DonationFooter totalPages={dataCampaigns?.pagination?.totalPages} />
        )}
        {dataCampaigns?.data?.length < 1 && !isLoadingCampaigns && !isRefetchingCampaigns && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Image src="/images/illustrations/no-data.svg" alt="no-data" width={200} height={200} />
            <h2 className="text-center text-2xl font-bold text-danger">Donasi Tidak Ada</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Donation;