import { add } from './add';

export const multi = (a, b) => {
    let res = 0
    for (let i = 0; i < a; i += 1) {
        res = add(res, b)
    }
    return res
}
