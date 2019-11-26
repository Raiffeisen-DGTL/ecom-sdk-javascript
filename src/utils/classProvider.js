export default TargetClass => {
    let instance = null;

    return class {
        constructor(...args) {
            instance = new TargetClass(...args);
        }

        openPopup(...args) {
            return instance.openPopup(...args);
        }

        openWindow(...args) {
            return instance.openWindow(...args);
        }

        replace(...args) {
            return instance.replace(...args);
        }
    };
};
