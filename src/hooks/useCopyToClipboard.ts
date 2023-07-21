import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface useCopyToClipboardParams {
  text?: string;
  usePageUrlAsText?: boolean;
}

const useCopyToClipboard = (params: useCopyToClipboardParams) => {
  const location = useLocation();
  const [state, setState] = useState({ clipboardText: params.text || '', copied: false });

  useEffect(() => {
    if (!params.usePageUrlAsText) return;
    setState(state => ({ ...state, clipboardText: window.origin.concat(location.pathname) }));
  }, []);

  const onCopy = () => setState(state => ({ ...state, copied: true }));

  const setCopiedFalse = (after?: number) => {
    setTimeout(() => setState(state => ({ ...state, copied: false })), after);
  };

  return { ...state, onCopy, setCopiedFalse };
};

export default useCopyToClipboard;
