import { GeistSans } from "geist/font/sans"
import "./globals.css";
import QueryProviderWrapper from "./QueryProviderWrapper";
import { getThemePreference } from "@/shared/lib/preferences.lib";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemePreference()

  return (
    <html lang="es" data-theme={theme}>
      <body
        className={`${GeistSans.className} antialiased bg-gray-100 text-gray-950 dark:text-gray-100 dark:bg-gray-950 transition-colors`}
      >
        <QueryProviderWrapper>
          {children}
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
