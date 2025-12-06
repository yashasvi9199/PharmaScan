import React from "react";

export default function App() : React.ReactNode {
  return(
    <div className="min-h-screen flex item-center justify-center bg-gray-50">
      <main className="max-w-2xl w-full p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-2">
          App running
        </h1>
        <p className="text-sm text-gray-600">
          Tailwind is wired. If you see spacing, rounded corners and shadows, the css pipeline is working
        </p>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700">
            Primary
          </button>
          <button className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-100">
            Secondary
          </button>
        </div>
      </main>
    </div>
  )
}