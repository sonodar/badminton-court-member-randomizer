import React, { useEffect, useState } from "react";
import type { History } from "@doubles-member-generator/lib";
import {
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

export default function SharedPane({ sharedId }: { sharedId: string }) {
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    environments
      .find(sharedId)
      .then((env) => setHistories(env?.histories || []));
  }, [sharedId]);

  return (
    <Card my={1} py={4} height={"100dvh"}>
      <CardHeader my={0} py={0}>
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
      </CardHeader>
      <CardBody>
        <Center>
          <HistoryPane histories={histories} />
        </Center>
      </CardBody>
    </Card>
  );
}
