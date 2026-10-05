import type { Metadata } from "next";
import "./globals.css";
import "../public/katex/katex.min.css";

export const metadata: Metadata = {
  title: "Organized Hub",
  description: "Seu espaço pessoal para faculdade, concursos, IPE Trading e carreira.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
