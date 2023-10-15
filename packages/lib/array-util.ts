export function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function splitChunks<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export function pickMaxValueIndex(array: number[]): number {
    let biggestIndex = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[biggestIndex]) biggestIndex = i;
    }
    return biggestIndex;
}

export function sortInner<T>(array: T[][]): T[][] {
    return array.map((items) => [...items].sort());
}

export function sum(array: number[]): number {
    return array.reduce((sum, current) => sum + current, 0);
}

export function sortBySumOrFirst(array: number[][]): number[][] {
    return array.sort((a, b) => {
        const sumA = sum(a);
        const sumB = sum(b);
        if (sumA === sumB) {
            return a[0] - b[0];
        }
        return sumA - sumB;
    });
}

export function sortMatrix(matrix: number[][]): number[][] {
    return sortBySumOrFirst(sortInner(matrix));
}

export function calculateEditDistance(arr1: number[][], arr2: number[][]): number {
    return _calculateEditDistance(sortMatrix(arr1).flat(), sortMatrix(arr2).flat());
}

function _calculateEditDistance(arr1: number[], arr2: number[]): number {
    const m = arr1.length;
    const n = arr2.length;
    const dp: number[][] = [];

    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (arr1[i - 1] === arr2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
            }
        }
    }

    return dp[m][n];
}
