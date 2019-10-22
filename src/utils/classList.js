const getClassNames = element => {
    const classList = element.getAttribute('class') || '';

    return classList.split(' ').filter(Boolean);
};

export const addClass = (element, targetClass) => {
    const classNames = getClassNames(element);

    if (classNames.indexOf(targetClass) !== -1) {
        return;
    }

    classNames.push(targetClass);
    element.setAttribute('class', classNames.join(' '));
};

export const removeClass = (element, targetClass) => {
    const classNames = getClassNames(element);

    if (classNames.indexOf(targetClass) === -1) {
        return;
    }

    classNames.splice(classNames.indexOf(targetClass), 1);
    element.setAttribute('class', classNames.join(' '));
};
