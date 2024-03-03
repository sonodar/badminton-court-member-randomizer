import { Badge, Center } from "@chakra-ui/react";
import { type Algorithm, Algorithms } from "@logic";

const badgeLabels: Record<Algorithm, string> = {
	[Algorithms.DISCRETENESS]: "ばらつき重視",
	[Algorithms.EVENNESS]: "均等性重視",
};

export function AlgorithmBadge({ algorithm }: { algorithm: Algorithm }) {
	const badgeLabel = badgeLabels[algorithm];
	return (
		<Badge borderRadius={"md"} w={"80%"} variant="subtle" colorScheme={"brand"}>
			<Center>{badgeLabel}</Center>
		</Badge>
	);
}
