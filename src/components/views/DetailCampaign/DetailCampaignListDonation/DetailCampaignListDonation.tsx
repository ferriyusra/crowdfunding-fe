import { IDonations } from "@/types/Donation";
import { convertIDR } from "@/utils/currency";
import { Accordion, AccordionItem, Card } from "@heroui/react";

interface PropTypes {
  key?: string;
  donation: IDonations;
}

const DetailCampaignListDonation = (props: PropTypes) => {
  const { key, donation } = props;

  return (
    <Card className="px-4 pb-4" key={key}>
      {donation?.isShowName === true ? (
        <Accordion>
          <AccordionItem key={key}
            title={
              <div className="flex items-center gap-2 pb-0">
                <h2 className="text-xl font-bold text-foreground-700 capitalize">{donation?.name}</h2>
              </div>
            }
            className="border-b-2 border-dashed" aria-label={""}>
            <p className="capitalize">{donation?.message}</p>
          </AccordionItem>
        </Accordion>
      ) : null}
      <div className="mt-2 flex items-center justify-between p-2">
        {donation?.isShowName !== true ? (
          <p className="capitalize">{donation?.message}</p>

        ) : (
          null
        )}
        <h2 className="text-lg font-semibold text-foreground-700">
          {convertIDR(Number(donation?.amount))}
        </h2>
      </div>
    </Card >
  )
}

export default DetailCampaignListDonation;