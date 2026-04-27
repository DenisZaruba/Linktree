import { Typography } from '@/app/modules/Typography/Typography';
import InfluencersSlider from '../InfluencersSlider/InfluencersSlider';
import styles from './Influencers.module.scss';

const Influencers = () => {
  return (
    <div className={styles.influencers}>
      <div className={styles.content}>
        <Typography variant="h1" weight="black" className={styles.title}>
          Linktree is for
        </Typography>
        <Typography variant="h1" weight="black" className={styles.subtitle}>
          influencers
        </Typography>
      </div>
      <div className={styles.swiper}>
        <InfluencersSlider />
        <div className={styles.swiperBackground}>
          <div className={styles.swiperBackground1} />
          <div className={styles.swiperBackground2} />
          <div className={styles.swiperBackground3} />

        </div>
      </div>
    </div>
  );
}
export default Influencers;