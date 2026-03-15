import Icon from '@/components/ui/icon';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Оперативная сводка</h2>
          <p className="text-sm text-muted-foreground">Нет актуальных данных</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'hsl(142 71% 70%)', color: 'hsl(142 71% 35%)', background: 'hsl(142 71% 96%)' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'hsl(142 71% 35%)' }} />
          Система работает
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Автобусов на линии', icon: 'Bus', color: 'hsl(var(--primary))', bg: 'hsl(142 55% 93%)' },
          { label: 'Сотрудников сегодня', icon: 'Users', color: 'hsl(142 71% 35%)', bg: 'hsl(142 71% 95%)' },
          { label: 'Маршрутов активных', icon: 'Route', color: 'hsl(38 90% 40%)', bg: 'hsl(38 90% 95%)' },
          { label: 'Рейсов выполнено', icon: 'CheckCircle', color: 'hsl(199 89% 40%)', bg: 'hsl(199 89% 95%)' },
        ].map((s) => (
          <div key={s.label} className="stat-card flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="text-xs font-medium text-muted-foreground leading-tight">{s.label}</div>
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <Icon name={s.icon} fallback="Circle" size={16} style={{ color: s.color }} />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold" style={{ color: 'hsl(140 15% 75%)' }}>—</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-sm text-foreground">Последние события</h3>
          </div>
          <div className="py-16 text-center">
            <Icon name="ClipboardList" size={36} className="mx-auto mb-3" style={{ color: 'hsl(140 15% 80%)' }} />
            <p className="text-sm text-muted-foreground">События отсутствуют</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 68%)' }}>Данные появятся после добавления маршрутов и сотрудников</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-4">Состояние парка</h3>
            <div className="py-8 text-center">
              <Icon name="Bus" size={30} className="mx-auto mb-2" style={{ color: 'hsl(140 15% 80%)' }} />
              <p className="text-xs text-muted-foreground">Подвижной состав не добавлен</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold text-sm text-foreground mb-3">Сводка за сегодня</h3>
            <div className="space-y-2">
              {[
                { label: 'Пассажиров', icon: 'UserCheck' },
                { label: 'Выполнено рейсов', icon: 'CheckSquare' },
                { label: 'Пробег, км', icon: 'Gauge' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name={item.icon} fallback="Circle" size={14} />
                    {item.label}
                  </div>
                  <span className="text-sm font-mono-ibm" style={{ color: 'hsl(140 15% 75%)' }}>—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
