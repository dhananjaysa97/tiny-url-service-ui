import { useState } from "react";
import { useUrlServiceManager } from "../hooks/useUrlServiceManager";
import { ShortenUrlView } from "./ShortenUrlView";
import { UrlListView } from "./UrlListView";
import { StatsSidePanel } from "./StatsSidePanel";


export default function UrlServiceView() {
  const { tinyUrls, handleCreate, handleDelete } = useUrlServiceManager();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; isError: boolean } | null>(null);

  const showMessage = (text: string, isError = false) => {
    setNotification({ text, isError });
    setTimeout(() => setNotification(null), 3000); 
  };

  const onDeleteUrl = async (code: string) => {
    try {
      await handleDelete(code);
      showMessage("Link deleted successfully.");
    } catch (err) {
      showMessage("Failed to delete link. Please try again.", true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Tiny URL Service</h1>
        
        <ShortenUrlView onCreate={handleCreate} />
        
        <div className="my-8 border-t border-gray-100"></div>
        
        {notification && (
          <div className={`mb-4 p-4 rounded-lg border animate-pulse-subtle ${
            notification.isError 
              ? "bg-red-50 border-red-200 text-red-700" 
              : "bg-green-50 border-green-200 text-green-700"
          }`}>
            <div className="flex justify-between items-center">
              <span>{notification.text}</span>
              <button onClick={() => setNotification(null)} className="text-sm font-bold">✕</button>
            </div>
          </div>
        )}

        <UrlListView
          items={tinyUrls}
          onDelete={onDeleteUrl}
          onViewStats={setSelectedCode}
        />

        {selectedCode && (
          <StatsSidePanel 
            code={selectedCode} 
            onClose={() => setSelectedCode(null)} 
          />
        )}
      </div>
    </div>
  );
}