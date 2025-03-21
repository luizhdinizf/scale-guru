
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Filter, PlusCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockService, mockEvents, mockShifts, Shift, Event } from "@/services/mockData";
import { useAppToast } from "@/hooks/useAppToast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Generate days of month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<string>("1");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [shifts, setShifts] = useState(mockShifts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDateForEvents, setSelectedDateForEvents] = useState<Date | undefined>(undefined);
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    day: 1,
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    user: "",
    department: "",
    role: "",
    timeSlot: ""
  });
  
  const { showSuccess, showError, showInfo } = useAppToast();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openEventDetails = (date: Date) => {
    setSelectedDateForEvents(date);
    setIsEventDialogOpen(true);
  };

  // Get the current selected event data
  const currentEventData = mockEvents.find(e => e.id.toString() === selectedEvent);
  
  const handleCreateShift = (day?: number) => {
    if (day) {
      setSelectedDay(day);
    }
    setNewShift({
      ...newShift,
      day: day || 1,
      month: currentMonth,
      year: currentYear
    });
    setIsDialogOpen(true);
  };
  
  const handleSaveShift = () => {
    if (!newShift.user || !newShift.department || !newShift.role || !newShift.timeSlot) {
      showError("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    try {
      const createdShift = mockService.createShift({
        day: newShift.day || 1,
        month: newShift.month || currentMonth,
        year: newShift.year || currentYear,
        user: newShift.user || "",
        department: newShift.department || "",
        role: newShift.role || "",
        timeSlot: newShift.timeSlot || ""
      });
      
      setShifts(mockService.getShifts());
      setIsDialogOpen(false);
      setNewShift({
        day: 1,
        month: currentMonth,
        year: currentYear,
        user: "",
        department: "",
        role: "",
        timeSlot: ""
      });
      
      showSuccess("Turno adicionado com sucesso");
    } catch (error) {
      showError("Erro ao adicionar turno");
    }
  };
  
  const handlePrint = () => {
    showSuccess("Preparando impressão da escala");
    // In a real app, this would open a print dialog
  };
  
  const handleExport = () => {
    showSuccess("Exportando escala");
    // In a real app, this would download a file
  };

  // Format date for display
  const formatEventDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "dd 'de' MMMM', 'yyyy");
    } catch (error) {
      return dateStr;
    }
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const totalCells = firstDay + daysInMonth;
    const totalRows = Math.ceil(totalCells / 7);
    let dayCounter = 1;
    let calendarRows = [];
    
    for (let row = 0; row < totalRows; row++) {
      let rowCells = [];
      
      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;
        
        if (cellIndex < firstDay || dayCounter > daysInMonth) {
          // Empty cell
          rowCells.push(<td key={`empty-${cellIndex}`} className="border p-0.5 md:p-1"></td>);
        } else {
          // Valid day cell
          const day = dayCounter;
          const currentDate = new Date(currentYear, currentMonth, day);
          const currentShifts = shifts.filter(a => 
            a.day === day && 
            a.month === currentMonth && 
            a.year === currentYear
          );
          
          // Check if this day is within the selected event's date range
          let isEventDay = false;
          let isEventStart = false;
          let isEventEnd = false;
          
          if (currentEventData) {
            const eventStart = new Date(currentEventData.startDate);
            const eventEnd = new Date(currentEventData.endDate);
            
            isEventDay = currentDate >= eventStart && currentDate <= eventEnd;
            isEventStart = currentDate.getDate() === eventStart.getDate() && 
                           currentDate.getMonth() === eventStart.getMonth() && 
                           currentDate.getFullYear() === eventStart.getFullYear();
            isEventEnd = currentDate.getDate() === eventEnd.getDate() && 
                         currentDate.getMonth() === eventEnd.getMonth() && 
                         currentDate.getFullYear() === eventEnd.getFullYear();
          }
          
          rowCells.push(
            <td 
              key={`day-${day}`} 
              className={cn(
                "border p-0.5 md:p-1 align-top relative",
                isEventDay && "bg-primary/5",
                isEventStart && "border-l-4 border-l-primary",
                isEventEnd && "border-r-4 border-r-primary"
              )}
            >
              <div className="min-h-[80px] md:min-h-[100px]">
                <div className={cn(
                  "text-right mb-1 flex justify-between items-center",
                  isEventDay && "font-semibold"
                )}>
                  {isEventStart && (
                    <span className="text-xs bg-primary/20 text-primary rounded-sm px-1">
                      Início
                    </span>
                  )}
                  <span className="text-xs md:text-sm font-medium">{day}</span>
                </div>
                
                {isEventDay && (
                  <div 
                    className="bg-primary/10 rounded-sm p-1 mb-1 text-xs cursor-pointer"
                    onClick={() => openEventDetails(currentDate)}
                  >
                    <span className="font-semibold">{currentEventData?.name}</span>
                  </div>
                )}
                
                <div className="space-y-1">
                  {currentShifts.map((shift, index) => (
                    <div 
                      key={index} 
                      className="p-1 text-xs rounded truncate bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors"
                      title={`${shift.user} - ${shift.role} (${shift.timeSlot})`}
                      onClick={() => showSuccess(`Detalhes do turno: ${shift.user}`)}
                    >
                      <div className="font-medium truncate">{shift.user}</div>
                      <div className="text-muted-foreground truncate">{shift.timeSlot}</div>
                    </div>
                  ))}
                  {currentShifts.length === 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full h-6 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleCreateShift(day)}
                    >
                      + Adicionar
                    </Button>
                  )}
                </div>
              </div>
            </td>
          );
          
          dayCounter++;
        }
      }
      
      calendarRows.push(<tr key={`row-${row}`}>{rowCells}</tr>);
    }
    
    return calendarRows;
  };

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Programação</h1>
            <p className="text-muted-foreground mt-1">Gerencie a escala de trabalho da sua equipe</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:self-start">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => showSuccess("Gerenciando turnos")}
            >
              <Users className="h-4 w-4" />
              Gerenciar Turnos
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => handleCreateShift()}
            >
              <CalendarIcon className="h-4 w-4" />
              Adicionar à Escala
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="w-full lg:w-64">
            <div className="sticky top-24">
              <div className="mb-4">
                <Select 
                  value={selectedEvent} 
                  onValueChange={(value) => {
                    setSelectedEvent(value);
                    const eventName = mockEvents.find(e => e.id.toString() === value)?.name;
                    if (eventName) {
                      showSuccess(`Evento selecionado: ${eventName}`);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEvents.map(event => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Select 
                  value={selectedDepartment} 
                  onValueChange={(value) => {
                    setSelectedDepartment(value);
                    showSuccess(value ? `Departamento filtrado: ${value}` : "Todos os departamentos");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os Departamentos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os Departamentos</SelectItem>
                    <SelectItem value="security">Segurança</SelectItem>
                    <SelectItem value="attendance">Atendimento</SelectItem>
                    <SelectItem value="logistics">Logística</SelectItem>
                    <SelectItem value="it">TI</SelectItem>
                    <SelectItem value="administrative">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Detalhes do Evento</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {currentEventData ? (
                    <>
                      <div>
                        <span className="text-muted-foreground">Início:</span> {formatEventDate(currentEventData.startDate)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fim:</span> {formatEventDate(currentEventData.endDate)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span> 
                        <span className={cn(
                          "ml-1 px-2 py-0.5 rounded-full text-xs",
                          currentEventData.status === "active" ? "bg-green-500/20 text-green-600" :
                          currentEventData.status === "upcoming" ? "bg-blue-500/20 text-blue-600" :
                          "bg-gray-500/20 text-gray-600"
                        )}>
                          {currentEventData.status === "active" ? "Ativo" : 
                           currentEventData.status === "upcoming" ? "Próximo" : "Concluído"}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Departamentos:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentEventData.departments.map((dept, index) => (
                            <span key={index} className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                              {dept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Selecione um evento para ver detalhes</p>
                  )}
                </CardContent>
              </Card>
              
              <div className="p-4 border rounded-lg bg-card mb-4">
                <h3 className="font-medium mb-2">Legenda</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                    <span className="text-sm">Supervisor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500/80"></div>
                    <span className="text-sm">Atendente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-sm">Técnico</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-medium mb-2">Turnos Disponíveis</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>12:00 - 20:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>16:00 - 00:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="border rounded-lg bg-card p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-medium">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Escolher Data
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(date) => {
                          if (date) {
                            setCurrentDate(date);
                          }
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="sm" onClick={handleToday}>Hoje</Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => showSuccess("Filtros abertos")}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {dayNames.map((day, index) => (
                        <th key={index} className="border p-2 text-sm font-medium text-muted-foreground">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {generateCalendarGrid()}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium">
                  {shifts.filter(s => s.month === currentMonth && s.year === currentYear).length}
                </span> turnos agendados
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handlePrint}>Imprimir</Button>
                <Button variant="outline" size="sm" onClick={handleExport}>Exportar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialog for creating new shift */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Turno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="user" className="text-sm font-medium">Usuário</label>
              <Input
                id="user"
                value={newShift.user || ""}
                onChange={(e) => setNewShift({...newShift, user: e.target.value})}
                placeholder="Nome do usuário"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">Departamento</label>
              <Input
                id="department"
                value={newShift.department || ""}
                onChange={(e) => setNewShift({...newShift, department: e.target.value})}
                placeholder="Departamento"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Função</label>
              <Input
                id="role"
                value={newShift.role || ""}
                onChange={(e) => setNewShift({...newShift, role: e.target.value})}
                placeholder="Função"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="timeSlot" className="text-sm font-medium">Horário</label>
              <Input
                id="timeSlot"
                value={newShift.timeSlot || ""}
                onChange={(e) => setNewShift({...newShift, timeSlot: e.target.value})}
                placeholder="08:00 - 16:00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="day" className="text-sm font-medium">Dia</label>
              <Input
                id="day"
                type="number"
                min={1}
                max={daysInMonth}
                value={newShift.day || 1}
                onChange={(e) => setNewShift({...newShift, day: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveShift}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for event details */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Evento</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentEventData && selectedDateForEvents ? (
              <Card>
                <CardHeader>
                  <CardTitle>{currentEventData.name}</CardTitle>
                  <CardDescription>
                    {format(selectedDateForEvents, "dd 'de' MMMM', 'yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Descrição</h3>
                    <p className="text-sm text-muted-foreground">{currentEventData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Departamentos</h3>
                    <div className="flex flex-wrap gap-1">
                      {currentEventData.departments.map((dept, index) => (
                        <span key={index} className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Turnos agendados para este dia</h3>
                    {shifts.filter(s => 
                      s.day === selectedDateForEvents.getDate() && 
                      s.month === selectedDateForEvents.getMonth() && 
                      s.year === selectedDateForEvents.getFullYear()
                    ).length > 0 ? (
                      <div className="space-y-2">
                        {shifts.filter(s => 
                          s.day === selectedDateForEvents.getDate() && 
                          s.month === selectedDateForEvents.getMonth() && 
                          s.year === selectedDateForEvents.getFullYear()
                        ).map((shift, index) => (
                          <div key={index} className="p-2 rounded bg-card border">
                            <div className="font-medium">{shift.user}</div>
                            <div className="text-sm text-muted-foreground">
                              {shift.role} ({shift.timeSlot})
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhum turno agendado para este dia</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p>Carregando detalhes do evento...</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>Fechar</Button>
            <Button onClick={() => {
              setIsEventDialogOpen(false);
              handleCreateShift(selectedDateForEvents?.getDate());
            }}>
              Adicionar Turno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
