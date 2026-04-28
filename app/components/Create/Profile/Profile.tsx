'use client';
import cx from 'classnames';

import Input from '@/app/modules/Input/Input';
import { Typography } from '@/app/modules/Typography/Typography';
import { useState } from 'react';
import styles from './Profile.module.scss';

const Profile = () => {
  const [name, setName] = useState('');
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  return (
    <div className={styles.profile}>
      <div className={styles.containerFirst}>
        <Typography variant="h3" weight="black" className={styles.title}>Profile</Typography>
        <div className={styles.content}>
          <div className={styles.contentAvatar}>{name[0]?.toUpperCase() || ' '}</div>
          <Input label="Name" value={name} onChange={handleChangeName} />
        </div>
        <Typography variant="h3" weight="black" className={cx(styles.title, styles.titleSecond)}>Themes</Typography>
        <div className={cx(styles.content)}>
          <div className={styles.cards}>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>
            <div className={cx(styles.card, 'cyberGrid')}></div>

          </div>
        </div>
      </div>
      <div className={styles.deviderY} />
      <div className={styles.containerSecond}>
        <div className={styles.phone}></div>
      </div>
    </div>
  );
}
export default Profile;