# REP — aplicativo de treino

Abra `index.html` no navegador para usar no computador. Pesos, repetições, séries concluídas e histórico são salvos automaticamente no próprio navegador.

## Usar como aplicativo no iPhone

Para instalar na tela inicial do iPhone, publique o projeto em um endereço HTTPS. Depois:

1. Abra o endereço no Safari.
2. Toque em **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.

O projeto já inclui o manifesto, ícone e cache necessários para funcionar como um PWA, inclusive com suporte offline depois do primeiro acesso.

> Atenção: limpar os dados do Safari apaga o histórico salvo. Os registros não são enviados para nenhum servidor.

## Como o projeto é organizado

Não existe build e não existe pasta de saída: os arquivos da raiz são exatamente o que é servido.

| Arquivo | Papel |
| --- | --- |
| `exercises.js` | Catálogo de exercícios — fonte única de verdade |
| `storage.js` | Persistência e histórico (`RepDB`) |
| `app.js` | Interface: o que desenha e reage a toque |
| `sw.js` | Service worker (offline) |

### Adicionar um exercício

1. Coloque duas fotos em `exercises/`: `<id>-0.jpg` (posição inicial) e `<id>-1.jpg` (final).
2. Acrescente o exercício ao grupo certo em `exercises.js`.

Só isso. A lista de imagens que o service worker guarda para uso offline é derivada do catálogo, então não há uma segunda lista para lembrar de atualizar.

### Armazenamento

Tudo fica em `localStorage`, na chave `rep-db-v2`:

```
{ version: 2, sessions: { "2026-09-17": { exercises: { "supino-reto": [ {weight, reps, done} ] } } } }
```

Cada série é guardada com carga e repetições, por data. Histórico, volume e "quanto levantei da última vez" (`RepDB.lastPerformance`) são calculados a partir daí, não armazenados em separado.

Quem já usava a versão anterior é migrado sozinho na primeira abertura: as chaves `rep-workout-<data>` e `rep-workout-history` viram uma sessão cada e são removidas. Dias que só existiam no resumo antigo mantêm a contagem de séries, mas não têm como recuperar a carga — aparecem no histórico como "registro antigo".

### Testes

```bash
npm test
```

Cobre a migração, o cálculo de histórico e os casos de dado corrompido. Não precisa de dependências.

### Rodando localmente

Service worker só funciona em `https` ou `localhost` — abrir via `file://` serve para ver a tela, não para testar o offline.

```bash
python -m http.server 8765
```

O cache é *cache-first*: depois de editar um arquivo, a primeira recarga ainda mostra a versão antiga e a segunda já traz a nova. É de propósito — na academia o app abre instantâneo e não depende do sinal.
