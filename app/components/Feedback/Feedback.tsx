'use client';

import cx from 'classnames';

import { Typography } from '@/app/modules/Typography/Typography';
import Image from 'next/image';
import styles from './Feedback.module.scss';

const Feedback = () => {
  return (
    <div className={styles.feedback} >
      <div className={styles.wrapper}>
        <div className={styles.feedbackImage} >
          <Image src={'/images/feedback.png'} alt={`Feedback image`} fill />
        </div>
        <Typography variant="h1" weight="black" className={styles.title}>
          “The biggest pro for me is Linktree’s original concept: multiple links in one place that are easy to access.”
        </Typography>
        <Typography variant="h2" weight="regular" className={cx(styles.subtitle, styles.subtitleFirst)}>
          Mads St Clair,
        </Typography>
        <Typography variant="h2" weight="regular" className={cx(styles.subtitle, styles.subtitleSecond)}>
          Marine Biologist & Filmmaker
        </Typography>
      </div>
    </div>
  );
};

export default Feedback;