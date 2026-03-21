#!/usr/bin/env node
/**
 * Extrai um quadro de pre-visualizacao de cada GIF de demonstracao para inspecao visual rapida.
 * Salva quadros PNG individuais no diretorio demo-previews/.
 *
 * Requisitos: ffmpeg, gifsicle
 *
 * Uso:
 *   node preview-gifs.js            # padrao: 3s antes do fim
 *   node preview-gifs.js --before 5 # 5s antes do fim
 */

const { execFileSync } = require('child_process');
const { readdirSync, existsSync, mkdirSync, rmSync } = require('fs');
const { join, basename } = require('path');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioPreview = join(diretorioRaiz, 'demo-previews');
const argumentosCLI = process.argv.slice(2);
const BARRA = '━'.repeat(66);

let segundosAntes = 3;

for (let i = 0; i < argumentosCLI.length; i++) {
  if (argumentosCLI[i] === '--before' && argumentosCLI[i + 1]) {
    segundosAntes = parseFloat(argumentosCLI[++i]);
  }
}

function encontrarGifs() {
  const gifs = [];

  for (const entrada of readdirSync(diretorioRaiz)) {
    if (!/^\d{2}-/.test(entrada)) continue;

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

function obterAtrasosDosQuadros(caminhoGif) {
  const saida = execFileSync('gifsicle', ['--info', caminhoGif], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore']
  });

  const atrasos = [];
  const regexAtraso = /delay (\d+(?:\.\d+)?)s/g;
  let correspondencia;

  while ((correspondencia = regexAtraso.exec(saida)) !== null) {
    atrasos.push(parseFloat(correspondencia[1]));
  }

  return atrasos;
}

function quadroAosSegundosAntesDoFim(atrasos, segundos) {
  const tempoTotal = atrasos.reduce((a, b) => a + b, 0);
  const tempoAlvo = tempoTotal - segundos;

  if (tempoAlvo <= 0) {
    return 0;
  }

  let acumulativo = 0;
  for (let i = 0; i < atrasos.length; i++) {
    acumulativo += atrasos[i];
    if (acumulativo >= tempoAlvo) {
      return i;
    }
  }

  return atrasos.length - 1;
}

if (existsSync(diretorioPreview)) {
  rmSync(diretorioPreview, { recursive: true, force: true });
}
mkdirSync(diretorioPreview, { recursive: true });

const gifs = encontrarGifs();
if (gifs.length === 0) {
  console.log('⚠️ Nenhum GIF de demonstracao encontrado.');
  process.exit(0);
}

console.log(`🖼️ Extraindo quadros (${segundosAntes}s antes do fim) de ${gifs.length} GIF(s)\n`);

let contagem = 0;
for (const { caminho: gif, capitulo } of gifs) {
  const nome = basename(gif, '.gif');
  const atrasos = obterAtrasosDosQuadros(gif);
  const indiceDoQuadro = quadroAosSegundosAntesDoFim(atrasos, segundosAntes);
  const prefixo = capitulo.replace(/^(\d+)-.+/, '$1');
  const nomeDeSaida = `${prefixo}-${nome}.png`;
  const caminhoDeSaida = join(diretorioPreview, nomeDeSaida);

  try {
    execFileSync('ffmpeg', [
      '-y',
      '-i', gif,
      '-vf', `select=eq(n\\,${indiceDoQuadro})`,
      '-vframes', '1',
      '-update', '1',
      caminhoDeSaida
    ], {
      stdio: ['ignore', 'ignore', 'ignore']
    });

    console.log(`✅ ${nomeDeSaida} (quadro #${indiceDoQuadro}/${atrasos.length})`);
    contagem++;
  } catch {
    console.log(`❌ ${nome}: extracao falhou`);
  }
}

console.log(`\n${BARRA}`);
console.log(`✅ ${contagem} quadro(s) de pre-visualizacao salvo(s) em demo-previews/`);
console.log(BARRA);
console.log('\n👉 Abrir no Explorer/Finder: demo-previews/');
