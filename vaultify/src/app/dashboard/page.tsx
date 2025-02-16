"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { PasswordCard } from "../_components/password-cards";
import { AppLayout } from "../_components/layouts/app-layout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ websiteName, email, password, image });
    setIsOpen(false);
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const dados = [
    {
      name: "Linkedin",
      logo: "/linkedin.avif",
    },
    {
      name: "X",
      logo: "/twitter.webp",
    },
    {
      name: "Netflix",
      logo: "/netflix.png",
    },
  ];
  const handleAddPassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/store_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          site: "nomdeDoSite", // Nome do site
          email: "usuario@email.com", // E-mail do usuário
          password: "minhaSenha123", // Senha que será criptografada no backend
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar senha");
      }

      const result = await response.json();
      console.log(result); // Mensagem de sucesso do backend
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <TooltipProvider>
      <AppLayout activeItem="passwords">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dados.map((password) => (
            <PasswordCard
              key={password.name}
              name={password.name}
              logo={password.logo}
            />
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-white p-0 text-black hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
                size="icon"

              >
              <Plus className="h-6 w-6" />
              </Button>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                  <div className="w-full max-w-md rounded-lg bg-white p-8">
                    <h2 className="mb-4 text-2xl font-bold">
                      Website Information
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="websiteName">Website Name</Label>
                        <Input
                          id="websiteName"
                          type="text"
                          value={websiteName}
                          onChange={(e) => setWebsiteName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </div> */}
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-white">Adicionar nova senha</p>
          </TooltipContent>
        </Tooltip>
      </AppLayout>
    </TooltipProvider>
  );
}
