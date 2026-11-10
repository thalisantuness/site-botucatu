import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  ArrowRight,
  Camera,
  Lightbulb,
  Scissors,
  Eye,
  Play,
  Pause,
  CheckCircle2,
  Heart,
  Sprout,
  Users,
  Ruler,
  Droplets,
  Sparkles,
  Target,
  X,
  Menu,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import PagesView from './PagesView.jsx';
import { SPECIES_DATA, SCHOOL_TREES_HONORIO } from './siteData.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState('ipe-aurora');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    atividades: true,
    arborizacao: true,
    honorio: true,
    sobre: true,
    especies: true
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const audioCtxRef = useRef(null);
  const noteIntervalRef = useRef(null);

  const navigateTo = (slug) => {
    setCurrentPage(slug);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenuGroup = (key) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const photos = [
    {
      id: 1,
      title: 'Plantio',
      date: '21/03/2024',
      src: '/images/plantio.jpg',
      alt: 'Crianças plantando a muda do Ipê-Amarelo Aurora',
      style: {}
    },
    {
      id: 2,
      title: '1º mês',
      date: '21/04/2024',
      src: '/images/crescimento-verde.jpg',
      alt: 'Ipê-Amarelo Aurora com 1 mês',
      style: { transform: 'scale(1.08)', filter: 'brightness(1.03)' }
    },
    {
      id: 3,
      title: '6 meses',
      date: '21/09/2024',
      src: '/images/crescimento-verde.jpg',
      alt: 'Ipê-Amarelo Aurora com 6 meses',
      style: {}
    },
    {
      id: 4,
      title: '1 ano',
      date: '21/03/2025',
      src: '/images/ipe-florido.jpg',
      alt: 'Ipê-Amarelo Aurora florido após 1 ano',
      style: {}
    }
  ];

  const timelineSteps = [
    {
      id: 1,
      label: 'Plantio',
      date: '21/03/2024',
      icon: 'sprout'
    },
    {
      id: 2,
      label: 'Primeiras folhas',
      date: '10/04/2024',
      icon: 'leaf'
    },
    {
      id: 3,
      label: 'Primeira poda',
      date: '15/08/2024',
      icon: 'scissors'
    },
    {
      id: 4,
      label: 'Primeiros pássaros',
      date: '02/01/2025',
      icon: 'bird'
    },
    {
      id: 5,
      label: 'Primeiras flores',
      date: '18/08/2025',
      icon: 'flower'
    }
  ];

  const playGentleNote = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      playGentleNote();
      noteIntervalRef.current = setInterval(playGentleNote, 550);
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 45) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    }
    return () => {
      if (timer) clearInterval(timer);
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    };
  }, [isPlaying]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const renderTimelineIcon = (type) => {
    switch (type) {
      case 'sprout':
        return (
          <svg viewBox="0 0 40 40" className="timeline-svg-icon">
            <path d="M20 32 V18" stroke="#4a6b28" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 22 C13 22 10 16 10 12 C15 12 20 15 20 22 Z" fill="#6b933c" stroke="#4a6b28" strokeWidth="1.5" />
            <path d="M20 19 C26 19 30 14 30 10 C24 10 20 13 20 19 Z" fill="#82ad4c" stroke="#4a6b28" strokeWidth="1.5" />
            <path d="M13 32 H27" stroke="#6b533b" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'leaf':
        return (
          <svg viewBox="0 0 40 40" className="timeline-svg-icon">
            <path
              d="M12 28 C12 16 20 10 29 10 C29 20 24 28 12 28 Z"
              fill="#6a9938"
              stroke="#3f611d"
              strokeWidth="1.8"
            />
            <path d="M10 30 L25 15" stroke="#3f611d" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'scissors':
        return (
          <svg viewBox="0 0 40 40" className="timeline-svg-icon">
            <circle cx="14" cy="27" r="4" fill="none" stroke="#8c5a2b" strokeWidth="2.2" />
            <circle cx="26" cy="27" r="4" fill="none" stroke="#8c5a2b" strokeWidth="2.2" />
            <path d="M17 24 L27 11" stroke="#6e706e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M23 24 L13 11" stroke="#8c8f8c" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'bird':
        return (
          <svg viewBox="0 0 40 40" className="timeline-svg-icon">
            <path
              d="M11 25 C14 17 20 13 26 14 C28 14 29 16 28 19 C26 24 19 26 11 25 Z"
              fill="#5d8a32"
              stroke="#3a591c"
              strokeWidth="1.6"
            />
            <path d="M28 16 L32 15 L29 18 Z" fill="#d99b26" />
            <circle cx="26" cy="16" r="1.2" fill="#222" />
            <path d="M19 25 L17 30 M23 25 L22 30" stroke="#734f2c" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'flower':
        return (
          <svg viewBox="0 0 40 40" className="timeline-svg-icon">
            <g transform="translate(20,20)">
              <circle cx="0" cy="-7" r="4.5" fill="#f7c931" stroke="#b38312" strokeWidth="1.2" />
              <circle cx="6.5" cy="-2" r="4.5" fill="#f7c931" stroke="#b38312" strokeWidth="1.2" />
              <circle cx="4" cy="6" r="4.5" fill="#f7c931" stroke="#b38312" strokeWidth="1.2" />
              <circle cx="-4" cy="6" r="4.5" fill="#f7c931" stroke="#b38312" strokeWidth="1.2" />
              <circle cx="-6.5" cy="-2" r="4.5" fill="#f7c931" stroke="#b38312" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="3.2" fill="#e08b1b" />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      {sidebarOpen && (
        <div className="drawer-backdrop" onClick={() => setSidebarOpen(false)}>
          <aside className="green-sitemap-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-bar">
              <strong>Menu do Instituto Botucatu</strong>
              <button className="drawer-close-btn" onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <ul className="drawer-menu-list">
              <li>
                <button
                  className={`drawer-link ${currentPage === 'ipe-aurora' ? 'active' : ''}`}
                  onClick={() => navigateTo('ipe-aurora')}
                >
                  ⭐ Ipê-Amarelo Aurora (1ª Página)
                </button>
              </li>
              <li>
                <button
                  className={`drawer-link ${currentPage === 'página-inicial' ? 'active' : ''}`}
                  onClick={() => navigateTo('página-inicial')}
                >
                  Página inicial
                </button>
              </li>
              <li>
                <button
                  className={`drawer-link ${currentPage === 'acessibilidade' ? 'active' : ''}`}
                  onClick={() => navigateTo('acessibilidade')}
                >
                  Acessibilidade
                </button>
              </li>
              <li>
                <button
                  className={`drawer-link ${currentPage === 'diálogos' ? 'active' : ''}`}
                  onClick={() => navigateTo('diálogos')}
                >
                  Diálogos (Vídeos YouTube)
                </button>
              </li>

              <li className="drawer-group">
                <div className="drawer-group-row">
                  <button className="drawer-chevron-btn" onClick={() => toggleMenuGroup('atividades')}>
                    {expandedMenus.atividades ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <button
                    className={`drawer-link ${currentPage === 'atividades' ? 'active' : ''}`}
                    onClick={() => navigateTo('atividades')}
                  >
                    Atividades
                  </button>
                </div>

                {expandedMenus.atividades && (
                  <ul className="drawer-sub-list">
                    <li className="drawer-group">
                      <div className="drawer-group-row">
                        <button className="drawer-chevron-btn" onClick={() => toggleMenuGroup('arborizacao')}>
                          {expandedMenus.arborizacao ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                        </button>
                        <button
                          className={`drawer-link ${
                            currentPage === 'atividades/projeto-arborização-escolar' ? 'active' : ''
                          }`}
                          onClick={() => navigateTo('atividades/projeto-arborização-escolar')}
                        >
                          Projeto Arborização Escolar
                        </button>
                      </div>

                      {expandedMenus.arborizacao && (
                        <ul className="drawer-sub-list">
                          <li>
                            <div className="drawer-group-row">
                              <button className="drawer-chevron-btn" onClick={() => toggleMenuGroup('honorio')}>
                                {expandedMenus.honorio ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </button>
                              <button
                                className={`drawer-link ${
                                  currentPage ===
                                  'atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes'
                                    ? 'active'
                                    : ''
                                }`}
                                onClick={() =>
                                  navigateTo('atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes')
                                }
                              >
                                E.M.E.B. Honório Lemes
                              </button>
                            </div>
                            {expandedMenus.honorio && (
                              <ul className="drawer-sub-list">
                                {SCHOOL_TREES_HONORIO.map((t) => (
                                  <li key={t.id}>
                                    <button
                                      className={`drawer-link ${currentPage === t.slug ? 'active' : ''}`}
                                      onClick={() => navigateTo(t.slug)}
                                    >
                                      {t.shortName}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                          <li>
                            <button
                              className={`drawer-link ${
                                currentPage ===
                                'atividades/projeto-arborização-escolar/e-m-e-i-arnaldo-da-costa-paz'
                                  ? 'active'
                                  : ''
                              }`}
                              onClick={() =>
                                navigateTo(
                                  'atividades/projeto-arborização-escolar/e-m-e-i-arnaldo-da-costa-paz'
                                )
                              }
                            >
                              E.M.E.I. Arnaldo da Costa Paz
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <button
                        className={`drawer-link ${currentPage === 'atividades/cinebotucatu' ? 'active' : ''}`}
                        onClick={() => navigateTo('atividades/cinebotucatu')}
                      >
                        CineBotucatu
                      </button>
                    </li>
                    <li>
                      <button
                        className={`drawer-link ${currentPage === 'atividades/flor-de-tuna' ? 'active' : ''}`}
                        onClick={() => navigateTo('atividades/flor-de-tuna')}
                      >
                        Flor de Tuna
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li className="drawer-group">
                <div className="drawer-group-row">
                  <button className="drawer-chevron-btn" onClick={() => toggleMenuGroup('sobre')}>
                    {expandedMenus.sobre ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <button
                    className={`drawer-link ${currentPage === 'sobre-nós' ? 'active' : ''}`}
                    onClick={() => navigateTo('sobre-nós')}
                  >
                    Sobre Nós
                  </button>
                </div>
                {expandedMenus.sobre && (
                  <ul className="drawer-sub-list">
                    <li>
                      <button
                        className={`drawer-link ${currentPage === 'sobre-nós/equipe' ? 'active' : ''}`}
                        onClick={() => navigateTo('sobre-nós/equipe')}
                      >
                        Equipe
                      </button>
                    </li>
                    <li>
                      <button
                        className={`drawer-link ${currentPage === 'sobre-nós/ins-botucatuajuda' ? 'active' : ''}`}
                        onClick={() => navigateTo('sobre-nós/ins-botucatuajuda')}
                      >
                        Ajuda
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li className="drawer-group">
                <div className="drawer-group-row">
                  <button className="drawer-chevron-btn" onClick={() => toggleMenuGroup('especies')}>
                    {expandedMenus.especies ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <button
                    className={`drawer-link ${currentPage === 'espécies-arbóreas' ? 'active' : ''}`}
                    onClick={() => navigateTo('espécies-arbóreas')}
                  >
                    Espécies Arbóreas (27)
                  </button>
                </div>
                {expandedMenus.especies && (
                  <ul className="drawer-sub-list">
                    {SPECIES_DATA.map((sp) => (
                      <li key={sp.id}>
                        <button
                          className={`drawer-link ${currentPage === sp.slug ? 'active' : ''}`}
                          onClick={() => navigateTo(sp.slug)}
                        >
                          {sp.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </aside>
        </div>
      )}

      <div className="scrapbook-canvas">
        <svg className="corner-leaf top-left-leaf" viewBox="0 0 120 120">
          <path d="M0 0 Q50 20 80 70 Q40 60 0 0 Z" fill="#6b8e3d" opacity="0.35" />
          <path d="M0 20 Q40 40 55 85 Q20 65 0 20 Z" fill="#4b6b26" opacity="0.45" />
        </svg>
        <svg className="corner-leaf top-right-leaf" viewBox="0 0 120 120">
          <path d="M120 0 Q70 20 40 70 Q80 60 120 0 Z" fill="#6b8e3d" opacity="0.35" />
          <path d="M120 25 Q80 45 65 90 Q100 70 120 25 Z" fill="#4b6b26" opacity="0.45" />
        </svg>

        <header className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="btn-open-drawer"
              onClick={() => setSidebarOpen(true)}
              title="Abrir menu com todas as 46 páginas"
            >
              <Menu size={20} />
              <span>Todas as Páginas</span>
            </button>

            <a
              href="#top"
              className="brand-logo-link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('ipe-aurora');
              }}
            >
              <img
                src="/images/logo.jpg"
                alt="Instituto Botucatu - conectar, educar, transformar"
                className="brand-logo-img"
              />
            </a>
          </div>

          <nav className="nav-links">
            <a
              href="#ipe-aurora"
              className={currentPage === 'ipe-aurora' ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('ipe-aurora');
              }}
            >
              Ipê-Amarelo Aurora
            </a>
            <a
              href="#pagina-inicial"
              className={currentPage === 'página-inicial' ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('página-inicial');
              }}
            >
              Página Inicial
            </a>
            <a
              href="#dialogos"
              className={currentPage === 'diálogos' ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('diálogos');
              }}
            >
              Diálogos
            </a>
            <a
              href="#escolas"
              className={currentPage.startsWith('atividades') ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('atividades/projeto-arborização-escolar');
              }}
            >
              Arborização Escolar
            </a>
            <a
              href="#especies"
              className={currentPage.startsWith('espécies-arbóreas') ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('espécies-arbóreas');
              }}
            >
              Espécies Arbóreas
            </a>
            <a
              href="#sobre"
              className={currentPage.startsWith('sobre-nós') ? 'nav-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('sobre-nós');
              }}
            >
              Sobre Nós
            </a>
          </nav>

          <button className="btn-back-map" onClick={() => setShowMapModal(true)}>
            <MapPin size={16} strokeWidth={2.5} />
            <span>Voltar ao mapa</span>
          </button>
        </header>

        {currentPage === 'ipe-aurora' ? (
          <div className="content-columns">
            <aside className="left-column">
              <div className="main-polaroid-wrapper">
                <svg className="paperclip-svg" viewBox="0 0 36 80">
                  <path
                    d="M18 12 V58 C18 66 10 66 10 58 V8 C10 2 24 2 24 8 V54 C24 60 14 60 14 54 V16"
                    fill="none"
                    stroke="#7b7d7b"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="masking-tape tape-polaroid-top"></div>

                <div
                  className="main-polaroid-card"
                  onClick={() =>
                    setSelectedPhoto({
                      title: 'Ipê-Amarelo Aurora',
                      date: 'Rua das Orquídeas, 125 - Botucatu/SP',
                      src: '/images/ipe-florido.jpg'
                    })
                  }
                >
                  <div className="main-polaroid-img-box">
                    <img
                      src="/images/ipe-florido.jpg"
                      alt="Ipê-Amarelo Aurora florido"
                      className="main-polaroid-img"
                    />
                  </div>
                </div>
              </div>

              <div className="location-note-card">
                <div className="masking-tape tape-location"></div>
                <svg className="side-twig-svg" viewBox="0 0 60 100">
                  <path d="M45 95 Q30 55 15 10" stroke="#4a5d29" strokeWidth="2.5" fill="none" />
                  <ellipse cx="20" cy="30" rx="10" ry="5" transform="rotate(-30 20 30)" fill="#6a7f3f" />
                  <ellipse cx="32" cy="45" rx="10" ry="5" transform="rotate(25 32 45)" fill="#849956" />
                  <ellipse cx="24" cy="62" rx="10" ry="5" transform="rotate(-25 24 62)" fill="#556b2f" />
                  <ellipse cx="38" cy="72" rx="9" ry="4.5" transform="rotate(30 38 72)" fill="#6a7f3f" />
                </svg>

                <div className="location-header">
                  <MapPin size={18} className="location-pin-icon" />
                  <h3>Localização</h3>
                </div>
                <p className="location-address">
                  Rua das Orquídeas, 125<br />
                  Jardim Paraíso<br />
                  Botucatu – SP
                </p>
                <button className="link-ver-mapa" onClick={() => setShowMapModal(true)}>
                  <span>Ver no mapa</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="specs-paper-wrapper">
                <div className="specs-paper-card">
                  <ul className="specs-list">
                    <li>
                      <div className="spec-icon">
                        <Sprout size={20} />
                      </div>
                      <div className="spec-text">
                        <strong>Espécie</strong>
                        <span className="italic-scientific">Handroanthus chrysotrichus</span>
                      </div>
                    </li>
                    <li>
                      <div className="spec-icon">
                        <Calendar size={20} />
                      </div>
                      <div className="spec-text">
                        <strong>Data do plantio</strong>
                        <span>21 de março de 2024</span>
                      </div>
                    </li>
                    <li>
                      <div className="spec-icon">
                        <Ruler size={20} />
                      </div>
                      <div className="spec-text">
                        <strong>Altura atual</strong>
                        <span>2,30 m</span>
                      </div>
                    </li>
                    <li>
                      <div className="spec-icon">
                        <Users size={20} />
                      </div>
                      <div className="spec-text">
                        <strong>Responsáveis</strong>
                        <span>
                          Grupo Girassol<br />
                          <small>(crianças de 6 a 8 anos)</small>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="curiosities-card">
                <div className="masking-tape tape-curiosities"></div>
                <div className="curiosities-header">
                  <h3>Curiosidades</h3>
                  <div className="lightbulb-doodle">
                    <Lightbulb size={24} strokeWidth={1.8} />
                  </div>
                </div>
                <p className="curiosities-highlight">
                  O ipê-amarelo é a árvore símbolo do Brasil!
                </p>
                <p className="curiosities-body">
                  Suas flores atraem abelhas e beija-flores e anunciam a chegada de uma nova estação cheia de cor.
                </p>
                <svg className="bee-doodle-svg" viewBox="0 0 50 50">
                  <ellipse cx="26" cy="28" rx="10" ry="7" fill="#f3c130" stroke="#3b2f1e" strokeWidth="1.8" transform="rotate(-15 26 28)" />
                  <path d="M22 22 L24 34 M27 21 L29 33" stroke="#3b2f1e" strokeWidth="2.2" />
                  <ellipse cx="23" cy="19" rx="5" ry="7" fill="#fffdf7" stroke="#3b2f1e" strokeWidth="1.4" transform="rotate(-25 23 19)" />
                  <ellipse cx="29" cy="19" rx="4.5" ry="6.5" fill="#fffdf7" stroke="#3b2f1e" strokeWidth="1.4" transform="rotate(15 29 19)" />
                  <path d="M16 30 L12 31" stroke="#3b2f1e" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </aside>

            <main className="right-column">
              <div className="main-scrapbook-sheet">
                <div className="hero-top-grid" id="historia">
                  <div className="tree-intro-col">
                    <div className="our-tree-tag">
                      <span>Nossa Árvore</span>
                      <Sprout size={14} />
                    </div>

                    <div className="tree-title-row">
                      <h1 className="tree-main-title">Ipê-Amarelo Aurora</h1>
                      <svg className="title-flower-svg" viewBox="0 0 60 60">
                        <g transform="translate(30,28)">
                          <circle cx="0" cy="-12" r="8" fill="#f7c82a" stroke="#785813" strokeWidth="1.6" />
                          <circle cx="11" cy="-4" r="8" fill="#f7c82a" stroke="#785813" strokeWidth="1.6" />
                          <circle cx="7" cy="10" r="8" fill="#f7c82a" stroke="#785813" strokeWidth="1.6" />
                          <circle cx="-7" cy="10" r="8" fill="#f7c82a" stroke="#785813" strokeWidth="1.6" />
                          <circle cx="-11" cy="-4" r="8" fill="#f7c82a" stroke="#785813" strokeWidth="1.6" />
                          <circle cx="0" cy="0" r="5" fill="#df8b17" stroke="#785813" strokeWidth="1.4" />
                          <path d="M-2 18 Q-5 25 -9 28" stroke="#5b7831" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                        </g>
                      </svg>
                    </div>

                    <div className="named-by-row">
                      <span>Nome dado pelas crianças do</span>
                      <span className="girassol-badge">Grupo Girassol</span>
                      <svg className="doodle-heart-svg" viewBox="0 0 40 40">
                        <path
                          d="M20 30 C10 22 6 14 11 9 C15 6 19 10 20 13 C21 10 25 6 29 9 C34 14 30 22 20 30 Z"
                          fill="none"
                          stroke="#6c7a52"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    <div className="history-card">
                      <div className="history-ribbon">História</div>
                      <div className="history-inner-border">
                        <p>
                          O Ipê-Amarelo Aurora foi plantado em um dia especial de outono. As crianças escolheram este nome
                          porque queriam que ele trouxesse luz, alegria e muitas flores para o nosso bairro. Desde então,
                          acompanhamos cada mudança, cada folha nova e cada visitante que aparece por aqui.
                        </p>
                        <svg className="history-sprig-svg" viewBox="0 0 60 40">
                          <path d="M10 32 Q30 22 50 8" stroke="#6d8049" strokeWidth="1.8" fill="none" />
                          <ellipse cx="25" cy="20" rx="6" ry="3" transform="rotate(-35 25 20)" fill="none" stroke="#6d8049" strokeWidth="1.5" />
                          <ellipse cx="36" cy="22" rx="6" ry="3" transform="rotate(20 36 22)" fill="none" stroke="#6d8049" strokeWidth="1.5" />
                          <ellipse cx="40" cy="11" rx="6" ry="3" transform="rotate(-30 40 11)" fill="none" stroke="#6d8049" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="kids-notebook-card">
                    <div className="masking-tape tape-notebook"></div>
                    <div className="notebook-spiral">
                      {Array.from({ length: 13 }).map((_, idx) => (
                        <span key={idx} className="spiral-ring" />
                      ))}
                    </div>

                    <div className="notebook-content">
                      <h3 className="notebook-title">Mensagem das crianças</h3>
                      <blockquote className="kids-handwritten-quote">
                        “Queremos que o Aurora fique bem grande e dê muita sombra para as pessoas descansarem aqui.
                        Vamos cuidar dele por muitos e muitos anos!”
                        <span className="quote-heart">♡</span>
                      </blockquote>
                      <p className="kids-signature">– Grupo Girassol</p>

                      <div className="kids-drawing-wrapper">
                        <img
                          src="/images/desenho-criancas.jpg"
                          alt="Desenho feito pelas crianças do Grupo Girassol"
                          className="kids-drawing-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <section className="photos-section" id="fotos">
                  <div className="section-title-bar">
                    <h2>Fotos</h2>
                    <Sprout size={18} className="title-deco-icon" />
                    <Camera size={19} className="title-deco-icon" />
                  </div>

                  <div className="polaroids-grid">
                    {photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className={`mini-polaroid polaroid-tilt-${index}`}
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <div className="masking-tape tape-mini-polaroid"></div>
                        <div className="mini-polaroid-img-container">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            style={photo.style}
                            className="mini-polaroid-img"
                          />
                        </div>
                        <div className="mini-polaroid-caption">
                          <strong>{photo.title}</strong>
                          <span>{photo.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="timeline-card">
                  <div className="timeline-header">
                    <h2>Crescimento da nossa árvore</h2>
                    <Sprout size={20} className="timeline-leaf-icon" />
                  </div>

                  <div className="timeline-track-wrapper">
                    <div className="timeline-connecting-line"></div>
                    <div className="timeline-steps">
                      {timelineSteps.map((step) => (
                        <div key={step.id} className="timeline-step-item">
                          <div className="timeline-circle">
                            {renderTimelineIcon(step.icon)}
                          </div>
                          <strong className="timeline-step-label">{step.label}</strong>
                          <span className="timeline-step-date">{step.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className="bottom-widgets-grid" id="cuidados">
                <div className="care-paper-card">
                  <div className="care-tape-header">Cuidados</div>

                  <ul className="care-items-list">
                    <li>
                      <div className="care-icon-badge">
                        <Droplets size={18} />
                      </div>
                      <div>
                        <strong>Regas semanais</strong>
                        <p>Mantemos a terra úmida, principalmente no verão.</p>
                      </div>
                    </li>
                    <li>
                      <div className="care-icon-badge">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <strong>Adubação</strong>
                        <p>Usamos adubo orgânico a cada 3 meses.</p>
                      </div>
                    </li>
                    <li>
                      <div className="care-icon-badge">
                        <Scissors size={18} />
                      </div>
                      <div>
                        <strong>Poda de formação</strong>
                        <p>Feita com cuidado para ajudar no crescimento saudável.</p>
                      </div>
                    </li>
                    <li>
                      <div className="care-icon-badge">
                        <Eye size={18} />
                      </div>
                      <div>
                        <strong>Observação</strong>
                        <p>Sempre observamos se há pragas ou doenças.</p>
                      </div>
                    </li>
                  </ul>

                  <div className="care-love-banner">
                    <span>Cuidar é acompanhar o crescimento com amor!</span>
                    <Heart size={16} className="care-heart-icon" />
                  </div>
                </div>

                <div className="audio-and-goals-stack" id="metas">
                  <div className="audio-green-card">
                    <div className="masking-tape tape-audio"></div>
                    <div className="audio-card-top">
                      <div>
                        <h3>Ouça as crianças</h3>
                        <p>Elas falaram sobre o Aurora com muito carinho!</p>
                      </div>
                      <svg className="audio-leaf-doodle" viewBox="0 0 60 40">
                        <path
                          d="M10 30 C20 12 40 10 52 12 C45 26 28 32 10 30 Z"
                          fill="none"
                          stroke="#384d1b"
                          strokeWidth="1.8"
                        />
                        <path d="M8 32 L46 15" stroke="#384d1b" strokeWidth="1.6" />
                      </svg>
                    </div>

                    <div className="audio-player-pill">
                      <button
                        className="btn-play-audio"
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? 'Pausar áudio' : 'Tocar áudio'}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
                      </button>

                      <div className="waveform-bars">
                        {[12, 22, 16, 28, 18, 10, 24, 30, 15, 22, 26, 14, 20, 28, 16, 12, 24, 18].map(
                          (height, idx) => {
                            const active = (idx / 18) * 45 <= audioProgress;
                            return (
                              <span
                                key={idx}
                                className={`wave-bar ${isPlaying ? 'wave-animating' : ''} ${
                                  active ? 'wave-active' : ''
                                }`}
                                style={{
                                  height: `${height}px`,
                                  animationDelay: `${idx * 0.07}s`
                                }}
                              />
                            );
                          }
                        )}
                      </div>

                      <span className="audio-time-label">
                        {formatTime(audioProgress)} / 0:45
                      </span>
                    </div>

                    <button
                      className="btn-more-audios"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      Ouvir mais áudios
                    </button>
                  </div>

                  <div className="goals-paper-card">
                    <div className="goals-header">
                      <h3>Metas do grupo</h3>
                      <Target size={24} className="target-doodle-icon" />
                    </div>

                    <ul className="goals-checklist">
                      <li>
                        <CheckCircle2 size={20} className="goal-check-icon" />
                        <span>Queremos que ele dê muita sombra para as pessoas descansarem.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={20} className="goal-check-icon" />
                        <span>Vamos acompanhar o Aurora por 5 anos!</span>
                      </li>
                      <li>
                        <CheckCircle2 size={20} className="goal-check-icon" />
                        <span>Plantar mais árvores juntos!</span>
                      </li>
                    </ul>

                    <svg className="hands-sprout-svg" viewBox="0 0 90 80">
                      <path d="M45 48 V22" stroke="#4a6b28" strokeWidth="2.8" strokeLinecap="round" />
                      <path
                        d="M45 30 C33 30 28 20 28 14 C37 14 45 20 45 30 Z"
                        fill="#6c963b"
                        stroke="#3c591b"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M45 25 C57 25 62 15 62 10 C53 10 45 16 45 25 Z"
                        fill="#85b04f"
                        stroke="#3c591b"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M28 54 C34 45 56 45 62 54 Z"
                        fill="#63472b"
                        stroke="#3b2816"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M16 56 C24 66 36 68 45 66 C54 68 66 66 74 56 C68 51 60 53 45 55 C30 53 22 51 16 56 Z"
                        fill="#e5bda0"
                        stroke="#59402b"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <PagesView
            currentPage={currentPage}
            onNavigate={navigateTo}
            onSelectPhoto={setSelectedPhoto}
          />
        )}

        <footer className="scrapbook-footer">
          <p>
            Cuidar hoje, florescer amanhã. <span className="footer-heart">♡</span>
          </p>
        </footer>
      </div>

      {selectedPhoto && (
        <div className="modal-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-polaroid" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPhoto(null)}>
              <X size={20} />
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} className="modal-large-img" />
            <div className="modal-caption">
              <h3>{selectedPhoto.title}</h3>
              <span>{selectedPhoto.date}</span>
            </div>
          </div>
        </div>
      )}

      {showMapModal && (
        <div className="modal-backdrop" onClick={() => setShowMapModal(false)}>
          <div className="modal-map-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowMapModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-map-header">
              <MapPin size={22} />
              <h3>Localização do Ipê-Amarelo Aurora</h3>
            </div>
            <p className="modal-map-address">
              <strong>Endereço:</strong> Rua das Orquídeas, 125 – Jardim Paraíso, Botucatu – SP
            </p>
            <div className="modal-map-preview">
              <img src="/images/ipe-florido.jpg" alt="Localização da árvore" />
              <div className="map-pin-overlay">
                <MapPin size={28} />
                <span>Ipê-Amarelo Aurora</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
