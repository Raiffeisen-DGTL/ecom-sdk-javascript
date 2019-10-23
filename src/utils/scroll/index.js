import { addClass, removeClass } from 'src/utils/classList';
import style from './style.css';

export const disableScroll = () => {
    addClass(document.body, style['body-scroll-disable']);
    const html = document.getElementsByTagName('html')[0];

    addClass(html, style['body-scroll-disable']);
};

export const enableScroll = () => {
    removeClass(document.body, style['body-scroll-disable']);
    const html = document.getElementsByTagName('html')[0];

    removeClass(html, style['body-scroll-disable']);
};
