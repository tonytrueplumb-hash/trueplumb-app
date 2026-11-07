import "./globals.css";

export const metadata = {
  title: "True Plumb Execution Sprint",
  description: "Three days of real decisions for team leaders and operational managers."
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#16191B" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body><div className="wrap">{children}</div></body>
    </html>
  );
}
