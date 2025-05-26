"use client"
function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <img src="https://img5.pic.in.th/file/secure-sv1/Esay-Flow.png" alt="EasyFlow Logo" className="h-14 mr-6" />
        
      </div>
      <div className="flex items-center space-x-14">
        <a href="#" className="hover:underline hover:scale-105 transition-all cursor-pointer">Home</a>
        <a href="#" className="hover:underline hover:scale-105 transition-all cursor-pointer">My Labs</a>
        <a href="#" className="hover:underline hover:scale-105 transition-all cursor-pointer">Study</a>
        <div className="flex items-center space-x-3">
          <img src="https://img2.pic.in.th/pic/9440461.jpg" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
          <span>Chanapon</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://img2.pic.in.th/pic/9440461.jpg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Navbar;