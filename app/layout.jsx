import "./globals.css";

export const metadata = {
  title: "Экспедиция — интерактивное путешествие",
  description: "Интерактивная история о внимании, открытиях и сайтах, которые хочется исследовать.",
};

export const viewport = {
  themeColor: "#050307",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
