
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Calendar, Users, Clock, Settings, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Events() {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      name: "Conferência Anual", 
      description: "Evento principal da empresa com todos os departamentos", 
      departments: ["Administrativo", "Segurança", "Atendimento"],
      startDate: "15 Out, 2023",
      endDate: "17 Out, 2023",
      status: "active"
    },
    { 
      id: 2, 
      name: "Treinamento de Equipe", 
      description: "Capacitação para novos funcionários", 
      departments: ["Treinamento", "RH"],
      startDate: "22 Out, 2023",
      endDate: "23 Out, 2023",
      status: "upcoming"
    },
    { 
      id: 3, 
      name: "Plantão de Fim de Semana", 
      description: "Equipe reduzida para operações de fim de semana", 
      departments: ["Operações", "Suporte"],
      startDate: "28 Out, 2023",
      endDate: "30 Out, 2023",
      status: "upcoming"
    },
    { 
      id: 4, 
      name: "Operação Noturna", 
      description: "Turnos noturnos para manutenção de sistemas", 
      departments: ["TI", "Suporte"],
      startDate: "5 Out, 2023",
      endDate: "6 Out, 2023",
      status: "completed"
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "upcoming":
        return "bg-blue-500/10 text-blue-500";
      case "completed":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "upcoming":
        return "Próximo";
      case "completed":
        return "Concluído";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Eventos</h1>
            <p className="text-muted-foreground mt-1">Gerencie todos os seus eventos e contextos de escala</p>
          </div>
          <Button className="flex items-center gap-2 sm:self-start">
            <PlusCircle className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar eventos..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Clock className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="border rounded-xl p-6 bg-card hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2.5 py-0.5 text-xs font-medium rounded-full",
                        getStatusColor(event.status)
                      )}>
                        {getStatusLabel(event.status)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <p className="text-muted-foreground mt-1">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {event.departments.map((dept, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.startDate} - {event.endDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-3">
                        <Users className="h-4 w-4 mr-2" />
                        Gerenciar Equipe
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border rounded-xl bg-card">
              <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-1">Nenhum evento encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar sua busca ou crie um novo evento</p>
              <Button className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Evento
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
