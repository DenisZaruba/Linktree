'use client';

import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';


const Header = () => {
  const [isShown, setIsShown] = useState(false);

  const pathname = usePathname()

  const isCreatePage = pathname && pathname.startsWith('/create');

  const hideHeader = pathname.startsWith('/linktrees');

  useEffect(() => {
    setIsShown(true)
  }, []);


  if (hideHeader) return null;


  return (
    <div className={cx(styles.header, { [styles.headerCreate]: isCreatePage, [styles.headerShow]: isShown })}>
      <Link href="/" className={styles.logo}>
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4295 6.8285L18.102 2.02533L20.8145 4.80317L15.9133 9.47567H22.8072V13.3315H15.8807L20.8145 18.1242L18.102 20.8472L11.4042 14.1167L4.70633 20.8472L1.99383 18.1347L6.92767 13.342H0V9.47567H6.89383L1.99267 4.80317L4.70517 2.02533L9.37767 6.8285V0H13.4295V6.8285ZM9.37767 18.8533H13.4295V28.0023H9.37767V18.8533Z" fill="black" />
        </svg>
      </Link>

      <Link href="/create/appearance" className={cx(styles.link, { [styles.active]: pathname === '/create/appearance' })}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.00802 1C4.67955 1 3.4055 1.52773 2.46613 2.4671C1.52676 3.40647 0.999023 4.68053 0.999023 6.009C0.999023 7.33747 1.52676 8.61153 2.46613 9.5509C3.4055 10.4903 4.67955 11.018 6.00802 11.018V12.018C4.41434 12.018 2.88592 11.3849 1.75902 10.258C0.632113 9.1311 -0.000976562 7.60269 -0.000976562 6.009C-0.000976562 4.41531 0.632113 2.8869 1.75902 1.76C2.88592 0.633089 4.41434 8.32162e-08 6.00802 8.32162e-08V1ZM11.018 6.009C11.018 5.35112 10.8884 4.69969 10.6366 4.09191C10.3849 3.48412 10.0158 2.93189 9.55057 2.46675C9.08533 2.00161 8.53303 1.63267 7.92519 1.381C7.31736 1.12933 6.6659 0.999869 6.00802 1V8.32162e-08C6.79722 -0.000131253 7.57871 0.155199 8.30788 0.457121C9.03704 0.759043 9.69958 1.20164 10.2577 1.75964C10.8158 2.31764 11.2585 2.98011 11.5605 3.70922C11.8626 4.43833 12.018 5.2198 12.018 6.009H11.018ZM7.00802 6.509L6.50802 7.009V15.5L7.00802 16H15.5L16 15.5V7.008L15.5 6.508H7.00702L7.00802 6.509ZM7.50802 15.001V7.508H15V15.001H7.50802Z" />
        </svg>
        Appearance
      </Link>
      <Link href="/create/analytics" className={cx(styles.link, { [styles.active]: pathname === '/create/analytics' })}>
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11 0L10 1V3H6L5 4V6H1L0 7V13L1 14H5L5.5 13.5L6 14H10L10.5 13.5L11 14H15L16 13V1L15 0H11ZM11 13H12H14H15V12V2V1H14H12H11V2V4V12V13ZM10 4H9H7H6V5V7V12V13H7H9H10V12V5V4ZM4 7H5V8V12V13H4H2H1V12V8V7H2H4Z" />
        </svg>
        Analytics
      </Link>
    </div>
  );
}
export default Header;