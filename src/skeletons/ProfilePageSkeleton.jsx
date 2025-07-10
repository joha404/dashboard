function ProfilePageSkeleton() {
  return (
    <div>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-6 p-6 rounded-lg border border-gray-300 bg-gray-200">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>

        <div className="rounded-lg p-6 border border-gray-300 bg-gray-200 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="flex gap-3">
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-300 rounded w-2/4"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
