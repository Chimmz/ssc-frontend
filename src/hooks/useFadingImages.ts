import { useEffect, useState } from 'react';

const useFadingImages = (imagesTotal: number, timeout: number | undefined = 10000) => {
  const [imgs, setImgs] = useState(() => {
    return Array.from({ length: imagesTotal }, (_, i) => {
      console.log({ i });
      return { isVisible: i === 0 };
    });
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgs(imgs => {
        return imgs.map((img, i, arr) => {
          // Hide img if previously visible
          if (img.isVisible) return { isVisible: false };

          // If last img was visible, show first img
          if (i == 0 && arr[arr.length - 1].isVisible) return { isVisible: true };

          // If previous img was visible, show current img
          if (i > 0 && arr[i - 1].isVisible) return { isVisible: true };
          return { isVisible: false };
        });
      });
    }, timeout);
    return () => clearInterval(intervalId);
  }, []);

  return imgs;
};

export default useFadingImages;
