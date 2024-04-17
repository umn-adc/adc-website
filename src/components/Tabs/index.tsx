import React, { useEffect, useRef, useState } from 'react';
import { Container, Content, TopBar } from './styles';
import TabButton from './TabButton';

interface TabsProps {
  options: { title: string; content: React.ReactNode; disabled?: boolean }[];
}

const Tabs: React.FC<TabsProps> = ({ options }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [offset, setOffset] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(
    (barRef.current?.children?.[0] as HTMLButtonElement)?.offsetWidth || 1
  );

  useEffect(() => {
    if (!barRef.current) return;
    const res = (barRef.current.children?.[0] as HTMLButtonElement)
      ?.offsetWidth;
    setWidth(res / barRef.current.clientWidth);
  }, [barRef]);

  return (
    <Container>
      <TopBar
        ref={barRef}
        nTabs={options.length}
        selectedTab={selectedTab}
        offset={offset}
        width={width}
      >
        {options.map((option, index) => (
          <TabButton
            disabled={option.disabled}
            type="button"
            key={option.title}
            onClick={
              option.disabled
                ? undefined
                : (e) => {
                    const el = e.target as HTMLButtonElement;
                    setSelectedTab(index);
                    setOffset(el.offsetLeft);
                    setWidth(
                      el.offsetWidth /
                        (el.parentElement as HTMLElement).clientWidth
                    );
                  }
            }
          >
            {option.title}
          </TabButton>
        ))}
      </TopBar>
      <Content>{options[selectedTab].content}</Content>
    </Container>
  );
};

export default Tabs;
