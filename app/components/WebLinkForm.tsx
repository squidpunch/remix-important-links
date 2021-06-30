import {
  Input,
  Center,
  Textarea,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { WebLinks } from "@prisma/client";
import { Link } from "remix";

import type { ReactElement } from "react";

type WebLinkFormProps = {
  webLink?: WebLinks;
};

export default function WebLinkForm({
  webLink,
}: WebLinkFormProps): ReactElement {
  return (
    <form method="post">
      <Center>
        <VStack>
          <Input
            placeholder="Name"
            required
            type="text"
            name="name"
            value={webLink?.name}
          />
          <Input
            placeholder="Category"
            required
            type="text"
            name="category"
            value={webLink?.category}
          />
          <Input
            placeholder="Url"
            required
            type="text"
            name="link"
            value={webLink?.link}
          />
          <Textarea
            placeholder="Notes about the link"
            required
            rows={10}
            name="notes"
            value={webLink?.notes}
          />
          <HStack>
            <Link to="/">
              <Button variant="ghost" colorScheme="blue">
                Cancel
              </Button>
            </Link>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </HStack>
        </VStack>
      </Center>
    </form>
  );
}
