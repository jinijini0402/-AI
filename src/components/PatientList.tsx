"use client";

import { useState } from "react";
import Image from "next/image";

interface Patient {
  id: string;
  name: string;
  gender: "남" | "여";
  age: string;
  diagnosis: string;
  status: "우선대기" | "대기" | "접수신청" | "진행중";
}

interface ConsultationRoom {
  id: string;
  name: string;
  doctor: string;
  patients: Patient[];
  isExpanded?: boolean;
}

const consultationRooms: ConsultationRoom[] = [
  {
    id: "room1",
    name: "진료실1",
    doctor: "김의사",
    isExpanded: true,
    patients: [
      { id: "367224", name: "권블록", gender: "남", age: "2개월", diagnosis: "영유아검진", status: "우선대기" },
      { id: "377562", name: "박메디", gender: "여", age: "2세 10개월", diagnosis: "아토피", status: "대기" },
      { id: "423764", name: "이블록", gender: "여", age: "25세", diagnosis: "장염", status: "접수신청" },
    ],
  },
  {
    id: "room2",
    name: "진료실2",
    doctor: "이원장",
    isExpanded: true,
    patients: [
      { id: "123456", name: "김에디", gender: "남", age: "22세", diagnosis: "호흡기질환", status: "진행중" },
      { id: "523534", name: "박블록", gender: "여", age: "4세", diagnosis: "일반진료(열감기)", status: "대기" },
    ],
  },
];

const paymentRoom: ConsultationRoom = {
  id: "payment",
  name: "수납실",
  doctor: "",
  isExpanded: false,
  patients: [],
};

const receptionRoom: ConsultationRoom = {
  id: "reception",
  name: "접수실",
  doctor: "",
  isExpanded: false,
  patients: [],
};

const statusColors = {
  우선대기: "bg-green-100 text-green-700",
  대기: "bg-orange-100 text-orange-700",
  접수신청: "bg-red-100 text-red-700",
  진행중: "bg-blue-100 text-blue-700",
};

export default function PatientList() {
  const [activeTab, setActiveTab] = useState("waiting");
  const [rooms, setRooms] = useState<ConsultationRoom[]>([...consultationRooms, paymentRoom, receptionRoom]);
  const [selectedPatient, setSelectedPatient] = useState<string>("123456");

  const toggleRoom = (roomId: string) => {
    setRooms(rooms.map((room) => (room.id === roomId ? { ...room, isExpanded: !room.isExpanded } : room)));
  };

  const totalWaiting = consultationRooms.reduce((sum, room) => sum + room.patients.length, 0);

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* 제목 */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">환자리스트</h2>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("waiting")}
          className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === "waiting"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          대기 {totalWaiting}
        </button>
        <button
          onClick={() => setActiveTab("appointment")}
          className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === "appointment"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          예약
        </button>
        <button
          onClick={() => setActiveTab("visit")}
          className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${
            activeTab === "visit"
              ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          방문
        </button>
      </div>

      {/* 환자 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <div key={room.id} className="border-b border-gray-100">
            {/* 방 제목 */}
            <button
              onClick={() => toggleRoom(room.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {/* 의사 아이콘 */}
                {room.doctor && (
                  <Image
                    src={room.doctor === "김의사" ? "/man.png" : "/woman.png"}
                    alt={room.doctor}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                )}
                <span className="text-sm font-medium text-gray-800">
                  {room.name}
                  {room.doctor && ` (${room.doctor})`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{room.patients.length}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 text-gray-400 transition-transform ${room.isExpanded ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>

            {/* 환자 목록 */}
            {room.isExpanded && (
              <div className="pb-2">
                {room.patients.length > 0 ? (
                  room.patients.map((patient) => {
                    const isSelected = selectedPatient === patient.id;
                    return (
                      <button
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient.id)}
                        className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                          isSelected ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            {/* ID와 이름 */}
                            <div className="flex items-center gap-2 mb-1">
                              {isSelected && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2.5}
                                  stroke="currentColor"
                                  className="w-4 h-4 text-blue-600 shrink-0"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                              <span className="text-xs font-medium text-gray-800">
                                {isSelected ? "외래 " : ""}
                                {patient.id} {patient.name}
                              </span>
                            </div>
                            {/* 성별, 나이, 플러스 아이콘, 진단명 */}
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <span>
                                {patient.gender} {patient.age}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              <span className="text-gray-700">{patient.diagnosis}</span>
                            </div>
                          </div>
                          {/* 상태 배지 */}
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded shrink-0 ${
                              statusColors[patient.status]
                            }`}
                          >
                            {patient.status}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-4 text-xs text-gray-500 text-center">대기 환자가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
