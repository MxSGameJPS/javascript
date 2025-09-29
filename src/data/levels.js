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
  intermediario: {
    id: 2,
    slug: "intermediario",
    titulo: "Intermediário",
    questoes: 10,
    gemsTotal: 150,
    perQuestionGems: 150 / 10,
    perguntas: [
      {
        id: 1,
        pergunta: "Quando a função `getStaticProps` é executada?",
        alternativas: [
          "Quando o usuário clica em um link para navegar para a página.",
          "Apenas uma vez, em tempo de build (construção), no lado do servidor.",
          "A cada requisição do usuário, no lado do servidor.",
          "No lado do cliente (browser), depois que a página é carregada.",
        ],
        correta: 1,
        explicacao:
          "getStaticProps é executado em tempo de build para gerar páginas estáticas.",
      },
      {
        id: 2,
        pergunta:
          "Em que situação você deve escolher `getServerSideProps` em vez de `getStaticProps` ?",
        alternativas: [
          "Quando você quer que a página carregue o mais rápido possível para todos os usuários.",
          "Para uma página cujo conteúdo precisa estar sempre atualizado e muda a cada requisição.",
          "Quando a página não precisa de dados externos para ser renderizada.",
          "Para uma página de blog que raramente é atualizada.",
        ],
        correta: 1,
        explicacao:
          "getServerSideProps roda a cada requisição, útil quando os dados mudam frequentemente.",
      },
      {
        id: 3,
        pergunta:
          "Como você cria uma rota dinâmica para exibir posts de um blog, como `/blog/[slug]` ?",
        alternativas: [
          "Criando um arquivo chamado `[slug].js` dentro da pasta `pages/blog` .",
          "Configurando a rota manualmente no arquivo `next.config.js` .",
          "Criando um arquivo chamado `blog.js` e usando o hook `useRouter` para pegar o slug.",
          "Criando uma pasta chamada `[slug]` dentro de `pages/blog` .",
        ],
        correta: 3,
        explicacao:
          "No router baseado em pastas, cria-se `pages/blog/[slug].js` (ou app/router equivalente).",
      },
      {
        id: 4,
        pergunta:
          "Qual é a principal função da `getStaticPaths` em uma página dinâmica?",
        alternativas: [
          "Buscar os dados (props) para a página, como o conteúdo de um post.",
          "Redirecionar o usuário para uma nova página caso o caminho não seja encontrado.",
          "Especificar quais caminhos (rotas) dinâmicos devem ser pré-renderizados em tempo de build.",
          "Criar os endpoints de API para as rotas dinâmicas.",
        ],
        correta: 2,
        explicacao:
          "getStaticPaths informa ao Next quais rotas dinâmicas gerar em tempo de build.",
      },
      {
        id: 5,
        pergunta:
          "Qual é o principal benefício de usar o componente `<Image>` de `next/image` em vez da tag `<img>` do HTML?",
        alternativas: [
          "Ele aplica filtros de cor automaticamente, como sépia ou preto e branco.",
          "Otimização automática de imagens, como lazy loading, redimensionamento e conversão para formatos modernos (WebP).",
          "Ele permite usar apenas imagens no formato SVG.",
          "Ele centraliza a imagem na página por padrão.",
        ],
        correta: 1,
        explicacao:
          "next/image cuida de otimizações de imagens automaticamente para melhor performance.",
      },
      {
        id: 6,
        pergunta:
          "Como você adiciona uma tag `<title>` diferente para cada página em um projeto Next.js?",
        alternativas: [
          "Usando o componente `<Head>` importado de `next/head` dentro de cada página.",
          "Editando diretamente o arquivo `index.html` na pasta `public`.",
          "Configurando um objeto `titles` no arquivo `next.config.js`.",
          "Passando uma prop `title` para o componente no arquivo `_app.js`.",
        ],
        correta: 0,
        explicacao:
          "O componente Head permite definir meta e title por página.",
      },
      {
        id: 7,
        pergunta:
          "Como você define uma variável de ambiente que só pode ser acessada no lado do servidor (ex: em `getServerSideProps`)?",
        alternativas: [
          "Adicionando a variável diretamente no arquivo `next.config.js`.",
          "Criando um arquivo `.env.local` e nomeando a variável como `MY_SECRET_KEY`.",
          "Criando um arquivo `.env.local` e nomeando a variável como `NEXT_PUBLIC_SECRET_KEY`.",
          "Criando um arquivo `.env.local` e nomeando a variável como `REACT_APP_SECRET_KEY`.",
        ],
        correta: 1,
        explicacao:
          "Variáveis privadas não devem começar com NEXT_PUBLIC_ e podem ser colocadas em .env.local.",
      },
      {
        id: 8,
        pergunta: "Qual é a principal finalidade de um Middleware no Next.js?",
        alternativas: [
          "Buscar dados para uma página específica, de forma similar a `getStaticProps`.",
          "Executar código no servidor antes de uma requisição ser completada.",
          "Gerenciar o estado global da aplicação, como o Redux.",
          "Otimizar imagens e fontes para melhorar a performance.",
        ],
        correta: 1,
        explicacao:
          "Middleware permite executar lógica no edge/server antes de servir a rota (auth, redirects).",
      },
      {
        id: 9,
        pergunta:
          "Em uma API Route (`pages/api/user.js`), como você pode lidar com diferentes métodos HTTP (como GET e POST) no mesmo arquivo?",
        alternativas: [
          "Criando duas funções separadas no mesmo arquivo, uma chamada `handleGet` e outra `handlePost`.",
          "O Next.js cria automaticamente endpoints separados, como `/api/user/get` e `/api/user/post`.",
          "Verificando o valor de `req.method` e usando uma estrutura `if/else` ou `switch`.",
          "É preciso criar arquivos diferentes, como `user_get.js` e `user_post.js`.",
        ],
        correta: 2,
        explicacao:
          "No handler da API você verifica `req.method` para tratar GET/POST/PUT etc.",
      },
      {
        id: 10,
        pergunta: "O que é 'Shallow Routing'?",
        alternativas: [
          "Um método para renderizar apenas a parte visível da página, economizando recursos.",
          "Uma forma de navegar para a mesma página sem executar novamente `getStaticProps` ou `getServerSideProps`.",
          "O roteamento padrão do Next.js, que é considerado mais 'raso' que o de outros frameworks.",
          "Uma técnica de segurança para evitar que rotas profundas sejam acessadas sem permissão.",
        ],
        correta: 1,
        explicacao:
          "Shallow routing permite mudar a URL sem executar novamente data fetching hooks, mantendo o estado da página.",
      },
    ],
  },
  avancado: {
    id: 3,
    slug: "avancado",
    titulo: "Avançado",
    questoes: 10,
    gemsTotal: 200,
    perQuestionGems: 200 / 10,
    perguntas: [
      {
        id: 1,
        pergunta:
          "Em uma página com `getStaticProps`, como funciona a propriedade `revalidate` no objeto retornado?",
        alternativas: [
          "Ela define um tempo em segundos para o Next.js tentar regenerar a página no servidor em segundo plano após uma requisição.",
          "Ela define um intervalo em segundos para o cliente (browser) buscar uma nova versão da página.",
          "Ela força a página a usar Server-side Rendering (SSR) se o tempo definido tiver passado.",
          "Ela define o `Cache-Control` header da resposta para o navegador.",
        ],
        correta: 0,
        explicacao:
          "`revalidate` indica por quantos segundos a página é considerada válida e, após esse tempo, o Next tentará regenerá-la em background (ISR).",
      },
      {
        id: 2,
        pergunta:
          "Na função `getStaticPaths`, qual é o comportamento da opção `fallback: 'blocking'?",
        alternativas: [
          "Serve a página para o usuário com um estado de 'carregando' (loading) e gera a página no cliente.",
          "Retorna uma página 404 imediatamente se o caminho não foi pré-renderizado no build.",
          "A requisição do usuário fica 'bloqueada' no servidor enquanto o HTML é gerado (SSR) e só então é enviada completa ao navegador.",
          "Redireciona o usuário para uma página de fallback definida no `next.config.js`.",
        ],
        correta: 2,
        explicacao:
          "`fallback: 'blocking'` faz com que a primeira requisição espere o HTML ser gerado no servidor e só então responda — sem exibir uma tela de loading no cliente.",
      },
      {
        id: 3,
        pergunta:
          "Qual é a principal diferença entre React Server Components (RSC) e Server-side Rendering (SSR) tradicional?",
        alternativas: [
          "RSC são renderizados apenas uma vez durante o build, enquanto SSR é renderizado a cada requisição.",
          "RSC são renderizados em um ambiente Edge, enquanto SSR é renderizado em um ambiente Node.js.",
          "RSC não enviam seu JavaScript para o cliente, resultando em um bundle zero-JS, enquanto componentes SSR 'hidratam' e se tornam interativos no cliente.",
          "SSR não permite acesso direto a bancos de dados, enquanto RSC permite.",
        ],
        correta: 2,
        explicacao:
          "RSC podem renderizar no servidor sem enviar o JavaScript de UI ao cliente, reduzindo o bundle enviado; componentes SSR tipicamente enviam JS para hidratação.",
      },
      {
        id: 4,
        pergunta:
          "Qual é uma limitação fundamental do Edge Runtime (usado em Middleware e Edge Functions)?",
        alternativas: [
          "Ele não tem acesso a APIs nativas do Node.js, como `fs` (File System) ou `path`.",
          "Ele não permite o uso de `async/await` para operações assíncronas.",
          "O tamanho total do bundle de código é limitado a 100kb.",
          "Ele não consegue modificar os cabeçalhos (headers) de uma requisição.",
        ],
        correta: 0,
        explicacao:
          "Edge Runtimes rodam em ambientes limitados (V8 isolates) e não expõem APIs Node.js tradicionais como 'fs' ou 'path'.",
      },
      {
        id: 5,
        pergunta:
          "Ao usar a importação dinâmica com `next/dynamic`, o que a opção `{ ssr: false }` faz?",
        alternativas: [
          "Faz com que o componente seja renderizado no servidor, mas não seja 'hidratado' no cliente.",
          "Renderiza o componente em uma Edge Function em vez de uma Lambda Function.",
          "Impede que o componente seja renderizado no lado do servidor, carregando-o apenas no cliente.",
          "Carrega o componente de forma síncrona em vez de assíncrona.",
        ],
        correta: 2,
        explicacao:
          "`{ ssr: false }` garante que o componente só será carregado no cliente, evitando renderização no servidor.",
      },
      {
        id: 6,
        pergunta:
          "No `next.config.js`, qual a diferença entre `rewrites` e `redirects`?",
        alternativas: [
          "`redirects` mudam a URL na barra de endereço (resposta 3xx), enquanto `rewrites` servem o conteúdo de outra rota sem mudar a URL.",
          "`rewrites` só funcionam em ambiente de desenvolvimento e `redirects` só em produção.",
          "`rewrites` são permanentes (código 308) e `redirects` são temporários (código 307).",
          "`rewrites` mudam a URL na barra de endereço do navegador, enquanto `redirects` não.",
        ],
        correta: 0,
        explicacao:
          "`rewrites` internamente mapeiam uma rota para outra sem alterar a URL visível; `redirects` respondem com código 3xx alterando a URL no navegador.",
      },
      {
        id: 7,
        pergunta:
          "No App Router, qual é o comportamento de cache padrão da função `fetch` em um Server Component?",
        alternativas: [
          "Ela usa o cache do navegador para armazenar os resultados.",
          "Ela nunca faz cache, se comportando como `getServerSideProps` a cada requisição.",
          "Ela faz um cache agressivo e permanente de todas as requisições, se comportando como `getStaticProps`.",
          "Ela só faz cache de requisições do tipo GET, ignorando todas as outras.",
        ],
        correta: 2,
        explicacao:
          "Por padrão, `fetch` em Server Components faz cache (comportamento similar a SSG) para otimização; é possível alterar via opções de cache.",
      },
      {
        id: 8,
        pergunta:
          "Quando é obrigatório usar a diretiva `use client` no topo de um arquivo no App Router?",
        alternativas: [
          "Para todos os componentes que recebem `props` de um componente pai.",
          "Sempre que o componente precisar buscar dados de uma API externa.",
          "Quando o componente precisa ser renderizado no servidor (SSR).",
          "Quando o componente precisa usar hooks de interatividade (`useState`, `useEffect`) ou APIs do navegador.",
        ],
        correta: 3,
        explicacao:
          "A diretiva `use client` marca o componente como client-side, necessário quando ele usa hooks ou APIs do navegador.",
      },
      {
        id: 9,
        pergunta:
          "Como o Preview Mode (Modo de Visualização) do Next.js funciona tecnicamente para exibir conteúdo de um CMS que ainda não foi publicado?",
        alternativas: [
          "Ele passa um parâmetro de busca na URL (query param) que instrui o Next.js a buscar o rascunho.",
          "Ele armazena os dados de rascunho no `localStorage` do navegador.",
          "Ele usa cookies específicos que, quando presentes, fazem o Next.js ignorar a versão estática e renderizar a página sob demanda (SSR).",
          "Ele aponta o DNS para um 'servidor de staging' diferente onde o conteúdo de rascunho está disponível.",
        ],
        correta: 2,
        explicacao:
          "Preview Mode usa cookies especiais que instruem o Next a exibir conteúdo de rascunho via SSR quando presentes.",
      },
      {
        id: 10,
        pergunta:
          "No App Router, qual é o propósito principal dos Server Actions?",
        alternativas: [
          "Gerenciar o estado de componentes do lado do cliente de forma mais eficiente.",
          "Apenas para executar lógica de servidor em resposta a webhooks de serviços externos.",
          "Substituir completamente a necessidade de usar um hook `useEffect` para mutações de dados.",
          "Realizar a busca inicial de dados para Server Components, funcionando como um `getStaticProps` moderno.",
        ],
        correta: 3,
        explicacao:
          "Server Actions servem para executar lógica de servidor a partir de componentes (ex: mutações), funcionando como handlers do lado servidor integrados ao App Router.",
      },
    ],
  },
  especialista: {
    id: 4,
    slug: "especialista",
    titulo: "Especialista",
    questoes: 10,
    gemsTotal: 300,
    perQuestionGems: 300 / 10,
    perguntas: [
      {
        id: 1,
        pergunta:
          "Qual é a causa raiz mais comum para um 'hydration error' no React/Next.js?",
        alternativas: [
          "Uma chamada de API no servidor que retorna um erro 500.",
          "A falta da diretiva `use client` em um componente que usa `useState`.",
          "Uma versão do Node.js incompatível com a versão do Next.js.",
          "Uma inconsistência entre o HTML renderizado no servidor e o HTML renderizado na primeira passagem no cliente.",
        ],
        correta: 3,
        explicacao:
          "Hydration errors normalmente ocorrem quando o HTML gerado no servidor difere do que o React monta no cliente.",
      },
      {
        id: 2,
        pergunta:
          "No App Router, existem várias camadas de cache. Qual das seguintes opções descreve corretamente o 'Router Cache'?",
        alternativas: [
          "Um cache no navegador, no lado do cliente, que armazena o payload dos React Server Components por segmento de rota.",
          "Um cache no servidor que armazena o resultado de chamadas `fetch` para evitar requisições duplicadas.",
          "Um cache do navegador que armazena a resposta HTML de uma página, controlado pelo header `Cache-Control`.",
          "Um cache de página inteira em um CDN, similar ao comportamento de páginas SSG.",
        ],
        correta: 1,
        explicacao:
          "O Router Cache no App Router refere-se a caches no servidor que evitam fetchs duplicados entre segmentos de rota.",
      },
      {
        id: 3,
        pergunta:
          "Como o streaming com Suspense e React Server Components melhora a performance percebida pelo usuário?",
        alternativas: [
          "Fazendo o cache de todo o site na memória do servidor para acesso instantâneo.",
          "Eliminando completamente a necessidade de JavaScript no lado do cliente.",
          "Diminuindo o tamanho final do bundle JavaScript que é enviado ao cliente.",
          "Permitindo que o servidor envie o HTML da UI imediatamente (com placeholders), enquanto as operações de dados mais lentas são resolvidas em paralelo.",
        ],
        correta: 3,
        explicacao:
          "Streaming permite enviar partes prontas da UI imediatamente, melhorando o tempo até o conteúdo visível enquanto dados adicionais chegam em segundo plano.",
      },
      {
        id: 4,
        pergunta:
          "No App Router, qual o comportamento padrão de uma rota dinâmica se um parâmetro (`slug`, `id`) for acessado mas não tiver sido gerado previamente pela função `generateStaticParams`?",
        alternativas: [
          "A página retornará um erro 404.",
          "A página será gerada sob demanda na primeira requisição e depois ficará em cache (comportamento de ISR).",
          "O Next.js retornará uma versão de fallback da página enquanto gera a versão correta no cliente.",
          "O build do projeto falhará, exigindo que todos os parâmetros possíveis sejam definidos.",
        ],
        correta: 1,
        explicacao:
          "Se a rota não foi gerada no build, o App Router pode gerar a página sob demanda na primeira requisição (sem 404), similar ao ISR dependendo da configuração.",
      },
      {
        id: 5,
        pergunta:
          "Qual caso de uso específico as Parallel Routes (Rotas Paralelas) no App Router foram projetadas para resolver?",
        alternativas: [
          "Realizar testes A/B, renderizando duas versões de uma mesma página para usuários diferentes.",
          "Dividir o carregamento de uma página em múltiplas requisições paralelas para melhorar a performance.",
          "Garantir que rotas de autenticação (login, cadastro) sejam renderizadas em um layout diferente do resto da aplicação.",
          "Renderizar seções independentes e com seus próprios estados de navegação dentro de um mesmo layout, como um painel com um feed e uma lista de chats.",
        ],
        correta: 3,
        explicacao:
          "Parallel Routes permitem compor seções independentes dentro de um layout com estados de navegação próprios — útil para painéis e UIs complexas.",
      },
      {
        id: 6,
        pergunta: "O que é Turbopack e em qual linguagem ele é escrito?",
        alternativas: [
          "É uma ferramenta de cache para monorepos, escrita em C++.",
          "É um compilador de TypeScript para JavaScript, escrito em Go.",
          "É um bundler incremental sucessor do Webpack, escrito em Rust.",
          "É um servidor de desenvolvimento local otimizado, escrito em TypeScript.",
        ],
        correta: 2,
        explicacao:
          "Turbopack é um bundler incremental (sucessor do Webpack) escrito em Rust, focado em performance para dev experience.",
      },
      {
        id: 7,
        pergunta:
          "Dentro de uma Server Action, qual função você usaria para invalidar o cache de dados de forma granular e sob demanda, sem depender de revalidação baseada em tempo?",
        alternativas: [
          "`cache.invalidate()`",
          "`router.refresh()`",
          "`revalidatePath` ou `revalidateTag`",
          "`res.revalidate()`",
        ],
        correta: 2,
        explicacao:
          "APIs como `revalidatePath` / `revalidateTag` permitem invalidar caches específicos a partir do servidor de forma programática.",
      },
      {
        id: 8,
        pergunta:
          "Qual é a finalidade principal do arquivo `build-manifest.json` dentro da pasta `.next`?",
        alternativas: [
          "Mapear cada página da aplicação aos seus arquivos de bundle JavaScript correspondentes (chunks).",
          "Mapear todas as rotas estáticas e dinâmicas da aplicação para seus respectivos arquivos de entrada.",
          "Armazenar o HTML pré-renderizado de todas as páginas geradas estaticamente.",
          "Listar todas as dependências de `node_modules` que foram incluídas no bundle final.",
        ],
        correta: 0,
        explicacao:
          "O build-manifest mapeia páginas para os chunks JS necessários para carregamento coordenado no cliente.",
      },
      {
        id: 9,
        pergunta:
          "Ao configurar `output: 'standalone'` no `next.config.js`, qual problema principal esta opção resolve em um ambiente de contêineres (Docker)?",
        alternativas: [
          "Habilita a execução da aplicação em múltiplos contêineres para balanceamento de carga.",
          "Melhora o tempo de Hot Reloading (HMR) dentro do contêiner em ambiente de desenvolvimento.",
          "Reduz drasticamente o tamanho da imagem Docker ao copiar apenas os arquivos necessários para produção, em vez de toda a pasta `node_modules`.",
          "Permite que a aplicação Next.js seja executada em um ambiente sem Node.js, como Deno ou Bun.",
        ],
        correta: 2,
        explicacao:
          "`output: 'standalone'` produz uma pasta otimizada para deploy que evita copiar toda a node_modules, reduzindo o tamanho da imagem Docker.",
      },
      {
        id: 10,
        pergunta:
          "O que são 'tainted objects' (objetos 'contaminados'), um conceito de segurança introduzido no React 18.8 e usado pelo Next.js?",
        alternativas: [
          "Um mecanismo de segurança que impede que dados vindos do servidor sejam acidentalmente passados de um Server Component para um Client Component como props.",
          "Uma função experimental para marcar componentes que devem ser renderizados apenas no servidor.",
          "Objetos que causam memory leaks e precisam ser explicitamente limpos para evitar sobrecarga do servidor.",
          "Uma proteção para evitar que dados sensíveis (validados no servidor) sejam expostos ao cliente, 'contaminando' objetos para que não possam ser passados para o lado do cliente.",
        ],
        correta: 0,
        explicacao:
          "Tainted objects evitam que referências de objetos com dados sensíveis sejam acidentalmente serializadas e enviadas ao cliente.",
      },
    ],
  },
};

export default levels;
