
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Search, Calendar, Users, Clock, Settings, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockService, Event } from "@/services/mockData";
import { useAppToast } from "@/hooks/useAppToast";

export default function Events() {
  const [events, setEvents] = useState(mockService.getEvents());
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    description: "",
    departments: [],
    startDate: "",
    endDate: "",
    status: "upcoming"
  });
  
  const { showSuccess, showError } = useAppToast();
  
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
  
  const handleCreateEvent = () => {
    setIsDialogOpen(true);
  };
  
  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      showError("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    try {
      const createdEvent = mockService.createEvent({
        name: newEvent.name || "",
        description: newEvent.description || "",
        departments: newEvent.departments || [],
        startDate: newEvent.startDate || "01 Jan, 2024",
        endDate: newEvent.endDate || "02 Jan, 2024",
        status: newEvent.status as "active" | "upcoming" | "completed" || "upcoming"
      });
      
      setEvents(mockService.getEvents());
      setIsDialogOpen(false);
      setNewEvent({
        name: "",
        description: "",
        departments: [],
        startDate: "",
        endDate: "",
        status: "upcoming"
      });
      
      showSuccess("Evento criado com sucesso");
    } catch (error) {
      showError("Erro ao criar evento");
    }
  };
  
  const handleManageTeam = (eventId: number) => {
    showSuccess("Gerenciando equipe para o evento");
    // In a real app, this would open a modal or navigate to a manage team page
  };
  
  const handleMoreOptions = (eventId: number) => {
    showSuccess("Opções adicionais abertas");
    // In a real app, this would open a dropdown menu
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Eventos</h1>
            <p className="text-muted-foreground mt-1">Gerencie todos os seus eventos e contextos de escala</p>
          </div>
          <Button className="flex items-center gap-2 sm:self-start" onClick={handleCreateEvent}>
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
            <Button variant="outline" size="icon" onClick={() => showSuccess("Filtrando por hora")}>
              <Clock className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => showSuccess("Visualização de calendário")}>
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => showSuccess("Configurações abertas")}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3"
                        onClick={() => handleManageTeam(event.id)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Gerenciar Equipe
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleMoreOptions(event.id)}
                      >
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
              <Button className="mt-4" onClick={handleCreateEvent}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Evento
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog for creating new event */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Evento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome do Evento</label>
              <Input
                id="name"
                value={newEvent.name || ""}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                placeholder="Digite o nome do evento"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input
                id="description"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Digite a descrição do evento"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="departments" className="text-sm font-medium">Departamentos</label>
              <Input
                id="departments"
                value={newEvent.departments?.join(", ") || ""}
                onChange={(e) => setNewEvent({...newEvent, departments: e.target.value.split(", ")})}
                placeholder="Administrativo, Segurança, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">Data de Início</label>
                <Input
                  id="startDate"
                  value={newEvent.startDate || ""}
                  onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                  placeholder="01 Jan, 2024"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">Data de Término</label>
                <Input
                  id="endDate"
                  value={newEvent.endDate || ""}
                  onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                  placeholder="02 Jan, 2024"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEvent}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
