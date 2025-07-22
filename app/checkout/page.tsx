"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const schema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  documento: z.string().min(11, "Informe CPF ou CNPJ válido"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const total = cartItems.reduce((acc, item) => acc + item.preco, 0);

  const onSubmit = async (data: FormData) => {
    // 1. Executa o reCAPTCHA invisível
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    if (!token) {
      alert("Falha na verificação do reCAPTCHA.");
      return;
    }

    // 2. Envia o token para o backend para verificação
    const verify = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await verify.json();

    // 3. Verifica a resposta do backend
    if (!result.success) {
      console.error("Erro reCAPTCHA:", result.error);
      alert("Verificação do reCAPTCHA falhou. Por favor, tente novamente.");
      return;
    }

    // 4. Tudo certo: processa o pedido
    console.log("Dados validados:", data, cartItems);
    clearCart();
    router.push("/obrigado");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Finalizar Pedido</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio.</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto bg-gray-50 p-8 rounded shadow space-y-6"
        >
          <input type="hidden" name="g-recaptcha-response" />

          <div>
            <label className="block font-medium mb-1">Nome completo</label>
            <input
              {...register("nome")}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.nome && (
              <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">E-mail</label>
            <input
              {...register("email")}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">CPF ou CNPJ</label>
            <input
              {...register("documento")}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.documento && (
              <p className="text-red-600 text-sm mt-1">
                {errors.documento.message}
              </p>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="font-semibold">
              Total a pagar:{" "}
              <span className="text-green-600">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full"
          >
            Concluir Pedido
          </button>

          <ReCAPTCHA
            sitekey="6Lc1nIsrAAAAABVjNBpqYr63EudIpmeX0xAuGhv7"
            size="invisible"
            ref={recaptchaRef}
          />
        </form>
      )}
    </div>
  );
}
