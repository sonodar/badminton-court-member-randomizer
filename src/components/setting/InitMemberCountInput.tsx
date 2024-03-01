import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
	Box,
	HStack,
	IconButton,
	Input,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { MEMBER_COUNT_LIMIT } from "@logic";

type Props = {
	min: number;
	value: number;
	onChange: (i: number) => void;
};

export function InitMemberCountInput({ min, value, onChange }: Props) {
	return (
		<VStack spacing={4}>
			<HStack maxW={"320px"} minW={"320px"}>
				<IconButton
					colorScheme={"brand"}
					aria-label="decrement"
					borderRadius="sm"
					isDisabled={value <= min}
					icon={<MinusIcon />}
					size={"sm"}
					onClick={() => value > min && onChange(value - 1)}
				/>
				<Input
					type={"number"}
					value={value}
					step={1}
					min={min}
					max={MEMBER_COUNT_LIMIT}
					style={{ textAlign: "center" }}
					width={"20"}
					size={"sm"}
					fontSize={"md"}
					onChange={(e) => onChange(parseInt(e.target.value))}
				/>
				<IconButton
					colorScheme={"brand"}
					aria-label="increment"
					borderRadius="sm"
					isDisabled={value >= MEMBER_COUNT_LIMIT}
					icon={<AddIcon />}
					size={"sm"}
					onClick={() => value < MEMBER_COUNT_LIMIT && onChange(value + 1)}
				/>
				<Text fontSize="md">(上限 {MEMBER_COUNT_LIMIT} 人)</Text>
			</HStack>
			<Slider
				colorScheme={"brand"}
				min={4}
				max={MEMBER_COUNT_LIMIT}
				value={value}
				onChange={(value) => onChange(Math.max(min, value))}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb boxSize={6}>
					<Box color="brand.600" as={BsArrowsExpandVertical} />
				</SliderThumb>
			</Slider>
		</VStack>
	);
}
