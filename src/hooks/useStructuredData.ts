import { useEffect } from 'react';

const ROUTE_STRUCTURED_DATA_ID = 'route-structured-data';
const PRERENDER_STRUCTURED_DATA_ID = 'prerender-structured-data';

export function useStructuredData(data: unknown) {
  const serialized = data == null ? null : JSON.stringify(data);

  useEffect(() => {
    const prerendered = document.getElementById(PRERENDER_STRUCTURED_DATA_ID);
    prerendered?.remove();

    if (!serialized) {
      document.getElementById(ROUTE_STRUCTURED_DATA_ID)?.remove();
      return;
    }

    let script = document.getElementById(ROUTE_STRUCTURED_DATA_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = ROUTE_STRUCTURED_DATA_ID;
      document.head.appendChild(script);
    }

    script.textContent = serialized;

    return () => {
      if (script?.textContent === serialized) {
        script.remove();
      }
    };
  }, [serialized]);
}
