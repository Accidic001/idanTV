import Link from 'next/link';

export default function Section({
  title,
  link,
  children
}: {
  title: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link 
          href={link} 
          className="text-sm hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      {children}
    </section>
  );
}