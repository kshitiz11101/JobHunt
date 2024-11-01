import React from 'react'

const ConfirmBox = ({isOpen,onClose,onConfirm,message,confirmText="Confirm",cancelText="Cancel"}) => {
  if(!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-mine-shaft-900 p-6 rounded-lg shadow-lg w-96 text-white">
          <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              className="bg-mine-shaft-600 px-4 py-2 rounded hover:bg-mine-shaft-400"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className="bg-cyan-/-aqua-500 text-white px-4 py-2 rounded hover:bg-cyan-/-aqua-600"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
  )
}

export default ConfirmBox
