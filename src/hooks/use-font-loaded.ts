import { useState, useEffect } from 'react';

export function useFontLoaded(fontFamily = 'BigBlueTerm437'): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setLoaded(document.fonts.check(`16px "${fontFamily}"`));
    });
  }, [fontFamily]);

  return loaded;
}
