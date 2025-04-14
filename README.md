# 🚀 MVP Organograma - React + TypeScript + Supabase

Projeto MVP de um sistema simples de **organograma**, criado com o objetivo de **retomar os estudos com React + TypeScript**.

⚠️ Este projeto **não é indicado como referência de boas práticas** — foi desenvolvido rapidamente para fins de estudo e deploy funcional. Pode (e deve) ser melhorado com o uso de ferramentas como **React Hook Form**, **validações de formulário**, e **tratamento de erros mais robusto**.

---

## 📌 Funcionalidades

- ✅ CRUD de **Colaboradores**
- ✅ CRUD de **Times**
- ✅ Integração com **Supabase** (banco de dados e autenticação)
- ✅ Interface utilizando **Bootstrap** e **React Icons**

---

## 🛠 Tecnologias e Bibliotecas

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Supabase](https://supabase.com/)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Node.js `v18.19.1`

---

## 📦 Dependências utilizadas

```json
"dependencies": {
  "@supabase/supabase-js": "^2.49.4",
  "bootstrap": "^5.3.5",
  "react-icons": "^5.5.0"
}
```

---

## 🧪 Passo a Passo para Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/VictorIshizuka/organograma.git
cd organograma
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Você pode encontrar esses dados no painel do seu projeto no Supabase, em **Project Settings > API**.

### 4. Rode o projeto em modo de desenvolvimento
```bash
npm run dev
```

### 5. Abra no navegador
Acesse:
```bash
http://localhost:5173
```
ou
```bash
http://localhost:3000
```

---

## 🌐 Deploy em Produção
A aplicação está disponível em produção via Vercel:

👉 **https://organograma-smoky.vercel.app/**

---

## ⚠️ Aviso sobre Boas Práticas
Este projeto foi desenvolvido como MVP rápido e funcional, portanto:

- Não utiliza **React Hook Form**
- Não possui **validações completas** de formulário
- O **tratamento de erros** ainda está superficial

Futuramente pode (e deve) ser refatorado para seguir melhores padrões.

---

## 📘 Licença
Este projeto está sob a licença MIT.

