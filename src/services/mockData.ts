
// Mock data service for the application

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  departments: string[];
  role: string;
  status: "active" | "inactive" | "pending";
}

export interface Department {
  id: number;
  name: string;
  description: string;
  members: number;
  roles: string[];
  events: string[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  departments: string[];
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed";
}

export interface Shift {
  id: number;
  day: number;
  month: number;
  year: number;
  user: string;
  department: string;
  role: string;
  timeSlot: string;
}

// Mock data
export const mockUsers: User[] = [
  { 
    id: 1, 
    name: "Carlos Silva", 
    email: "carlos.silva@email.com", 
    phone: "(11) 98765-4321",
    departments: ["Segurança"],
    role: "Supervisor",
    status: "active"
  },
  { 
    id: 2, 
    name: "Ana Oliveira", 
    email: "ana.oliveira@email.com", 
    phone: "(11) 91234-5678",
    departments: ["Atendimento", "Recepção"],
    role: "Atendente",
    status: "active"
  },
  { 
    id: 3, 
    name: "Marcos Santos", 
    email: "marcos.santos@email.com", 
    phone: "(11) 99876-5432",
    departments: ["TI"],
    role: "Técnico",
    status: "inactive"
  },
  { 
    id: 4, 
    name: "Juliana Costa", 
    email: "juliana.costa@email.com", 
    phone: "(11) 95555-1234",
    departments: ["Administrativo"],
    role: "Gerente",
    status: "active"
  },
  { 
    id: 5, 
    name: "Roberto Almeida", 
    email: "roberto.almeida@email.com", 
    phone: "(11) 94444-9876",
    departments: ["Logística"],
    role: "Coordenador",
    status: "pending"
  },
];

export const mockDepartments: Department[] = [
  { 
    id: 1, 
    name: "Segurança", 
    description: "Equipe responsável pela segurança do evento", 
    members: 12,
    roles: ["Supervisor", "Agente", "Coordenador"],
    events: ["Conferência Anual", "Plantão de Fim de Semana"]
  },
  { 
    id: 2, 
    name: "Atendimento", 
    description: "Equipe de atendimento ao público", 
    members: 8,
    roles: ["Atendente", "Gerente"],
    events: ["Conferência Anual", "Treinamento de Equipe"]
  },
  { 
    id: 3, 
    name: "Logística", 
    description: "Gerenciamento de materiais e transporte", 
    members: 6,
    roles: ["Coordenador", "Assistente", "Motorista"],
    events: ["Conferência Anual"]
  },
  { 
    id: 4, 
    name: "TI", 
    description: "Suporte técnico e infraestrutura tecnológica", 
    members: 5,
    roles: ["Técnico", "Analista", "Gerente"],
    events: ["Operação Noturna", "Plantão de Fim de Semana"]
  },
  { 
    id: 5, 
    name: "Administrativo", 
    description: "Gestão administrativa e financeira", 
    members: 4,
    roles: ["Gerente", "Assistente", "Analista"],
    events: ["Conferência Anual"]
  },
];

export const mockEvents: Event[] = [
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
];

export const mockShifts: Shift[] = [
  { 
    id: 1,
    day: 1,
    month: 9,
    year: 2023,
    user: "Carlos Silva", 
    department: "Segurança", 
    role: "Supervisor", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    id: 2,
    day: 1,
    month: 9,
    year: 2023,
    user: "Ana Oliveira", 
    department: "Atendimento", 
    role: "Atendente", 
    timeSlot: "12:00 - 20:00"
  },
  { 
    id: 3,
    day: 2,
    month: 9,
    year: 2023,
    user: "Marcos Santos", 
    department: "TI", 
    role: "Técnico", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    id: 4,
    day: 3,
    month: 9,
    year: 2023,
    user: "Juliana Costa", 
    department: "Administrativo", 
    role: "Gerente", 
    timeSlot: "09:00 - 17:00"
  },
  { 
    id: 5,
    day: 3,
    month: 9,
    year: 2023,
    user: "Roberto Almeida", 
    department: "Logística", 
    role: "Coordenador", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    id: 6,
    day: 5,
    month: 9,
    year: 2023,
    user: "Carlos Silva", 
    department: "Segurança", 
    role: "Supervisor", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    id: 7,
    day: 8,
    month: 9,
    year: 2023,
    user: "Ana Oliveira", 
    department: "Atendimento", 
    role: "Atendente", 
    timeSlot: "12:00 - 20:00"
  },
  { 
    id: 8,
    day: 8,
    month: 9,
    year: 2023,
    user: "Marcos Santos", 
    department: "TI", 
    role: "Técnico", 
    timeSlot: "08:00 - 16:00"
  },
  { 
    id: 9,
    day: 10,
    month: 9,
    year: 2023,
    user: "Juliana Costa", 
    department: "Administrativo", 
    role: "Gerente", 
    timeSlot: "09:00 - 17:00"
  },
  { 
    id: 10,
    day: 15,
    month: 9,
    year: 2023,
    user: "Roberto Almeida", 
    department: "Logística", 
    role: "Coordenador", 
    timeSlot: "08:00 - 16:00"
  },
];

// Mock service functions
export const mockService = {
  // User functions
  getUsers: () => [...mockUsers],
  getUserById: (id: number) => mockUsers.find(user => user.id === id),
  createUser: (user: Omit<User, "id">) => {
    const newUser = { ...user, id: mockUsers.length + 1 };
    mockUsers.push(newUser);
    return newUser;
  },
  updateUser: (id: number, user: Partial<User>) => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return null;
    mockUsers[index] = { ...mockUsers[index], ...user };
    return mockUsers[index];
  },
  deleteUser: (id: number) => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return false;
    mockUsers.splice(index, 1);
    return true;
  },
  
  // Department functions
  getDepartments: () => [...mockDepartments],
  getDepartmentById: (id: number) => mockDepartments.find(dept => dept.id === id),
  createDepartment: (department: Omit<Department, "id">) => {
    const newDepartment = { ...department, id: mockDepartments.length + 1 };
    mockDepartments.push(newDepartment);
    return newDepartment;
  },
  updateDepartment: (id: number, department: Partial<Department>) => {
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) return null;
    mockDepartments[index] = { ...mockDepartments[index], ...department };
    return mockDepartments[index];
  },
  deleteDepartment: (id: number) => {
    const index = mockDepartments.findIndex(d => d.id === id);
    if (index === -1) return false;
    mockDepartments.splice(index, 1);
    return true;
  },
  
  // Event functions
  getEvents: () => [...mockEvents],
  getEventById: (id: number) => mockEvents.find(event => event.id === id),
  createEvent: (event: Omit<Event, "id">) => {
    const newEvent = { ...event, id: mockEvents.length + 1 };
    mockEvents.push(newEvent);
    return newEvent;
  },
  updateEvent: (id: number, event: Partial<Event>) => {
    const index = mockEvents.findIndex(e => e.id === id);
    if (index === -1) return null;
    mockEvents[index] = { ...mockEvents[index], ...event };
    return mockEvents[index];
  },
  deleteEvent: (id: number) => {
    const index = mockEvents.findIndex(e => e.id === id);
    if (index === -1) return false;
    mockEvents.splice(index, 1);
    return true;
  },
  
  // Shift functions
  getShifts: () => [...mockShifts],
  getShiftsByMonth: (month: number, year: number) => 
    mockShifts.filter(shift => shift.month === month && shift.year === year),
  getShiftById: (id: number) => mockShifts.find(shift => shift.id === id),
  createShift: (shift: Omit<Shift, "id">) => {
    const newShift = { ...shift, id: mockShifts.length + 1 };
    mockShifts.push(newShift);
    return newShift;
  },
  updateShift: (id: number, shift: Partial<Shift>) => {
    const index = mockShifts.findIndex(s => s.id === id);
    if (index === -1) return null;
    mockShifts[index] = { ...mockShifts[index], ...shift };
    return mockShifts[index];
  },
  deleteShift: (id: number) => {
    const index = mockShifts.findIndex(s => s.id === id);
    if (index === -1) return false;
    mockShifts.splice(index, 1);
    return true;
  },
};
