import { PrismaClient, WebLinks } from "@prisma/client";
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
import { ReactElement } from "react";
import {
  useRouteData,
  LoaderFunction,
  ActionFunction,
  redirect,
  Link,
} from "remix";

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
  const data = useRouteData() as WebLinks;

  return (
    <Container maxW={"6xl"} mt={10}>
      <Center>
        <Heading pb={2}>Update Link</Heading>
      </Center>
      <form method="post">
        <Center>
          <VStack>
            <Input
              placeholder="Name"
              required
              type="text"
              name="name"
              value={data.name}
            />
            <Input
              placeholder="Category"
              required
              type="text"
              name="category"
              value={data.category}
            />
            <Input
              placeholder="Url"
              required
              type="text"
              name="link"
              value={data.link}
            />
            <Textarea
              placeholder="Notes about the link"
              required
              rows={10}
              name="notes"
              value={data.notes}
            />
            <HStack>
              <Link to="/">
                <Button variant="ghost" colorScheme="blue">
                  Cancel
                </Button>
              </Link>
              <Button colorScheme="blue" type="submit">
                Update
              </Button>
            </HStack>
          </VStack>
        </Center>
      </form>
    </Container>
  );
}
