const POST_MESSAGE_EVENT_TYPE = 'message';
const FINISH_EVENT = 'finish';

export const addMessageListener = (elem, mapping) => {
    const listener = e => {
        if (!e || !e.data) {
            return;
        }

        let data;
        try {
            data = JSON.parse(e.data);
        } catch (err) {
            return;
        }

        if (!data || typeof data !== 'object' || typeof data.event !== 'string') {
            return;
        }

        if (data.event === FINISH_EVENT) {
            const handler = mapping.finish;

            if (typeof handler === 'function') {
                handler(data.content);
            }

            return;
        }
    };

    elem.addEventListener(POST_MESSAGE_EVENT_TYPE, listener, false);

    return listener;
};

export const removeMessageListener = (elem, listener) => {
    elem.removeEventListener(POST_MESSAGE_EVENT_TYPE, listener);
};
