import { useState } from 'react';
import Icon from '@/components/ui/icon';

const routes = [
  { id: 1, num: '3', name: 'Ст. м. Выхино — ул. Академика Королёва', length: 18.4, stops: 24, buses: 4, interval: 8, firstDep: '05:30', lastDep: '23:45', status: 'active' },
  { id: 2, num: '7', name: 'Ст. м. Кузьминки — Торговый центр «Мега»', length: 12.7, stops: 18, buses: 3, interval: 10, firstDep: '06:00', lastDep: '23:00', status: 'active' },
  { id: 3, num: '9', name: 'Ст. м. Рязанский проспект — Совхоз', length: 21.2, stops: 28, buses: 5, interval: 7, firstDep: '05:15', lastDep: '23:50', status: 'active' },
  { id: 4, num: '14А', name: 'Ст. м. Перово — Микрорайон Новогиреево', length: 9.3, stops: 14, buses: 3, interval: 12, firstDep: '06:30', lastDep: '22:30', status: 'active' },
  { id: 5, num: '22Б', name: 'Ст. м. Люблино — Промзона Печатники', length: 15.8, stops: 21, buses: 2, interval: 15, firstDep: '07:00', lastDep: '21:00', status: 'active' },
  { id: 6, num: '31', name: 'Ст. м. Домодедовская — посёлок Мелиораторов', length: 24.1, stops: 31, buses: 0, interval: 20, firstDep: '07:30', lastDep: '20:00', status: 'suspended' },
  { id: 7, num: '45', name: 'Ст. м. Братиславская — дачный посёлок Выхино', length: 11.5, stops: 16, buses: 2, interval: 18, firstDep: '08:00', lastDep: '20:30', status: 'active' },
];

export default function Routes() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = routes.filter((r) =>
    r.num.includes(search) || r.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRoute = routes.find(r => r.id === selected);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Маршруты</h2>
          <p className="text-sm text-muted-foreground">{routes.length} маршрутов в реестре</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <Icon name="Plus" size={15} />
          Добавить маршрут
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-3 border-b border-border">
            <div className="relative max-w-xs">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Номер или название маршрута..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-border rounded outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((r) => (
              <div
                key={r.id}
                className={`px-5 py-4 cursor-pointer transition-colors ${selected === r.id ? 'bg-blue-50' : 'hover:bg-muted/40'}`}
                onClick={() => setSelected(selected === r.id ? null : r.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm flex-shrink-0 text-white" style={{ background: r.status === 'active' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
                      {r.num}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{r.name}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Ruler" size={11} />
                          {r.length} км
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={11} />
                          {r.stops} остановок
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={11} />
                          каждые {r.interval} мин
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={r.status === 'active' ? 'badge-green' : 'badge-red'}>
                      {r.status === 'active' ? `${r.buses} авт.` : 'Приостановлен'}
                    </span>
                    <Icon name={selected === r.id ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-muted-foreground" />
                  </div>
                </div>

                {selected === r.id && (
                  <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 animate-fade-in">
                    {[
                      { label: 'Первый рейс', value: r.firstDep, icon: 'Sunrise' },
                      { label: 'Последний рейс', value: r.lastDep, icon: 'Sunset' },
                      { label: 'Интервал', value: `${r.interval} мин`, icon: 'Timer' },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted rounded p-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Icon name={item.icon} fallback="Clock" size={12} />
                          {item.label}
                        </div>
                        <div className="font-mono-ibm font-semibold text-sm text-foreground">{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-4">Статистика маршрутов</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Активных</span>
                <span className="font-bold text-sm" style={{ color: 'hsl(142 71% 35%)' }}>{routes.filter(r => r.status === 'active').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Приостановленных</span>
                <span className="font-bold text-sm" style={{ color: 'hsl(0 72% 45%)' }}>{routes.filter(r => r.status === 'suspended').length}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">Автобусов на линии</span>
                <span className="font-bold text-sm text-foreground">{routes.reduce((sum, r) => sum + r.buses, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Общая длина сети</span>
                <span className="font-bold text-sm text-foreground">{routes.reduce((sum, r) => sum + r.length, 0).toFixed(1)} км</span>
              </div>
            </div>
          </div>

          {selectedRoute && (
            <div className="bg-white border border-border rounded-lg p-5 animate-fade-in" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs text-white" style={{ background: 'hsl(var(--primary))' }}>
                  {selectedRoute.num}
                </div>
                <div className="font-semibold text-sm text-foreground">Маршрут № {selectedRoute.num}</div>
              </div>
              <div className="text-xs text-muted-foreground mb-3">{selectedRoute.name}</div>
              <div className="space-y-2">
                {[
                  { label: 'Автобусов', value: selectedRoute.buses },
                  { label: 'Остановок', value: selectedRoute.stops },
                  { label: 'Протяжённость', value: `${selectedRoute.length} км` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 text-xs py-2 rounded border border-border text-foreground hover:bg-muted transition-colors">
                  Редактировать
                </button>
                <button className="flex-1 text-xs py-2 rounded text-white transition-colors" style={{ background: 'hsl(var(--primary))' }}>
                  Расписание
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
