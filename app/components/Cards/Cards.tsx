'use client';

import cx from 'classnames';

import { Button } from '@/app/modules/Button/Button';
import { Typography } from '@/app/modules/Typography/Typography';
import Image from 'next/image';
import styles from './Cards.module.scss';

const cardsData = [
  {
    id: 1,
    title: 'Unlimited Links',
    subtitle: 'You have a lot to share, that’s why we don’t put a limit on the number of links you can add to your Linktree.',
    image: '/images/links.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
  {
    id: 2,
    title: 'Video',
    subtitle: 'Engage your visitors with video. Connect Twitch, TikTok, Facebook & YouTube and control how they display on your Linktree.',
    image: '/images/video.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
  {
    id: 3,
    title: 'Music',
    subtitle: 'Get more streams and let visitors listen on their prefered platform – from Spotify and Soundcloud to Audiomack and more.',
    image: '/images/music.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
  {
    id: 4,
    title: 'Podcasts',
    subtitle: 'Get more plays on your podcast. Connect your show or individual episodes and turn traffic into listeners and subscribers.',
    image: '/images/podcast.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
  {
    id: 5,
    title: 'Social Platforms',
    subtitle: 'Grow your following and make your socials easy to find. Use analytics to learn which platforms are driving the most results.',
    image: '/images/social.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
  {
    id: 6,
    title: 'QR Code',
    subtitle: 'Drive offline traffic online with your unique Linktree QR code. Print it on packaging, products, mugs, menus, ads and more.',
    image: '/images/qr.png',
    buttons: ['Free', 'Pro', 'Premium', 'Starter'],
  },
]

const Cards = () => {


  return (
    <div className={styles.cards} >
      <div className={styles.wrapper}>
        <Typography variant="h1" weight="black" className={styles.title}>
          Infinite ways to share your content
        </Typography>

        <div className={styles.cardsWrapper}>
          {cardsData.map((card, i) => (
            <div className={cx(styles.card, styles.cardBackground, styles[`cardBackground${i}`])} key={card.id}>
              <div className={styles.cardImage} >
                <Image src={card.image} alt={`${card.title} image`} fill />
              </div>
              <Typography variant="h3" weight="black" className={styles.cardTitle}>
                {card.title}
              </Typography>
              <Typography variant="body" weight="black" className={styles.cardSubtitle}>
                {card.subtitle}
              </Typography>
              <div className={styles.cardButtons}>
                {card.buttons.map((text, idx) => (
                  <Button key={`${text}-${idx}`} className={cx(styles.cardButton, styles[`cardButton${idx}`])} variant='secondary'>{text}</Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;