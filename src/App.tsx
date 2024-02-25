import Header from 'components/Header';
import Hero from 'components/Hero';
import Profile from 'components/Profile';
import Section from 'components/Section';
import board from 'data/board';
import React from 'react';
import WaveTop from 'assets/svg/waves-top.svg';
import WaveBottom from 'assets/svg/waves-bottom.svg';
import Highlight from 'components/Highlight';
import AppBuilding from 'assets/images/app-development-lifecycle.jpg';
import Coding from 'assets/images/kickoff.jpg';
import Networking from 'assets/images/showcase.jpg';
import { ProfileContainer, ProjectsContainer } from 'styles';
import Footer from 'Footer';
import ProjectProfile from 'components/ProjectProfile';
import projects from 'data/projects';

const App: React.FC = () => {
  return (
    <div className="App" style={{ overflowX: 'clip' }}>
      <Header />
      <Hero />
      <Section
        secondary
        title="Who We Are"
        description="The App Developers Club seeks to bring together app developers at the University of Minnesota. Whether you have been developing for years or are just starting out, this is the place to enhance your experience through working with others. At ADC, there’s something for everyone."
      />
      <Section
        scrollReveal
        topDecorator={
          <img
            src={WaveTop}
            alt=""
            style={{
              msUserSelect: 'none',
              MozUserSelect: 'none',
              WebkitUserSelect: 'none',
              marginBottom: -5,
              userSelect: 'none',
            }}
          />
        }
        id="board"
        style={{ padding: 10 }}
        title="Meet the board"
        description="Learn more about the amazing people behind ADC"
        bottomDecorator={
          <img
            src={WaveBottom}
            alt=""
            style={{
              msUserSelect: 'none',
              MozUserSelect: 'none',
              WebkitUserSelect: 'none',
              marginTop: 0,
            }}
          />
        }
      >
        <ProfileContainer>
          {board.map((member, index) => (
            <Profile
              key={member.name}
              {...member}
              style={{ animationDelay: `${1200 + index * 150}ms` }}
            />
          ))}
        </ProfileContainer>
      </Section>
      {/* <Section
        secondary
        title="Gallery"
        description="Check out the latest media from ADC!"
      >

      </Section> */}
      <Section
        disableScrollTimeline
        scrollReveal
        secondary
        title="Active Projects"
        description="Check out our currently active projects!"
      >
        <ProjectsContainer>
          {projects.map(({ name, icon, link }, index) => (
            <ProjectProfile
              key={name}
              title={name}
              icon={icon}
              link={link}
              style={{ animationDelay: `${1200 + index * 150}ms` }}
            />
          ))}
        </ProjectsContainer>
      </Section>
      <Highlight
        scrollReveal
        secondary
        title="Guest Speakers"
        body="At ADC, we hold guest speaker events throughout the academic year. You will hear from software engineers and gain insight into what it is like to work in the software development industry, get the change to network with professionals, and get resume feedback."
      >
        <img src={AppBuilding} alt="app building" />
      </Highlight>
      <Highlight
        scrollReveal
        // secondary
        title="Coding"
        body="We build apps. Here at App Developers Club, you will get support and resources for developing web and mobile apps you always dreamed of, either independently or in teams. We run workshops for beginners to learn to create apps from no prior experience."
      >
        <img src={Coding} alt="app building" />
      </Highlight>
      <Highlight
        scrollReveal
        secondary
        title="Network"
        body="Developing hands-on experience and know how to work in teams are crucial to success in software development. At App Developers Club, we provide a friendly environment for anyone who is interested in app development to network and socialize."
      >
        <img src={Networking} alt="app building" />
      </Highlight>
      <Footer />
    </div>
  );
};

export default App;
