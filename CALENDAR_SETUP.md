# Integração Google Calendar - Guia de Instalação

## 📦 Instalação de Dependências

Primeiro, instale as dependências necessárias:

```bash
npm install react-big-calendar moment
npm install --save-dev @types/react-big-calendar
```

## ✅ O que foi criado

### 1. **Serviço Mock da API** (`services/calendarApi.ts`)
   - Simula chamadas à API do Google Calendar
   - Armazena eventos em memória (localStorage)
   - Estrutura preparada para migração para API real
   - Funções: `getEvents`, `createEvent`, `updateEvent`, `deleteEvent`, `connect`, `disconnect`

### 2. **Componente de Calendário** (`pages/CalendarView.tsx`)
   - Visualização completa do calendário (mês, semana, dia, agenda)
   - Criar, editar e deletar eventos
   - Modal de edição com formulário completo
   - Traduzido para português
   - Design consistente com o app

### 3. **Integração na Página Connections** (`pages/Connections.tsx`)
   - Botão para conectar/desconectar Google Calendar
   - Status da conexão
   - Link direto para visualizar o calendário quando conectado

### 4. **Rota Adicionada** (`App.tsx`)
   - Nova rota `/calendar` protegida por autenticação

### 5. **Link no Sidebar** (`components/Sidebar.tsx`)
   - Item de menu "Calendário" adicionado

## 🚀 Como Usar

### 1. Instalar dependências (se ainda não instalou)
```bash
npm install react-big-calendar moment @types/react-big-calendar
```

### 2. Conectar Google Calendar
1. Acesse a página **Conexões** (`/connections`)
2. Na seção "Google Calendar", clique em **"Autorizar Acesso"**
3. O status mudará para "Sincronizado"

### 3. Visualizar Calendário
- Clique em **"Ver Calendário"** na página Connections, ou
- Use o menu lateral e clique em **"Calendário"**

### 4. Criar Agendamento
- Clique em um slot vazio no calendário, ou
- Clique no botão **"Novo Agendamento"** no topo
- Preencha os dados e clique em **"Salvar"**

### 5. Editar Agendamento
- Clique em um evento existente no calendário
- Modifique os dados no modal
- Clique em **"Salvar"**

### 6. Deletar Agendamento
- Clique em um evento existente
- Clique no botão **"Deletar"** (ícone de lixeira)
- Confirme a exclusão

## 🎨 Funcionalidades

- ✅ Visualização em múltiplas views (Mês, Semana, Dia, Agenda)
- ✅ Criar novos agendamentos
- ✅ Editar agendamentos existentes
- ✅ Deletar agendamentos
- ✅ Navegação entre meses/semanas
- ✅ Formulário completo com dados do cliente
- ✅ Tradução para português
- ✅ Design responsivo

## 🔄 Migração para API Real

Quando o backend estiver pronto, basta:

1. **Atualizar `services/calendarApi.ts`**:
   - Descomentar o código no final do arquivo (seção TODO)
   - Remover as funções mock
   - Usar as chamadas reais de API

2. **Configurar variáveis de ambiente**:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

3. **Backend precisa implementar**:
   - `GET /api/calendar/events` - Listar eventos
   - `POST /api/calendar/events` - Criar evento
   - `PUT /api/calendar/events/:id` - Atualizar evento
   - `DELETE /api/calendar/events/:id` - Deletar evento
   - `GET /api/calendar/status` - Status da conexão
   - `POST /api/auth/google/calendar` - OAuth do Google
   - `POST /api/calendar/disconnect` - Desconectar

## 📝 Notas

- Os eventos são armazenados em `localStorage` (mock)
- A conexão do Google Calendar é simulada (mock)
- Quando migrar para API real, os eventos serão sincronizados com o Google Calendar real
- O calendário funciona completamente offline no modo mock

## 🐛 Troubleshooting

**Erro: "Cannot find module 'react-big-calendar'"**
- Execute: `npm install react-big-calendar moment`

**Calendário não aparece**
- Verifique se o CSS está sendo importado: `import 'react-big-calendar/lib/css/react-big-calendar.css';`
- Verifique o console do navegador para erros

**Eventos não aparecem**
- Verifique se você está conectado ao Google Calendar na página Connections
- Verifique o console para erros de carregamento

