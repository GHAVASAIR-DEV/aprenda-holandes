import { drizzle } from 'drizzle-orm/mysql2';
import { lessons } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

async function expandLessonContent() {
  console.log('=== EXPANDING LESSON CONTENT ===\n');

  const expansions: Record<string, string> = {
    'lesson-3-3': `Nesta lição, você aprenderá vocabulário essencial sobre roupas e acessórios em holandês. É importante conhecer essas palavras para fazer compras, descrever o que você está vestindo ou falar sobre moda.

**Categorias de Roupas:**
- **Roupas superiores**: het shirt (camisa), de trui (suéter), het jasje (jaqueta)
- **Roupas inferiores**: de broek (calça), de rok (saia), de short (shorts)
- **Calçados**: de schoen (sapato), de laars (bota), de sandaal (sandália)
- **Acessórios**: de hoed (chapéu), de sjaal (cachecol), de handschoen (luva)

Pratique descrevendo o que você está vestindo hoje usando o vocabulário desta lição!`,

    'lesson-3-4': `Esta lição apresenta vocabulário relacionado à casa e seus cômodos. Conhecer essas palavras é fundamental para descrever onde você mora e falar sobre atividades domésticas.

**Cômodos da Casa:**
- **de woonkamer** (sala de estar) - onde a família se reúne
- **de keuken** (cozinha) - onde preparamos comida
- **de slaapkamer** (quarto) - onde dormimos
- **de badkamer** (banheiro) - onde tomamos banho

**Móveis e Objetos:**
- **de tafel** (mesa), **de stoel** (cadeira), **het bed** (cama)
- **de bank** (sofá), **de kast** (armário)

Use frases como "Ik ben in de keuken" (Estou na cozinha) para praticar!`,

    'lesson-3-5': `Nesta lição, você aprenderá a conjugar verbos regulares no presente em holandês. A maioria dos verbos holandeses segue um padrão regular, tornando-os mais fáceis de aprender.

**Padrão de Conjugação:**
Para verbos regulares, pegue o radical (infinitivo sem -en) e adicione as terminações:
- **ik** → radical
- **jij/je** → radical + t
- **hij/zij/het** → radical + t
- **wij/jullie/zij** → infinitivo

**Exemplo: werken (trabalhar)**
- ik werk, jij werkt, hij werkt, wij werken

**Verbos Comuns:**
- **wonen** (morar), **leren** (aprender), **koken** (cozinhar)
- **spelen** (jogar/tocar), **werken** (trabalhar)

Pratique conjugando esses verbos com diferentes pronomes!`,

    'lesson-4-2': `Esta lição ensina vocabulário essencial sobre transporte público na Holanda. O sistema de transporte holandês é eficiente e amplamente utilizado.

**Tipos de Transporte:**
- **de trein** (trem) - principal meio para longas distâncias
- **de bus** (ônibus) - conecta cidades e bairros
- **de tram** (bonde) - comum em grandes cidades
- **de metro** (metrô) - em Amsterdam e Rotterdam

**Frases Úteis:**
- "Waar is het station?" (Onde fica a estação?)
- "Welke lijn gaat naar...?" (Qual linha vai para...?)
- "Een kaartje naar Amsterdam, alstublieft" (Uma passagem para Amsterdam, por favor)

**Dica Cultural:** Na Holanda, use o cartão OV-chipkaart para todos os transportes públicos!`,

    'lesson-4-3': `Aprender a pedir e dar direções é essencial quando você está em um país estrangeiro. Esta lição fornece o vocabulário e as frases necessárias.

**Direções Básicas:**
- **rechtdoor** (em frente), **links** (esquerda), **rechts** (direita)
- **de eerste straat** (a primeira rua), **de tweede straat** (a segunda rua)

**Perguntas Úteis:**
- "Waar is...?" (Onde fica...?)
- "Hoe kom ik bij...?" (Como chego em...?)
- "Is het ver?" (É longe?)

**Respostas Comuns:**
- "Ga rechtdoor" (Vá em frente)
- "Sla linksaf" (Vire à esquerda)
- "Het is vijf minuten lopen" (São cinco minutos a pé)

Pratique essas frases para ganhar confiança ao navegar em cidades holandesas!`,

    'lesson-4-4': `O supermercado é um lugar essencial no dia a dia. Esta lição ensina vocabulário para fazer compras de alimentos e produtos domésticos.

**Seções do Supermercado:**
- **groente en fruit** (frutas e vegetais)
- **vlees en vis** (carne e peixe)
- **zuivel** (laticínios)
- **brood en gebak** (pães e bolos)

**Frases Úteis:**
- "Waar kan ik... vinden?" (Onde posso encontrar...?)
- "Hoeveel kost dit?" (Quanto custa isso?)
- "Heeft u...?" (Você tem...?)

**Quantidades:**
- **een kilo** (um quilo), **een pond** (meio quilo)
- **een liter** (um litro), **een pakje** (um pacote)

Lembre-se: na Holanda, você geralmente precisa pesar suas próprias frutas e vegetais!`,

    'lesson-4-5': `Números e dinheiro são fundamentais para transações diárias. Esta lição expande seu conhecimento de números e ensina vocabulário relacionado a dinheiro.

**Números Maiores:**
- **twintig** (20), **dertig** (30), **veertig** (40)
- **vijftig** (50), **honderd** (100), **duizend** (1000)

**Dinheiro:**
- **de euro** (euro), **de cent** (centavo)
- **het geld** (dinheiro), **de prijs** (preço)
- **betalen** (pagar), **contant** (em dinheiro)

**Frases Úteis:**
- "Hoeveel kost het?" (Quanto custa?)
- "Kan ik pinnen?" (Posso pagar com cartão?)
- "Het wisselgeld klopt niet" (O troco está errado)

A Holanda é uma sociedade quase sem dinheiro - cartões são aceitos em quase todos os lugares!`,

    'lesson-5-3': `Descrever pessoas é uma habilidade importante para conversas cotidianas. Esta lição ensina adjetivos e vocabulário para descrição física.

**Características Físicas:**
- **lang** (alto), **kort** (baixo)
- **dik** (gordo), **dun** (magro)
- **oud** (velho), **jong** (jovem)

**Cabelo:**
- **blond haar** (cabelo loiro), **bruin haar** (cabelo castanho)
- **lang haar** (cabelo comprido), **kort haar** (cabelo curto)

**Olhos:**
- **blauwe ogen** (olhos azuis), **bruine ogen** (olhos castanhos)
- **groene ogen** (olhos verdes)

**Estrutura de Frase:**
"Hij/Zij is... en heeft..." (Ele/Ela é... e tem...)
Exemplo: "Zij is lang en heeft blond haar" (Ela é alta e tem cabelo loiro)`,

    'lesson-5-4': `Além da aparência física, descrever a personalidade de alguém é igualmente importante. Esta lição apresenta adjetivos de personalidade.

**Características Positivas:**
- **aardig** (gentil), **vriendelijk** (amigável)
- **grappig** (engraçado), **slim** (inteligente)
- **vrolijk** (alegre), **behulpzaam** (prestativo)

**Características Neutras/Negativas:**
- **verlegen** (tímido), **rustig** (calmo)
- **druk** (agitado), **serieus** (sério)

**Usando Adjetivos:**
- "Hij is erg aardig" (Ele é muito gentil)
- "Zij is heel grappig" (Ela é muito engraçada)
- "Ze zijn vriendelijk" (Eles são amigáveis)

Pratique descrevendo amigos e familiares usando esses adjetivos!`,

    'lesson-5-5': `Esta lição ensina vocabulário sobre relacionamentos e vínculos familiares estendidos.

**Tipos de Relacionamentos:**
- **de vriend/vriendin** (namorado/namorada)
- **de man/vrouw** (marido/esposa)
- **getrouwd** (casado), **verloofd** (noivo)
- **gescheiden** (divorciado), **alleenstaand** (solteiro)

**Família Estendida:**
- **de oom** (tio), **de tante** (tia)
- **de neef** (sobrinho/primo), **de nicht** (sobrinha/prima)
- **de schoonouders** (sogros)

**Frases Úteis:**
- "Ik ben getrouwd" (Sou casado)
- "Dit is mijn vriend/vriendin" (Este é meu namorado/namorada)
- "Ik woon samen met..." (Moro junto com...)`,

    'lesson-6-3': `Cada estação do ano traz diferentes atividades e vocabulário associado. Esta lição explora o que fazer em cada estação.

**Primavera (de lente):**
- **bloemen plukken** (colher flores)
- **fietsen** (andar de bicicleta)
- **picknicken** (fazer piquenique)

**Verão (de zomer):**
- **zwemmen** (nadar)
- **naar het strand gaan** (ir à praia)
- **barbecueën** (fazer churrasco)

**Outono (de herfst):**
- **bladeren harken** (varrer folhas)
- **wandelen** (caminhar)

**Inverno (de winter):**
- **schaatsen** (patinar no gelo)
- **sneeuwballen gooien** (jogar bolas de neve)
- **warme chocolademelk drinken** (beber chocolate quente)`,

    'lesson-6-4': `Expressões de tempo são essenciais para falar sobre quando as coisas acontecem. Esta lição expande seu vocabulário temporal.

**Tempo Relativo:**
- **vandaag** (hoje), **morgen** (amanhã), **gisteren** (ontem)
- **deze week** (esta semana), **volgende week** (próxima semana)
- **vorige maand** (mês passado)

**Frequência:**
- **altijd** (sempre), **vaak** (frequentemente)
- **soms** (às vezes), **nooit** (nunca)
- **elke dag** (todo dia), **elke week** (toda semana)

**Partes do Dia:**
- **'s ochtends** (de manhã), **'s middags** (à tarde)
- **'s avonds** (à noite), **'s nachts** (de madrugada)

Use essas expressões para descrever sua rotina diária!`,

    'lesson-6-5': `Datas e aniversários são importantes para eventos sociais. Esta lição ensina como expressar datas em holandês.

**Formato de Data:**
Em holandês, as datas são escritas: dia + mês + ano
Exemplo: 15 mei 2024 (15 de maio de 2024)

**Perguntando sobre Datas:**
- "Wanneer ben je jarig?" (Quando é seu aniversário?)
- "Op welke datum?" (Em que data?)

**Respondendo:**
- "Ik ben jarig op..." (Meu aniversário é em...)
- "Mijn verjaardag is op 15 mei" (Meu aniversário é 15 de maio)

**Celebrações:**
- **de verjaardag** (aniversário)
- **de taart** (bolo)
- **het cadeau** (presente)
- **feliciteren** (parabenizar)

Frase útil: "Gefeliciteerd met je verjaardag!" (Parabéns pelo seu aniversário!)`,

    'lesson-7-2': `Música e arte são partes importantes da cultura. Esta lição ensina vocabulário relacionado a essas áreas criativas.

**Música:**
- **de muziek** (música), **het lied** (canção)
- **zingen** (cantar), **spelen** (tocar instrumento)
- **de gitaar** (violão), **de piano** (piano)
- **de drums** (bateria)

**Arte:**
- **de kunst** (arte), **het schilderij** (pintura)
- **tekenen** (desenhar), **schilderen** (pintar)
- **het museum** (museu), **de tentoonstelling** (exposição)

**Preferências:**
- "Ik hou van muziek" (Gosto de música)
- "Ik speel gitaar" (Toco violão)
- "Ik ga graag naar musea" (Gosto de ir a museus)

A Holanda tem museus mundialmente famosos como o Rijksmuseum e o Van Gogh Museum!`,

    'lesson-7-3': `Verbos modais são essenciais para expressar habilidade, permissão, obrigação e desejo. Esta lição explora os principais verbos modais.

**Principais Verbos Modais:**
- **kunnen** (poder/saber) - habilidade ou possibilidade
- **mogen** (poder) - permissão
- **moeten** (dever/ter que) - obrigação
- **willen** (querer) - desejo

**Estrutura:**
Verbo modal + infinitivo no final da frase
Exemplo: "Ik kan zwemmen" (Eu sei nadar)

**Exemplos:**
- "Mag ik binnenkomen?" (Posso entrar?)
- "Je moet je huiswerk maken" (Você deve fazer sua lição de casa)
- "Ik wil naar huis gaan" (Quero ir para casa)
- "Kun je me helpen?" (Você pode me ajudar?)

Pratique usando esses verbos em diferentes contextos!`,

    'lesson-7-4': `Expressar o que você gosta ou não gosta é fundamental para conversas. Esta lição ensina como falar sobre preferências.

**Expressando Gostos:**
- "Ik hou van..." (Eu gosto de...)
- "Ik vind... leuk" (Eu acho... legal)
- "Ik ben dol op..." (Eu adoro...)

**Expressando Desgostos:**
- "Ik hou niet van..." (Não gosto de...)
- "Ik vind... niet leuk" (Não acho... legal)
- "Ik haat..." (Eu odeio...)

**Preferências:**
- "Ik geef de voorkeur aan..." (Prefiro...)
- "Liever... dan..." (Prefiro... do que...)

**Exemplos:**
- "Ik hou van voetbal" (Gosto de futebol)
- "Ik vind lezen leuk" (Acho ler legal)
- "Ik geef de voorkeur aan thee" (Prefiro chá)`,

    'lesson-7-5': `Falar sobre a frequência com que você faz algo é importante para descrever rotinas e hábitos.

**Advérbios de Frequência:**
- **altijd** (sempre) - 100%
- **meestal** (geralmente) - 80%
- **vaak** (frequentemente) - 60%
- **soms** (às vezes) - 40%
- **zelden** (raramente) - 20%
- **nooit** (nunca) - 0%

**Posição na Frase:**
Geralmente após o verbo principal:
"Ik ga vaak naar de bioscoop" (Vou frequentemente ao cinema)

**Expressões de Frequência:**
- **elke dag** (todo dia)
- **twee keer per week** (duas vezes por semana)
- **een keer per maand** (uma vez por mês)

**Exemplos:**
- "Ik sport drie keer per week" (Faço exercício três vezes por semana)
- "Ik lees altijd voor het slapen" (Sempre leio antes de dormir)`,

    'lesson-8-2': `Bebidas são uma parte importante da cultura holandesa. Esta lição ensina vocabulário sobre diferentes tipos de bebidas.

**Bebidas Quentes:**
- **de koffie** (café) - muito popular na Holanda
- **de thee** (chá)
- **de warme chocolademelk** (chocolate quente)

**Bebidas Frias:**
- **het water** (água)
- **het sap** (suco)
- **de frisdrank** (refrigerante)
- **het bier** (cerveja)
- **de wijn** (vinho)

**No Café:**
- "Een koffie, alstublieft" (Um café, por favor)
- "Met melk en suiker?" (Com leite e açúcar?)
- "Zwarte koffie" (Café preto)

**Dica Cultural:** Os holandeses bebem muito café - é comum oferecer café aos visitantes!`,

    'lesson-8-3': `Descrever sabores ajuda a falar sobre comida e expressar preferências culinárias.

**Sabores Básicos:**
- **zoet** (doce)
- **zout** (salgado)
- **zuur** (azedo)
- **bitter** (amargo)
- **pittig** (picante)

**Descrevendo Comida:**
- **lekker** (gostoso)
- **vies** (nojento)
- **vers** (fresco)
- **oud** (velho/passado)

**Frases Úteis:**
- "Dit is erg lekker!" (Isso está muito gostoso!)
- "Het is te zout" (Está muito salgado)
- "Ik hou van zoet eten" (Gosto de comida doce)
- "Is het pittig?" (É picante?)

Pratique descrevendo seus pratos favoritos usando esses adjetivos!`,

    'lesson-8-4': `Saber como pagar a conta em um restaurante é essencial. Esta lição ensina o vocabulário e as frases necessárias.

**Pedindo a Conta:**
- "De rekening, alstublieft" (A conta, por favor)
- "Mag ik afrekenen?" (Posso pagar?)
- "Kunnen we betalen?" (Podemos pagar?)

**Métodos de Pagamento:**
- **contant** (em dinheiro)
- **pinnen** (pagar com cartão de débito)
- **met creditcard** (com cartão de crédito)

**Gorjeta:**
- **de fooi** (gorjeta)
- "Hou het wisselgeld maar" (Pode ficar com o troco)

**Dividindo a Conta:**
- "Kunnen we apart betalen?" (Podemos pagar separadamente?)
- "We delen de rekening" (Vamos dividir a conta)

**Dica:** Na Holanda, gorjeta não é obrigatória, mas arredondar a conta é comum!`,

    'lesson-8-5': `Esta lição de revisão consolida todo o vocabulário e gramática do nível A1, preparando você para avançar ao A2.

**Tópicos Revisados:**
- Saudações e apresentações
- Pronomes e verbos básicos (zijn, hebben)
- Números, cores, família
- Comida, roupas, casa
- Tempo, clima, hobbies
- Artigos (de/het), plurais
- Perguntas e negação

**Habilidades A1 Alcançadas:**
✓ Apresentar-se e fazer perguntas pessoais básicas
✓ Entender frases simples e vocabulário cotidiano
✓ Descrever família, rotina e preferências
✓ Fazer compras e pedir informações
✓ Ler textos curtos e simples

**Próximos Passos:**
Continue praticando e prepare-se para o nível A2, onde você aprenderá:
- Passado simples
- Mais verbos e expressões
- Conversas mais complexas

Parabéns por completar o nível A1!`
  };

  let expanded = 0;

  for (const [lessonId, content] of Object.entries(expansions)) {
    await db.update(lessons)
      .set({ content })
      .where(eq(lessons.id, lessonId));
    
    expanded++;
    console.log(`✓ Expanded content for ${lessonId}`);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total lessons expanded: ${expanded}`);
  console.log(`✅ All lesson content expanded!\n`);
}

expandLessonContent();

