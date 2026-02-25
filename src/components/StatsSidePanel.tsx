import { useState, useEffect } from "react";
import { getUrlDetails } from "../services/urlService";
import type { UrlDetails } from "../types/types";

export const StatsSidePanel: React.FC<{ code: string; onClose: () => void }> = ({ code, onClose }) => {
  const [details, setDetails] = useState<UrlDetails | null>(null);

  useEffect(() => {
    getUrlDetails(code).then(setDetails).catch(console.error);
  }, [code]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Link Insights</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">✕</button>
        </div>

        {details ? (
          <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            <section>
              <label className="text-xs font-bold text-gray-400 uppercase">Short Code</label>
              <p className="text-lg font-mono text-blue-600 mt-1">{code}</p>
            </section>

            <section>
              <label className="text-xs font-bold text-gray-400 uppercase">Target Destination</label>
              <p className="text-sm text-gray-700 break-all mt-1 bg-gray-50 p-3 rounded-lg border">
                {details.longUrl}
              </p>
            </section>

            <section className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
              <label className="text-xs font-medium opacity-80 uppercase">Views</label>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-black">{details.clicks}</span>
                <span className="text-lg opacity-90 font-medium">total clicks</span>
              </div>
            </section>

            <section>
              <label className="text-xs font-bold text-gray-400 uppercase">Created</label>
              <p className="text-gray-600 mt-1">{new Date(details.createdAt).toLocaleString()}</p>
            </section>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center italic text-gray-400">Loading metrics...</div>
        )}
      </div>
    </div>
  );
};