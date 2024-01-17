import {
  Box,
  Button,
  HStack,
  type PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React, { type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  description: string | ReactNode;
  placement?: PlacementWithLogical;
  onNext?: () => void;
  onBack?: () => void;
  onDone?: () => void;
  children: ReactNode;
};

const buttonStyles = {
  variant: "outline",
  size: "xs",
  borderRadius: "sm",
  minWidth: "3.5rem",
};

export function Tutor({
  isOpen,
  title,
  description,
  placement,
  onNext,
  onBack,
  onDone,
  children,
}: Props) {
  return (
    <Popover
      isOpen={isOpen}
      placement={placement || "auto"}
      closeOnBlur={false}
      returnFocusOnClose={false}
      isLazy={true}
    >
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          borderRadius={"xl"}
          borderColor={"lightgray"}
          sx={{ "--popper-arrow-size": "14px" }}
          bgColor={"ghostwhite"}
        >
          {title && (
            <PopoverHeader fontSize={"small"} fontWeight="semibold">
              {title}
            </PopoverHeader>
          )}
          <PopoverArrow shadowColor={"lightgray"} bgColor={"ghostwhite"} />
          <PopoverBody fontSize={"small"}>{description}</PopoverBody>
          <PopoverFooter>
            <HStack justifyContent={"flex-end"}>
              {onBack && (
                <Button {...buttonStyles} onClick={onBack}>
                  戻る
                </Button>
              )}
              {onNext && (
                <Button
                  {...buttonStyles}
                  colorScheme={"primary"}
                  onClick={onNext}
                >
                  次へ
                </Button>
              )}
              {onDone && (
                <Button
                  {...buttonStyles}
                  variant={"solid"}
                  colorScheme={"primary"}
                  onClick={onDone}
                >
                  OK
                </Button>
              )}
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
