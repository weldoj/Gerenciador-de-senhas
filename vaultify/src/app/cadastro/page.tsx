import { MensagemImagem } from "~/app/_components/cadastro/Mensagem";
import { CadastroCard } from "../_components/cadastroCard";

export default function SignupPage() {
  

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <CadastroCard></CadastroCard>

      <MensagemImagem
        msg="Sua conta foi criada com sucesso! "
        src="/Smiling.png"
      />
    </div>
  );
}
