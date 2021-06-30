import { PrismaClient } from "@prisma/client";
import { ActionFunction, redirect, Link } from "remix";
import {
  Input,
  Center,
  Textarea,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import type { ReactElement } from "react";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const category = body.get("category") as string;
  const link = body.get("link") as string;
  const notes = body.get("notes") as string;

  const prisma = new PrismaClient();

  async function main() {
    await prisma.webLinks.create({
      data: {
        name,
        category,
        link,
        notes,
      },
    });
  }

  await main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return redirect("/");
};

export default function WebLinkNew(): ReactElement {
  return (
    <Container maxW={"6xl"} mt={10}>
      <Center>
        <Heading pb={2}>Create a new Link</Heading>
      </Center>
      <form method="post">
        <Center>
          <VStack>
            <Input placeholder="Name" required type="text" name="name" />
            <Input
              placeholder="Category"
              required
              type="text"
              name="category"
            />
            <Input placeholder="Url" required type="text" name="link" />
            <Textarea
              placeholder="Notes about the link"
              required
              rows={10}
              name="notes"
            />
            <HStack>
              <Link to="/">
                <Button variant="ghost" colorScheme="blue">
                  Cancel
                </Button>
              </Link>
              <Button colorScheme="blue" type="submit">
                Create New Link
              </Button>
            </HStack>
          </VStack>
        </Center>
      </form>
    </Container>
  );
}
