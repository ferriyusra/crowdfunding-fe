import CardCampaign from "@/components/ui/CardCampaign";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "swiper/css"
import "swiper/css/pagination"
import { ICampaign } from "@/types/Campaign";

interface PropTypes {
  title: string;
  campaigns: ICampaign[];
  isLoading: boolean;
  urlMore: string;
}

const HomeCampaignList = (props: PropTypes) => {
  const swiperRef = useRef<any>(null);
  const [isDisabled, setIsDisabled] = useState({ next: false, prev: true });
  const { title, campaigns, isLoading, urlMore = "" } = props;

  const handlePrevClick = () => {
    if (!isDisabled.prev) {
      swiperRef.current?.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (!isDisabled.next) {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <section className="relative mb-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-teal-700 md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-base md:text-lg text-default-600">
            Berikan donasi kepada mereka yang membutuhkan
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            size="lg"
            className={`bg-teal-600 text-white transition-all hover:bg-teal-700 ${isDisabled.prev
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
              }`}
            onPress={handlePrevClick}
            disabled={isDisabled.prev}
          >
            <FaArrowCircleLeft className="text-xl" />
          </Button>
          <Button
            isIconOnly
            size="lg"
            className={`bg-teal-600 text-white transition-all hover:bg-teal-700 ${isDisabled.next
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
              }`}
            onPress={handleNextClick}
            disabled={isDisabled.next}
          >
            <FaArrowCircleRight className="text-xl" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        {!isLoading ? (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsDisabled({
                next: swiper.isEnd,
                prev: swiper.isBeginning,
              });
            }}
            className="w-full"
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            onSlideChange={(swiper) => {
              setIsDisabled({
                next: swiper.isEnd,
                prev: swiper.isBeginning,
              });
            }}
          >
            {campaigns?.length > 0 ? (
              campaigns.map(campaign => (
                <SwiperSlide
                  key={`card-campaign-${campaign._id}`}
                  className="h-full"
                >
                  <div className="h-full p-1">
                    <CardCampaign
                      campaign={campaign}
                      className="h-full transition-transform hover:scale-[1.02]"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="flex items-center justify-center w-full py-10">
                <p className="text-lg font-medium text-default-500">
                  Tidak ada data
                </p>
              </div>
            )}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardCampaign
                key={`card-event-loading-${index}`}
                isLoading={isLoading}
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCampaignList;
