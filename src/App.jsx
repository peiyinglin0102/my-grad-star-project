import React, { useEffect } from 'react';

// 模擬動態進入效果
const FadeInSection = ({ children }) => {
  return (
    <div className="transition-all duration-1000 transform opacity-0 translate-y-10 on-scroll-reveal">
      {children}
    </div>
  );
};

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    });
    document.querySelectorAll('.on-scroll-reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-200">
      
      {/* 導覽列 */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              星星像應
            </h1>
          </div>
          <div className="hidden md:flex space-x-8 font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition">研究初衷</a>
            <a href="#system" className="hover:text-blue-600 transition">系統架構</a>
            <a href="#results" className="hover:text-blue-600 transition">實測成效</a>
            <a href="#awards" className="hover:text-blue-600 transition">競賽殊榮</a>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            聯絡團隊
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full">
          2026 靜宜大學人工智慧應用學系 畢業專題
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          星星像應：自閉症兒童 <br/>
          <span className="text-blue-600 underline decoration-yellow-400">AI 互動情緒辨識</span> 訓練系統
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
          結合 MediaPipe 與 FER 技術，為「星星的孩子」打造一套循序漸進的數位學習橋樑。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 mb-1">指導老師</p>
            <p className="font-bold">許慈芳 教授</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 mb-1">團隊成員</p>
            <p className="font-bold">林沛瑩、林家儀、余秀槿、黃乙珊</p>
          </div>
        </div>
      </header>

      {/* 研究動機 */}
      <section id="about" className="py-20 container mx-auto px-4">
        <FadeInSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1551847677-1f20763ccecd?auto=format&fit=crop&q=80&w=800" alt="ASD Support" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 inline-block"></span>
                研究動機與初衷
              </h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                自閉症患者（星星孩童）常因大腦杏仁核缺陷，難以判讀表情與語氣。我們觀察到現有教材多為靜態圖卡，缺乏即時回饋。
              </p>
              <ul className="space-y-4">
                {[
                  "減少家長教材準備負擔",
                  "建立 AI 正向回饋機制",
                  "結合實體按鈕輔具提升專注度"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="font-medium text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 核心系統三階段 */}
      <section id="system" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">循序漸進的三階段訓練</h2>
            <p className="text-slate-400">從基礎認知到真實生活的場景遷移</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "靜態圖片辨別", desc: "學習基本情緒特徵 (開心、難過、生氣...)", icon: "🖼️" },
              { title: "動態影片理解", desc: "觀察表情變化與情緒的持續性", icon: "🎬" },
              { title: "真實社交應用", desc: "生活情境模擬，選擇正確互動回應", icon: "🤝" }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 數據成效 */}
      <section id="results" className="py-20 container mx-auto px-4">
        <FadeInSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">實測成效亮眼</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 font-bold">
                    <span>ASD 孩童整體正確率</span>
                    <span className="text-blue-600">80.29%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[80%]"></div>
                  </div>
                </div>
                <p className="text-slate-600">
                  實測結果顯示，受測孩童在圖片、動圖與情境題三種類型中，正確率皆有明顯提升。
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl text-center">
                <p className="text-3xl font-bold text-blue-600">80%+</p>
                <p className="text-sm text-blue-700 font-medium">情緒辨識進步率</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-2xl text-center">
                <p className="text-3xl font-bold text-yellow-600">5/5</p>
                <p className="text-sm text-yellow-700 font-medium">家長整體滿意度</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 技術亮點 */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 italic underline decoration-yellow-400">AI 技術核心</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="font-black text-xl">01</div>
                <p>MediaPipe + FER 進行多幀影像情緒分析</p>
              </div>
              <div className="flex gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="font-black text-xl">02</div>
                <p>OpenAI API 自動生成正向鼓勵語句</p>
              </div>
              <div className="flex gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="font-black text-xl">03</div>
                <p>ESP8266 輔具與網頁 Serial API 即時同步</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
             <div className="text-center p-8 border-4 border-dashed border-white/30 rounded-full w-64 h-64 flex flex-col justify-center animate-pulse">
                <p className="text-lg font-bold">Docker 容器化部署</p>
                <p className="text-xs mt-2 opacity-70">Nginx + Gunicorn + MariaDB</p>
             </div>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-slate-900 text-slate-500 py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 星星像應專題團隊 - 靜宜大學人工智慧應用學系</p>
          <div className="flex gap-6">
             <span className="hover:text-white cursor-pointer transition">GitHub 原始碼</span>
             <span className="hover:text-white cursor-pointer transition">專題報告下載</span>
          </div>
        </div>
      </footer>
    </div>
  );
}