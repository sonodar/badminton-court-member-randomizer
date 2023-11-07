import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import HistoryPane from "./HistoryPane";
import { environments } from "src/api";
import type { Environment } from "src/api";

export default function SharedPane({ sharedId }: { sharedId: string }) {
  const [environment, setEnvironment] = useState<Environment | null>(null);

  useEffect(() => {
    environments.find(sharedId).then(setEnvironment);
  }, [sharedId]);

  const header = environment?.isFinished ? (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>すでに終了しています</AlertTitle>
    </Alert>
  ) : (
    <HStack>
      <Spacer />
      <IconButton
        size={"sm"}
        colorScheme={"brand"}
        icon={<MdRefresh />}
        onClick={() => window.location.reload()}
        aria-label={"reload"}
      />
    </HStack>
  );

  return (
    <Card my={1} py={4}>
      <CardHeader my={0} py={0}>
        {header}
      </CardHeader>
      <CardBody>
        <Center>
          <HistoryPane histories={environment?.histories || []} />
        </Center>
      </CardBody>
    </Card>
  );
}
