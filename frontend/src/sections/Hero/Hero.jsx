import styles from './HeroStyles.module.css';
import heroImg from '../../assets/heroImage.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import twitterLight from '../../assets/twitter-light.svg';
import twitterDark from '../../assets/twitter-dark.svg';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from '../../assets/cv.pdf';
import { useTheme } from '../../common/ThemeContext';
import { useState } from 'react';

function Hero() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState(false)
  const themeIcon = theme === 'light' ? sun : moon;
  const twitterIcon = theme === 'light' ? twitterLight : twitterDark;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <>
      
      <section id="hero" className={styles.container}>
        <div className={styles.colorModeContainer}>
          <img
            src={heroImg}
            className={styles.hero}
            alt="Profile picture of Harris Johnsen"
          />
          <img
            className={styles.colorMode}
            src={themeIcon}
            alt="Color mode icon"
            onClick={toggleTheme}
          />
        </div>
        <div className={styles.info}>
          <h1>
            Amul
            <br />
            Kumar
          </h1>
          <h2>FullStack Developer</h2>

          <span>
            <a href="https://x.com/Amul6990" target="_blank">
              <img src={twitterIcon} alt="Twitter icon" />
            </a>
            <a href="https://github.com/amul69906995" target="_blank">
              <img src={githubIcon} alt="Github icon" />
            </a>
            <a href="https://www.linkedin.com/in/amul-kumar-6a9728227/" target="_blank">
              <img src={linkedinIcon} alt="Linkedin icon" />
            </a>
          </span>
          <p className={styles.description} style={{ margin: 'auto' }}>
            FullStack Engineer from IIT BHU specializing in developing modern MERN stack web applications
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <a href={CV} download>
              <button className="hover">Resume</button>
            </a>
            <button onClick={() => setView(true)}>View</button>
          </div>

          {view && (
            <>
              <div style={{ position: 'absolute', top: '100px', height: '600px', border: '2px solid', backgroundColor: 'white' }}>
                <embed src={CV} type="application/pdf" style={{ width: '100%', height: '90%' }} />
                <button onClick={() => setView(false)}>close</button>
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}

export default Hero;
