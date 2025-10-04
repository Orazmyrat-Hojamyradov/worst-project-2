import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const t = useTranslations('HeroSection');

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBackground}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h2 className={styles.subtitle}>{t('subtitle')}</h2>
            <h1 className={styles.title}>{t('title')}</h1>
          </div>
          
          <p className={styles.description}>
            {t('description')}
          </p>
          
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.primary}`}>
              {t('getStarted')}
            </button>
            <button className={`${styles.button} ${styles.secondary}`}>
              {t('watchDemo')}
            </button>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>{t('expertGuides')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>{t('detailedSteps')}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>25k+</span>
              <span className={styles.statLabel}>{t('happyBuilders')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;