import { array } from "./util";
import { describe, expect, test } from "bun:test";

describe("array util", () => {
    test("split chunks", () => {
        const nums = [...Array(9).keys()].map((_, i) => i + 1);
        const chunks = array.chunks(nums, 4);
        expect(chunks).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
    });

    test("shuffle", () => {
        const nums = [...Array(9).keys()].map((_, i) => i + 1);
        const shuffled = array.shuffle(nums);
        expect(shuffled).not.toEqual(nums);
    });

    test("sort inner items", () => {
        const nums = [
            [5, 4, 3, 2],
            [9, 8, 7, 1],
        ];
        expect(array.sortInnerItems(nums)).toEqual([
            [2, 3, 4, 5],
            [1, 7, 8, 9],
        ]);
    });

    test("calculate edit distance for 2D", () => {
        expect(
            array.editDistance2D(
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
            array.editDistance2D(
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
