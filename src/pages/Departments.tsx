
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Briefcase, Users, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Departments() {
  const [departments, setDepartments] = useState([
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
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    department.events.some(event => event.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Departamentos</h1>
            <p className="text-muted-foreground mt-1">Gerencie departamentos e funções</p>
          </div>
          <Button className="flex items-center gap-2 sm:self-start">
            <PlusCircle className="h-4 w-4" />
            Novo Departamento
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar departamentos..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <div 
                key={department.id} 
                className="border rounded-xl p-6 bg-card hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{department.name}</h3>
                      <p className="text-sm text-muted-foreground">{department.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{department.members} membros</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Funções</h4>
                  <div className="flex flex-wrap gap-2">
                    {department.roles.map((role, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Eventos Ativos</h4>
                  <div className="space-y-1">
                    {department.events.map((event, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/80 transition-colors"
                      >
                        <span className="text-sm">{event}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">Gerenciar Funções</Button>
                  <Button variant="outline" size="sm">Ver Membros</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 border rounded-xl bg-card">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-1">Nenhum departamento encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar sua busca ou crie um novo departamento</p>
              <Button className="mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Departamento
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
