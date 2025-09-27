import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* About Us */}
        <div className={styles.footerSection}>
          <h3>{t('about.title')}</h3>
          <p>{t('about.description')}</p>
        </div>

        {/* Contact Information */}
        <div className={styles.footerSection}>
          <h3>{t('contact.title')}</h3>
          <p>📍 {t('contact.address')}</p>
          <p>📞 {t('contact.phone')}</p>
          <p>✉️ {t('contact.email')}</p>
        </div>

        {/* Follow Us */}
        <div className={styles.footerSection}>
          <h3>{t('follow.title')}</h3>
          <div className={styles.socialIcons}>
            <a href="#" aria-label={t('follow.facebook')}><FaFacebook /></a>
            <a href="#" aria-label={t('follow.twitter')}><FaTwitter /></a>
            <a href="#" aria-label={t('follow.instagram')}><FaInstagram /></a>
            <a href="#" aria-label={t('follow.linkedin')}><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.footerBottom}>
        <p>{t('copyright', { year: 2023 })}</p>
      </div>
    </footer>
  );
};

export default Footer;