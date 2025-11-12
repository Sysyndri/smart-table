import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = new Option(`${name}`, `${name}`)
                return option;
            })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const button = action.parentElement;
            const input = button.querySelector('input');

            input.value = '';
            state[action.dataset.field] ='';         
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        const compare = createComparison(defaultRules);
        return data.filter(row => compare(row, state));
    }
}