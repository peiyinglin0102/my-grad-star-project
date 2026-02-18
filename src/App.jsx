import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 導覽列 */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">畢業專題：My Grad Star</h1>
          <div className="space-x-6">
            <a href="#about" className="hover:text-blue-500">關於專題</a>
            <a href="#features" className="hover:text-blue-500">特色功能</a>
          </div>
        </div>
      </nav>

      {/* 主視覺區 */}
      <header className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
        <h2 className="text-5xl font-extrabold mb-4 animate-bounce">專題名稱：智慧數據監測系統</h2>
        <p className="text-xl opacity-90">運用 Python 與 React 實現的高效能運維監控方案</p>
      </header>

      {/* 專題內容 */}
      <main className="container mx-auto py-12 px-4" id="about">
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold mb-6 border-b-2 border-blue-200 pb-2">專題簡介</h3>
          <p className="leading-relaxed text-lg">
            本專案旨在解決實習過程中遇到的自動化部署難題，透過整合 GitHub Actions 與雲端服務，
            提升開發效率並確保系統資安。
          </p>
        </section>

        {/* 特色卡片 */}
        <section className="grid md:grid-cols-3 gap-8" id="features">
          {[
            { title: '自動化部署', desc: '串接 GitHub Actions，一鍵上線。', icon: '🚀' },
            { title: '響應式設計', desc: '支援手機與電腦完美顯示。', icon: '📱' },
            { title: '資安隱私', desc: '隱藏原始伺服器資訊，安全無虞。', icon: '🛡️' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition-all text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2026 Peiying - 畢業專題網站</p>
      </footer>
    </div>
  );
}

export default App;