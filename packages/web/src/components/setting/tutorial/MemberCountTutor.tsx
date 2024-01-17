import React, { type ReactNode } from "react";
import {
  SettingsTutorialSteps,
  useSettingsTutorialReducer,
} from "@components/state";
import { Tutor } from "@components/common/Tutor.tsx";

export function MemberCountTutor({ children }: { children: ReactNode }) {
  const [step, dispatch] = useSettingsTutorialReducer();

  if (step !== SettingsTutorialSteps.MEMBER_COUNT) {
    return children;
  }

  return (
    <Tutor
      isOpen={step === SettingsTutorialSteps.MEMBER_COUNT}
      title={"メンバー数"}
      description={
        "参加するメンバーの人数を入力してください。メンバー数は開始後でも増減可能です。"
      }
      placement={"top"}
      onBack={() => dispatch("back")}
      onNext={() => dispatch("next")}
    >
      {children}
    </Tutor>
  );
}
