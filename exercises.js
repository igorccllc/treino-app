/*
 * Catálogo de exercícios — fonte única de verdade.
 *
 * Carregado tanto pela página (<script src>) quanto pelo service worker
 * (importScripts). É por isso que ele se anexa a `self` em vez de usar
 * `const`: a lista de imagens a pré-cachear é derivada daqui, e não
 * reescrita à mão no sw.js. Adicionar exercício = mexer só neste arquivo
 * e, quando não houver `visualId`, incluir os dois JPGs em ./exercises/.
 *
 * Campos por exercício:
 *   id          usado na chave do histórico e no nome das imagens
 *   name        rótulo exibido
 *   detail      musculatura envolvida, em texto livre
 *   target      região destacada no body-map (classe CSS target-*)
 *   targetLabel foco principal, por extenso
 *   sets        número de séries sugerido
 *   optional    fora da seleção padrão do grupo
 *   visualId    exercício existente usado como referência visual equivalente
 *   tips        passos exibidos no "Ver movimento"
 */
self.REP_WORKOUT_PLAN = [
  { id: "peito", label: "Peito", icon: "◒", code: "Treino A", exercises: [
    { id: "supino-reto", name: "Supino reto", detail: "Peitoral • Tríceps", target: "chest", targetLabel: "peitoral", sets: 4, tips: ["Apoie os pés e mantenha as escápulas firmes.", "Desça a barra com controle até a linha do peito.", "Empurre sem tirar os ombros do banco."] },
    { id: "supino-inclinado", name: "Supino inclinado", detail: "Peitoral superior", target: "chest", targetLabel: "peitoral superior", sets: 3, tips: ["Ajuste o banco entre 30° e 45°.", "Desça os halteres ao lado do peito.", "Suba mantendo os punhos alinhados."] },
    { id: "crucifixo", name: "Crucifixo com halteres", detail: "Peitoral", target: "chest", targetLabel: "peitoral", sets: 3, tips: ["Mantenha uma leve flexão nos cotovelos.", "Abra até sentir o peitoral alongar.", "Feche os braços sem bater os halteres."] },
    { id: "crossover", name: "Crossover", detail: "Peitoral • Core", target: "chest", targetLabel: "peitoral", sets: 3, tips: ["Incline o tronco levemente.", "Traga as mãos à frente do corpo.", "Retorne devagar, sem perder a postura."] },
    { id: "dips-peito", name: "Paralelas para peito", detail: "Peitoral inferior • Tríceps", target: "chest", targetLabel: "peitoral inferior", sets: 3, optional: true, tips: ["Incline o tronco levemente à frente.", "Desça até sentir o peitoral alongar.", "Suba sem travar os cotovelos."] },
    { id: "flexao", name: "Flexão de braços", detail: "Peitoral • Tríceps", target: "chest", targetLabel: "peitoral", sets: 3, optional: true, tips: ["Mantenha o corpo alinhado.", "Desça o peito com os cotovelos controlados.", "Empurre o chão mantendo o abdômen firme."] },
    { id: "supino-declinado", name: "Supino declinado", detail: "Peitoral inferior", target: "chest", targetLabel: "peitoral inferior", sets: 3, optional: true, tips: ["Prenda os pés e estabilize as escápulas.", "Desça os halteres na linha inferior do peito.", "Suba com controle e punhos alinhados."] },
    { id: "chest-press-maquina", name: "Chest press na máquina", detail: "Peitoral • Tríceps", target: "chest", targetLabel: "peitoral", sets: 3, optional: true, visualId: "supino-reto", tips: ["Ajuste o banco para as manoplas ficarem na linha do peito.", "Empurre sem tirar as costas do encosto.", "Retorne com controle até sentir o peitoral alongar."] },
    { id: "peck-deck", name: "Peck deck / Voador", detail: "Peitoral", target: "chest", targetLabel: "peitoral", sets: 3, optional: true, visualId: "crucifixo", tips: ["Ajuste o banco para os cotovelos ficarem na linha do peito.", "Feche os braços contraindo o peitoral.", "Abra devagar sem deixar os ombros avançarem."] }
  ]},
  { id: "costas", label: "Costas", icon: "⌁", code: "Treino B", exercises: [
    { id: "puxada", name: "Puxada frontal", detail: "Dorsais • Bíceps", target: "back", targetLabel: "dorsais", sets: 4, tips: ["Segure a barra um pouco além dos ombros.", "Puxe em direção à parte alta do peito.", "Suba controlando sem encolher os ombros."] },
    { id: "remada", name: "Remada baixa", detail: "Dorsais • Romboides", target: "back", targetLabel: "dorsais e romboides", sets: 3, tips: ["Mantenha a coluna neutra.", "Puxe o cabo em direção ao abdômen.", "Aproxime as escápulas no fim do movimento."] },
    { id: "serrote", name: "Remada unilateral", detail: "Dorsais", target: "back", targetLabel: "dorsais", sets: 3, tips: ["Apoie mão e joelho no banco.", "Puxe o halter perto do quadril.", "Evite girar o tronco durante a repetição."] },
    { id: "pulldown", name: "Pulldown", detail: "Dorsais", target: "back", targetLabel: "dorsais", sets: 3, tips: ["Mantenha os braços quase estendidos.", "Leve a barra até as coxas.", "Controle a volta e preserve o tronco firme."] },
    { id: "barra-fixa", name: "Barra fixa", detail: "Dorsais • Bíceps", target: "back", targetLabel: "dorsais", sets: 3, optional: true, tips: ["Comece com os ombros encaixados.", "Puxe o peito em direção à barra.", "Desça de forma controlada até estender os braços."] },
    { id: "remada-t", name: "Remada T", detail: "Dorsais • Romboides", target: "back", targetLabel: "meio das costas", sets: 3, optional: true, tips: ["Mantenha o tronco estável.", "Puxe a carga em direção ao peito.", "Aproxime as escápulas sem encolher os ombros."] },
    { id: "hiperextensao", name: "Hiperextensão lombar", detail: "Lombar • Glúteos", target: "back", targetLabel: "lombar", sets: 3, optional: true, tips: ["Apoie o quadril no banco.", "Desça mantendo a coluna neutra.", "Suba até alinhar o tronco, sem hiperestender."] },
    { id: "puxada-neutra", name: "Puxada com pegada neutra", detail: "Dorsais • Bíceps", target: "back", targetLabel: "dorsais", sets: 3, optional: true, visualId: "puxada", tips: ["Segure o triângulo ou as manoplas com as palmas voltadas entre si.", "Puxe em direção à parte alta do peito.", "Estenda os braços controlando a subida dos ombros."] },
    { id: "remada-maquina", name: "Remada na máquina", detail: "Dorsais • Romboides", target: "back", targetLabel: "meio das costas", sets: 3, optional: true, visualId: "remada", tips: ["Ajuste o apoio para manter o peito estável.", "Puxe as manoplas aproximando as escápulas.", "Retorne sem arredondar a coluna."] }
  ]},
  { id: "pernas", label: "Pernas", icon: "⟋", code: "Treino C", exercises: [
    { id: "agachamento", name: "Agachamento livre", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps", sets: 4, tips: ["Mantenha os pés firmes e o abdômen ativo.", "Desça com joelhos acompanhando a ponta dos pés.", "Suba empurrando o chão, sem curvar a coluna."] },
    { id: "legpress", name: "Leg press", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps e glúteos", sets: 4, tips: ["Apoie toda a lombar no encosto.", "Desça a plataforma com controle.", "Estenda sem travar completamente os joelhos."] },
    { id: "extensora", name: "Cadeira extensora", detail: "Quadríceps", target: "quads", targetLabel: "quadríceps", sets: 3, tips: ["Alinhe o joelho ao eixo da máquina.", "Estenda as pernas sem tirar o quadril do banco.", "Desça lentamente até a posição inicial."] },
    { id: "flexora", name: "Mesa flexora", detail: "Posteriores", target: "hamstrings", targetLabel: "posteriores da coxa", sets: 3, tips: ["Mantenha o quadril apoiado.", "Flexione os joelhos até onde controlar.", "Retorne sem deixar o peso bater."] },
    { id: "panturrilha", name: "Panturrilha em pé", detail: "Panturrilhas", target: "calves", targetLabel: "panturrilhas", sets: 4, tips: ["Apoie a parte da frente dos pés.", "Suba o calcanhar o máximo possível.", "Desça devagar até alongar a panturrilha."] },
    { id: "stiff", name: "Stiff / Terra romeno", detail: "Posteriores • Glúteos", target: "hamstrings", targetLabel: "posteriores da coxa", sets: 3, optional: true, tips: ["Mantenha a coluna neutra e joelhos destravados.", "Leve o quadril para trás enquanto desce a barra.", "Suba contraindo glúteos e posteriores."] },
    { id: "afundo", name: "Afundo com halteres", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps e glúteos", sets: 3, optional: true, tips: ["Dê um passo confortável à frente.", "Desça mantendo o joelho alinhado ao pé.", "Empurre o chão com a perna da frente."] },
    { id: "elevacao-pelvica", name: "Elevação pélvica", detail: "Glúteos • Posteriores", target: "hamstrings", targetLabel: "glúteos", sets: 4, optional: true, tips: ["Apoie as escápulas no banco.", "Eleve o quadril mantendo as costelas baixas.", "Contraia os glúteos no topo sem arquear a lombar."] },
    { id: "panturrilha-sentado", name: "Panturrilha sentado", detail: "Panturrilhas", target: "calves", targetLabel: "panturrilhas", sets: 4, optional: true, tips: ["Apoie a ponta dos pés na plataforma.", "Eleve os calcanhares até o máximo controle.", "Desça lentamente até alongar."] },
    { id: "agachamento-sumo", name: "Agachamento sumô", detail: "Glúteos • Adutores • Quadríceps", target: "quads", targetLabel: "glúteos e parte interna das coxas", sets: 3, optional: true, visualId: "agachamento", tips: ["Afaste os pés e aponte as pontas levemente para fora.", "Desça mantendo os joelhos alinhados aos pés.", "Suba contraindo glúteos e empurrando o chão."] },
    { id: "passada", name: "Passada com halteres", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps e glúteos", sets: 3, optional: true, visualId: "afundo", tips: ["Dê passos estáveis e mantenha o tronco ereto.", "Desça o joelho de trás em direção ao chão.", "Impulsione com a perna da frente e avance."] }
  ]},
  { id: "ombros", label: "Ombros", icon: "◇", code: "Treino D", exercises: [
    { id: "desenvolvimento", name: "Desenvolvimento", detail: "Deltoides • Tríceps", target: "shoulders", targetLabel: "ombros", sets: 4, tips: ["Mantenha o tronco firme e os punhos alinhados.", "Empurre os halteres acima da cabeça.", "Desça até os cotovelos ficarem próximos de 90°."] },
    { id: "elevacao-lateral", name: "Elevação lateral", detail: "Deltoide lateral", target: "shoulders", targetLabel: "deltoides laterais", sets: 3, tips: ["Use uma leve flexão nos cotovelos.", "Eleve até a linha dos ombros.", "Desça controlando, sem embalar o corpo."] },
    { id: "facepull", name: "Face pull", detail: "Deltoide posterior", target: "rear-shoulders", targetLabel: "deltoides posteriores", sets: 3, tips: ["Posicione a corda na altura do rosto.", "Puxe separando as pontas da corda.", "Mantenha os cotovelos altos e controle a volta."] },
    { id: "arnold-press", name: "Desenvolvimento Arnold", detail: "Deltoides • Tríceps", target: "shoulders", targetLabel: "ombros", sets: 3, optional: true, tips: ["Comece com as palmas voltadas para você.", "Gire os braços enquanto empurra os halteres.", "Retorne pelo mesmo caminho com controle."] },
    { id: "elevacao-frontal", name: "Elevação frontal", detail: "Deltoide anterior", target: "shoulders", targetLabel: "deltoides anteriores", sets: 3, optional: true, tips: ["Mantenha uma leve flexão nos cotovelos.", "Eleve os halteres até a linha dos ombros.", "Desça sem embalar o tronco."] },
    { id: "voador-inverso", name: "Voador inverso", detail: "Deltoide posterior", target: "rear-shoulders", targetLabel: "deltoides posteriores", sets: 3, optional: true, tips: ["Apoie o peito e mantenha o pescoço neutro.", "Abra os braços sem encolher os ombros.", "Retorne lentamente à posição inicial."] },
    { id: "desenvolvimento-maquina", name: "Desenvolvimento na máquina", detail: "Deltoides • Tríceps", target: "shoulders", targetLabel: "ombros", sets: 3, optional: true, visualId: "desenvolvimento", tips: ["Ajuste o banco para as manoplas começarem na altura dos ombros.", "Empurre mantendo as costas apoiadas.", "Desça com controle sem deixar os cotovelos fecharem."] },
    { id: "elevacao-lateral-polia", name: "Elevação lateral na polia", detail: "Deltoide lateral", target: "shoulders", targetLabel: "deltoides laterais", sets: 3, optional: true, visualId: "elevacao-lateral", tips: ["Posicione a polia baixa e mantenha o tronco estável.", "Eleve o braço até a linha do ombro.", "Desça devagar mantendo tensão no cabo."] }
  ]},
  { id: "biceps", label: "Bíceps", icon: "⌇", code: "Treino E", exercises: [
    { id: "rosca-direta", name: "Rosca direta", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, tips: ["Mantenha os cotovelos perto do tronco.", "Flexione sem projetar os ombros.", "Desça a barra de forma controlada."] },
    { id: "rosca-martelo", name: "Rosca martelo", detail: "Bíceps • Braquial", target: "biceps", targetLabel: "bíceps e braquial", sets: 3, tips: ["Segure os halteres com as palmas para dentro.", "Suba sem afastar os cotovelos.", "Controle toda a descida."] },
    { id: "rosca-scott", name: "Rosca Scott", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Apoie totalmente os braços no banco.", "Flexione os cotovelos sem levantar os ombros.", "Desça até quase estender os braços."] },
    { id: "rosca-concentrada", name: "Rosca concentrada", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Apoie o cotovelo na parte interna da coxa.", "Suba o halter contraindo o bíceps.", "Desça lentamente sem perder a posição."] },
    { id: "rosca-inclinada", name: "Rosca inclinada", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Mantenha as costas apoiadas no banco.", "Flexione sem projetar os cotovelos.", "Controle a descida até alongar o bíceps."] },
    { id: "rosca-alternada", name: "Rosca alternada", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, visualId: "rosca-direta", tips: ["Mantenha os cotovelos junto ao tronco.", "Suba um halter de cada vez girando a palma para cima.", "Desça controlando antes de alternar o braço."] },
    { id: "rosca-cabo", name: "Rosca bíceps no cabo", detail: "Bíceps • Tensão contínua", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, visualId: "rosca-direta", tips: ["Use a polia baixa e mantenha os cotovelos fixos.", "Flexione até aproximar as mãos dos ombros.", "Retorne sem deixar as placas encostarem."] }
  ]},
  { id: "triceps", label: "Tríceps", icon: "⌁", code: "Treino F", exercises: [
    { id: "triceps-polia", name: "Tríceps na polia", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, tips: ["Trave os cotovelos junto ao corpo.", "Estenda os braços até o final.", "Volte sem deixar os ombros avançarem."] },
    { id: "triceps-frances", name: "Tríceps francês", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, tips: ["Mantenha os cotovelos apontados para frente.", "Desça o halter atrás da cabeça.", "Estenda os braços sem arquear a lombar."] },
    { id: "paralelas-triceps", name: "Paralelas para tríceps", detail: "Tríceps • Peitoral", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Mantenha o tronco mais vertical.", "Desça com os cotovelos apontando para trás.", "Estenda os braços sem perder o controle."] },
    { id: "supino-fechado", name: "Supino fechado", detail: "Tríceps • Peitoral", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Use uma pegada na largura dos ombros.", "Desça a barra mantendo os cotovelos próximos.", "Empurre concentrando a força nos tríceps."] },
    { id: "triceps-testa", name: "Tríceps testa", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Mantenha os braços apontados para cima.", "Flexione apenas os cotovelos.", "Estenda sem deixar os cotovelos abrirem."] },
    { id: "triceps-corda", name: "Tríceps corda", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, visualId: "triceps-polia", tips: ["Mantenha os cotovelos colados ao corpo.", "Estenda e separe as pontas da corda no final.", "Volte devagar sem mover os ombros."] },
    { id: "triceps-unilateral", name: "Tríceps unilateral na polia", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, visualId: "triceps-polia", tips: ["Posicione a polia alta e estabilize o ombro.", "Estenda um braço mantendo o cotovelo parado.", "Retorne com controle e repita do outro lado."] }
  ]},
  { id: "core", label: "Core", icon: "◎", code: "Treino G", exercises: [
    { id: "prancha", name: "Prancha", detail: "Core • Estabilidade", target: "core", targetLabel: "core", sets: 3, tips: ["Alinhe ombros, quadril e calcanhares.", "Contraia abdômen e glúteos.", "Respire normalmente sem deixar o quadril cair."] },
    { id: "abdominal-cabo", name: "Abdominal no cabo", detail: "Abdômen", target: "core", targetLabel: "abdômen", sets: 3, tips: ["Mantenha o quadril estável.", "Flexione o tronco aproximando costelas e quadril.", "Retorne devagar sem puxar apenas com os braços."] },
    { id: "elevacao-pernas", name: "Elevação de pernas", detail: "Abdômen inferior", target: "lower-core", targetLabel: "abdômen inferior", sets: 3, tips: ["Mantenha a lombar estável.", "Eleve as pernas com controle.", "Desça sem relaxar totalmente o abdômen."] },
    { id: "bicicleta", name: "Abdominal bicicleta", detail: "Abdômen • Oblíquos", target: "core", targetLabel: "abdômen e oblíquos", sets: 3, optional: true, tips: ["Mantenha a lombar próxima ao chão.", "Aproxime cotovelo e joelho opostos.", "Alterne os lados sem puxar o pescoço."] },
    { id: "russian-twist", name: "Russian twist", detail: "Oblíquos • Core", target: "core", targetLabel: "oblíquos", sets: 3, optional: true, tips: ["Incline o tronco mantendo a coluna neutra.", "Gire as costelas de um lado ao outro.", "Mantenha o abdômen ativo durante todo o movimento."] },
    { id: "decline-crunch", name: "Abdominal declinado", detail: "Abdômen", target: "core", targetLabel: "abdômen", sets: 3, optional: true, tips: ["Prenda os pés no banco.", "Flexione o tronco usando o abdômen.", "Desça com controle sem relaxar completamente."] },
    { id: "ab-wheel", name: "Roda abdominal", detail: "Core • Ombros", target: "core", targetLabel: "core", sets: 3, optional: true, tips: ["Contraia abdômen e glúteos.", "Role para frente sem deixar a lombar ceder.", "Puxe a roda de volta mantendo o tronco firme."] }
  ]}
];

// Derivado do catálogo: consumido pelo service worker para montar a lista
// de assets e pelo app para busca por id.
self.REP_EXERCISE_IDS = [...new Set(self.REP_WORKOUT_PLAN.flatMap(group => group.exercises.map(exercise => exercise.visualId || exercise.id)))];
