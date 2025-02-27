import { IDonations } from "@/types/Donation";
import { convertIDR } from "@/utils/currency";
import { Accordion, AccordionItem, Card } from "@heroui/react";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface PropTypes {
  key?: string;
  donation: IDonations;
}

const DetailCampaignListDonation = (props: PropTypes) => {
  const { key, donation } = props;
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <Card className="px-4 pb-4" key={key}>
      {donation?.isShowName === true ? (
        <Accordion>
          <AccordionItem
            key={key}
            title={
              <div className="flex items-center gap-2 pb-0">
                <h2 className="text-xl font-bold text-foreground-700 capitalize">
                  {donation?.name}
                </h2>
                <FaHeart
                  className={`text-red-500 transition-transform ${isAnimating ? "animate-heart" : ""
                    }`}
                />
              </div>
            }
            className="border-b-2 border-dashed"
            aria-label={""}
          >
            <p className="capitalize">{donation?.message}</p>
          </AccordionItem>
        </Accordion>
      ) : (
        <Accordion>
          <AccordionItem
            key={key}
            title={
              <div className="flex items-center gap-2 pb-0">
                <h2 className="text-xl font-bold text-foreground-700 capitalize">
                  Orang Baik
                </h2>
                <FaHeart
                  className={`text-red-500 transition-transform ${isAnimating ? "animate-heart" : ""
                    }`}
                />
              </div>
            }
            className="border-b-2 border-dashed"
            aria-label={""}
          >
            <p className="capitalize">{donation?.message}</p>
          </AccordionItem>
        </Accordion>
      )}
      <div className="mt-2 flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold text-foreground-700">
          {convertIDR(Number(donation?.amount))}
        </h2>
      </div>

      {/* Add the CSS animation */}
      <style jsx global>{`
        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-heart {
          animation: heartBeat 1s ease-in-out infinite;
        }
        
        .text-red-500 {
          color: #ef4444;
        }
      `}</style>
    </Card>
  );
};

export default DetailCampaignListDonation;
