import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  banners: IBanner[],
  isLoadingBanners: boolean
}

const HomeSlider = (props: PropTypes) => {
  const { banners, isLoadingBanners } = props;
  return (
    <div className="mx-6 mb-6 h-[50vw] sm:h-[40vw] md:h-[30vw] lg:mx-0 lg:mb-16 lg:h-[25vw]">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <Image
                src={`${banner.image}`}
                alt={`${banner.title}`}
                width={1920}
                height={1080}
                className="h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] w-full rounded-2xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] rounded-2xl w-full" />
      )}
    </div>
  )
}

export default HomeSlider;