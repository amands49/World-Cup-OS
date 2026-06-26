// Root HTML layout shell for the WorldCupOS Next.js application.
// Sets global metadata, dark theme defaults, and renders page children.
import "./globals.css";

export const metadata = {
  title: "WorldCupOS",
  description: "Autonomous AI Operations Platform for 2026 FIFA World Cup",
};

export default function RootLayout({ children }) {
  // Wraps all pages in a full-viewport dark body with zero default margin.
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
