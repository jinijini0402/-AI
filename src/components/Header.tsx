"use client";

import Image from "next/image";

interface HeaderProps {
  pageTitle?: string;
}

export default function Header({ pageTitle = "차트" }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* 왼쪽: 페이지 제목 */}
        <h1 className="text-base font-bold text-gray-800">{pageTitle}</h1>

        {/* 중앙: 검색 입력 필드 */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="환자 검색"
              className="text-sm w-full pl-8 pr-4 py-1 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* 신규환자 버튼 */}
        <button className="flex text-sm items-center gap-0.5 pl-3 pr-4 py-1 border border-blue-500 text-blue-500 rounded-md  transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>신규환자</span>
        </button>
      </div>
      {/* 오른쪽: 버튼 및 아이콘들 */}
      <div className="flex items-center gap-3">
        {/* 아이콘들 */}
        <div className="flex items-center gap-3">
          {/* 말풍선 아이콘 */}
          <button className="p-2 pr-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </button>

          {/* 종 모양 아이콘 */}
          <button className="p-2 pr-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {/* 알림 배지 (선택사항) */}
            <span className="absolute top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 사용자 프로필 아이콘 */}
          <button className="p-2 pr-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Image src="/man.png" alt="profile" width={32} height={32} className="object-contain" />
          </button>
        </div>
      </div>
    </header>
  );
}
