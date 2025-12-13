import Navbar from "./Navbar";
import { useSidebar } from "../context/SidebarContext";

export default function PageWrapper({ title, children }) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex">
      {/* MAIN CONTENT AREA */}
      <div
        className={`
          transition-all duration-500 
          w-full min-h-screen
          ${isOpen ? "ml-64" : "ml-20"}
        `}
      >
        <Navbar />

        <main className="px-8 py-6 min-h-screen bg-white dark:bg-black overflow-x-hidden">
          {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
          {children}
        </main>
      </div>
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