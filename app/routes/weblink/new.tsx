import { PrismaClient } from "@prisma/client";
import { ActionFunction, redirect } from "remix";
import { Center, Container, Heading } from "@chakra-ui/react";
import type { ReactElement } from "react";
import WebLinkForm from "../../components/WebLinkForm";

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
      <WebLinkForm />
    </Container>
  );
}
