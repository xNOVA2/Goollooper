function Tooltip({ message }: { message: string }) {
    return (
      <div className="relative inline-block">
        <p className="absolute  flex items-center justify-center w-48 p-3 text-gray-600 bg-white rounded-lg shadow-lg -left-[13.2rem]  dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
          <span className="text-red-600 text-xs">{message}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-6 h-6 text-white transform rotate-45 -translate-y-1/2 fill-current -right-3 top-1/2 dark:text-gray-800"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
          </svg>
        </p>
      </div>
    );
  }


  export default Tooltip