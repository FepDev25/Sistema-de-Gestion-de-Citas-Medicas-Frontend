interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
}

export const SuccessAlert = ({ message, onClose }: SuccessAlertProps) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <span className="text-green-700 text-xl">&times;</span>
        </button>
      )}
    </div>
  );
};
