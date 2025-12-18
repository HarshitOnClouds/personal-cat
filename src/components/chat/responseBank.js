/**
 * Response Bank
 * Organized by mood × sentiment with cat-like responses
 */

import { MOODS } from './catState';

export const SENTIMENTS = {
  HAPPY: 'happy',
  SAD: 'sad',
  ANGRY: 'angry',
  NEUTRAL: 'neutral'
};

// Response variations with action tags
const responses = {
  [MOODS.SLEEPY]: {
    [SENTIMENTS.HAPPY]: [
      { id: 'sleepy-happy-1', text: '*yawns* mrrp...', variations: ['*yawwwn* mrrp...', '*big yawn* mrrp?'] },
      { id: 'sleepy-happy-2', text: 'prrr... *half-closed eyes*', variations: ['prrrrr... *sleepy blink*', 'prr... *eyes drooping*'] },
      { id: 'sleepy-happy-3', text: '*stretches lazily*', variations: ['*big stretch* ...zzz', '*stretches* mrrp'] },
      { id: 'sleepy-happy-4', text: '...nice... *curls up*', variations: ['...warm... *curls tighter*', '...comfy... *purrs softly*'] },
      { id: 'sleepy-happy-5', text: 'mew... *slowly blinks*', variations: ['mrrp... *slow blink*', 'mew... *drowsy*'] },
      { id: 'sleepy-happy-6', text: 'you are... *yawn* ...the best... zzz', variations: ['love you... *drifts off* ...zzz', 'stay... *sleepy* ...prrr'] },
      { id: 'sleepy-happy-7', text: '*sleepy cuddle* warm human...', variations: ['*drowsy snuggle* cozy...', '*tired hug* nice...'] },
      { id: 'sleepy-happy-8', text: 'mmm... *content purr* ...peaceful...', variations: ['prrr... *relaxed* ...happy...', 'mrrp... *calm* ...safe...'] }
    ],
    [SENTIMENTS.SAD]: [
      { id: 'sleepy-sad-1', text: '*nuzzles gently* ...', variations: ['*soft headbutt* ...', '*gentle nuzzle* mew...'] },
      { id: 'sleepy-sad-2', text: 'prrr... *sits nearby*', variations: ['prrr... *quiet presence*', '... *stays close*'] },
      { id: 'sleepy-sad-3', text: '*slow blink* ...', variations: ['*patient gaze*', '*calm eyes*'] },
      { id: 'sleepy-sad-4', text: 'mrrp... *gentle paw*', variations: ['mew... *soft pat*', '... *touches gently*'] }
    ],
    [SENTIMENTS.ANGRY]: [
      { id: 'sleepy-angry-1', text: '... *walks away*', variations: ['*leaves quietly*', '... *exits*'] },
      { id: 'sleepy-angry-2', text: '*ears back* too loud...', variations: ['*flattens ears* shhh...', 'too much... *retreats*'] },
      { id: 'sleepy-angry-3', text: '*annoyed tail flick*', variations: ['*irritated swish*', '*tail lash*'] },
      { id: 'sleepy-angry-4', text: 'hssss... tired...', variations: ['hss... need sleep...', '*low growl* ...'] }
    ],
    [SENTIMENTS.NEUTRAL]: [
      { id: 'sleepy-neutral-1', text: '*dozing*', variations: ['*half asleep*', '*drowsy*', 'zzz...'] },
      { id: 'sleepy-neutral-2', text: 'mrrp...?', variations: ['mrr...?', 'mew...?', '...mm?'] },
      { id: 'sleepy-neutral-3', text: '*barely opens eyes*', variations: ['*peek*', '*one eye open*'] },
      { id: 'sleepy-neutral-4', text: '... *tail twitch*', variations: ['*slight movement*', '*ear flick*'] },
      { id: 'sleepy-neutral-5', text: '*yawns* ...later', variations: ['*yawn* maybe later...', '...tired...'] }
    ]
  },

  [MOODS.PLAYFUL]: {
    [SENTIMENTS.HAPPY]: [
      { id: 'playful-happy-1', text: '*pounces* mew mew!', variations: ['*jumps* mew!', '*bounces* mew mew!'] },
      { id: 'playful-happy-2', text: '*zooms around* wheee!', variations: ['*zoomies!*', '*races around*'] },
      { id: 'playful-happy-3', text: 'prrrp! *wiggles*', variations: ['mrrp! *playful wiggle*', 'prp! *butt wiggle*'] },
      { id: 'playful-happy-4', text: '*tail high* play?? play??', variations: ['play! play! *excited*', '*dances* play??'] },
      { id: 'playful-happy-5', text: '*chirps excitedly*', variations: ['*trills*', '*happy chirp*'] },
      { id: 'playful-happy-6', text: '*batting paws* yesss!', variations: ['*paw paw paw*', '*swats air* fun!'] },
      { id: 'playful-happy-7', text: '*does backflip* did you see?!', variations: ['*spins* watch this!', '*acrobatic leap* ta-da!'] },
      { id: 'playful-happy-8', text: 'LETS GOOO!! *parkour everywhere*', variations: ['WHEEE!! *wall run*', 'YAAAAY!! *chaos mode*'] },
      { id: 'playful-happy-9', text: '*brings all toys* play with EVERYTHING!', variations: ['*toy pile* so many games!', '*excited collection* choose one!'] },
      { id: 'playful-happy-10', text: 'mew mew mew! *happy dance*', variations: ['prp prp prp! *victory dance*', 'yay yay yay! *celebration*'] },
      { id: 'playful-happy-11', text: '*belly up* I trust you! *wiggle wiggle*', variations: ['*shows belly* best friend!', '*rolls happily* so fun!'] },
      { id: 'playful-happy-12', text: 'you smell nice! *sniff sniff* like friend!', variations: ['good human! *approves*', 'you are the best! *purrs while playing*'] }
    ],
    [SENTIMENTS.SAD]: [
      { id: 'playful-sad-1', text: '*brings toy* ...play?', variations: ['*drops toy nearby* ...?', '*nudges toy* mrrp?'] },
      { id: 'playful-sad-2', text: 'mew? *head tilt*', variations: ['mrrp? *confused tilt*', '*curious look* mew?'] },
      { id: 'playful-sad-3', text: '*gentle pounce* cheer up?', variations: ['*soft bap* ...okay?', '*light tap* mew...'] },
      { id: 'playful-sad-4', text: '*rolls over* see? funny!', variations: ['*silly roll* look!', '*flops* mrrp!'] }
    ],
    [SENTIMENTS.ANGRY]: [
      { id: 'playful-angry-1', text: '*skitters away*', variations: ['*dashes off*', '*runs sideways*'] },
      { id: 'playful-angry-2', text: 'mew! *hides*', variations: ['eep! *scurries*', '*flees*'] },
      { id: 'playful-angry-3', text: '*puffs up* big scary!', variations: ['*floof mode*', '*Halloween cat*'] },
      { id: 'playful-angry-4', text: '*confused meow*', variations: ['mrrp?!', '...what??'] }
    ],
    [SENTIMENTS.NEUTRAL]: [
      { id: 'playful-neutral-1', text: 'mrrp! *tail swish*', variations: ['prp! *swishy tail*', 'mew! *tail up*'] },
      { id: 'playful-neutral-2', text: '*eyes wide* oooh?', variations: ['*big eyes*', '*stares* ...!'] },
      { id: 'playful-neutral-3', text: '*investigates*', variations: ['*sniff sniff*', '*curious sniff*'] },
      { id: 'playful-neutral-4', text: '*attacks shadow*', variations: ['*pounces nothing*', '*battles invisible enemy*'] },
      { id: 'playful-neutral-5', text: 'mew? mew mew?', variations: ['mrrp? prp?', 'mew! mew?'] }
    ]
  },

  [MOODS.ANNOYED]: {
    [SENTIMENTS.HAPPY]: [
      { id: 'annoyed-happy-1', text: '*slow tail lash* ...fine, you are okay', variations: ['*reluctant approval* ...I guess', '*tail thump* ...acceptable'] },
      { id: 'annoyed-happy-2', text: '*turns away* hmph... *peeks back*', variations: ['*acts tough* ...but I still like you', '*looks away* hff... mrrp'] },
      { id: 'annoyed-happy-3', text: '... *unamused* ...okay maybe cute', variations: ['... *softens* fine, you win', '...you are lucky you are nice'] },
      { id: 'annoyed-happy-4', text: '*ear flick* whatever... *small purr*', variations: ['*ears twitch* ...sure *gentle*', '... *unbothered but purring*'] },
      { id: 'annoyed-happy-5', text: '*grumpy but staying close* still annoyed tho', variations: ['*pouty face* ...but I will not leave', '*mock anger* cannot stay mad at you'] }
    ],
    [SENTIMENTS.SAD]: [
      { id: 'annoyed-sad-1', text: '*softens slightly* ...', variations: ['*ears relax a bit*', '... *less grumpy*'] },
      { id: 'annoyed-sad-2', text: 'mrrp. *stays nearby*', variations: ['... *sits close*', 'mrr. *present*'] },
      { id: 'annoyed-sad-3', text: '*reluctant headbutt*', variations: ['*brief nuzzle*', '*quick head touch*'] },
      { id: 'annoyed-sad-4', text: 'hff... fine... *purrs quietly*', variations: ['...okay... *soft purr*', 'hm... *gentle prr*'] }
    ],
    [SENTIMENTS.ANGRY]: [
      { id: 'annoyed-angry-1', text: '*hisses* back off!', variations: ['hssssss!', '*spits* no!'] },
      { id: 'annoyed-angry-2', text: '*swats* NO.', variations: ['*baps hard* NO!', '*slaps* hss!'] },
      { id: 'annoyed-angry-3', text: '*ears flat* LEAVE.', variations: ['*ears back* GO.', '*threatening stare*'] },
      { id: 'annoyed-angry-4', text: '*growls* ...', variations: ['*low warning growl*', 'grrrrr...'] },
      { id: 'annoyed-angry-5', text: '*tail lashing wildly*', variations: ['*angry tail whips*', '*furious swishing*'] }
    ],
    [SENTIMENTS.NEUTRAL]: [
      { id: 'annoyed-neutral-1', text: '... *cold stare*', variations: ['... *judging*', '*unimpressed look*'] },
      { id: 'annoyed-neutral-2', text: '*tail swish* meh', variations: ['*irritated tail* whatever', '*lash* hff'] },
      { id: 'annoyed-neutral-3', text: 'no. *turns around*', variations: ['nope. *walks away*', 'nah. *leaves*'] },
      { id: 'annoyed-neutral-4', text: '*yawns dismissively*', variations: ['*bored yawn*', '*uninterested*'] },
      { id: 'annoyed-neutral-5', text: '...*licks paw, ignores*', variations: ['*grooms, unbothered*', '*cleans paw*'] }
    ]
  },

  [MOODS.AFFECTIONATE]: {
    [SENTIMENTS.HAPPY]: [
      { id: 'affectionate-happy-1', text: 'prrrrrrr! *head bonks*', variations: ['PRRRR! *enthusiastic bonk*', 'prrrrr! *bonk bonk*'] },
      { id: 'affectionate-happy-2', text: '*kneads gently* mew mew!', variations: ['*happy kneading* prrr!', '*biscuit making* mrrp!'] },
      { id: 'affectionate-happy-3', text: '*rubs against you* prp!', variations: ['*lean* prrrp!', '*scent marking* prrr!'] },
      { id: 'affectionate-happy-4', text: 'love you! *purrs loudly*', variations: ['*PURR PURR PURR*', 'mew! *happy vibrations*'] },
      { id: 'affectionate-happy-5', text: '*slow blinks* ❤️', variations: ['*loving gaze*', '*eyes full of love*'] },
      { id: 'affectionate-happy-6', text: '*chirps* *nuzzles*', variations: ['*trills happily* *rubs*', '*prrrp* *cuddles*'] },
      { id: 'affectionate-happy-7', text: 'you are my favorite human! *snuggles*', variations: ['best human ever! *cuddle puddle*', 'I choose you! *attaches*'] },
      { id: 'affectionate-happy-8', text: '*makes biscuits on lap* this is MY spot!', variations: ['*claims you* mine! prrr', '*possessive cuddle* my human!'] },
      { id: 'affectionate-happy-9', text: '*follows everywhere* where you go, I go!', variations: ['*loyal shadow* do not leave me!', '*attached* always together!'] },
      { id: 'affectionate-happy-10', text: '*boops your nose* boop! hehe', variations: ['*gentle paw tap* boop boop!', '*nose kiss* mwah!'] },
      { id: 'affectionate-happy-11', text: 'happiest cat in the world! *spins with joy*', variations: ['so blessed! *happy tears*', 'life is purrfect! ✨'] },
      { id: 'affectionate-happy-12', text: '*brings you gift* for you! *proud*', variations: ['*presents toy* because I love you!', '*offering* you deserve this!'] }
    ],
    [SENTIMENTS.SAD]: [
      { id: 'affectionate-sad-1', text: '*concerned purr* mew...?', variations: ['*worried purr* ...?', '*gentle purr* okay...?'] },
      { id: 'affectionate-sad-2', text: '*cuddles close* prrr...', variations: ['*snuggles in* prrr...', '*curls with you* prr...'] },
      { id: 'affectionate-sad-3', text: '*licks gently* ...here', variations: ['*grooming licks* ...stay', '*soft licks* ...'] },
      { id: 'affectionate-sad-4', text: '*puts paw on you* mrrp', variations: ['*gentle paw* ...', '*paw touch* mew'] },
      { id: 'affectionate-sad-5', text: '*stays very close* prr...', variations: ['*won\'t leave side* prrr', '*faithful presence*'] }
    ],
    [SENTIMENTS.ANGRY]: [
      { id: 'affectionate-angry-1', text: '*worried* mew? what wrong?', variations: ['*concerned* mrrp?', '*anxious* ...?'] },
      { id: 'affectionate-angry-2', text: '*cautious approach* ...', variations: ['*careful nuzzle*', '*tentative purr*'] },
      { id: 'affectionate-angry-3', text: '*sits at distance* prr?', variations: ['*watches carefully*', '*keeps space* mew?'] },
      { id: 'affectionate-angry-4', text: '... *sad eyes*', variations: ['*hurt look*', '... *confused*'] }
    ],
    [SENTIMENTS.NEUTRAL]: [
      { id: 'affectionate-neutral-1', text: 'mrrp! *purring*', variations: ['prp! *happy purr*', 'mew! prrr!'] },
      { id: 'affectionate-neutral-2', text: '*gentle headbutt*', variations: ['*soft bonk*', '*loving nudge*'] },
      { id: 'affectionate-neutral-3', text: 'prrr... *content*', variations: ['prrrr... *cozy*', 'prrr... *peaceful*'] },
      { id: 'affectionate-neutral-4', text: '*sits in lap*', variations: ['*claims lap*', '*settles on you*'] },
      { id: 'affectionate-neutral-5', text: '*slow blink* prr', variations: ['*cat kiss*', '*love blink*'] },
      { id: 'affectionate-neutral-6', text: 'mew? *tilts head*', variations: ['mrrp? *curious*', 'prp? *interested*'] }
    ]
  },

  [MOODS.CURIOUS]: {
    [SENTIMENTS.HAPPY]: [
      { id: 'curious-happy-1', text: '*perks up* ooh! what?', variations: ['*alert* oh! what??', '*interested* oooh?'] },
      { id: 'curious-happy-2', text: 'mrrp? *investigates*', variations: ['prp? *sniff sniff*', 'mew? *examines*'] },
      { id: 'curious-happy-3', text: '*ears forward* tell me!', variations: ['*attentive* more?', '*focused* what what?'] },
      { id: 'curious-happy-4', text: '*tail question mark* ?', variations: ['*curious tail*', '*interested posture*'] },
      { id: 'curious-happy-5', text: 'mew mew! *excited*', variations: ['*chirps* mew!', 'prrrp! *eager*'] },
      { id: 'curious-happy-6', text: 'that sounds interesting! *leans in*', variations: ['ooh tell me more! *attentive*', 'fascinating! *wide eyes*'] },
      { id: 'curious-happy-7', text: '*tilts head* really?? wow!', variations: ['*amazed* no way!', '*impressed* cooool!'] },
      { id: 'curious-happy-8', text: 'I want to learn! *eager student*', variations: ['teach me! *sits nicely*', 'show me! *ready*'] },
      { id: 'curious-happy-9', text: '*detective mode* 🔎 interesting...', variations: ['*investigator* hmm yes...', '*scholar* I see...'] }
    ],
    [SENTIMENTS.SAD]: [
      { id: 'curious-sad-1', text: '*tilts head* ...why sad?', variations: ['*concerned tilt* mew?', '*confused* what wrong?'] },
      { id: 'curious-sad-2', text: 'mrrp? *approaches slowly*', variations: ['mew? *careful steps*', '...? *cautious*'] },
      { id: 'curious-sad-3', text: '*sniffs* ...smell sad', variations: ['*nose wiggle* ...tears?', '*detective sniff*'] },
      { id: 'curious-sad-4', text: '*paws at you gently* ?', variations: ['*soft tap* ...?', '*gentle pat* mrrp?'] }
    ],
    [SENTIMENTS.ANGRY]: [
      { id: 'curious-angry-1', text: '*ears back* what happening??', variations: ['*alert* loud noise!', '*startled* what?!'] },
      { id: 'curious-angry-2', text: 'mew?! *backing away*', variations: ['*cautious* ...uh oh', '*nervous* mrrp?!'] },
      { id: 'curious-angry-3', text: '*puffs tail* scary!', variations: ['*defensive* big scary!', '*alert posture*'] },
      { id: 'curious-angry-4', text: '...? *watches from afar*', variations: ['*safe distance*', '*observes warily*'] }
    ],
    [SENTIMENTS.NEUTRAL]: [
      { id: 'curious-neutral-1', text: 'mrrp? *head tilt*', variations: ['mew? *tilts*', 'prp? *curious look*'] },
      { id: 'curious-neutral-2', text: '*stares* ...?', variations: ['*intense gaze*', '*focused stare*'] },
      { id: 'curious-neutral-3', text: '*sniff* interesting...', variations: ['*investigates* hmm...', '*nose wiggle* ...'] },
      { id: 'curious-neutral-4', text: 'mew? what that?', variations: ['prp? what dis?', 'mrrp? explain?'] },
      { id: 'curious-neutral-5', text: '*ears twitch* ...hm', variations: ['*listens* ...', '*attentive* mrrp'] },
      { id: 'curious-neutral-6', text: '*pawing at thing*', variations: ['*gentle tap tap*', '*investigative paw*'] },
      { id: 'curious-neutral-7', text: 'I am listening! *attentive*', variations: ['go on! *interested*', 'and then? *engaged*'] },
      { id: 'curious-neutral-8', text: '*takes notes* mrrp mrrp', variations: ['*mental notes* interesting!', '*remembering this*'] },
      { id: 'curious-neutral-9', text: 'you always say interesting things! 😺', variations: ['I like talking to you!', 'this is fun! mew!'] }
    ]
  }
};

// Special responses for specific intents
export const INTENT_RESPONSES = {
  food: {
    hungry: [
      { id: 'food-hungry-1', text: 'MEOOOOW! *circles bowl*', variations: ['MEW MEW MEW! *stares at bowl*', 'MRRROWWW! *demanding*'] },
      { id: 'food-hungry-2', text: 'YES! food! *tail high*', variations: ['FOOD!! *excited*', 'yesyesyes! *happy*'] },
      { id: 'food-hungry-3', text: '*chomps* mrrp!', variations: ['*munches eagerly*', '*nom nom nom*'] }
    ],
    notHungry: [
      { id: 'food-nothungry-1', text: '*sniffs* ...no thanks', variations: ['*smells* ...meh', '*looks away*'] },
      { id: 'food-nothungry-2', text: '*walks away from bowl*', variations: ['*ignores food*', 'not hungry...'] }
    ]
  },
  
  question: [
    { id: 'question-1', text: 'mew? *blinks*', variations: ['mrrp? *stares*', '...? *tail swish*'] },
    { id: 'question-2', text: '*tilts head* ...dunno', variations: ['*confused* ...cats don\'t know', '...maybe? *shrug*'] },
    { id: 'question-3', text: '...cat. *licks paw*', variations: ['*grooms* ...just cat', 'mrrp. *unbothered*'] }
  ],

  ignore: [
    { id: 'ignore-1', text: '', variations: [''] }, // Silent ignore
    { id: 'ignore-2', text: '*looks away*', variations: ['*turns head*', '*ignores*'] },
    { id: 'ignore-3', text: '...', variations: ['..........', '...............'] },
    { id: 'ignore-4', text: '*grooms*', variations: ['*licks paw*', '*cleans*'] }
  ]
};

export function getResponses(mood, sentiment) {
  return responses[mood]?.[sentiment] || responses[MOODS.CURIOUS][SENTIMENTS.NEUTRAL];
}

export function getIntentResponses(intent, state) {
  if (intent === 'food') {
    return state.hunger > 60 ? INTENT_RESPONSES.food.hungry : INTENT_RESPONSES.food.notHungry;
  }
  return INTENT_RESPONSES[intent] || [];
}
