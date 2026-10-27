document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initAccessibilityDrawer();
  initContrastOptions();
  initTypographyEngine();
  initReadingAids();
  initLiveContrastCalculator();
  initKeyboardSimulator();
  initInteractiveFormDemo();
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
