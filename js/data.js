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
  packsPerDay: 10,
  stickersPerPack: 5,
  envelopeImg: "assets/ui/Envelope_cromos.png",
};

// Pesos de raridade no sorteio (maior = mais comum)
const RARITY_WEIGHT = { comum: 22, rara: 8, lendaria: 3, especial: 3, extra: 2 };
const RARITY_LABEL = { comum: "Comum", rara: "Alternativa ✦", lendaria: "Lendária ★", especial: "Especial ✨", extra: "Legend Extra 🌈" };

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
  { n: 43, name: "Copa Spassu 2026", club: "Logo Oficial",     rarity: "rara",     img: "assets/stickers/logo_copa_spassu.png" },

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
  { n: 37, name: "Cristiano Ronaldo",    club: "Especial · Al Nassr",  rarity: "especial", img: "assets/especiais/card_cristiano_especial.png" },
  { n: 38, name: "Eu Sou Lindo",         club: "Especial",            rarity: "especial", img: "assets/especiais/card_eu_sou_lindo_especial.png" },
  { n: 39, name: "Lionel Messi",         club: "Especial",            rarity: "lendaria", img: "assets/especiais/card_messi_especial.png" },
  { n: 41, name: "Neymar Jr",            club: "Especial",            rarity: "lendaria", img: "assets/especiais/card_neymar_especial.png" },
  { n: 55, name: "Pedro",                club: "Special Collection Guest", rarity: "especial", img: "assets/especiais/card_pedro_especial.png" },
  { n: 56, name: "Endrick & Ancelotti",  club: "Especial",            rarity: "especial", img: "assets/especiais/card_endrick_ancelotti_especial.png" },
  { n: 57, name: "Haaland & Vini Jr",    club: "Especial",            rarity: "especial", img: "assets/especiais/card_halaand_vini_special.png" },
  { n: 58, name: "Princesa",             club: "Especial",            rarity: "lendaria", img: "assets/especiais/card_princesa_especial.png" },
  { n: 59, name: "Neymar",               club: "Edição Hidratação",   rarity: "especial", img: "assets/especiais/card_neymar_hidra_especial.png" },
  { n: 60, name: "Vini Jr",              club: "Edição Hidratação",   rarity: "especial", img: "assets/especiais/card_vini_hidra_especial.png" },
  { n: 61, name: "Casemiro",             club: "Edição Hidratação",   rarity: "especial", img: "assets/especiais/card_casemiro_hidra_especial.png" },
  { n: 62, name: "Cry Harold",           club: "Especial",            rarity: "especial", img: "assets/especiais/card_cry_harold_especial.png" },
  { n: 63, name: "Mbappé",               club: "Especial",            rarity: "lendaria", img: "assets/especiais/card_mbappe_especial.png" },
  { n: 64, name: "Mônica II",            club: "Especial",            rarity: "especial", img: "assets/especiais/card_monica_especial_2.png" },
  { n: 65, name: "Transbordar",          club: "Especial",            rarity: "especial", img: "assets/especiais/card_transbordar_especial.png" },
  { n: 66, name: "Carol",                club: "Especial",            rarity: "especial", img: "assets/especiais/card_carol_especial.png" },
  { n: 67, name: "Querida, o Polvo Paul", club: "Memes Mundiais · Nº017", rarity: "especial", img: "assets/especiais/card_querida_paul_especial.png" },
  { n: 68, name: "Cat Poker Face",       club: "Meme Extra · M-07",   rarity: "especial", img: "assets/especiais/card_cat_poker_especial.png" },

  // Página LEGENDS EXTRA (pasta extras/) — raridade "extra" com brilho holográfico
  { n: 40, name: "Bruna",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_bruna_extra.png" },
  { n: 42, name: "Piloto DevOps",        club: "Legends Extra · Nº124", rarity: "extra", img: "assets/extras/card_piloto_extra.png" },
  { n: 44, name: "Amora",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_amora_extra.png" },
  { n: 45, name: "Aurora",               club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_aurora_extra.png" },
  { n: 46, name: "Bagheera",             club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_bagheera_extra.png" },
  { n: 47, name: "Bruna II",             club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_bruna_extra_2.png" },
  { n: 48, name: "Café",                 club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_cafe_extra.png" },
  { n: 49, name: "Cuscuz",               club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_cuscuz_extra.png" },
  { n: 50, name: "Mario",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_mario_extra.png" },
  { n: 51, name: "Risso",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_risso_extra.png" },
  { n: 52, name: "Sakura",               club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_sakura_extra.png" },
  { n: 53, name: "UFC",                  club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_ufc_extra.png" },
  { n: 54, name: "Wesley",               club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_wesley_extra.png" },
  { n: 69, name: "Jorge",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_jorge_extra.png" },
  { n: 70, name: "Bom",                  club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_bom_extra.jpg" },
  { n: 71, name: "Carol",                club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_carol_extra.png" },
  { n: 72, name: "Mônica",               club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_monica_extra.png" },
  { n: 73, name: "Risso II",             club: "Legends Extra",         rarity: "extra", img: "assets/extras/card_risso_extra_2.png" },
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
const ESP2 = espGrid([27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]); // Especiais II (12 ocupadas — completa)
const ESP3 = espGrid([39, 41, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]); // Especiais III (12 — completa)
const ESP4 = espGrid([65, 66, 67, 68]);                                 // Especiais IV (4 ocupadas + 8 reservadas)
const EXTRA = espGrid([40, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53]); // Legends Extra (12 — completa)
const EXTRA2 = espGrid([54, 69, 70, 71, 72, 73]);                        // Legends Extra II (6 ocupadas + 6 reservadas)

/* -------- Páginas do álbum (livro) -------- */
const PAGES = [
  { type: "cover", title: "Capa", img: "assets/pages/capa_album.png" },

  { type: "album", title: "Time CatScript — Uniforme Oficial", img: "assets/pages/album_vazio_brasao_vazio.png", slots: [
    { n: 1, x: 10, y: 23.8, w: 26.2, h: 24.7 }, // Escudo (nº1) na moldura própria do brasão
    slot(2, F[0]), slot(3, F[1]), slot(4, F[2]), slot(5, F[3]), slot(6, F[4]), slot(7, F[5]), slot(8, F[6]),
  ]},

  { type: "album", title: "Uniformes Alternativos", img: "assets/pages/album_vazio.png", slots: [
    slot(9, F[0]), slot(10, F[1]), slot(11, F[2]), slot(12, F[3]), slot(13, F[4]), slot(14, F[5]), slot(43, F[6]),
  ]},

  { type: "special", title: "Especiais", img: "assets/pages/album_especiais.png", slots: ESP1 },
  { type: "special", title: "Especiais II", img: "assets/pages/album_especiais.png", slots: ESP2 },
  { type: "special", title: "Especiais III", img: "assets/pages/album_especiais.png", slots: ESP3 },
  { type: "special", title: "Especiais IV", img: "assets/pages/album_especiais.png", slots: ESP4 },
  { type: "special", title: "Legends Extra", img: "assets/pages/album_extras.png", slots: EXTRA },
  { type: "special", title: "Legends Extra II", img: "assets/pages/album_extras.png", slots: EXTRA2 },
];
