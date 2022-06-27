import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.license}>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
          <a
            href={'https://github.com/BaSP-m2022/balti-trackgenix-app'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img
              className={styles.iconGit}
              src={`${process.env.PUBLIC_URL}/assets/images/github.svg`}
            />
          </a>
          <a
            href={'https://www.linkedin.com/company/radium-rocket/'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img
              className={styles.iconLink}
              src={`${process.env.PUBLIC_URL}/assets/images/linkedin.svg`}
            />
          </a>
        </div>
        <div className={styles.copyright}>Rosario, Argentina.</div>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
      </div>
    </footer>
  );
}

export default Footer;
