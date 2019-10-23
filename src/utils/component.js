export default class BaseComponent {
    execute(props = {}) {
        this.props = props;

        const elem = this.render();

        this.mount = elem;

        return this.mount;
    }

    unmount() {
        if (!this.isMount()) {
            return;
        }

        this.mount.parentNode.removeChild(this.mount);

        this.mount = null;
    }

    isMount() {
        return this.mount instanceof HTMLElement;
    }
}
