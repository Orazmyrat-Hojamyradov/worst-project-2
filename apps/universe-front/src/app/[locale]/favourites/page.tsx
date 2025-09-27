"use client";

import { useState, useEffect } from "react";
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
  const [favorites, setFavorites] = useState<number[]>([]); // Store only IDs
  const [favoriteUniversities, setFavoriteUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("FavoritesPage");
  const locale = useLocale()

  const { data: allUniversities, isLoading: queryLoading, error } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => await fetchData({ url: '/api/universities' })
  });

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("university_favorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync favorite universities with actual university data
  useEffect(() => {
    if (allUniversities && favorites.length > 0) {
      const favUnis = allUniversities.filter((uni: University) => 
        favorites.includes(uni.id)
      );
      setFavoriteUniversities(favUnis);
    } else {
      setFavoriteUniversities([]);
    }
  }, [allUniversities, favorites]);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("university_favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, [favorites, isLoading]);

  // Helper function to get display value from multilingual field
  const getDisplayValue = (field: MultilingualField | null, lang: keyof MultilingualField = 'en'): string => {
    if (!field) return '';
    return field[lang] || 'error';
  };

  // Safe filtering - only filter favorites, not the entire data set
  const filteredUniversities = favoriteUniversities.filter((uni) => {
    if (!uni) return false;
    
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      getDisplayValue(uni.name, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.description, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.specials, locale).toLowerCase().includes(searchTerm) ||
      getDisplayValue(uni.financing, locale).toLowerCase().includes(searchTerm);
    
    return matchesSearch;
  });

  // Handle loading and error states
  if (queryLoading || isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <p>{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{t("error")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </div>

      {/* Search Box */}
      {favorites.length > 0 && (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Statistics */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{favorites.length}</span>
          <span className={styles.statLabel}>{t("totalFavorites")}</span>
        </div>
        {search && (
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{filteredUniversities.length}</span>
            <span className={styles.statLabel}>{t("matchingSearch")}</span>
          </div>
        )}
      </div>

      {/* University Cards */}
      <div className={styles.content}>
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <h3>{t("emptyState.title")}</h3>
            <p>{t("emptyState.description")}</p>
            <button className={styles.exploreButton} onClick={() => window.location.href = '/'}>
              {t("emptyState.exploreButton")}
            </button>
          </div>
        ) : filteredUniversities.length === 0 && search ? (
          <div className={styles.noResults}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>{t("noResults.title")}</h3>
            <p>{t("noResults.description", { search })}</p>
            <button 
              className={styles.clearSearchButton}
              onClick={() => setSearch("")}
            >
              {t("noResults.clearSearch")}
            </button>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {(search ? filteredUniversities : favoriteUniversities).map((uni) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}