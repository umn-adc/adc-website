'use client';

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  baseTranslateY?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  baseTranslateY = 12,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'top 55%',
  wordAnimationEnd = 'top 55%',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    let wordIndex = 0;
    let charIndex = 0;

    const getTextEffectClasses = (className: string | undefined) => {
      if (!className) return '';
      return className
        .split(' ')
        .filter((token) => token.startsWith('text-gradient-'))
        .join(' ');
    };

    const renderText = (text: string, inheritedClassName: string) =>
      text.split(/(\s+)/).map((token) => {
        if (token.match(/^\s+$/)) return token;
        const wordKey = `word-${wordIndex++}`;
        return (
          <span className="inline-block word" key={wordKey}>
            {Array.from(token).map((char) => {
              const charKey = `char-${charIndex++}`;
              const charClassName = inheritedClassName
                ? `inline-block char ${inheritedClassName}`
                : 'inline-block char';
              return (
                <span className={charClassName} key={charKey}>
                  {char}
                </span>
              );
            })}
          </span>
        );
      });

    const renderNode = (
      node: ReactNode,
      inheritedClassName = ''
    ): ReactNode => {
      if (typeof node === 'string' || typeof node === 'number') {
        return renderText(String(node), inheritedClassName);
      }
      if (React.isValidElement(node)) {
        const elementClassName =
          typeof node.props.className === 'string' ? node.props.className : '';
        const textEffectClasses = getTextEffectClasses(elementClassName);
        const nextInheritedClassName = [inheritedClassName, textEffectClasses]
          .filter(Boolean)
          .join(' ');
        const children = React.Children.map(node.props.children, (child) =>
          renderNode(child, nextInheritedClassName)
        );
        return React.cloneElement(node, node.props, children);
      }
      if (Array.isArray(node)) {
        return React.Children.map(node, (child) =>
          renderNode(child, inheritedClassName)
        );
      }
      return node;
    };

    return renderNode(children, '');
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      const charElements = gsap.utils.toArray<HTMLElement>('.char', el);
      if (!charElements.length) return;

      const animationStart = 'top 95%';
      const stagger = 0.05;
      const scrub = 0.6;

      gsap.fromTo(
        charElements,
        {
          transformOrigin: '50% 50%',
          rotate: baseRotation,
          y: baseTranslateY,
          willChange: enableBlur
            ? 'transform, opacity, filter'
            : 'transform, opacity',
        },
        {
          ease: 'none',
          rotate: 0,
          y: 0,
          duration: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: animationStart,
            end: rotationEnd,
            scrub,
          },
        }
      );

      const opacityFrom: gsap.TweenVars = { opacity: baseOpacity };
      const opacityTo: gsap.TweenVars = {
        ease: 'none',
        opacity: 1,
        duration: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: animationStart,
          end: wordAnimationEnd,
          scrub,
        },
      };

      if (enableBlur) {
        opacityFrom.filter = `blur(${blurStrength}px)`;
        opacityTo.filter = 'blur(0px)';
      }

      gsap.fromTo(charElements, opacityFrom, opacityTo);
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseTranslateY,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
