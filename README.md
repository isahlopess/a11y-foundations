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
2. **Parte 2 (O Produto):** Aplicação web desenvolvida com **HTML5 Semântico**, **CSS3 Avançado** e **Vanilla JS puro**, com layout fluido expansivo (até 1580px), barra de progresso de scroll, efeitos de revelação suave, imagens contextuais de hardware assistivo e ferramentas interativas.

---

## 🚀 Ferramentas Interativas Implementadas

- **Barra de Progresso de Leitura:** Indicador visual de rolagem no topo da tela em tom azul sólido de alta visibilidade.
- **Efeitos de Revelação Suave (Scroll Reveals):** Transições suaves à medida que as seções surgem no campo de visão (com suporte estrito a `prefers-reduced-motion`).
- **ScrollSpy Ativo na Navbar:** Identificação luminosa da seção atualmente visível durante a navegação.
- **Calculadora Interativa de Contraste WCAG 2.2:** Permite ao desenvolvedor selecionar cores em tempo real e calcular a razão matemática exata de luminância relativa com veredito para os níveis AA e AAA.
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
