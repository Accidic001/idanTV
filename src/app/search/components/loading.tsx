// src/app/search/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
      ))}
    </div>
  );
}