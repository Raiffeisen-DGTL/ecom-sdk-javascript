import Component from 'src/utils/component';

import { Paranja } from 'src/components/Paranja';
import { Button } from 'src/components/Button';

import { addClass } from 'src/utils/classList';
import style from './style.css';

export class Confirm extends Component {
    render() {
        const { onClose, onCancel } = this.props;
        const paranja = new Paranja();

        const confirmPanel = document.createElement('div');
        addClass(confirmPanel, style['confirm-panel']);

        const label = document.createElement('div');
        label.innerText = 'Вы уверены, что хотите закрыть окно?';
        addClass(label, style.label);

        const buttonWrap = document.createElement('div');
        addClass(buttonWrap, style['button-wrap']);

        const closeButton = new Button();
        const cancelButton = new Button();

        confirmPanel.appendChild(label);
        confirmPanel.appendChild(buttonWrap);
        buttonWrap.appendChild(closeButton.execute({
            onClick: onClose,
            isActive: true,
            children: 'Закрыть'
        }));
        buttonWrap.appendChild(cancelButton.execute({
            onClick: onCancel,
            children: 'Отмена'
        }));

        return paranja.execute({
            children: confirmPanel
        });
    }
}
