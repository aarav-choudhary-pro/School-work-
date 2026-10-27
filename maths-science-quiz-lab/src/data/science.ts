import type { Question, Topic } from '../lib/types'

const Q = (
  id: string,
  topic: string,
  prompt: string,
  options: string[] | undefined,
  answer: string,
  explain: string,
  extra: Partial<Question> = {},
): Question => ({ id, topic, subject: 'science', prompt, options, answer, explain, difficulty: 2, ...extra })

/* ─────────────────────────────────────────────────────────────
   1 · CELL BIOLOGY
   ───────────────────────────────────────────────────────────── */
const cell: Topic = {
  id: 'cell',
  subject: 'science',
  name: 'Cell Biology',
  emoji: '🧫',
  tagline: 'One cell, nine organelles, four scientists.',
  minutes: 28,
  lab: 'cell',
  examNote: 'The quizmaster will point at a diagram. Learn what each organelle DOES, not just its name.',
  concept: [
    {
      title: 'Who discovered what',
      body: 'Four names carry almost every cell-history question.',
      list: [
        'Robert Hooke (1665) — saw cork under his microscope, called the boxes “cells” (Latin cellula = little room).',
        'Anton van Leeuwenhoek (1674) — first saw living cells (bacteria, “animalcules”).',
        'Schleiden (plants) & Schwann (animals), 1838–39 — proposed the cell theory.',
        'Rudolf Virchow (1855) — “Omnis cellula e cellula”: every cell comes from an existing cell.',
      ],
      key: 'Hooke named the cell; Leeuwenhoek saw it alive; Schleiden + Schwann made the theory; Virchow added “cells from cells”.',
    },
    {
      title: 'Prokaryotic vs eukaryotic',
      body: 'The single most asked comparison.',
      list: [
        'Prokaryote: no true nucleus, no membrane-bound organelles; DNA is a naked loop (nucleoid). Bacteria, cyanobacteria, mycoplasma.',
        'Eukaryote: true nucleus + membrane-bound organelles. Plants, animals, fungi, protists.',
        'Prokaryotes have 70S ribosomes; eukaryotes 80S (mitochondria/chloroplast have 70S — evidence of endosymbiosis).',
        'Cell size: prokaryotes 1–10 µm, eukaryotes 10–100 µm.',
      ],
    },
    {
      title: 'Plant vs animal cell',
      body: 'Three things plant cells have that animal cells do not, and one thing animals have.',
      list: [
        'Plant only: cell wall (cellulose), chloroplast, large central vacuole.',
        'Animal only: centriole/centrosome (spindle formation).',
        'Both: nucleus, mitochondria, ER, Golgi, ribosomes, lysosomes, plasma membrane.',
        'Fungal wall = chitin; bacterial wall = peptidoglycan.',
      ],
      key: 'Plant = wall + chloroplast + big vacuole. Animal = centriole.',
    },
    {
      title: 'The organelle table (learn the verbs)',
      body: 'Match each organelle with its job — that is exactly how the question will be phrased.',
      list: [
        'Nucleus — control centre; holds chromatin (DNA + histone) and the nucleolus (makes ribosomes).',
        'Mitochondria — powerhouse; aerobic respiration → ATP; has its own DNA; inner folds called cristae.',
        'Chloroplast — photosynthesis; chlorophyll in thylakoids (stacks = grana) inside stroma; own DNA.',
        'Ribosome — protein factory; free in cytoplasm or on rough ER.',
        'Rough ER — protein folding and transport; smooth ER — lipid and steroid synthesis.',
        'Golgi apparatus — packaging and dispatch (the cell’s post office).',
        'Lysosome — hydrolytic enzymes; “suicidal bag”; digests waste.',
        'Vacuole — storage and turgidity in plants.',
        'Plasma membrane — selectively permeable; fluid mosaic model (Singer & Nicolson, 1972).',
      ],
    },
    {
      title: 'Movement in and out of cells',
      body: 'Diffusion is passive; osmosis is diffusion of WATER; active transport spends ATP.',
      list: [
        'Diffusion: high → low concentration (perfume spreading).',
        'Osmosis: water moves through a semi-permeable membrane from dilute to concentrated solution.',
        'Plasmolysis: a plant cell loses water and the protoplast shrinks away from the wall.',
        'Endocytosis (engulf) and exocytosis (expel) move big molecules using vesicles.',
        'Root hair absorbs water by osmosis; minerals by active transport.',
      ],
      key: 'Osmosis = water only, across a semi-permeable membrane, down its own concentration gradient.',
    },
    {
      title: 'Cell division in one line each',
      body: 'Mitosis for the body, meiosis for the gametes.',
      list: [
        'Mitosis: 1 cell → 2 identical diploid cells; growth and repair; phases P-M-A-T.',
        'Meiosis: 1 cell → 4 non-identical haploid cells; gametes; crossing over in prophase I.',
        'Interphase is the preparation stage (DNA replication) — not strictly part of mitosis.',
        'Cancer = uncontrolled mitosis.',
      ],
    },
  ],
  examples: [
    {
      q: 'A cell has a cellulose wall, a large vacuole and no centriole. Is it plant or animal?',
      steps: ['Cellulose wall → plant.', 'Large central vacuole → plant.', 'No centriole → plant (centrioles are animal/fungal).', 'All three point the same way.'],
      answer: 'Plant cell',
    },
    {
      q: 'Which organelle would be unusually abundant in (a) a muscle cell, (b) a leaf cell, (c) a pancreas cell making enzymes?',
      steps: ['Muscle needs energy → mitochondria.', 'Leaf makes food from light → chloroplasts.', 'Pancreas exports proteins → rough ER and Golgi (with many ribosomes).'],
      answer: '(a) mitochondria (b) chloroplast (c) rough ER / Golgi',
    },
  ],
  questions: [
    Q('ce-01', 'cell', 'Who discovered the cell in 1665 while examining cork?', ['Robert Hooke', 'Anton van Leeuwenhoek', 'Robert Brown', 'Rudolf Virchow'], 'Robert Hooke', 'Hooke saw tiny boxes in cork and named them cells (Latin cellula = little room).', { difficulty: 1 }),
    Q('ce-02', 'cell', 'The cell theory was proposed by…', ['Schleiden and Schwann', 'Hooke and Leeuwenhoek', 'Watson and Crick', 'Virchow and Pasteur'], 'Schleiden and Schwann', 'Matthias Schleiden (plants) and Theodor Schwann (animals), 1838–39. Virchow later said cells arise from cells.', { difficulty: 1 }),
    Q('ce-03', 'cell', '“Omnis cellula e cellula” was given by…', ['Rudolf Virchow', 'Robert Hooke', 'Robert Brown', 'Carl Linnaeus'], 'Rudolf Virchow', 'Latin for “every cell from a cell”, 1855.'),
    Q('ce-04', 'cell', 'Which organelle is called the powerhouse of the cell?', ['Mitochondrion', 'Nucleus', 'Ribosome', 'Golgi body'], 'Mitochondrion', 'Mitochondria carry out aerobic respiration and release ATP.', { difficulty: 1 }),
    Q('ce-05', 'cell', 'Which organelles are called the “suicidal bags” of the cell?', ['Lysosomes', 'Ribosomes', 'Plastids', 'Vacuoles'], 'Lysosomes', 'Lysosomes contain hydrolytic enzymes; if released they digest the cell itself.'),
    Q('ce-06', 'cell', 'Protein synthesis takes place at the…', ['Ribosome', 'Golgi apparatus', 'Lysosome', 'Nucleolus'], 'Ribosome', 'Ribosomes are the protein factories, free or attached to rough ER.'),
    Q('ce-07', 'cell', 'The packaging and dispatch centre of the cell is the…', ['Golgi apparatus', 'Rough ER', 'Nucleus', 'Mitochondrion'], 'Golgi apparatus', 'The Golgi modifies, packs and ships proteins in vesicles.'),
    Q('ce-08', 'cell', 'Which of these is present in an animal cell but NOT in a plant cell?', ['Centriole', 'Mitochondrion', 'Ribosome', 'Plasma membrane'], 'Centriole', 'Centrioles organise the spindle in animal cells. Plants have cell walls, chloroplasts and a big vacuole instead.'),
    Q('ce-09', 'cell', 'The plant cell wall is mainly made of…', ['Cellulose', 'Chitin', 'Peptidoglycan', 'Protein'], 'Cellulose', 'Plants: cellulose. Fungi: chitin. Bacteria: peptidoglycan.'),
    Q('ce-10', 'cell', 'Which structure is absent in a prokaryotic cell?', ['Membrane-bound nucleus', 'Ribosome', 'Plasma membrane', 'Cytoplasm'], 'Membrane-bound nucleus', 'Prokaryotes have a nucleoid (naked DNA loop) instead of a membrane-bound nucleus.'),
    Q('ce-11', 'cell', 'Chlorophyll is present in which part of the chloroplast?', ['Thylakoid membranes', 'Stroma', 'Outer membrane', 'Cristae'], 'Thylakoid membranes', 'Thylakoids stack into grana and hold chlorophyll; the stroma is the fluid around them.'),
    Q('ce-12', 'cell', 'The fluid mosaic model of the plasma membrane was proposed by…', ['Singer and Nicolson', 'Schleiden and Schwann', 'Watson and Crick', 'Palade and Porter'], 'Singer and Nicolson', '1972 — proteins float in a fluid lipid bilayer like tiles in a mosaic.'),
    Q('ce-13', 'cell', 'Osmosis is the movement of…', ['water through a semi-permeable membrane', 'any liquid from high to low concentration', 'salt into a cell against the gradient', 'food particles into the cell'], 'water through a semi-permeable membrane', 'Osmosis is specifically water moving through a semi-permeable membrane from dilute to concentrated solution.'),
    Q('ce-14', 'cell', 'If a plant cell is placed in a strong salt solution, it will show…', ['plasmolysis', 'turgidity', 'bursting', 'no change'], 'plasmolysis', 'Water leaves the cell by osmosis, the protoplast shrinks away from the wall → plasmolysis.'),
    Q('ce-15', 'cell', 'Mitosis produces…', ['2 identical diploid cells', '4 different haploid cells', '4 identical haploid cells', '2 different diploid cells'], '2 identical diploid cells', 'Mitosis = growth and repair; meiosis = 4 non-identical haploid gametes.'),
    Q('ce-16', 'cell', 'Which organelle contains its own DNA and 70S ribosomes?', ['Mitochondrion', 'Lysosome', 'Golgi body', 'Smooth ER'], 'Mitochondrion', 'Mitochondria and chloroplasts have their own DNA — evidence for endosymbiotic theory.'),
    Q('ce-17', 'cell', 'The largest cell in the human body is the…', ['ovum (egg cell)', 'neuron', 'red blood cell', 'muscle cell'], 'ovum (egg cell)', 'The ovum is about 0.1 mm — visible to the naked eye. The neuron is the LONGEST cell.'),
    Q('ce-18', 'cell', 'Who discovered the nucleus?', ['Robert Brown', 'Robert Hooke', 'Virchow', 'Leeuwenhoek'], 'Robert Brown', 'Robert Brown discovered the nucleus in 1831 while studying orchid cells.', { difficulty: 3 }),
    Q('ce-19', 'cell', 'Which of these is NOT part of the cell theory?', ['Cells can arise spontaneously from non-living matter', 'All organisms are made of cells', 'The cell is the basic unit of life', 'All cells arise from pre-existing cells'], 'Cells can arise spontaneously from non-living matter', 'Abiogenesis was disproved; Virchow added “cells from cells”.'),
    Q('ce-20', 'cell', 'Viruses are not considered cells because they…', ['cannot reproduce without a host', 'have no DNA', 'are too big', 'have a cell wall'], 'cannot reproduce without a host', 'Viruses are acellular — no cytoplasm or organelles, and they replicate only inside a living host.', { difficulty: 3 }),
    Q('ce-21', 'cell', 'A cell that secretes large amounts of digestive enzymes would have many…', ['rough ER and Golgi bodies', 'chloroplasts', 'lysosomes only', 'centrioles'], 'rough ER and Golgi bodies', 'Export proteins are folded in rough ER and packed by the Golgi.'),
    Q('ce-22', 'cell', 'Ribosomes of a eukaryotic cell are of type…', ['80S (70S in organelles)', '70S only', '60S only', '40S only'], '80S (70S in organelles)', 'Eukaryotic cytoplasmic ribosomes are 80S; mitochondrial and chloroplast ribosomes are 70S, like bacteria.', { difficulty: 3 }),
  ],
  cheat: [
    {
      title: 'People',
      lines: ['Hooke 1665 → named cell', 'Leeuwenhoek → living cells', 'Schleiden + Schwann → cell theory', 'Virchow → cells from cells', 'Robert Brown → nucleus'],
    },
    {
      title: 'Organelle jobs',
      lines: ['Nucleus → control', 'Mitochondria → ATP', 'Chloroplast → photosynthesis', 'Ribosome → protein', 'Golgi → packaging', 'Lysosome → digestion', 'Vacuole → turgidity', 'ER → transport/lipids'],
    },
    {
      title: 'Plant vs animal',
      lines: ['Plant: wall (cellulose) + chloroplast + large vacuole', 'Animal: centriole', 'Fungal wall: chitin', 'Bacterial wall: peptidoglycan'],
    },
    {
      title: 'Transport & division',
      lines: ['Osmosis = water, semi-permeable membrane', 'Plasmolysis = water loss', 'Mitosis → 2 identical diploid', 'Meiosis → 4 haploid'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   2 · FIBRE TO FABRIC
   ───────────────────────────────────────────────────────────── */
const fibre: Topic = {
  id: 'fibre',
  subject: 'science',
  name: 'Fibre to Fabric',
  emoji: '🧵',
  tagline: 'Cotton, jute, wool, silk — and the words for each process.',
  minutes: 22,
  lab: 'fibre',
  examNote: 'The marks are in the process words: ginning, retting, shearing, reeling, spinning, weaving.',
  concept: [
    {
      title: 'The classification tree',
      body: 'Every fibre question starts here.',
      list: [
        'Natural fibres → plant (cotton, jute, flax, hemp, coir, ramie) and animal (wool, silk).',
        'Synthetic fibres → nylon, polyester, acrylic, spandex (from petrochemicals).',
        'Semi-synthetic (regenerated) → rayon (from wood pulp), modal, lyocell.',
        'Yarn is spun from fibres; fabric is woven or knitted from yarn.',
      ],
      key: 'Cotton & jute = plant. Wool & silk = animal. Nylon & polyester = synthetic. Rayon = semi-synthetic.',
    },
    {
      title: 'Cotton: field to fabric',
      body: 'The cotton boll is the fruit of the plant, and its fluff is the fibre.',
      list: [
        'Cotton grows best in black soil; sowing April–May, harvest after 5–6 months.',
        'Picking → ginning (seeds separated from lint) → baling.',
        'Spinning: fibres drawn and twisted into yarn. Weaving/knitting makes fabric.',
        'Cotton is cellulose, absorbent, comfortable, but wrinkles and burns easily.',
        'India is a leading cotton producer; Bt cotton resists bollworm.',
      ],
    },
    {
      title: 'Jute: the golden fibre',
      body: 'Jute comes from the STEM of the plant, and retting is the key word.',
      list: [
        'Retting: stems soaked in water so microbes loosen the fibres (2–3 weeks).',
        'Then stripping, washing, drying, sorting, spinning.',
        'West Bengal is India’s jute hub (Hooghly basin).',
        'Jute is biodegradable and used for gunny bags, rope, matting — a “golden fibre” because of its colour and value.',
      ],
      key: 'Jute = stem fibre + retting. Cotton = seed hair + ginning.',
    },
    {
      title: 'Wool: from fleece to yarn',
      body: 'Wool is animal hair, and the animals matter.',
      list: [
        'Sources: sheep, goat (pashmina/mohair), yak, camel, llama, alpaca, angora rabbit.',
        'Steps: shearing (cutting fleece) → scouring (washing) → sorting → dyeing → spinning.',
        'Pashmina comes from the Changthangi goat of Ladakh; Shahtoosh (banned) came from the Tibetan antelope.',
        'Wool is warm because its crimped fibres trap air; it is a protein (keratin).',
      ],
    },
    {
      title: 'Silk: the cocoon',
      body: 'Silk is the only natural fibre that comes as a long continuous filament.',
      list: [
        'Producer insect: mulberry silkworm, Bombyx mori (a moth larva).',
        'Rearing silkworms = sericulture. The larva spins a cocoon of silk protein.',
        'Reeling: unwinding the filament from boiled cocoons.',
        'India is the world’s second-largest silk producer after China; Muga silk is Assam’s golden silk; Tasar and Eri are also Indian varieties.',
      ],
      key: 'Sericulture = silkworm rearing. Reeling = unwinding the cocoon. Muga = Assam.',
    },
    {
      title: 'Natural vs synthetic: the comparison they ask for',
      body: 'Always compare on strength, absorbency, cost, and biodegradability.',
      list: [
        'Synthetic: strong, elastic, quick-drying, wrinkle-resistant, cheap — but non-biodegradable and melt on heating.',
        'Natural: breathable and biodegradable — but weaker when wet, and wrinkle-prone.',
        'Synthetic clothes shed microplastics in the wash; they come from petroleum.',
        'First synthetic fibre = nylon (1935, Wallace Carothers, DuPont).',
      ],
    },
  ],
  examples: [
    {
      q: 'Name the process that separates cotton seeds from cotton fibre.',
      steps: ['The raw cotton boll contains seeds and lint.', 'The machine that pulls them apart is the cotton gin.', 'The process is called ginning.'],
      answer: 'Ginning',
    },
    {
      q: 'A fibre is strong, quick-drying, wrinkle-resistant, and melts when ironed hot. Natural or synthetic?',
      steps: ['Quick-drying + wrinkle-resistant + thermoplastic → synthetic.', 'Natural fibres scorch rather than melt, and absorb water.', 'Example: polyester or nylon.'],
      answer: 'Synthetic (e.g. polyester/nylon)',
    },
  ],
  questions: [
    Q('fb-01', 'fibre', 'Which fibre is known as the “golden fibre”?', ['Jute', 'Cotton', 'Silk', 'Wool'], 'Jute', 'Jute’s golden-brown colour and economic value earned it the name.', { difficulty: 1 }),
    Q('fb-02', 'fibre', 'Ginning is the process of…', ['separating cotton seeds from lint', 'soaking jute stems', 'unwinding silk cocoons', 'washing wool'], 'separating cotton seeds from lint', 'Cotton ginning uses a gin to separate seeds from the cotton fibres.', { difficulty: 1 }),
    Q('fb-03', 'fibre', 'Retting is associated with which fibre?', ['Jute', 'Cotton', 'Silk', 'Wool'], 'Jute', 'Jute stems are soaked so bacteria loosen the fibres from the woody stem.', { difficulty: 1 }),
    Q('fb-04', 'fibre', 'Silk is obtained from…', ['the cocoon of a silkworm', 'the stem of a plant', 'sheep fleece', 'cotton bolls'], 'the cocoon of a silkworm', 'Bombyx mori larvae spin cocoons; the filament is unwound by reeling.'),
    Q('fb-05', 'fibre', 'Rearing silkworms is called…', ['sericulture', 'apiculture', 'horticulture', 'pisciculture'], 'sericulture', 'Sericulture = silk; apiculture = bees; pisciculture = fish.'),
    Q('fb-06', 'fibre', 'Which of these is a plant fibre?', ['Jute', 'Silk', 'Wool', 'Pashmina'], 'Jute', 'Jute comes from a plant stem; silk, wool and pashmina are animal fibres.', { difficulty: 1 }),
    Q('fb-07', 'fibre', 'Which fibre is semi-synthetic?', ['Rayon', 'Nylon', 'Cotton', 'Wool'], 'Rayon', 'Rayon is regenerated cellulose from wood pulp — semi-synthetic. Nylon is fully synthetic.'),
    Q('fb-08', 'fibre', 'Pashmina wool comes from which animal?', ['Changthangi goat', 'Angora rabbit', 'Llama', 'Yak'], 'Changthangi goat', 'The Changthangi (pashmina) goat of Ladakh gives the finest cashmere.'),
    Q('fb-09', 'fibre', 'The process of cutting a sheep’s fleece is called…', ['shearing', 'scouring', 'sorting', 'reeling'], 'shearing', 'Shearing → scouring (washing) → sorting → dyeing → spinning.'),
    Q('fb-10', 'fibre', 'Which is NOT a natural fibre?', ['Polyester', 'Cotton', 'Wool', 'Silk'], 'Polyester', 'Polyester is made from petrochemicals; the rest are natural.', { difficulty: 1 }),
    Q('fb-11', 'fibre', 'What is the scientific name of the mulberry silkworm?', ['Bombyx mori', 'Apis mellifera', 'Laccifer lacca', 'Helicoverpa armigera'], 'Bombyx mori', 'Bombyx mori is the mulberry silkworm; Apis mellifera is the honeybee.'),
    Q('fb-12', 'fibre', 'Which state is India’s leading producer of jute?', ['West Bengal', 'Punjab', 'Kerala', 'Rajasthan'], 'West Bengal', 'The Hooghly basin in West Bengal is the jute belt.'),
    Q('fb-13', 'fibre', 'Muga silk, known for its golden colour, is from…', ['Assam', 'Tamil Nadu', 'Gujarat', 'Kashmir'], 'Assam', 'Assam has a GI tag for Muga silk; Eri and Tasar are also produced there.'),
    Q('fb-14', 'fibre', 'The first fully synthetic fibre was…', ['Nylon', 'Rayon', 'Polyester', 'Acrylic'], 'Nylon', 'Nylon was created by Wallace Carothers at DuPont in 1935.'),
    Q('fb-15', 'fibre', 'Unwinding silk filament from cocoons is called…', ['reeling', 'spinning', 'weaving', 'knitting'], 'reeling', 'Reeling gives the long continuous silk filament; spinning makes yarn from staple fibres.'),
    Q('fb-16', 'fibre', 'Which property makes cotton comfortable in summer?', ['It absorbs sweat', 'It is waterproof', 'It melts easily', 'It is the strongest fibre'], 'It absorbs sweat', 'Cotton is cellulose and highly absorbent, so it wicks and holds sweat, aiding cooling.'),
    Q('fb-17', 'fibre', 'Synthetic fibres are a problem for the environment mainly because they…', ['are non-biodegradable and shed microplastics', 'need no washing', 'are too weak', 'come from plants'], 'are non-biodegradable and shed microplastics', 'Petroleum-based fibres persist for centuries and shed microplastics in every wash.'),
    Q('fb-18', 'fibre', 'Wool is chemically a…', ['protein (keratin)', 'carbohydrate (cellulose)', 'fat', 'mineral'], 'protein (keratin)', 'Wool is keratin, like hair and nails. Cotton is cellulose, a carbohydrate.', { difficulty: 3 }),
  ],
  cheat: [
    {
      title: 'Plant fibres',
      lines: ['Cotton → seed hair → ginning', 'Jute → stem → retting', 'Coir → coconut husk', 'Flax → linen'],
    },
    {
      title: 'Animal fibres',
      lines: ['Wool → fleece → shearing → scouring', 'Silk → cocoon → reeling', 'Pashmina → Changthangi goat', 'Muga → Assam'],
    },
    {
      title: 'Synthetic',
      lines: ['Nylon — first synthetic (1935)', 'Polyester — PET, quick dry', 'Rayon — semi-synthetic from wood pulp', 'Acrylic — “artificial wool”'],
    },
    {
      title: 'Process words',
      lines: ['ginning (cotton)', 'retting (jute)', 'shearing (wool)', 'reeling (silk)', 'sericulture (silkworm)', 'spinning → yarn → weaving → fabric'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   3 · LAWS OF MOTION
   ───────────────────────────────────────────────────────────── */
const motion: Topic = {
  id: 'motion',
  subject: 'science',
  name: 'Laws of Motion',
  emoji: '🚀',
  tagline: 'Inertia, F = ma, and action–reaction.',
  minutes: 30,
  lab: 'motion',
  examNote: 'One conceptual question, one numerical. Write the formula first — it earns partial credit and calms you.',
  concept: [
    {
      title: 'Newton’s first law — inertia',
      body: 'A body stays at rest or in uniform motion unless a net external force acts on it. This is also called the law of inertia (Galileo’s idea, formalised by Newton).',
      list: [
        'Inertia depends only on mass — heavier = harder to move or stop.',
        'Inertia of rest: a coin stays on a card when you flick the card.',
        'Inertia of motion: you lurch forward when a bus brakes.',
        'Inertia of direction: you are pushed outward when a vehicle turns.',
      ],
      key: 'No net force → no change in velocity. Rest and uniform motion are physically identical states.',
    },
    {
      title: 'Newton’s second law — the formula',
      body: 'Force is the rate of change of momentum. For constant mass this becomes F = ma.',
      list: [
        'F = ma, where F is in newtons, m in kg, a in m/s².',
        'Momentum p = mv (kg·m/s). F = Δp/Δt.',
        '1 newton = 1 kg × 1 m/s².',
        'If force is zero, acceleration is zero — but velocity need not be zero.',
        'Weight = mg (g ≈ 9.8 m/s²; ~10 for quick sums). Mass never changes; weight does.',
      ],
      key: 'F = ma is a vector equation: force and acceleration point the same way.',
    },
    {
      title: 'Newton’s third law — action–reaction',
      body: 'Every action has an equal and opposite reaction, acting on a DIFFERENT body.',
      list: [
        'Rocket: hot gases pushed down, rocket pushed up.',
        'Walking: you push the Earth back, it pushes you forward.',
        'Gun recoil: bullet forward, gun backward.',
        'They never cancel: the two forces act on different objects. This is the #1 trap.',
      ],
      key: 'Equal, opposite, same line, different bodies, same type of force. Never “cancel”.',
    },
    {
      title: 'Friction & everyday forces',
      body: 'Friction is a contact force that opposes relative motion.',
      list: [
        'Static friction > sliding friction > rolling friction (that is why wheels beat dragging).',
        'Friction produces heat and wear; it can be reduced by lubrication, polishing, ball bearings.',
        'It can also be useful: walking, writing, braking.',
        'Normal force is perpendicular to the surface; tension is along a string.',
      ],
    },
    {
      title: 'Numerical toolkit',
      body: 'Five formulas cover every numerical in a school quiz.',
      list: [
        'F = ma → force from mass and acceleration.',
        'p = mv → momentum.',
        'Impulse = F × t = change in momentum (useful for catching/stopping).',
        'W = mg → weight (m in kg, g ≈ 9.8).',
        'v = u + at, s = ut + ½at² — if the question gives a time and asks distance.',
      ],
      key: 'Check units before you calculate: kg × m/s² = N. If the answer is huge, you probably used g = 10 instead of 9.8, or forgot to convert grams to kg.',
    },
    {
      title: 'Two circular-motion extras',
      body: 'Often the “bonus” law question.',
      list: [
        'Circular motion needs a centripetal force towards the centre (string tension, gravity for planets).',
        'Momentum is conserved when no external force acts: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.',
      ],
    },
  ],
  examples: [
    {
      q: 'A 10 kg object accelerates at 2 m/s². What force acts on it?',
      steps: ['Write the formula: F = ma.', 'F = 10 kg × 2 m/s².', 'F = 20 N.'],
      answer: '20 N',
    },
    {
      q: 'A 1,000 kg car speeds up from rest to 20 m/s in 10 s. Find the force.',
      steps: ['Acceleration a = (v − u)/t = (20 − 0)/10 = 2 m/s².', 'F = ma = 1000 × 2.', 'F = 2000 N.'],
      answer: '2000 N',
    },
    {
      q: 'A cricket fielder moves his hands back while catching a ball. Why?',
      steps: ['Impulse = F × t = change in momentum. The momentum change is fixed by the ball.', 'Moving hands back increases the time t.', 'For the same impulse, a larger t means a smaller force F → less pain.'],
      answer: 'To increase the time of impact and so reduce the force.',
    },
  ],
  questions: [
    Q('mo-01', 'motion', 'Newton’s first law is also known as the law of…', ['inertia', 'momentum', 'gravitation', 'action-reaction'], 'inertia', 'A body continues in its state unless a net external force acts — this is inertia.', { difficulty: 1 }),
    Q('mo-02', 'motion', 'The SI unit of force is the newton. One newton equals…', ['1 kg·m/s²', '1 kg·m/s', '1 kg·m²/s²', '1 kg/m·s²'], '1 kg·m/s²', 'From F = ma: kg × m/s² = N.', { difficulty: 1 }),
    Q('mo-03', 'motion', 'A 10 kg body accelerates at 2 m/s². The force is…', ['5 N', '12 N', '20 N', '80 N'], '20 N', 'F = ma = 10 × 2 = 20 N.'),
    Q('mo-04', 'motion', 'The momentum of a 2 kg ball moving at 5 m/s is…', ['2.5 kg·m/s', '7 kg·m/s', '10 kg·m/s', '20 kg·m/s'], '10 kg·m/s', 'p = mv = 2 × 5 = 10 kg·m/s.'),
    Q('mo-05', 'motion', 'A passenger lurches forward when a bus brakes suddenly. This is…', ['inertia of motion', 'inertia of rest', 'inertia of direction', 'action-reaction'], 'inertia of motion', 'The body keeps moving forward while the bus slows.', { difficulty: 1 }),
    Q('mo-06', 'motion', 'Which statement about action–reaction is WRONG?', ['They act on the same body', 'They are equal in magnitude', 'They are opposite in direction', 'They act on different bodies'], 'They act on the same body', 'Action and reaction act on different bodies, so they never cancel each other.'),
    Q('mo-07', 'motion', 'Seat belts reduce injury because they…', ['increase the time of impact, reducing force', 'reduce momentum to zero instantly', 'cancel inertia', 'increase the acceleration'], 'increase the time of impact, reducing force', 'Impulse = F·t is fixed; a longer stopping time means a smaller force on the body.'),
    Q('mo-08', 'motion', 'A rocket moves forward because…', ['gases are pushed backward and the rocket is pushed forward', 'gravity is absent in space', 'air pushes the rocket', 'the rocket has no mass'], 'gases are pushed backward and the rocket is pushed forward', 'Conservation of momentum (Newton’s third law) — no air is needed.'),
    Q('mo-09', 'motion', 'A car of mass 1,000 kg goes from rest to 20 m/s in 10 s. The force is…', ['200 N', '1,000 N', '2,000 N', '20,000 N'], '2,000 N', 'a = 20/10 = 2 m/s²; F = 1000 × 2 = 2000 N.'),
    Q('mo-10', 'motion', 'Which has the greatest inertia?', ['A 1 kg stone', 'A 100 g ball', 'A 10 g coin', 'A 1 g feather'], 'A 1 kg stone', 'Inertia depends on mass, so the heaviest object has the most.', { difficulty: 1 }),
    Q('mo-11', 'motion', 'The weight of a 60 kg person on Earth (g = 9.8 m/s²) is about…', ['60 N', '6 N', '588 N', '6000 N'], '588 N', 'W = mg = 60 × 9.8 = 588 N.'),
    Q('mo-12', 'motion', 'On the Moon, a 60 kg astronaut has…', ['mass 60 kg, weight about 1/6 as much', 'mass 10 kg, same weight', 'mass and weight both 1/6', 'no mass'], 'mass 60 kg, weight about 1/6 as much', 'Mass is the amount of matter (unchanged); weight depends on gravity.'),
    Q('mo-13', 'motion', 'Which friction is smallest for the same surfaces?', ['Rolling friction', 'Sliding friction', 'Static friction', 'They are equal'], 'Rolling friction', 'Static > sliding > rolling — that is why wheels and ball bearings work.'),
    Q('mo-14', 'motion', 'A force of 20 N acts for 0.5 s. The impulse is…', ['10 N·s', '40 N·s', '0.5 N·s', '20.5 N·s'], '10 N·s', 'Impulse = F × t = 20 × 0.5 = 10 N·s.'),
    Q('mo-15', 'motion', 'A gun recoils when fired because of…', ['conservation of momentum', 'friction', 'gravity', 'air resistance'], 'conservation of momentum', 'The bullet’s forward momentum is balanced by the gun’s backward momentum.'),
    Q('mo-16', 'motion', 'If the net force on a moving object is zero, the object…', ['keeps moving uniformly', 'must stop', 'accelerates', 'reverses'], 'keeps moving uniformly', 'Zero net force means zero acceleration — the velocity stays constant, including non-zero velocity.', { difficulty: 3 }),
    Q('mo-17', 'motion', 'A 1,500 kg car moving at 20 m/s is stopped in 5 s. The average braking force is…', ['300 N', '1,500 N', '6,000 N', '30,000 N'], '6,000 N', 'a = (0 − 20)/5 = −4 m/s²; F = 1500 × 4 = 6000 N opposite to motion.'),
    Q('mo-18', 'motion', 'Newton’s second law in terms of momentum is…', ['F = Δp/Δt', 'F = p × t', 'F = mv²', 'F = m/g'], 'F = Δp/Δt', 'Force is the rate of change of momentum; for constant mass this is F = ma.', { difficulty: 3 }),
    Q('mo-19', 'motion', 'Which force keeps a satellite in circular orbit?', ['Gravitational force towards Earth', 'Centrifugal force away from Earth', 'Air pressure', 'Magnetic force'], 'Gravitational force towards Earth', 'Gravity provides the centripetal force. “Centrifugal force” is only a pseudo-force in a rotating frame.'),
    Q('mo-20', 'motion', 'A book rests on a table. The reaction to the book’s weight is…', ['the book pulling the Earth up', 'the table pushing the book up', 'gravity on the table', 'friction on the book'], 'the book pulling the Earth up', 'The reaction pair of “Earth pulls book” is “book pulls Earth”. The table’s push is a different pair (normal force).', { difficulty: 3, tag: 'trap' }),
  ],
  cheat: [
    {
      title: 'The three laws',
      lines: ['1 · inertia: no net force → no change', '2 · F = ma = Δp/Δt', '3 · action = −reaction, different bodies'],
    },
    {
      title: 'Formulas',
      lines: ['F = ma', 'p = mv (kg·m/s)', 'Impulse = Ft = Δp', 'W = mg (g ≈ 9.8)', 'v = u + at'],
    },
    {
      title: 'Inertia examples',
      lines: ['bus brakes → lurch forward', 'card flick → coin drops in cup', 'vehicle turns → thrown outward'],
    },
    {
      title: 'Friction order',
      lines: ['static > sliding > rolling', 'useful: walking, writing, braking', 'reduce: oil, bearings, polish'],
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   4 · NEWS · DTE · COMPETITIVE SUCCESS
   ───────────────────────────────────────────────────────────── */
const news: Topic = {
  id: 'news',
  subject: 'science',
  name: 'News, DTE & Current Science',
  emoji: '📰',
  tagline: 'The 2026 file: what just happened, in one line each.',
  minutes: 30,
  lab: 'news',
  examNote: 'The quiz is in October 2026 — “latest” means the last 3 months. Prioritise Nobel 2026, ISRO, and DTE’s October stories.',
  concept: [
    {
      title: 'Nobel 2026 — the full set',
      body: 'Announced 5–12 October 2026. This is the freshest possible quiz material.',
      list: [
        'Medicine: Karl Deisseroth, Peter Hegemann, Georg Nagel — light-gated ion channels and optogenetics.',
        'Physics: Francis Halzen — IceCube Neutrino Observatory, high-energy astrophysical neutrinos.',
        'Chemistry: Henri B. Kagan and Kenso Soai — non-linear effects and autocatalysis in asymmetric synthesis (molecular “handedness”).',
        'Literature: Anne Carson. Peace: Navanethem “Navi” Pillay (South Africa).',
        'Economics: Robert E. Hall and Michael Woodford — microeconomic foundations of macroeconomic stabilisation.',
      ],
      key: 'If you remember only one: Halzen = neutrinos + IceCube at the South Pole.',
    },
    {
      title: 'ISRO in 2026',
      body: 'A quiet year, but three things are quiz-worthy.',
      list: [
        'Aditya-L1: IIA Bengaluru made Doppler velocity images of the solar corona from the VELC payload (Oct 2026) — helps track the direction of coronal mass ejections.',
        'EOS-05: launched 4 September 2026 on GSLV-F17 — India’s first imaging satellite from geosynchronous orbit.',
        'Gaganyaan G1: first uncrewed test flight targeted for 2026, carrying the humanoid Vyommitra; crewed flight after 2027.',
        'NISAR (30 July 2025, GSLV-F16): NASA–ISRO dual-band (L + S) radar satellite, world’s first dual-frequency radar imaging satellite.',
        'Chandrayaan-3 (23 Aug 2023) remains the only mission to soft-land near the Moon’s south pole; ChaSTE measured the first in-situ temperature profile there.',
      ],
    },
    {
      title: 'Down To Earth, October 2026',
      body: 'The magazine’s stories are a favourite source because they connect science, policy and India.',
      list: [
        'Cyclone Arnab — very severe cyclonic storm nearing Andhra Pradesh; Odisha evacuations; another system possibly following in the Bay of Bengal.',
        'Cover story “Intimate takeover” — Indian rainfall is increasingly driven by long-lasting low-pressure systems rather than the monsoon winds, giving heavier bursts.',
        'Cover story “Power bank for transition 2.0” — storage (batteries, pumped hydro) is now the bottleneck for India’s renewable transition.',
        'GEC III — ₹1.86 trillion transmission scheme to move renewable power.',
        'Nashik: chromium at 1,000× the drinking-water limit; 17 electroplating units shut; 109 residents with skin ailments.',
        'Three new centipede species in the Western Ghats — Rhysida quadrispinosa, R. coorgensis, R. neyyarensis; India’s Rhysida count now 23.',
        'State of India’s Environment 2026 (CSE–DTE): 7 of 9 planetary boundaries breached; extreme weather on 99% of days in 2025; 97,000 ha of forest diverted in 5 years.',
        'Emissions Gap Report 2026 — 1.5°C is effectively out of reach; adapt now.',
      ],
    },
    {
      title: 'Biodiversity numbers worth memorising',
      body: 'Numbers are the easiest quiz points.',
      list: [
        '709 animal species added to India’s list in 2025 (ZSI): 483 new to science + 226 first records; Kerala led with 98.',
        '149 new deep-sea species found around Indian Ocean seamounts near Christmas and Cocos islands.',
        'Gangaichthys indonepalicus — a new genus of blind subterranean eel from Bihar’s Gangetic plain.',
        'Vasuki indicus — a 47-million-year-old giant snake from Gujarat, among the largest ever.',
        'India has 3,682 tigers (2022) and 891 Asiatic lions (2025 census); the lion lives only in Gir.',
      ],
    },
    {
      title: 'Policy & programme names',
      body: 'Match the scheme to its purpose.',
      list: [
        'Mission LiFE — Lifestyle for Environment (2022).',
        'Mission Mausam — weather and climate research upgrade (2024).',
        'National Green Hydrogen Mission — green H₂ manufacturing.',
        'GEC III — green energy corridor transmission.',
        'ESTIC 2026 — Emerging Science, Technology and Innovation Conclave, inaugurated by PM Modi on 27 October 2026.',
        'COP31 — 2026 climate summit; COP30 was Belém, Brazil (2025).',
      ],
    },
  ],
  examples: [
    {
      q: 'Which 2026 Nobel was awarded for work on neutrinos, and where is the observatory?',
      steps: ['Physics 2026 → Francis Halzen.', 'Work: high-energy astrophysical neutrinos.', 'Detector: IceCube, a cubic kilometre of ice at the South Pole.'],
      answer: 'Francis Halzen — IceCube, South Pole',
    },
    {
      q: 'What is special about NISAR, and when was it launched?',
      steps: ['It is a NASA–ISRO joint mission.', 'It carries L-band (NASA) and S-band (ISRO) radars → first dual-frequency radar imaging satellite.', 'Launched 30 July 2025 on GSLV-F16 from Sriharikota.'],
      answer: 'NASA–ISRO dual-band radar satellite, launched 30 July 2025',
    },
  ],
  questions: [
    Q('nw-01', 'news', 'Who won the 2026 Nobel Prize in Physics?', ['Francis Halzen', 'Karl Deisseroth', 'Henri Kagan', 'Robert Hall'], 'Francis Halzen', 'For the IceCube Neutrino Observatory and high-energy astrophysical neutrinos.', { difficulty: 1, tag: 'nobel' }),
    Q('nw-02', 'news', 'The 2026 Nobel Prize in Medicine was awarded for…', ['optogenetics', 'mRNA vaccines', 'CRISPR gene editing', 'chirality'], 'optogenetics', 'Karl Deisseroth, Peter Hegemann and Georg Nagel — light-gated ion channels and optogenetics.', { difficulty: 1, tag: 'nobel' }),
    Q('nw-03', 'news', 'Where is the IceCube Neutrino Observatory?', ['South Pole', 'Atacama Desert', 'Hawaii', 'Ladakh'], 'South Pole', 'A cubic kilometre of Antarctic ice with thousands of light sensors.', { tag: 'nobel' }),
    Q('nw-04', 'news', 'The 2026 Chemistry Nobel honoured work on…', ['molecular handedness and asymmetric synthesis', 'lithium-ion batteries', 'quantum dots', 'click chemistry'], 'molecular handedness and asymmetric synthesis', 'Kagan and Soai explained how one mirror form of a molecule can come to dominate.', { tag: 'nobel' }),
    Q('nw-05', 'news', 'Which ISRO mission produced the first Doppler velocity images of the solar corona in October 2026?', ['Aditya-L1', 'Chandrayaan-3', 'NISAR', 'Gaganyaan'], 'Aditya-L1', 'The VELC payload on Aditya-L1, analysed by IIA Bengaluru, maps the corona’s motion to track CMEs.'),
    Q('nw-06', 'news', 'EOS-05, launched on 4 September 2026, is special because it is India’s first…', ['imaging satellite from geosynchronous orbit', 'Moon lander', 'solar observatory', 'reusable rocket'], 'imaging satellite from geosynchronous orbit', 'GSLV-F17 placed EOS-05 in a geosynchronous orbit, giving a persistent view of regions of interest.'),
    Q('nw-07', 'news', 'Which satellite is the first dual-frequency radar imaging satellite, built jointly by NASA and ISRO?', ['NISAR', 'Cartosat-3', 'RISAT-2B', 'Oceansat-3'], 'NISAR', 'NISAR carries NASA’s L-band and ISRO’s S-band radar; launched 30 July 2025 on GSLV-F16.'),
    Q('nw-08', 'news', 'Gaganyaan’s first uncrewed test flight is expected to carry which humanoid robot?', ['Vyommitra', 'Sophia', 'Mitra', 'R2-D2'], 'Vyommitra', 'Vyommitra, the half-humanoid, is slated to fly on the G1 uncrewed mission.'),
    Q('nw-09', 'news', 'Which cyclone was approaching the Andhra coast in late October 2026?', ['Cyclone Arnab', 'Cyclone Amphan', 'Cyclone Fani', 'Cyclone Biparjoy'], 'Cyclone Arnab', 'Arnab intensified into a very severe cyclonic storm; Odisha prepared mass evacuations.'),
    Q('nw-10', 'news', 'Down To Earth’s October 2026 cover story “Intimate takeover” is about…', ['rainfall driven by low-pressure systems', 'tiger relocation', 'solar panel waste', 'groundwater recharge'], 'rainfall driven by low-pressure systems', 'Indian rainfall is increasingly coming from longer-lasting low-pressure systems rather than monsoon winds.'),
    Q('nw-11', 'news', 'The CSE–DTE State of India’s Environment 2026 report said how many planetary boundaries are breached?', ['5 of 9', '6 of 9', '7 of 9', '9 of 9'], '7 of 9', 'Six were breached by 2024 data; ocean acidification became the seventh.', { difficulty: 3 }),
    Q('nw-12', 'news', 'Three new centipede species were recently described from the Western Ghats in the genus…', ['Rhysida', 'Scolopendra', 'Scutigera', 'Spirostreptus'], 'Rhysida', 'Rhysida quadrispinosa, R. coorgensis and R. neyyarensis take India’s Rhysida count to 23.'),
    Q('nw-13', 'news', 'How many animal species were added to India’s faunal list in 2025, a record?', ['283', '483', '709', '1,000'], '709', 'ZSI recorded 709 additions: 483 new to science and 226 first records for India. Kerala led with 98.'),
    Q('nw-14', 'news', 'Which new subterranean fish was discovered in Bihar’s Gangetic plain?', ['Gangaichthys indonepalicus', 'Danio rerio', 'Clarias batrachus', 'Channa striata'], 'Gangaichthys indonepalicus', 'A blind, colourless eel discovered after a TikTok video — the first subterranean fish from the Gangetic basin.', { difficulty: 3 }),
    Q('nw-15', 'news', 'The 2025 census put India’s Asiatic lion population at…', ['674', '891', '1,000', '3,682'], '891', 'The 16th lion census (May 2025) counted 891 lions, up from 674 in 2020 — all in Gir, Gujarat.'),
    Q('nw-16', 'news', 'Which Indian mission confirmed sulphur near the Moon’s south pole?', ['Chandrayaan-3', 'Chandrayaan-1', 'Mangalyaan', 'Aditya-L1'], 'Chandrayaan-3', 'The Pragyan rover’s LIBS instrument detected sulphur in 2023.'),
    Q('nw-17', 'news', 'Green Energy Corridor Phase III (GEC III) is mainly about…', ['transmitting renewable power', 'building nuclear plants', 'electric buses', 'solar manufacturing'], 'transmitting renewable power', '₹1.86 trillion for transmission and grid infrastructure to move renewable electricity.'),
    Q('nw-18', 'news', 'The 2026 Nobel Prize in Economics went to Hall and Woodford for work on…', ['macroeconomic stabilisation models', 'auction theory', 'poverty experiments', 'game theory'], 'macroeconomic stabilisation models', 'Their models help central banks and governments smooth boom–bust cycles.', { tag: 'nobel' }),
    Q('nw-19', 'news', 'Which Nobel laureate is associated with optogenetics?', ['Karl Deisseroth', 'Francis Halzen', 'Kenso Soai', 'Michael Woodford'], 'Karl Deisseroth', 'Deisseroth, Hegemann and Nagel won Medicine 2026 for optogenetics.', { difficulty: 1, tag: 'nobel' }),
    Q('nw-20', 'news', 'The 2026 State of India’s Environment report found extreme weather on what share of 2025’s days?', ['75%', '90%', '99%', '60%'], '99%', 'Extreme events killed 4,421 people and damaged 17.41 million hectares of crops in 2025.'),
    Q('nw-21', 'news', 'Which country hosted COP30 in 2025?', ['Brazil', 'UAE', 'Egypt', 'Azerbaijan'], 'Brazil', 'COP30 was in Belém, Brazil — the Amazon. COP31 is the 2026 summit.'),
    Q('nw-22', 'news', 'ESTIC 2026, inaugurated on 27 October 2026, stands for…', ['Emerging Science, Technology and Innovation Conclave', 'Energy Science and Technology Institute', 'Earth Science and Technology Council', 'Engineering Skill Training Centre'], 'Emerging Science, Technology and Innovation Conclave', 'PM Modi asked scientists for innovations that strengthen self-reliance within three years.'),
  ],
  cheat: [
    {
      title: 'Nobel 2026',
      lines: ['Medicine: Deisseroth + Hegemann + Nagel — optogenetics', 'Physics: Halzen — IceCube neutrinos', 'Chemistry: Kagan + Soai — chirality', 'Literature: Anne Carson', 'Peace: Navi Pillay', 'Economics: Hall + Woodford'],
    },
    {
      title: 'ISRO',
      lines: ['Aditya-L1 → VELC corona images (Oct 2026)', 'EOS-05 → GEO imaging (4 Sep 2026)', 'Gaganyaan G1 → 2026, Vyommitra', 'NISAR → dual-band radar (30 Jul 2025)'],
    },
    {
      title: 'DTE numbers',
      lines: ['Cyclone Arnab — Bay of Bengal', '7 of 9 planetary boundaries breached', 'extreme weather on 99% of 2025 days', '709 species added in 2025', '891 lions · 3,682 tigers'],
    },
    {
      title: 'Biodiversity',
      lines: ['149 deep-sea species, Indian Ocean seamounts', '3 new Rhysida centipedes, Western Ghats', 'Gangaichthys indonepalicus — Bihar eel', 'Vasuki indicus — 47-million-year-old snake'],
    },
  ],
}

export const SCIENCE_TOPICS: Topic[] = [cell, fibre, motion, news]
