import React from 'react';
import type { TinyUrlMapping } from '../types/types';

interface Props {
  items: TinyUrlMapping[];
  onDelete: (code: string) => void;
  onViewStats: (code: string) => void;
}

export const UrlListView: React.FC<Props> = ({ items, onDelete, onViewStats }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-700">Recent Links</h2>
    <div className="grid gap-3">
      {items.map(item => (
        <div key={item.tinyUrlCode} className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all shadow-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <a href={item.tinyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">
                {item.tinyUrlCode}
              </a>
              <div className="relative flex items-center group/tooltip">
                <span className="cursor-help text-gray-400 hover:text-gray-600 text-xs bg-gray-100 px-1.5 rounded">URL</span>
                <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block z-50">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                    {item.tinyUrl}
                    <div className="w-2 h-2 bg-gray-800 rotate-45 absolute -bottom-1 left-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              {new Date(item.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => onViewStats(item.tinyUrlCode)}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              Details
            </button>
            <button 
              onClick={() => onDelete(item.tinyUrlCode)}
              className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);