import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Автобусов на линии', value: '34', total: '/42', icon: 'Bus', color: 'hsl(var(--primary))', bg: 'hsl(213 78% 95%)' },
  { label: 'Сотрудников сегодня', value: '68', total: '/74', icon: 'Users', color: 'hsl(142 71% 35%)', bg: 'hsl(142 71% 95%)' },
  { label: 'Маршрутов активных', value: '18', total: '/22', icon: 'Route', color: 'hsl(32 85% 45%)', bg: 'hsl(32 85% 95%)' },
  { label: 'Рейсов выполнено', value: '247', total: ' сегодня', icon: 'CheckCircle', color: 'hsl(199 89% 40%)', bg: 'hsl(199 89% 95%)' },
];

const recentEvents = [
  { time: '08:42', route: '№ 14А', bus: 'АА 123 77', driver: 'Петров И.В.', status: 'on', text: 'Вышел на маршрут' },
  { time: '08:38', route: '№ 7', bus: 'АВ 456 77', driver: 'Иванов С.П.', status: 'on', text: 'Вышел на маршрут' },
  { time: '08:15', route: '№ 22Б', bus: 'АМ 789 77', driver: 'Сидоров В.К.', status: 'off', text: 'Сошёл с маршрута (тех. неисправность)' },
  { time: '07:59', route: '№ 3', bus: 'АО 321 77', driver: 'Козлов Д.Н.', status: 'on', text: 'Начал смену' },
  { time: '07:45', route: '№ 9', bus: 'АП 654 77', driver: 'Морозов А.С.', status: 'warn', text: 'Опоздание на выход 15 мин.' },
];

const fleetStatus = [
  { label: 'На линии', value: 34, color: 'hsl(142 71% 35%)' },
  { label: 'В парке', value: 6, color: 'hsl(213 78% 45%)' },
  { label: 'На ТО', value: 2, color: 'hsl(32 85% 45%)' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Оперативная сводка</h2>
          <p className="text-sm text-muted-foreground">Данные обновлены в 09:15</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'hsl(142 71% 70%)', color: 'hsl(142 71% 35%)', background: 'hsl(142 71% 96%)' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'hsl(142 71% 35%)' }} />
          Система работает
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="text-xs font-medium text-muted-foreground leading-tight">{s.label}</div>
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <Icon name={s.icon} fallback="Circle" size={16} style={{ color: s.color }} />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.total}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">Последние события</h3>
            <button className="text-xs text-muted-foreground hover:text-foreground">Все события →</button>
          </div>
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Время</th>
                <th>Маршрут</th>
                <th>Автобус</th>
                <th>Водитель</th>
                <th>Событие</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((e, i) => (
                <tr key={i}>
                  <td className="font-mono-ibm text-xs text-muted-foreground">{e.time}</td>
                  <td className="font-medium">{e.route}</td>
                  <td className="font-mono-ibm text-xs">{e.bus}</td>
                  <td>{e.driver}</td>
                  <td>
                    <span className={e.status === 'on' ? 'badge-green' : e.status === 'warn' ? 'badge-orange' : 'badge-red'}>
                      {e.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-4">Состояние парка</h3>
            <div className="space-y-3">
              {fleetStatus.map((f) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{f.label}</span>
                    <span className="font-bold text-sm" style={{ color: f.color }}>{f.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'hsl(var(--muted))' }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${(f.value / 42) * 100}%`, background: f.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Всего единиц</span>
                <span className="font-bold text-foreground">42</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-3">Сводка за сегодня</h3>
            <div className="space-y-2">
              {[
                { label: 'Пассажиров', value: '18 420', icon: 'UserCheck' },
                { label: 'Выполнено рейсов', value: '247', icon: 'CheckSquare' },
                { label: 'Пробег, км', value: '4 830', icon: 'Gauge' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name={item.icon} fallback="Circle" size={14} />
                    {item.label}
                  </div>
                  <span className="font-semibold text-sm text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
