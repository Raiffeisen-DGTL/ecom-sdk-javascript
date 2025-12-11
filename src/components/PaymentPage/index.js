import Component from 'src/utils/component';

import { Paranja } from 'src/components/Paranja';
import { addClass } from 'src/utils/classList';
import style from './style.css';

export class PaymentPage extends Component {
    name = 'payment-page';

    handleClickCross = e => {
        e.stopPropagation();

        const { onForceClose } = this.props;

        onForceClose();
    }

    render() {
        const { onClose } = this.props;
        const paranja = new Paranja();

        const cover = document.createElement('div');
        addClass(cover, style.cover);

        const cross = document.createElement('div');
        addClass(cross, style.cross);
        cross.addEventListener('click', this.handleClickCross);
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '28');
        svg.setAttribute('height', '28');
        svg.setAttribute('viewBox', '0 0 28 28');
        svg.setAttribute('fill', 'white');

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M11.5255 14L0 25.5255V28H2.4745L14 16.4745L25.5255 28H28V25.5255L16.4745 14L28 2.4745V0H25.5255L14 11.5255L2.4745 0H0V2.4745L11.5255 14Z');

        svg.appendChild(path);
        cross.appendChild(svg);

        const wrap = document.createElement('div');
        addClass(wrap, style.wrap);

        const inner = document.createElement('div');
        addClass(inner, style.inner);

        const iframe = document.createElement('iframe');
        iframe.setAttribute('name', this.name);
        addClass(iframe, style.iframe);

        const iframeWrap = document.createElement('div');
        addClass(iframeWrap, style['iframe-wrap']);

        cover.appendChild(wrap);
        cover.appendChild(cross);
        wrap.appendChild(iframeWrap);
        iframeWrap.appendChild(iframe);

        return paranja.execute({
            children: cover,
            onClick: onClose
        });
    }

    get url() {
        const { url } = this.props;
        const pos = url.indexOf('?');

        if (pos === -1) {
            return url;
        }

        return url.slice(0, pos);
    }
}
