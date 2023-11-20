import type { CurrentSettings } from "@doubles-member-generator/manager";
import {
  Button,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { COURT_CAPACITY } from "@doubles-member-generator/manager";
import { TbUsers } from "react-icons/tb";
import HistoryPane from "@components/common/HistoryPane.tsx";
import MemberCountPane from "@components/common/MemberCountPane.tsx";

export function StatisticsPane({ settings }: { settings: CurrentSettings }) {
  const histories = settings.histories.slice(settings.histories.length - 2);
  const showStatistics =
    settings.members.length > settings.courtCount * COURT_CAPACITY;
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Stack spacing={3}>
      <HistoryPane histories={histories} />
      {showStatistics && (
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Center pt={3}>
              <Button
                w={"80%"}
                size={"sm"}
                variant={"outline"}
                leftIcon={<TbUsers />}
                color={"gray.600"}
              >
                プレイ回数を確認
              </Button>
            </Center>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontSize={"sm"}>
              プレイ回数 (連続休憩回数)
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody>
              <MemberCountPane settings={settings} small={true} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Stack>
  );
}
