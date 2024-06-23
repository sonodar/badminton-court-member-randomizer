import { Box, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import type { History } from "@logic";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { useSettings } from "@components/state";
import { format } from "@formkit/tempo";

function formatDate(date: string) {
	return format(new Date(date), "YYYY/MM/DD HH:mm");
}

export default function HistoryPane(props: { histories?: History[] }) {
	const rawHistories = props.histories || useSettings().histories;

	const [current, previous, ...olds] = rawHistories.map((history, index) => ({ index, history })).reverse();

	const CurrentHistoryPane = ({ members, time }: History) => (
		<Box key={members.flat().join(",")} px={2}>
			<Flex p={2}>
				<Heading as={"label"} size={"sm"} color={"primary.900"}>
					{" 今回 "}
				</Heading>
				<Spacer />
				<Text fontSize={"xs"} color="gray.500">
					{formatDate(time)}
				</Text>
			</Flex>
			<CourtMembersPane members={members} single={false} />
			<Text fontSize={"xs"} p={2} color="red.500">
				ペアは各コートでじゃんけんなどで決めてください
			</Text>
		</Box>
	);

	const PreviousHistoryPane = ({ members, time }: History) => (
		<Box key={members.flat().join(",")} px={2}>
			<Flex p={2}>
				<Heading as={"label"} size={"sm"} color={"gray.500"}>
					{" 前回 "}
				</Heading>
				<Spacer />
				<Text fontSize={"xs"} color="gray.500">
					{formatDate(time)}
				</Text>
			</Flex>
			<CourtMembersPane members={members} single={false} archive={true} />
		</Box>
	);

	const OlderHistoryPane = ({
		members,
		time,
		index,
	}: History & {
		index: number;
	}) => (
		<Box key={members.flat().join(",")} px={2}>
			<Flex p={2}>
				<Heading as={"label"} size={"sm"} color={"gray.500"}>
					{`${index + 1} 回目`}
				</Heading>
				<Spacer />
				<Text fontSize={"xs"} color="gray.500">
					{formatDate(time)}
				</Text>
			</Flex>
			<CourtMembersPane members={members} single={false} archive={true} />
		</Box>
	);

	return (
		<Stack spacing={3} divider={<Divider />}>
			{current && <CurrentHistoryPane {...current.history} />}
			{previous && <PreviousHistoryPane {...previous.history} />}
			{olds &&
				olds.length > 0 &&
				olds.map(({ history, index }) => <OlderHistoryPane key={index} {...history} index={index} />)}
		</Stack>
	);
}
