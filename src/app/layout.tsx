import "./globals.css";

import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import JotaiProvider from "@/components/jotai-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <JotaiProvider>
              <Toaster />
              <Modals />
              <NuqsAdapter>{children}</NuqsAdapter>
            </JotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
