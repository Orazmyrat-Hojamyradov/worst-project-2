"use client";

import { useState } from "react";
import styles from "./page.module.css";
import UniversityCard from "@/components/ui/UniversityCard/UniversityCard";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api";
import { useLocale, useTranslations } from "next-intl";

interface MultilingualField {
  en: string;
  ru: string;
  tm: string;
}

interface University {
  id: number;
  photolr1: string | null;
  name: MultilingualField;
  description: MultilingualField;
  specials: MultilingualField | null;
  financing: MultilingualField | null;
  duration: MultilingualField | null;
  applicationDeadline: string | null;
  gender: MultilingualField | null;
  age: number | null;
  others: MultilingualField | null;
  medicine: MultilingualField | null;
  salary: MultilingualField | null;
  donitory: MultilingualField | null;
  rewards: MultilingualField | null;
  others_p: MultilingualField | null;
  officialLink: string;
}

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const t = useTranslations("UniversitiesPage");

  const { data, isLoading, error } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => await fetchData({ url: '/api/universities' })
  });

  const locale = useLocale()

  // Helper function to get display value from multilingual field
  const getDisplayValue = (field: MultilingualField | null, lang: keyof MultilingualField = 'en'): string => {
    if (!field) return '';
    return field[lang] || field.en || '';
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{t('error')}</p>
        </div>
      </div>
    );
  }

  // Safe filtering - handle case where data might be undefined or empty
  const filteredUniversities = data ? data.filter((uni: University) => {
    if (!uni) return false;
    
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      getDisplayValue(uni.name, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.description, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.specials, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.financing, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.duration, locale).toLowerCase().includes(searchTerm);

    return matchesSearch;
  }) : [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          {t('search.button')}
        </button>
      </div>

      {/* Statistics */}
      <div className={styles.stats}>
        {search && (
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{filteredUniversities.length + " "}</span>
            <span className={styles.statLabel}>{t('search.resultsCount')}</span>
          </div>
        )}
      </div>

      {!filteredUniversities.length && search ? (
        <div className={styles.noResults}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h2>{t('noResults.title')}</h2>
          <p>{t('noResults.description', { search })}</p>
        </div>
      ) : filteredUniversities.length === 0 ? (
        <div className={styles.noResults}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10h18M3 14h18M3 18h18M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h2>{t('emptyState.title')}</h2>
          <p>{t('emptyState.description')}</p>
        </div>
      ) : (
        <>
          {/* University Cards */}
          <div className={styles.cardsGrid}>
            {filteredUniversities.map((uni: University) => (
              <UniversityCard key={uni.id} uni={uni} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}