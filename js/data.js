/* ============================================================
   CONFIGURAÇÃO GERAL DO ÁLBUM — Copa Spassu 2026
   ------------------------------------------------------------
   O álbum é um "livro" com páginas (PAGES). Cada página tem uma
   imagem de fundo e uma lista de SLOTS posicionados por cima
   (x,y,w,h em % da imagem). Cada slot aponta para o número (n)
   de uma figurinha do array STICKERS.

   >> Adicionar figurinha:  crie em assets/, adicione em STICKERS,
      e coloque o n dela num slot da página desejada.
   >> Slot com n:null = vaga vazia reservada (ex.: futuras especiais).
   ============================================================ */

const CONFIG = {
  packsPerDay: 5,
  stickersPerPack: 5,
  envelopeImg: "assets/ui/Envelope_cromos.png",
};

// Pesos de raridade no sorteio (maior = mais comum)
const RARITY_WEIGHT = { comum: 22, rara: 8, lendaria: 3, especial: 3 };
const RARITY_LABEL = { comum: "Comum", rara: "Alternativa ✦", lendaria: "Lendária ★", especial: "Especial ✨" };

/* -------- Figurinhas -------- */
const STICKERS = [
  // Página TIME (uniforme oficial)
  { n: 1,  name: "Escudo CatScript", club: "Brasão Oficial",    rarity: "especial", img: "assets/stickers/card_catscript_especial.png" },
  { n: 2,  name: "Neymar Jr",  club: "CR Flamengo (BRA)",       rarity: "comum",    img: "assets/stickers/card_neymar.png" },
  { n: 3,  name: "JohNNy",     club: "CR Flamengo (BRA)",       rarity: "comum",    img: "assets/stickers/card_johnny.png" },
  { n: 4,  name: "Mônica",     club: "CatScript.NET",           rarity: "comum",    img: "assets/stickers/card_monica.png" },
  { n: 5,  name: "Anderson",   club: "CatScript.NET",           rarity: "comum",    img: "assets/stickers/card_anderson.png" },
  { n: 6,  name: "Mario",      club: "CatScript.NET",           rarity: "comum",    img: "assets/stickers/card_mario.png" },
  { n: 7,  name: "Tarcicio",   club: "CatScript.NET",           rarity: "comum",    img: "assets/stickers/card_tarcicio.png" },
  { n: 8,  name: "Matheus",    club: "CatScript.NET",           rarity: "comum",    img: "assets/stickers/card_matheus.png" },

  // Página UNIFORMES ALTERNATIVOS (pasta novas/)
  { n: 9,  name: "JohNNy",     club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/JOHNNY.png" },
  { n: 10, name: "Mônica",     club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/MONICA.png" },
  { n: 11, name: "Anderson",   club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/ANDERSON.png" },
  { n: 12, name: "Mario",      club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/MARIO.png" },
  { n: 13, name: "Tarcisio",   club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/TARCISIO.png" },
  { n: 14, name: "Matheus",    club: "Uniforme Alternativo",    rarity: "rara",     img: "assets/novas/MATHEUS.png" },

  // Página ESPECIAIS
  { n: 15, name: "Erling Haaland", club: "Lendária L-14 · Nº735", rarity: "lendaria", img: "assets/especiais/card_haaland_lendaria.png" },
  { n: 16, name: "Erling Haaland", club: "Especial · Noruega",    rarity: "especial", img: "assets/especiais/card_haaland_especial.png" },
  { n: 17, name: "Ricardo Coda",   club: "Especial",              rarity: "especial", img: "assets/especiais/card_ricardo_coda_especial.png" },

  // Novas ESPECIAIS (pasta especiais/) — ajuste nome/raridade à vontade
  { n: 18, name: "Endrick",              club: "Lendária",            rarity: "lendaria", img: "assets/especiais/card_endrick_especial.png" },
  { n: 19, name: "Endrick",              club: "Gandula · Especial",  rarity: "especial", img: "assets/especiais/card_endrick_gandula_especial.png" },
  { n: 20, name: "Tarcísio",             club: "Lendária",            rarity: "lendaria", img: "assets/especiais/card_tarcisio_especial.png" },
  { n: 21, name: "Vini Jr",              club: "Lendária",            rarity: "lendaria", img: "assets/especiais/card_vini_jr_especial.png" },
  { n: 22, name: "Ancelotti",            club: "Técnico · Especial",  rarity: "especial", img: "assets/especiais/card_especiais_novas_1.png" },
  { n: 23, name: "Dupla CatScript FC",   club: "Especial",            rarity: "especial", img: "assets/especiais/card_especiais_novas_2.png" },
  { n: 24, name: "Anderson vs Haaland",  club: "Especial",            rarity: "especial", img: "assets/especiais/card_especiais_novas_3.png" },
  { n: 25, name: "Gol do Brasil",        club: "Especial",            rarity: "especial", img: "assets/especiais/card_especiais_novas_4.png" },
  { n: 26, name: "Comemoração",          club: "Especial",            rarity: "especial", img: "assets/especiais/card_especiais_novas_5.png" },
  { n: 27, name: "Gatos Rivais",         club: "Especial",            rarity: "especial", img: "assets/especiais/card_especiais_novas_6.png" },
  { n: 28, name: "Atraso de Ração",      club: "Gato · Especial",     rarity: "especial", img: "assets/especiais/card_cats_especial_1.png" },
  { n: 29, name: "Gatinho",              club: "Gato · Especial",     rarity: "especial", img: "assets/especiais/card_cats_especial_2.png" },
  { n: 30, name: "Cara de Gato",         club: "Gato · Especial",     rarity: "especial", img: "assets/especiais/card_cats_especial_3.png" },
  { n: 31, name: "Gato Gritando",        club: "Gato · Especial",     rarity: "especial", img: "assets/especiais/card_cats_especial_4.png" },
  { n: 32, name: "Dupla de Gatos",       club: "Gato · Especial",     rarity: "especial", img: "assets/especiais/card_cats_especial_5.png" },
  { n: 33, name: "Thiago",               club: "Especial",            rarity: "especial", img: "assets/especiais/card_thiago_especial.png" },
  { n: 34, name: "Erling Haaland",       club: "Lendária II",         rarity: "lendaria", img: "assets/especiais/card_haaland_lendaria_2.png" },
  { n: 35, name: "Suzuki",               club: "Especial",            rarity: "especial", img: "assets/especiais/card_suzuki_especial.png" },
  { n: 36, name: "Erling Haaland",       club: "Especial II",         rarity: "especial", img: "assets/especiais/card_halaand_especial_2.png" },
];

/* -------- Retângulos das 7 molduras impressas do album_vazio.png (% da imagem) -------- */
const F = [
  { x: 39.8, y: 24.6, w: 26.1, h: 23.8 }, // 0 linha1-esq
  { x: 66.4, y: 24.6, w: 26.1, h: 23.8 }, // 1 linha1-dir
  { x: 0.7,  y: 50.2, w: 24.6, h: 21.3 }, // 2 linha2-1
  { x: 26.0, y: 50.2, w: 24.6, h: 21.3 }, // 3 linha2-2
  { x: 51.3, y: 50.2, w: 24.6, h: 21.3 }, // 4 linha2-3
  { x: 76.4, y: 50.2, w: 23.2, h: 21.3 }, // 5 linha2-4
  { x: 39.0, y: 73.4, w: 24.4, h: 21.2 }, // 6 linha3-destaque
];
const slot = (n, f) => ({ n, x: f.x, y: f.y, w: f.w, h: f.h });

/* -------- Grade das páginas ESPECIAIS: 12 molduras do album_especiais.png (4 col x 3 lin) --------
   espGrid(ns) monta os 12 slots; itens faltantes/null viram vagas vazias reservadas. */
function espGrid(ns) {
  const cols = [5.7, 28.3, 50.8, 73.4], rows = [18.8, 44.1, 69.2];
  const out = []; let i = 0;
  rows.forEach((y) => cols.forEach((x) => { out.push({ n: ns[i] != null ? ns[i] : null, x, y, w: 21.0, h: 23.6 }); i++; }));
  return out;
}
const ESP1 = espGrid([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]); // Especiais I (12 ocupadas)
const ESP2 = espGrid([27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);         // Especiais II (10 ocupadas + 2 reservadas)

/* -------- Páginas do álbum (livro) -------- */
const PAGES = [
  { type: "cover", title: "Capa", img: "assets/pages/capa_album.png" },

  { type: "album", title: "Time CatScript — Uniforme Oficial", img: "assets/pages/album_vazio_brasao_vazio.png", slots: [
    { n: 1, x: 10, y: 23.8, w: 26.2, h: 24.7 }, // Escudo (nº1) na moldura própria do brasão
    slot(2, F[0]), slot(3, F[1]), slot(4, F[2]), slot(5, F[3]), slot(6, F[4]), slot(7, F[5]), slot(8, F[6]),
  ]},

  { type: "album", title: "Uniformes Alternativos", img: "assets/pages/album_vazio.png", slots: [
    slot(9, F[0]), slot(10, F[1]), slot(11, F[2]), slot(12, F[3]), slot(13, F[4]), slot(14, F[5]),
    // F[6] (destaque) fica reservado p/ futuro
  ]},

  { type: "special", title: "Especiais", img: "assets/pages/album_especiais.png", slots: ESP1 },
  { type: "special", title: "Especiais II", img: "assets/pages/album_especiais.png", slots: ESP2 },
];
