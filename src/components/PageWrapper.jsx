import Navbar from "./Navbar";

export default function PageWrapper({ title, children }) {
  return (
    <div className="flex flex-col w-full min-h-screen">

      <Navbar />

      <main
        className="
          px-8 py-6 min-h-screen 
          bg-gradient-to-br from-[#ffffff] to-[#ffffff] 
          dark:from-[#000000] dark:to-[#000000]
          transition-all duration-500
        "
      >
        {title && (
          <h2 className="text-2xl font-semibold mb-6 text-[#333] dark:text-white">
            {title}
          </h2>
        )}

        {children}
      </main>
    </div>
  );
}


















{/*import Navbar from "./Navbar";

export default function PageWrapper({ title, children }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar /> 



     <main className="px-8 py-6 bg-[#ffe9d6] min-h-screen">  
       {title && (
          <h2 className="text-2xl font-semibold mb-6 text-[#333]">{title}</h2>
        )} 
        {children}
      </main>
    </div>
  );
}
*/}