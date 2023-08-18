import { Icon } from '@iconify/react';
import React, { useState, useEffect, useCallback, FC, MutableRefObject } from 'react';
import useCounter from '../../hooks/useCounter';
import cls from 'classnames';

interface Props {
  itemsTotal: number;
  containerRef: MutableRefObject<HTMLUListElement | null>;
  itemsLoaded: boolean;
  className?: string;
}

const HorizontalScroll: FC<Props> = props => {
  const { itemsTotal, containerRef, className, itemsLoaded } = props;
  const [containerWidth, setContainerWidth] = useState<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    const onResizeWindow = setContainerWidth.bind(null, containerRef.current.scrollWidth);

    window.addEventListener('resize', onResizeWindow);
    return () => window.removeEventListener('resize', onResizeWindow);
  }, [containerRef.current]);

  useEffect(() => {
    if (!itemsLoaded || !containerRef.current) return;
    setContainerWidth(containerRef.current?.scrollWidth);
    containerRef.current.scrollTo(0, 0);
  }, [itemsLoaded, containerRef.current]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!containerWidth) return;

      const scrollAmt = containerRef.current!.scrollLeft;
      const shouldScroll =
        (direction === 'left' && scrollAmt > 0) ||
        (direction === 'right' && scrollAmt <= containerWidth);

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
    <div className={cls(className, 'd-flex align-items-center gap-2 mx-auto mt-5')}>
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
