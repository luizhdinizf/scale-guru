
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, CalendarDays, ChevronRight, Clock, PlusCircle, Users } from "lucide-react";
import { mockEvents, mockShifts } from "@/services/mockData";
import { useAppToast } from "@/hooks/useAppToast";

export default function Index() {
  const navigate = useNavigate();
  const { showSuccess } = useAppToast();
  
  // Upcoming events data
  const upcomingEvents = mockEvents
    .filter(event => event.status === "upcoming" || event.status === "active")
    .slice(0, 3);

  // Upcoming shifts data
  const upcomingShifts = mockShifts.slice(0, 3);

  // Stats data
  const activeEvents = mockEvents.filter(event => event.status === "active").length;
  const totalUsers = 48;
  const scheduledShifts = mockShifts.length;
  const scheduledHours = mockShifts.reduce((total) => total + 8, 0); // Assuming 8 hours per shift

  const handleCreateEvent = () => {
    showSuccess("Formulário de criação de evento aberto");
    // In a real app, this would open a modal or navigate to a create event page
    navigate("/events");
  };

  const handleViewAllEvents = () => {
    navigate("/events");
  };

  const handleViewAllShifts = () => {
    navigate("/schedule");
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Bem-vindo ao seu sistema de Gestão de Escala</p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleCreateEvent}>
            <PlusCircle className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Eventos Ativos"
            value={activeEvents}
            icon={<Calendar className="h-5 w-5 text-primary" />}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Usuários"
            value={totalUsers}
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Turnos Agendados"
            value={scheduledShifts}
            icon={<CalendarCheck className="h-5 w-5 text-primary" />}
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            title="Horas Agendadas"
            value={scheduledHours}
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
                      <p className="text-sm text-muted-foreground">{event.departments.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{event.startDate}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-muted-foreground hover:text-foreground"
                onClick={handleViewAllEvents}
              >
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
                        <span className="text-sm font-medium text-primary">{shift.user.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{shift.user}</h4>
                      <p className="text-sm text-muted-foreground">{shift.role} • {shift.department}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{shift.timeSlot}</span>
                  </div>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-muted-foreground hover:text-foreground"
                onClick={handleViewAllShifts}
              >
                Ver todos os turnos
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}
