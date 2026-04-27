'use client';

import cx from 'classnames';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';


import { Autoplay } from 'swiper/modules';
import styles from './InfluencersSlider.module.scss';

export default function InfluencersSlider() {
  return (
    <Swiper spaceBetween={20} slidesPerView={'auto'}
      modules={[Autoplay]}
      loop
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className={styles.swiper} >
      <SwiperSlide><div className={cx(styles.slide, styles.slide1)}><Image fill src={'/images/influe1.png'} alt="Influencer 1" /></div></SwiperSlide>
      <SwiperSlide><div className={cx(styles.slide, styles.slide2)}><Image fill src={'/images/influe2.png'} alt="Influencer 2" /></div></SwiperSlide>
      <SwiperSlide><div className={cx(styles.slide, styles.slide3)}><Image fill src={'/images/influe3.png'} alt="Influencer 3" /></div></SwiperSlide>
      <SwiperSlide><div className={cx(styles.slide, styles.slide4)}><Image fill src={'/images/influe4.png'} alt="Influencer 4" /></div></SwiperSlide>
      <SwiperSlide><div className={cx(styles.slide, styles.slide5)}><Image fill src={'/images/influe5.png'} alt="Influencer 5" /></div></SwiperSlide>
    </Swiper>
  );
}