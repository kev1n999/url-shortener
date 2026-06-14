const form = document.getElementById('auth-form');
const nameField = document.getElementById('name-field');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerTab = document.getElementById('register-tab');
const loginTab = document.getElementById('login-tab');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

let mode = 'register';

function setMode(nextMode) {
  mode = nextMode;
  const isRegister = mode === 'register';

  nameField.classList.toggle('hidden', !isRegister);
  nameInput.required = isRegister;
  nameInput.disabled = !isRegister;
  passwordInput.autocomplete = isRegister ? 'new-password' : 'current-password';
  submitBtn.textContent = isRegister ? 'Criar conta' : 'Entrar';
  message.textContent = isRegister
    ? 'Preencha os dados para criar sua conta.'
    : 'Informe email e senha para acessar sua conta.';

  registerTab.setAttribute('aria-pressed', String(isRegister));
  loginTab.setAttribute('aria-pressed', String(!isRegister));
  registerTab.className = tabClass(isRegister);
  loginTab.className = tabClass(!isRegister);
}

function tabClass(active) {
  const base =
    'min-h-11 rounded text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/40';
  return active
    ? `${base} bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/30`
    : `${base} text-slate-400 hover:text-slate-100`;
}

registerTab.addEventListener('click', () => setMode('register'));
loginTab.addEventListener('click', () => setMode('login'));

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const isRegister = mode === 'register';
  const payload = {
    email: emailInput.value.trim(),
    password: passwordInput.value,
  };

  if (isRegister) {
    payload.name = nameInput.value.trim();
  }

  submitBtn.disabled = true;
  message.textContent = isRegister ? 'Criando conta...' : 'Entrando...';

  try {
    const response = await fetch(
      isRegister ? '/api/auth/signup' : '/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Não foi possível concluir a ação.');
    }

    message.textContent = isRegister
      ? 'Conta criada com sucesso.'
      : 'Login realizado com sucesso.';

    if (message.textContent.trim().includes('Login')) {
      open('/shortener/create');
    }
  } catch (err) {
    message.textContent = err.message;
  } finally {
    submitBtn.disabled = false;
  }
});

setMode('register');
