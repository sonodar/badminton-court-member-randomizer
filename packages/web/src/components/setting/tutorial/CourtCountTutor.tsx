import React, { type ReactNode } from "react";
import {
  SettingsTutorialSteps,
  useSettingsTutorialReducer,
} from "@components/state";
import { Tutor } from "@components/common/Tutor.tsx";

export function CourtCountTutor({ children }: { children: ReactNode }) {
  const [step, dispatch] = useSettingsTutorialReducer();

  if (step !== SettingsTutorialSteps.COURT_COUNT) {
    return children;
  }

  return (
    <Tutor
      isOpen={step === SettingsTutorialSteps.COURT_COUNT}
      title={"コート数"}
      description={
        "利用可能なコート数を選択してください。開始後はコート数を変更できません。"
      }
      onNext={() => dispatch("next")}
    >
      {children}
    </Tutor>
  );
}
