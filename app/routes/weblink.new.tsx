import { PrismaClient } from "@prisma/client";
import type { ReactElement } from "react";
import { ActionFunction, redirect } from "remix";
import type { LinksFunction } from "remix";

import stylesUrl from "../styles/weblink.new.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

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
    <div className="page">
      <h2>Create a new Link</h2>
      <form method="post">
        <div className="container-input">
          <div className="label-wrapper">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="input-wrapper">
            <input required type="text" name="name" />
          </div>
        </div>
        <div className="container-input">
          <div className="label-wrapper">
            <label htmlFor="category">Category:</label>
          </div>
          <div className="input-wrapper">
            <input required type="text" name="category" />
          </div>
        </div>
        <div className="container-input">
          <div className="label-wrapper">
            <label htmlFor="link">Link:</label>
          </div>
          <div className="input-wrapper">
            <input required type="text" name="link" />
          </div>
        </div>
        <div className="container-input">
          <div className="label-wrapper">
            <label htmlFor="notes">Notes:</label>
          </div>
          <div className="input-wrapper">
            <textarea required rows={10} name="notes" />
          </div>
        </div>
        <div className="container-input">
          <div style={{ width: "25%" }}></div>
          <div className="input-wrapper">
            <button type="submit">Create New Link</button>
          </div>
        </div>
      </form>
    </div>
  );
}
