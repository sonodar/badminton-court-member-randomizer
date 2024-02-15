import { ChakraProvider, Container } from "@chakra-ui/react";
import React from "react";
import { Provider, createStore } from "jotai";
import SharedPane from "./shared/SharedPane.tsx";
import customTheme from "@components/theme";

export default function Share({ sharedId }: { sharedId: string }) {
  const store = createStore();
  return (
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <Container maxW={"sm"} minW={"sm"}>
          <SharedPane sharedId={sharedId} />
        </Container>
      </Provider>
    </ChakraProvider>
  );
}
