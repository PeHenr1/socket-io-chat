# 💬 Socket.IO Chat [Fiui, olha a mensagem!]

Um simples **chat em tempo real** construído com **Socket.IO**, **React** no frontend e **Node.js + Express** no backend. Um projeto desenvolvido com fins acadêmicos como parte de uma avaliação da disciplina de Redes de Computadores.

---

## 🚀 Tópicos

- [🔧 Tecnologias](#-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [💻 Como Executar o Projeto](#-como-executar-o-projeto)
- [🧩 Como Funciona](#-como-funciona)
- [⭐ Funcionalidades](#-funcionalidades)
- [🛠️ Contribuições](#️-contribuições)
- [📄 Licença](#-licença)
- [🔍 Observações](#-observações)

---

## 🔧 Tecnologias

- **Socket.IO**
- **Backend**: Node.js + Express
- **Frontend**: React
- **Estilização**: Bootstrap + React-Bootstrap

---

## 📁 Estrutura do Projeto

```bash
socket/
├── back/           # Servidor
│   ├── node_modules/
│   ├── package.json
│   └── server.js    # Configura e roda o servidor Socket.IO + Express
│
├── front/          # Cliente
│   ├── node_modules/
│   ├── package.json
│   └── src/         # Componentes React, lógica do chat, etc.
│
└── .gitignore       # Ignora node_modules e arquivos sensíveis
```


## ⚙️ Pré-requisitos e Instalação

✅ Ter o **Node.js** instalado:  
🔗 [Download Node.js](https://nodejs.org/)

---

## 💻 Como Executar o Projeto

### 🖥 Backend (`/back`)

```bash
# Acesse a pasta do servidor
cd socket/back

# Instale as dependências
npm install socket.io
npm install express
npm install cors

# Verifique se os pacotes foram instalados corretamente
npm list express socket.io

# Inicie o servidor
node server.js
```

### 🌐 Frontend (`/front`)

```bash
# Crie o projeto React (caso ainda não tenha criado)
npx create-react-app front

# Acesse a pasta
cd socket/front

# Instale os pacotes necessários
npm install socket.io-client axios
npm install react-bootstrap bootstrap

# Inicie o frontend
npm start
```

## 🧩 Como Funciona

1. O cliente React se conecta ao servidor usando **Socket.IO**.
2. O usuário informa um nickname e entra no chat.
3. Mensagens são enviadas ao servidor e imediatamente distribuídas para todos os usuários conectados.
4. A lista de usuários online é atualizada em tempo real conforme novas conexões e desconexões ocorrem.

---

## ⭐ Funcionalidades

- ✅ Comunicação em tempo real via WebSockets (Socket.IO)
- 👥 Lista de usuários online
- 🔐 Login com nickname
- 📥 Exibição automática de novas mensagens no chat
- 📤 Input de mensagem com envio via botão ou tecla Enter
- 💡 Interface moderna com React e Bootstrap
- ⚡ Atualização instantânea sem necessidade de recarregar a página

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Você é livre para usá-lo, modificar, estudar e compartilhar. Só lembre de dar os devidos créditos. 🤝

---

## 🔍 Observações

💬 Este projeto é **aberto para contribuições**!  
Se você quiser adicionar novas funcionalidades, corrigir bugs ou melhorar o design, **sinta-se à vontade para colaborar**.

🚧 **Melhorias futuras estão planejadas**, como:
- Autenticação mais funcional e robusta
- Armazenamento de histórico de mensagens
- Interface dark/light mode
- Suporte a múltiplas salas(?)
- Melhorias no sistema de expiração de sessão..

Vamos construir juntos! 🙌

---

## 🎬 Demonstração
[Vídeo do Youtube](https://youtu.be/RGohpY7b_vY)

Feito com ❤️ por @PeHenr1 e @matos-vinicius
