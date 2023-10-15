import {
    sum,
    shuffle,
    sortInner,
    splitChunks,
    sortBySumOrFirst,
    sortMatrix,
    calculateEditDistance,
} from "./array-util";

describe("array-util", () => {
    test("chunk", () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const chunks = splitChunks(array, 4);
        expect(chunks).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
    });

    test("shuffle", () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const shuffled = shuffle(array);
        expect(shuffled).not.toEqual(array);
    });

    test("sum", () => {
        expect(sum([1, 2, 3])).toEqual(6);
    });

    test("sortBySumOrFirst", () => {
        const matrix = shuffle([
            [5, 6, 7, 8],
            [1, 2, 3, 9],
            [3, 3, 3, 6],
        ]);
        expect(sortBySumOrFirst(matrix)).toEqual([
            [1, 2, 3, 9],
            [3, 3, 3, 6],
            [5, 6, 7, 8],
        ]);
    });

    test("sortInner", () => {
        const array = [
            [5, 4, 3, 2],
            [9, 8, 7, 1],
        ];
        expect(sortInner(array)).toEqual([
            [2, 3, 4, 5],
            [1, 7, 8, 9],
        ]);
    });

    test("sortMatrix", () => {
        const matrix = shuffle([
            [8, 5, 6, 7],
            [3, 9, 1, 2],
            [3, 6, 3, 3],
        ]);
        expect(sortMatrix(matrix)).toEqual([
            [1, 2, 3, 9],
            [3, 3, 3, 6],
            [5, 6, 7, 8],
        ]);
    });

    test("calculateEditDistance", () => {
        expect(
            calculateEditDistance(
                [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                ],
                [
                    [9, 10, 11, 12],
                    [13, 14, 15, 16],
                ],
            ),
        ).toEqual(8);
    });
});
