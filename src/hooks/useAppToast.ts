
import { useToast } from "@/hooks/use-toast";

export function useAppToast() {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Sucesso",
      description: message,
      variant: "default",
    });
  };

  const showError = (message: string) => {
    toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
  };

  const showInfo = (message: string) => {
    toast({
      title: "Informação",
      description: message,
    });
  };

  return { showSuccess, showError, showInfo };
}
