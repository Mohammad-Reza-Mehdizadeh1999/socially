const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center gap-3 h-screen bg-white text-black dark:bg-black dark:text-white">
      <span className="font-semibold text-2xl">404</span>
      <div className="h-8 w-px bg-gray-400 dark:bg-gray-800" />
      <p>This page could not be found.</p>
    </div>
  );
};

export default NotFoundPage;