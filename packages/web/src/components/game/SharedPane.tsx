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
  Heading,
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
    environments.find(sharedId).then((env) => {
      setEnvironment(env);
      if (!env || env.isFinished) return;

      const { unsubscribe } = environments.subscribe(env.id, (env) => {
        setEnvironment(env);
        if (env.isFinished) unsubscribe();
      });

      return () => unsubscribe();
    });
  }, [sharedId]);

  return (
    <Card my={1} py={4}>
      <CardHeader my={0} py={0}>
        {environment?.isFinished ? (
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>終了しました</AlertTitle>
          </Alert>
        ) : (
          <HStack>
            <Heading size={"md"}>
              {environment?.members.length} 人が参加中
            </Heading>
            <Spacer />
            <IconButton
              size={"sm"}
              colorScheme={"brand"}
              icon={<MdRefresh />}
              onClick={() => window.location.reload()}
              aria-label={"reload"}
            />
          </HStack>
        )}
      </CardHeader>
      <CardBody>
        <Center>
          <HistoryPane histories={environment?.histories || []} />
        </Center>
      </CardBody>
    </Card>
  );
}