
import Layout from "@/components/layout/Layout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, CalendarDays, ChevronRight, Clock, PlusCircle, Users } from "lucide-react";

export default function Index() {
  // Upcoming events data
  const upcomingEvents = [
    { id: 1, name: "Reunião de Equipe", department: "Administrativo", date: "Hoje, 14:00" },
    { id: 2, name: "Treinamento de Segurança", department: "Segurança", date: "Amanhã, 09:00" },
    { id: 3, name: "Evento Corporativo", department: "Todos", date: "12 de Out, 10:00" },
  ];

  // Upcoming shifts data
  const upcomingShifts = [
    { id: 1, name: "Carlos Silva", role: "Supervisor", department: "Segurança", time: "08:00 - 16:00" },
    { id: 2, name: "Ana Oliveira", role: "Atendente", department: "Recepção", time: "12:00 - 20:00" },
    { id: 3, name: "Marcos Santos", role: "Técnico", department: "TI", time: "14:00 - 22:00" },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Bem-vindo ao seu sistema de Gestão de Escala</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Eventos Ativos"
            value={12}
            icon={<Calendar className="h-5 w-5 text-primary" />}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Usuários"
            value={48}
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Turnos Agendados"
            value={156}
            icon={<CalendarCheck className="h-5 w-5 text-primary" />}
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            title="Horas Agendadas"
            value={1240}
            icon={<Clock className="h-5 w-5 text-primary" />}
            trend={{ value: 3, positive: false }}
          />
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard 
            title="Próximos Eventos" 
            tag="Em breve"
          >
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-foreground">
                Ver todos os eventos
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard 
            title="Próximos Turnos" 
            tag="Hoje"
          >
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{shift.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{shift.name}</h4>
                      <p className="text-sm text-muted-foreground">{shift.role} • {shift.department}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{shift.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-foreground">
                Ver todos os turnos
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}
