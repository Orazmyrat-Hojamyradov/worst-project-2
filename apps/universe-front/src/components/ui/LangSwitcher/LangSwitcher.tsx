import { useState } from "react";
import styles from "./LangSwitcher.module.css";
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useRouter as NextRouter } from 'next/navigation'

type TLanguage = "en" | "ru" | "tm";

interface ILanguageOption {
  code: TLanguage;
  label: string;
  value: string;
}

const LANGUAGE_OPTIONS: ILanguageOption[] = [
  { code: "en", label: "English", value: "English" },
  { code: "tm", label: "Türkmen", value: "Türkçe" },
  { code: "ru", label: "Русский", value: "Русский" },
];

export default function LanguageSwitcher() {
  const locale = useLocale() as TLanguage;
  const router = useRouter();
  const pathname = usePathname();
  const nextRouter = NextRouter();

  const [lang, setLang] = useState<TLanguage>(locale || "en");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedLanguage = LANGUAGE_OPTIONS.find(option => option.value === selectedValue);
    
    if (selectedLanguage) {
      setLang(selectedLanguage.code);
      
      // Remove existing locale from pathname
      const normalizedPathname = pathname.replace(/^\/(en|ru|tm)(?=\/|$)/, '');
      const pathToUse = normalizedPathname || '/';

      // Navigate to the new locale
      router.replace(pathToUse, {
        locale: selectedLanguage.code,
        scroll: false,
      });
      
      nextRouter.refresh();
    }
  };

  // Find current language option for display
  const currentLanguage = LANGUAGE_OPTIONS.find(option => option.code === lang);

  return (
    <select
      value={currentLanguage?.value || "English"}
      onChange={handleLanguageChange}
      className={styles.select}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <option key={option.code} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}