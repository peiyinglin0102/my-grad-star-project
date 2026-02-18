import React, { useState, useEffect } from 'react';

// --- 共用組件：卡片標題 ---
const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-16 on-scroll-reveal transition-all duration-1000 transform opacity-0 translate-y-8">
    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{children}</h2>
    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');

  // --- Scroll Reveal 邏輯 ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.on-scroll-reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 導覽列 */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 p-4 border-b border-slate-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">⭐</div>
            <div>
              <h1 className="text-xl font-black text-slate-800 leading-none">星星像應</h1>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Graduation Project 2026</span>
            </div>
          </div>
          <div className="hidden lg:flex space-x-8 font-bold text-sm text-slate-600 uppercase">
            <a href="#intro" className="hover:text-blue-600 transition">研究初衷</a>
            <a href="#system" className="hover:text-blue-600 transition">技術架構</a>
            <a href="#database" className="hover:text-blue-600 transition">資料庫設計</a>
            <a href="#results" className="hover:text-blue-600 transition">成果成效</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-32 px-4 text-center bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto">
          <h2 className="text-lg font-black text-blue-600 mb-6 tracking-widest">靜宜大學人工智慧應用學系 畢業專題</h2>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-slate-900">
            星星像應 <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              自閉症兒童 AI 情緒辨識訓練系統
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
            為學齡前輕度自閉症兒童量身打造，結合 AI 影像辨識與多感官硬體輔助，解決傳統圖卡教材互動不足之痛點。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <p className="text-xs font-black text-slate-400 mb-1 uppercase">指導教師</p>
              <p className="font-bold text-slate-800">許慈芳 教授</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <p className="text-xs font-black text-slate-400 mb-1 uppercase">團隊成員</p>
              <p className="font-bold text-slate-800">林沛瑩、林家儀、余秀槿、黃乙珊</p>
            </div>
          </div>
        </div>
      </header>

      {/* 核心摘要區 (Tabs模式) */}
      <section id="intro" className="py-24 container mx-auto px-4">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100/50 overflow-hidden border border-slate-100">
          <div className="flex bg-slate-50 border-b border-slate-100">
            {['summary', 'background', 'market'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-6 font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab === 'summary' ? '研究摘要' : tab === 'background' ? '研究背景' : '市場分析'}
              </button>
            ))}
          </div>
          <div className="p-12">
            {activeTab === 'summary' && (
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h3 className="text-2xl font-black mb-6">三階段關卡學習設計</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 rounded-2xl border-l-8 border-blue-600">
                      <h4 className="font-black text-blue-800 mb-2">Stage 1: 靜態圖片辨別</h4>
                      <p className="text-blue-700/80">從單一表情圖像，學習基本情緒辨識特徵。</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-2xl border-l-8 border-indigo-600">
                      <h4 className="font-black text-indigo-800 mb-2">Stage 2: 動態影片理解</h4>
                      <p className="text-indigo-700/80">導入 GIF 影像，訓練觀察表情變化與持續性。</p>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-2xl border-l-8 border-purple-600">
                      <h4 className="font-black text-purple-800 mb-2">Stage 3: 真實社交應用</h4>
                      <p className="text-purple-700/80">模擬平日生活情境，選擇正確的互動回應方式。</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200">
                  <h3 className="text-xl font-black mb-6">核心價值分析 (SWOT)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-100 p-4 rounded-xl font-bold text-green-800 text-sm">S: AI 即時回饋 / 實體輔具互動</div>
                    <div className="bg-red-100 p-4 rounded-xl font-bold text-red-800 text-sm">W: 仰賴網路 / 運維成本</div>
                    <div className="bg-blue-100 p-4 rounded-xl font-bold text-blue-800 text-sm">O: 特教輔具市場缺口 / AI 趨勢</div>
                    <div className="bg-yellow-100 p-4 rounded-xl font-bold text-yellow-800 text-sm">T: 光線影響辨識 / 傳統教學偏好</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'background' && (
              <div className="max-w-4xl mx-auto leading-relaxed text-slate-600">
                <p className="mb-6">
                  根據 2023 年統計，自閉症患病率上升為 1:36，台灣自閉症人數已突破 2 萬人。
                  自閉症孩童常因「三合一障礙」導致溝通困難，其中情緒理解扮演關鍵角色。
                </p>
                <blockquote className="border-l-4 border-blue-600 pl-6 italic my-8 text-xl text-slate-800 font-medium">
                  「心理理論指出，自閉症者難以判斷情緒或意圖，多源於杏仁核缺陷。」
                </blockquote>
              </div>
            )}
            {activeTab === 'market' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-200">
                      <th className="p-4 font-black">比較項目</th>
                      <th className="p-4 font-black text-blue-600">AI 數位互動系統</th>
                      <th className="p-4 font-black">傳統情緒圖卡</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { item: '互動性', ai: '動物角色、語音回饋', trad: '靜態、參與感低' },
                      { item: '回饋', ai: 'AI 即時修正引導', trad: '需大人判定、回饋延遲' },
                      { item: '分析', ai: '視覺化學習數據', trad: '無法量化成效' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-bold">{row.item}</td>
                        <td className="p-4 text-blue-600 font-medium">{row.ai}</td>
                        <td className="p-4 text-slate-500">{row.trad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 技術亮點：AI 模組 */}
      <section id="system" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle="整合 MediaPipe、FER 與 OpenAI 技術的核心引擎">
            <span className="text-white">AI 辨識與模組設計</span>
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '臉部偵測', tech: 'MediaPipe', desc: 'FaceDetection 偵測位置並裁切清晰特徵' },
              { title: '情緒辨識', tech: 'CNN / FER', desc: '辨識六大情緒 (Angry, Happy, Sad...)' },
              { title: '正向回饋', tech: 'OpenAI API', desc: '自動生成童言風格的鼓勵語句' },
              { title: '系統監控', tech: 'Grafana', desc: '即時監測 CPU/記憶體 資源穩定性' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-800 rounded-3xl border border-slate-700 group hover:border-blue-500 transition-all">
                <div className="text-blue-500 font-black text-xs uppercase mb-4 tracking-widest">{item.tech}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 資料庫字典區 */}
      <section id="database" className="py-24 container mx-auto px-4">
        <SectionTitle subtitle="標準化資料關聯設計，支援學習歷程大數據分析">
          資料庫字典 (Data Dictionary)
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              System (系統題目表)
            </h3>
            <div className="space-y-4">
              {[
                { field: 's_type', type: 'varchar(20)', desc: '題目類型 (image, gif, scene)' },
                { field: 's_answer', type: 'varchar(100)', desc: '正確答案標籤' },
                { field: 's_correct_rate', type: 'float', desc: '整體正確率 (自動更新)' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-2 text-sm">
                  <span className="font-mono text-blue-600">{row.field}</span>
                  <span className="text-slate-400">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
              User (使用者表)
            </h3>
            <div className="space-y-4">
              {[
                { field: 'password_hash', type: 'varchar(255)', desc: '雜湊加密密碼' },
                { field: 'is_verified', type: 'boolean', desc: '信箱驗證狀態' },
                { field: 'status', type: 'varchar(50)', desc: '帳號啟用/停用狀態' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-2 text-sm">
                  <span className="font-mono text-indigo-600">{row.field}</span>
                  <span className="text-slate-400">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 成果數據：測試成效 */}
      <section id="results" className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-white">
          <SectionTitle>
            <span className="text-white">實測成果與量化指標</span>
          </SectionTitle>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] border border-white/20">
              <h3 className="text-2xl font-black mb-8 italic">ASD 孩童學習成效</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3 text-sm font-black uppercase tracking-widest">
                    <span>整體正確率</span>
                    <span>80.29%</span>
                  </div>
                  <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[80.29%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-3 text-sm font-black uppercase tracking-widest">
                    <span>圖片題進步幅度</span>
                    <span>明顯提高</span>
                  </div>
                  <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full w-[90%]"></div>
                  </div>
                </div>
              </div>
              <p className="mt-10 text-white/80 leading-relaxed italic border-l-2 border-yellow-400 pl-6">
                「ASD 幼兒整體正確率可達 80.29%，顯示系統能有效支持情緒理解薄弱的幼兒進步。」
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: '家長滿意度', val: '5.0 / 5', desc: '問卷最高評價' },
                { label: '平均延遲', val: '< 1.0s', desc: '流暢操作響應' },
                { label: '偵測頻率', val: '12 幀/秒', desc: '動圖分析效率' },
                { label: '穩定運作', val: '24h+', desc: '低於 1% 錯誤率' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
                  <div className="text-3xl font-black mb-2 text-blue-600">{stat.val}</div>
                  <div className="font-bold text-sm mb-1 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-slate-400 text-xs">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 團隊與 footer */}
      <footer className="py-20 bg-slate-900 text-slate-500">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-12">
            {['林沛瑩', '林家儀', '余秀槿', '黃乙珊'].map((name) => (
              <span key={name} className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 font-bold text-sm">
                {name}
              </span>
            ))}
          </div>
          <p className="mb-4">© 2026 靜宜大學人工智慧應用學系畢業專題 - 星星像應團隊</p>
          <p className="text-xs uppercase tracking-[0.3em]">AI-Powered Emotion Recognition for ASD Children</p>
        </div>
      </footer>
    </div>
  );
}