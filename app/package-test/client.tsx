"use client";

import { Modal } from "package1";
import {
  AccordionSection,
  AccordionContainer,
  TabContainer,
  Tab,
} from "package1";

export function ClientComponent() {
  return (
    <>
      <h1>Client</h1>
      <Modal>
        <h1>Modal content works</h1>
      </Modal>
      <AccordionContainer>
        <AccordionSection title="one">
          <h1>one</h1>
        </AccordionSection>
        <AccordionSection title="two">
          <h1>two</h1>
        </AccordionSection>
        <AccordionSection title="three">
          <h1>three</h1>
        </AccordionSection>
      </AccordionContainer>
      <TabContainer>
        <Tab title="one">
          <h1>one</h1>
        </Tab>
        <Tab title="two">
          <h1>two</h1>
        </Tab>
      </TabContainer>
    </>
  );
}
