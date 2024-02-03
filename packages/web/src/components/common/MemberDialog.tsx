import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  type CurrentSettings,
  memberCountVariantLabels,
  memberCountVariants,
} from "@doubles-member-generator/manager";
import MemberCountPane from "./MemberCountPane.tsx";

type Props = {
  settings?: CurrentSettings;
  defaultIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  showLeftMember?: boolean;
  small?: boolean;
};

export function MemberDialog({
  settings,
  defaultIndex,
  isOpen,
  onClose,
  showLeftMember,
  small,
}: Props) {
  const [tabIndex, setTabIndex] = useState(defaultIndex || 0);
  const memberCountVariant = memberCountVariants[tabIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      isCentered
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <ModalHeader maxH={"xs"} px={0} pb={0}>
            <TabList mb="1em">
              {Object.values(memberCountVariantLabels).map((label, index) => (
                <Tab key={index}>
                  <Heading size="xs">{label}</Heading>
                </Tab>
              ))}
            </TabList>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={0} px={2} mt={-2}>
            <MemberCountPane
              settings={settings}
              variant={memberCountVariant}
              showLeftMember={showLeftMember}
              small={small}
            />
          </ModalBody>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}
