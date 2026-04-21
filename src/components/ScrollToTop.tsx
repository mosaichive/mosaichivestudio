import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top on every route change (ignores hash links).
 * Mounted once inside <BrowserRouter> in App.tsx.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let in-page anchors work normally
    // Slight delay so it lines up with the page transition exit/enter.
    const t = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 50);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
