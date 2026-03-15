import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'hsl(215 40% 14%)' }}>
      <div className="hidden lg:flex flex-col justify-between w-[420px] p-12" style={{ background: 'hsl(215 45% 10%)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: 'hsl(var(--accent))' }}>
            <Icon name="Bus" size={18} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm leading-tight">АвтоПарк</div>
            <div className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>Система управления</div>
          </div>
        </div>

        <div>
          <div className="text-3xl font-bold text-white leading-tight mb-4">
            Управление<br />автобусным парком
          </div>
          <div className="text-sm leading-relaxed mb-8" style={{ color: 'hsl(215 20% 60%)' }}>
            Контроль маршрутов, подвижного состава, персонала и формирование оперативной отчётности в едином интерфейсе.
          </div>
          <div className="space-y-3">
            {[
              { icon: 'Route', text: 'Управление маршрутами' },
              { icon: 'Bus', text: 'Мониторинг подвижного состава' },
              { icon: 'Users', text: 'Учёт сотрудников' },
              { icon: 'BarChart3', text: 'Оперативные отчёты' },
            ].map((item) => (
              <div key={item.icon} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'hsl(215 35% 20%)' }}>
                  <Icon name={item.icon} fallback="Circle" size={14} style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <span className="text-sm" style={{ color: 'hsl(215 20% 65%)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs" style={{ color: 'hsl(215 20% 40%)' }}>
          © 2024 АвтоПарк. Корпоративная система.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[380px] animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: 'hsl(var(--accent))' }}>
              <Icon name="Bus" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">АвтоПарк</div>
              <div className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>Система управления</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Вход в систему</h1>
            <p className="text-sm" style={{ color: 'hsl(215 20% 55%)' }}>Введите ваши учётные данные</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(215 20% 65%)' }}>
                Логин / Табельный номер
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon name="User" size={15} style={{ color: 'hsl(215 20% 45%)' }} />
                </div>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 rounded text-sm text-white placeholder:text-gray-600 outline-none transition-all"
                  style={{
                    background: 'hsl(215 35% 20%)',
                    border: '1px solid hsl(215 30% 28%)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'hsl(var(--accent))'}
                  onBlur={(e) => e.target.style.borderColor = 'hsl(215 30% 28%)'}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(215 20% 65%)' }}>
                Пароль
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icon name="Lock" size={15} style={{ color: 'hsl(215 20% 45%)' }} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded text-sm text-white placeholder:text-gray-600 outline-none transition-all"
                  style={{
                    background: 'hsl(215 35% 20%)',
                    border: '1px solid hsl(215 30% 28%)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'hsl(var(--accent))'}
                  onBlur={(e) => e.target.style.borderColor = 'hsl(215 30% 28%)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'hsl(215 20% 45%)' }}
                >
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs py-2 px-3 rounded" style={{ background: 'hsl(0 72% 15%)', color: 'hsl(0 72% 70%)' }}>
                <Icon name="AlertCircle" size={13} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded text-sm font-semibold text-white transition-all mt-2 flex items-center justify-center gap-2"
              style={{ background: loading ? 'hsl(213 78% 22%)' : 'hsl(var(--primary))' }}
              onMouseEnter={(e) => !loading && ((e.target as HTMLButtonElement).style.background = 'hsl(213 78% 22%)')}
              onMouseLeave={(e) => !loading && ((e.target as HTMLButtonElement).style.background = 'hsl(var(--primary))')}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={15} />
                  Войти в систему
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 rounded text-xs" style={{ background: 'hsl(215 35% 18%)', color: 'hsl(215 20% 50%)' }}>
            <span className="font-medium" style={{ color: 'hsl(215 20% 65%)' }}>Демо-доступ:</span> любой логин и пароль
          </div>
        </div>
      </div>
    </div>
  );
}