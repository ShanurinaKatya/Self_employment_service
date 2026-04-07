
export function removeValues(array, ...valuesToRemove) {
    return array.filter(item => !valuesToRemove.includes(item));
}

export function merge(...objects) {
    const result = {};
    // Цикл с постусловием (do...while) – проходим по объектам
    let i = 0;
    if (objects.length === 0) return result;
    do {
        const currentObj = objects[i];
        // Работа со строкой (имя ключа) и объектом
        for (const key in currentObj) {
            if (currentObj.hasOwnProperty(key) && !(key in result)) {
                result[key] = currentObj[key];
            }
        }
        i++;
    } while (i < objects.length);
    return result;
}
