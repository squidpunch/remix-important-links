import type { MetaFunction, LoaderFunction, HeadersFunction } from "remix";
import type { ReactElement } from "react";
import { PrismaClient, WebLinks } from "@prisma/client";
import { useRouteData, Link } from "remix";
import {
  Table,
  Container,
  Heading,
  Button,
  ButtonGroup,
  Th,
  Tr,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "max-age=60, public",
  };
};

export const meta: MetaFunction = () => {
  return {
    title: "Our Super Special Link Listing App",
    description:
      "A collection of important links with notes on why they are important",
  };
};

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient();

  async function main() {
    const allLinks = await prisma.webLinks.findMany();
    return allLinks;
  }

  return main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export default function Index(): ReactElement {
  const data = useRouteData();

  return (
    <Container maxW={"6xl"} mt={10}>
      <Heading pb={2}>Remix Resources</Heading>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Name</Th>
            <Th>Notes</Th>
            <Th>
              <Link to="/webLink/new">
                <Button colorScheme="blue">+ Add New</Button>
              </Link>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(({ id, category, name, link, notes }: WebLinks) => (
            <Tr key={id}>
              <Td>{category}</Td>
              <Td>{name}</Td>
              <Td style={{ textAlign: "left" }}>{notes}</Td>
              <Td>
                <ButtonGroup variant="outline" spacing="6" pb="2">
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="blue"
                    as="a"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="blue"
                    as="a"
                    href={`/webLink/${id}/edit`}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
