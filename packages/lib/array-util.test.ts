import { shuffle, sortInner, splitChunks } from "./array-util";

describe('array-util', () => {
    test('sortInner', () => {
        const array = [[5,4,3,2], [9,8,7,1]]
        expect(sortInner(array)).toEqual([[2,3,4,5], [1,7,8,9]]);
    })

    test('chunk', () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const chunks = splitChunks(array, 4);
        expect(chunks).toEqual([[1,2,3,4], [5,6,7,8], [9]]);
    })

    test('shuffle', () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const shuffled = shuffle(array);
        expect(shuffled).not.toEqual(array);
    });
});
