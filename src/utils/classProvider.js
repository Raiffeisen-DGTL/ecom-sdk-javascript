export default TargetClass => {
    let instance = null;

    return class {
        constructor(...args) {
            instance = new TargetClass(...args);
        }

        openPopup(...args) {
            instance.openPopup(...args);
        }

        openWindow(...args) {
            instance.openWindow(...args);
        }

        replace(...args) {
            instance.replace(...args);
        }
    };
};
