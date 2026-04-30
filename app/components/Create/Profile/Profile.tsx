'use client';
import axios from 'axios';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Button } from '@/app/modules/Button/Button';
import Input from '@/app/modules/Input/Input';
import { Typography } from '@/app/modules/Typography/Typography';
import { linktreeBackgrounds } from '@/app/utils/linktreee';
import { useState } from 'react';
import styles from './Profile.module.scss';


const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [colorText, setColorText] = useState('');
  const [links, setLinks] = useState<{ id: number; title: string; url: string }[]>([]);
  const [currentBackground, setCurrentBackground] = useState(linktreeBackgrounds[0].id);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const { push } = useRouter();

  const handleAddLink = () => {
    setLinks(current => [...current, { id: current.length + 1 || 1, title: '', url: '' }]);
  }

  const ActiveBackground = linktreeBackgrounds.find(
    ({ id }) => id === currentBackground
  )?.background;

  const handleCreateLink = async () => {
    const linktreeData = {
      name,
      theme: linktreeBackgrounds.find(({ id }) => id === currentBackground)?.title || '',
      links: links.map(({ title, url }) => ({ title, url })),
      linkBackground: backgroundColor,
      linkBorder: borderColor,
      linkColor: colorText,
    };

    setIsLoading(true);
    toast.loading('Creating linktree...', { autoClose: false, toastId: 'creating' });
    console.log(linktreeData);
    try {
      const data = await axios.post('/api/linktree', linktreeData)
        .then(response => {
          setIsLoading(false);
          return response.data
        })
      toast.success('Linktree created successfully!');
      push(`/linktrees/${data.hash}`, {});
    } catch (error: any) {
      setIsLoading(false);
      toast.dismiss('creating');
      toast.error(error.response?.data?.error || 'Error creating linktree.');
    }
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
            {linktreeBackgrounds.map(({ id, background: Background, title }) => (
              <div key={id} className={cx(styles.card, { [styles.active]: currentBackground === id })} onClick={() => setCurrentBackground(id)}>
                <Background />
              </div>
            ))}

          </div>
        </div>
        <Typography variant="h3" weight="black" className={cx(styles.title, styles.titleSecond)}>Links</Typography>
        <div className={cx(styles.content)}>
          <div className={styles.links}>
            <Typography variant="h3" weight="black">Background</Typography>
            <input type='color' onChange={(e) => setBackgroundColor(e.target.value)} value={backgroundColor} />
            <Typography variant="h3" weight="black">Border</Typography>
            <input type='color' onChange={(e) => setBorderColor(e.target.value)} value={borderColor} />
            <Typography variant="h3" weight="black">Color</Typography>
            <input type='color' onChange={(e) => setColorText(e.target.value)} value={colorText} />
            <Typography variant="h3" weight="black">LinksInfo</Typography>
            <Button disabled={links.length >= 5} className={styles.linkButton} color='pink' variant='primary' onClick={handleAddLink}>Add</Button>
            {links.map(({ id, title, url }) => (
              <div key={id}>
                <div className={styles.linkText}>
                  <Input label="Title" value={title} onChange={(e) => setLinks(current => current.map(link => link.id === id ? { ...link, title: e.target.value } : link))} />
                  <Input label="Url" value={url} onChange={(e) => setLinks(current => current.map(link => link.id === id ? { ...link, url: e.target.value } : link))} />
                </div>
                <Button className={styles.linkButton} color='pink' variant='secondary' onClick={() => setLinks(current => current.filter(link => link.id !== id))}>Delete</Button>
              </div>
            ))}

          </div>
        </div>
        <Button disabled={isLoading} className={styles.createButton} color='lime' variant='primary' onClick={handleCreateLink}>Create</Button>
      </div>
      <div className={styles.deviderY} />
      <div className={styles.containerSecond}>
        <div className={styles.phone}>
          {ActiveBackground ? <ActiveBackground /> : null}
          {name && <div className={cx(styles.contentAvatar, styles.avatarExample)}>{name[0]?.toUpperCase()}</div>}
          {links.length > 0 && backgroundColor && <div className={styles.linksExample}>
            {links.map(link => (
              <div key={link.id} className={styles.linkExample} style={{ backgroundColor, borderColor, color: colorText }}><span>{link.title}</span></div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
}
export default Profile;