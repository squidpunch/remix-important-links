import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import type { ReactElement } from "react";
import { PrismaClient, WebLinks } from "@prisma/client";
import { useRouteData } from "remix";
import stylesUrl from "../styles/index.css";

export const meta: MetaFunction = () => {
  return {
    title: "Our Super Special Link App",
    description:
      "A collection of important links with notes on why they are important",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
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
    <div className="page">
      <h2>Important Links</h2>
      <div className="container">
        <div className="header">Category</div>
        <div className="header">Name</div>
        <div className="header" style={{ textAlign: "left" }}>
          Notes
        </div>
        <div className="header">Actions</div>
      </div>

      {data?.map(({ id, category, name, link, notes }: WebLinks) => (
        <div key={id} className="container">
          <div>{category}</div>
          <div>{name}</div>
          <div style={{ textAlign: "left" }}>{notes}</div>
          <div>
            <a href={link} target="_blank" rel="noreferrer">
              Visit
            </a>{" "}
            | Edit | Delete
          </div>
        </div>
      ))}
    </div>
  );
}
