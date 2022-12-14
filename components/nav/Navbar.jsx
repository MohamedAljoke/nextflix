import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { magic } from '../../services/magic-auth';

export default function Navbar(props) {
  const router = useRouter();
  const { username } = props;
  const [showLoggout, setShowLoggout] = useState(false);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };
  const handleOnClickList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };
  const signOutFunc = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
    } catch (e) {
      console.log(e);
    }
    router.push('/auth/login');
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="logo netflix"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowLoggout((prev) => !prev)}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand.svg"
                alt="expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {showLoggout && (
              <div className={styles.navDropdown}>
                <div>
                  <button className={styles.linkName} onClick={signOutFunc}>
                    Sign out
                  </button>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
