"use client";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import ClassCard from './_components/ClassCard';
import ClassCard_Other from './_components/ClassCard_Other';

function Class() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State สำหรับควบคุม modal

  const classes = [
    { code: 'OOP-53', teacher: 'Chanapon Nitiwirot', due: 'Due Today', problem: 'ปัญหา: การออกแบบซอฟต์แวร์' },
    { code: 'OOD-53', teacher: 'Chanapon Nitiwirot', due: 'Due May 7, 11:59 PM', problem: 'ปัญหา: การออกแบบซอฟต์แวร์ขั้นสูง' },
    { code: 'OOD-53', teacher: 'Chanapon Nitiwirot', due: 'Due May 7, 11:59 PM', problem: 'ปัญหา: การออกแบบซอฟต์แวร์ขั้นสูง' },
    { code: 'OOD-53', teacher: 'Chanapon Nitiwirot', due: 'Due May 7, 11:59 PM', problem: 'ปัญหา: การออกแบบซอฟต์แวร์ขั้นสูง' },
  ];

  const classes1 = [
    { code: 'MAD-53', teacher: 'Warangkana Seep', due: 'Due Today', problem: 'ปัญหา: การพัฒนาแอปพลิเคชันมือถือ' },
  ];

  // ฟังก์ชันเปิด modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // ฟังก์ชันปิด modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-20">
          <div className="flex justify-end">
            <button
              onClick={openModal} // เพิ่ม event เพื่อเปิด modal
              className="bg-[#0D3ACE] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#0B2EA6] hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create Class
            </button>
          </div>
          <h2 className="text-4xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">My Class</h2>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem, index) => (
              <ClassCard key={index} {...classItem} />
            ))}
          </div>
          <h2 className="text-4xl font-semibold border-b-2 border-gray-300 pb-1 mt-8 mb-4">Class</h2>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes1.map((classItem, index) => (
              <ClassCard_Other key={index} {...classItem} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border-2 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create Class</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Class Name</label>
                <input
                  type="text"
                  placeholder="Class name..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  placeholder="Section..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Room</label>
                <input
                  type="text"
                  placeholder="Room..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Create Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Class;