'use client';
import { useState } from 'react';

const useModal = () => {
  const [shown, setShown] = useState(false);

  return [shown, setShown.bind(null, true), setShown.bind(null, false)];
};

export default useModal;
