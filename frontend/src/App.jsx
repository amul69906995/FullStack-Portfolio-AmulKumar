import { useRef, useState } from 'react';
import './App.css';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import heroImage from './assets/heroImage.png'
import { Link } from 'react-router-dom';
import { useTheme } from './common/ThemeContext.jsx'

function App() {
  const refProjects = useRef(null);
  const refSkills = useRef(null);
  const refContact = useRef(null);
  const { theme } = useTheme()

const refHero=useRef()
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop-70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav style={{
        
        position: 'fixed',
        left: '0',
        zIndex: '50',
        background: theme==="light"?'white':"#222222",
        width: '100%',
        top: '0' 
      }}>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' ,padding:'2px'}}>
         
          <li style={{ marginRight: '0.8rem', cursor: 'pointer'}} onClick={() => scrollToSection(refHero)}> <img style={{width:'28px'}} src={heroImage} alt="logo" /></li>
          <li style={{ marginRight: '0.8rem', cursor: 'pointer'}} onClick={() => scrollToSection(refProjects)}>Projects</li>
          <li style={{ marginRight: '0.8rem', cursor: 'pointer' }} onClick={() => scrollToSection(refSkills)}>Skills</li>
          <li style={{ marginRight: '0.8rem', cursor: 'pointer' }} onClick={() => scrollToSection(refContact)}>Contact Us</li>
          <li style={{ marginRight: '0.8rem', cursor: 'pointer', color: theme === 'light' ? 'black' : 'white',  }} >Logout</li>
<Link to='/protected/profile'>Profile</Link>
        </ul>
      </nav>
      <div ref={refHero}>
      <Hero  />
      </div>
     
      <div ref={refProjects}>
        <Projects />
      </div>
      <div ref={refSkills}>
        <Skills />
      </div>
      <div ref={refContact}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;

