# a11y-foundations ♿

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Standards: WCAG 2.2 AAA/AA](https://img.shields.io/badge/Standards-WCAG%202.2%20AAA%2FAA-brightgreen.svg)](https://www.w3.org/TR/WCAG22/)
[![UFMS: AV2 Extensão](https://img.shields.io/badge/UFMS-Extens%C3%A3o%2010h-blueviolet.svg)](https://www.ufms.br)

> **Guia Interativo e Autoral de Acessibilidade em Sistemas Digitais: Garantindo a Inclusão Digital para Pessoas com Deficiência Visual e Motora.**  
> *Projeto acadêmico avaliativo (AV2) e produto de extensão da Universidade Federal de Mato Grosso do Sul (UFMS).*

---

## 🏛️ Dados Acadêmicos Oficiais

- **Instituição:** Universidade Federal de Mato Grosso do Sul (UFMS)
- **Unidade:** Faculdade de Computação (FACOM)
- **Curso:** **Engenharia de Computação**
- **Disciplina:** Introdução à Computação
- **Docente Responsável:** Profª. Dra. Graziela Santos de Araujo
- **Equipe Discente:** 
  - **Isadora Fernandes Lopes**
  - **Natan Benites Arinos**
- **Data da Entrega:** 03 de novembro de 2026

---

## 🎯 Proposta do Projeto e Conexão com a Engenharia

O **a11y-foundations** conecta a teoria e a prática da Engenharia de Computação: desde o hardware assistivo e protocolos de interface humana (USB HID) até a compilação do DOM na Árvore de Acessibilidade (AOM) do navegador.

O repositório está dividido em duas frentes complementares:
1. **Parte 1 (A Pesquisa):** Documentação científica em **LaTeX** no diretório [`latex/`](latex/), estruturada com fundamentação técnica, pergunta de pesquisa, embasamento legal (LBI nº 13.146/2015, WCAG 2.2 e eMAG v3.1), análise crítica na Engenharia de Computação e seção de transparência e ética no uso de IA.
2. **Parte 2 (O Produto):** Aplicação web desenvolvida com **HTML5 Semântico**, **CSS3 Avançado** e **Vanilla JS puro**, com layout fluido expansivo (até 1750px), barra de progresso de scroll, efeitos de revelação suave, imagens contextuais de hardware assistivo e ferramentas interativas.

---

## 🚀 Ferramentas Interativas e Recursos Implementados

- **Casos Reais Documentados na Computação:** Estudos de caso fundamentados com a Dra. Chieko Asakawa (inventora do *IBM Home Page Reader* e IBM Fellow), Lucas Radaelli (Tech Lead no Google), Dr. Stephen Hawking (*Intel ACAT*) e Christopher Hills (*Switch Access* USB HID), acompanhados do precedente da Suprema Corte dos EUA (*Robles v. Domino's Pizza, 2019*).
- **Metadados Censitários e Fontes Oficiais Datadas:** Citações formais da PNAD Contínua 2022 (IBGE, jul/2023 • 18,6M de cidadãos), Censo Web para Todos / BigDataCorp 2023–2024 (< 1,5% de sites acessíveis) e auditoria técnica automatizada com Google Lighthouse v12 e axe-core v4.8 (100/100 em nov/2026).
- **Sintetizador de Voz Nativo (Web Speech API pt-BR):** Narração auditiva ao vivo para navegação por teclado (<kbd>Tab</kbd>), cliques e exploração via mouse.
- **Simulador de Tremor Motor (Espasmos / Perda de Controle Fino):** Emulação estocástica de cursor oscilante (<kbd>Alt</kbd> + <kbd>M</kbd>) demonstrando a dependência do protocolo HID e da área mínima de toque (WCAG 2.2 Target Size).
- **Bancada de Engenharia AOM (Accessibility Object Model):** Visualizador interativo em duas colunas comparando o código HTML5 e o nó compilado na Árvore de Acessibilidade com vereditos técnicos.
- **Simulador Óptico de Condições Visuais:** Simulação em tempo real na raiz do DOM para baixa acuidade (blur), daltonismos (protanopia/deuteranopia), visão tubular (glaucoma) e escotoma central (degeneração macular).
- **Calculadora Interativa de Contraste WCAG 2.2:** Cálculo matemático exato da razão de luminância relativa com veredito para os níveis AA e AAA.
- **Simulador Interativo de Entrada de Teclado (HID):** Emulador visual dos sinais de tecla `Tab`, `Shift + Tab`, `Enter` e `Reset`, demonstrando o deslocamento do anel de foco ininterrupto (`:focus-visible`).
- **Painel Lateral Expansivo de Acessibilidade (Drawer):** Acesso a alternadores de alto contraste, modo monocromático, escala tipográfica (`rem`) e modo de leitura ampla.
- **Laboratório de Batalha de IDEs:** Comparação direta de código entre anti-patterns e HTML semântico com validação ao vivo via `aria-live`.

---

## 📁 Estrutura de Pastas

```text
a11y-foundations/
├── index.html              # O Produto: Guia web acessível, interativo e documentado
├── css/
│   └── style.css           # Estilos expandidos, tokens de contraste e efeitos de scroll
├── js/
│   └── accessibility.js    # Controlador: calculadora, simulador HID, drawer e scrollspy
│
├── latex/                  # A Pesquisa em Engenharia de Computação (UFMS AV2)
│   ├── main.tex            # Artigo acadêmico completo com fundamentação e ética
│   └── referencias.bib     # Referências bibliográficas (WCAG, eMAG, LBI, livros)
│
├── .gitignore              # Ignora builds de LaTeX, arquivos de IDE (.idea) e logs
├── LICENSE                 # Licença aberta MIT
└── README.md               # Documentação técnica e acadêmica do projeto
```

---

## 💻 Como Executar Localmente

No Laragon:
1. Inicie os serviços (**Start All**).
2. Acesse no navegador:
   ```text
   http://a11y-foundations.test
   ```
*(Ou abra diretamente o arquivo `index.html` em qualquer navegador web).*

---

## 📜 Licença e Créditos

- **Autores:** Isadora Fernandes Lopes & Natan Benites Arinos (Engenharia de Computação • FACOM / UFMS).
- **Docente:** Profª. Dra. Graziela Santos de Araujo.
- **Licença:** Código aberto sob os termos da **MIT License**.
