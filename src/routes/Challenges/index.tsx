import React from 'react';
import Leaderboard from 'components/Leaderboard';
import Section from 'components/Section';
import Tabs from 'components/Tabs';
import challenges from 'data/challenges';
import { MainContent } from 'styles';
import Markdown, { ExtraProps } from 'react-markdown';
import { useTheme } from 'styled-components';
import CodeBlock from 'components/CodeBlock';

const renderCodeBlock = (
  props: React.ClassAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLElement> &
    ExtraProps
) => {
  return `${props.children}`.includes('\n') || props.className ? (
    <CodeBlock {...props} />
  ) : (
    // ? there might be a better way to do this
    <span style={{ fontFamily: 'NotoSansMono' }}>{props.children}</span>
  );
};

const renderImg = (
  props: React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement> &
    ExtraProps
) =>
  props.src?.includes('.svg') ? (
    <img
      {...props}
      alt={props.alt}
      style={{
        padding: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        height: 25,
        width: 25,
      }}
    />
  ) : (
    <img {...props} alt={props.alt} style={{ borderRadius: 10 }} />
  );

const Challenges = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Section
        title="Challenges"
        description="The Challenges program started in Spring 2024 and has since then provided ADC members with weekly coding and app development challenges to test their skills. Every semester, our top members rise up the leaderboard and compete for awesome prizes with every challenge completed!"
      />
      <Section
        secondary
        title="Live Leaderboard"
        description=""
        animationDelay={1200}
      >
        <Leaderboard />
      </Section>
      <MainContent
        secondary
        style={{ gap: 20, backgroundColor: theme.colors.accent }}
      >
        <h1>Latest Challenges</h1>
        <Tabs
          options={[
            ...challenges[2024].spring.map((challenge) => ({
              title:
                challenge.title ??
                challenge.md.split('\n')[0].replaceAll('#', ''),
              content: (
                <Markdown
                  components={{
                    code: renderCodeBlock,
                    // eslint-disable-next-line react/no-unstable-nested-components
                    img: renderImg,
                  }}
                >
                  {challenge.md}
                </Markdown>
              ),
            })),
            {
              title: 'Coming soon...',
              content: <Markdown />,
              disabled: true,
            },
          ]}
        />
      </MainContent>
    </div>
  );
};

export default Challenges;
