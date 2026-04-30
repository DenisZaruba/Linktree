import { ObjectId } from 'mongodb';

import { linktreeBackgrounds } from '@/app/utils/linktreee';
import Link from 'next/link';
import styles from './LinktreeUX.module.scss';

export type LinkItem = {
  title: string;
  url: string;
};

export type LinktreeDocument = {
  _id: ObjectId;

  hash: string;
  theme: string;
  name: string;

  links: LinkItem[];

  linkBackground: string;
  linkBorder: string;
  linkColor: string;

  createdAt: Date;
};

const LinktreeUX = ({ pageData }: { pageData: LinktreeDocument }) => {
  const { linkBackground, linkBorder, linkColor, links, name, theme } = pageData

  const CurrentBackground = linktreeBackgrounds.find(
    ({ title }) => title === theme
  )?.background || (() => null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>{name[0]?.toUpperCase() || ' '}</div>
      {links.length > 0 && linkBackground && <div className={styles.linksExample}>
        {links.map((link, index) => (
          <Link key={`${link.url}-${index}`} href={link.url} target='_blank' className={styles.linkExample} style={{ backgroundColor: linkBackground, borderColor: linkBorder, color: linkColor }}><span>{link.title}</span></Link>
        ))}
      </div>}
      <div className={styles.background}><CurrentBackground /></div>
    </div>
  );
}

export default LinktreeUX;