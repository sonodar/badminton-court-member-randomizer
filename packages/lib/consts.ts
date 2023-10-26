// 1 コートあたりの収容人数（バドミントンのダブルスなので 4）
export const COURT_CAPACITY = 4;

// コート数の上限 (これ以上必要になることはないはず)
export const COURT_COUNT_LIMIT = 4;

// メンバー数の上限（これ以上必要になることはないはず）
export const MEMBER_COUNT_LIMIT = COURT_CAPACITY * COURT_COUNT_LIMIT * 2;
