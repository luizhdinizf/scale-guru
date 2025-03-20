
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Filter, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate days of month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

// Sample events data
const eventAssignments = [
  { 
    day: 1, 
    user: "Carlos Silva", 
    department: "Segurança", 
    role: "Supervisor", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    day: 1, 
    user: "Ana Oliveira", 
    department: "Atendimento", 
    role: "Atendente", 
    timeSlot: "12:00 - 20:00"
  },
  { 
    day: 2, 
    user: "Marcos Santos", 
    department: "TI", 
    role: "Técnico", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    day: 3, 
    user: "Juliana Costa", 
    department: "Administrativo", 
    role: "Gerente", 
    timeSlot: "09:00 - 17:00"
  },
  { 
    day: 3, 
    user: "Roberto Almeida", 
    department: "Logística", 
    role: "Coordenador", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    day: 5, 
    user: "Carlos Silva", 
    department: "Segurança", 
    role: "Supervisor", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    day: 8, 
    user: "Ana Oliveira", 
    department: "Atendimento", 
    role: "Atendente", 
    timeSlot: "12:00 - 20:00"
  },
  { 
    day: 8, 
    user: "Marcos Santos", 
    department: "TI", 
    role: "Técnico", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    day: 10, 
    user: "Juliana Costa", 
    department: "Administrativo", 
    role: "Gerente", 
    timeSlot: "09:00 - 17:00"
  },
  { 
    day: 15, 
    user: "Roberto Almeida", 
    department: "Logística", 
    role: "Coordenador", 
    timeSlot: "08:00 - 16:00"
  },
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState("1");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
          const assignments = eventAssignments.filter(a => a.day === day);
          
          rowCells.push(
            <td key={`day-${day}`} className="border p-0.5 md:p-1 align-top">
              <div className="min-h-[80px] md:min-h-[100px]">
                <div className="text-right mb-1">
                  <span className="text-xs md:text-sm font-medium">{day}</span>
                </div>
                <div className="space-y-1">
                  {assignments.map((assignment, index) => (
                    <div 
                      key={index} 
                      className="p-1 text-xs rounded truncate bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors"
                      title={`${assignment.user} - ${assignment.role} (${assignment.timeSlot})`}
                    >
                      <div className="font-medium truncate">{assignment.user}</div>
                      <div className="text-muted-foreground truncate">{assignment.timeSlot}</div>
                    </div>
                  ))}
                  {assignments.length === 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full h-6 text-xs text-muted-foreground hover:text-foreground"
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
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Gerenciar Turnos
            </Button>
            <Button className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Adicionar à Escala
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="w-full lg:w-64">
            <div className="sticky top-24">
              <div className="mb-4">
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Conferência Anual</SelectItem>
                    <SelectItem value="2">Treinamento de Equipe</SelectItem>
                    <SelectItem value="3">Plantão de Fim de Semana</SelectItem>
                    <SelectItem value="4">Operação Noturna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
                  <Button variant="outline" size="sm">Hoje</Button>
                  <Button variant="outline" size="icon">
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
                Mostrando <span className="font-medium">{eventAssignments.length}</span> turnos agendados
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Imprimir</Button>
                <Button variant="outline" size="sm">Exportar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
