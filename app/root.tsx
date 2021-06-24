import type { LinksFunction, LoaderFunction } from "remix";
import {
  Meta,
  Links,
  Scripts,
  useRouteData,
  LiveReload,
  useMatches,
} from "remix";
import { Outlet } from "react-router-dom";
import stylesUrl from "./styles/global.css";
import type { ReactElement } from "react";
import { ChakraProvider } from "@chakra-ui/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async () => {
  return { date: new Date() };
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App(): ReactElement {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  const data = useRouteData();
  return (
    <ChakraProvider>
      <Document>
        <Outlet />
        {/* include the scripts, or not! */}
        {includeScripts && <Scripts />}
        <footer>
          <p>This page was rendered at {data.date.toLocaleString()}</p>
        </footer>
      </Document>
    </ChakraProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }): ReactElement {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
