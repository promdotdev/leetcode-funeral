export interface Suspect {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  unlockKey: string;
}

export interface Clue {
  id: string;
  aboutSuspectId: string;
  aboutSuspectName: string;
  dimension: 'motive' | 'means' | 'opportunity';
  value: boolean;
  evidence: string;
}

export const SUSPECTS: Suspect[] = [
  {
    id: 'cody',
    name: 'Cody Good',
    title: 'CEO, Stealth AI Startup',
    role: 'The cheating tool kingpin',
    bio: "Cody built his cheating tool by reverse-engineering CodeScreen's scoring system. Spent years crawling the architecture. He knows the platform well enough to breach it. Invited guest at the launch, backstage pass, looks terrible on paper.",
    unlockKey: 'c23608',
  },
  {
    id: 'andre',
    name: 'Andre Karpov',
    title: 'Open-Source Evangelist, "Ship or Die" Author',
    role: 'The vibe coder who started a movement',
    bio: "Andre's famous open-source project is the foundational library that CodeScreen Enterprise is built on. He wrote the original codebase years ago. Lee mocked his manifesto in a keynote. Bitter rivalry, real technical depth. At the launch as an industry figure.",
    unlockKey: 'e4dab4',
  },
  {
    id: 'chase',
    name: 'Chase Redwood',
    title: 'Managing Partner, Disruption Capital',
    role: 'The money behind every disruption',
    bio: "Follow the money. Chase bankrolled the cheating tools, the AI labs, the alternative platforms. $40M riding on CodeScreen's replacement. At the launch as a major investor with a backstage pass. Chase also can't write a line of code.",
    unlockKey: '3dd4dc',
  },
  {
    id: 'goodhart',
    name: 'Professor Goodhart',
    title: 'Tenured Measurement Theorist',
    role: 'The academic with a law named after them',
    bio: 'Quiet. Professorial. Lee personally recruited Goodhart to build the core model for CodeScreen Enterprise. On paper, a neutral advisor. Goodhart spent months with privileged access to the codebase and production systems.',
    unlockKey: 'c0bb31',
  },
  {
    id: 'marianne',
    name: 'Marianne Dawson',
    title: 'Founder, Klew Studio',
    role: 'The ARG designer who wants to replace CodeScreen',
    bio: "Marianne builds ARG-based technical assessments. Her business grows every time a company drops CodeScreen. At the launch presenting alternative approaches, backstage access. Narrative designer, not an engineer.",
    unlockKey: 'd87a8f',
  },
  {
    id: 'jordan',
    name: 'Jordan Lambda',
    title: 'CEO, CodePath Academy',
    role: 'The bootcamp that taught a generation to game the system',
    bio: "Jordan's bootcamp built deep CodeScreen integrations. The engineering team knows the architecture well. Jordan has admin access and was at the launch as a training partner with backstage access.",
    unlockKey: 'a02b6c',
  },
  {
    id: 'taylor',
    name: 'Taylor Reeves',
    title: 'Engineering Manager, Major Tech Company',
    role: '"I just want someone who can do the job"',
    bio: "Taylor failed their own company's CodeScreen assessment and got hired through a referral backdoor. Lee publicly embarrassed Taylor at an all-hands. At the launch as a hiring committee rep with backstage access.",
    unlockKey: '062acb',
  },
  {
    id: 'syd',
    name: 'Syd Lehmann',
    title: 'Creator, System Design Interview Framework',
    role: 'The format that replaced CodeScreen rounds',
    bio: "Former CodeScreen senior engineer. Built parts of the scoring engine. Fired by Lee for proposing system design questions. Knows the platform from the inside. At the launch but deliberately excluded from backstage clearance by Lee.",
    unlockKey: 'b8e07b',
  },
];

// Clues organized by the dossier they appear in (i.e., the suspect page you find them on)
export const CLUES: Record<string, Clue[]> = {
  cody: [
    {
      id: 'cody-1',
      aboutSuspectId: 'andre',
      aboutSuspectName: 'Andre Karpov',
      dimension: 'means',
      value: true,
      evidence:
        "Andre Karpov wrote the open-source library that CodeScreen Enterprise is built on. The original codebase is his. He knows where every vulnerability is because he wrote them.",
    },
    {
      id: 'cody-2',
      aboutSuspectId: 'chase',
      aboutSuspectName: 'Chase Redwood',
      dimension: 'motive',
      value: true,
      evidence:
        "Chase Redwood has $40M invested in CodeScreen's replacement. Cody found a short position on CodeScreen pre-IPO shares buried in Chase's term sheet. Enterprise dying is worth nine figures to Chase's fund.",
    },
    {
      id: 'cody-3',
      aboutSuspectId: 'syd',
      aboutSuspectName: 'Syd Lehmann',
      dimension: 'opportunity',
      value: false,
      evidence:
        "Cody saw Syd get stopped at the backstage door during setup. Lee had Syd's clearance revoked. Syd was stuck in the demo room the entire cocktail window.",
    },
  ],
  andre: [
    {
      id: 'andre-1',
      aboutSuspectId: 'cody',
      aboutSuspectName: 'Cody Good',
      dimension: 'means',
      value: true,
      evidence:
        "Cody built his cheating tool by reverse-engineering CodeScreen's scoring system. Andre caught Cody crawling his codebase. Cody knows the platform well enough to breach it.",
    },
    {
      id: 'andre-2',
      aboutSuspectId: 'marianne',
      aboutSuspectName: 'Marianne Dawson',
      dimension: 'motive',
      value: true,
      evidence:
        "Marianne pitched Andre on ARG-based hiring at a conference last month. Her business model runs on companies leaving CodeScreen. She needs CodeScreen gone.",
    },
    {
      id: 'andre-3',
      aboutSuspectId: 'taylor',
      aboutSuspectName: 'Taylor Reeves',
      dimension: 'opportunity',
      value: true,
      evidence:
        "Andre's journalist mentioned seeing Taylor near the backstage area during cocktail hour. Taylor had access for the employer dashboard demo.",
    },
  ],
  chase: [
    {
      id: 'chase-1',
      aboutSuspectId: 'cody',
      aboutSuspectName: 'Cody Good',
      dimension: 'motive',
      value: false,
      evidence:
        "Chase's portfolio analysis shows Cody's valuation is tied to CodeScreen's market size. No CodeScreen, no customers for the cheating tool. Cody needs Lee alive.",
    },
    {
      id: 'chase-2',
      aboutSuspectId: 'jordan',
      aboutSuspectName: 'Jordan Lambda',
      dimension: 'opportunity',
      value: true,
      evidence:
        'Chase saw Jordan in the backstage area during cocktail hour. Jordan had been there earlier for calibration testing and still had access.',
    },
    {
      id: 'chase-3',
      aboutSuspectId: 'syd',
      aboutSuspectName: 'Syd Lehmann',
      dimension: 'motive',
      value: true,
      evidence:
        "Chase funded Syd's system design framework and ran background diligence. Syd was fired by Lee for proposing system design questions. The public story is \"resigned to innovate.\" The real story is revenge.",
    },
  ],
  goodhart: [
    {
      id: 'goodhart-1',
      aboutSuspectId: 'chase',
      aboutSuspectName: 'Chase Redwood',
      dimension: 'opportunity',
      value: true,
      evidence:
        'Goodhart saw Chase in the backstage area during the cocktail window. Chase had a backstage pass as a major investor.',
    },
    {
      id: 'goodhart-2',
      aboutSuspectId: 'marianne',
      aboutSuspectName: 'Marianne Dawson',
      dimension: 'means',
      value: false,
      evidence:
        "Goodhart worked with every technical advisor on the Enterprise build. Marianne was never among them. She's a narrative designer. No engineering background, no production credentials, no access to the infrastructure.",
    },
    {
      id: 'goodhart-3',
      aboutSuspectId: 'taylor',
      aboutSuspectName: 'Taylor Reeves',
      dimension: 'motive',
      value: true,
      evidence:
        "Goodhart collected Taylor's story as data for the paper. Taylor failed their own company's CodeScreen assessment and got hired through a referral backdoor. Lee said \"if you can't pass our assessment, you probably shouldn't be here\" at Taylor's all-hands.",
    },
  ],
  marianne: [
    {
      id: 'marianne-1',
      aboutSuspectId: 'chase',
      aboutSuspectName: 'Chase Redwood',
      dimension: 'means',
      value: false,
      evidence:
        'Marianne overheard Chase at the bar asking someone what a "production credential" even is. Chase has never written code. The forensic report confirms the attack was executed by a single operator with deep infrastructure knowledge.',
    },
    {
      id: 'marianne-2',
      aboutSuspectId: 'goodhart',
      aboutSuspectName: 'Professor Goodhart',
      dimension: 'motive',
      value: true,
      evidence:
        "Goodhart confided in Marianne while looking for allies. While building the Enterprise model, Goodhart discovered Lee had altered the algorithm for wage suppression, letting clients justify lower salaries. Lee produced an NDA and threatened to end Goodhart's career.",
    },
    {
      id: 'marianne-3',
      aboutSuspectId: 'syd',
      aboutSuspectName: 'Syd Lehmann',
      dimension: 'means',
      value: true,
      evidence:
        'Marianne researched every competitor in the hiring space. Syd Lehmann is a former CodeScreen senior engineer who built parts of the scoring engine. Not a theorist. Someone who actually built the thing.',
    },
  ],
  jordan: [
    {
      id: 'jordan-1',
      aboutSuspectId: 'cody',
      aboutSuspectName: 'Cody Good',
      dimension: 'opportunity',
      value: true,
      evidence:
        'Jordan saw Cody backstage during cocktail hour. Cody had a backstage pass for the demo setup.',
    },
    {
      id: 'jordan-2',
      aboutSuspectId: 'goodhart',
      aboutSuspectName: 'Professor Goodhart',
      dimension: 'means',
      value: true,
      evidence:
        "Jordan's bootcamp integration team worked alongside Goodhart during the Enterprise build. Goodhart built the core model, had production credentials, and spent months inside the codebase. Goodhart had the deepest access of anyone outside Lee.",
    },
    {
      id: 'jordan-3',
      aboutSuspectId: 'taylor',
      aboutSuspectName: 'Taylor Reeves',
      dimension: 'means',
      value: false,
      evidence:
        "Jordan placed bootcamp graduates on Taylor's team. Word got back that Taylor can't evaluate code, let alone write it. Taylor's Q3 review confirms it. Hiring manager, not engineer.",
    },
  ],
  taylor: [
    {
      id: 'taylor-1',
      aboutSuspectId: 'andre',
      aboutSuspectName: 'Andre Karpov',
      dimension: 'opportunity',
      value: false,
      evidence:
        "Taylor watched Andre's live interview stream from the demo room during the entire cocktail window. Timestamped. Andre was on camera the whole time. Never went backstage.",
    },
    {
      id: 'taylor-2',
      aboutSuspectId: 'marianne',
      aboutSuspectName: 'Marianne Dawson',
      dimension: 'opportunity',
      value: true,
      evidence:
        'Taylor saw Marianne in the backstage area during cocktail hour. Marianne was setting up demo materials for her presentation.',
    },
    {
      id: 'taylor-3',
      aboutSuspectId: 'jordan',
      aboutSuspectName: 'Jordan Lambda',
      dimension: 'motive',
      value: false,
      evidence:
        "Jordan's marketing is built on CodeScreen: \"Our graduates pass CodeScreen interviews at 94%.\" Taylor's seen the brochure. Without CodeScreen, that number means nothing. Jordan needs Lee alive more than anyone.",
    },
  ],
  syd: [
    {
      id: 'syd-1',
      aboutSuspectId: 'andre',
      aboutSuspectName: 'Andre Karpov',
      dimension: 'motive',
      value: true,
      evidence:
        "Syd was in the audience when Lee mocked Andre's \"Ship or Die\" manifesto at the keynote. Public humiliation. Enterprise would entrench everything Andre preaches against.",
    },
    {
      id: 'syd-2',
      aboutSuspectId: 'goodhart',
      aboutSuspectName: 'Professor Goodhart',
      dimension: 'opportunity',
      value: true,
      evidence:
        'Syd saw Goodhart heading toward the backstage area from the demo room doorway during cocktail hour. Goodhart had backstage clearance as a technical advisor.',
    },
    {
      id: 'syd-3',
      aboutSuspectId: 'jordan',
      aboutSuspectName: 'Jordan Lambda',
      dimension: 'means',
      value: true,
      evidence:
        "Syd helped build CodeScreen's bootcamp integrations before being fired. Jordan's engineering team knows the architecture well. Jordan has admin-level access from the training partnership.",
    },
  ],
};

export const CORRECT_ANSWER = 'goodhart';

export const REVEAL_TEXT = `Professor Goodhart killed Lee T. Code.

While building the core model for CodeScreen Enterprise, Goodhart discovered Lee had secretly altered the algorithm to suppress senior developer scores, letting corporate clients justify lower salaries. Lee planned to deploy this industry-wide. When Goodhart confronted him, Lee produced an NDA and threatened to end Goodhart's career.

Goodhart set up a confession booth backstage at the launch. A phone where people confess their "LeetCode sins" and receive a penance. Nobody questioned it. Of course the measurement theorist would build something like that.

Goodhart applied contact poison to the phone. During the cocktail window, Goodhart went backstage "to check calibration parameters," plugged a USB into the server to launch a destructive script, and waited. When Lee picked up the phone, the poison absorbed through the skin. The platform went dark. Lee collapsed.

The confession booth is still here tonight. Still works. You may have already used it.

Goodhart's Law: when a measure becomes a target, it ceases to be a good measure. Lee made CodeScreen the measure. Goodhart made it stop.`;

export function getSuspect(id: string): Suspect | undefined {
  return SUSPECTS.find((s) => s.id === id);
}

export function getCluesForDossier(dossierId: string): Clue[] {
  return CLUES[dossierId] || [];
}

export function validateUnlockKey(suspectId: string, key: string): boolean {
  const suspect = getSuspect(suspectId);
  if (!suspect) return false;
  return suspect.unlockKey === key;
}
