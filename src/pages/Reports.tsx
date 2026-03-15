import { useState } from 'react';
import Icon from '@/components/ui/icon';

const routeOptions: string[] = [];
const busOptions: string[] = [];

interface ReportEntry {
  id: number;
  route: string;
  bus: string;
  trips: string;
  passengers: string;
  links: string;
  date: string;
}

export default function Reports() {
  const [route, setRoute] = useState('');
  const [bus, setBus] = useState('');
  const [trips, setTrips] = useState('');
  const [passengers, setPassengers] = useState('');
  const [links, setLinks] = useState('');
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedReports, setSavedReports] = useState<ReportEntry[]>([]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!route) e.route = 'Выберите маршрут';
    if (!bus) e.bus = 'Выберите автомобиль';
    if (!trips) e.trips = 'Введите количество';
    if (!passengers) e.passengers = 'Введите количество';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    const newReport: ReportEntry = {
      id: Date.now(),
      route,
      bus,
      trips,
      passengers,
      links,
      date: new Date().toLocaleDateString('ru-RU'),
    };
    setSavedReports(prev => [newReport, ...prev]);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setRoute('');
    setBus('');
    setTrips('');
    setPassengers('');
    setLinks('');
  };

  const handleReset = () => {
    setRoute('');
    setBus('');
    setTrips('');
    setPassengers('');
    setLinks('');
    setErrors({});
  };

  const fieldClass = (field: string) =>
    `w-full px-3 py-2.5 text-sm border rounded outline-none transition-all ${errors[field] ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-green-600'}`;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-bold text-foreground">Отчёты</h2>
        <p className="text-sm text-muted-foreground">Внесите данные о выполненной работе</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <div className="bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-6 py-4 border-b border-border" style={{ background: 'hsl(var(--muted))' }}>
              <div className="flex items-center gap-2">
                <Icon name="FileEdit" size={16} className="text-muted-foreground" />
                <h3 className="font-semibold text-sm text-foreground">Ввод данных — путевой лист</h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {saved && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded text-sm font-medium animate-fade-in" style={{ background: 'hsl(142 71% 95%)', color: 'hsl(142 71% 30%)' }}>
                  <Icon name="CheckCircle" size={16} />
                  Отчёт успешно сохранён
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    Маршрут <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={route}
                    onChange={(e) => { setRoute(e.target.value); setErrors(prev => ({ ...prev, route: '' })); }}
                    className={fieldClass('route') + ' bg-white'}
                  >
                    <option value="">— Выберите маршрут —</option>
                    {routeOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.route && <p className="text-xs text-red-500 mt-1">{errors.route}</p>}
                  {routeOptions.length === 0 && (
                    <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 60%)' }}>Добавьте маршруты в разделе «Маршруты»</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    Автомобиль (госномер) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bus}
                    onChange={(e) => { setBus(e.target.value); setErrors(prev => ({ ...prev, bus: '' })); }}
                    className={fieldClass('bus') + ' bg-white'}
                  >
                    <option value="">— Выберите ТС —</option>
                    {busOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {errors.bus && <p className="text-xs text-red-500 mt-1">{errors.bus}</p>}
                  {busOptions.length === 0 && (
                    <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 60%)' }}>Добавьте ТС в разделе «Подвижной состав»</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    Кругорейсов <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={trips}
                      onChange={(e) => { setTrips(e.target.value); setErrors(prev => ({ ...prev, trips: '' })); }}
                      className={fieldClass('trips')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">шт.</div>
                  </div>
                  {errors.trips && <p className="text-xs text-red-500 mt-1">{errors.trips}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    Перевезено пассажиров <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={passengers}
                      onChange={(e) => { setPassengers(e.target.value); setErrors(prev => ({ ...prev, passengers: '' })); }}
                      className={fieldClass('passengers')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">чел.</div>
                  </div>
                  {errors.passengers && <p className="text-xs text-red-500 mt-1">{errors.passengers}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                  Ссылки
                </label>
                <textarea
                  rows={3}
                  placeholder="Вставьте ссылки через Enter&#10;https://example.com/..."
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded outline-none transition-all resize-none focus:border-green-600 font-mono-ibm"
                  style={{ background: 'white' }}
                />
                <p className="text-xs mt-1 text-muted-foreground">Можно вставить несколько ссылок, каждую с новой строки</p>
              </div>

              {route && bus && trips && passengers && (
                <div className="p-4 rounded border border-border bg-muted/50 animate-fade-in">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Предварительный итог</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Маршрут', value: route },
                      { label: 'Автобус', value: bus },
                      { label: 'Кругорейсов', value: trips },
                      { label: 'Пассажиров', value: passengers },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                        <div className="font-semibold text-sm text-foreground mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  {links && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-1">Ссылки:</div>
                      <div className="space-y-1">
                        {links.split('\n').filter(l => l.trim()).map((link, i) => (
                          <a key={i} href={link.trim()} target="_blank" rel="noreferrer"
                            className="block text-xs font-mono-ibm truncate hover:underline"
                            style={{ color: 'hsl(var(--primary))' }}>
                            {link.trim()}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white transition-colors"
                  style={{ background: 'hsl(var(--primary))' }}
                >
                  <Icon name="Save" size={15} />
                  Сохранить отчёт
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="RotateCcw" size={15} />
                  Сбросить
                </button>
                <button
                  className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="Download" size={15} />
                  Экспорт XLS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="px-5 py-4 border-b border-border" style={{ background: 'hsl(var(--muted))' }}>
              <div className="flex items-center gap-2">
                <Icon name="History" size={15} className="text-muted-foreground" />
                <h3 className="font-semibold text-sm text-foreground">Сохранённые отчёты</h3>
              </div>
            </div>

            {savedReports.length === 0 ? (
              <div className="py-16 text-center">
                <Icon name="FileText" size={34} className="mx-auto mb-3" style={{ color: 'hsl(140 15% 80%)' }} />
                <p className="text-sm text-muted-foreground">Нет сохранённых отчётов</p>
                <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 65%)' }}>Заполните форму и нажмите «Сохранить»</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {savedReports.map((r) => (
                  <div key={r.id} className="px-5 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm text-foreground">{r.route}</div>
                      <span className="text-xs text-muted-foreground font-mono-ibm">{r.date}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{r.bus}</div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-muted rounded px-2 py-1.5 text-center">
                        <div className="font-bold text-sm text-foreground">{r.trips}</div>
                        <div className="text-xs text-muted-foreground">рейсов</div>
                      </div>
                      <div className="bg-muted rounded px-2 py-1.5 text-center">
                        <div className="font-bold text-sm text-foreground">{r.passengers}</div>
                        <div className="text-xs text-muted-foreground">пасс.</div>
                      </div>
                    </div>
                    {r.links && (
                      <div className="space-y-1">
                        {r.links.split('\n').filter(l => l.trim()).map((link, i) => (
                          <a key={i} href={link.trim()} target="_blank" rel="noreferrer"
                            className="block text-xs font-mono-ibm truncate hover:underline"
                            style={{ color: 'hsl(var(--primary))' }}>
                            {link.trim()}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
