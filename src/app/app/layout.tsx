export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* App has its own complete layout - no main navigation needed */}
      {children}
    </div>
  );
}