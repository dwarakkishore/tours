"use client";

import Script from "next/script";

const GoogleTag = ({ tagId }) => {
  if (!tagId) return null;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
      />
      <Script
        id={`google-tag-init-${tagId}`}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${tagId}');
          `,
        }}
      />
    </>
  );
};

export default GoogleTag;
