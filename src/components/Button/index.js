import Component from 'src/utils/component';

import { addClass } from 'src/utils/classList';
import style from './style.css';

export class Button extends Component {
    render() {
        const { isActive, onClick, children } = this.props;

        const elem = document.createElement('button');
        elem.addEventListener('click', onClick);
        elem.innerText = children;
        addClass(elem, style.button);

        if (isActive) {
            addClass(elem, style.active);
        }

        return elem;
    }
}
