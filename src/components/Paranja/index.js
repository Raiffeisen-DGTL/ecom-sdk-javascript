import Component from 'src/utils/component';

import { addClass } from 'src/utils/classList';
import style from './style.css';

export class Paranja extends Component {
    render() {
        const { children, onClick } = this.props;
        const elem = document.createElement('div');

        addClass(elem, style.root);
        elem.addEventListener('click', onClick);

        elem.appendChild(children);

        return elem;
    }
}
