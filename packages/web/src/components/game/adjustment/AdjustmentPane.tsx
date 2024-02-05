import React from "react";
import {
  array,
  type CourtMembers,
  type CurrentSettings,
  type GameMembers,
  getLatestMembers,
  getRestMembers,
} from "@doubles-member-generator/manager";
import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

function RestMemberBox({
  memberId,
  index,
}: {
  memberId: number;
  index: number;
}) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
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
      pt={1}
      bg="danger.100"
      borderRadius="full"
      boxShadow={isDragging ? undefined : "sm"}
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
    background: isOver ? "var(--chakra-colors-gray-100)" : "transparent",
  };
  return (
    <Box w={12} h={12} p={2} rounded={"sm"} ref={setNodeRef} style={style}>
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
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
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
      pt={1}
      bg="brand.300"
      borderRadius="full"
      boxShadow={isDragging ? undefined : "sm"}
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
    background: isOver ? "var(--chakra-colors-gray-100)" : "transparent",
  };
  return (
    <Box w={12} h={12} p={2} rounded={"sm"} ref={setNodeRef} style={style}>
      <Center>{children}</Center>
    </Box>
  );
}

type Props = Pick<CurrentSettings, "courtCount" | "members" | "histories"> & {
  onChange: (gameMembers: GameMembers) => void;
};

export function AdjustmentPane({
  courtCount,
  members,
  histories,
  onChange,
}: Props) {
  const gameMembers = getLatestMembers({ histories });

  if (!gameMembers) return null;

  const restMembers = getRestMembers({ members }, gameMembers);
  const courtIds = array.generate(courtCount, 0);

  const toast = useToast({
    status: "success",
    duration: 2000,
    isClosable: false,
    colorScheme: "brand",
    variant: "subtle",
    position: "top",
  });

  const showToast = (sourceMemberId: number, destMemberId: number) => {
    toast({
      title: `${sourceMemberId} 番と ${destMemberId} 番を入れ替えました`,
    });
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.active.data.current || !e.over?.data.current) {
      return;
    }

    const sourceType = e.active.data.current.type;
    const destType = e.over.data.current.type;

    console.log({ sourceType, destType });

    // 休憩メンバーを参加させる場合
    if (sourceType === "restMember") {
      if (destType !== "courtMember") return;

      const sourceMemberId = e.active.data.current.memberId;

      const destCourtId = e.over.data.current.courtId;
      const destIndex = e.over.data.current.index;
      const destMemberId = gameMembers[destCourtId][destIndex];

      const newPlayMemberIds = gameMembers.map((courtMembers, courtId) => {
        if (courtId !== destCourtId) return courtMembers;
        return courtMembers.map((id) =>
          id === destMemberId ? sourceMemberId : id,
        ) as CourtMembers;
      });

      onChange(newPlayMemberIds);
      return showToast(sourceMemberId, destMemberId);
    }

    if (sourceType === "courtMember") {
      // 参加メンバーを休憩させる場合
      if (destType === "restMember") {
        const sourceCourtId = e.active.data.current.courtId;
        const sourceIndex = e.active.data.current.index;
        const sourceMemberId = gameMembers[sourceCourtId][sourceIndex];

        const destIndex = e.over.data.current.index;
        const destMemberId = restMembers[destIndex];

        const newPlayMemberIds = gameMembers.map((courtMembers, courtId) => {
          if (courtId !== sourceCourtId) return courtMembers;
          return courtMembers.map((id) =>
            id === sourceMemberId ? destMemberId : id,
          ) as CourtMembers;
        });

        onChange(newPlayMemberIds);
        return showToast(sourceMemberId, destMemberId);
      }

      // 参加メンバー同士を入れ替える場合
      if (destType === "courtMember") {
        const sourceCourtId = e.active.data.current.courtId;
        const destCourtId = e.over.data.current.courtId;

        if (sourceCourtId === destCourtId) return;

        const sourceIndex = e.active.data.current.index;
        const sourceMemberId = gameMembers[sourceCourtId][sourceIndex];

        const destIndex = e.over.data.current.index;
        const destMemberId = gameMembers[destCourtId][destIndex];

        if (sourceMemberId === destMemberId) return;

        const newPlayMemberIds = gameMembers.map((courtMembers, courtId) => {
          if (courtId !== sourceCourtId && courtId !== destCourtId) {
            return courtMembers;
          }
          if (courtId === sourceCourtId) {
            return courtMembers.map((id) =>
              id === sourceMemberId ? destMemberId : id,
            ) as CourtMembers;
          }
          return courtMembers.map((id) =>
            id === destMemberId ? sourceMemberId : id,
          ) as CourtMembers;
        });

        onChange(newPlayMemberIds);
        return showToast(sourceMemberId, destMemberId);
      }
    }
  };

  const leftSpan = 3;
  const rightSpan = 5;
  const columnGap = 5;

  return (
    <DndContext onDragEnd={onDragEnd} autoScroll={false}>
      <Stack spacing={4} w={"100%"}>
        <Text fontSize={"sm"}>↓ ドラッグ＆ドロップで調整できます ↓</Text>
        <Grid
          templateColumns={`repeat(${leftSpan + rightSpan}, 1fr)`}
          templateRows={`repeat(${courtCount}, 1fr)`}
          columnGap={columnGap}
        >
          {restMembers.length > 0 && (
            <GridItem colSpan={leftSpan} rowSpan={courtCount}>
              <Stack>
                <Heading as={"label"} size={"sm"} pl={2}>
                  休憩
                </Heading>
                <SimpleGrid columns={2} spacing={0}>
                  {restMembers.map((memberId, index) => (
                    <RestMemberDroppable
                      index={index}
                      key={`restMemberDroppable-${memberId}`}
                    >
                      <RestMemberBox memberId={memberId} index={index} />
                    </RestMemberDroppable>
                  ))}
                </SimpleGrid>
              </Stack>
            </GridItem>
          )}
          {courtIds.map((courtId) => (
            <GridItem colSpan={rightSpan} rowSpan={1} key={`court-${courtId}`}>
              <Heading as={"label"} size={"sm"}>
                コート {courtId + 1}
              </Heading>
              <Box
                borderStyle={"solid"}
                borderWidth={1}
                borderRadius={"md"}
                py={1}
                pl={1}
              >
                <SimpleGrid columns={4} spacing={0}>
                  {gameMembers[courtId].map((memberId, index) => (
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
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </DndContext>
  );
}
