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

    elem.addEventListener('message', listener, false);

    return listener;
};

export const removeMessageListener = (elem, listener) => {
    elem.removeEventListener('message', listener);
};
