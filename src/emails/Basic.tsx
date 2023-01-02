import React from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import { spacing } from "./theme";

import type { Template } from "mailing-core";

export interface BasicProps {
  person_1: string;
  person_2: string;
  person_1_email: string;
  person_2_email: string;
  product_1_name: string;
  product_2_name: string;
}

const Basic: Template<BasicProps> = (props) => {
  const {
    person_1,
    person_2,
    person_1_email,
    person_2_email,
    product_1_name,
    product_2_name,
  } = props;

  return (
    <BaseLayout width={600}>
      <MjmlSection>
        <MjmlColumn>
          <Text paddingTop={spacing.s1} paddingBottom={spacing.s1}>
            Match between {person_1} and {person_2}
          </Text>
          <Text paddingTop={spacing.s1} paddingBottom={spacing.s1}>
            {person_1} is interested in {product_1_name}
          </Text>
          <Text paddingTop={spacing.s1} paddingBottom={spacing.s1}>
            {person_2} is interested in {product_2_name}
          </Text>
          <Text paddingTop={spacing.s1} paddingBottom={spacing.s1}>
            Contact {person_1} at {person_1_email}
          </Text>
          <Text paddingTop={spacing.s1} paddingBottom={spacing.s1}>
            Contact {person_2} at {person_2_email}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </BaseLayout>
  );
};

export default Basic;
