import UniversitySwiper from "@/components/UniversitySwiper/UniversitySwiper";
import { useTranslations } from "next-intl";

function App() {
  const t = useTranslations("HomePage");

  return (
    <div className="app">
      <UniversitySwiper title={t('featuredUniversities')} />
      <UniversitySwiper title={t('topUniversities')} />
    </div>
  );
}

export default App;