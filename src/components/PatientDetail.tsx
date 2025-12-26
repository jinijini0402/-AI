"use client";

import { useState } from "react";

export default function PatientDetail() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: string; name: string; size: string; url: string; type: "image" | "video" }>
  >([]);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        return {
          id: Date.now().toString() + Math.random().toString(),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
          url: URL.createObjectURL(file),
          type: isImage ? ("image" as const) : isVideo ? ("video" as const) : ("image" as const),
        };
      });
      setUploadedFiles([...uploadedFiles, ...newFiles]);

      // 이미지/동영상 업로드 시 AI 분석 시작
      setAiAnalysisLoading(true);
      setAiAnalysisComplete(false);

      // 3초 후 분석 완료 시뮬레이션
      setTimeout(() => {
        setAiAnalysisLoading(false);
        setAiAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="flex-1 flex overflow-hidden p-4 bg-gray-50">
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* 환자 정보 헤더 */}
        <div className="px-6 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            {/* 왼쪽: 환자 기본 정보 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* 모니터 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                />
              </svg>

              {/* 환자 ID */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">8123456</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>

              {/* 환자 이름 및 정보 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800">김에디</span>
                <span className="text-sm text-gray-600">남, 22세 (2021-03-22)</span>
              </div>

              {/* 태그들 */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">#검색방문</span>
                <span className="px-2 py-0.5 text-xs border border-blue-100 bg-blue-100 text-blue-600 rounded">
                  건강보험
                </span>
                <span className="px-2 py-0.5 text-xs border border-blue-500 text-blue-600 rounded">호흡기질환</span>
              </div>
            </div>

            {/* 중앙: 체온, 체중, 신장 정보 */}
            <div className="flex items-center gap-4">
              {/* 체온 */}
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
                <span className="text-sm text-gray-700">체온 37.5</span>
              </div>

              {/* 체중 */}
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.224 48.224 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.971Z"
                  />
                </svg>
                <span className="text-sm text-gray-700">체중 73</span>
              </div>

              {/* 신장 */}
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 7h10M7 12h10M7 17h10" />
                </svg>
                <span className="text-sm text-gray-700">신장 172 (2023-03-01)</span>
              </div>
            </div>

            {/* 오른쪽: 가족 정보 및 닫기 버튼 */}
            <div className="flex items-center gap-4">
              {/* 가족 정보 */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">김아빠, 남 50세</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">민할머니, 여 75세 +2</span>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                X 닫기
              </button>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 왼쪽 및 중앙 영역 컨테이너 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 왼쪽 및 중앙 영역 */}
            <div className="flex-1 flex overflow-hidden">
              {/* 왼쪽: 내원이력 */}
              <div className="w-90 border-r border-gray-200 flex flex-col overflow-hidden bg-white">
                {/* 내원이력 헤더 */}
                <div className="px-4 pt-2 flex items-center justify-between 0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-800">내원이력</h3>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 17.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>
                </div>

                {/* 날짜 선택 영역 */}
                <div className="px-4 py-3  bg-white">
                  <div className="flex items-center justify-between ">
                    <button className="flex items-center gap-2 py-1 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                      <span className="text-sm font-medium">2023-03-21 (오늘)</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">담당의: 이원장</div>
                </div>

                {/* 내원이력 콘텐츠 */}
                <div className="flex-1 overflow-y-auto  bg-white">
                  <div className="px-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-xs border border-blue-500 text-blue-600 rounded">호흡기</span>
                      <span className="px-2 py-0.5 text-xs border border-blue-100 bg-blue-100 text-blue-600 rounded">
                        건강보험
                      </span>
                    </div>

                    {/* 상세 의료 정보 */}
                    <div className="space-y-1 text-xs text-gray-700">
                      {/* 증상 */}
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="font-semibold text-gray-800 shrink-0">증상:</span>
                        <span className="truncate">기침, 발열, 전신 피로감 {"->"} 흉부 불편감, 호흡 시 통증</span>
                      </div>

                      {/* 부위 */}
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="font-semibold text-gray-800 shrink-0">부위:</span>
                        <span className="truncate">폐(우측 하엽 중심), 기관지</span>
                      </div>

                      {/* 치료경험 */}
                      {/* <div className="flex items-start gap-2 min-w-0">
                        <span className="font-semibold text-gray-800 shrink-0">치료경험:</span>
                        <span className="truncate">
                          동네 내과에서 감기·기관지염으로 초기 치료받았으나 증상 지속. 해열제·진해거담제 처방 후 호전
                          없음.
                        </span>
                      </div> */}

                      {/* 시작 */}
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="font-semibold text-gray-800 shrink-0">시작:</span>
                        <span className="truncate">
                          3일 전부터 기림과 미열 발생 {"->"} 점차 호흡 시 통증과 기침 악화 먼지가 닿으면 심해짐
                        </span>
                      </div>
                    </div>

                    {/* 진단 섹션 */}
                    {/* <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            d="M21.25 9.944V14.056C21.2492 14.3283 21.1406 14.5892 20.948 14.7817C20.7553 14.9741 20.4943 15.0825 20.222 15.083H15.083V20.223C15.0822 20.4951 14.9738 20.7559 14.7813 20.9483C14.5889 21.1408 14.3281 21.2492 14.056 21.25H9.944C9.67169 21.2492 9.41078 21.1406 9.21832 20.948C9.02587 20.7553 8.91753 20.4943 8.917 20.222V15.083H3.777C3.50487 15.0822 3.2441 14.9738 3.05168 14.7813C2.85925 14.5889 2.75079 14.3281 2.75 14.056V9.944C2.75079 9.67169 2.85939 9.41078 3.05203 9.21832C3.24467 9.02587 3.50569 8.91753 3.778 8.917H8.917V3.777C8.91779 3.50487 9.02625 3.2441 9.21868 3.05168C9.4111 2.85925 9.67187 2.75079 9.944 2.75H14.056C14.3283 2.75079 14.5892 2.85939 14.7817 3.05203C14.9741 3.24467 15.0825 3.50569 15.083 3.778V8.917H20.223C20.4951 8.91779 20.7559 9.02625 20.9483 9.21868C21.1408 9.4111 21.2492 9.67187 21.25 9.944Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-800 truncate flex-1">
                              상세불명의 바이러스성 폐렴
                            </span>
                            <span className="text-xs text-green-700 shrink-0">주</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-xs font-medium text-gray-800 truncate block">
                              (우측 하엽 중심 영상 소견)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* 처방 섹션 - 알약 아이콘 */}
                    {/* <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs flex-1 text-gray-700 truncate">
                              아세트아미노펜(해열진통제) (500mg/1정)
                            </span>
                            <span className="text-xs text-gray-600 shrink-0">1 1 10</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs flex-1 text-gray-700 truncate">암브록솔(거담제)</span>
                            <span className="text-xs text-gray-600 shrink-0">1 1 10</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs flex-1 text-gray-700 truncate">덱스트로메토르판(진해제)</span>
                            <span className="text-xs text-gray-600 shrink-0">1 1 1</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
                          />
                        </svg>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs flex-1 text-gray-700 truncate">
                              네뷸라이저 흡입약(살부타몰/이부프로)
                            </span>
                            <span className="text-xs shrink-0">
                              <span className="text-purple-600">원내</span> <span className="text-gray-600">1 1 1</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* 비커/플라스크 아이콘 */}
                    <div className="mt-2">
                      <div className="flex items-start gap-2 min-w-0">
                        {/* 비커/플라스크 아이콘 */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                          />
                        </svg>

                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-gray-700 truncate block">Chest X-ray</span>
                        </div>
                      </div>
                    </div>

                    {/* 진찰료 - 다이아몬드 아이콘 */}
                    <div className="mt-2 flex items-center gap-2 min-w-0">
                      {/* 다이아몬드 아이콘 */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>

                      <span className="text-xs text-gray-700 truncate">호흡기내과 외래 추적진료 권고</span>
                    </div>
                  </div>

                  {/* 총액 */}
                  <div className="mt-4 flex items-center gap-2 border-t border-b py-3 border-gray-200 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">50,000원</span>
                  </div>

                  {/* 이미지/동영상 업로드 영역 */}
                  <div className="mt-4 px-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-blue-400 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5m0 0V21"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-700">이미지/동영상업로드</p>
                            <p className="text-xs text-gray-500">JPG, PNG, MP4, MOV, AVI</p>
                          </div>
                        </div>
                        <label className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                          업로드
                          <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* 업로드된 파일 목록 */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="bg-white rounded-lg border border-gray-200 p-3">
                            {/* 파일 정보 */}
                            <div className="flex items-center gap-3 mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-400 shrink-0"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                              </svg>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                              <button
                                onClick={() => handleRemoveFile(file.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            {/* 이미지/동영상 미리보기 */}
                            <div className="mt-2 rounded-lg overflow-hidden bg-gray-100">
                              {file.type === "image" ? (
                                <img src={file.url} alt={file.name} className="w-full h-auto max-h-48 object-cover" />
                              ) : (
                                <video src={file.url} className="w-full h-auto max-h-48 object-cover" controls>
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 중앙: 진료기록 및 진단 및 처방 */}
              <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50 p-4">
                {/* 상단 헤더 */}
                <div className="pb-3  ">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">✍️2023-03-21 10:00</span>
                    <span className="text-sm text-gray-600">이원장</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg">
                  {/* 메인 콘텐츠 */}
                  <div className="flex-1 overflow-y-auto px-6 py-4 ">
                    {/* 진료기록 섹션 */}
                    <div className="">
                      <h4 className="text-base font-semibold text-gray-800 mb-4">진료기록</h4>
                      <div className="flex gap-4">
                        {/* 왼쪽: 진료기록 텍스트 */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="text-xs text-gray-700 leading-tight space-y-2">
                            <div>
                              <span className="font-semibold text-gray-800">증상:</span>{" "}
                              <span>기침, 발열, 전신 피로감 {"->"} 흉부 불편감, 호흡 시 통증</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-800">부위:</span>{" "}
                              <span>폐(우측 하엽 중심), 기관지</span>
                            </div>
                            {/* <div>
                              <span className="font-semibold text-gray-800">치료 경험:</span>{" "}
                              <span>
                                동네 내과에서 감기·기관지염으로 초기 치료받았으나 증상 지속. 해열제·진해거담제 처방 후
                                호전 없음.
                              </span>
                            </div> */}
                            <div>
                              <span className="font-semibold text-gray-800">시작:</span>{" "}
                              <span>3일 전부터 기침과 미열 발생 {"->"} 점차 호흡 시 통증과 기침 악화</span>
                            </div>
                          </div>
                          {/* 태그 메뉴 */}
                          <div className="flex items-center gap-2 flex-wrap mt-4">
                            <span className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded bg-white">
                              외래기록지
                            </span>
                            <span className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded bg-white">
                              SOAP
                            </span>
                            <span className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded bg-white">
                              건강검진기록지
                            </span>
                            <span className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded bg-white">
                              rep
                            </span>
                            <span className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded bg-white">
                              더보기
                            </span>
                          </div>
                        </div>

                        {/* 오른쪽: 이미지 영역 */}
                        <div className="w-52 flex flex-col">
                          <div className="w-full bg-gray-100 rounded border border-gray-200 overflow-hidden mb-3">
                            <div className="flex items-center justify-between w-full px-4 py-2">
                              <p className="text-xs  font-medium">이미지</p>
                              <button className="text-xs text-blue-600">전체 이미지</button>
                            </div>
                            <div className="h-40 bg-gray-50 rounded border-2 border-gray-200 flex items-center justify-center mx-4 overflow-hidden">
                              {uploadedFiles.length > 0 ? (
                                uploadedFiles[0].type === "image" ? (
                                  <img
                                    src={uploadedFiles[0].url}
                                    alt={uploadedFiles[0].name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <video src={uploadedFiles[0].url} className="w-full h-full object-cover" controls>
                                    Your browser does not support the video tag.
                                  </video>
                                )
                              ) : (
                                <p className="text-xs text-gray-400">이미지 없음</p>
                              )}
                            </div>
                            <div className="px-4 flex justify-center py-2">
                              <label className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 w-fit bg-white cursor-pointer">
                                사진 업로드 ({uploadedFiles.length}/30)
                                <input
                                  type="file"
                                  accept="image/*,video/*"
                                  multiple
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg mt-4">
                  {/* 진단 및 처방 섹션 */}
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-800">진단 및 처방</h4>
                      {/* 버튼들 */}
                      <div className="flex items-center gap-3">
                        <button className=" py-1.5 text-sm  hover:bg-gray-50">예방접종</button>
                        <button className=" py-1.5 text-sm  hover:bg-gray-50">스마트관리료</button>
                        <button className=" py-1.5 text-sm  hover:bg-gray-50 flex items-center gap-1">
                          DUR 점검
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {!aiAnalysisLoading && !aiAnalysisComplete ? (
                        // 빈 상태
                        <div className="border border-gray-200 rounded-lg p-8 bg-white text-center">
                          <p className="text-sm text-gray-500">이미지/동영상을 업로드하면 AI 분석 결과가 표시됩니다.</p>
                        </div>
                      ) : aiAnalysisLoading ? (
                        // 로딩 상태
                        <div className="border border-gray-200 rounded-lg p-8 bg-white">
                          <div className="flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-sm font-medium text-gray-700">이미지 인식중...</p>
                          </div>
                        </div>
                      ) : (
                        // AI 분석 결과
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <h5 className="text-sm font-semibold text-gray-800 mb-3">X-ray 이미지 AI 분석 결과</h5>

                          {/* AI 모델이 보여준 영상 특징 */}
                          <div className="mb-4">
                            <p className="text-sm text-gray-700 mb-2">AI 모델이 다음 영상 특징을 확인했습니다:</p>
                            <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                              <li>우측 하엽 중심의 음영 증가(consolidation-like opacity)</li>
                              <li>미만성 간유리음영(Ground-glass opacity)</li>
                              <li>기관지 주변 염증(peribronchial thickening)</li>
                              <li>세균성보다는 바이러스성 패턴에 가까운 영상 특징</li>
                            </ul>
                          </div>

                          {/* 진단 추정 결과 - 빨간색 볼드체 */}
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-bold text-red-600">
                                바이러스성 폐렴(Viral Pneumonia) 가능성 약 82%로 추정됩니다.
                              </span>
                            </p>
                          </div>

                          {/* AI 모델의 영상 패턴 분석 점수 */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-800 mb-2">AI 모델의 영상 패턴 분석 점수:</p>
                            <div className="space-y-1.5 text-sm text-gray-700">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>
                                  Viral Pattern Score: <span className="font-semibold">0.82</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                <span>
                                  Bacterial Pattern Score: <span className="font-semibold">0.34</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                <span>
                                  Severity Index(중증도): <span className="font-semibold">0.41</span> (경도~중등도)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 영상 패턴 설명 */}
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              영상 패턴은 세균성 폐렴에서 흔한 폐엽성 경화(Consolidation)보다 미만성, 간유리음영
                              중심으로 나타나며 이는 AI 학습 데이터에서 바이러스 감염군과 유사한 양상입니다.
                            </p>
                          </div>

                          {/* 권고 사항 */}
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 mb-1">권고:</p>
                            <p className="text-sm text-gray-700">
                              AI의 판독은 보조 도구이며, 정확한 진단을 위해 임상 증상·청진·혈액검사(CRP, CBC)·산소포화도
                              측정이 필요합니다.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 내비게이션 바 */}
            <div className="px-6 py-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <button className="px-4 py-2 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-100 font-medium">
                새차트 생성
              </button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>3개 차트 중 1-3</span>
                  <button className="p-1 hover:bg-gray-200 rounded">{"<"}</button>
                  <button className="p-1 hover:bg-gray-200 rounded">{"<<"}</button>
                  <button className="p-1 hover:bg-gray-200 rounded">{">"}</button>
                  <button className="p-1 hover:bg-gray-200 rounded">{">>"}</button>
                </div>
                <div className="text-sm text-gray-600">진료실2</div>
                <div className="text-sm text-gray-600">수납실 대기~</div>
                <button className="px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                  {">"} 보내기
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽: 3개 영역 */}
          <div className="w-130 flex border-l border-gray-200 overflow-hidden">
            {/* 1. 오더세트 영역 */}
            <div className="w-60 border-r border-gray-200 flex flex-col overflow-hidden bg-white">
              {/* 오더세트 헤더 */}
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded">
                      오더세트
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">
                      차트템플릿
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="오더세트 검색"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>

              {/* 오더세트 콘텐츠 */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="">
                  {/* 두 개의 컬럼 레이아웃 */}
                  <div className="flex gap-0">
                    {/* 왼쪽 컬럼: 검사 */}
                    <div className="border-r border-gray-200 pb-10">
                      <div className="space-y-0">
                        <div className="text-xs text-gray-700 py-3 bg-blue-50 px-4 rounded cursor-pointer">검사</div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          검사
                        </div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          검사
                        </div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          비급여
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽 컬럼: 알러지 검사 */}
                    <div className="flex-1">
                      <div className="space-y-0">
                        <div className="text-xs text-gray-700 py-3 bg-blue-50 px-4 rounded cursor-pointer">
                          호흡기 검사
                        </div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          간기능검사
                        </div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          8종혈구검사
                        </div>
                        <div className="text-xs text-gray-700 py-3 hover:bg-blue-50 px-4 rounded cursor-pointer">
                          간기능검사
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 선택된 검사 목록 */}
                  <div className="pt-4 border-t px-4 border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-800">검사/호흡기 검사 10</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">모두복사</button>
                    </div>
                    <div className="space-y-1.5">
                      {/* 첫 번째 항목: 플러스 아이콘이 있는 사각형 */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 ">
                        <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-3 h-3 text-gray-600"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                        <span className=" whitespace-nowrap ">CBC (전혈구검사)</span>
                      </div>

                      {/* 나머지 항목: 비커/플라스크 아이콘 */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">CRP</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">Chest PA (흉부 X-ray 촬영)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">호흡기 바이러스 PCR 패널</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">전해질 검사 (Na/K/Cl)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">간기능검사 (AST/ALT)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">SpO₂ 측정</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">Chest CT</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">ESR</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 py-1.5 px-2 min-w-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-500 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232 1.232 3.228 0 4.46s-3.228 1.232-4.46 0l-1.403-1.402m-4.677-4.677a24.301 24.301 0 0 0-4.5 0M5 14.5l2.491 2.491a24.301 24.301 0 0 0 4.5 0L14.5 14.5"
                          />
                        </svg>
                        <span className="truncate">혈액배양</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 환자기록 영역 */}
            <div className="flex-1 flex flex-col overflow-hidden bg-blue-50 p-4">
              {/* 환자기록 헤더 */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-800">환자기록</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 text-gray-500 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
              </div>

              {/* 환자기록 콘텐츠 */}
              <div className="flex-1 overflow-y-auto ">
                <div className="flex flex-col justify-between h-full">
                  <div className=" flex-1">
                    {/* 초기 환자 정보 (공지사항 형태) */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 relative mb-4">
                      {/* 왼쪽 상단 메가폰 아이콘 */}
                      <div className="absolute top-4 left-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                          />
                        </svg>
                      </div>
                      {/* 오른쪽 상단 점 아이콘 */}
                      <div className="absolute top-4 right-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 17.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </div>
                      {/* 텍스트 내용 */}
                      <div className="px-6 text-xs text-gray-700 space-y-1">
                        <div>방문경로: 안스떼 카페</div>
                        <div>가족력: 특이사항 없음</div>
                        <div>흡연: 아빠 흡연(연초)</div>
                      </div>
                    </div>

                    {/* 김원무 기록 */}
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#eff1c4] rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-medium text-black opacity-60">원무</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">09:54 AM</div>
                        <div className="text-xs text-gray-700 space-y-1">
                          <div>방문경로: 안스떼 카페</div>
                          <div>가족력: 특이사항 없음</div>
                          <div>흡연: 아빠 흡연(연초)</div>
                        </div>
                      </div>
                    </div>

                    {/* 이간호 기록 */}
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#f8d5e1] rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-medium text-black opacity-60">간호</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">09:59 AM</div>
                        <div className="text-xs text-gray-700">진단서 추가 부탁드립니다.</div>
                      </div>
                    </div>

                    {/* 날짜 구분선 */}
                    <div className="flex items-center gap-2 my-4">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="text-xs text-gray-500">2023.03.01</span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* 이원장 기록 */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#eff1c4] rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-medium text-black opacity-60">원장</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">이원장 10:21 AM</div>
                        <div className="text-xs text-gray-700">임상 증상 및 AI 영상 소견상 바이러스성 폐렴 의심</div>
                      </div>
                    </div>
                  </div>

                  {/* 하단 고정 메모 */}
                  <div className="mt-auto ">
                    <div className="p-4 bg-white border border-blue-300 rounded-lg relative min-h-30">
                      <div className="text-xs text-gray-700 pr-8">
                        <span className="text-blue-600">@이영양</span> 선생님, 김메디 환아 3일 섭취 기록 작성법 교육
                        부탁드립니다.
                      </div>
                      <button className="absolute bottom-2 right-2 p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 퀵 메뉴 영역 */}
            <div className="w-12 flex flex-col items-center py-4 gap-3 bg-white border-l border-gray-200">
              {/* 채팅 아이콘 */}
              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
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
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.193v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </button>

              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                  />
                </svg>
              </button>

              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>

              <hr className="w-3/5 border-gray-200 " />

              {/* 알림 아이콘 */}
              <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
