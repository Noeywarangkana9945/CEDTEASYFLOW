"use client"; // ระบุว่าเป็น client component สำหรับ Next.js App Router

import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

// กำหนดประเภทสำหรับ submission
interface Submission {
  studentID: string;
  name: string;
  score: string;
}

function Lab() {
  // State สำหรับ submissions (สามารถเปลี่ยนเป็น API data ได้ในอนาคต)
  const [submissions] = useState<Submission[]>([
    { studentID: "66015445", name: "Zaire Geidt", score: "8/11" },
    { studentID: "66015555", name: "Gretchen Madsen", score: "8/11" },
    { studentID: "66015244", name: "Zain Botosh", score: "8/11" },
    { studentID: "66015355", name: "Ahmad Schiefer", score: "8/11" },
  ]);

  // Handler สำหรับปุ่ม Edit และไอคอน ✏️
  const handleEditClick = (studentID: string) => {
    console.log(`Edit score for student: ${studentID}`);
    // เพิ่ม logic สำหรับแก้ไขคะแนน
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-6 md:p-20"> {/* ปรับ padding สำหรับ responsive */}
          {/* Buttons (Edit) */}
          <div className="flex justify-end space-x-4 mb-6">
            <button
              onClick={() => handleEditClick("all")} // สามารถปรับให้แก้ไขทั้งหมด
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700"
              aria-label="Edit all submissions"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          </div>

          {/* Title and Points with Icon */}
          <div className="flex justify-between items-center border-b-2 border-gray-300 pb-1 mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4">
                <FaFileAlt className="w-14 h-14 text-gray-500" />
              </div>
              <h2 className="text-4xl font-semibold">
                Lab 3 <span className="text-xs align-top">(11 points)</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm">Due Mar 4, 2024, 11:59 PM</p>
          </div>

          {/* Wrapper to shift Description and Table */}
          <div className="ml-0 md:ml-10"> {/* ปรับ margin สำหรับ responsive */}
            {/* Description */}
            <p className="mb-6 text-gray-700">
              รายวิชาการเขียนโปรแกรมคอมพิวเตอร์ 1 คะแนนเก็บ ครั้งที่ 1 ทำ N ครั้งตามที่กำหนด
              <br />
              คำสั่ง: ทำตามขั้นตอนใน N ครั้งตามที่กำหนดให้ครบถ้วน
            </p>
            <div className="border-b-2 border-gray-300 pb-1 mb-6"></div>

            {/* Table of Submissions */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left text-gray-700">No</th>
                  <th className="border p-2 text-left text-gray-700">StudentID</th>
                  <th className="border p-2 text-left text-gray-700">Name</th>
                  <th className="border p-2 text-left text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission.studentID} className="border hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{submission.studentID}</td>
                    <td className="border p-2">{submission.name}</td>
                    <td className="border p-2 flex items-center">
                      {submission.score}
                      <button
                        onClick={() => handleEditClick(submission.studentID)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        aria-label={`Edit score for ${submission.name}`}
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lab;
