// components/skeletons/MovieGridSkeleton.tsx
export default function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg overflow-hidden animate-pulse">
          <div className="h-64 w-full bg-gray-300"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}