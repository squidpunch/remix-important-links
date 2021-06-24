import type { MetaFunction } from "remix";
import type { ReactElement } from "react";

export const meta: MetaFunction = () => {
  return { title: "Ain't nothing here" };
};

export default function FourOhFour(): ReactElement {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
