'use client';

import { useEffect, useState } from "react";

export default function InternalReplayPage({waczPath, waczUrl} : {
  waczPath: string
  waczUrl: string
}) {

  const [isReady, setIsReady] = useState(false);
  const [proxyUrl, setProxyUrl] = useState<string>('');

  useEffect(() => {
    const checkReady = async () => {
      if (window.customElements.get('replay-web-page')) {
        // Already loaded
        setIsReady(true);
      } else {
        // Wait for it
        await window.customElements.whenDefined('replay-web-page');
        setIsReady(true);
      }
    };

    checkReady();
  }, []);

  useEffect(() => {
    const proxied = `/api/proxy-warc?url=${encodeURIComponent(waczPath)}`;
    setProxyUrl(proxied);
  }, [waczPath]);

  return (
    <div className="w-full h-full min-h-140 flex">
      {isReady && (<replay-web-page
          replayBase="/replay/"
          source={proxyUrl}
          url={waczUrl}
          style={{ width: '100%', height: '600px' }}
          hideOffscreen
        >
      </replay-web-page>)}
    </div>
  )
}