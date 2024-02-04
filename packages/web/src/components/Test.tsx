import React, { useState } from "react";
import {
  Box,
  Center,
  ChakraProvider,
  Container,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { array } from "@doubles-member-generator/manager";

import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

function RestMemberBox({
  memberId,
  index,
}: {
  memberId: number;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `restMember-${memberId}`,
    data: { type: "restMember", memberId, index },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Box
      w="8"
      h="8"
      bg="red.100"
      borderRadius={16}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Center>{memberId}</Center>
    </Box>
  );
}

function RestMemberDroppable({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `restMemberDroppable-${index}`,
    data: { type: "restMember", index },
  });
  const style = {
    border: isOver ? "2px solid green" : "0",
  };
  return (
    <Box ref={setNodeRef} style={style} p={2}>
      {children}
    </Box>
  );
}

function CourtMemberBox({
  courtId,
  memberId,
  index,
}: {
  courtId: number;
  memberId: number;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `courtMember-${memberId}`,
    data: { type: "courtMember", courtId, memberId, index },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Box
      w="8"
      h="8"
      bg="green.100"
      borderRadius={16}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Center>{memberId}</Center>
    </Box>
  );
}

function CourtMemberDroppable({
  courtId,
  index,
  children,
}: {
  courtId: number;
  index: number;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `courtMemberDroppable-${courtId}-${index}`,
    data: { type: "courtMember", courtId, index },
  });
  const style = {
    border: isOver ? "2px solid green" : "0",
  };
  return (
    <Box ref={setNodeRef} style={style} p={2}>
      {children}
    </Box>
  );
}

export default function Test() {
  const courtCount: number = 2;
  const memberCount = 16;

  const restCount = memberCount - courtCount * 4;
  const playCountStartId = restCount + 1;

  const courtIds = array.generate(courtCount, 0);

  const [restMemberIds, setRestMemberIds] = useState(
    array.generate(restCount, 1),
  );
  const [playMemberIds, setPlayMemberIds] = useState(
    array.generate(courtCount * 4, playCountStartId),
  );

  const courtMemberIds = array.chunks(playMemberIds, 4);

  console.log({ courtIds, restMemberIds, playMemberIds, courtMemberIds });

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.active.data.current || !e.over?.data.current) {
      return;
    }

    const sourceType = e.active.data.current.type;
    const destType = e.over.data.current.type;
    if (sourceType === destType) return;

    if (sourceType === "restMember") {
      const sourceMemberId = e.active.data.current.memberId;

      const destCourtId = e.over.data.current.courtId;
      const destIndex = e.over.data.current.index;
      const destMemberId = courtMemberIds[destCourtId][destIndex];

      console.log({ sourceMemberId, destCourtId, destIndex, destMemberId });

      const newRestMemberIds = restMemberIds.map((memberId) => {
        if (memberId === sourceMemberId) return destMemberId;
        return memberId;
      });

      const newPlayMemberIds = playMemberIds.map((memberId) => {
        if (memberId === destMemberId) return sourceMemberId;
        return memberId;
      });

      setRestMemberIds(newRestMemberIds);
      setPlayMemberIds(newPlayMemberIds);
    } else if (sourceType === "courtMember") {
      const sourceCourtId = e.active.data.current.courtId;
      const sourceIndex = e.active.data.current.index;
      const sourceMemberId = courtMemberIds[sourceCourtId][sourceIndex];

      const destIndex = e.over.data.current.index;
      const destMemberId = restMemberIds[destIndex];

      console.log({ sourceCourtId, sourceIndex, sourceMemberId, destMemberId });

      const newRestMemberIds = restMemberIds.map((memberId) => {
        if (memberId === destMemberId) return sourceMemberId;
        return memberId;
      });

      const newPlayMemberIds = playMemberIds.map((memberId) => {
        if (memberId === sourceMemberId) return destMemberId;
        return memberId;
      });

      setRestMemberIds(newRestMemberIds);
      setPlayMemberIds(newPlayMemberIds);
    }
  };

  return (
    <ChakraProvider>
      <Container mt={8} maxW={"sm"} minW={"sm"}>
        <DndContext onDragEnd={onDragEnd} autoScroll={false}>
          <Stack spacing={10}>
            <Box borderStyle={"solid"} borderWidth={1} borderRadius={4} p={2}>
              休憩メンバー
              <SimpleGrid columns={6} spacing={4}>
                {restMemberIds.map((memberId, index) => (
                  <RestMemberDroppable
                    index={index}
                    key={`restMemberDroppable-${memberId}`}
                  >
                    <RestMemberBox memberId={memberId} index={index} />
                  </RestMemberDroppable>
                ))}
              </SimpleGrid>
            </Box>
            <SimpleGrid columns={courtCount === 1 ? 1 : 2} spacing={4}>
              {courtIds.map((courtId) => (
                <Box
                  key={`court-${courtId}`}
                  borderStyle={"solid"}
                  borderWidth={1}
                  p={2}
                >
                  コート {courtId + 1}
                  <SimpleGrid columns={2} spacing={4}>
                    {courtMemberIds[courtId].map((memberId, index) => (
                      <CourtMemberDroppable
                        courtId={courtId}
                        index={index}
                        key={`courtMemberDroppable-${memberId}`}
                      >
                        <CourtMemberBox
                          courtId={courtId}
                          memberId={memberId}
                          index={index}
                        />
                      </CourtMemberDroppable>
                    ))}
                  </SimpleGrid>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </DndContext>
      </Container>
    </ChakraProvider>
  );
}
