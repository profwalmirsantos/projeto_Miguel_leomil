
import type { Story } from './types';

export const STORY_DATA: Story = {
  start: {
    id: 'start',
    text: [
      "Você está prestes a explorar a vida de Maomé, conforme contada pelo historiador Ibn Ishaq. Esta história é fundamental para a tradição islâmica.",
      "Por onde você quer começar?"
    ],
    imagePrompt: "Um livro antigo e ornamentado aberto em uma mesa de madeira, com caligrafia árabe visível em suas páginas, em um ambiente de biblioteca com pouca luz.",
    choices: [
      { text: "Traçar a linhagem do Profeta.", nextScene: 'genealogy' },
      { text: "Explorar o mundo antes do Profeta.", nextScene: 'pre_islamic_arabia' },
    ],
  },
  genealogy: {
    id: 'genealogy',
    text: [
      "Ibn Ishaq começa com duas genealogias. A primeira traça os ancestrais de Maomé, filho de Abd Allah, até Ismael, Abraão, Sem, Noé e, finalmente, Adão.",
      "A segunda detalha os descendentes de Ismael, explicando as divisões entre as tribos árabes. Isso estabelece um lugar para Maomé na história sagrada."
    ],
    imagePrompt: "Uma árvore genealógica antiga e estilizada, desenhada em um pergaminho, com nomes escritos em caligrafia elegante, conectando gerações.",
    choices: [
      { text: "Continuar para o contexto histórico.", nextScene: 'pre_islamic_arabia' },
    ],
  },
  pre_islamic_arabia: {
    id: 'pre_islamic_arabia',
    text: [
      "A história nos leva à Arábia pré-islâmica. Começa com Rabia ibn Nasr, um rei do sul da Arábia, que tem um sonho terrível que não consegue entender ou lembrar, semelhante a Nabucodonosor."
    ],
    imagePrompt: "Um rei com vestes antigas sentado em um trono, com uma expressão preocupada e confusa, dentro de um palácio de pedra sob um céu noturno estrelado.",
    choices: [
      { text: "Descobrir o significado do sonho.", nextScene: 'prophecy' },
    ],
  },
  prophecy: {
    id: 'prophecy',
    text: [
      "Dois profetas, como Daniel, recontam o sonho e o reconhecem como um prenúncio da queda do reino de Himiar e da ascensão de um profeta árabe.",
      "A profecia se desenrola. Dhu Nuwas, um convertido ao judaísmo, assume o trono e massacra cristãos, o que leva a uma invasão abissínia."
    ],
    imagePrompt: "Dois sábios profetas com longas barbas e vestes simples, interpretando um sonho para um rei ansioso, com visões de reinos caindo ao fundo.",
    choices: [
      { text: "Seguir a história para o Ano do Elefante.", nextScene: 'year_of_the_elephant' },
    ],
  },
  year_of_the_elephant: {
    id: 'year_of_the_elephant',
    text: [
      "O general abissínio Abraha assume o poder. A história culmina no famoso 'Ano do Elefante', quando Abraha decide tolamente destruir a Caaba em Meca, usando uma força liderada por um elefante chamado Mahmud."
    ],
    imagePrompt: "Um exército marchando pelo deserto com um elefante de guerra gigante e decorado na liderança, indo em direção a uma cidade distante com uma estrutura cúbica.",
    choices: [
      { text: "Testemunhar o confronto em Meca.", nextScene: 'confrontation' },
    ],
  },
   confrontation: {
    id: 'confrontation',
    text: [
        "A expedição leva Abraha a um confronto com o avô de Maomé, Abd al-Muttalib. No entanto, o elefante Mahmud se recusa a avançar em direção a Meca.",
        "O exército de Abraha é então atingido por um bando de aves carregando pedras, que causam pragas. Meca é poupada pela intervenção divina."
    ],
    imagePrompt: "Um elefante majestoso ajoelhado no chão, recusando-se a se mover, enquanto um exército confuso observa. No céu, um enxame de pássaros escuros se aproxima.",
    choices: [
        { text: "Neste ano auspicioso, o Profeta nasceu. Aprender sobre seu nascimento.", nextScene: 'birth' }
    ]
  },
  birth: {
    id: 'birth',
    text: [
        "Nesse auspicioso ano de 570 d.C., Maomé nasceu. Seu pai, Abd Allah, havia morrido antes de seu nascimento. Sua mãe, Amina, ouviu uma voz dizer: 'Você está grávida do senhor deste povo'.",
        "Uma luz irradiava dela, tão brilhante que ela podia ver os castelos de Bosra, na Síria. Ao nascer, o menino colocou as mãos no chão e ergueu a cabeça para o céu."
    ],
    imagePrompt: "Um bebê recém-nascido envolto em panos, olhando para cima com uma luz suave e etérea emanando dele, iluminando o quarto escuro.",
    choices: [
        { text: "O que aconteceu depois que ele nasceu?", nextScene: 'infancy' }
    ]
  },
  infancy: {
    id: 'infancy',
    text: [
        "De acordo com a tradição, o bebê Maomé foi entregue a uma mãe adotiva beduína para ser amamentado. A partir do momento em que ela o pegou, sua vida prosperou.",
        "Seus seios ficaram cheios, seu jumento doente se recuperou e seu rebanho começou a produzir leite em abundância."
    ],
    imagePrompt: "Uma mulher beduína segurando um bebê com um sorriso gentil. Ao fundo, uma paisagem desértica com ovelhas pastando pacificamente e uma tenda.",
    choices: [
        { text: "Continuar para um evento milagroso em sua infância.", nextScene: 'cleansing' }
    ]
  },
  cleansing: {
    id: 'cleansing',
    text: [
        "Um dia, enquanto cuidava de ovelhas, dois homens vestidos de branco se aproximaram de Maomé. Eles abriram seu peito, extraíram seu coração, removeram uma gota preta e depois lavaram seu coração com neve de uma bacia dourada até ficar totalmente limpo."
    ],
    imagePrompt: "Dois anjos em vestes brancas brilhantes, um segurando uma bacia dourada cheia de neve, cuidando gentilmente de um menino em uma paisagem de pastagem serena.",
    choices: [
        { text: "Aprender como sua pureza foi protegida.", nextScene: 'protection' }
    ]
  },
  protection: {
    id: 'protection',
    text: [
        "Cristãos e judeus muitas vezes notavam que havia algo especial no menino Maomé. Quando ele viajou com seu tio Abu Talib, o eremita Bahira o reconheceu.",
        "Bahira viu o 'selo da profecia' entre os ombros de Maomé e advertiu seu tio para protegê-lo dos judeus, que poderiam machucá-lo se soubessem sua verdadeira identidade."
    ],
    imagePrompt: "Um velho e sábio monge eremita apontando para as costas de um menino, mostrando uma marca brilhante para um homem mais velho e protetor, dentro de uma tenda no deserto.",
    choices: [
        { text: "O que aconteceu quando ele tinha 6 anos?", nextScene: 'orphan' }
    ]
  },
  orphan: {
    id: 'orphan',
    text: [
        "Quando Maomé tinha 6 anos, sua mãe Amina morreu, deixando-o órfão. Ele ficou sob os cuidados de seu avô Abd al-Muttalib.",
        "Após a morte de seu avô, seu tio Abu Talib se tornou seu guardião, continuando a protegê-lo."
    ],
    imagePrompt: "Um menino pequeno sendo confortado por seu tio de aparência gentil, com uma expressão solene em seus rostos, olhando para um horizonte distante.",
    choices: [
        { text: "Você concluiu esta parte da jornada. Jogar novamente?", nextScene: 'start' }
    ],
    isEnd: true
  },
};
