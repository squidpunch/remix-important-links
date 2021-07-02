import {
  Input,
  Center,
  Textarea,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { WebLinks } from "@prisma/client";
import { Link, Form, usePendingFormSubmit } from "remix";

import type { ReactElement } from "react";

type WebLinkFormProps = {
  webLink?: WebLinks;
};

export default function WebLinkForm({
  webLink,
}: WebLinkFormProps): ReactElement {
  const pendingForm = usePendingFormSubmit();
  return (
    <Form method="post">
      <Center>
        <VStack>
          <Input
            placeholder="Name"
            required
            type="text"
            name="name"
            defaultValue={webLink?.name}
          />
          <Input
            placeholder="Category"
            required
            type="text"
            name="category"
            defaultValue={webLink?.category}
          />
          <Input
            placeholder="Url"
            required
            type="text"
            name="link"
            defaultValue={webLink?.link}
          />
          <Textarea
            placeholder="Notes about the link"
            required
            rows={10}
            name="notes"
            defaultValue={webLink?.notes}
          />
          <HStack>
            <Link to="/">
              <Button variant="ghost" colorScheme="blue">
                Cancel
              </Button>
            </Link>
            <Button colorScheme="blue" type="submit" disabled={!!pendingForm}>
              {pendingForm ? "Saving" : "Save"}
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Form>
  );
}
