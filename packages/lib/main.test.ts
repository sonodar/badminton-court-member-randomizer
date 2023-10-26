import { describe, expect, test } from "bun:test";
import { BadmintonDoublesMemberGenerator } from "./main";
import { array } from "./util";

describe("main", () => {
    test("properties", () => {
        const generator = new BadmintonDoublesMemberGenerator({
            courtCount: 2,
            members: array.generate(12),
        });

        expect(generator.courtCount).toBe(2);
        expect(generator.courtCapacity).toBe(8);
        expect(generator.memberCount).toBe(12);
        expect(generator.combinationCount).toBe(34650);
        expect(generator.members).toStrictEqual(array.generate(12));
    });

    test("generate random members", () => {
        const initial = new BadmintonDoublesMemberGenerator({
            courtCount: 2,
            members: array.generate(12),
        });

        // 履歴が生成されていること
        const members = initial.next();
        expect(initial.histories[0]).toStrictEqual({ members });

        // 履歴が増えていること、最初の履歴が保持されていること
        const next = initial.next();
        expect(initial.histories.length).toBe(2);
        expect(initial.histories[0]).toStrictEqual({ members });

        // リトライした場合は履歴が増えないこと
        initial.retry();
        expect(initial.histories.length).toBe(2);
        expect(initial.histories[0]).toStrictEqual({ members });
        // 最後の履歴が変わっていること
        expect(initial.histories[1]).not.toStrictEqual(next);

        const added = initial.join();

        // メンバーが増えていること、履歴が変わらないこと
        expect(added.memberCount).toBe(13);
        expect(added.histories).toStrictEqual(initial.histories);
        expect(added.gameCounts).toStrictEqual({ ...initial.gameCounts, 13: 0 });

        added.next();

        // 履歴が増えていること、最初の履歴が保持されていること
        expect(added.histories.length).toBe(3);
        expect(added.histories[0]).toStrictEqual({ members });

        const leaveMemberId = added.histories[0].members[0][0];
        const left = added.leave(leaveMemberId);

        // メンバーが減っていること
        expect(left.memberCount).toBe(12);

        // 除隊したメンバーの履歴に削除マーカーが立っていること
        expect(left.histories[0].deleted).toBe(true);
    });
});
