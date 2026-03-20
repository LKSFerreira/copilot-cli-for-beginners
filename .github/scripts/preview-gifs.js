#!/usr/bin/env node
/**
 * Extrai um quadro (frame) de pré-visualização de cada GIF de demonstração para inspeção visual rápida.
 * Salva quadros PNG individuais no diretório demo-previews/.
 *
 * Requisitos: ffmpeg, gifsicle (para informações de atraso de quadros)
 *
 * Uso:
 *   node preview-gifs.js                  # padrão: 3s antes do fim
 *   node preview-gifs.js --before 5       # 5s antes do fim
 */

const { execSync } = require('child_process');
const { readdirSync, existsSync, mkdirSync, rmSync } = require('fs');
const { join, basename } = require('path');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioPreview = join(diretorioRaiz, 'demo-previews');

// Analisar argumentos CLI
const argumentosCLI = process.argv.slice(2);
let segundosAntes = 3;

for (let i = 0; i < argumentosCLI.length; i++) {
  if (argumentosCLI[i] === '--before' && argumentosCLI[i + 1]) {
    segundosAntes = parseFloat(argumentosCLI[++i]);
  }
}

// Encontrar todos os GIFs de demonstração
function encontrarGifs() {
  const gifs = [];
  for (const entrada of readdirSync(diretorioRaiz)) {
    if (!/^\\d{2}-/.test(entrada)) continue;
    const diretorioImagens = join(diretorioRaiz, entrada, 'images');
    if (!existsSync(diretorioImagens)) continue;
    for (const arquivo of readdirSync(diretorioImagens)) {
      if (arquivo.endsWith('-demo.gif')) {
        gifs.push({ caminho: join(diretorioImagens, arquivo), capitulo: entrada });
      }
    }
  }
  return gifs.sort((a, b) => a.caminho.localeCompare(b.caminho));
}

// Obter os atrasos (delays) dos quadros a partir de um GIF
function obterAtrasosDosQuadros(caminhoGif) {
  const saida = execSync(`gifsicle --info "${caminhoGif}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  const atrasos = [];
  const regexAtraso = /delay (\\d+(?:\\.\\d+)?)s/g;
  let correspondencia;
  while ((correspondencia = regexAtraso.exec(saida)) !== null) {
    atrasos.push(parseFloat(correspondencia[1]));
  }
  return atrasos;
}

// Encontrar índice do quadro N segundos antes do final
function quadroAosSegundosAntesDoFim(atrasos, segundos) {
  const tempoTotal = atrasos.reduce((a, b) => a + b, 0);
  const tempoAlvo = tempoTotal - segundos;
  if (tempoAlvo <= 0) return 0;

  let acumulativo = 0;
  for (let i = 0; i < atrasos.length; i++) {
    acumulativo += atrasos[i];
    if (acumulativo >= tempoAlvo) return i;
  }
  return atrasos.length - 1;
}

// Principal
if (existsSync(diretorioPreview)) rmSync(diretorioPreview, { recursive: true });
mkdirSync(diretorioPreview, { recursive: true });

const gifs = encontrarGifs();
if (gifs.length === 0) {
  console.log('Nenhum GIF de demonstração encontrado');
  process.exit(0);
}

console.log(`\\nExtraindo quadros (${segundosAntes}s antes do fim) de ${gifs.length} GIFs...\\n`);

let contagem = 0;
for (const { caminho: gif, capitulo } of gifs) {
  const nome = basename(gif, '.gif');
  const atrasos = obterAtrasosDosQuadros(gif);
  const indiceDoQuadro = quadroAosSegundosAntesDoFim(atrasos, segundosAntes);
  const prefixo = capitulo.replace(/^(\\d+)-.+/, '$1');
  const nomeDeSaida = `${prefixo}-${nome}.png`;
  const caminhoDeSaida = join(diretorioPreview, nomeDeSaida);

  try {
    execSync(
      `ffmpeg -y -i "${gif}" -vf "select=eq(n\\\\,${indiceDoQuadro})" -vframes 1 -update 1 "${caminhoDeSaida}" 2>/dev/null`,
      { stdio: 'pipe' }
    );
    console.log(`  ✓ ${nomeDeSaida} (quadro #${indiceDoQuadro}/${atrasos.length})`);
    contagem++;
  } catch (e) {
    console.log(`  ✗ ${nome}: extração falhou`);
  }
}

console.log(`\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✓ ${contagem} quadros de pré-visualização salvos em demo-previews/`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\\nAbrir no Finder/Explorer: open demo-previews/`);
