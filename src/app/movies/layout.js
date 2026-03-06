export default function MovieTypeLayout({ children }) {
  return (
    <section className="min-h-screen">
      <div className="max-w-[1440px] mx-auto p-10">{children}</div>
    </section>
  );
}