export default TargetClass => {
    let instance = null;

    return class {
        constructor(...args) {
            instance = new TargetClass(...args);
        }

        openPopup(...args) {
            instance.openPopup(...args);
        }

        open(...args) {
            instance.open(...args);
        }
    };
};
