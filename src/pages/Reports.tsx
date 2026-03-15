import { useState } from 'react';
import Icon from '@/components/ui/icon';

const routeOptions = ['№ 3', '№ 7', '№ 9', '№ 14А', '№ 22Б', '№ 31', '№ 45'];
const busOptions = ['АА 123 77', 'АВ 456 77', 'АМ 789 77', 'АО 321 77', 'АП 654 77', 'АР 987 77', 'АС 111 77', 'АТ 222 77'];

interface ReportEntry {
  id: number;
  route: string;
  bus: string;
  trips: string;
  passengers: string;
  links: string;
  date: string;
  driver: string;
}

const savedReports: ReportEntry[] = [
  { id: 1, route: '№ 14А', bus: 'АА 123 77', trips: '12', passengers: '1 248', links: '14', date: '14.03.2024', driver: 'Петров И.В.' },
  { id: 2, route: '№ 7', bus: 'АВ 456 77', trips: '14', passengers: '1 560', links: '16', date: '14.03.2024', driver: 'Иванов С.П.' },
  { id: 3, route: '№ 9', bus: 'АП 654 77', trips: '16', passengers: '1 920', links: '18', date: '13.03.2024', driver: 'Морозов А.С.' },
  { id: 4, route: '№ 3', bus: 'АО 321 77', trips: '18', passengers: '2 160', links: '20', date: '13.03.2024', driver: 'Козлов Д.Н.' },
];

export default function Reports() {
  const [route, setRoute] = useState('');
  const [bus, setBus] = useState('');
  const [trips, setTrips] = useState('');
  const [passengers, setPassengers] = useState('');
  const [links, setLinks] = useState('');
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!route) e.route = 'Выберите маршрут';
    if (!bus) e.bus = 'Выберите автомобиль';
    if (!trips) e.trips = 'Введите количество';
    if (!passengers) e.passengers = 'Введите количество';
    if (!links) e.links = 'Введите количество';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
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
    `w-full px-3 py-2.5 text-sm border rounded outline-none transition-all ${errors[field] ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-blue-500'}`;

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
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                    Ссылки / Листы <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={links}
                      onChange={(e) => { setLinks(e.target.value); setErrors(prev => ({ ...prev, links: '' })); }}
                      className={fieldClass('links')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">шт.</div>
                  </div>
                  {errors.links && <p className="text-xs text-red-500 mt-1">{errors.links}</p>}
                </div>
              </div>

              {route && bus && trips && passengers && (
                <div className="p-4 rounded border border-border bg-muted/50 animate-fade-in">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Предварительный итог</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Маршрут', value: route },
                      { label: 'Автобус', value: bus },
                      { label: 'Кругорейсов', value: trips || '—' },
                      { label: 'Пассажиров', value: passengers || '—' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                        <div className="font-semibold text-sm text-foreground mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="History" size={15} className="text-muted-foreground" />
                  <h3 className="font-semibold text-sm text-foreground">Последние отчёты</h3>
                </div>
                <button className="text-xs text-muted-foreground hover:text-foreground">Все →</button>
              </div>
            </div>
            <div className="divide-y divide-border">
              {savedReports.map((r) => (
                <div key={r.id} className="px-5 py-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold text-white" style={{ background: 'hsl(var(--primary))' }}>
                        {r.route.replace('№ ', '')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Маршрут {r.route}</div>
                        <div className="text-xs text-muted-foreground">{r.driver}</div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono-ibm">{r.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted rounded px-2 py-1.5 text-center">
                      <div className="font-bold text-sm text-foreground">{r.trips}</div>
                      <div className="text-xs text-muted-foreground">рейсов</div>
                    </div>
                    <div className="bg-muted rounded px-2 py-1.5 text-center">
                      <div className="font-bold text-sm text-foreground">{r.passengers}</div>
                      <div className="text-xs text-muted-foreground">пасс.</div>
                    </div>
                    <div className="bg-muted rounded px-2 py-1.5 text-center">
                      <div className="font-bold text-sm text-foreground">{r.links}</div>
                      <div className="text-xs text-muted-foreground">ссылок</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
