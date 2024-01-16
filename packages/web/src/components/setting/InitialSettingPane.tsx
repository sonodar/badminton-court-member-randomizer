import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  COURT_CAPACITY,
  type Algorithm,
} from "@doubles-member-generator/manager";
import React, { useState } from "react";
import { GiTennisCourt } from "react-icons/gi";
import { ImGithub } from "react-icons/im";
import { AlgorithmInput } from "./AlgorithmInput";
import { InitMemberCountInput } from "./InitMemberCountInput";
import { CourtCountInput } from "./CourtCountInput";
import logo from "@assets/logo.svg";
import HelpButton from "@components/common/HelpButton.tsx";

type Props = {
  onStart: (env: {
    courtCount: number;
    memberCount: number;
    algorithm: Algorithm;
  }) => void;
};

export default function InitialSettingPane({ onStart }: Props) {
  const [courtCount, setCourtCount] = useState(2);
  const [memberCount, setMemberCount] = useState(2 * COURT_CAPACITY);
  const [algorithm, setAlgorithm] = useState<Algorithm>("DISCRETENESS");

  const onChangeCourtCount = (courtCount: number) => {
    setCourtCount(courtCount);
    if (memberCount < courtCount * COURT_CAPACITY) {
      setMemberCount(courtCount * COURT_CAPACITY);
    }
  };

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
            <CourtCountInput value={courtCount} onChange={onChangeCourtCount} />
            <Heading as="h3" size="md">
              メンバー数
            </Heading>
            <InitMemberCountInput
              min={courtCount * COURT_CAPACITY}
              value={memberCount}
              onChange={setMemberCount}
            />
            <HStack>
              <Heading as="h3" size="md">
                アルゴリズム
              </Heading>
              <HelpButton title={"アルゴリズム"} items={["algorithm"]} />
            </HStack>
            <AlgorithmInput value={algorithm} onChange={setAlgorithm} />
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
