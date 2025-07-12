'use client';

export default function TodoSkeleton() {
  return (
    <li className="bg-white p-3 rounded shadow flex justify-between animate-pulse">
      <span className="h-4 w-4/5 bg-gray-200 rounded" />
      <span className="h-4 w-4 bg-gray-200 rounded" />
    </li>
  );
}

