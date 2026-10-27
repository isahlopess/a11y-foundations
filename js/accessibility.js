document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initAccessibilityDrawer();
  initContrastOptions();
  initTypographyEngine();
  initReadingAids();
  initLiveContrastCalculator();
  initKeyboardSimulator();
  initInteractiveFormDemo();
  initSpeechSynthesizer();
  initVisionSimulator();
  initAomInspector();
  initModalsAndShortcuts();
  initAnimatedCounters();
});

function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const navAnchors = document.querySelectorAll('.nav-anchor');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && progressBar) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(anchor => {
            if (anchor.getAttribute('href') === `#${id}`) {
              anchor.classList.add('is-active');
            } else {
              anchor.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => spyObserver.observe(sec));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

function initAccessibilityDrawer() {
  const triggerBtn = document.getElementById('btn-open-a11y-drawer');
  const drawer = document.getElementById('a11y-lateral-drawer');
  const backdrop = document.getElementById('a11y-drawer-backdrop');
  const closeBtn = document.getElementById('btn-close-a11y-drawer');
  const announcer = document.getElementById('global-a11y-announcer');

  if (!triggerBtn || !drawer || !backdrop || !closeBtn) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    triggerBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    announce(announcer, 'Painel lateral de preferências de acessibilidade aberto.');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    triggerBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    triggerBtn.focus();
    announce(announcer, 'Painel lateral de acessibilidade fechado.');
  }

  triggerBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

function initContrastOptions() {
  const highContrastBtn = document.getElementById('tool-high-contrast');
  const monochromeBtn = document.getElementById('tool-monochrome');
  const announcer = document.getElementById('global-a11y-announcer');

  if (localStorage.getItem('a11y-theme-contrast') === 'active') {
    document.body.classList.add('high-contrast-mode');
    if (highContrastBtn) highContrastBtn.setAttribute('aria-pressed', 'true');
  }

  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      const isActive = document.body.classList.toggle('high-contrast-mode');
      highContrastBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      localStorage.setItem('a11y-theme-contrast', isActive ? 'active' : 'inactive');

      announce(announcer, isActive
        ? 'Modo de alto contraste preto e amarelo ativado.'
        : 'Modo de alto contraste desativado.');
    });
  }

  if (monochromeBtn) {
    monochromeBtn.addEventListener('click', () => {
      const isMono = document.documentElement.classList.toggle('monochrome-mode');
      monochromeBtn.setAttribute('aria-pressed', isMono ? 'true' : 'false');
      announce(announcer, isMono
        ? 'Visualização monocromática ativada.'
        : 'Cores padrão restauradas.');
    });
  }
}

function initTypographyEngine() {
  const btnInc = document.getElementById('tool-font-inc');
  const btnDec = document.getElementById('tool-font-dec');
  const btnReset = document.getElementById('tool-font-reset');
  const announcer = document.getElementById('global-a11y-announcer');

  let scale = 1.0;
  const minScale = 0.85;
  const maxScale = 1.45;
  const step = 0.1;

  function setScale(newScale, msg) {
    scale = Math.min(Math.max(newScale, minScale), maxScale);
    document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
    announce(announcer, `Escala tipográfica ${msg}. Tamanho atual: ${Math.round(scale * 100)}%.`);
  }

  if (btnInc) btnInc.addEventListener('click', () => setScale(scale + step, 'aumentada'));
  if (btnDec) btnDec.addEventListener('click', () => setScale(scale - step, 'reduzida'));
  if (btnReset) btnReset.addEventListener('click', () => setScale(1.0, 'redefinida para 100%'));
}

function initReadingAids() {
  const spaciousBtn = document.getElementById('tool-spacious-text');
  const highlightLinksBtn = document.getElementById('tool-highlight-links');
  const announcer = document.getElementById('global-a11y-announcer');

  if (spaciousBtn) {
    spaciousBtn.addEventListener('click', () => {
      const isSpacious = document.body.classList.toggle('spacious-text');
      spaciousBtn.setAttribute('aria-pressed', isSpacious ? 'true' : 'false');
      announce(announcer, isSpacious
        ? 'Modo de leitura com espaçamento amplo entre linhas ativado.'
        : 'Espaçamento padrão restaurado.');
    });
  }

  if (highlightLinksBtn) {
    highlightLinksBtn.addEventListener('click', () => {
      const isHighlighted = document.body.classList.toggle('highlight-links');
      highlightLinksBtn.setAttribute('aria-pressed', isHighlighted ? 'true' : 'false');
      announce(announcer, isHighlighted
        ? 'Todos os hiperlinks da página foram destacados visualmente.'
        : 'Destaque visual de links desativado.');
    });
  }
}

function initLiveContrastCalculator() {
  const textColorInput = document.getElementById('calc-text-color');
  const bgColorInput = document.getElementById('calc-bg-color');
  const ratioDisplay = document.getElementById('calc-ratio-value');
  const badgeAA = document.getElementById('calc-badge-aa');
  const badgeAAA = document.getElementById('calc-badge-aaa');
  const previewBox = document.getElementById('calc-preview-container');

  if (!textColorInput || !bgColorInput || !ratioDisplay || !previewBox) return;

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function updateContrast() {
    const cText = textColorInput.value;
    const cBg = bgColorInput.value;

    const rgbText = hexToRgb(cText);
    const rgbBg = hexToRgb(cBg);

    const l1 = getLuminance(rgbText);
    const l2 = getLuminance(rgbBg);

    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    ratioDisplay.textContent = `${ratio.toFixed(2)}:1`;
    previewBox.style.backgroundColor = cBg;
    previewBox.style.color = cText;

    if (ratio >= 4.5) {
      badgeAA.className = 'pill-status pass';
      badgeAA.textContent = 'WCAG AA: APROVADO';
    } else {
      badgeAA.className = 'pill-status fail';
      badgeAA.textContent = 'WCAG AA: REPROVADO';
    }

    if (ratio >= 7.0) {
      badgeAAA.className = 'pill-status pass';
      badgeAAA.textContent = 'WCAG AAA: APROVADO';
    } else {
      badgeAAA.className = 'pill-status fail';
      badgeAAA.textContent = 'WCAG AAA: REPROVADO';
    }
  }

  textColorInput.addEventListener('input', updateContrast);
  bgColorInput.addEventListener('input', updateContrast);
  updateContrast();
}

function initKeyboardSimulator() {
  const btnSimTab = document.getElementById('sim-key-tab');
  const btnSimShiftTab = document.getElementById('sim-key-shifttab');
  const btnSimEnter = document.getElementById('sim-key-enter');
  const btnSimReset = document.getElementById('sim-key-reset');
  const targets = document.querySelectorAll('.sandbox-target');
  const announcer = document.getElementById('global-a11y-announcer');
  const toast = document.getElementById('sim-custom-toast');
  const toastDesc = document.getElementById('sim-toast-desc');
  const toastClose = document.getElementById('btn-close-sim-toast');

  if (!btnSimTab || targets.length === 0) return;

  let currentIndex = -1;
  let toastTimer = null;

  function showCustomToast(message) {
    if (!toast || !toastDesc) return;
    toastDesc.textContent = message;
    toast.removeAttribute('hidden');

    void toast.offsetWidth;
    toast.classList.add('is-active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      closeCustomToast();
    }, 4500);
  }

  function closeCustomToast() {
    if (!toast) return;
    toast.classList.remove('is-active');
    setTimeout(() => {
      if (!toast.classList.contains('is-active')) {
        toast.setAttribute('hidden', '');
      }
    }, 280);
  }

  if (toastClose) {
    toastClose.addEventListener('click', closeCustomToast);
  }

  function setFocus(index) {
    targets.forEach(t => t.classList.remove('is-focused'));
    if (index >= 0 && index < targets.length) {
      currentIndex = index;
      targets[currentIndex].classList.add('is-focused');
      targets[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const label = targets[currentIndex].getAttribute('data-sim-label') || targets[currentIndex].textContent.trim();
      announce(announcer, `Foco no elemento: ${label}.`);
    } else {
      currentIndex = -1;
    }
  }

  btnSimTab.addEventListener('click', () => {
    let next = currentIndex + 1;
    if (next >= targets.length) next = 0;
    setFocus(next);
  });

  btnSimShiftTab.addEventListener('click', () => {
    let prev = currentIndex - 1;
    if (prev < 0) prev = targets.length - 1;
    setFocus(prev);
  });

  btnSimEnter.addEventListener('click', () => {
    if (currentIndex >= 0 && currentIndex < targets.length) {
      const label = targets[currentIndex].getAttribute('data-sim-label') || targets[currentIndex].textContent.trim();
      announce(announcer, `Ação disparada no elemento: ${label}.`);
      showCustomToast(`Ação disparada com sucesso no elemento: "${label}" via sinal de tecla Enter.`);
    } else {
      showCustomToast('Pressione TAB para focar em um componente antes de disparar a ação com Enter.');
    }
  });

  btnSimReset.addEventListener('click', () => {
    setFocus(-1);
    announce(announcer, 'Foco redefinido.');
    closeCustomToast();
  });
}

function initInteractiveFormDemo() {
  const form = document.getElementById('demo-validation-form');
  const inputNome = document.getElementById('demo-field-nome');
  const inputEmail = document.getElementById('demo-field-email');
  const alertBox = document.getElementById('demo-live-feedback');

  const inspFocus = document.getElementById('insp-current-focus');
  const inspInvalid = document.getElementById('insp-aria-invalid');
  const inspDescribed = document.getElementById('insp-aria-described');
  const inspSpeech = document.getElementById('insp-screen-reader-text');

  if (!form || !inputNome || !inputEmail || !alertBox) return;

  function updateInspector(fieldId, isInvalid, descId, spokenText) {
    if (inspFocus) inspFocus.textContent = fieldId;
    if (inspInvalid) {
      inspInvalid.textContent = isInvalid ? 'true' : 'false';
      inspInvalid.className = isInvalid ? 'aria-prop-val invalid' : 'aria-prop-val';
    }
    if (inspDescribed) inspDescribed.textContent = descId;
    if (inspSpeech) inspSpeech.textContent = spokenText;
  }

  inputNome.addEventListener('focus', () => {
    updateInspector('demo-field-nome (Nome Completo)', inputNome.getAttribute('aria-invalid') === 'true', 'hint-nome', 'Nome do Acadêmico, campo de edição de texto, obrigatório. Dica: Informe seu nome completo cadastrado na UFMS.');
  });

  inputEmail.addEventListener('focus', () => {
    updateInspector('demo-field-email (E-mail)', inputEmail.getAttribute('aria-invalid') === 'true', 'hint-email', 'E-mail Institucional, campo de edição de texto, obrigatório. Dica: Utilize seu endereço oficial do domínio @ufms.br.');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errors = [];

    if (!inputNome.value.trim() || inputNome.value.trim().length < 3) {
      inputNome.setAttribute('aria-invalid', 'true');
      errors.push('O campo Nome Completo deve possuir ao menos 3 caracteres.');
    } else {
      inputNome.removeAttribute('aria-invalid');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
      inputEmail.setAttribute('aria-invalid', 'true');
      errors.push('Insira um e-mail institucional válido do domínio @ufms.br.');
    } else {
      inputEmail.removeAttribute('aria-invalid');
    }

    if (errors.length > 0) {
      alertBox.className = 'live-alert-feedback';
      alertBox.style.backgroundColor = 'var(--error-bg)';
      alertBox.style.color = 'var(--error-text)';
      alertBox.style.border = '2px solid var(--error-border)';
      alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> <span>Atenção: ${errors.join(' ')}</span>`;
      alertBox.focus();

      updateInspector('Alerta de Validação (role="alert")', true, 'demo-live-feedback', `Alerta: Atenção, ${errors.join(' ')}`);
    } else {
      alertBox.className = 'live-alert-feedback';
      alertBox.style.backgroundColor = 'var(--success-bg)';
      alertBox.style.color = 'var(--success-text)';
      alertBox.style.border = '2px solid var(--success-border)';
      alertBox.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span>Sucesso! Formulário submetido e validado com suporte a tecnologias assistivas.</span>`;
      form.reset();
      inputNome.removeAttribute('aria-invalid');
      inputEmail.removeAttribute('aria-invalid');

      updateInspector('Formulário Submetido', false, 'Nenhum erro', 'Alerta: Sucesso! Formulário submetido e validado com suporte a tecnologias assistivas.');
    }
  });
}

function announce(element, text) {
  if (!element) return;
  element.textContent = '';
  setTimeout(() => {
    element.textContent = text;
  }, 90);
}

let isSpeechEnabled = false;

function getPtBrVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') || voices.find(v => v.lang.startsWith('pt')) || null;
}

function speakText(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    const voice = getPtBrVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  } catch (err) {}
}

function getAccessibleDescription(el) {
  if (!el || el === document.body || el === document.documentElement) return '';

  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute('role') || '';
  const ariaLabel = el.getAttribute('aria-label');
  const title = el.getAttribute('title');

  let name = ariaLabel || title || el.innerText || el.textContent || '';
  name = name.replace(/\s+/g, ' ').trim();
  if (name.length > 140) name = name.substring(0, 140) + '...';

  if (tag === 'button' || role === 'button') {
    let state = '';
    if (el.getAttribute('aria-pressed') === 'true') state += 'ativado. ';
    else if (el.getAttribute('aria-pressed') === 'false') state += 'desativado. ';
    if (el.getAttribute('aria-expanded') === 'true') state += 'expandido. ';
    else if (el.getAttribute('aria-expanded') === 'false') state += 'recolhido. ';
    return `Botão, ${name}. ${state}Pressione Enter para acionar.`;
  }

  if (tag === 'a' || role === 'link') {
    return `Link, ${name}. Pressione Enter para navegar.`;
  }

  if (tag === 'input') {
    const type = el.type || 'text';
    let labelText = '';
    if (el.id) {
      const lbl = document.querySelector(`label[for="${el.id}"]`);
      if (lbl) labelText = lbl.innerText.replace(/\s+/g, ' ').trim();
    }
    const finalName = labelText || name || el.placeholder || 'Campo';
    const req = (el.required || el.getAttribute('aria-required') === 'true') ? 'obrigatório. ' : '';
    let hint = '';
    const descId = el.getAttribute('aria-describedby');
    if (descId) {
      const hintEl = document.getElementById(descId);
      if (hintEl) hint = hintEl.innerText.replace(/\s+/g, ' ').trim();
    }
    const val = el.value ? `com texto: ${el.value}.` : 'em branco.';
    return `Campo de texto ${finalName}, ${req}${val} ${hint}`;
  }

  if (role === 'tab') {
    const sel = el.getAttribute('aria-selected') === 'true' ? 'selecionada. ' : 'não selecionada. ';
    return `Aba de conteúdo, ${name}, ${sel}Pressione Enter para alternar.`;
  }

  if (tag.match(/^h[1-6]$/)) {
    const level = tag.substring(1);
    return `Título de nível ${level}, ${name}.`;
  }

  if (el.classList.contains('sandbox-target')) {
    const simLabel = el.getAttribute('data-sim-label') || name;
    return `Botão do simulador, ${simLabel}. Pressione Enter para disparar sinal HID.`;
  }

  if (el.classList.contains('hero-stat-card') || el.classList.contains('pipeline-bus-card') || el.classList.contains('persona-card')) {
    return `Painel informativo, ${name}.`;
  }

  return name;
}

function initSpeechSynthesizer() {
  const speechToggleBtn = document.getElementById('btn-sim-speech-toggle');
  const speechStatusSpan = document.getElementById('sim-speech-status');
  const drawerVoiceBtn = document.getElementById('tool-voice-synth');
  const announcer = document.getElementById('global-a11y-announcer');

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      getPtBrVoice();
    };
  }

  function setSpeechState(enabled) {
    isSpeechEnabled = enabled;
    if (speechToggleBtn) {
      speechToggleBtn.setAttribute('aria-pressed', isSpeechEnabled ? 'true' : 'false');
      speechToggleBtn.classList.toggle('is-active', isSpeechEnabled);
    }
    if (speechStatusSpan) {
      speechStatusSpan.textContent = isSpeechEnabled ? 'Ativado' : 'Desativado';
    }
    if (drawerVoiceBtn) {
      drawerVoiceBtn.setAttribute('aria-pressed', isSpeechEnabled ? 'true' : 'false');
      drawerVoiceBtn.classList.toggle('is-active', isSpeechEnabled);
    }

    const msg = isSpeechEnabled
      ? 'Sintetizador de voz ativado. Ao focar, clicar ou passar o mouse em botões e campos, o leitor de tela narrará em voz alta.'
      : 'Sintetizador de voz desativado.';
    announce(announcer, msg);
    speakText(isSpeechEnabled ? 'Sintetizador de voz ativado. Navegue pelo site com o teclado ou mouse para ouvir os elementos.' : 'Sintetizador de voz desativado.');
  }

  if (speechToggleBtn) {
    speechToggleBtn.addEventListener('click', () => {
      setSpeechState(!isSpeechEnabled);
    });
  }

  if (drawerVoiceBtn) {
    drawerVoiceBtn.addEventListener('click', () => {
      setSpeechState(!isSpeechEnabled);
    });
  }

  const speakReaderBtn = document.getElementById('btn-speak-screen-reader');
  const readerLog = document.getElementById('insp-screen-reader-text');
  if (speakReaderBtn && readerLog) {
    speakReaderBtn.addEventListener('click', () => {
      const textToSpeak = readerLog.textContent.trim();
      speakText(textToSpeak || 'Aguardando foco em algum elemento do formulário.');
    });
  }

  document.addEventListener('focusin', (e) => {
    if (!isSpeechEnabled) return;
    const target = e.target;
    if (!target) return;
    const desc = getAccessibleDescription(target);
    if (desc) {
      speakText(desc);
    }
  });

  document.addEventListener('click', (e) => {
    if (!isSpeechEnabled) return;
    const target = e.target.closest('button, a, input, [role="tab"], .sandbox-target');
    if (!target) return;
    if (target.id === 'btn-sim-speech-toggle' || target.id === 'tool-voice-synth') return;
    const desc = getAccessibleDescription(target);
    if (desc) {
      speakText('Acionado: ' + desc);
    }
  });

  let hoverTimeout = null;
  let lastHovered = null;
  document.addEventListener('mousemove', (e) => {
    if (!isSpeechEnabled) return;
    const target = e.target.closest('button, a, input, [role="tab"], h1, h2, h3, .sandbox-target, .hero-stat-card, .pipeline-bus-card');
    if (!target || target === lastHovered) return;
    lastHovered = target;
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      const desc = getAccessibleDescription(target);
      if (desc) {
        speakText(desc);
      }
    }, 280);
  });
}

function initVisionSimulator() {
  const visionButtons = document.querySelectorAll('.vision-btn');
  const tunnelOverlay = document.getElementById('vision-overlay-tunnel');
  const macularOverlay = document.getElementById('vision-overlay-macular');
  const announcer = document.getElementById('global-a11y-announcer');

  visionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const condition = btn.getAttribute('data-vision');
      visionButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      document.documentElement.classList.remove('vision-blur', 'vision-protanopia', 'vision-deuteranopia');
      if (tunnelOverlay) tunnelOverlay.classList.remove('is-active');
      if (macularOverlay) macularOverlay.classList.remove('is-active');

      let labelMsg = 'Visão normal restaurada.';
      if (condition === 'blur') {
        document.documentElement.classList.add('vision-blur');
        labelMsg = 'Simulação de baixa acuidade visual e catarata ativada.';
      } else if (condition === 'protanopia') {
        document.documentElement.classList.add('vision-protanopia');
        labelMsg = 'Simulação de daltonismo protanopia (sem vermelho) ativada.';
      } else if (condition === 'deuteranopia') {
        document.documentElement.classList.add('vision-deuteranopia');
        labelMsg = 'Simulação de daltonismo deuteranopia (sem verde) ativada.';
      } else if (condition === 'tunnel') {
        if (tunnelOverlay) tunnelOverlay.classList.add('is-active');
        labelMsg = 'Simulação de visão tubular associada a glaucoma ativada.';
      } else if (condition === 'macular') {
        if (macularOverlay) macularOverlay.classList.add('is-active');
        labelMsg = 'Simulação de escotoma central por degeneração macular ativada.';
      }

      announce(announcer, labelMsg);
      if (isSpeechEnabled) {
        speakText(labelMsg);
      }
    });
  });
}

function initAomInspector() {
  const codeView = document.getElementById('aom-code-view');
  const treeView = document.getElementById('aom-tree-view');
  const verdictView = document.getElementById('aom-verdict-view');
  const tabs = document.querySelectorAll('.aom-tab-btn');

  if (!codeView || !treeView || !verdictView || tabs.length === 0) return;

  const aomData = {
    'btn-semantic': {
      html: `<button type="button"
        aria-expanded="false"
        aria-controls="menu-academico"
        class="btn-ufms">
  <i class="fa-solid fa-bars"></i>
  <span>Menu Acadêmico</span>
</button>`,
      tree: [
        { key: 'Role Nativo (AOM)', val: 'button' },
        { key: 'Nome Acessível (Name)', val: '"Menu Acadêmico"' },
        { key: 'Focusable (Tab Index)', val: 'true (Ordem Natural do DOM)' },
        { key: 'Estado (State)', val: 'expanded: false | disabled: false' },
        { key: 'Relação (Controls)', val: 'id("menu-academico")' },
        { key: 'Protocolo de Entrada', val: 'USB HID: KEY_TAB / KEY_ENTER / IRQ' },
        { key: 'Suporte Assistivo', val: 'NVDA, JAWS, VoiceOver, Display Braille' }
      ],
      verdictClass: 'success',
      verdictText: '<i class="fa-solid fa-circle-check"></i> <strong>Conformidade Plena:</strong> Elemento nativo compilado com 100% de integridade na árvore AOM sem custo de script.'
    },
    'div-anti': {
      html: `<div class="meu-botao"
     onclick="abrirMenu()">
  <i class="fa-solid fa-bars"></i>
  <span>Menu Acadêmico</span>
</div>`,
      tree: [
        { key: 'Role Nativo (AOM)', val: 'generic / none (Nó Invisível)' },
        { key: 'Nome Acessível (Name)', val: 'null (Sem rótulo computado)' },
        { key: 'Focusable (Tab Index)', val: 'false (Ignorado pela tecla Tab)' },
        { key: 'Estado (State)', val: 'Indefinido pelo motor de acessibilidade' },
        { key: 'Relação (Controls)', val: 'Nenhuma exposta na API nativa' },
        { key: 'Protocolo de Entrada', val: 'Restrito exclusivamente a clique de mouse' },
        { key: 'Suporte Assistivo', val: 'INACESSÍVEL: Usuário cego/motor não alcança' }
      ],
      verdictClass: 'danger',
      verdictText: '<i class="fa-solid fa-triangle-exclamation"></i> <strong>Falha Crítica de Engenharia:</strong> A Árvore AOM descarta a div, excluindo quem usa teclado ou leitor de tela.'
    },
    'input-field': {
      html: `<label for="matricula-ufms">
  Matrícula Acadêmica:
</label>
<input type="text"
       id="matricula-ufms"
       required
       aria-required="true"
       aria-describedby="hint-matr">
<span id="hint-matr">Digite os 9 dígitos do RGA</span>`,
      tree: [
        { key: 'Role Nativo (AOM)', val: 'textbox (Campo de Texto Editável)' },
        { key: 'Nome Acessível (Name)', val: '"Matrícula Acadêmica"' },
        { key: 'Descrição (Description)', val: '"Digite os 9 dígitos do RGA"' },
        { key: 'Focusable (Tab Index)', val: 'true' },
        { key: 'Obrigatório (Required)', val: 'true' },
        { key: 'Validação (Invalid)', val: 'false (Calculado pelo Constraint API)' },
        { key: 'Leitura NVDA', val: '"Matrícula Acadêmica, edição obrigatório, Digite os 9 dígitos do RGA"' }
      ],
      verdictClass: 'success',
      verdictText: '<i class="fa-solid fa-circle-check"></i> <strong>Mapeamento Perfeito:</strong> O leitor de tela lê o nome e a dica auxiliar sem ambiguidades.'
    },
    'nav-landmark': {
      html: `<nav id="menu-principal"
     aria-label="Navegação Institucional">
  <ul role="list">
    <li><a href="#hero">Início</a></li>
    <li><a href="#lab">Laboratório</a></li>
  </ul>
</nav>`,
      tree: [
        { key: 'Role Nativo (AOM)', val: 'navigation (Marco Estrutural Landmark)' },
        { key: 'Nome Acessível (Name)', val: '"Navegação Institucional"' },
        { key: 'Atalho NVDA / JAWS', val: 'Tecla D (Salto entre marcos do sistema)' },
        { key: 'Contagem de Filhos', val: 'list com 2 listitems interativos' },
        { key: 'Papel na Engenharia', val: 'Permite que o usuário salte blocos repetitivos sem 40 cliques de Tab' }
      ],
      verdictClass: 'success',
      verdictText: '<i class="fa-solid fa-circle-check"></i> <strong>Marco Semântico WCAG:</strong> Facilita a orientação espacial rápida para pessoas com deficiência visual.'
    }
  };

  function renderAom(tabKey) {
    const data = aomData[tabKey];
    if (!data) return;

    codeView.textContent = data.html;
    treeView.innerHTML = data.tree.map(item => `
      <div class="aom-prop-row">
        <span class="aom-prop-key">${item.key}:</span>
        <span class="aom-prop-val">${item.val}</span>
      </div>
    `).join('');

    verdictView.className = 'aom-verdict-box ' + data.verdictClass;
    verdictView.innerHTML = data.verdictText;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const tabKey = tab.getAttribute('data-aom-tab');
      renderAom(tabKey);
    });
  });

  renderAom('btn-semantic');
}

function initModalsAndShortcuts() {
  const paperModal = document.getElementById('academic-paper-modal');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const openPaperBtn = document.getElementById('btn-open-paper-modal');
  const topbarPaperBtn = document.getElementById('btn-topbar-paper');
  const closePaperBtn = document.getElementById('btn-close-paper-modal');

  const topbarShortcutsBtn = document.getElementById('btn-topbar-shortcuts');
  const heroShortcutsBtn = document.getElementById('btn-hero-open-shortcuts');
  const closeShortcutsBtn = document.getElementById('btn-close-shortcuts-modal');

  let activeModal = null;
  let previousFocusedElement = null;

  function openModal(modal) {
    if (!modal) return;
    previousFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = modal;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModal = null;
    if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
      previousFocusedElement.focus();
    }
  }

  if (openPaperBtn) openPaperBtn.addEventListener('click', () => openModal(paperModal));
  if (topbarPaperBtn) topbarPaperBtn.addEventListener('click', () => openModal(paperModal));
  if (closePaperBtn) closePaperBtn.addEventListener('click', () => closeModal(paperModal));

  if (topbarShortcutsBtn) topbarShortcutsBtn.addEventListener('click', () => openModal(shortcutsModal));
  if (heroShortcutsBtn) heroShortcutsBtn.addEventListener('click', () => openModal(shortcutsModal));
  if (closeShortcutsBtn) closeShortcutsBtn.addEventListener('click', () => closeModal(shortcutsModal));

  if (paperModal) {
    paperModal.addEventListener('click', (e) => {
      if (e.target === paperModal) closeModal(paperModal);
    });
  }
  if (shortcutsModal) {
    shortcutsModal.addEventListener('click', (e) => {
      if (e.target === shortcutsModal) closeModal(shortcutsModal);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (activeModal) {
        closeModal(activeModal);
      }
      return;
    }

    if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (activeModal === shortcutsModal) {
        closeModal(shortcutsModal);
      } else {
        openModal(shortcutsModal);
      }
      return;
    }

    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
      const key = e.key.toLowerCase();
      if (key === 'a') {
        e.preventDefault();
        const openDrawerBtn = document.getElementById('btn-open-a11y-drawer');
        if (openDrawerBtn) openDrawerBtn.click();
      } else if (key === 'p') {
        e.preventDefault();
        if (activeModal === paperModal) closeModal(paperModal);
        else openModal(paperModal);
      } else if (key === 'v') {
        e.preventDefault();
        const speechBtn = document.getElementById('btn-sim-speech-toggle');
        if (speechBtn) speechBtn.click();
      } else if (key === 't') {
        e.preventDefault();
        const sim = document.getElementById('simulador-teclado');
        if (sim) {
          sim.scrollIntoView({ behavior: 'smooth' });
          const firstTarget = sim.querySelector('.sandbox-target');
          if (firstTarget) firstTarget.focus();
        }
      } else if (key === 'c') {
        e.preventDefault();
        const calc = document.getElementById('calculadora-contraste');
        if (calc) {
          calc.scrollIntoView({ behavior: 'smooth' });
          const fg = document.getElementById('calc-color-fg');
          if (fg) fg.focus();
        }
      }
    }
  });
}

function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.hero-stat-number, .gauge-number');
  if (!('IntersectionObserver' in window)) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        observer.unobserve(el);

        if (el.classList.contains('gauge-number')) {
          animateValue(el, 0, 100, 1200, '');
        }
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateValue(obj, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.textContent = Math.floor(progress * (end - start) + start) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end + suffix;
      }
    };
    window.requestAnimationFrame(step);
  }
}
