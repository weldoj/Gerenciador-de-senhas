import Image from "next/image";

interface MensagemProps {
  msg: string;
}

interface MensagemImagemProps {
  msg: string;
  src: string;
}

function MensagemImagem({ msg, src }: MensagemImagemProps) {
  return (
    <div>
      <div className="fixed bottom-16 right-0 rounded-l-2xl bg-white p-4">
        <div className="flex items-center gap-2">
          <Image src={src} alt="Mensagem" width={40} height={40} />
          {msg}
        </div>
      </div>
    </div>
  );
}

function Mensagem({ msg }: MensagemProps) {
  return (
    <div>
      <div className="fixed bottom-16 right-0 max-w-96 rounded-l-2xl bg-white p-4">
        <div className="flex items-center gap-2">{msg}</div>
      </div>
    </div>
  );
}

export { Mensagem, MensagemImagem };
