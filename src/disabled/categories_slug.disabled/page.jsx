import Container from "@/components/ui/Container";
import TourToggleSwitch from "@/components/ui/TourToggleSwitch";
import ExplorationList from "@/components/ui/ExplorationList";
import { themeMap, VIDEO_MAP } from "@/config/themePackages";

export const generateMetadata = async ({ params }) => {
  const theme = (await params).slug;
  return {
    title: themeMap[theme].metaTitle,
    description: themeMap[theme].metaDescription,
    keywords: themeMap[theme].metaKeyword,
    openGraph: {
      title: themeMap[theme].metaTitle,
      description: themeMap[theme].metaDescription,
      images: themeMap[theme].metaImage,
    },
  };
};

const SingleCategoryPage = async ({ params }) => {
  const theme = (await params).slug;

  return (
    <>
      <video
        src={VIDEO_MAP[theme]}
        alt="Hero"
        placeholder="blur"
        autoPlay
        loop
        muted
        playsInline
        className="z-10 h-[70vh] w-full object-cover"
      />
      <section className="pt-12">
        <Container>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <h1 className="section-title-light">
              {themeMap[theme].title}
            </h1>
            <TourToggleSwitch />
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <ExplorationList theme={theme} />
        </Container>
      </section>
    </>
  );
};

export default SingleCategoryPage;
