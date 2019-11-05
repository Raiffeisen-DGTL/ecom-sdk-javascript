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

            return new Promise((resolve, reject) => {
                if (args) {
                    resolve(args);
                } else {
                    reject();
                }
            });
        }

        replace(...args) {
            instance.replace(...args);
        }
    };
};
