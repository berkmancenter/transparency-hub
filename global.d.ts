import 'react';

declare module 'react' {
    namespace JSX {
    interface IntrinsicElements {
      // replay-web-page component defined in replay/ui.js
      'replay-web-page': {
        replayBase?: string;
        source: string;
        url?: string;
        style?: Dict[any];
        hideOffscreen?: boolean;
        embed?: string;
        swName?: string;
        config?: string;
        sandbox?: boolean;
        noWebWorker?: boolean;
        newWindowBase?: boolean;
        requireSubdomainIframe?: boolean;
        loading?: string;
      };
    }
  }
}