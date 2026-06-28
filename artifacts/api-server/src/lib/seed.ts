import { db } from "@workspace/db";
import { guidesTable } from "@workspace/db";
import { logger } from "./logger";

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
  {
    title: "Benefícios Fiscais para Produtores com CAR Regular",
    category: "Benefícios",
    summary: "Conheça as vantagens fiscais e tributárias disponíveis para propriedades rurais com o CAR em dia e sem passivos ambientais.",
    content: "Ter o CAR regular e a propriedade ambientalmente em dia abre portas para uma série de benefícios fiscais que podem reduzir significativamente os custos do produtor rural.\n\nIsenção de ITR em áreas protegidas\n\nO Imposto Territorial Rural (ITR) não incide sobre as áreas de Reserva Legal, APP e servidão ambiental averbadas no CAR. Para imóveis que preservam mais do que o exigido por lei, a isenção pode chegar a 100% da área total, dependendo da proporção preservada. Para isso, o produtor deve declarar essas áreas na ficha do ITR junto à Receita Federal.\n\nComo funciona na prática?\n\nSe a sua propriedade tem 100 hectares e 30 hectares são de Reserva Legal e APP, esses 30 hectares ficam isentos do ITR. Isso pode representar uma economia expressiva, especialmente em regiões com alto valor de terra.\n\nRedução de taxas em seguros rurais\n\nAlgumas seguradoras e programas governamentais oferecem condições diferenciadas — como redução de prêmio de seguro agrícola — para propriedades com regularidade ambiental comprovada pelo CAR.\n\nAcesso facilitado a programas públicos\n\nProdutores com CAR ativo e sem passivos ambientais têm acesso preferencial a programas como o ABC Agro (crédito para agricultura de baixo carbono), PSA (Pagamento por Serviços Ambientais) e linhas do Pronaf com juros mais baixos.\n\nComo garantir os benefícios?\n\nMantenha o CAR atualizado no SICAR, declare corretamente as áreas protegidas na ficha do ITR e, se houver passivo, regularize via PRA. A combinação dessas ações maximiza os benefícios fiscais disponíveis.",
    readingTimeMinutes: 4,
    icon: "BadgeDollarSign",
    tags: ["ITR", "isenção", "benefícios", "fiscal", "CAR"],
  },
  {
    title: "Acesso a Programas de Pagamento por Serviços Ambientais (PSA)",
    category: "Benefícios",
    summary: "Saiba como receber pagamento por preservar sua propriedade por meio dos programas de Pagamento por Serviços Ambientais.",
    content: "O Pagamento por Serviços Ambientais (PSA) é um mecanismo pelo qual produtores rurais recebem uma remuneração financeira por manter ou recuperar vegetação nativa em suas propriedades — em outras palavras, você é pago por preservar.\n\nO que são serviços ambientais?\n\nServiços ambientais são os benefícios que a natureza oferece à sociedade: água limpa, sequestro de carbono, proteção da biodiversidade, regulação do clima, entre outros. Quando o produtor mantém matas ciliares e florestas nativas, ele está prestando esses serviços para toda a população.\n\nQuem pode receber o PSA?\n\nProprietários e posseiros rurais que possuem o CAR ativo e mantêm — ou se comprometem a restaurar — áreas com vegetação nativa. O CAR é o documento de entrada para praticamente todos os programas de PSA no Brasil.\n\nPrincipais programas disponíveis\n\nPrograma Produtor de Água (ANA): foco em bacias hidrográficas estratégicas, paga por práticas de conservação de solo e água. REDD+ e Mercado de Carbono: o produtor pode receber créditos de carbono por manter florestas de pé, comercializáveis no mercado voluntário. Programas Estaduais: vários estados possuem programas próprios de PSA, como o Bolsa Verde (MG), Produtor Rural de Água (ES) e outros.\n\nQuanto posso receber?\n\nOs valores variam conforme o programa, o tamanho da área preservada, o bioma e a importância estratégica da região. Projetos de carbono podem gerar de R$ 20 a R$ 80 por tonelada de CO₂ equivalente por hectare ao ano.\n\nComo participar?\n\nConsulte o órgão ambiental do seu estado, a ANA (ana.gov.br) ou o MAPA (gov.br/agricultura) para conhecer os programas disponíveis na sua região. O ponto de partida é sempre ter o CAR regularizado.",
    readingTimeMinutes: 5,
    icon: "Sprout",
    tags: ["PSA", "serviços ambientais", "carbono", "preservação", "renda"],
  },
  {
    title: "Cotas de Reserva Ambiental (CRA): gerar renda com sua área preservada",
    category: "Benefícios",
    summary: "Entenda como transformar sua Reserva Legal excedente em Cotas de Reserva Ambiental e negociá-las com outros produtores.",
    content: "A Cota de Reserva Ambiental (CRA) é um título nominativo que representa uma área com vegetação nativa existente em uma propriedade rural. Criada pelo Código Florestal de 2012, ela permite que quem preserva mais do que o exigido possa vender esse excedente para quem precisa compensar seu déficit de Reserva Legal.\n\nComo funciona?\n\nImagine que sua propriedade está na Amazônia e você tem 90% de vegetação nativa, enquanto a lei exige 80%. Esses 10% excedentes podem ser transformados em CRAs e vendidos para outro produtor que tem apenas 70% de floresta e precisa compensar os 10% de déficit.\n\nQuem pode emitir CRAs?\n\nProprietários rurais com vegetação nativa acima do percentual mínimo exigido, com CAR ativo e sem embargos ambientais. A emissão é feita pelo órgão ambiental estadual, após análise técnica da área.\n\nQuem pode comprar CRAs?\n\nProdutores que possuem déficit de Reserva Legal podem comprar CRAs de qualquer bioma equivalente ao da sua propriedade (nos casos previstos em lei) ou do mesmo bioma. A transação substitui a obrigação de recompor a vegetação na própria terra.\n\nQual o valor das CRAs?\n\nAinda é um mercado em desenvolvimento no Brasil. Os preços são negociados entre as partes, mas podem variar de algumas centenas a alguns milhares de reais por hectare, dependendo do bioma, localização e demanda.\n\nComo começar?\n\nConsulte o órgão ambiental do seu estado (SEMA, IEMA, SEMAD etc.) e verifique se o programa está operacional na sua região. Algumas plataformas privadas de mercado de carbono e ambiental também facilitam a conexão entre vendedores e compradores de CRA.",
    readingTimeMinutes: 5,
    icon: "TreePine",
    tags: ["CRA", "reserva legal", "compensação", "renda", "mercado ambiental"],
  },
  {
    title: "ICMS Ecológico: municípios e produtores premiados pela preservação",
    category: "Benefícios",
    summary: "Veja como o ICMS Ecológico pode beneficiar sua região e como a sua preservação contribui para mais recursos no município.",
    content: "O ICMS Ecológico é um mecanismo tributário adotado por vários estados brasileiros que reparte uma parte do ICMS (Imposto sobre Circulação de Mercadorias e Serviços) com os municípios com base em critérios ambientais — principalmente a presença de unidades de conservação, terras indígenas e, em alguns estados, a área de preservação particular dentro do município.\n\nComo funciona?\n\nOs estados definem uma porcentagem do ICMS que será distribuída aos municípios conforme indicadores ambientais. Municípios que têm mais áreas protegidas — incluindo propriedades particulares com vegetação preservada — recebem mais recursos do ICMS Ecológico.\n\nQual a relação com o produtor rural?\n\nQuando você mantém sua Reserva Legal e APPs preservadas, sua propriedade contribui para aumentar o índice ambiental do município, o que pode resultar em mais receita de ICMS Ecológico para a prefeitura local. Indiretamente, isso beneficia toda a comunidade com mais investimentos em infraestrutura e serviços públicos.\n\nEstados com ICMS Ecológico\n\nOs pioneiros foram Paraná (desde 1991) e Minas Gerais. Hoje, mais de 15 estados possuem alguma forma de ICMS Ecológico, incluindo São Paulo, Mato Grosso, Goiás, Rondônia e outros. Cada estado tem suas próprias regras e critérios.\n\nAlguns estados vão além\n\nNo Paraná e em Minas Gerais, RPPNs (Reservas Particulares do Patrimônio Natural) e áreas de preservação voluntária também contam como critério ambiental, incentivando diretamente o produtor a preservar além do mínimo legal.\n\nComo aproveitar?\n\nMantenha o CAR atualizado, preserve suas APPs e Reserva Legal, e considere criar uma RPPN se tiver área excedente de vegetação nativa. Converse com a prefeitura e o órgão ambiental estadual sobre como sua propriedade pode contribuir para o ICMS Ecológico do município.",
    readingTimeMinutes: 4,
    icon: "Landmark",
    tags: ["ICMS Ecológico", "município", "preservação", "tributo", "RPPN"],
  },
];

export async function seedIfEmpty() {
  try {
    const existing = await db.select().from(guidesTable).limit(1);
    if (existing.length > 0) {
      logger.info("Guides already seeded, skipping.");
      return;
    }
    await db.insert(guidesTable).values(guides);
    logger.info({ count: guides.length }, "Guides seeded automatically.");
  } catch (err) {
    logger.error({ err }, "Failed to auto-seed guides.");
  }
}
