import HomeCategoryList from "./HomeCategoryList";
import HomeCampaignList from "./HomeCampaignList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedCampaigns,
    isLoadingFeaturedCampaigns,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={[]}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeCampaignList
        title="Donasi Terbaru"
        campaigns={dataFeaturedCampaigns?.data}
        isLoading={isLoadingFeaturedCampaigns}
        urlMore="/campaign"
      />
      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
