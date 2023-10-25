import { calculateEditDistance, shuffle, sortMatrixItems, splitChunks } from "./array-util";

describe("array-util", () => {
    test("splitChunks", () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const chunks = splitChunks(array, 4);
        expect(chunks).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
    });

    test("shuffle", () => {
        const array = [...Array(9).keys()].map((_, i) => i + 1);
        const shuffled = shuffle(array);
        expect(shuffled).not.toEqual(array);
    });

    test("sortMatrixItems", () => {
        const array = [
            [5, 4, 3, 2],
            [9, 8, 7, 1],
        ];
        expect(sortMatrixItems(array)).toEqual([
            [2, 3, 4, 5],
            [1, 7, 8, 9],
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
                    [5, 6, 7, 8],
                    [1, 2, 3, 4],
                ],
            ),
        ).toEqual(0);
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
