import React, { useEffect } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        voiceflow: any;
    }
}

const ChatBot: React.FC = () => {
    useEffect(() => {
        const v = document.createElement('script');
        v.onload = function () {
            window.voiceflow.chat.load({
                verify: {
                    projectID: '6711fb3b3a147da6099c58f2',
                },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production',
            });
        };
        v.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
        v.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(v);
    }, []);

    return (
        <div>
        </div>
    );
};

export default ChatBot;