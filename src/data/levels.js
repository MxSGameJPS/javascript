// dados simplificados dos níveis e perguntas (apenas Iniciante implementado por enquanto)
const levels = {
  iniciante: {
    id: 1,
    slug: "iniciante",
    titulo: "Iniciante",
    questoes: 10,
    gemsTotal: 150,
    perQuestionGems: 150 / 10, // 15
    perguntas: [
      {
        id: 1,
        pergunta: "O que é o Next.js?",
        alternativas: [
          "Uma linguagem de programação completamente nova.",
          "Um banco de dados para aplicações React.",
          "Uma biblioteca para estilização de componentes, como o CSS.",
          "Um framework React para desenvolvimento de aplicações web.",
        ],
        correta: 3,
        explicacao:
          "Next.js é um framework React para desenvolvimento de aplicações web, com recursos de SSR/SSG e otimizações de performance.",
      },
      {
        id: 2,
        pergunta:
          "Qual é a principal vantagem do Next.js em relação a uma aplicação React padrão (criada com Create React App)?",
        alternativas: [
          "Possui mais componentes de interface prontos para usar.",
          "A capacidade de escrever código HTML de forma mais fácil.",
          "A otimização para SEO e performance através da pré-renderização (SSR e SSG).",
          "É a única forma de usar TypeScript com React.",
        ],
        correta: 2,
        explicacao:
          "Next.js permite pré-renderização (SSR/SSG) melhorando SEO e tempo de primeira pintura em comparação com aplicações puramente client-side.",
      },
      {
        id: 3,
        pergunta:
          "Como você cria uma nova página com a rota '/sobre' em um projeto Next.js?",
        alternativas: [
          "Criando um componente chamado 'Sobre' e importando na página principal.",
          "Criando um arquivo chamado 'sobre.js' dentro da pasta 'pages'.",
          "Adicionando uma nova rota em um arquivo de configuração central.",
          "Executando o comando 'npx next create-page sobre'.",
        ],
        correta: 1,
        explicacao:
          "No app-router (Next 13+), você cria uma pasta 'app/sobre' com um 'page.js' — no antigo pages-router criava-se 'pages/sobre.js'.",
      },
      {
        id: 4,
        pergunta: "Qual comando é usado para iniciar um novo projeto Next.js?",
        alternativas: [
          "npm init next-app",
          "npx create-react-app",
          "npx start-next-project",
          "npx create-next-app@latest",
        ],
        correta: 3,
        explicacao:
          "O comando moderno é 'npx create-next-app@latest' para scaffold de novos projetos Next.js.",
      },
      {
        id: 5,
        pergunta:
          "Depois de criar seu projeto, qual comando você usa para iniciar o servidor de desenvolvimento?",
        alternativas: [
          "npx next start",
          "npm run dev",
          "npm start",
          "npm run serve",
        ],
        correta: 1,
        explicacao:
          "Em geral o script 'dev' no package.json executa 'next dev' — 'npm run dev' inicia o servidor de desenvolvimento.",
      },
      {
        id: 6,
        pergunta:
          "Para que serve o componente `<Link>` importado de 'next/link'?",
        alternativas: [
          "Para conectar a aplicação a APIs externas.",
          "Para habilitar a navegação entre páginas do lado do cliente (client-side), sem recarregar a página.",
          "Para criar links externos que abrem em uma nova aba.",
          "Para estilizar links, funcionando como uma tag `<a>` com superpoderes de CSS.",
        ],
        correta: 1,
        explicacao:
          "`Link` permite navegação client-side no Next.js, melhorando UX evitando full reloads.",
      },
      {
        id: 7,
        pergunta: "Qual é a finalidade principal do diretório `pages/api` ?",
        alternativas: [
          "Para criar endpoints de API (backend) que podem ser acessados pela aplicação.",
          "Para armazenar a documentação da API do projeto.",
          "Para guardar os componentes React que consomem APIs.",
          "Para configurar as chaves de API de serviços externos.",
        ],
        correta: 0,
        explicacao:
          "O diretório 'pages/api' (pages-router) cria endpoints serverless acessíveis via /api/*.",
      },
      {
        id: 8,
        pergunta:
          "O que é 'Pré-renderização' (Pre-rendering) no contexto do Next.js?",
        alternativas: [
          "É o processo de carregar todos os arquivos JavaScript no navegador antes do usuário interagir.",
          "O Next.js gera o HTML para cada página com antecedência, em vez de fazer tudo no navegador do cliente.",
          "É o nome dado ao processo de compilação do código TypeScript para JavaScript.",
          "Uma técnica para prever qual página o usuário vai visitar e já carregá-la.",
        ],
        correta: 1,
        explicacao:
          "Pré-renderização refere-se a SSR/SSG — gerar HTML no servidor ou build time para melhorar performance/SEO.",
      },
      {
        id: 9,
        pergunta: "Qual é a função do arquivo `_app.js` (ou `_app.tsx`)?",
        alternativas: [
          "É a página principal (homepage) da aplicação.",
          "É o arquivo de configuração principal do Next.js.",
          "É um componente de ordem superior que envolve todas as páginas, útil para layouts e estados globais.",
          "Serve para definir todas as rotas da aplicação manualmente.",
        ],
        correta: 2,
        explicacao:
          "`_app.js` no pages-router é um wrapper para todas as páginas — útil para providers, layouts e CSS global.",
      },
      {
        id: 10,
        pergunta:
          "Qual dos seguintes métodos de renderização gera a página em tempo de build (build time)?",
        alternativas: [
          "Incremental Static Regeneration (ISR)",
          "Server-side Rendering (SSR)",
          "Client-side Rendering (CSR)",
          "Static Site Generation (SSG)",
        ],
        correta: 3,
        explicacao:
          "SSG (Static Site Generation) gera páginas em tempo de build. ISR é SSG com revalidação incremental.",
      },
    ],
  },
};

export default levels;
