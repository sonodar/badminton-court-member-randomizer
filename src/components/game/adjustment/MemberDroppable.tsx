import { useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";
import React from "react";
import type { RestOrCourtMember } from "@logic";

export function MemberDroppable({
	children,
	...member
}: RestOrCourtMember & { children: React.ReactNode }) {
	const { isOver, setNodeRef } = useDroppable({
		id: `${member.type}Droppable-${member.memberId}`,
		data: member,
	});
	const style = {
		background: isOver ? "var(--chakra-colors-gray-100)" : "transparent",
	};
	return (
		<Box w={12} h={12} p={2} rounded={"sm"} ref={setNodeRef} style={style}>
			{children}
		</Box>
	);
}
