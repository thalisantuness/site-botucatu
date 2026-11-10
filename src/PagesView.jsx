import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Camera,
  Lightbulb,
  Heart,
  Sprout,
  Users,
  Ruler,
  Sparkles,
  Target,
  ExternalLink,
  Youtube,
  Instagram,
  Mail,
  BookOpen,
  School,
  Film,
  HelpCircle,
  CheckCircle2,
  Eye,
  Volume2,
  ZoomIn,
  Contrast,
  Search,
  TreePine,
  Award,
  MessageCircle,
  QrCode
} from 'lucide-react';
import {
  PAGE_IMAGES,
  SPECIES_DATA,
  DIALOGOS_VIDEOS,
  SCHOOL_TREES_HONORIO,
  EQUIPE_MEMBERS,
  FAQ_ITEMS
} from './siteData.js';

export default function PagesView({ currentPage, onNavigate, onSelectPhoto }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  if (currentPage.startsWith('espécies-arbóreas/')) {
    const species =
      SPECIES_DATA.find((s) => s.slug === currentPage) || SPECIES_DATA[0];
    const currentIndex = SPECIES_DATA.findIndex((s) => s.slug === species.slug);
    const prevSpecies =
      SPECIES_DATA[(currentIndex - 1 + SPECIES_DATA.length) % SPECIES_DATA.length];
    const nextSpecies =
      SPECIES_DATA[(currentIndex + 1) % SPECIES_DATA.length];
    const mainPhoto =
      species.images[0] || '/images/site/especies-arboreas-1.jpg';

    return (
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
                onSelectPhoto({
                  title: species.title,
                  date: species.nomeCientifico,
                  src: mainPhoto
                })
              }
            >
              <div className="main-polaroid-img-box">
                <img
                  src={mainPhoto}
                  alt={species.title}
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
              <h3>Locais de Ocorrência</h3>
            </div>
            <p className="location-address">
              {species.ocorrencia ||
                'Espécie nativa encontrada no Rio Grande do Sul e Bioma Pampa / Mata Atlântica.'}
            </p>
            <button
              className="link-ver-mapa"
              onClick={() => onNavigate('espécies-arbóreas')}
            >
              <span>Ver todas as 27 espécies</span>
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
                    <strong>Nome Popular</strong>
                    <span>{species.nomePopular}</span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Nome Científico</strong>
                    <span className="italic-scientific">{species.nomeCientifico}</span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <TreePine size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Indicação</strong>
                    <span>Reflorestamento, preservação e arborização</span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <Users size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Catalogação</strong>
                    <span>Instituto Socioambiental Botucatu</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="curiosities-card">
            <div className="masking-tape tape-curiosities"></div>
            <div className="curiosities-header">
              <h3>Dica de Plantio</h3>
              <div className="lightbulb-doodle">
                <Lightbulb size={24} strokeWidth={1.8} />
              </div>
            </div>
            <p className="curiosities-highlight">
              Espécie nativa catalogada pelo Instituto Botucatu!
            </p>
            <p className="curiosities-body">
              Na arborização urbana ou paisagismo, avalie sempre o espaço em que a muda será plantada para evitar conflitos com fiação elétrica ou calçadas.
            </p>
          </div>
        </aside>

        <main className="right-column">
          <div className="main-scrapbook-sheet">
            <div className="species-top-nav-row">
              <button
                className="btn-scrapbook-nav"
                onClick={() => onNavigate('espécies-arbóreas')}
              >
                <ArrowLeft size={16} />
                <span>Catálogo de Espécies</span>
              </button>
              <div className="species-prev-next">
                <button
                  className="btn-scrapbook-nav"
                  onClick={() => onNavigate(prevSpecies.slug)}
                >
                  <ArrowLeft size={15} />
                  <span>{prevSpecies.title}</span>
                </button>
                <button
                  className="btn-scrapbook-nav"
                  onClick={() => onNavigate(nextSpecies.slug)}
                >
                  <span>{nextSpecies.title}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
              <span>Espécies Arbóreas Nativas ({currentIndex + 1} de {SPECIES_DATA.length})</span>
              <Sprout size={14} />
            </div>

            <div className="tree-title-row">
              <h1 className="tree-main-title">{species.title}</h1>
            </div>

            <div className="named-by-row">
              <span>Nome Científico:</span>
              <span className="girassol-badge italic-scientific">
                {species.nomeCientifico}
              </span>
            </div>

            {species.caracteristicas && (
              <div className="history-card">
                <div className="history-ribbon">Características Botânicas</div>
                <div className="history-inner-border">
                  <p>{species.caracteristicas}</p>
                </div>
              </div>
            )}

            <div className="bottom-widgets-grid" style={{ marginTop: '8px' }}>
              {species.ecologia && (
                <div className="care-paper-card">
                  <div className="care-tape-header">Aspectos Ecológicos</div>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-dark)', lineHeight: 1.65 }}>
                    {species.ecologia}
                  </p>
                  <div className="care-love-banner" style={{ marginTop: '16px' }}>
                    <span>Preservar a flora nativa é proteger a fauna!</span>
                    <Heart size={16} className="care-heart-icon" />
                  </div>
                </div>
              )}

              {species.madeira && (
                <div className="goals-paper-card">
                  <div className="goals-header">
                    <h3>Madeira e Utilidades</h3>
                    <TreePine size={22} className="target-doodle-icon" />
                  </div>
                  <p style={{ fontSize: '0.93rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
                    {species.madeira}
                  </p>
                </div>
              )}
            </div>

            {species.extras && species.extras.length > 0 && (
              <div className="timeline-card">
                <div className="timeline-header">
                  <h2>Reflorestamento e Preservação Ambiental</h2>
                  <Sprout size={20} className="timeline-leaf-icon" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {species.extras.map((txt, idx) => (
                    <p key={idx} style={{ fontSize: '0.93rem', color: 'var(--text-dark)' }}>
                      {txt}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  const schoolTree = SCHOOL_TREES_HONORIO.find((t) => t.slug === currentPage);
  if (schoolTree) {
    return (
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
                onSelectPhoto({
                  title: `${schoolTree.name} (${schoolTree.species})`,
                  date: schoolTree.location,
                  src: schoolTree.heroImg
                })
              }
            >
              <div className="main-polaroid-img-box">
                <img
                  src={schoolTree.heroImg}
                  alt={schoolTree.name}
                  className="main-polaroid-img"
                />
              </div>
            </div>
          </div>

          <div className="location-note-card">
            <div className="masking-tape tape-location"></div>
            <div className="location-header">
              <MapPin size={18} className="location-pin-icon" />
              <h3>Localização</h3>
            </div>
            <p className="location-address">
              Área verde da Escola Municipal Honório Lemes<br />
              Alegrete – RS
            </p>
            <button
              className="link-ver-mapa"
              onClick={() =>
                onNavigate('atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes')
              }
            >
              <span>Voltar para E.M.E.B. Honório Lemes</span>
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
                    <span>
                      {schoolTree.species} (<em>{schoolTree.scientific}</em>)
                    </span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <Users size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Grupo responsável</strong>
                    <span>{schoolTree.group}</span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <School size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Turma</strong>
                    <span>{schoolTree.grade}</span>
                  </div>
                </li>
                <li>
                  <div className="spec-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="spec-text">
                    <strong>Data do plantio</strong>
                    <span>{schoolTree.plantedDate}</span>
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
            <ul className="school-curiosities-list">
              <li>Espécie nativa do sul do Brasil.</li>
              <li>Produz frutos apreciados por aves e pessoas.</li>
              <li>Ajuda na alimentação de polinizadores.</li>
              <li>Quando adulta oferece excelente sombra.</li>
            </ul>
          </div>
        </aside>

        <main className="right-column">
          <div className="main-scrapbook-sheet">
            <div className="species-top-nav-row">
              <button
                className="btn-scrapbook-nav"
                onClick={() =>
                  onNavigate('atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes')
                }
              >
                <ArrowLeft size={16} />
                <span>Todas as árvores da E.M.E.B. Honório Lemes</span>
              </button>
              <div className="species-prev-next">
                {SCHOOL_TREES_HONORIO.map((t) => (
                  <button
                    key={t.id}
                    className={`btn-scrapbook-nav ${t.slug === currentPage ? 'active-pill' : ''}`}
                    onClick={() => onNavigate(t.slug)}
                  >
                    <span>{t.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-top-grid">
              <div className="tree-intro-col">
                <div className="our-tree-tag">
                  <span>Diário da Árvore • E.M.E.B. Honório Lemes</span>
                  <Sprout size={14} />
                </div>

                <div className="tree-title-row">
                  <h1 className="tree-main-title">
                    {schoolTree.shortName} — {schoolTree.species}
                  </h1>
                </div>

                <div className="named-by-row">
                  <span>Grupo responsável:</span>
                  <span className="girassol-badge">{schoolTree.group}</span>
                </div>

                <div className="history-card">
                  <div className="history-ribbon">História</div>
                  <div className="history-inner-border">
                    <p>{schoolTree.story}</p>
                  </div>
                </div>
              </div>

              <div className="kids-notebook-card">
                <div className="masking-tape tape-notebook"></div>
                <div className="notebook-spiral">
                  {Array.from({ length: 11 }).map((_, idx) => (
                    <span key={idx} className="spiral-ring" />
                  ))}
                </div>
                <div className="notebook-content">
                  <h3 className="notebook-title">O que as crianças disseram</h3>
                  <ul className="kids-quotes-list">
                    <li>
                      <strong>😊 Plantio:</strong>{' '}
                      <span className="kids-handwritten-inline">“Foi divertido e engraçado.”</span>
                    </li>
                    <li>
                      <strong>⛏ Parte favorita:</strong>{' '}
                      <span className="kids-handwritten-inline">“Cavar a terra.”</span>
                    </li>
                    <li>
                      <strong>🍃 O que gostam:</strong>{' '}
                      <span className="kids-handwritten-inline">“Das folhas e da beleza.”</span>
                    </li>
                    <li>
                      <strong>🌳 Sonho:</strong>{' '}
                      <span className="kids-handwritten-inline">
                        “Que ela cresça, dê frutos e faça bastante sombra para a escola.”
                      </span>
                    </li>
                  </ul>
                  <p className="kids-signature">– {schoolTree.group}</p>
                </div>
              </div>
            </div>

            <section className="timeline-card">
              <div className="timeline-header">
                <h2>Estado Atual da Árvore</h2>
                <Sprout size={20} className="timeline-leaf-icon" />
              </div>
              <div className="estado-atual-grid">
                <div className="estado-box">
                  <span className="estado-emoji">🌱</span>
                  <strong>Crescimento</strong>
                  <p>Cresceu pouco desde o plantio.</p>
                </div>
                <div className="estado-box">
                  <span className="estado-emoji">💚</span>
                  <strong>Saúde</strong>
                  <p>Parece estar saudável.</p>
                </div>
                <div className="estado-box">
                  <span className="estado-emoji">🌸</span>
                  <strong>Flores e frutos</strong>
                  <p>Ainda não produziu flores nem frutos.</p>
                </div>
                <div className="estado-box">
                  <span className="estado-emoji">🐞</span>
                  <strong>Fauna observada</strong>
                  <p>Foram observados pequenos insetos próximos à árvore.</p>
                </div>
              </div>
            </section>

            <section className="photos-section">
              <div className="section-title-bar">
                <h2>Registros Fotográficos na Escola</h2>
                <Camera size={19} className="title-deco-icon" />
              </div>
              <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {[schoolTree.heroImg, ...schoolTree.photos].map((src, idx) => (
                  <div
                    key={idx}
                    className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                    onClick={() =>
                      onSelectPhoto({
                        title: `${schoolTree.name} — Registro #${idx + 1}`,
                        date: 'E.M.E.B. Honório Lemes',
                        src
                      })
                    }
                  >
                    <div className="masking-tape tape-mini-polaroid"></div>
                    <div className="mini-polaroid-img-container">
                      <img src={src} alt={schoolTree.name} className="mini-polaroid-img" />
                    </div>
                    <div className="mini-polaroid-caption">
                      <strong>{schoolTree.name}</strong>
                      <span>E.M.E.B. Honório Lemes</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'página-inicial') {
    const homeImgs = PAGE_IMAGES['página-inicial'] || [];
    const newsItems = [
      {
        title: 'A Exposição Fotográfica "Aves do Pampa"...',
        img: homeImgs[4] || '/images/site/pagina-inicial-5.jpg',
        href: 'https://www.instagram.com/p/C8FBEXLsWeJ/?igsh=MTI0M3RvMjYzd2J2MA=='
      },
      {
        title: 'Dia do Bioma Pampa - Convidamos todos e todas para...',
        img: homeImgs[5] || '/images/site/pagina-inicial-6.jpg',
        href: 'https://www.instagram.com/p/DDr1XllJ2cM/?igsh=MXAxZDBsaG54bnNrdA=='
      },
      {
        title: 'Instituto Botucatu faz plantio de árvores no Parque Nehyta Ramos',
        img: homeImgs[6] || '/images/site/pagina-inicial-7.jpg',
        href: 'https://www.instagram.com/p/DDFzNIxBNKy/?igsh=aHFxdXo3OXYzYnEy'
      },
      {
        title: 'Confiram, na GZH Digital, o texto do colunista...',
        img: homeImgs[7] || '/images/site/pagina-inicial-8.jpg',
        href: 'https://www.instagram.com/p/C9P6FIksT0C/?igsh=MWU2dnFkMm8wZnlsYg=='
      }
    ];

    const magazines = [
      {
        title: 'Revista “Arborização Urbana”',
        year: 'Ano 2016',
        img: homeImgs[8] || '/images/site/pagina-inicial-9.jpg'
      },
      {
        title: 'Revista “Arborizar e harmonizar”',
        year: 'Ano 2017',
        img: homeImgs[9] || '/images/site/pagina-inicial-10.jpg'
      },
      {
        title: 'Revista “Conhecer, viver, ser”',
        year: 'Ano 2018',
        img: homeImgs[10] || '/images/site/pagina-inicial-11.jpg'
      }
    ];

    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="hero-top-grid">
            <div className="tree-intro-col">
              <div className="our-tree-tag">
                <span>Página Inicial Oficial</span>
                <Sprout size={14} />
              </div>
              <h1 className="tree-main-title">Seja bem-vindo(a) ao Instituto Botucatu!</h1>
              <div className="history-card" style={{ marginTop: '18px' }}>
                <div className="history-ribbon">Nossa Missão</div>
                <div className="history-inner-border">
                  <p style={{ marginBottom: '10px' }}>
                    O <strong>Instituto Botucatu</strong> é um espaço dedicado à preservação e valorização da natureza.
                    Nosso propósito é promover projetos e ações que incentivem a conscientização ambiental, a
                    sustentabilidade e a conexão das pessoas com o meio ambiente.
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    Aqui, trabalhamos ativamente para preservar a biodiversidade, catalogando espécies vegetais e
                    arbóreas, estudando seus papéis ecológicos e sua importância para os ecossistemas locais. Além
                    disso, buscamos compartilhar conhecimento por meio de atividades educativas, culturais, eventos
                    comunitários e parcerias que fortalecem nossa missão.
                  </p>
                  <p>
                    Ao fazer parte do Instituto Botucatu, você está contribuindo para a construção de um futuro mais
                    verde e sustentável. Juntos, cultivamos a natureza e inspiramos novas gerações a cuidar do nosso
                    planeta!
                  </p>
                </div>
              </div>
            </div>

            <div className="kids-notebook-card">
              <div className="masking-tape tape-notebook"></div>
              <div className="notebook-spiral">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <span key={idx} className="spiral-ring" />
                ))}
              </div>
              <div className="notebook-content">
                <h3 className="notebook-title">Nossos Destaques</h3>
                <blockquote className="kids-handwritten-quote">
                  “Nossa missão principal é a conservação da biodiversidade do Pampa, aliada ao desenvolvimento
                  sustentável e ao fortalecimento das comunidades.”
                </blockquote>
                <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '12px' }}>
                  {[homeImgs[1], homeImgs[2]].filter(Boolean).map((src, i) => (
                    <div
                      key={i}
                      className={`mini-polaroid polaroid-tilt-${i}`}
                      onClick={() =>
                        onSelectPhoto({
                          title: 'Destaque Instituto Botucatu',
                          date: 'Alegrete - RS',
                          src
                        })
                      }
                    >
                      <div className="mini-polaroid-img-container">
                        <img src={src} alt="Destaque" className="mini-polaroid-img" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="timeline-card">
            <div className="timeline-header">
              <h2>Nossos Objetivos</h2>
              <Sprout size={20} className="timeline-leaf-icon" />
            </div>
            <div className="objectives-grid">
              <div className="objective-note">
                <h3>🌱 Preservar a Biodiversidade</h3>
                <p>
                  Promover a conservação das espécies arbóreas nativas, garantindo habitats saudáveis para a fauna local
                  e o equilíbrio ecológico.
                </p>
              </div>
              <div className="objective-note">
                <h3>🎓 Educação Ambiental</h3>
                <p>
                  Fomentar o conhecimento sobre a importância das árvores, capacitando a comunidade a agir em prol da
                  sustentabilidade e proteção do meio ambiente.
                </p>
              </div>
              <div className="objective-note">
                <h3>🌳 Arborização Urbana Sustentável</h3>
                <p>
                  Implementar projetos de arborização que transformem as cidades em ambientes saudáveis e sustentáveis
                  para todos.
                </p>
              </div>
              <div className="objective-note">
                <h3>🤝 Engajamento Comunitário</h3>
                <p>
                  Mobilizar alunos, instituições e moradores para ações coletivas de plantio e cuidado das árvores,
                  fortalecendo o compromisso com um futuro mais verde.
                </p>
              </div>
            </div>
          </section>

          <section className="photos-section">
            <div className="section-title-bar">
              <h2>Notícias e Ações Recentes</h2>
              <Instagram size={19} className="title-deco-icon" />
            </div>
            <div className="polaroids-grid">
              {newsItems.map((item, idx) => (
                <div key={idx} className={`mini-polaroid polaroid-tilt-${idx}`}>
                  <div className="masking-tape tape-mini-polaroid"></div>
                  <div
                    className="mini-polaroid-img-container"
                    onClick={() =>
                      onSelectPhoto({ title: item.title, date: 'Notícia Instituto Botucatu', src: item.img })
                    }
                  >
                    <img src={item.img} alt={item.title} className="mini-polaroid-img" />
                  </div>
                  <div className="mini-polaroid-caption">
                    <strong style={{ marginBottom: '6px' }}>{item.title}</strong>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-saiba-mais"
                    >
                      <span>Saiba mais no Instagram</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="photos-section" style={{ backgroundColor: '#efe4ce' }}>
            <div className="section-title-bar">
              <h2>Publicações — Revista Verde</h2>
              <BookOpen size={19} className="title-deco-icon" />
            </div>
            <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {magazines.map((mag, idx) => (
                <div
                  key={idx}
                  className={`mini-polaroid polaroid-tilt-${idx}`}
                  onClick={() =>
                    onSelectPhoto({ title: mag.title, date: mag.year, src: mag.img })
                  }
                >
                  <div className="masking-tape tape-mini-polaroid"></div>
                  <div className="mini-polaroid-img-container" style={{ aspectRatio: '3/4' }}>
                    <img src={mag.img} alt={mag.title} className="mini-polaroid-img" />
                  </div>
                  <div className="mini-polaroid-caption">
                    <strong>{mag.title}</strong>
                    <span>{mag.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="audio-green-card" style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '1.7rem', marginBottom: '6px' }}>
              “Venha fazer parte da mudança!”
            </h3>
            <p style={{ marginBottom: '14px' }}>
              O Instituto Botucatu busca criar um futuro com o mundo mais verde. Agende uma visita do Instituto Botucatu!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href="mailto:institutobotucatu@gmail.com" className="btn-back-map" style={{ textDecoration: 'none' }}>
                <Mail size={16} />
                <span>institutobotucatu@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/instituto_botucatu/"
                target="_blank"
                rel="noreferrer"
                className="btn-back-map"
                style={{ textDecoration: 'none', backgroundColor: '#3f5d22' }}
              >
                <Instagram size={16} />
                <span>@instituto_botucatu</span>
              </a>
              <a
                href="https://www.youtube.com/@programaarborizacaourbana-5696"
                target="_blank"
                rel="noreferrer"
                className="btn-back-map"
                style={{ textDecoration: 'none', backgroundColor: '#8c3b2b' }}
              >
                <Youtube size={16} />
                <span>Canal no YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'acessibilidade') {
    const accImgs = PAGE_IMAGES['acessibilidade'] || [];
    const tools = [
      {
        title: 'Mudar Cores (Alto Contraste)',
        desc: 'Extensão para ajustar o contraste de cores e facilitar a leitura.',
        href: 'https://chromewebstore.google.com/detail/high-contrast-mode/jgobndcjgfchgembdglehchlkcmpcakb',
        img: accImgs[0] || '/images/site/acessibilidade-1.jpg',
        icon: <Contrast size={24} />
      },
      {
        title: 'Ampliar a Tela (Zoom)',
        desc: 'Amplie fontes e elementos da página para melhor visualização.',
        href: 'https://chromewebstore.google.com/detail/ampliar-para-o-google-chr/lajondecmobodlejlcjllhojikagldgd?hl=pt-BR',
        img: accImgs[1] || '/images/site/acessibilidade-2.jpg',
        icon: <ZoomIn size={24} />
      },
      {
        title: 'Ouvir a Leitura (Read Aloud)',
        desc: 'Converte o texto da página em áudio para leitura em voz alta.',
        href: 'https://chromewebstore.google.com/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp',
        img: accImgs[2] || '/images/site/acessibilidade-3.jpg',
        icon: <Volume2 size={24} />
      }
    ];

    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Inclusão Digital</span>
            <Eye size={14} />
          </div>
          <h1 className="tree-main-title">Acessibilidade</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Clique nos ícones abaixo para contraste, ampliar fontes e leitura para melhor visualização.
          </p>

          <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {tools.map((t, idx) => (
              <div key={idx} className={`mini-polaroid polaroid-tilt-${idx}`} style={{ padding: '16px' }}>
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container" style={{ aspectRatio: '16/10' }}>
                  <img src={t.img} alt={t.title} className="mini-polaroid-img" style={{ objectFit: 'contain', background: '#fff' }} />
                </div>
                <div className="mini-polaroid-caption" style={{ gap: '8px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{t.title}</strong>
                  <span>{t.desc}</span>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-back-map"
                    style={{ textDecoration: 'none', justifyContent: 'center', marginTop: '6px' }}
                  >
                    <span>Acessar na Chrome Web Store</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom-widgets-grid">
            <div className="care-paper-card">
              <div className="care-tape-header">Como fixar no navegador</div>
              <p style={{ marginBottom: '12px' }}>
                1. Você pode fixar a extensão desejada na barra de ferramentas clicando no ícone de alfinete ao lado dela.
              </p>
              {accImgs[3] && (
                <img
                  src={accImgs[3]}
                  alt="Instrução de fixar extensão"
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #d5c7ad' }}
                />
              )}
            </div>
            <div className="care-paper-card">
              <div className="care-tape-header">Como ativar a extensão</div>
              <p style={{ marginBottom: '12px' }}>
                2. Após ativar uma extensão, ela aparecerá no canto direito do navegador como um ícone de peça de quebra-cabeça.
              </p>
              {accImgs[4] && (
                <img
                  src={accImgs[4]}
                  alt="Instrução de ativar extensão"
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #d5c7ad' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'diálogos') {
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>DIÁLOGOS DA PREFEITURA</span>
            <Youtube size={14} />
          </div>
          <h1 className="tree-main-title">Diálogos — Projetos na Cidade</h1>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', maxWidth: '800px' }}>
            Assista aos vídeos de projetos e iniciativas na cidade em parceria com a Prefeitura Municipal de Alegrete.
            Diálogos, transparência e ação por uma cidade mais verde e sustentável.
          </p>

          <div className="youtube-cards-grid">
            {DIALOGOS_VIDEOS.map((vid, idx) => (
              <div key={vid.id} className="youtube-scrapbook-card">
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="youtube-iframe-wrapper">
                  <iframe
                    src={vid.embedUrl}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="youtube-card-body">
                  <span className="girassol-badge">Vídeo #{idx + 1}</span>
                  <h3>{vid.title}</h3>
                  <p>{vid.description}</p>
                  <a
                    href={vid.watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-youtube-link"
                  >
                    <Youtube size={18} />
                    <span>Assistir no YouTube ({vid.watchUrl})</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="audio-green-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem' }}>
                Canal Oficial: Programa Arborização Urbana
              </h3>
              <p>Confira todos os vídeos e inscreva-se no canal do projeto no YouTube!</p>
            </div>
            <a
              href="https://www.youtube.com/@programaarborizacaourbana-5696"
              target="_blank"
              rel="noreferrer"
              className="btn-back-map"
              style={{ backgroundColor: '#9e2a2b', textDecoration: 'none' }}
            >
              <Youtube size={18} />
              <span>Abrir Canal no YouTube</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'atividades') {
    const actImgs = PAGE_IMAGES['atividades'] || [];
    const cards = [
      {
        title: 'Projeto Arborização Escolar',
        desc: 'Plantio e acompanhamento de árvores com estudantes, promovendo educação ambiental na prática.',
        img: actImgs[0] || '/images/site/atividades-1.jpg',
        target: 'atividades/projeto-arborização-escolar'
      },
      {
        title: 'Diálogos na Câmara e Prefeitura',
        desc: 'Encontros e conversas sobre meio ambiente e cidadania na Câmara Municipal.',
        img: actImgs[1] || '/images/site/atividades-2.jpg',
        target: 'diálogos'
      },
      {
        title: 'CineBotucatu — Conscientização',
        desc: 'Campanha de Conscientização sobre a importância das árvores para a vida.',
        img: actImgs[2] || '/images/site/atividades-3.jpg',
        target: 'atividades/cinebotucatu'
      },
      {
        title: 'Flor de Tuna & Microflorestas',
        desc: 'Implantação de pequenas florestas e vivências escolares para restauração e biodiversidade urbana.',
        img: actImgs[3] || '/images/site/atividades-4.jpg',
        target: 'atividades/flor-de-tuna'
      }
    ];

    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Nossas Frentes de Ação</span>
            <Sprout size={14} />
          </div>
          <h1 className="tree-main-title">Atividades e Ações do Instituto Botucatu</h1>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
            Conheça as ações que realizamos em prol da natureza e da educação ambiental.
          </p>

          <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px' }}>
            {cards.map((c, idx) => (
              <div
                key={idx}
                className={`mini-polaroid polaroid-tilt-${idx}`}
                style={{ padding: '14px' }}
                onClick={() => onNavigate(c.target)}
              >
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container" style={{ aspectRatio: '16/10' }}>
                  <img src={c.img} alt={c.title} className="mini-polaroid-img" />
                </div>
                <div className="mini-polaroid-caption" style={{ gap: '8px' }}>
                  <strong style={{ fontSize: '1.15rem' }}>{c.title}</strong>
                  <span>{c.desc}</span>
                  <button className="btn-back-map" style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
                    <span>Saiba Mais</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'atividades/projeto-arborização-escolar') {
    const paeImgs = PAGE_IMAGES['atividades/projeto-arborização-escolar'] || [];
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Educação Ambiental nas Escolas</span>
            <School size={14} />
          </div>
          <h1 className="tree-main-title">Projeto Arborização Escolar</h1>

          <div className="history-card">
            <div className="history-ribbon">Como Funciona</div>
            <div className="history-inner-border">
              <p style={{ marginBottom: '10px' }}>
                O <strong>Instituto Socioambiental Botucatu</strong> realiza o plantio de árvores nativas em escolas de
                <strong> Alegrete-RS</strong>, junto com estudantes e professores.
              </p>
              <p>
                Cada árvore recebe um <strong>QR Code</strong> e passa a fazer parte de um <strong>diário digital</strong>,
                onde todos acompanham seu crescimento e cuidados.
              </p>
            </div>
          </div>

          <section className="photos-section">
            <div className="section-title-bar">
              <h2>Escolas Participantes</h2>
              <School size={19} className="title-deco-icon" />
            </div>

            <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div
                className="mini-polaroid polaroid-tilt-0"
                style={{ padding: '16px' }}
                onClick={() =>
                  onNavigate('atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes')
                }
              >
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={paeImgs[0] || '/images/site/atividades-projeto-arborizacao-escolar-1.jpg'}
                    alt="Escola Municipal Honório Lemes"
                    className="mini-polaroid-img"
                  />
                </div>
                <div className="mini-polaroid-caption" style={{ gap: '8px' }}>
                  <strong style={{ fontSize: '1.2rem' }}>E.M.E.B. Honório Lemes</strong>
                  <span>
                    5 grupos de alunos monitorando as árvores Grazi, Lia, Quiara, Mini Moon e Duda via QR Code.
                  </span>
                  <button className="btn-back-map" style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
                    <span>Ver Escola e Árvores (5 Diários)</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div
                className="mini-polaroid polaroid-tilt-1"
                style={{ padding: '16px' }}
                onClick={() =>
                  onNavigate('atividades/projeto-arborização-escolar/e-m-e-i-arnaldo-da-costa-paz')
                }
              >
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={paeImgs[1] || '/images/site/atividades-projeto-arborizacao-escolar-2.jpg'}
                    alt="E.M.E.I Arnaldo da Costa Paz"
                    className="mini-polaroid-img"
                  />
                </div>
                <div className="mini-polaroid-caption" style={{ gap: '8px' }}>
                  <strong style={{ fontSize: '1.2rem' }}>E.M.E.I. Arnaldo da Costa Paz</strong>
                  <span>
                    Conscientização ambiental na infância: plantio e preservação com os pequenos da Educação Infantil.
                  </span>
                  <button className="btn-back-map" style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
                    <span>Saiba Mais e Ver Fotos</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (currentPage === 'atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes') {
    const hlImgs = PAGE_IMAGES['atividades/projeto-arborização-escolar/e-m-e-b-honório-lemes'] || [];
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="species-top-nav-row">
            <button
              className="btn-scrapbook-nav"
              onClick={() => onNavigate('atividades/projeto-arborização-escolar')}
            >
              <ArrowLeft size={16} />
              <span>Voltar para Projeto Arborização Escolar</span>
            </button>
          </div>

          <div className="hero-top-grid">
            <div className="tree-intro-col">
              <div className="our-tree-tag">
                <span>Escola Participante • Alegrete/RS</span>
                <School size={14} />
              </div>
              <h1 className="tree-main-title">E.M.E.B. Honório Lemes</h1>

              <div className="history-card" style={{ marginTop: '16px' }}>
                <div className="history-ribbon">Sobre a Participação da Escola</div>
                <div className="history-inner-border">
                  <p>
                    A <strong>Escola Municipal Honório Lemes</strong> abraçou o projeto de arborização escolar com
                    entusiasmo. Alunos, professores e comunidade trabalham juntos para cuidar das árvores e aprender
                    mais sobre a natureza.
                  </p>
                </div>
              </div>
            </div>

            {hlImgs[0] && (
              <div className="main-polaroid-card" style={{ transform: 'rotate(1deg)' }}>
                <div className="main-polaroid-img-box" style={{ aspectRatio: '16/10' }}>
                  <img src={hlImgs[0]} alt="E.M.E.B. Honório Lemes" className="main-polaroid-img" />
                </div>
              </div>
            )}
          </div>

          <section className="photos-section">
            <div className="section-title-bar">
              <h2>Nossos Grupos e Árvores Monitoradas</h2>
              <QrCode size={19} className="title-deco-icon" />
            </div>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              Conheça os grupos participantes e clique em <strong>Ver Diário</strong> para abrir a página exclusiva de
              cada árvore acompanhada na escola:
            </p>

            <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {SCHOOL_TREES_HONORIO.map((tree, idx) => (
                <div
                  key={tree.id}
                  className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                  onClick={() => onNavigate(tree.slug)}
                >
                  <div className="masking-tape tape-mini-polaroid"></div>
                  <div className="mini-polaroid-img-container">
                    <img src={tree.heroImg} alt={tree.name} className="mini-polaroid-img" />
                  </div>
                  <div className="mini-polaroid-caption" style={{ gap: '6px' }}>
                    <strong>{tree.name}</strong>
                    <span>{tree.species}</span>
                    <button
                      className="btn-back-map"
                      style={{ width: '100%', justifyContent: 'center', padding: '6px 10px', fontSize: '0.82rem' }}
                    >
                      <span>Ver Diário</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (currentPage === 'atividades/projeto-arborização-escolar/e-m-e-i-arnaldo-da-costa-paz') {
    const emeiImgs =
      PAGE_IMAGES['atividades/projeto-arborização-escolar/e-m-e-i-arnaldo-da-costa-paz'] || [];
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="species-top-nav-row">
            <button
              className="btn-scrapbook-nav"
              onClick={() => onNavigate('atividades/projeto-arborização-escolar')}
            >
              <ArrowLeft size={16} />
              <span>Voltar para Projeto Arborização Escolar</span>
            </button>
          </div>

          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Conscientização Ambiental na Infância</span>
            <School size={14} />
          </div>
          <h1 className="tree-main-title">E.M.E.I. Arnaldo da Costa Paz</h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-dark)' }}>
            Instituto Botucatu promove plantio e preservação com os pequenos da EMEI Arnaldo da Costa Paz
          </p>

          <div className="history-card">
            <div className="history-ribbon">Vivência Pedagógica</div>
            <div className="history-inner-border">
              <p>
                “O Instituto Botucatu acredita que a conscientização ambiental começa cedo. Em parceria com a EMEI
                Arnaldo da Costa Paz, realizamos uma tarde especial de aprendizado e ação. Nossa missão é incentivar as
                futuras gerações a cuidar do meio ambiente por meio de atividades práticas e pedagógicas.”
              </p>
            </div>
          </div>

          <section className="photos-section">
            <div className="section-title-bar">
              <h2>Galeria de Fotos — E.M.E.I. Arnaldo da Costa Paz</h2>
              <Camera size={19} className="title-deco-icon" />
            </div>
            <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {emeiImgs.map((src, idx) => (
                <div
                  key={idx}
                  className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                  onClick={() =>
                    onSelectPhoto({
                      title: `E.M.E.I. Arnaldo da Costa Paz — Foto #${idx + 1}`,
                      date: 'Conscientização Ambiental na Infância',
                      src
                    })
                  }
                >
                  <div className="masking-tape tape-mini-polaroid"></div>
                  <div className="mini-polaroid-img-container">
                    <img src={src} alt={`EMEI Arnaldo da Costa Paz ${idx + 1}`} className="mini-polaroid-img" />
                  </div>
                  <div className="mini-polaroid-caption">
                    <strong>Plantio com as crianças</strong>
                    <span>EMEI Arnaldo da Costa Paz</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (currentPage === 'atividades/cinebotucatu' || currentPage === 'atividades/flor-de-tuna') {
    const isFlor = currentPage === 'atividades/flor-de-tuna';
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="species-top-nav-row">
            <button className="btn-scrapbook-nav" onClick={() => onNavigate('atividades')}>
              <ArrowLeft size={16} />
              <span>Voltar para Atividades</span>
            </button>
          </div>

          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Educação e Cultura Ambiental</span>
            <Film size={14} />
          </div>
          <h1 className="tree-main-title">{isFlor ? 'Flor de Tuna' : 'CineBotucatu'}</h1>

          {isFlor && (
            <div className="history-card">
              <div className="history-ribbon">Atividade na E.M.E.B. Honório Lemes</div>
              <div className="history-inner-border">
                <p>
                  “Na quarta-feira, dia 5, o Instituto Botucatu esteve presente na E.M.E.B. Honório Lemes para mais uma
                  atividade de educação ambiental. Com o objetivo de construir um futuro onde o meio ambiente seja mais
                  valorizado e cuidado, acreditamos que esse trabalho deve começar desde cedo, formando cidadãos
                  conscientes e engajados.”
                </p>
              </div>
            </div>
          )}

          <div className="kids-notebook-card">
            <div className="masking-tape tape-notebook"></div>
            <div className="notebook-spiral">
              {Array.from({ length: 8 }).map((_, idx) => (
                <span key={idx} className="spiral-ring" />
              ))}
            </div>
            <div className="notebook-content" style={{ textAlign: 'center', padding: '16px' }}>
              <h3 className="notebook-title">Conscientização ambiental começa pela base!</h3>
              <p style={{ marginBottom: '16px', fontSize: '1.02rem' }}>
                A seguir confira um vídeo em uma de nossas redes sociais sobre o evento:
              </p>
              <a
                href="https://www.instagram.com/reel/C748WxLvkAb/?igsh=MW5pcjRwd3Zva3ZsNQ=="
                target="_blank"
                rel="noreferrer"
                className="btn-back-map"
                style={{ textDecoration: 'none', display: 'inline-flex', padding: '12px 24px', fontSize: '1rem' }}
              >
                <Instagram size={18} />
                <span>Assistir Vídeo (Reel) no Instagram</span>
                <ExternalLink size={15} />
              </a>
              <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                https://www.instagram.com/reel/C748WxLvkAb/?igsh=MW5pcjRwd3Zva3ZsNQ==
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'sobre-nós') {
    const sobreImgs = PAGE_IMAGES['sobre-nós'] || [];
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="hero-top-grid">
            <div className="tree-intro-col">
              <div className="our-tree-tag">
                <span>Quem Somos</span>
                <Sprout size={14} />
              </div>
              <h1 className="tree-main-title">Sobre Nós</h1>
              <div className="history-card" style={{ marginTop: '16px' }}>
                <div className="history-ribbon">Instituto Socioambiental Botucatu</div>
                <div className="history-inner-border">
                  <p>
                    O <strong>Instituto Socioambiental Botucatu de Alegrete</strong> é uma organização que se dedica à
                    promoção de práticas sustentáveis e à preservação do meio ambiente. Seu foco está em projetos que
                    visam o desenvolvimento socioambiental, integrando a conservação da natureza com o bem-estar das
                    comunidades locais.
                  </p>
                </div>
              </div>
            </div>

            <div className="care-paper-card">
              <div className="care-tape-header">Nossas Frentes</div>
              <ul className="care-items-list">
                <li>
                  <div className="care-icon-badge">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <strong>Educação Ambiental</strong>
                    <p>Programas e workshops para sensibilizar a população sobre questões ambientais.</p>
                  </div>
                </li>
                <li>
                  <div className="care-icon-badge">
                    <Sprout size={18} />
                  </div>
                  <div>
                    <strong>Projetos de Conservação</strong>
                    <p>Iniciativas para proteger a biodiversidade e os recursos naturais da região.</p>
                  </div>
                </li>
                <li>
                  <div className="care-icon-badge">
                    <Users size={18} />
                  </div>
                  <div>
                    <strong>Ações Comunitárias</strong>
                    <p>Trabalhos com comunidades locais para desenvolver práticas sustentáveis e qualidade de vida.</p>
                  </div>
                </li>
                <li>
                  <div className="care-icon-badge">
                    <Award size={18} />
                  </div>
                  <div>
                    <strong>Parcerias</strong>
                    <p>Colaborações com instituições, empresas e órgãos governamentais em prol da sustentabilidade.</p>
                  </div>
                </li>
              </ul>
              <button
                className="btn-back-map"
                style={{ justifyContent: 'center' }}
                onClick={() => onNavigate('sobre-nós/equipe')}
              >
                <Users size={16} />
                <span>Conhecer Nossa Equipe — Clique Aqui!</span>
              </button>
            </div>
          </div>

          <section className="photos-section">
            <div className="section-title-bar">
              <h2>Registros, Parcerias e Ações do Instituto</h2>
              <Camera size={19} className="title-deco-icon" />
            </div>
            <div className="polaroids-grid">
              {sobreImgs.slice(0, 12).map((src, idx) => (
                <div
                  key={idx}
                  className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                  onClick={() =>
                    onSelectPhoto({
                      title: `Instituto Botucatu — Registro #${idx + 1}`,
                      date: 'Alegrete - RS',
                      src
                    })
                  }
                >
                  <div className="masking-tape tape-mini-polaroid"></div>
                  <div className="mini-polaroid-img-container">
                    <img src={src} alt={`Sobre nós ${idx + 1}`} className="mini-polaroid-img" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (currentPage === 'sobre-nós/equipe') {
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="species-top-nav-row">
            <button className="btn-scrapbook-nav" onClick={() => onNavigate('sobre-nós')}>
              <ArrowLeft size={16} />
              <span>Voltar para Sobre Nós</span>
            </button>
          </div>

          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Quem Faz Acontecer</span>
            <Users size={14} />
          </div>
          <h1 className="tree-main-title">Nossa Equipe — Colaboradores</h1>

          <div className="polaroids-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }}>
            {EQUIPE_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                style={{ padding: '14px' }}
                onClick={() =>
                  onSelectPhoto({ title: member.name, date: member.role, src: member.img })
                }
              >
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container" style={{ aspectRatio: '1 / 1.05' }}>
                  <img src={member.img} alt={member.name} className="mini-polaroid-img" />
                </div>
                <div className="mini-polaroid-caption" style={{ textAlign: 'center', marginTop: '6px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{member.name}</strong>
                  <span className="girassol-badge" style={{ display: 'inline-block', marginTop: '4px' }}>
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'sobre-nós/ins-botucatuajuda') {
    return (
      <div className="single-page-container">
        <div className="main-scrapbook-sheet">
          <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
            <span>Central de Atendimento</span>
            <HelpCircle size={14} />
          </div>
          <h1 className="tree-main-title">Ajuda — Dúvidas Frequentes</h1>

          <div className="faq-scrapbook-list">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-scrapbook-item ${isOpen ? 'faq-open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                >
                  <div className="faq-question-row">
                    <strong>{item.q}</strong>
                    <span className="faq-toggle-pill">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && <p className="faq-answer-text">{item.a}</p>}
                </div>
              );
            })}
          </div>

          <div className="audio-green-card" style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem' }}>Ainda precisa de ajuda?</h3>
            <p style={{ marginBottom: '10px' }}>
              Entre em contato diretamente pelo nosso e-mail oficial:
            </p>
            <a href="mailto:institutobotucatu@gmail.com" className="btn-back-map" style={{ textDecoration: 'none' }}>
              <Mail size={16} />
              <span>institutobotucatu@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const filteredSpecies = SPECIES_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nomeCientifico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="single-page-container">
      <div className="main-scrapbook-sheet">
        <div className="our-tree-tag" style={{ alignSelf: 'flex-start' }}>
          <span>Conhecer é Cuidar...</span>
          <TreePine size={14} />
        </div>
        <h1 className="tree-main-title">Espécies Arbóreas — Catálogo Completo (27 Espécies)</h1>

        <section className="timeline-card">
          <div className="timeline-header">
            <h2>Por Que Plantar Árvores? Benefícios da Arborização Urbana</h2>
            <Sprout size={20} className="timeline-leaf-icon" />
          </div>
          <div className="objectives-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="objective-note">
              <strong>💧 Gestão de águas pluviais</strong>
              <p>Auxilia na infiltração da água da chuva e reduz alagamentos urbanos.</p>
            </div>
            <div className="objective-note">
              <strong>🧘 Saúde e bem-estar</strong>
              <p>Ambientes arborizados reduzem o estresse e estimulam o convívio comunitário.</p>
            </div>
            <div className="objective-note">
              <strong>🐦 Proteção da fauna</strong>
              <p>Oferece abrigo, frutos e alimento para aves e polinizadores nativos.</p>
            </div>
            <div className="objective-note">
              <strong>🌳 Controle de Temperatura</strong>
              <p>A sombra das copas ameniza as ilhas de calor e refresca as ruas.</p>
            </div>
            <div className="objective-note">
              <strong>🌿 Mitigação da poluição</strong>
              <p>Filtra partículas em suspensão e melhora a qualidade do ar que respiramos.</p>
            </div>
            <div className="objective-note">
              <strong>🎓 Educação Ambiental</strong>
              <p>Conecta escolas e cidadãos ao ciclo da vida e às espécies do nosso bioma.</p>
            </div>
          </div>
        </section>

        <div className="species-search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar entre as 27 espécies arbóreas (ex: Açoita Cavalo, Pitangueira, Guabijuzeiro)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="photos-section">
          <div className="section-title-bar">
            <h2>Catálogo de Espécies Arbóreas ({filteredSpecies.length})</h2>
            <Sprout size={19} className="title-deco-icon" />
          </div>

          <div className="polaroids-grid">
            {filteredSpecies.map((sp, idx) => (
              <div
                key={sp.id}
                className={`mini-polaroid polaroid-tilt-${idx % 4}`}
                onClick={() => onNavigate(sp.slug)}
              >
                <div className="masking-tape tape-mini-polaroid"></div>
                <div className="mini-polaroid-img-container">
                  <img
                    src={sp.images[0] || `/images/site/especies-arboreas-${idx + 1}.jpg`}
                    alt={sp.title}
                    className="mini-polaroid-img"
                  />
                </div>
                <div className="mini-polaroid-caption" style={{ gap: '4px' }}>
                  <strong>{sp.title}</strong>
                  <span className="italic-scientific" style={{ fontSize: '0.76rem' }}>
                    {sp.nomeCientifico}
                  </span>
                  <button
                    className="btn-back-map"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '5px 10px', fontSize: '0.8rem' }}
                  >
                    <span>Saiba mais</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
