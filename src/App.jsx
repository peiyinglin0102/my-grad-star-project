import React, { useEffect, useState } from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ink: #0d1b2a; --deep: #0a1628; --mid: #112240; --panel: #162a47;
      --gold: #f5c842; --gold-light: #fde68a; --sky: #64b5f6; --teal: #4dd0e1;
      --rose: #f48fb1; --text: #d6e4f0; --muted: #8bacc5; --white: #ffffff;
      --r: 20px; --rl: 32px;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Noto Sans TC', sans-serif; background: var(--deep); color: var(--text); overflow-x: hidden; }
    .df { font-family: 'Playfair Display', serif; }
    .star-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
    .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--dur,3s) ease-in-out infinite; animation-delay: var(--delay,0s); opacity: var(--op,0.6); }
    @keyframes twinkle { 0%,100%{opacity:var(--op,0.6);transform:scale(1)} 50%{opacity:0.1;transform:scale(0.5)} }
    @keyframes floatUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(1.5);opacity:0} }
    @keyframes bounce-in { 0%{transform:scale(.5) rotate(-10deg);opacity:0} 60%{transform:scale(1.1) rotate(3deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
    @keyframes scroll-dot { 0%{opacity:1;transform:translate(-50%,0)} 100%{opacity:0;transform:translate(-50%,14px)} }
    .reveal { opacity:0; transform:translateY(30px); transition:opacity .8s ease,transform .8s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }
    ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:var(--deep)} ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px}

    nav { position:fixed; top:0;left:0;right:0; z-index:100; padding:16px 40px; display:flex; align-items:center; justify-content:space-between; background:rgba(10,22,40,.85); backdrop-filter:blur(20px); border-bottom:1px solid rgba(245,200,66,.15); }
    .nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; cursor:pointer; }
    .nav-star { width:34px;height:34px; background:var(--gold); clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); animation:spin-slow 8s linear infinite; }
    .nav-links { display:flex; gap:28px; list-style:none; }
    .nav-links a { color:var(--muted); text-decoration:none; font-size:14px; font-weight:500; letter-spacing:.05em; transition:color .2s; position:relative; }
    .nav-links a::after { content:''; position:absolute; bottom:-2px;left:0;right:0; height:1px; background:var(--gold); transform:scaleX(0); transition:transform .3s; }
    .nav-links a:hover { color:var(--gold); } .nav-links a:hover::after { transform:scaleX(1); }
    .nav-cta { background:var(--gold); color:var(--ink); border:none; padding:10px 24px; border-radius:100px; font-weight:700; font-size:14px; cursor:pointer; transition:all .2s; font-family:'Noto Sans TC',sans-serif; }
    .nav-cta:hover { background:var(--gold-light); transform:translateY(-1px); box-shadow:0 8px 20px rgba(245,200,66,.4); }

    .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:120px 24px 80px; position:relative; }
    .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(245,200,66,.12); border:1px solid rgba(245,200,66,.35); color:var(--gold); font-size:13px; font-weight:500; padding:8px 20px; border-radius:100px; margin-bottom:32px; animation:floatUp 1s ease forwards; }
    .hero-title { font-family:'Playfair Display',serif; font-size:clamp(40px,8vw,86px); font-weight:900; line-height:1.05; margin-bottom:24px; animation:floatUp 1s .2s ease both; }
    .gold-text { background:linear-gradient(135deg,var(--gold) 0%,#ff9f43 50%,var(--gold) 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; }
    .hero-sub { max-width:680px; font-size:18px; color:var(--muted); line-height:1.8; margin-bottom:48px; animation:floatUp 1s .4s ease both; }
    .hero-cards { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; animation:floatUp 1s .6s ease both; margin-bottom:60px; }
    .hero-card { background:rgba(22,42,71,.9); border:1px solid rgba(100,181,246,.2); border-radius:16px; padding:16px 24px; text-align:left; }
    .hero-card-label { font-size:11px; color:var(--sky); text-transform:uppercase; letter-spacing:.1em; margin-bottom:4px; }
    .hero-card-value { font-size:15px; font-weight:600; color:var(--white); }
    .scroll-hint { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--muted); font-size:12px; animation:floatUp 1s 1s ease both; }
    .scroll-mouse { width:24px;height:38px; border:2px solid rgba(139,172,197,.4); border-radius:12px; position:relative; }
    .scroll-mouse::before { content:''; position:absolute; top:6px;left:50%;transform:translateX(-50%); width:4px;height:4px; background:var(--gold); border-radius:50%; animation:scroll-dot 1.5s ease infinite; }

    section { position:relative; z-index:1; }
    .si { max-width:1200px; margin:0 auto; padding:100px 24px; }
    .sec-label { display:inline-flex; align-items:center; gap:8px; color:var(--gold); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.15em; margin-bottom:20px; }
    .sec-label::before { content:''; width:24px;height:2px; background:var(--gold); }
    .sec-title { font-family:'Playfair Display',serif; font-size:clamp(28px,5vw,52px); font-weight:700; line-height:1.2; color:var(--white); margin-bottom:16px; }
    .sec-desc { font-size:16px; color:var(--muted); line-height:1.8; max-width:600px; }
    .divider { height:1px; background:linear-gradient(to right,transparent,rgba(245,200,66,.3),transparent); }

    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    .stat-card { background:var(--panel); border:1px solid rgba(100,181,246,.15); border-radius:var(--r); padding:28px; transition:all .3s; }
    .stat-card:hover { border-color:rgba(245,200,66,.4); transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,.3); }
    .stat-number { font-family:'Playfair Display',serif; font-size:48px; font-weight:900; color:var(--gold); line-height:1; }
    .stat-label { font-size:14px; color:var(--muted); margin-top:6px; }
    .about-list { list-style:none; margin-top:32px; display:flex; flex-direction:column; gap:16px; }
    .about-list li { display:flex; align-items:flex-start; gap:14px; padding:16px 20px; background:rgba(22,42,71,.6); border-radius:12px; border-left:3px solid var(--gold); font-size:15px; line-height:1.6; color:var(--text); }
    .about-list li .ic { font-size:20px; flex-shrink:0; }

    .feat-section { background:linear-gradient(180deg,var(--deep) 0%,var(--mid) 100%); }
    .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:60px; }
    .feat-card { background:var(--panel); border:1px solid rgba(77,208,225,.15); border-radius:var(--r); padding:36px 28px; position:relative; overflow:hidden; transition:all .4s; cursor:default; }
    .feat-card::before { content:''; position:absolute; top:0;left:0;right:0; height:3px; background:linear-gradient(to right,var(--gold),var(--teal)); transform:scaleX(0); transition:transform .4s; }
    .feat-card:hover { transform:translateY(-8px); box-shadow:0 30px 60px rgba(0,0,0,.4); border-color:rgba(77,208,225,.4); }
    .feat-card:hover::before { transform:scaleX(1); }
    .feat-num { font-family:'Playfair Display',serif; font-size:64px; font-weight:900; color:rgba(245,200,66,.08); position:absolute; top:16px;right:20px; line-height:1; }
    .feat-icon { width:56px;height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:28px; margin-bottom:20px; }
    .feat-title { font-size:18px; font-weight:700; color:var(--white); margin-bottom:12px; }
    .feat-desc { font-size:14px; color:var(--muted); line-height:1.7; }

    .stages-section { background:var(--ink); }
    .stages-wrap { display:flex; flex-direction:column; gap:0; margin-top:60px; }
    .stage-row { display:grid; grid-template-columns:80px 1fr; gap:32px; padding:40px 0; border-bottom:1px solid rgba(255,255,255,.06); align-items:center; }
    .stage-row:last-child { border-bottom:none; }
    .stage-nw { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .stage-n { width:64px;height:64px; border-radius:50%; background:var(--panel); border:2px solid var(--gold); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--gold); position:relative; }
    .stage-n::after { content:''; position:absolute; inset:-6px; border-radius:50%; border:1px solid rgba(245,200,66,.2); animation:pulse-ring 2s ease-out infinite; }
    .stage-line { width:2px; flex:1; background:linear-gradient(to bottom,var(--gold),transparent); min-height:40px; }
    .stage-tag { display:inline-block; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; padding:4px 12px; border-radius:100px; margin-bottom:12px; }
    .stage-title { font-size:24px; font-weight:700; color:var(--white); margin-bottom:10px; }
    .stage-desc { font-size:15px; color:var(--muted); line-height:1.7; max-width:560px; }
    .stage-chips { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
    .stage-chip { background:rgba(22,42,71,.8); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:6px 14px; font-size:13px; color:var(--muted); }

    .ai-section { background:var(--mid); }
    .ai-flow { display:flex; align-items:stretch; gap:0; margin-top:60px; margin-bottom:48px; background:var(--panel); border-radius:var(--rl); overflow:hidden; border:1px solid rgba(77,208,225,.2); }
    .ai-step { flex:1; padding:36px 28px; position:relative; border-right:1px solid rgba(255,255,255,.06); transition:background .3s; }
    .ai-step:last-child { border-right:none; }
    .ai-step:hover { background:rgba(77,208,225,.05); }
    .ai-arrow { position:absolute; right:-14px; top:50%; transform:translateY(-50%); width:28px;height:28px; background:var(--teal); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; color:var(--ink); font-weight:700; z-index:2; }
    .ai-step:last-child .ai-arrow { display:none; }
    .ai-icon { font-size:32px; margin-bottom:16px; }
    .ai-t { font-size:15px; font-weight:700; color:var(--white); margin-bottom:8px; }
    .ai-d { font-size:13px; color:var(--muted); line-height:1.6; }
    .tech-pills { display:flex; flex-wrap:wrap; gap:10px; margin-top:40px; }
    .tech-pill { background:rgba(22,42,71,.8); border:1px solid rgba(100,181,246,.25); color:var(--sky); font-size:13px; font-weight:500; padding:8px 18px; border-radius:100px; transition:all .2s; }
    .tech-pill:hover { background:rgba(100,181,246,.1); border-color:var(--sky); }

    .hw-section { background:var(--deep); }
    .hw-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; margin-top:60px; }
    .hw-device { position:relative; background:var(--panel); border-radius:var(--rl); padding:48px; border:1px solid rgba(245,200,66,.2); text-align:center; overflow:hidden; }
    .hw-device::before { content:''; position:absolute; top:-60px;right:-60px; width:200px;height:200px; background:radial-gradient(circle,rgba(245,200,66,.15) 0%,transparent 70%); border-radius:50%; }
    .hw-btns { display:flex; gap:32px; justify-content:center; margin:32px 0; }
    .hw-bw { display:flex; flex-direction:column; align-items:center; gap:12px; }
    .hw-btn { width:90px;height:90px; border-radius:50%; position:relative; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; transition:all .2s; border:3px solid rgba(255,255,255,.1); }
    .hw-btn:hover { transform:scale(1.08); }
    .hw-a { background:radial-gradient(circle at 30% 30%,#ffd54f,#f9a825); box-shadow:0 0 30px rgba(249,168,37,.5); }
    .hw-b { background:radial-gradient(circle at 30% 30%,#ef9a9a,#e53935); box-shadow:0 0 30px rgba(229,57,53,.5); }
    .hw-ring { position:absolute; inset:-8px; border-radius:50%; border:2px solid; animation:pulse-ring 2s ease-out infinite; }
    .hw-a .hw-ring { border-color:rgba(249,168,37,.5); } .hw-b .hw-ring { border-color:rgba(229,57,53,.5); }
    .hw-lbl { font-size:13px; color:var(--muted); font-weight:500; }
    .hw-feats { list-style:none; display:flex; flex-direction:column; gap:20px; }
    .hw-feats li { display:flex; gap:16px; align-items:flex-start; }
    .hw-dot { width:10px;height:10px; border-radius:50%; flex-shrink:0; margin-top:5px; }
    .hw-ft { font-size:15px; font-weight:600; color:var(--white); margin-bottom:4px; }
    .hw-fd { font-size:13px; color:var(--muted); line-height:1.6; }

    .res-section { background:linear-gradient(180deg,var(--mid) 0%,var(--ink) 100%); }
    .res-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-top:60px; }
    .res-big { background:var(--panel); border-radius:var(--rl); padding:48px; border:1px solid rgba(245,200,66,.2); grid-row:span 2; }
    .res-bnum { font-family:'Playfair Display',serif; font-size:80px; font-weight:900; color:var(--gold); line-height:1; }
    .res-blbl { font-size:16px; color:var(--muted); margin-top:8px; margin-bottom:32px; }
    .pb-wrap { margin-bottom:20px; }
    .pb-lbl { display:flex; justify-content:space-between; font-size:14px; margin-bottom:8px; }
    .pb-lbl span:first-child { color:var(--text); } .pb-lbl span:last-child { color:var(--gold); font-weight:600; }
    .pb-track { height:8px; background:rgba(255,255,255,.08); border-radius:100px; overflow:hidden; }
    .pb-fill { height:100%; border-radius:100px; background:linear-gradient(to right,var(--gold),var(--teal)); transition:width 1.5s ease; }
    .res-sm { background:var(--panel); border-radius:var(--r); padding:32px; border:1px solid rgba(100,181,246,.15); display:flex; flex-direction:column; justify-content:center; }
    .res-snum { font-family:'Playfair Display',serif; font-size:42px; font-weight:700; }
    .res-slbl { font-size:14px; color:var(--muted); margin-top:4px; }
    .stars { display:flex; gap:4px; margin-top:8px; }
    .stars span { font-size:24px; animation:bounce-in .5s ease both; }

    .aw-section { background:var(--ink); }
    .aw-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:60px; }
    .aw-card { background:var(--panel); border-radius:var(--r); padding:36px 28px; text-align:center; border:1px solid rgba(245,200,66,.15); transition:all .3s; position:relative; overflow:hidden; }
    .aw-card::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 0%,rgba(245,200,66,.08) 0%,transparent 60%); }
    .aw-card:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(0,0,0,.4); border-color:var(--gold); }
    .aw-trophy { font-size:48px; margin-bottom:16px; display:block; }
    .aw-title { font-size:13px; color:var(--gold); font-weight:600; text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px; }
    .aw-name { font-size:17px; font-weight:700; color:var(--white); margin-bottom:8px; line-height:1.4; }
    .aw-event { font-size:13px; color:var(--muted); }

    .tm-section { background:var(--mid); }
    .tm-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-top:24px; }
    .tm-card { background:var(--panel); border-radius:var(--r); padding:32px 20px; text-align:center; border:1px solid rgba(255,255,255,.06); transition:all .3s; }
    .tm-card:hover { transform:translateY(-4px); border-color:rgba(245,200,66,.3); }
    .tm-av { width:72px;height:72px; border-radius:50%; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:28px; background:var(--deep); border:2px solid rgba(245,200,66,.3); }
    .tm-name { font-size:16px; font-weight:700; color:var(--white); margin-bottom:4px; }
    .tm-id { font-size:12px; color:var(--muted); margin-bottom:12px; }
    .tm-role { font-size:12px; font-weight:600; color:var(--sky); background:rgba(100,181,246,.1); border-radius:100px; padding:4px 12px; display:inline-block; }
    .adv-card { background:var(--panel); border-radius:var(--r); padding:32px 40px; display:flex; align-items:center; gap:24px; border:1px solid rgba(245,200,66,.2); margin-bottom:8px; }
    .adv-av { width:80px;height:80px; border-radius:50%; background:linear-gradient(135deg,var(--gold),#ff9f43); display:flex; align-items:center; justify-content:center; font-size:32px; flex-shrink:0; }
    .adv-t { font-size:12px; color:var(--gold); font-weight:600; text-transform:uppercase; letter-spacing:.1em; margin-bottom:4px; }
    .adv-n { font-size:22px; font-weight:700; color:var(--white); margin-bottom:4px; }
    .adv-d { font-size:14px; color:var(--muted); }

    footer { background:var(--ink); border-top:1px solid rgba(245,200,66,.1); padding:60px 24px 40px; text-align:center; }
    .ft-logo { display:flex; align-items:center; gap:10px; justify-content:center; margin-bottom:24px; }
    .ft-star { width:28px;height:28px; background:var(--gold); clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); }
    .ft-links { display:flex; gap:32px; justify-content:center; list-style:none; margin-bottom:40px; flex-wrap:wrap; }
    .ft-links a { color:var(--muted); text-decoration:none; font-size:14px; transition:color .2s; }
    .ft-links a:hover { color:var(--gold); }
    .qr-badge { display:inline-flex; align-items:center; gap:12px; background:var(--panel); border:1px solid rgba(245,200,66,.2); border-radius:14px; padding:14px 24px; margin-bottom:32px; cursor:pointer; transition:all .2s; }
    .qr-badge:hover { border-color:var(--gold); transform:scale(1.02); }
    .qr-ico { width:40px;height:40px; background:var(--gold); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; }
    .ft-copy { font-size:13px; color:var(--muted); }

    @media(max-width:900px){
      .about-grid,.hw-grid,.feat-grid,.res-grid,.tm-grid{grid-template-columns:1fr!important}
      .res-big{grid-row:auto}
      .aw-grid{grid-template-columns:repeat(2,1fr)}
      .tm-grid{grid-template-columns:repeat(2,1fr)}
      .adv-card{flex-direction:column;text-align:center}
      .ai-flow{flex-direction:column}
      .ai-arrow{display:none!important}
      .stage-row{grid-template-columns:60px 1fr}
    }
    @media(max-width:600px){
      nav{padding:14px 20px}
      .nav-links{display:none}
      .si{padding:70px 20px}
      .feat-grid{grid-template-columns:1fr}
      .aw-grid{grid-template-columns:1fr}
      .tm-grid{grid-template-columns:repeat(2,1fr)}
      .ft-links{gap:16px}
    }
  `}</style>
);

const Stars = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: (Math.random() * 4 + 2).toFixed(1),
    delay: (Math.random() * 4).toFixed(1),
    op: (Math.random() * 0.5 + 0.2).toFixed(2),
  }));
  return (
    <div className="star-bg">
      {stars.map(s => (
        <div key={s.id} className="star"
          style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, '--dur':`${s.dur}s`, '--delay':`${s.delay}s`, '--op':s.op }} />
      ))}
    </div>
  );
};

const useReveal = () => {
  useEffect(() => {
    const ob = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => ob.observe(el));
    return () => ob.disconnect();
  }, []);
};

const PB = ({ label, pct }) => (
  <div className="pb-wrap">
    <div className="pb-lbl"><span>{label}</span><span>{pct}%</span></div>
    <div className="pb-track"><div className="pb-fill" style={{ width:`${pct}%` }} /></div>
  </div>
);

export default function App() {
  useReveal();
  return (
    <>
      <GlobalStyles />
      <Stars />

      {/* NAV */}
      <nav>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-star" />
          <span className="df" style={{ fontSize:18, fontWeight:700, color:'var(--white)' }}>星星像應</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">研究初衷</a></li>
          <li><a href="#stages">三階段訓練</a></li>
          <li><a href="#ai">AI 技術</a></li>
          <li><a href="#hardware">硬體輔具</a></li>
          <li><a href="#results">實測成效</a></li>
          <li><a href="#awards">競賽殊榮</a></li>
          <li><a href="#team">團隊</a></li>
        </ul>
        <button className="nav-cta" onClick={() => window.open('https://starlearning.duckdns.org:18361/', '_blank')}>
          進入系統 →
        </button>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-badge">⭐ 2025 靜宜大學人工智慧應用學系 · 畢業專題</div>
        <h1 className="hero-title df">
          星星像應<br />
          <span className="gold-text">讓 AI 讀懂情緒</span>
        </h1>
        <p className="hero-sub">
          為「星星的孩子」量身打造的互動式情緒辨識訓練系統。<br />
          結合 MediaPipe、FER 與 ESP8266 輔具，從圖片到社交情境循序漸進，
          幫助自閉症兒童建立情緒理解與社交適應能力。
        </p>
        <div className="hero-cards">
          {[
            { l:'指導老師', v:'許慈芳 教授' },
            { l:'系所', v:'人工智慧應用學系 四年級' },
            { l:'合作機構', v:'瑪利亞社會福利基金會' },
            { l:'系統連結', v:'starlearning.duckdns.org ↗', link:'https://starlearning.duckdns.org:18361/' },
          ].map((c, i) => (
            <div key={i} className="hero-card" onClick={c.link ? () => window.open(c.link, '_blank') : undefined}
              style={c.link ? { cursor: 'pointer' } : {}}>
              <div className="hero-card-label">{c.l}</div>
              <div className="hero-card-value" style={c.link ? { color: 'var(--sky)' } : {}}>{c.v}</div>
            </div>
          ))}
        </div>
        <div className="scroll-hint">
          <div className="scroll-mouse" />
          <span>向下滾動探索</span>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <div className="divider" />
        <div className="si">
          <div className="about-grid">
            <div className="reveal">
              <div className="sec-label">研究動機</div>
              <h2 className="sec-title df">星星孩子需要的<br />不只是傳統圖卡</h2>
              <p className="sec-desc" style={{ marginBottom:24 }}>
                根據衛福部統計，台灣自閉症人數從 2021 年的 1:44 上升至 2023 年的 1:36，登記患者達 20,251 人，且以輕度自閉症為主。
                自閉症兒童因杏仁核缺陷難以判讀表情與語氣，而現有工具多為靜態圖卡，缺乏互動與即時回饋。
              </p>
              <p className="sec-desc">
                我們在參訪惠明盲校與台中瑪利亞基金會，接觸到真實個案後，決心以 AI 科技填補這個缺口，
                打造符合孩童感官需求的數位學習環境。
              </p>
              <ul className="about-list">
                <li><span className="ic">🎯</span>降低教師備課負擔，AI 自動辨識情緒並標註題目答案</li>
                <li><span className="ic">💬</span>OpenAI 即時生成正向鼓勵語句，每題回饋各有不同</li>
                <li><span className="ic">🎮</span>ESP8266 實體按鈕 + 24 位 WS2812 LED 多感官整合設計</li>
                <li><span className="ic">📊</span>學習歷程可視化，雷達圖 × 折線圖追蹤六大情緒表現</li>
                <li><span className="ic">🔒</span>完整安全機制，HTTPS 加密 + 雜湊密碼 + Token 驗證</li>
              </ul>
            </div>
            <div className="reveal" style={{ transitionDelay:'.2s' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[
                  { n:'1:36', l:'台灣自閉症最新發生率（2023）' },
                  { n:'20,251', l:'台灣登記自閉症患者人數' },
                  { n:'三階段', l:'靜態圖片 → 動態影片 → 真實情境 漸進式關卡' },
                  { n:'6', l:'基本情緒類別（開心・難過・生氣・害怕・驚訝・厭惡）' },
                ].map((s, i) => (
                  <div key={i} className="stat-card" style={i === 2 ? { gridColumn:'1/-1' } : {}}>
                    <div className="stat-number" style={i === 2 ? { fontSize:36 } : {}}>{s.n}</div>
                    <div className="stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* FEATURES */}
      <section className="feat-section">
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>系統特色</div>
            <h2 className="sec-title df">六大核心亮點</h2>
            <p className="sec-desc" style={{ margin:'0 auto' }}>從學習設計到技術實作，每個細節都以孩童需求為核心出發</p>
          </div>
          <div className="feat-grid">
            {[
              { n:'01', ic:'🧩', bg:'rgba(245,200,66,.12)', bd:'rgba(245,200,66,.3)', t:'分階段學習設計', d:'情緒理解 → 情緒表達 → 社交互動，三個漸進關卡。使用者可依學習能力自由選擇任一階段，不強迫線性流程。' },
              { n:'02', ic:'🤖', bg:'rgba(77,208,225,.12)', bd:'rgba(77,208,225,.3)', t:'AI 自動標註題庫', d:'整合 MediaPipe 臉部偵測與 FER 情緒模型，上傳圖片即自動分類情緒、生成題幹選項，大幅節省人工建題成本。' },
              { n:'03', ic:'🌟', bg:'rgba(244,143,177,.12)', bd:'rgba(244,143,177,.3)', t:'AI 正向鼓勵回饋', d:'每次答題後 OpenAI API 即時生成專屬鼓勵語句，無論答對答錯都獲得溫暖引導，強化孩童學習動機。' },
              { n:'04', ic:'📈', bg:'rgba(100,181,246,.12)', bd:'rgba(100,181,246,.3)', t:'即時學習歷程分析', d:'雷達圖 × 折線圖 × 年度趨勢，家長與教師可清楚掌握孩童在各情緒/情境類別的表現，精準補強弱項。' },
              { n:'05', ic:'🎮', bg:'rgba(129,199,132,.12)', bd:'rgba(129,199,132,.3)', t:'多感官無障礙設計', d:'ESP8266 硬體按鈕 + WS2812 LED 環形燈光 + 語音朗讀（TTS），視覺・聽覺・觸覺三重刺激整合。' },
              { n:'06', ic:'🔧', bg:'rgba(255,183,77,.12)', bd:'rgba(255,183,77,.3)', t:'完整後台管理系統', d:'管理員查看全站統計・管理帳號題庫；家長自訂題庫針對弱項練習；Grafana 即時監控系統資源。' },
            ].map((f, i) => (
              <div key={i} className="feat-card reveal" style={{ transitionDelay:`${i*.1}s` }}>
                <span className="feat-num">{f.n}</span>
                <div className="feat-icon" style={{ background:f.bg, border:`1px solid ${f.bd}` }}>{f.ic}</div>
                <div className="feat-title">{f.t}</div>
                <div className="feat-desc">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE STAGES */}
      <section id="stages" className="stages-section">
        <div className="si">
          <div className="reveal">
            <div className="sec-label">學習路徑</div>
            <h2 className="sec-title df">三階段漸進式訓練</h2>
            <p className="sec-desc">從基礎表情辨識，到動態情緒觀察，再到生活情境應對，讓孩童循序建立完整的情緒理解能力。</p>
          </div>
          <div className="stages-wrap">
            {[
              {
                n:'一', tag:'第一關卡', tc:'#f5c842', tb:'rgba(245,200,66,.12)', ic:'🖼️',
                t:'靜態圖片情緒辨別',
                d:'呈現真人照片，讓孩童從單一靜止表情學習辨別六大基本情緒。搭配大型按鈕選項與語音提示，降低閱讀負擔，適合初學者建立情緒概念基礎。作答後即時亮燈回饋，顏色對應各情緒（如開心→黃、難過→藍）。',
                chips:['開心 😊','難過 😢','生氣 😠','害怕 😨','驚訝 😲','厭惡 🤢'],
              },
              {
                n:'二', tag:'第二關卡', tc:'#4dd0e1', tb:'rgba(77,208,225,.12)', ic:'🎬',
                t:'動態影片情緒理解',
                d:'導入 GIF 動態影像，訓練孩童觀察表情變化的過程與情緒的持續性，從「瞬間」走向「連續」。FER 模型自動抽樣最多 12 幀進行分析，信心值高於 0.85 提前終止以節省運算。',
                chips:['GIF 動態圖','多幀分析','表情變化觀察','情緒持續性','CropperJS 裁切'],
              },
              {
                n:'三', tag:'第三關卡', tc:'#f48fb1', tb:'rgba(244,143,177,.12)', ic:'🤝',
                t:'真實社交情境應用',
                d:'模擬日常生活中的社交場景（如分享玩具、遇到陌生人等），讓孩童選擇正確的互動回應方式，將情緒辨識能力遷移至實際生活，培養社會適應力。涵蓋 12 種情緒/情境類別。',
                chips:['社交規範','安全意識','禮貌表達','情緒管理','生活習慣','自我認知'],
              },
            ].map((s, i) => (
              <div key={i} className="stage-row reveal" style={{ transitionDelay:`${i*.15}s` }}>
                <div className="stage-nw">
                  <div className="stage-n">{s.n}</div>
                  {i < 2 && <div className="stage-line" />}
                </div>
                <div>
                  <span className="stage-tag" style={{ color:s.tc, background:s.tb }}>{s.ic} {s.tag}</span>
                  <div className="stage-title">{s.t}</div>
                  <div className="stage-desc">{s.d}</div>
                  <div className="stage-chips">{s.chips.map((c, j) => <span key={j} className="stage-chip">{c}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TECH */}
      <section id="ai" className="ai-section">
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>AI 技術核心</div>
            <h2 className="sec-title df">情緒辨識引擎流程</h2>
            <p className="sec-desc" style={{ margin:'0 auto' }}>多層次 AI 技術整合，從影像輸入到正向語言回饋一氣呵成</p>
          </div>
          <div className="ai-flow reveal">
            {[
              { ic:'📸', t:'影像輸入', d:'管理員或家長上傳靜態圖片、GIF 動圖。系統自動辨識格式，圖片存入 uploads/tmp/ 暫存。' },
              { ic:'👤', t:'MediaPipe 臉部偵測', d:'Google MediaPipe FaceDetection 即時偵測人臉，自動擴大 40% 邊界確保臉部完整清晰。' },
              { ic:'🧠', t:'FER 情緒分析', d:'CNN 模型辨識六大情緒分數。信心值高於 0.85 提前終止，GIF 最多抽樣 12 幀分析。' },
              { ic:'✏️', t:'修正 & 題目生成', d:'套用修正規則（如 fear/sad 接近時判斷為 sad），自動生成「童言風格」題幹，限 15 字以內。' },
              { ic:'🎉', t:'OpenAI 正向回饋', d:'答題後呼叫 OpenAI API 生成個性化鼓勵語句，連線失敗自動使用預設正向句。' },
            ].map((step, i) => (
              <div key={i} className="ai-step">
                <div className="ai-arrow">→</div>
                <div className="ai-icon">{step.ic}</div>
                <div className="ai-t">{step.t}</div>
                <div className="ai-d">{step.d}</div>
              </div>
            ))}
          </div>
          <div className="reveal">
            <div style={{ marginBottom:16, color:'var(--muted)', fontSize:14, fontWeight:600, textTransform:'uppercase', letterSpacing:'.1em' }}>使用技術棧</div>
            <div className="tech-pills">
              {['Python 3.10','Flask + Blueprint','MediaPipe FaceDetection','FER CNN 模型','OpenAI GPT API','MariaDB / MySQL','SQLAlchemy ORM','Gunicorn WSGI','Nginx 反向代理','Docker 容器化','Grafana 監控','Web Serial API','Chart.js','ESP8266','WS2812 LED','Web Speech API TTS','Flask-Mail','itsdangerous Token','ffmpeg 媒體處理'].map((t, i) => (
                <span key={i} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section id="hardware" className="hw-section">
        <div className="si">
          <div className="reveal">
            <div className="sec-label">硬體輔具</div>
            <h2 className="sec-title df">為兒童設計的互動裝置</h2>
            <p className="sec-desc">以 ESP8266 為核心，搭配雙大型按鈕與 24 位 WS2812 環形 LED，斜坡式外觀設計符合兒童操作人因。</p>
          </div>
          <div className="hw-grid">
            <div className="hw-device reveal">
              <div style={{ fontSize:18, fontWeight:700, color:'var(--gold)', textAlign:'center', marginBottom:4 }}>ESP8266 互動輔具</div>
              <div style={{ fontSize:13, color:'var(--muted)', textAlign:'center', marginBottom:8 }}>斜坡式外觀・符合兒童手掌操作</div>
              <div className="hw-btns">
                {[{ cls:'hw-a', em:'😊', lbl:'選項 A', c:'var(--gold)' }, { cls:'hw-b', em:'😢', lbl:'選項 B', c:'var(--rose)' }].map((b, i) => (
                  <div key={i} className="hw-bw">
                    <div className={`hw-btn ${b.cls}`}><div className="hw-ring" />{b.em}</div>
                    <div className="hw-lbl">{b.lbl}</div>
                    <div style={{ fontSize:12, color:b.c }}>情緒代表色</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'center', gap:32, marginTop:8 }}>
                <div style={{ textAlign:'center' }}><div style={{ fontSize:24, marginBottom:4 }}>💚</div><div style={{ fontSize:12, color:'var(--muted)' }}>答對亮綠燈</div></div>
                <div style={{ textAlign:'center' }}><div style={{ fontSize:24, marginBottom:4 }}>❤️</div><div style={{ fontSize:12, color:'var(--muted)' }}>答錯亮紅燈</div></div>
              </div>
              <div style={{ marginTop:24, padding:'14px 16px', background:'rgba(0,0,0,.2)', borderRadius:12, fontSize:13, color:'var(--muted)', textAlign:'left', fontFamily:'monospace' }}>
                <div style={{ color:'var(--teal)', fontWeight:600, marginBottom:6 }}>Web Serial API 通訊協定</div>
                題目指令: <span style={{ color:'var(--gold)' }}>Q,&lt;RID&gt;,&lt;A&gt;,&lt;B&gt;</span><br />
                裝置回傳: <span style={{ color:'var(--gold)' }}>ANS,&lt;RID&gt;,A|B</span><br />
                結果回饋: <span style={{ color:'var(--gold)' }}>R,&lt;RID&gt;,OK|NG</span>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay:'.2s' }}>
              <ul className="hw-feats">
                {[
                  { c:'#f5c842', t:'大型玩具按鈕', d:'雙按鈕設計符合兒童手掌大小，取代滑鼠觸控操作，大幅降低誤觸率，讓孩童以最直覺方式作答。' },
                  { c:'#4dd0e1', t:'24 位 WS2812 環形 LED', d:'每顆按鈕外圈配置環形燈光，顏色對應情緒（開心→黃、難過→藍、生氣→紅），建立顏色與情緒聯結記憶。' },
                  { c:'#f48fb1', t:'即時視覺與聽覺回饋', d:'答對亮綠燈、答錯亮紅燈，閃爍效果直觀呈現。搭配語音同步播報，確保孩童充分理解每次作答結果。' },
                  { c:'#81c784', t:'斜坡式人因設計', d:'外殼採斜坡結構，按鈕位於自然可視可觸位置，減少低頭或伸手的不適，提升長時間使用的舒適度。' },
                  { c:'#ffb74d', t:'斷線容錯機制', d:'即使輔具未連線或意外斷開，系統仍可正常完成答題流程，不影響學習進行，確保使用體驗流暢穩定。' },
                ].map((f, i) => (
                  <li key={i}>
                    <div className="hw-dot" style={{ background:f.c, boxShadow:`0 0 8px ${f.c}` }} />
                    <div><div className="hw-ft">{f.t}</div><div className="hw-fd">{f.d}</div></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="res-section">
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>實測成效</div>
            <h2 className="sec-title df">數據說話的進步</h2>
            <p className="sec-desc" style={{ margin:'0 auto' }}>與瑪利亞社會福利基金會合作，對學齡前 ASD 兒童進行三週以上實測，全程家長知情同意</p>
          </div>
          <div className="res-grid">
            <div className="res-big reveal">
              <div className="res-bnum">80.29%</div>
              <div className="res-blbl">ASD 孩童整體情緒辨識正確率</div>
              <PB label="圖片題正確率（後測）" pct={88} />
              <PB label="動圖題正確率（後測）" pct={82} />
              <PB label="情境題正確率（後測）" pct={79} />
              <div style={{ height:1, background:'rgba(255,255,255,.08)', margin:'20px 0' }} />
              <PB label="開心 😊" pct={92} />
              <PB label="生氣 😠" pct={85} />
              <PB label="難過 😢" pct={83} />
              <PB label="害怕 😨" pct={74} />
              <PB label="驚訝 😲" pct={71} />
              <PB label="厭惡 🤢" pct={70} />
            </div>
            <div className="res-sm reveal" style={{ transitionDelay:'.1s' }}>
              <div className="res-snum" style={{ color:'var(--gold)' }}>5 / 5 分</div>
              <div className="res-slbl">家長整體系統滿意度（滿分 5 分）</div>
              <div className="stars">
                {[.2,.4,.6,.8,1].map((d, i) => <span key={i} style={{ animationDelay:`${d}s` }}>⭐</span>)}
              </div>
            </div>
            <div className="res-sm reveal" style={{ transitionDelay:'.2s' }}>
              <div className="res-snum" style={{ color:'var(--teal)' }}>三種題型</div>
              <div className="res-slbl">圖片・動圖・情境 正確率皆有明顯提升</div>
              <div style={{ marginTop:12, fontSize:14, color:'var(--muted)', lineHeight:1.7 }}>
                一般兒童自起始即維持高正確率，顯示本系統對 ASD 孩童具有更顯著的學習促進效果。
              </div>
            </div>
            <div className="res-sm reveal" style={{ transitionDelay:'.3s', gridColumn:'2/-1' }}>
              <div style={{ marginBottom:16, fontSize:15, color:'var(--white)', fontWeight:600 }}>家長真實回饋摘要</div>
              {[
                '答對題數明顯增加，開始留意流淚、皺眉等具體表情線索',
                '語音加圖示的設計，增加孩童主動學習的意願與動機',
                '自訂題目功能讓家長可依孩童弱項（如害怕、驚訝）針對練習',
                '操作流暢，按鈕設計不造成額外困難，家長備課負擔大幅降低',
                '若孩童連續答錯挫折感上升時，建議可加入答對率高的安慰題',
              ].map((q, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, fontSize:14, color:'var(--muted)', alignItems:'flex-start' }}>
                  <span style={{ color:'var(--gold)', flexShrink:0 }}>✦</span><span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section style={{ background:`linear-gradient(180deg,var(--ink) 0%,var(--mid) 100%)` }}>
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>角色功能</div>
            <h2 className="sec-title df">完整的教育生態系</h2>
            <p className="sec-desc" style={{ margin:'0 auto 48px' }}>孩童、家長、教師、管理員，每個角色都有專屬的操作介面與功能模組</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
            {[
              { ic:'👦', c:'var(--gold)', t:'孩童端', items:['系統三大題型答題（圖片・動圖・情境）','Web Serial 連接硬體輔具作答','自訂關卡選擇與練習','即時語音朗讀 + AI 鼓勵回饋','學習歷程圖表自動統計'] },
              { ic:'👨‍👩‍👧', c:'var(--teal)', t:'家長端', items:['上傳圖片 AI 自動辨識建題','自訂題庫管理（新增・編輯・刪除）','設定系統使用時間限制與語速','查看孩童學習歷程與正確率','雷達圖掌握各情緒弱項'] },
              { ic:'👩‍🏫', c:'var(--rose)', t:'教師 / 教保員', items:['即時查看學生各回合答題表現','分析情緒辨別強弱項分佈','依數據調整個別化教學策略','跨情境追蹤長期學習趨勢'] },
              { ic:'🔧', c:'var(--sky)', t:'系統管理員', items:['數據總覽儀表板（KPI・週趨勢）','帳號管理（啟用・停用・刪除）','系統題庫建立（AI 辨識・ffmpeg 裁切）','查閱所有使用者答題紀錄','Grafana 系統資源即時監控'] },
            ].map((r, i) => (
              <div key={i} className="stat-card reveal" style={{ transitionDelay:`${i*.1}s` }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${r.c}20`, border:`1px solid ${r.c}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{r.ic}</div>
                  <div style={{ fontSize:18, fontWeight:700, color:r.c }}>{r.t}</div>
                </div>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                  {r.items.map((it, j) => (
                    <li key={j} style={{ display:'flex', gap:8, fontSize:14, color:'var(--muted)', alignItems:'flex-start' }}>
                      <span style={{ color:r.c, flexShrink:0 }}>·</span><span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section style={{ background:'var(--panel)' }}>
        <div className="si">
          <div className="reveal">
            <div className="sec-label">部署架構</div>
            <h2 className="sec-title df">企業級雲端部署</h2>
            <p className="sec-desc">穩定、安全、可擴充的生產環境，24 小時不間斷服務，CPU 使用率長期維持 0.3% 以下</p>
          </div>
          <div style={{ display:'flex', gap:24, marginTop:48, flexWrap:'wrap' }}>
            {[
              { ic:'🐳', t:'Docker 容器化', d:'dev / main 雙環境並行，互不干擾，可重現部署', c:'var(--sky)' },
              { ic:'⚡', t:'Nginx + Gunicorn', d:'TLS 終止・反向代理・靜態媒體快取', c:'var(--teal)' },
              { ic:'🔒', t:'HTTPS 安全傳輸', d:'duckdns 動態網域 + SSL 憑證，防止資料竄改', c:'var(--gold)' },
              { ic:'📊', t:'Grafana 即時監控', d:'CPU / 記憶體 / 磁碟 / 網路資源可視化儀表板', c:'var(--rose)' },
              { ic:'🗄️', t:'MariaDB 資料庫', d:'SQLAlchemy ORM・參數化查詢防 SQL Injection', c:'#81c784' },
              { ic:'🛡️', t:'多層安全防護', d:'bcrypt 密碼雜湊・OTP Token 驗證・帳號狀態管控', c:'#ffb74d' },
            ].map((d, i) => (
              <div key={i} className="reveal" style={{ flex:'1 1 240px', background:'var(--deep)', borderRadius:16, padding:24, border:`1px solid ${d.c}25`, transitionDelay:`${i*.08}s` }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{d.ic}</div>
                <div style={{ fontSize:15, fontWeight:700, color:d.c, marginBottom:6 }}>{d.t}</div>
                <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>{d.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="aw-section">
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>競賽殊榮</div>
            <h2 className="sec-title df">獲獎紀錄</h2>
            <p className="sec-desc" style={{ margin:'0 auto' }}>在多項競賽中展示研究成果，獲得評審肯定</p>
          </div>
          <div className="aw-grid">
            {[
              { tr:'🥇', c:'#f5c842', title:'特殊教育科技應用類', name:'最佳創新應用獎', ev:'靜宜大學人工智慧應用學系 年度畢業成果展' },
              { tr:'🏆', c:'#4dd0e1', title:'數位輔具整合組', name:'系統整合優秀獎', ev:'大學部跨系專題競賽' },
              { tr:'🎖️', c:'#f48fb1', title:'公益與社會影響力類', name:'社會影響力入圍獎', ev: 'AI 解題松黑客松競賽' },
            ].map((a, i) => (
              <div key={i} className="aw-card reveal" style={{ transitionDelay:`${i*.15}s` }}>
                <span className="aw-trophy">{a.tr}</span>
                <div className="aw-title" style={{ color:a.c }}>{a.title}</div>
                <div className="aw-name">{a.name}</div>
                <div className="aw-event">{a.ev}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="tm-section">
        <div className="si">
          <div className="reveal" style={{ textAlign:'center', maxWidth:600, margin:'0 auto' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}>團隊介紹</div>
            <h2 className="sec-title df">打造星星像應的人</h2>
            <p className="sec-desc" style={{ margin:'0 auto' }}>靜宜大學人工智慧應用學系 · 人工智慧四 A · 2025 屆畢業生</p>
          </div>
          <div style={{ marginTop:60 }}>
            <div className="adv-card reveal">
              <div className="adv-av">👩‍🏫</div>
              <div>
                <div className="adv-t">指導老師</div>
                <div className="adv-n">許慈芳 教授</div>
                <div className="adv-d">靜宜大學 人工智慧應用學系</div>
              </div>
            </div>
            <div className="tm-grid"w>
              {[
                { name:'林沛瑩', id:'411148433', em:'🌸', role:'系統整合與部署 & AI辨識模組' },
                { name:'林家儀', id:'411148475', em:'🌺', role:'後端登入模組 & 資料庫設計' },
                { name:'黃乙珊', id:'411148522', em:'🌻', role:'後端答題模組 & 學習歷程' },
                { name:'余秀槿', id:'411134696', em:'🌹', role:'出題算法設計 & 硬體輔具' },
              ].map((m, i) => (
                <div key={i} className="tm-card reveal" style={{ transitionDelay:`${i*.1}s` }}>
                  <div className="tm-av">{m.em}</div>
                  <div className="tm-name">{m.name}</div>
                  <div className="tm-id">{m.id}</div>
                  <div className="tm-role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="ft-logo">
          <div className="ft-star" />
          <div className="df" style={{ fontSize:20, fontWeight:700, color:'var(--white)' }}>星星像應</div>
        </div>
        <ul className="ft-links">
          {[['#about','研究初衷'],['#stages','訓練關卡'],['#ai','AI 技術'],['#hardware','硬體輔具'],['#results','實測成效'],['#awards','競賽殊榮'],['#team','團隊']].map(([href,label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="qr-badge" onClick={() => window.open('https://starlearning.duckdns.org:18361/', '_blank')}>
          <div className="qr-ico">🔗</div>
          <div>
            <div style={{ fontSize:11, color:'var(--muted)', marginBottom:2 }}>立即體驗系統</div>
            <div style={{ fontSize:14, color:'var(--sky)', fontWeight:500 }}>starlearning.duckdns.org:18361</div>
          </div>
        </div>
        <div className="ft-copy">
          © 2025 星星像應專題團隊 · 靜宜大學人工智慧應用學系<br />
          <span style={{ opacity:.5 }}>指導老師：許慈芳教授 · 合作機構：瑪利亞社會福利基金會</span>
        </div>
      </footer>
    </>
  );
}