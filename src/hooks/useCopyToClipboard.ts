'use client';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface useCopyToClipboardParams {
  text?: string;
  usePageUrlAsText?: boolean;
}

const useCopyToClipboard = (args: useCopyToClipboardParams) => {
  const location = useLocation();
  const [state, setState] = useState({ clipboardText: args.text || '', copied: false });

  useEffect(() => {
    if (!args.usePageUrlAsText) return;
    setState(state => ({ ...state, clipboardText: window.origin.concat(location.pathname) }));
  }, []);

  const onCopy = () => setState(state => ({ ...state, copied: true }));

  const setCopiedFalse = (after?: number) => {
    setTimeout(() => setState(state => ({ ...state, copied: false })), after);
  };

  return { ...state, onCopy, setCopiedFalse };
};

export default useCopyToClipboard;
