'use client'
import React, { useEffect } from 'react'


const GiscusWidget = ({ slug, title, theme, categoryid}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.id = slug;
    script.async = true;
    script.setAttribute('data-repo', 'zoeeechu/n1bz.dev-site');
    script.setAttribute('data-repo-id', 'R_kgDOKFaagw');
    script.setAttribute('data-category', title);
    script.setAttribute('data-category-id', categoryid);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', `blog/${title}`);
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-giscus-config-url', 'app/giscus.json'); // Update the path to your giscus.json file
    if (theme) {
      script.setAttribute('data-theme', theme);
    }
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [slug, title, theme, categoryid]);

  return null;
};

export default GiscusWidget;
