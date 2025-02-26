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
    <section className="mb-16">
      <div className="flex flex-wrap items-center justify-between">
        <div className='w-[70%] md:w-[80%]'>
          <h1 className="mb-3 text-2xl font-bold text-teal-700 md:text-display-md">
            {title}
          </h1>
          <p className="mb-0 text-md">Berikan donasi kepada mereka yang membutuhkan</p>
        </div>
        <div className="flex w-[30%] justify-end gap-4 md:w-[20%]">
          <div
            className={`inline-flex ${isDisabled.prev ? 'pointer-campaigns-none' : 'cursor-pointer'}`}
          >
            <Button
              color="primary"
              size="lg"
              className={`!flex !items-center !py-3 bg-teal-700 transition-opacity ${isDisabled.prev ? 'opacity-50' : 'opacity-100'
                }`}
              onPress={handlePrevClick}
              disabled={isDisabled.prev}
            >
              <FaArrowCircleLeft />
            </Button>
          </div>
          <div
            className={`inline-flex ${isDisabled.next ? 'pointer-campaigns-none' : 'cursor-pointer'}`}
          >
            <Button
              color="primary"
              size="lg"
              className={`!flex !items-center !py-3 bg-teal-700 transition-opacity ${isDisabled.next ? 'opacity-50' : 'opacity-100'
                }`}
              onPress={handleNextClick}
              disabled={isDisabled.next}
            >
              <FaArrowCircleRight />
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
              className="mySwiper"
              spaceBetween={24}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
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
                  <SwiperSlide key={`card-campaign-${campaign._id}`} className="mb-6 md:mb-0">
                    <CardCampaign
                      key={`card-key-${campaign._id}`}
                      campaign={campaign}
                      className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-md font-medium">Tidak ada data</p>
                </div>
              )}
            </Swiper>
          ) : (
            <div className="grid gap-6 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <CardCampaign
                  key={`card-event-loading-${index}`}
                  isLoading={isLoading}
                  className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );

};

export default HomeCampaignList;
