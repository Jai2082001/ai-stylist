
import Header from "../components/Header";
import { Providers } from "./provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <div>
          <Providers>
          <Header></Header>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
