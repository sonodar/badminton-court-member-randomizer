import React, { type ReactNode } from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
  SettingsTutorialSteps,
  useSettingsTutorialReducer,
} from "@components/state";
import { Tutor } from "@components/common/Tutor.tsx";

export function AlgorithmTutor({ children }: { children: ReactNode }) {
  const [step, dispatch] = useSettingsTutorialReducer();

  if (step !== SettingsTutorialSteps.ALGORITHM) {
    return children;
  }

  return (
    <Tutor
      isOpen={step === SettingsTutorialSteps.ALGORITHM}
      title={"アルゴリズム"}
      description={
        <Stack spacing={4} fontSize={"small"}>
          <Text>メンバー選出のアルゴリズムを選択してください。</Text>
          <Text fontWeight="semibold">ばらつき重視</Text>
          <Text>
            なるべく似通った面子にならないようにメンバーを選出します。連続での休憩が発生しますが、何度も繰り返しているうちに平準化されていきます。
          </Text>
          <Text fontWeight="semibold">均等性重視</Text>
          <Text>
            なるべく均等な回数でコートに入れるようにメンバーを選出します。連続での休憩が発生しづらくなりますが、似通った面子になる傾向が強くなります。
          </Text>
        </Stack>
      }
      placement={"top"}
      onBack={() => dispatch("back")}
      onDone={() => dispatch("next")}
    >
      {children}
    </Tutor>
  );
}
