import "../../styles/app-core.css";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-dark">
      {children}
    </div>
  );
}
