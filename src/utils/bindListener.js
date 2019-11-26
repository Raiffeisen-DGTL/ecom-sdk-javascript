const POST_MESSAGE_EVENT_TYPE = 'message';

export const addMessageListener = (elem, mapping) => {
    const listener = e => {
        if (!e || !e.data) {
            return;
        }

        const data = JSON.parse(e.data);

        if (!data.event || typeof mapping[data.event] !== 'function') {
            return;
        }

        mapping[data.event](data.content);
    };

    elem.addEventListener(POST_MESSAGE_EVENT_TYPE, listener, false);

    return listener;
};

export const removeMessageListener = (elem, listener) => {
    elem.removeEventListener(POST_MESSAGE_EVENT_TYPE, listener);
};
