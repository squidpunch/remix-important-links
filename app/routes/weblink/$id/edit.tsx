import { PrismaClient, WebLinks } from "@prisma/client";
import { Center, Container, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouteData, LoaderFunction, ActionFunction, redirect } from "remix";
import WebLinkForm from "../../../components/WebLinkForm";

export const loader: LoaderFunction = async ({ params }) => {
  const prisma = new PrismaClient();

  async function main() {
    const link = await prisma.webLinks.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    return link;
  }

  return main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const action: ActionFunction = async ({ request, params }) => {
  const body = new URLSearchParams(await request.text());
  const name = body.get("name") as string;
  const category = body.get("category") as string;
  const link = body.get("link") as string;
  const notes = body.get("notes") as string;
  const prisma = new PrismaClient();
  async function main() {
    await prisma.webLinks.update({
      where: {
        id: parseInt(params.id),
      },
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

export default function WebLinkEdit(): ReactElement {
  const webLink = useRouteData() as WebLinks;

  return (
    <Container maxW={"6xl"} mt={10}>
      <Center>
        <Heading pb={2}>Update Link</Heading>
      </Center>
      <WebLinkForm webLink={webLink} />
    </Container>
  );
}
