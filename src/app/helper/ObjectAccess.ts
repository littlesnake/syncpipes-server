import * as lodash from 'lodash'


export function isScalarArray(arr: Array<any>): boolean {
    for (let item of arr) {
        if (lodash.isObject(item)) {
            return false;
        }
        if (lodash.isArray(item)) {
            let result = isScalarArray(item);
            if (result === false) {
                return false;
            }
        }
    }

    return true;
}

export function at(src: any, path: string): Array<Object> {
    if (typeof src === 'undefined') {
        return [];
    }
    if (path === "") {
        if (lodash.isArray(src)) {
            return src;
        }
        return [src];
    }
    let idx = path.indexOf("/");
    let current = idx === -1 ? path : path.substr(0, idx);
    // last bit of the path
    if (current === path) {
        if (src.hasOwnProperty(path)) {
            if (lodash.isArray(src[current])) {
                if (isScalarArray(src[current])) {
                    return [src[current]]
                }
                return src[current];
            }
            return [src[current]];
        }
    }

    let values = new Array<Object>();
    if (lodash.isArray(src[current])) {
        for (let item of src[current]) {
            values = values.concat(at(item, path.substr(idx+1)));
        }
    } else {
        values = at(src[current], path.substr(idx+1));
    }

    return values;
}

export function where(src: Object, path: string, wherePath: string, whereValue: any): Array<Object> {
    // make compatible to lodash
    wherePath = wherePath.replace('/', '.');
    // get values using at
    let result = new Array<Object>();
    let values = at(src, path);
    if (values.length > 0) {
        for (let value of values) {
            if (lodash.has(value, wherePath) && lodash.get(value, wherePath) === whereValue) {
                result.push(value);
            }
        }
    }
    return result;
}
