export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is only for the root redirect page
  // The actual app layout is in [lang]/layout.tsx
  // We don't render html/body here to avoid nesting
  return children;
}