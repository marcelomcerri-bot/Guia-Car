import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { guidesTable } from "./src/schema/guides.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const guides = [
  {
    title: "O que é o CAR?",
    category: "CAR",
    summary: "Entenda o que é o Cadastro Ambiental Rural e por que ele é obrigatório para toda propriedade rural no Brasil.",
    content: "O Cadastro Ambiental Rural (CAR) é um registro eletrônico obrigatório para todos os imóveis rurais do Brasil.\n\nCriado pelo Código Florestal (Lei nº 12.651/2012), o CAR tem como objetivo integrar as informações ambientais das propriedades e posses rurais, compondo base de dados para controle, monitoramento, planejamento ambiental e econômico e combate ao desmatamento.\n\nQuem deve se cadastrar?\n\nTodo proprietário ou possuidor de imóvel rural é obrigado a fazer o CAR, independentemente do tamanho da propriedade. Isso inclui pequenos agricultores, assentados da reforma agrária e comunidades tradicionais.\n\nO que acontece se eu não fizer o CAR?\n\nSem o CAR, o produtor não consegue obter crédito rural, não pode participar de programas de regularização ambiental e pode ser autuado pelos órgãos ambientais.\n\nComo fazer o CAR?\n\nO CAR é feito pelo SICAR (Sistema de Cadastro Ambiental Rural), disponível em car.gov.br. O produtor precisa ter em mãos o documento do imóvel e o mapa georreferenciado da propriedade.",
    readingTimeMinutes: 4,
    icon: "FileText",
    tags: ["CAR", "obrigatorio", "cadastro", "basico"],
  },
  {
    title: "O que é APP (Área de Preservação Permanente)?",
    category: "APP",
    summary: "Saiba o que são as APPs, onde elas se localizam e o que pode ou não pode ser feito nessas áreas dentro da sua propriedade.",
    content: "A Área de Preservação Permanente (APP) é uma área protegida pelo Código Florestal que tem a função ambiental de preservar os recursos hídricos, a paisagem, a estabilidade geológica e a biodiversidade.\n\nOnde ficam as APPs?\n\nAs APPs estão localizadas nas margens de rios e outros cursos d'água, ao redor de lagos e lagoas, nas nascentes, nos topos de morros e nas encostas com declividade acima de 45 graus.\n\nQual é a largura da faixa de APP?\n\nPara rios com até 10 metros de largura: 30 metros de cada margem. Para rios entre 10 e 50 metros: 50 metros. Para rios entre 50 e 200 metros: 100 metros. Para rios entre 200 e 600 metros: 200 metros. Para rios com mais de 600 metros: 500 metros.\n\nO que posso fazer na APP?\n\nNas APPs, é permitida a atividade de baixo impacto ambiental, como a captação de água para consumo humano, a pesquisa científica e a realização de trilhas para ecoturismo. A agricultura e o pastejo em geral não são permitidos.\n\nE se já tiver uso na APP?\n\nProdutores que tinham uso consolidado na APP antes de julho de 2008 podem regularizar a situação por meio do Programa de Regularização Ambiental (PRA).",
    readingTimeMinutes: 5,
    icon: "Trees",
    tags: ["APP", "preservação", "rios", "codigo florestal"],
  },
  {
    title: "O que é Reserva Legal?",
    category: "Reserva Legal",
    summary: "Descubra o que é a Reserva Legal, qual percentual da sua propriedade deve ser mantido e como calculá-la corretamente.",
    content: "A Reserva Legal é a área dentro da propriedade rural que deve ser mantida com vegetação nativa. Ela é diferente da APP e tem o objetivo de assegurar o uso econômico de modo sustentável dos recursos naturais do imóvel rural.\n\nQual o percentual obrigatório?\n\nO percentual varia conforme a localização da propriedade: Na Amazônia Legal: 80% em áreas de floresta, 35% em áreas de cerrado e 20% em áreas de campo. Nas demais regiões do Brasil: 20% da propriedade.\n\nOnde posso localizar a Reserva Legal?\n\nA Reserva Legal deve ser registrada no CAR. Ela pode ser localizada na própria propriedade ou, em alguns casos, fora dela por meio de compensação ambiental.\n\nPosso usar a Reserva Legal?\n\nSim, é permitido o manejo sustentável da Reserva Legal, incluindo coleta de produtos florestais não madeireiros, ecoturismo e extrativismo. O desmatamento não é permitido.\n\nE se minha propriedade não tiver Reserva Legal suficiente?\n\nO produtor pode aderir ao Programa de Regularização Ambiental (PRA) do seu estado e compensar o déficit por meio de regeneração natural, plantio de espécies nativas ou aquisição de Cotas de Reserva Ambiental (CRA).",
    readingTimeMinutes: 5,
    icon: "Leaf",
    tags: ["reserva legal", "vegetação nativa", "percentual", "codigo florestal"],
  },
  {
    title: "Como fazer o georreferenciamento do imóvel?",
    category: "CAR",
    summary: "Passo a passo para obter e preparar o mapa georreferenciado da sua propriedade para o cadastro no SICAR.",
    content: "O georreferenciamento é o processo de mapear os limites da sua propriedade com coordenadas geográficas precisas. Ele é necessário para fazer o CAR.\n\nComo obter o georreferenciamento?\n\nVocê pode contratar um engenheiro agrônomo, técnico agrícola ou topógrafo para fazer o levantamento com GPS. Em muitos municípios, os sindicatos rurais e a Emater oferecem esse serviço gratuitamente ou a preços acessíveis para pequenos produtores.\n\nO que precisa ser mapeado?\n\nNo CAR, você precisará mapear: os limites da propriedade, as Áreas de Preservação Permanente (APPs), a Reserva Legal, as áreas de uso consolidado e as áreas de vegetação nativa remanescente.\n\nQual formato de arquivo usar?\n\nO SICAR aceita arquivos nos formatos Shapefile (.shp), KML e GML. O técnico que fizer o levantamento saberá exportar no formato correto.\n\nPosso fazer sozinho?\n\nSim, é possível usar aplicativos como o SIGEF-CAR ou o próprio módulo de digitalização do SICAR para fazer o mapeamento com base em imagens de satélite. Porém, para propriedades maiores ou com limites complexos, é recomendável contratar um profissional.",
    readingTimeMinutes: 4,
    icon: "Map",
    tags: ["georreferenciamento", "SICAR", "mapa", "cadastro"],
  },
  {
    title: "Programa de Regularização Ambiental (PRA)",
    category: "Regularização",
    summary: "Entenda como o PRA pode ajudar a regularizar passivos ambientais da sua propriedade e quais são os prazos e condições.",
    content: "O Programa de Regularização Ambiental (PRA) é o mecanismo criado pelo Código Florestal para que os produtores que tinham passivos ambientais antes de julho de 2008 possam regularizar sua situação.\n\nQuem pode aderir ao PRA?\n\nTodo produtor que possui APP ou Reserva Legal abaixo do exigido por lei pode aderir ao PRA, desde que tenha o CAR ativo e o passivo seja de antes de 22 de julho de 2008 (data de corte do Código Florestal).\n\nO que acontece após aderir ao PRA?\n\nO produtor assina um Termo de Compromisso e tem prazos para recuperar as áreas degradadas ou compensar o déficit. Durante o cumprimento do Termo, não pode ser autuado pelos órgãos ambientais pelo passivo declarado.\n\nQuais as formas de regularização?\n\nRegeneração natural da vegetação. Recomposição com plantio de espécies nativas. Compensação com Cotas de Reserva Ambiental (CRA). Doação de área em Unidade de Conservação.\n\nComo aderir?\n\nO PRA é operado pelos estados. Entre em contato com o órgão ambiental do seu estado (como a SEMA, IEMA ou SEMAD, dependendo de onde você mora) para iniciar o processo.",
    readingTimeMinutes: 6,
    icon: "ClipboardCheck",
    tags: ["PRA", "regularização", "passivo ambiental", "prazo"],
  },
  {
    title: "Crédito Rural e o CAR",
    category: "CAR",
    summary: "Saiba como o CAR impacta o acesso ao crédito rural e quais são as exigências dos bancos para financiamentos agrícolas.",
    content: "O CAR é um requisito fundamental para o acesso ao crédito rural no Brasil. Sem ele, muitas linhas de financiamento ficam bloqueadas para o produtor.\n\nPor que os bancos exigem o CAR?\n\nO Banco Central do Brasil determina que as instituições financeiras verifiquem a regularidade ambiental das propriedades antes de conceder crédito rural. O CAR é a principal forma de comprovação dessa regularidade.\n\nQuais linhas de crédito exigem o CAR?\n\nPraticamente todas as linhas do Programa Nacional de Fortalecimento da Agricultura Familiar (Pronaf) e do Programa Nacional de Apoio ao Médio Produtor Rural (Pronamp) exigem o CAR ativo.\n\nO que acontece se meu imóvel tiver passivo ambiental?\n\nMesmo com passivo ambiental, o produtor que aderiu ao PRA e está cumprindo o Termo de Compromisso pode acessar crédito rural. A regularidade jurídica perante o banco é garantida pelo compromisso de recuperação.\n\nComo apresentar o CAR ao banco?\n\nBasta acessar o SICAR (car.gov.br), imprimir ou salvar o comprovante de inscrição do imóvel e apresentá-lo à agência junto com os demais documentos de financiamento.",
    readingTimeMinutes: 4,
    icon: "Banknote",
    tags: ["crédito rural", "Pronaf", "financiamento", "banco"],
  },
  {
    title: "Pequenas Propriedades e o Código Florestal",
    category: "Regularização",
    summary: "Veja as regras especiais do Código Florestal para mini e pequenos produtores rurais, incluindo benefícios e simplificações.",
    content: "O Código Florestal criou regras especiais e mais flexíveis para os pequenos produtores rurais, especialmente para os imóveis com até 4 módulos fiscais.\n\nO que é módulo fiscal?\n\nO módulo fiscal é uma unidade de medida agrária usada para classificar o tamanho dos imóveis rurais. Seu valor varia por município e pode ser consultado no INCRA. Uma pequena propriedade tem até 4 módulos fiscais.\n\nBenefícios para pequenos produtores:\n\nA APP pode ser reduzida em imóveis de até 1 módulo fiscal. A recomposição da Reserva Legal pode ser feita com espécies exóticas frutíferas, ornamentais ou industriais até 50% da área exigida. O cadastro no CAR pode ser feito de forma simplificada, com declaração do próprio produtor.\n\nO pequeno produtor tem prazo diferenciado?\n\nSim. Os pequenos produtores têm prazos maiores para cumprir as obrigações de recomposição dentro do PRA, e as metas anuais de recuperação são menores e proporcionais ao tamanho do imóvel.\n\nOnde buscar apoio?\n\nA Emater (ou Embrapa em algumas regiões) oferece assistência técnica gratuita para pequenos produtores, incluindo auxílio no preenchimento do CAR e elaboração dos planos de recuperação.",
    readingTimeMinutes: 5,
    icon: "Home",
    tags: ["pequeno produtor", "módulo fiscal", "benefícios", "Emater"],
  },
  {
    title: "Como identificar APPs na sua propriedade",
    category: "APP",
    summary: "Aprenda a identificar e delimitar as Áreas de Preservação Permanente dentro da sua terra antes de fazer o CAR.",
    content: "Antes de fazer o CAR, é importante identificar corretamente todas as APPs da sua propriedade. Esse mapeamento é obrigatório e será conferido pelos órgãos ambientais.\n\nPasso 1 – Identifique os corpos d'água\n\nCaminhe pela propriedade e anote todos os rios, córregos, riachos, nascentes, lagos e lagoas existentes. Mesmo pequenos cursos d'água intermitentes (que secam no verão) geram APP.\n\nPasso 2 – Meça a faixa de APP\n\nA largura da faixa de APP é calculada a partir da beira do leito maior do rio (nível máximo que a água atinge). Use uma fita métrica ou GPS para demarcar a distância.\n\nPasso 3 – Verifique nascentes\n\nNascentes e olhos d'água perenes exigem um raio de 50 metros de APP ao redor, independentemente de terem ou não um curso d'água associado.\n\nPasso 4 – Verifique o relevo\n\nTopos de morros, montanhas com altitude superior a 1.800 metros, encostas com declividade acima de 45 graus e bordas de tabuleiros também são APP.\n\nPasso 5 – Registre no CAR\n\nCom as APPs identificadas, faça o mapeamento digital no SICAR. Você pode usar imagens de satélite disponíveis no próprio sistema para auxiliar no traçado.",
    readingTimeMinutes: 5,
    icon: "Search",
    tags: ["APP", "identificação", "nascentes", "rios", "mapeamento"],
  },
];

async function seed() {
  console.log("Seeding guides...");
  await db.insert(guidesTable).values(guides);
  console.log(`Inserted ${guides.length} guides.`);
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
