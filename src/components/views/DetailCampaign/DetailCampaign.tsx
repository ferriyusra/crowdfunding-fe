import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import { FaClock } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import Script from "next/script";
import { environment } from "@/config/environment";
import useDetailCampaign from "./useDetailCampaign";
import DetailCampaignDonation from "./DetailCampaignDonation";
import DetailCampaignListDonation from "./DetailCampaignListDonation";
import { IDonate, IDonations } from "@/types/Donation";

const DetailEvent = () => {
  const {
    dataCampaign,
    isPendingAddDonation,
    dataDonate,
    isLoadingDataDonate
  } = useDetailCampaign();

  return (
    <div className="px-8 md:px-0">
      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <Skeleton className="h-6 w-1/8 rounded-lg" isLoaded={!!dataCampaign?.name}>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/campaign">Donasi</BreadcrumbItem>
          <BreadcrumbItem>{dataCampaign?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>
      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataCampaign?.name}
            className="mb-2 h-8 rounded-lg"
          >
            <h1 className="text-xl font-semibold text-teal-600">
              {dataCampaign?.name}
            </h1>
          </Skeleton>
          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={!!dataCampaign?.deadline}
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaClock width={16} />
              <p>
                {convertTime(dataCampaign?.deadline)}
              </p>
            </div>
          </Skeleton>

          <Skeleton
            className="mb-4 aspect-video w-full"
            isLoaded={!!dataCampaign?.image}
          >
            <Image
              alt="cover"
              src={dataCampaign?.image && dataCampaign?.image}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
          <Tabs aria-label="Description" fullWidth>
            <Tab key="Cerita Penggalangan Dana" title="Cerita Penggalangan Dana">
              <h2 className="text-xl font-semibold text-foreground-700">
                Cerita Penggalangan Dana
              </h2>
              <Skeleton
                className="mt-2 h-32 w-full rounded-lg md:h-48 lg:h-64"
                isLoaded={!!dataCampaign?.description}
              >
                <p className="text-foreground-500 text-sm md:text-base lg:text-lg">
                  {dataCampaign?.description}
                </p>
              </Skeleton>
            </Tab>
            <Tab key="Donasi" title="Donasi">
              <h2 className="text-xl font-semibold text-foreground-700">
                Donasi
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataDonate?.map((donate: IDonations) => (
                  <DetailCampaignListDonation
                    donation={donate}
                    key={`donate-${donate._id}`}
                  />
                ))}
              </div>
            </Tab>
            {/* <Tab key="Pencairan Dana" title="Pencairan Dana">
              <h2 className="text-xl font-semibold text-foreground-700">
                Pencairan Dana
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                Tidak ada data
              </div>
            </Tab> */}
          </Tabs>

        </div>
        <div className="w-full lg:w-2/6">
          <DetailCampaignDonation
            dataCampaign={dataCampaign}
            isLoading={isPendingAddDonation}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
