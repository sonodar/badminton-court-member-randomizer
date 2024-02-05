import React from "react";
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
import {
  array,
  type CurrentSettings,
  type GameMembers,
  getLatestMembers,
  getRestMembers,
  isMemberType,
  type RestOrCourtMember,
  swapGameMember,
} from "@logic";

function MemberBox({
  color,
  ...member
}: RestOrCourtMember & { color: string }) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: `${member.type}-${member.memberId}`, data: member });
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
      bg={color}
      borderRadius="full"
      boxShadow={isDragging ? undefined : "sm"}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Center>{member.memberId}</Center>
    </Box>
  );
}

function MemberDroppable({
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

    if (!isMemberType(sourceType) || !isMemberType(destType)) {
      throw new Error("Invalid member type");
    }

    const source = e.active.data.current as RestOrCourtMember;
    const dest = e.over.data.current as RestOrCourtMember;

    const newGameMembers = swapGameMember(gameMembers, source, dest);
    if (!newGameMembers) return;

    onChange(newGameMembers);
    showToast(source.memberId, dest.memberId);
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
                  {restMembers.map((memberId) => (
                    <MemberDroppable
                      key={memberId}
                      type={"restMember"}
                      memberId={memberId}
                    >
                      <MemberBox
                        type={"restMember"}
                        color={"danger.100"}
                        memberId={memberId}
                      />
                    </MemberDroppable>
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
                  {gameMembers[courtId].map((memberId) => (
                    <MemberDroppable
                      key={memberId}
                      type={"courtMember"}
                      courtId={courtId}
                      memberId={memberId}
                    >
                      <MemberBox
                        type={"courtMember"}
                        color={"brand.300"}
                        courtId={courtId}
                        memberId={memberId}
                      />
                    </MemberDroppable>
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
