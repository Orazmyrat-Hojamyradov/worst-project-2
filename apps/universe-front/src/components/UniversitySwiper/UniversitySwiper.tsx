'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./UniversitySwiper.module.css";
import UniversityCard from "../ui/UniversityCard/UniversityCard";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api/api";

interface Props {
  title: string
}

export const universities = [
  {
    name: "Harvard University",
    location: "Cambridge, USA",
    rating: 4.9,
    description:
      "A private Ivy League research university known for its excellence in education and research.",
    url: "https://www.harvard.edu/",
  },
  {
    name: "Stanford University",
    location: "Stanford, USA",
    rating: 4.8,
    description:
      "One of the world's leading research and teaching institutions with exceptional entrepreneurial spirit.",
    url: "https://www.stanford.edu/",
  },
  {
    name: "MIT",
    location: "Cambridge, USA",
    rating: 4.9,
    description:
      "Massachusetts Institute of Technology is known for its research and education in physical sciences and engineering.",
    url: "https://www.mit.edu/",
  },
   {
    name: "Harvard University",
    location: "Cambridge, USA",
    rating: 4.9,
    description:
      "A private Ivy League research university known for its excellence in education and research.",
    url: "https://www.harvard.edu/",
  },
  {
    name: "Stanford University",
    location: "Stanford, USA",
    rating: 4.8,
    description:
      "One of the world's leading research and teaching institutions with exceptional entrepreneurial spirit.",
    url: "https://www.stanford.edu/",
  },
  {
    name: "MIT",
    location: "Cambridge, USA",
    rating: 4.9,
    description:
      "Massachusetts Institute of Technology is known for its research and education in physical sciences and engineering.",
    url: "https://www.mit.edu/",
  },
];

export default function UniversitySwiper({ title }: Props) {

  const { data } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => await fetchData({ url: '/api/universities' })
  })

  console.log(data);
  

  return (
    <div className="">

      <h2 className={styles.mainTitle}>{title}</h2>
    
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.swiper}
      >
        {/* @ts-expect-error bhccjqbevj */}
        {data?.map((uni, i) => (
          <SwiperSlide key={i}>
            <UniversityCard uni={uni} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
