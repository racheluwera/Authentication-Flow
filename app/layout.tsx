import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "./components/authProvider";
import DashboardPage from "./components/dashboardPage";


// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App with Firebase Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <DashboardPage />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
