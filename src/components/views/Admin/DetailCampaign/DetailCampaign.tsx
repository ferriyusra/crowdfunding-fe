import { Tabs, Tab } from "@heroui/react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailCampaign from "./useDetailCampaign";

const DetailCampaign = () => {
  const {
    dataCampaign,
    handleUpdateCampaign,
    handleUpdateInfo,
    isPendingMutateUpdateCampaign,
    isSuccessMutateUpdateCampaign,
  } = useDetailCampaign();

  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Sampul Penggalangan Dana">
        <ImageTab
          currentImage={dataCampaign?.image}
          onUpdate={handleUpdateCampaign}
          isPendingUpdate={isPendingMutateUpdateCampaign}
          isSuccessUpdate={isSuccessMutateUpdateCampaign}
        />
      </Tab>
      <Tab key="info" title="Info Penggalangan Dana">
        <InfoTab
          dataCampaign={dataCampaign}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateCampaign}
          isSuccessUpdate={isSuccessMutateUpdateCampaign}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCampaign;
