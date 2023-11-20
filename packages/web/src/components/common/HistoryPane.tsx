import React from "react";
import { Box, Divider, Heading, Stack } from "@chakra-ui/react";
import type { GameMembers, History } from "@doubles-member-generator/manager";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { useSettings } from "@components/state";

export default function HistoryPane(props: { histories?: History[] }) {
  const rawHistories = props.histories || useSettings().histories;

  const [current, previous, ...olds] = rawHistories
    .map((history, index) => ({ index, history }))
    .reverse();

  const CurrentHistoryPane = ({ members }: { members: GameMembers }) => (
    <Box key={members.flat().join(",")} px={2}>
      <Heading as={"label"} size={"sm"} color={"primary.900"}>
        {" 今回 "}
      </Heading>
      <CourtMembersPane members={members} single={false} />
    </Box>
  );

  const PreviousHistoryPane = ({ members }: { members: GameMembers }) => (
    <Box key={members.flat().join(",")} px={2}>
      <Heading as={"label"} size={"sm"} color={"gray.500"}>
        {" 前回 "}
      </Heading>
      <CourtMembersPane members={members} single={false} archive={true} />
    </Box>
  );

  const OlderHistoryPane = ({
    members,
    index,
  }: {
    members: GameMembers;
    index: number;
  }) => (
    <Box key={members.flat().join(",")} px={2}>
      <Heading as={"label"} size={"sm"} color={"gray.500"}>
        {`${index + 1} 回目`}
      </Heading>
      <CourtMembersPane members={members} single={false} archive={true} />
    </Box>
  );

  return (
    <Stack spacing={3} divider={<Divider />}>
      {current && <CurrentHistoryPane members={current.history.members} />}
      {previous && <PreviousHistoryPane members={previous.history.members} />}
      {olds &&
        olds.length > 0 &&
        olds.map(({ history, index }) => (
          <OlderHistoryPane
            key={index}
            members={history.members}
            index={index}
          />
        ))}
    </Stack>
  );
}
