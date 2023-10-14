export function shuffle(array: number[]): number[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function splitChunks(array: number[], chunkSize: number): number[][] {
    const result: number[][] = [];
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

export function sortInner(array: number[][]): number[][] {
    return array.map((items) => [...items].sort());
}

export function calculateEditDistance(arr1: number[][], arr2: number[][]): number {
    return _calculateEditDistance(arr1.flat().sort(), arr2.flat().sort());
}

function _calculateEditDistance(arr1: number[], arr2: number[]): number {
    const m = arr1.length;
    const n = arr2.length;
    const dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (arr1[i - 1] === arr2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}
