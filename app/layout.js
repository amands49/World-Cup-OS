import "./globals.css";

export const metadata = {
  title: "WorldCupOS",
  description: "Autonomous AI Operations Platform for 2026 FIFA World Cup",
};

export default function RootLayout({ children }) {
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
