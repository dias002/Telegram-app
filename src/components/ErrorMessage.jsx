import React from 'react';

function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 text-sm max-w-xs text-center">
      {typeof error === 'string' ? error : 'Произошла ошибка, попробуйте позже.'}
    </div>
  );
}

export default ErrorMessage;
