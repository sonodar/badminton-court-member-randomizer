import { Button, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
    members: number[];
    isOpen: boolean;
    onClose: () => void | Promise<void>;
    onLeave(id: number): void | Promise<void>;
};

export function LeaveDialog({ members, isOpen, onClose, onLeave }: Props) {
    const [value, setValue] = useState<number>(0);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(parseInt(e.target.options[e.target.selectedIndex].value, 10));
    };

    const handleLeave = () => {
        if (value !== 0) onLeave(value);
        window.alert(value);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody py={4}>
                    <HStack>
                        <Select placeholder="番号を選択してください" onChange={handleSelect}>
                            {members.map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </Select>
                        <Button colorScheme="orange" size={"sm"} onClick={handleLeave}>
                            離脱
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
