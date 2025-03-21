
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Search, Briefcase, Users, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockService, Department } from "@/services/mockData";
import { useAppToast } from "@/hooks/useAppToast";

export default function Departments() {
  const [departments, setDepartments] = useState(mockService.getDepartments());
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: "",
    description: "",
    members: 0,
    roles: [],
    events: []
  });
  
  const { showSuccess, showError } = useAppToast();
  
  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    department.events.some(event => event.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleCreateDepartment = () => {
    setIsDialogOpen(true);
  };
  
  const handleSaveDepartment = () => {
    if (!newDepartment.name || !newDepartment.description) {
      showError("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    try {
      const createdDepartment = mockService.createDepartment({
        name: newDepartment.name || "",
        description: newDepartment.description || "",
        members: newDepartment.members || 0,
        roles: newDepartment.roles || [],
        events: newDepartment.events || []
      });
      
      setDepartments(mockService.getDepartments());
      setIsDialogOpen(false);
      setNewDepartment({
        name: "",
        description: "",
        members: 0,
        roles: [],
        events: []
      });
      
      showSuccess("Departamento criado com sucesso");
    } catch (error) {
      showError("Erro ao criar departamento");
    }
  };
  
  const handleManageRoles = (departmentId: number) => {
    showSuccess("Gerenciando funções do departamento");
    // In a real app, this would open a dialog or navigate to a new page
  };
  
  const handleViewMembers = (departmentId: number) => {
    showSuccess("Visualizando membros do departamento");
    // In a real app, this would open a dialog or navigate to a new page
  };
  
  const handleMoreOptions = (departmentId: number) => {
    showSuccess("Opções adicionais abertas");
    // In a real app, this would open a dropdown menu
  };
  
  const handleViewEvent = (event: string) => {
    showSuccess(`Visualizando evento: ${event}`);
    // In a real app, this would navigate to the event details
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Departamentos</h1>
            <p className="text-muted-foreground mt-1">Gerencie departamentos e funções</p>
          </div>
          <Button 
            className="flex items-center gap-2 sm:self-start"
            onClick={handleCreateDepartment}
          >
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleMoreOptions(department.id)}
                  >
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
                        onClick={() => handleViewEvent(event)}
                      >
                        <span className="text-sm">{event}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleManageRoles(department.id)}
                  >
                    Gerenciar Funções
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewMembers(department.id)}
                  >
                    Ver Membros
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 border rounded-xl bg-card">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-1">Nenhum departamento encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar sua busca ou crie um novo departamento</p>
              <Button className="mt-4" onClick={handleCreateDepartment}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Criar Departamento
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog for creating new department */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Departamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                value={newDepartment.name || ""}
                onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                placeholder="Digite o nome do departamento"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input
                id="description"
                value={newDepartment.description || ""}
                onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                placeholder="Digite a descrição do departamento"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roles" className="text-sm font-medium">Funções</label>
              <Input
                id="roles"
                value={newDepartment.roles?.join(", ") || ""}
                onChange={(e) => setNewDepartment({...newDepartment, roles: e.target.value.split(", ")})}
                placeholder="Supervisor, Atendente, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveDepartment}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
