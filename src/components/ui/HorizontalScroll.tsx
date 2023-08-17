import { Icon } from '@iconify/react';
import React, { useState, useEffect, useCallback, FC, MutableRefObject } from 'react';
import useCounter from '../../hooks/useCounter';

interface Props {
  itemsTotal: number;
  containerQuerySelector: string;
  containerRef: MutableRefObject<HTMLUListElement | null>;
  itemsLoaded: boolean;
}

const HorizontalScroll: FC<Props> = props => {
  const { itemsTotal, containerRef, containerQuerySelector, itemsLoaded } = props;
  const [containerWidth, setContainerWidth] = useState<number>();
  const [scrollAmt, setScrollAmt] = useState<number>(0);

  useEffect(() => {
    const onScroll = function (this: HTMLUListElement, ev: Event) {
      setScrollAmt(this.scrollLeft);
      console.log({ 'this.scrollLeft': this.scrollLeft });
    };
    containerRef.current?.addEventListener('scroll', onScroll);
    return () => containerRef.current?.removeEventListener('scroll', onScroll);
  }, [containerRef.current]);

  useEffect(() => {
    if (!itemsLoaded) return;
    setContainerWidth(containerRef.current?.scrollWidth);
    containerRef.current?.scrollTo(0, 0);
  }, [itemsLoaded]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!containerWidth) return;

      const scrollAmt = containerRef.current!.scrollLeft;
      const shouldScroll =
        (scrollAmt > 0 && direction === 'left') ||
        (scrollAmt <= containerWidth && direction === 'right');

      if (!shouldScroll) return;

      const scrollBy =
        direction === 'right'
          ? containerWidth / itemsTotal + scrollAmt
          : scrollAmt - containerWidth / itemsTotal;

      containerRef.current?.scrollTo({ left: scrollBy, behavior: 'smooth' });
    },
    [containerWidth, containerRef]
  );

  return (
    <div className="d-flex align-items-center gap-4 mx-auto mt-5">
      <Icon
        icon="solar:arrow-left-line-duotone"
        className="color-pry cursor-pointer"
        width={25}
        onClick={scroll.bind(null, 'left')}
      />
      <Icon
        icon="solar:arrow-right-line-duotone"
        className="color-pry cursor-pointer"
        width={25}
        onClick={scroll.bind(null, 'right')}
      />
    </div>
  );
};

export default HorizontalScroll;
