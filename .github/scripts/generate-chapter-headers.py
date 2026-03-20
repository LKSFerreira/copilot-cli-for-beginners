#!/usr/bin/env python3
"""
Gera as imagens de cabeçalho dos capítulos com textos integrados.
Uso: python .github/scripts/generate-chapter-headers.py
"""

from PIL import Image, ImageDraw, ImageFont
import os
import sys

# Configuração
CAPITULOS = {
    "00-quick-start": "Capítulo 00: Início Rápido",
    "01-setup-and-first-steps": "Capítulo 01: Primeiros Passos",
    "02-context-conversations": "Capítulo 02: Contexto e Conversas",
    "03-development-workflows": "Capítulo 03: Fluxos de Desenvolvimento",
    "04-agents-custom-instructions": "Capítulo 04: Agentes e Instruções Personalizadas",
    "05-skills": "Capítulo 05: Sistema de Skills",
    "06-mcp-servers": "Capítulo 06: Servidores MCP",
    "07-putting-it-together": "Capítulo 07: Juntando Tudo",
}

# Obter raiz do projeto (parente da pasta de scripts)
DIRETORIO_DO_SCRIPT = os.path.dirname(os.path.abspath(__file__))
RAIZ_DO_PROJETO = os.path.dirname(os.path.dirname(DIRETORIO_DO_SCRIPT))
IMAGEM_DE_FUNDO = os.path.join(RAIZ_DO_PROJETO, "images", "chapter-header-bg.png")

# Configurações de fonte - 25% maior que o original de 36px
TAMANHO_DA_FONTE = 45
PREENCHIMENTO_DIREITO = 30


def encontrar_fonte():
    """Encontra uma fonte de sistema adequada."""
    caminhos_de_fontes = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSMono.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",  # Linux
        "C:\\Windows\\Fonts\\arial.ttf",  # Windows
    ]

    for caminho_fonte in caminhos_de_fontes:
        if os.path.exists(caminho_fonte):
            try:
                return ImageFont.truetype(caminho_fonte, TAMANHO_DA_FONTE)
            except Exception:
                continue

    print("Aviso: Usando fonte padrão (pode parecer diferente)")
    return ImageFont.load_default()


def gerar_cabecalho(pasta_do_capitulo, titulo, fonte):
    """Gera uma imagem de cabeçalho para um capítulo."""
    # Carregar fundo
    fundo = Image.open(IMAGEM_DE_FUNDO)
    fundo = fundo.convert("RGB")
    desenho = ImageDraw.Draw(fundo)

    largura, altura = fundo.size

    # Posição X mínima para evitar sobreposição com o logo do copilot (logo tem aprox. 320px de largura)
    POSICAO_X_MINIMA = 350

    # Calcular largura do texto para o título completo
    caixa_de_texto = desenho.textbbox((0, 0), titulo, font=fonte)
    largura_do_texto = caixa_de_texto[2] - caixa_de_texto[0]
    altura_do_texto = caixa_de_texto[3] - caixa_de_texto[1]

    x = largura - largura_do_texto - PREENCHIMENTO_DIREITO

    # Verificar se o texto se sobrepõe ao logo
    if x < POSICAO_X_MINIMA:
        # Precisamos de quebra de linha - dividir no dois pontos
        if ": " in titulo:
            linha1, linha2 = titulo.split(": ", 1)
            linha1 = linha1 + ":"
        else:
            # Em último caso: dividir no espaço do meio
            palavras = titulo.split()
            meio = len(palavras) // 2
            linha1 = " ".join(palavras[:meio])
            linha2 = " ".join(palavras[meio:])

        # Calcular dimensões de ambas as linhas
        caixa1 = desenho.textbbox((0, 0), linha1, font=fonte)
        caixa2 = desenho.textbbox((0, 0), linha2, font=fonte)

        largura_linha1 = caixa1[2] - caixa1[0]
        largura_linha2 = caixa2[2] - caixa2[0]
        altura_da_linha = caixa1[3] - caixa1[1]

        # Espaçamento entre linhas
        espaco_entre_linhas = 5
        altura_total = altura_da_linha * 2 + espaco_entre_linhas

        # Alinhar à direita ambas as linhas
        x1 = largura - largura_linha1 - PREENCHIMENTO_DIREITO
        x2 = largura - largura_linha2 - PREENCHIMENTO_DIREITO

        # Centralizar verticalmente as duas linhas
        y1 = (altura - altura_total) // 2
        y2 = y1 + altura_da_linha + espaco_entre_linhas

        # Desenhar as duas linhas
        desenho.text((x1, y1), linha1, fill=(255, 255, 255), font=fonte)
        desenho.text((x2, y2), linha2, fill=(255, 255, 255), font=fonte)
    else:
        # Linha única - tem um encaixe bom
        y = (altura - altura_do_texto) // 2
        desenho.text((x, y), titulo, fill=(255, 255, 255), font=fonte)

    # Slvar na pasta de imagens do capítulo correspondente
    diretorio_de_saida = os.path.join(RAIZ_DO_PROJETO, pasta_do_capitulo, "images")
    os.makedirs(diretorio_de_saida, exist_ok=True)

    caminho_de_saida = os.path.join(diretorio_de_saida, "chapter-header.png")
    fundo.save(caminho_de_saida)

    return caminho_de_saida


def principal():
    print("Gerando cabeçalhos dos capítulos...")
    print(f"Fundo (Background): {IMAGEM_DE_FUNDO}")
    print(f"Tamanho da fonte: {TAMANHO_DA_FONTE}px")
    print()

    if not os.path.exists(IMAGEM_DE_FUNDO):
        print(f"Erro: Imagem de fundo não encontrada: {IMAGEM_DE_FUNDO}")
        sys.exit(1)

    fonte = encontrar_fonte()

    for pasta_do_capitulo, titulo in CAPITULOS.items():
        caminho_do_capitulo = os.path.join(RAIZ_DO_PROJETO, pasta_do_capitulo)
        if not os.path.exists(caminho_do_capitulo):
            print(f"  Pulando {pasta_do_capitulo} (pasta não foi encontrada)")
            continue

        caminho_de_saida = gerar_cabecalho(pasta_do_capitulo, titulo, fonte)
        print(f"  {titulo}")
        print(f"    -> {os.path.relpath(caminho_de_saida, RAIZ_DO_PROJETO)}")

    print()
    print("Concluído! Cabeçalhos gerados para todos os capítulos.")


if __name__ == "__main__":
    principal()
