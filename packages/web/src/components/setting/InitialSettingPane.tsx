import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  type Algorithm,
  Algorithms,
  COURT_CAPACITY,
} from "@doubles-member-generator/manager";
import React, { useState } from "react";
import { GiTennisCourt } from "react-icons/gi";
import { ImGithub } from "react-icons/im";
import { MdTour } from "react-icons/md";
import { useAtomValue } from "jotai";
import { AlgorithmInput } from "./AlgorithmInput";
import { InitMemberCountInput } from "./InitMemberCountInput";
import { CourtCountInput } from "./CourtCountInput";
import logo from "@assets/logo.svg";
import HelpButton from "@components/common/HelpButton.tsx";
import { SettingsTutorialSteps, useResetTutorial } from "@components/state";
import { CourtCountTutor } from "@components/setting/tutorial/CourtCountTutor.tsx";
import { settingsTutorialAtom } from "@components/state/atoms.ts";
import { MemberCountTutor } from "@components/setting/tutorial/MemberCountTutor.tsx";
import { AlgorithmTutor } from "@components/setting/tutorial/AlgorithmTutor.tsx";

type Props = {
  onStart: (env: {
    courtCount: number;
    memberCount: number;
    algorithm: Algorithm;
  }) => void;
};

export default function InitialSettingPane({ onStart }: Props) {
  const [courtCount, setCourtCount] = useState(2);
  const [memberCount, setMemberCount] = useState(courtCount * COURT_CAPACITY);
  const [algorithm, setAlgorithm] = useState<Algorithm>(
    Algorithms.DISCRETENESS,
  );

  const onChangeCourtCount = (courtCount: number) => {
    setCourtCount(courtCount);
    if (memberCount < courtCount * COURT_CAPACITY) {
      setMemberCount(courtCount * COURT_CAPACITY);
    }
  };

  const tutorialStep = useAtomValue(settingsTutorialAtom);
  const resetTutorial = useResetTutorial();
  const isProd = window.location.hostname === "badminton.sonodar.net";

  return (
    <Card m={0} p={0} height={"100dvh"}>
      <CardBody p={0} pt={6}>
        <Center>
          <Stack spacing={6}>
            <HStack>
              <Image src={logo.src} boxSize="24px" borderRadius={"md"} />
              <Heading as="h1" size="sm">
                ダブルスメンバー決めるくん
              </Heading>
            </HStack>
            <Heading as="h2" size="lg">
              初期設定
            </Heading>
            <HStack spacing={0}>
              <Heading as="h3" size="md">
                コート数
              </Heading>
              <Text fontSize="md">（後から変更不可）</Text>
            </HStack>
            <CourtCountTutor>
              <CourtCountInput
                value={courtCount}
                onChange={onChangeCourtCount}
              />
            </CourtCountTutor>
            <Heading as="h3" size="md">
              メンバー数
            </Heading>
            <MemberCountTutor>
              <InitMemberCountInput
                min={courtCount * COURT_CAPACITY}
                value={memberCount}
                onChange={setMemberCount}
              />
            </MemberCountTutor>
            <HStack>
              <Heading as="h3" size="md">
                アルゴリズム
              </Heading>
              <HelpButton title={"アルゴリズム"} items={["algorithm"]} />
            </HStack>
            <AlgorithmTutor>
              <AlgorithmInput value={algorithm} onChange={setAlgorithm} />
            </AlgorithmTutor>
            <Divider />
            <Flex>
              <Link
                target={"_blank"}
                href={
                  "https://github.com/sonodar/badminton-court-member-randomizer"
                }
              >
                <IconButton aria-label={"github"} icon={<ImGithub />} />
              </Link>
              {!isProd && (
                <IconButton
                  aria-label={"tour"}
                  ml={4}
                  variant={"ghost"}
                  icon={<MdTour />}
                  onClick={resetTutorial}
                />
              )}
              <Spacer />
              <Button
                leftIcon={<GiTennisCourt />}
                rightIcon={<ArrowForwardIcon />}
                colorScheme={"brand"}
                variant="outline"
                onClick={() =>
                  onStart({
                    courtCount,
                    memberCount,
                    algorithm,
                  })
                }
                isDisabled={tutorialStep !== SettingsTutorialSteps.DONE}
              >
                開始
              </Button>
            </Flex>
          </Stack>
        </Center>
      </CardBody>
    </Card>
  );
}
