import { useState } from 'react';
import Icon from '@/components/ui/icon';

const routes: {
  id: number; num: string; name: string; length: number;
  stops: number; buses: number; interval: number;
  firstDep: string; lastDep: string; status: string;
}[] = [];

export default function Routes() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = routes.filter((r) =>
    r.num.includes(search) || r.name.toLowerCase().includes(search.toLowerCase())
  );

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

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Icon name="Route" size={40} className="mx-auto mb-3" style={{ color: 'hsl(140 15% 80%)' }} />
              <p className="text-sm text-muted-foreground font-medium">Маршруты не добавлены</p>
              <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 65%)' }}>Нажмите «Добавить маршрут», чтобы создать первый</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((r) => (
                <div
                  key={r.id}
                  className={`px-5 py-4 cursor-pointer transition-colors ${selected === r.id ? 'bg-green-50' : 'hover:bg-muted/40'}`}
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
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-4">Статистика маршрутов</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Активных</span>
                <span className="font-bold text-sm" style={{ color: 'hsl(142 71% 35%)' }}>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Приостановленных</span>
                <span className="font-bold text-sm" style={{ color: 'hsl(0 72% 45%)' }}>0</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">Автобусов на линии</span>
                <span className="font-bold text-sm text-foreground">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Общая длина сети</span>
                <span className="font-bold text-sm text-foreground">0 км</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
