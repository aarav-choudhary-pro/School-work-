window.SCIENCE_TOPICS = [

/* ============ CELL BIOLOGY ============ */
{
id:"cell", icon:"🦠", title:"Cell Biology",
desc:"Cell theory, organelles, plant vs animal, transport across membranes.",
learn: `
<h2>Discovery timeline (quizmasters LOVE these)</h2>
<table>
<tr><th>Year</th><th>Scientist</th><th>Discovery</th></tr>
<tr><td>1665</td><td><strong>Robert Hooke</strong></td><td>Saw 'cells' in cork (dead cell walls), coined the word <em>cell</em> (Latin cellula = little room); book: <em>Micrographia</em></td></tr>
<tr><td>1674</td><td><strong>Anton van Leeuwenhoek</strong></td><td>First LIVING cells ('animalcules') with his handmade microscope</td></tr>
<tr><td>1831</td><td><strong>Robert Brown</strong></td><td>Nucleus (in orchid cells)</td></tr>
<tr><td>1838–39</td><td><strong>Schleiden & Schwann</strong></td><td>Cell theory (plants / animals are made of cells)</td></tr>
<tr><td>1855</td><td><strong>Rudolf Virchow</strong></td><td>"Omnis cellula e cellula" — all cells arise from pre-existing cells</td></tr>
</table>
<div class="card trick">
<h3>🏆 Record-holder cells</h3>
<ul>
<li><strong>Smallest cell:</strong> Mycoplasma (PPLO) ~0.1 µm</li>
<li><strong>Largest cell:</strong> Ostrich egg</li>
<li><strong>Longest cell:</strong> Nerve cell (neuron)</li>
<li><strong>Largest human cell:</strong> Ovum; smallest: sperm (by volume)</li>
</ul>
</div>
<h2>Organelles — one-line jobs</h2>
<table>
<tr><th>Organelle</th><th>Job / nickname</th></tr>
<tr><td><strong>Nucleus</strong></td><td>Control room; contains DNA/chromosomes; bounded by nuclear envelope with pores</td></tr>
<tr><td><strong>Mitochondria</strong></td><td><em>Powerhouse</em> — ATP by respiration; double membrane; own DNA & ribosomes (semi-autonomous)</td></tr>
<tr><td><strong>Ribosomes</strong></td><td>Protein factories (no membrane!)</td></tr>
<tr><td><strong>Endoplasmic reticulum</strong></td><td>Transport network; Rough ER (ribosomes → protein), Smooth ER (lipids, detox)</td></tr>
<tr><td><strong>Golgi apparatus</strong></td><td>Packaging & dispatch; makes lysosomes; discovered by Camillo Golgi</td></tr>
<tr><td><strong>Lysosomes</strong></td><td><em>Suicide bags</em> — digestive enzymes; waste disposal (de Duve)</td></tr>
<tr><td><strong>Plastids</strong></td><td>Only plants: chloroplast (photosynthesis, chlorophyll), chromoplast (colour), leucoplast (storage); own DNA</td></tr>
<tr><td><strong>Vacuole</strong></td><td>Storage; small in animal cells, one huge central vacuole (up to 90% volume) in plant cells; tonoplast membrane</td></tr>
<tr><td><strong>Centrosome/centrioles</strong></td><td>Animal cells only; spindle formation in cell division</td></tr>
<tr><td><strong>Cell wall</strong></td><td>Plants/fungi/bacteria; plant wall = cellulose; freely permeable (dead layer)</td></tr>
<tr><td><strong>Plasma membrane</strong></td><td>All cells; <em>selectively permeable</em>; fluid mosaic model (Singer & Nicolson, 1972)</td></tr>
</table>
<h2>Plant vs animal cell — 5 instant differentiators</h2>
<ul>
<li>Plant: cell wall ✓, chloroplasts ✓, big central vacuole ✓, regular box shape, no centrioles.</li>
<li>Animal: no wall, no plastids, tiny vacuoles, irregular shape, centrioles ✓, lysosomes prominent.</li>
</ul>
<h2>Prokaryote vs Eukaryote</h2>
<ul>
<li><strong>Prokaryote</strong> (bacteria, blue-green algae): no true nucleus (nucleoid), no membrane-bound organelles, 70S ribosomes, single circular DNA.</li>
<li><strong>Eukaryote</strong> (plants, animals, fungi, protists): true nucleus, organelles, 80S ribosomes.</li>
</ul>
<h2>Transport across membranes</h2>
<ul>
<li><strong>Diffusion:</strong> high → low concentration (gases like O₂, CO₂).</li>
<li><strong>Osmosis:</strong> diffusion of WATER through a semi-permeable membrane.</li>
<li><strong>Hypotonic</strong> solution → water enters cell → swells (plant cell becomes turgid). <strong>Hypertonic</strong> → water leaves → shrinks (<em>plasmolysis</em> in plant cells). <strong>Isotonic</strong> → no net change.</li>
<li>Raisins in water swell (endosmosis); grapes in sugar syrup shrink (exosmosis).</li>
</ul>
`,
examples:[
{q:"Why are mitochondria and plastids called 'semi-autonomous' organelles?", a:"They contain their <b>own DNA and ribosomes</b>, so they can make some of their own proteins and even divide independently of the cell — evidence for the endosymbiotic theory."},
{q:"A plant cell is placed in strong salt solution. What happens and what is it called?", a:"Water leaves by <b>exosmosis</b>; the cytoplasm shrinks away from the cell wall — this is <b>plasmolysis</b>. The wall itself stays (it's rigid and freely permeable)."},
{q:"Why did Robert Hooke see only 'little rooms' and not living matter?", a:"Cork is <b>dead tissue</b> — Hooke saw only the empty cellulose <b>cell walls</b>, not protoplasm. Leeuwenhoek later saw living cells."}
],
quiz:[
{q:"Who coined the term 'cell' in 1665?", opts:["Leeuwenhoek","Robert Hooke","Robert Brown","Virchow"], ans:1, exp:"Robert Hooke, observing cork slices, in his book Micrographia."},
{q:"'Omnis cellula e cellula' (all cells from pre-existing cells) was stated by:", opts:["Schleiden","Schwann","Virchow","Pasteur"], ans:2, exp:"Rudolf Virchow, 1855 — completing the cell theory."},
{q:"The powerhouse of the cell is:", opts:["Ribosome","Golgi body","Mitochondrion","Lysosome"], ans:2, exp:"Mitochondria produce ATP through cellular respiration."},
{q:"'Suicide bags of the cell' refers to:", opts:["Lysosomes","Ribosomes","Vacuoles","Plastids"], ans:0, exp:"Lysosomes contain digestive enzymes; they can burst and digest the cell."},
{q:"The nucleus was discovered by:", opts:["Robert Hooke","Robert Brown","Camillo Golgi","Schwann"], ans:1, exp:"Robert Brown, 1831, in orchid cells."},
{q:"Which organelle has NO membrane?", opts:["Mitochondrion","Ribosome","Lysosome","Nucleus"], ans:1, exp:"Ribosomes are non-membranous particles of RNA + protein."},
{q:"The smallest known cell is:", opts:["Bacterium E. coli","Mycoplasma (PPLO)","Virus","Yeast"], ans:1, exp:"Mycoplasma, ~0.1 µm. (Viruses are not cells!)"},
{q:"Plant cell wall is chiefly made of:", opts:["Chitin","Pectin","Cellulose","Protein"], ans:2, exp:"Cellulose. (Fungal walls = chitin.)"},
{q:"The fluid mosaic model of the plasma membrane was given by:", opts:["Watson & Crick","Singer & Nicolson","Schleiden & Schwann","Darwin & Wallace"], ans:1, exp:"Singer and Nicolson, 1972."},
{q:"Which is present in animal cells but NOT in plant cells?", opts:["Cell wall","Chloroplast","Centriole","Large central vacuole"], ans:2, exp:"Centrioles help form the spindle in animal cell division."},
{q:"Osmosis is the movement of:", opts:["solute, low→high","water through a semi-permeable membrane","gases through air","minerals via roots only"], ans:1, exp:"Water moves from high water concentration to low across a semi-permeable membrane."},
{q:"Shrinking of cytoplasm from the cell wall in a hypertonic solution is:", opts:["Turgidity","Plasmolysis","Endosmosis","Diffusion"], ans:1, exp:"Plasmolysis — water exits by exosmosis."},
{q:"Prokaryotic cells LACK:", opts:["ribosomes","cell membrane","a membrane-bound nucleus","DNA"], ans:2, exp:"Their genetic material lies naked in a nucleoid region."},
{q:"Which organelle packages and dispatches proteins?", opts:["Golgi apparatus","Smooth ER","Nucleolus","Peroxisome"], ans:0, exp:"The Golgi body modifies, packages and ships cell products; also forms lysosomes."}
]
},

/* ============ FIBRE TO FABRIC ============ */
{
id:"fibre", icon:"🧶", title:"Fibre to Fabric",
desc:"Wool, silk, cotton, jute — sources, processes, and the famous steps.",
learn: `
<h2>The big picture</h2>
<p><strong>Fibre → Yarn → Fabric.</strong> Spinning turns fibre into yarn; weaving (on looms) or knitting turns yarn into fabric.</p>
<ul>
<li><strong>Natural fibres:</strong> plant — cotton, jute, flax/linen, coir; animal — wool, silk.</li>
<li><strong>Synthetic fibres:</strong> nylon, polyester, acrylic, rayon (semi-synthetic, from wood pulp).</li>
</ul>
<h2>🐑 Wool</h2>
<ul>
<li>Sources: sheep, goat, camel, <strong>yak</strong> (Tibet/Ladakh), <strong>Angora goat → mohair</strong>, <strong>Angora rabbit → angora wool</strong>, <strong>Kashmiri/Changthangi goat → Pashmina</strong> (cashmere), llama & alpaca (South America).</li>
<li>Sheep hair: coarse beard hair + fine soft under-hair (the wool). <strong>Selective breeding</strong> produces fine-wool sheep (e.g. Lohi, Nali, Bakharwal, Marwari, Patanwadi breeds in India).</li>
</ul>
<div class="card trick">
<h3>🧵 Wool processing — memorise the ORDER</h3>
<ol>
<li><strong>Shearing</strong> — fleece removed (doesn't hurt; like a haircut; usually summer).</li>
<li><strong>Scouring</strong> — washing to remove grease, dust (now machine-done).</li>
<li><strong>Sorting</strong> — separating hair of different textures.</li>
<li><strong>Burr removal</strong> — fluffy burrs picked out; hair re-scoured and dried.</li>
<li><strong>Dyeing</strong> — natural fleece is black/brown/white only.</li>
<li><strong>Straightening, combing & rolling</strong> into yarn.</li>
</ol>
<p>⚠️ Occupational hazard: wool <strong>sorter's disease = ANTHRAX</strong> (bacterium from infected fleece).</p>
</div>
<h2>🐛 Silk & sericulture</h2>
<ul>
<li><strong>Sericulture</strong> = rearing silkworms for silk. Started in ancient <strong>China</strong> (legend: Empress Si-lung-chi and the cocoon in hot tea). The trade route = the Silk Road/Route.</li>
<li>Life cycle of silk moth (<em>Bombyx mori</em>): <strong>Egg → Larva (caterpillar/silkworm) → Pupa (in cocoon) → Adult moth</strong>.</li>
<li>Caterpillars eat <strong>mulberry leaves</strong>; the cocoon is spun from a single protein fibre (<strong>fibroin</strong>) — one cocoon can give ~1000 m of thread.</li>
<li>Cocoons are <strong>boiled/steamed</strong> to kill the pupa; taking out threads = <strong>reeling</strong>.</li>
<li>Varieties: <strong>mulberry silk</strong> (most common, soft & lustrous), <strong>tassar, eri, mooga/muga</strong> (golden, Assam's pride).</li>
<li>Silk is an <strong>animal/protein fibre</strong> — burns with a smell of charred hair (quick test!). India is the 2nd largest silk producer after China.</li>
</ul>
<h2>🌱 Cotton & jute (quick revision)</h2>
<ul>
<li><strong>Cotton:</strong> grows on <strong>black soil</strong>, warm climate; fruit = <strong>boll</strong>; picked, then <strong>ginning</strong> separates seeds from fibre.</li>
<li><strong>Jute ('golden fibre'):</strong> from the <strong>stem</strong> of the jute plant; grown in West Bengal, Bihar, Assam (rainy season); stems rot in water = <strong>retting</strong>, then fibres are stripped.</li>
</ul>
`,
examples:[
{q:"Arrange in order: sorting, shearing, dyeing, scouring.", a:"<b>Shearing → Scouring → Sorting → (burr removal) → Dyeing</b>. Mnemonic: <b>'SH</b>eep <b>SC</b>rubbed, <b>SO</b>rted, <b>DY</b>ed'."},
{q:"Why are cocoons boiled before reeling?", a:"Boiling <b>kills the pupa</b> and softens the gum (sericin) holding the fibre, so the continuous ~1000 m silk thread can be unwound without breaking."},
{q:"A fabric burns smelling like charred hair. Natural or synthetic? Plant or animal?", a:"Smell of burning hair = <b>protein</b> → an <b>animal fibre</b> (wool or silk). Plant fibres smell like burning paper; synthetics melt and bead up."}
],
quiz:[
{q:"Which is NOT a natural fibre?", opts:["Cotton","Silk","Polyester","Jute"], ans:2, exp:"Polyester is synthetic, made from petrochemicals."},
{q:"The process of removing fleece from sheep is:", opts:["Scouring","Shearing","Sorting","Reeling"], ans:1, exp:"Shearing — like a haircut, usually done in summer."},
{q:"Washing the sheared fleece to remove grease and dirt is:", opts:["Scouring","Carding","Retting","Ginning"], ans:0, exp:"Scouring is the washing step, right after shearing."},
{q:"Wool sorter's disease is caused by the bacterium of:", opts:["Tetanus","Anthrax","Cholera","Typhoid"], ans:1, exp:"Sorters can catch anthrax from infected fleece — an occupational hazard."},
{q:"Silkworms feed on the leaves of:", opts:["Neem","Banyan","Mulberry","Mango"], ans:2, exp:"Bombyx mori caterpillars eat mulberry leaves."},
{q:"The correct life cycle of the silk moth:", opts:["Egg → Pupa → Larva → Moth","Egg → Larva → Pupa → Moth","Larva → Egg → Pupa → Moth","Egg → Moth → Larva → Pupa"], ans:1, exp:"Egg → caterpillar (larva) → pupa inside cocoon → adult moth."},
{q:"Taking out silk threads from the cocoon is called:", opts:["Spinning","Weaving","Reeling","Knitting"], ans:2, exp:"Reeling — done after boiling/steaming the cocoons."},
{q:"Rearing silkworms to obtain silk is called:", opts:["Apiculture","Sericulture","Horticulture","Pisciculture"], ans:1, exp:"Sericulture; it began in ancient China."},
{q:"Mohair is obtained from:", opts:["Angora rabbit","Angora goat","Kashmiri goat","Alpaca"], ans:1, exp:"Angora goat → mohair. Angora rabbit → angora wool. Kashmiri goat → pashmina."},
{q:"The golden-coloured 'muga' silk is the pride of:", opts:["Kashmir","Assam","Kerala","Punjab"], ans:1, exp:"Muga silk comes from Assam."},
{q:"Jute fibre is obtained from the plant's:", opts:["leaves","fruit","stem","roots"], ans:2, exp:"Jute comes from the stem; stems are retted in water first."},
{q:"Silk fibre is chemically a:", opts:["carbohydrate","protein","fat","mineral"], ans:1, exp:"Silk (fibroin) and wool are protein fibres — hence the burnt-hair smell."},
{q:"Separating cotton seeds from fibre is called:", opts:["Ginning","Retting","Shearing","Scouring"], ans:0, exp:"Ginning — traditionally done by hand or machine after picking bolls."},
{q:"Turning fibres into yarn is ___ ; turning yarn into fabric on looms is ___.", opts:["weaving; spinning","spinning; weaving","reeling; retting","knitting; ginning"], ans:1, exp:"Spinning makes yarn; weaving (or knitting) makes fabric."}
]
},

/* ============ LAWS OF MOTION ============ */
{
id:"motion", icon:"🏎️", title:"Laws of Motion",
desc:"Newton's three laws, inertia, momentum, F = ma, conservation.",
learn: `
<h2>Newton's three laws (Principia, 1687)</h2>
<div class="card trick">
<h3>1️⃣ First law — Law of INERTIA</h3>
<p>A body stays at rest or in uniform motion in a straight line unless an <strong>unbalanced external force</strong> acts on it. (Galileo's idea, formalised by Newton.)</p>
<ul>
<li><strong>Inertia of rest:</strong> dust flies when a carpet is beaten; passengers jerk backwards when a bus starts; coin drops into glass when card is flicked.</li>
<li><strong>Inertia of motion:</strong> passengers lurch forward when a bus brakes; a runner can't stop instantly; luggage keeps sliding.</li>
<li><strong>Inertia of direction:</strong> sparks fly off tangentially from a grinding wheel; mud from a spinning tyre.</li>
<li>Inertia depends on <strong>mass</strong> — more mass, more inertia.</li>
</ul>
</div>
<div class="card trick">
<h3>2️⃣ Second law — F = ma</h3>
<p>Rate of change of <strong>momentum</strong> is proportional to applied force: F = ma.</p>
<ul>
<li><strong>Momentum p = mv</strong>; SI unit <strong>kg·m/s</strong> (vector!).</li>
<li><strong>1 newton</strong> = force giving a 1 kg mass an acceleration of 1 m/s².</li>
<li>Explains: a cricketer <strong>lowers his hands while catching</strong> (increases time → decreases force); crash airbags & crumple zones; a karate chop (short time → huge force); athletes land on sand.</li>
</ul>
</div>
<div class="card trick">
<h3>3️⃣ Third law — Action & Reaction</h3>
<p>Every action has an <strong>equal and opposite</strong> reaction — acting on <strong>DIFFERENT bodies</strong> (so they never cancel!).</p>
<ul>
<li>Rocket propulsion (gases down → rocket up — works even in vacuum!)</li>
<li>Gun recoil; swimmer pushes water backwards; walking (push ground backwards); boat moves back as you jump ashore; balloon jets forward as air escapes.</li>
</ul>
</div>
<h2>Conservation of momentum</h2>
<p>If no external force acts, total momentum stays constant: <strong>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</strong>. Used for: recoil of guns, rocket motion, collisions.</p>
<div class="card tip"><h3>⚡ Quiz gold</h3>
<ul>
<li>Mass vs weight: mass is constant (kg); weight = mg (newton) changes with gravity. On the Moon weight is ~1/6th.</li>
<li>Seat belts work because of <strong>inertia of motion</strong>.</li>
<li>Newton's first law defines <em>force</em>; second law gives its <em>measure</em>; third law gives its <em>nature</em> (mutual).</li>
<li>Friction is the unsung hero: walking is impossible without it (third law needs grip!).</li>
</ul></div>
`,
examples:[
{q:"A 150 g cricket ball moves at 20 m/s. Its momentum?", a:"p = mv = 0.15 kg × 20 m/s = <b>3 kg·m/s</b>. (Always convert grams → kg!)"},
{q:"A force of 10 N acts on a 2 kg mass. Find the acceleration.", a:"a = F/m = 10/2 = <b>5 m/s²</b>."},
{q:"Why does a fielder pull his hands back while taking a catch?", a:"He <b>increases the time</b> over which the ball's momentum becomes zero. Since F = change in momentum ÷ time, a longer time means a <b>smaller force</b> on his hands."},
{q:"A 4 kg gun fires a 50 g bullet at 200 m/s. Recoil velocity of the gun?", a:"Momentum before = 0. So 4 × v = −(0.05 × 200) → v = −10/4 = <b>2.5 m/s backwards</b>."}
],
quiz:[
{q:"Newton's First Law is also called the law of:", opts:["Momentum","Inertia","Action-reaction","Gravitation"], ans:1, exp:"First law = law of inertia."},
{q:"Passengers jerk FORWARD when a moving bus brakes suddenly due to:", opts:["inertia of rest","inertia of motion","inertia of direction","gravity"], ans:1, exp:"Their bodies continue in motion while the bus stops — inertia of motion."},
{q:"SI unit of momentum:", opts:["kg·m/s","N/s","kg·m/s²","J"], ans:0, exp:"p = mv → kg × m/s."},
{q:"1 newton equals the force that gives:", opts:["1 g an acceleration of 1 cm/s²","1 kg an acceleration of 1 m/s²","1 kg a velocity of 1 m/s","1 g a velocity of 1 m/s"], ans:1, exp:"F = ma → 1 N = 1 kg × 1 m/s²."},
{q:"A cricketer lowers his hands while catching a ball to:", opts:["increase force","reduce the time of impact","increase the time of impact and reduce force","show style"], ans:2, exp:"More time → smaller rate of change of momentum → smaller force."},
{q:"Rockets work in the vacuum of space because of:", opts:["air pushing back","Newton's third law","gravity of Earth","magnetic force"], ans:1, exp:"Exhaust gases shoot down (action); rocket moves up (reaction). No air needed."},
{q:"Action and reaction forces do NOT cancel because they:", opts:["are unequal","act at different times","act on different bodies","are too small"], ans:2, exp:"They are equal and opposite but act on two different objects."},
{q:"Momentum of a 150 g ball moving at 20 m/s:", opts:["3 kg·m/s","30 kg·m/s","3000 kg·m/s","0.3 kg·m/s"], ans:0, exp:"0.15 × 20 = 3 kg·m/s."},
{q:"A force of 10 N on a 2 kg mass produces acceleration:", opts:["20 m/s²","5 m/s²","0.2 m/s²","12 m/s²"], ans:1, exp:"a = F/m = 10/2 = 5 m/s²."},
{q:"When a bullet is fired, the gun recoils. This demonstrates:", opts:["conservation of energy","conservation of momentum","inertia of rest","friction"], ans:1, exp:"Total momentum before firing (zero) = total after; gun moves opposite to bullet."},
{q:"Which has more inertia: a bicycle or a loaded truck?", opts:["Bicycle","Truck","Equal","Depends on speed"], ans:1, exp:"Inertia depends only on mass — the truck has far more."},
{q:"Newton published his laws of motion in the book:", opts:["Opticks","Principia Mathematica","Micrographia","Origin of Species"], ans:1, exp:"Philosophiæ Naturalis Principia Mathematica, 1687."},
{q:"Weight of a 10 kg body on Earth (g = 9.8 m/s²):", opts:["10 N","98 N","9.8 N","980 N"], ans:1, exp:"W = mg = 10 × 9.8 = 98 N."},
{q:"Seat belts protect passengers by working against:", opts:["friction","inertia of motion","air pressure","momentum of the car"], ans:1, exp:"In a crash the body continues forward (inertia); the belt applies a restraining force over time."}
]
},

/* ============ VIDEO ROUND ============ */
{
id:"video", icon:"📺", title:"Video Round — Strategy",
desc:"How to crack 'watch the clip, answer the question' rounds.",
learn: `
<h2>How video rounds usually work</h2>
<p>You're shown a short clip — an experiment, a launch, an animal, a scientist, an invention — then asked to identify it or answer a question about it. You usually <strong>can't rewatch</strong>, so watch like a detective.</p>
<div class="card trick">
<h3>🔍 The 5-channel watching method</h3>
<ol>
<li><strong>Apparatus / objects:</strong> beakers, prisms, magnets, coils, rockets — name them silently as they appear.</li>
<li><strong>Phenomenon:</strong> what actually changes? colour, motion, light, temperature, state?</li>
<li><strong>People & places:</strong> famous faces (Einstein's hair, Hawking's chair, Kalam's smile), logos (ISRO, NASA, CERN), landmark backgrounds.</li>
<li><strong>Text & numbers on screen:</strong> dates, captions, units — often the answer is flashed for one second.</li>
<li><strong>Audio:</strong> narration keywords, countdowns, animal sounds.</li>
</ol>
</div>
<h2>Clips they love to show (be ready!)</h2>
<ul>
<li><strong>ISRO launches:</strong> Chandrayaan-3's Vikram lander touchdown (23 Aug 2023 — now National Space Day), PSLV/GSLV/LVM3 lift-offs, Aditya-L1 (solar mission at L1 point), Gaganyaan tests with the Vyommitra robot.</li>
<li><strong>Classic experiments:</strong> iron filings showing magnetic field lines, prism splitting white light (Newton), electrolysis of water (2H₂ : 1O₂), sodium dancing on water, Meissner effect (floating magnet), non-Newtonian fluid on a speaker.</li>
<li><strong>Nature:</strong> chameleon colour change, octopus camouflage, bioluminescence, murmuration of starlings, Venus flytrap.</li>
<li><strong>Physics demos:</strong> feather & hammer dropped on the Moon (Apollo 15), Newton's cradle, gyroscope stability, dominoes/chain reactions, slow-motion water droplets.</li>
<li><strong>Space:</strong> ISS astronauts (water spheres in zero-g), James Webb images, solar eclipse diamond ring, SpaceX booster landings.</li>
</ul>
<div class="card tip"><h3>⚡ Team tactics</h3>
<ul>
<li>Assign channels: one teammate watches text, one watches objects, one listens.</li>
<li>Write keywords DURING the clip; discuss after.</li>
<li>If unsure, answer with the <em>phenomenon</em> ("conservation of momentum") — partial credit beats silence.</li>
</ul></div>
`,
examples:[
{q:"Clip shows a magnet slowly falling through a copper tube. What's the concept?", a:"<b>Electromagnetic induction / eddy currents</b> (Lenz's law) — the falling magnet induces currents in the copper that oppose its motion."},
{q:"Clip shows an astronaut dropping a feather and hammer together on grey dusty ground. Identify it.", a:"<b>Apollo 15 Moon experiment (David Scott, 1971)</b> — both hit the ground together, proving Galileo's claim that free fall doesn't depend on mass (no air resistance on the Moon)."},
{q:"Clip: a spacecraft leg touches a grey surface, text flashes '23 August 2023'.", a:"<b>Chandrayaan-3's Vikram lander</b> touching down near the lunar south pole — India first! Celebrated as National Space Day; landing site named Shiv Shakti point."}
],
quiz:[
{q:"Chandrayaan-3's lander and rover were named:", opts:["Vikram & Pragyan","Vyom & Mitra","Aditya & Surya","Agni & Prithvi"], ans:0, exp:"Lander Vikram (after Vikram Sarabhai), rover Pragyan ('wisdom')."},
{q:"National Space Day of India is celebrated on:", opts:["15 August","23 August","2 October","14 November"], ans:1, exp:"23 August — the day Chandrayaan-3 landed near the lunar south pole (2023)."},
{q:"A prism splits white light into seven colours. This is called:", opts:["reflection","dispersion","diffusion","refraction only"], ans:1, exp:"Dispersion — famously demonstrated by Newton."},
{q:"In electrolysis of water, the gas collected at the cathode in double volume is:", opts:["Oxygen","Hydrogen","Carbon dioxide","Nitrogen"], ans:1, exp:"Water = H₂O → hydrogen : oxygen = 2 : 1 by volume."},
{q:"The feather-and-hammer drop on the Moon proved:", opts:["Moon has no gravity","all bodies fall equally fast without air resistance","hammers are lighter on Moon","feathers are magnetic"], ans:1, exp:"Without air resistance, acceleration due to gravity is the same for all masses."},
{q:"Aditya-L1 is India's mission to study:", opts:["Mars","the Moon's far side","the Sun","asteroids"], ans:2, exp:"Launched Sept 2023 to the Sun-Earth L1 point, 1.5 million km away."},
{q:"Iron filings sprinkled around a bar magnet arrange themselves along:", opts:["electric field lines","magnetic field lines","gravity lines","random curves"], ans:1, exp:"They map the magnetic field from N to S pole."}
]
},

/* ============ HANDS-ON ACTIVITY ============ */
{
id:"handson", icon:"🧪", title:"Hands-on Activity Bank",
desc:"10 rock-solid demos you can build in 5 minutes from common materials.",
learn: `
<h2>The format</h2>
<p>You pick a chit, get materials, think for <strong>5 minutes</strong>, then demonstrate a scientific concept. The winning formula: <strong>Name the concept → show the demo → explain the science in 3 sentences → give one real-life application.</strong></p>
<div class="card tip">
<h3>🎤 The 5-minute script template</h3>
<ol>
<li>"We are demonstrating <em>[CONCEPT]</em>."</li>
<li>"Watch what happens when…" (do the demo — rehearse once quietly first!)</li>
<li>"This happens because…" (the one-line physics/chemistry/biology reason)</li>
<li>"We see this in real life in…" (application)</li>
</ol>
<p>Divide roles: one speaks, one demonstrates, one handles materials/backup.</p>
</div>
<h2>🔟 Demos, by material</h2>
<table>
<tr><th>#</th><th>Materials given</th><th>Demo</th><th>Concept + explanation</th></tr>
<tr><td>1</td><td>Balloon, straw, string, tape</td><td><strong>Balloon rocket:</strong> thread string through straw, tape inflated balloon to straw, release</td><td><strong>Newton's 3rd law</strong> — air rushes backwards (action), balloon shoots forward (reaction). Application: rockets.</td></tr>
<tr><td>2</td><td>Coin, stiff card, glass</td><td><strong>Coin drop:</strong> card on glass, coin on card; flick the card sharply</td><td><strong>Inertia of rest</strong> (1st law) — the coin stays put as the card flies, then falls in. Application: tablecloth trick, seat belts.</td></tr>
<tr><td>3</td><td>Glass, water, cardboard</td><td><strong>Upside-down glass:</strong> fill glass, press card, invert — water stays!</td><td><strong>Air pressure</strong> — atmospheric pressure pushing up on the card exceeds the water's weight. Application: suction cups, drinking straws.</td></tr>
<tr><td>4</td><td>Candle, glass, plate, water, matches</td><td><strong>Rising water:</strong> stand candle in water on plate, light it, cover with glass — water rises as flame dies</td><td><strong>Combustion needs oxygen + pressure change</strong> — the flame uses O₂ and cools the air, lowering pressure; outside air pushes water in. Application: how lungs/suction work.</td></tr>
<tr><td>5</td><td>Balloon, woollen cloth, paper bits</td><td><strong>Static magic:</strong> rub balloon on wool, lift paper bits / bend a thin water stream</td><td><strong>Static electricity</strong> — friction transfers electrons; charged balloon attracts neutral objects. Application: lightning, photocopiers.</td></tr>
<tr><td>6</td><td>Lemon/potato, zinc nail (or galvanized), copper coin/wire, LED</td><td><strong>Fruit battery:</strong> stick two different metals in, connect to LED</td><td><strong>Chemical → electrical energy</strong> (electrochemical cell): two different metals + electrolyte create a voltage. Application: all batteries.</td></tr>
<tr><td>7</td><td>Glass, water, honey/syrup, oil</td><td><strong>Density tower:</strong> pour honey, water, oil carefully — three layers</td><td><strong>Density</strong> — denser liquids sink. Drop a coin (sinks) and paper (floats on top) for drama. Application: oil spills float on sea.</td></tr>
<tr><td>8</td><td>Cornflour/starch + water, bowl</td><td><strong>Oobleck:</strong> mix 2:1; punch it — solid; relax — liquid</td><td><strong>Non-Newtonian fluid</strong> — viscosity rises under sudden stress. Application: body armour research, quicksand escape (move slowly!).</td></tr>
<tr><td>9</td><td>Two straws, glass of water</td><td><strong>Atomizer/Bernoulli:</strong> one straw vertical in water, blow hard across its top with the other — mist sprays</td><td><strong>Bernoulli's principle</strong> — fast air = low pressure, water gets pushed up. Application: perfume sprayers, airplane lift.</td></tr>
<tr><td>10</td><td>Paper, scissors, pencil/pin</td><td><strong>Paper spinner/helicopter:</strong> cut and fold rotor blades, drop it — it spins down slowly</td><td><strong>Air resistance & rotation</strong> — the blades push air, air pushes back, producing spin and slower fall. Application: helicopter seeds (maple), parachutes.</td></tr>
</table>
<div class="card trick">
<h3>🧠 If the chit names a CONCEPT instead of materials</h3>
<ul>
<li><strong>Friction</strong> → rub hands (heat), roll vs slide a bottle, interleave two books' pages (can't pull apart).</li>
<li><strong>Centre of gravity</strong> → balance a ruler on a finger; lean against a wall and try lifting one leg.</li>
<li><strong>Sound is vibration</strong> → rubber band guitar; rice grains jumping on a tight polythene drum near a loud clap.</li>
<li><strong>Surface tension</strong> → float a paper clip on water, then add a soap drop — it sinks; pepper scatter trick.</li>
<li><strong>Centripetal force</strong> → swing a water-filled bucket/bottle on a string in a vertical circle.</li>
<li><strong>Osmosis</strong> → pre-soaked raisins (swollen) vs dry; potato strip in salt water goes limp.</li>
</ul>
</div>
`,
examples:[
{q:"You get: a balloon, string, straw, tape. Plan the full 5 minutes.", a:"Min 1: assign roles & inflate balloon (don't tie!). Min 2: thread string through straw, tape balloon on, stretch string between two chairs/teammates. Min 3: one dry run. Min 4-5: present — 'This is Newton's third law: for every action there is an equal and opposite reaction. Escaping air is the action; the balloon's forward thrust is the reaction. Real rockets work the same way — which is why they fly even in vacuum.'"},
{q:"Chit says 'demonstrate INERTIA' and the table has a glass, a card and coins.", a:"Coin-drop trick: card over glass, coin on card, flick the card horizontally — coin drops straight in. Explain: the coin was at rest and stayed at rest (Newton's first law) because the flick acted on the card, not the coin. Application: seat belts stop YOUR inertia in a braking car."}
],
quiz:[
{q:"Balloon rocket on a string demonstrates:", opts:["gravity","Newton's third law","osmosis","magnetism"], ans:1, exp:"Escaping air backwards = action; balloon forward = reaction."},
{q:"Coin stays on the glass when the card is flicked — this shows:", opts:["inertia of rest","friction","air pressure","momentum gain"], ans:0, exp:"The coin resists change in its state of rest (first law)."},
{q:"Water stays in an inverted glass sealed by a card because of:", opts:["surface tension only","atmospheric pressure","the card's weight","static charge"], ans:1, exp:"Atmospheric pressure pushing up on the card beats the water's weight."},
{q:"In the candle-in-glass demo, water rises because:", opts:["water is attracted to flame","oxygen is used up and cooling air lowers pressure inside","the glass melts","carbon dioxide is heavy"], ans:1, exp:"The flame consumes O₂ and heats air; when it cools, inside pressure drops and outside air pushes water in."},
{q:"A lemon battery converts:", opts:["light to electrical energy","chemical to electrical energy","heat to chemical energy","sound to electrical energy"], ans:1, exp:"Two different metals + citric acid electrolyte = electrochemical cell."},
{q:"Cornstarch + water that hardens when punched is a:", opts:["Newtonian fluid","non-Newtonian fluid","colloid crystal","supercooled liquid"], ans:1, exp:"Its viscosity increases under sudden stress — a non-Newtonian (shear-thickening) fluid."},
{q:"Blowing across the top of a straw standing in water sprays mist — this uses:", opts:["Bernoulli's principle","Archimedes' principle","Pascal's law","Hooke's law"], ans:0, exp:"Fast-moving air has lower pressure, so water is pushed up the straw."},
{q:"In the honey-water-oil tower, the bottom layer is honey because it has the highest:", opts:["viscosity","density","temperature","surface tension"], ans:1, exp:"Layering order is set by density: honey > water > oil."}
]
}
];
