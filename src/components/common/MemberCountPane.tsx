import { Box, Center, Divider, HStack, Heading, SimpleGrid, Text, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useState } from "react";
import {
	type CurrentSettings,
	array,
	type MemberCountVariant,
	OutlierLevelProvider,
	memberCountVariantLabels,
	memberCountVariants,
} from "@logic";
import { useSettings } from "@components/state";

type Props = {
	settings?: Pick<CurrentSettings, "histories" | "members" | "gameCounts">;
	showLeftMember?: boolean;
	defaultTabIndex?: number;
};

const outlierLevelColors = {
	none: "",
	low: "yellow.100",
	medium: "orange.200",
	high: "red.200",
} as const;

export default function MemberCountPane({ settings, showLeftMember, defaultTabIndex }: Props) {
	const [tabIndex, setTabIndex] = useState(defaultTabIndex || 0);
	const memberCountVariant = memberCountVariants[tabIndex];

	const { histories, members, gameCounts } = settings || useSettings();
	const playMemberIds = Object.keys(gameCounts).map(Number);
	const memberIds = array.sort(array.unique(members.concat(showLeftMember ? playMemberIds : [])));

	const { getLevel, getValue } = OutlierLevelProvider({
		histories,
		members,
		gameCounts,
	});

	function CountPain({
		id,
		variant,
	}: {
		id: number;
		playCount?: number;
		variant: MemberCountVariant;
	}) {
		const value = getValue(variant, id);
		const level = getLevel(variant, id);
		const color = !members.includes(id) ? "gray" : outlierLevelColors[level];

		return (
			<Box bg={color} color={members.includes(id) ? "" : "white"}>
				<Center>
					<HStack spacing={3}>
						<Heading as={"label"} size={"md"}>{`${id} :`}</Heading>
						<Text fontSize={"md"}>{value} 回</Text>
					</HStack>
				</Center>
				{members.includes(id) && <Divider />}
			</Box>
		);
	}

	return (
		<Tabs index={tabIndex} onChange={setTabIndex} variant={"enclosed"}>
			<TabList mb="1em">
				{Object.values(memberCountVariantLabels).map((label) => (
					<Tab key={label}>
						<Heading size="xs">{label}</Heading>
					</Tab>
				))}
			</TabList>
			<SimpleGrid minChildWidth="110px" spacing={0} color={"gray.600"}>
				{memberIds.map((id) => (
					<CountPain key={id} id={id} variant={memberCountVariant} />
				))}
			</SimpleGrid>
		</Tabs>
	);
}
