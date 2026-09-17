import React from "react";
import { X } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  title,
  itemName,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[95%] max-w-md shadow-xl relative">

        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          Are you sure you want to permanently delete{" "}
          <span className="font-medium text-slate-900">
            "{itemName}"
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-stone-200 text-slate-700 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;