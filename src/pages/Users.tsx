
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Search, Mail, Phone, Clock, Filter, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockService, User } from "@/services/mockData";
import { useAppToast } from "@/hooks/useAppToast";

export default function Users() {
  const [users, setUsers] = useState(mockService.getUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    departments: [],
    role: "",
    status: "active"
  });
  
  const { showSuccess, showError } = useAppToast();
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "inactive":
        return "bg-red-500/10 text-red-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };
  
  const handleCreateUser = () => {
    setIsDialogOpen(true);
  };
  
  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email) {
      showError("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    try {
      const createdUser = mockService.createUser({
        name: newUser.name || "",
        email: newUser.email || "",
        phone: newUser.phone || "",
        departments: newUser.departments || [],
        role: newUser.role || "",
        status: newUser.status as "active" | "inactive" | "pending" || "active"
      });
      
      setUsers(mockService.getUsers());
      setIsDialogOpen(false);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        departments: [],
        role: "",
        status: "active"
      });
      
      showSuccess("Usuário criado com sucesso");
    } catch (error) {
      showError("Erro ao criar usuário");
    }
  };
  
  const handleViewSchedule = (userId: number) => {
    showSuccess("Visualizando escala do usuário");
    // In a real app, this would navigate to the user's schedule
  };
  
  const handleMoreOptions = (userId: number) => {
    showSuccess("Opções adicionais abertas");
    // In a real app, this would open a dropdown menu
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Usuários</h1>
            <p className="text-muted-foreground mt-1">Gerencie sua equipe e suas permissões</p>
          </div>
          <Button className="flex items-center gap-2 sm:self-start" onClick={handleCreateUser}>
            <PlusCircle className="h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar usuários..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => showSuccess("Filtros abertos")}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contato</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Departamentos</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Função</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="bg-card hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">{user.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 mr-1.5" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="h-3.5 w-3.5 mr-1.5" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {user.departments.map((dept, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                            >
                              {dept}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {user.role}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2.5 py-0.5 text-xs font-medium rounded-full",
                          getStatusColor(user.status)
                        )}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleViewSchedule(user.id)}
                          >
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleMoreOptions(user.id)}
                          >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">Nenhum usuário encontrado</h3>
                        <p className="text-muted-foreground mb-4">Tente ajustar sua busca ou adicione um novo usuário</p>
                        <Button onClick={handleCreateUser}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Adicionar Usuário
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-card">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium">{filteredUsers.length}</span> de{" "}
                <span className="font-medium">{users.length}</span> usuários
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  onClick={() => showSuccess("Página anterior")}
                >
                  Anterior
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showSuccess("Próxima página")}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog for creating new user */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                value={newUser.name || ""}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Digite o nome do usuário"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <Input
                id="email"
                type="email"
                value={newUser.email || ""}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="exemplo@email.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
              <Input
                id="phone"
                value={newUser.phone || ""}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="departments" className="text-sm font-medium">Departamentos</label>
              <Input
                id="departments"
                value={newUser.departments?.join(", ") || ""}
                onChange={(e) => setNewUser({...newUser, departments: e.target.value.split(", ")})}
                placeholder="Segurança, Atendimento, etc."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Função</label>
              <Input
                id="role"
                value={newUser.role || ""}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                placeholder="Supervisor, Atendente, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveUser}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
