window.MATHS_TOPICS = [

/* ============ 1. NUMBER SERIES & ANALOGY ============ */
{
id:"series", icon:"🔢", title:"Number Series & Analogy",
desc:"Spot the pattern — differences, ratios, squares, cubes, primes, letters.",
learn: `
<h2>How a series question works</h2>
<p>You get a sequence; one term is missing. <strong>Your only job: find the rule connecting consecutive terms.</strong> Always try these checks <em>in order</em> — fastest first:</p>
<div class="card trick">
<h3>🥇 The 5-step attack plan</h3>
<ol>
<li><strong>Differences:</strong> subtract neighbours. Constant? It's an AP (e.g. 4, 9, 14, 19 → +5). Differences themselves growing (+2, +4, +6…)? Second-level pattern.</li>
<li><strong>Ratios:</strong> divide neighbours. Constant? It's a GP (e.g. 3, 9, 27 → ×3). Also try ×2+1, ×2−1, ×3+2 style mixed rules.</li>
<li><strong>Famous families:</strong> squares (1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144…), cubes (1, 8, 27, 64, 125, 216, 343…), primes (2, 3, 5, 7, 11, 13, 17, 19, 23, 29…), triangular numbers (1, 3, 6, 10, 15, 21…). Also squares±1, cubes±1 — e.g. 0, 3, 8, 15, 24 is n²−1.</li>
<li><strong>Fibonacci-style:</strong> each term = sum of previous two (1, 1, 2, 3, 5, 8, 13, 21…).</li>
<li><strong>Alternating / interleaved:</strong> if nothing works, split into odd-position and even-position terms — two separate series woven together (e.g. 1, 10, 4, 20, 9, 30 → squares and tens).</li>
</ol>
</div>
<h2>Letter series — the EJOTY trick</h2>
<p>Memorise anchor positions so you never count from A: <span class="kbd">E=5</span> <span class="kbd">J=10</span> <span class="kbd">O=15</span> <span class="kbd">T=20</span> <span class="kbd">Y=25</span>. Say it: <em>"EJOTY"</em>. Now any letter is at most 2 steps from an anchor (e.g. R = T−2 = 18).</p>
<p>Letter series are just number series in disguise: convert to positions, find the jump pattern (+2, +3, +4… or skip patterns).</p>
<h2>Analogy — "A is to B as C is to ?"</h2>
<p>Find the <strong>exact relation</strong> between the first pair and copy it onto the second:</p>
<ul>
<li><strong>Number analogies:</strong> square (7 : 49), cube (4 : 64), n²+1 (6 : 37), n²−1 (6 : 35), ×n+k, digit reversal (23 : 32), sum of digits…</li>
<li><strong>Letter analogies:</strong> same shift for every letter (ACE : BDF is +1 each), reversal (AZ : ZA), opposite letters (A↔Z, B↔Y — positions sum to 27).</li>
<li><strong>Word analogies:</strong> part-whole, tool-worker, unit-quantity, young one-animal.</li>
</ul>
<div class="card tip"><h3>⚡ Speed tips for tomorrow</h3>
<ul>
<li>Look at the <strong>size of growth</strong> first: slow growth → addition; doubling/tripling → multiplication; exploding (5, 25, 125) → powers.</li>
<li>If the series has 6+ terms, suspect an <strong>alternating</strong> pattern.</li>
<li>In options-based rounds, <strong>work backwards from options</strong> if stuck.</li>
<li>Know squares up to 25² = 625 and cubes up to 12³ = 1728 cold.</li>
</ul></div>
`,
examples:[
{q:"Find the next term: 2, 6, 12, 20, 30, ?", a:"Differences: 4, 6, 8, 10 → next difference is 12. So 30 + 12 = <b>42</b>. (Bonus: these are n²+n: 1·2, 2·3, 3·4, 4·5, 5·6, 6·7.)"},
{q:"Find the missing term: 0, 7, 26, 63, ?", a:"Compare with cubes: 1, 8, 27, 64 — each term is <b>cube − 1</b> (n³−1). Next: 5³ − 1 = <b>124</b>."},
{q:"Letter series: A, C, F, J, O, ?", a:"Positions: 1, 3, 6, 10, 15. Jumps: +2, +3, +4, +5 → next jump +6 → position 21 = <b>U</b> (T=20, so 21 is U by EJOTY)."},
{q:"Analogy: 6 : 35 :: 8 : ?", a:"Relation: 6² − 1 = 35. Apply to 8: 8² − 1 = <b>63</b>."},
{q:"Find the next: 1, 10, 4, 20, 9, 30, ?", a:"Split it! Odd positions: 1, 4, 9, ? → squares → 16. Even positions: 10, 20, 30 (tens). Next term is at an odd position → <b>16</b>."}
],
quiz:[
{q:"2, 6, 12, 20, 30, ?", opts:["36","40","42","44"], ans:2, exp:"Differences 4, 6, 8, 10 → next +12 → 42."},
{q:"3, 9, 27, 81, ?", opts:["162","243","216","324"], ans:1, exp:"GP with ratio ×3 → 81 × 3 = 243."},
{q:"2, 3, 5, 7, 11, 13, ?", opts:["15","16","17","19"], ans:2, exp:"Prime numbers → next prime after 13 is 17."},
{q:"1, 1, 2, 3, 5, 8, 13, ?", opts:["18","20","21","26"], ans:2, exp:"Fibonacci: each term = sum of previous two → 8 + 13 = 21."},
{q:"0, 7, 26, 63, ?", opts:["98","124","126","215"], ans:1, exp:"n³ − 1 series → 5³ − 1 = 124."},
{q:"2, 12, 36, 80, ?", opts:["120","140","150","164"], ans:2, exp:"n²(n+1): 1·2, 4·3, 9·4, 16·5 → 25·6 = 150."},
{q:"7, 10, 8, 11, 9, 12, ?", opts:["7","10","12","13"], ans:1, exp:"Alternating +3, −2 pattern → 12 − 2 = 10."},
{q:"Letter series: A, C, F, J, O, ?", opts:["S","T","U","V"], ans:2, exp:"Jumps +2, +3, +4, +5, +6 → position 15 + 6 = 21 = U."},
{q:"BDF, HJL, NPR, ?", opts:["SUW","TVX","UWY","TUX"], ans:1, exp:"Each group skips one letter inside (B-D-F) and jumps 2 letters between groups (F→H, L→N, R→T) → TVX."},
{q:"Analogy — 8 : 512 :: 7 : ?", opts:["343","216","294","392"], ans:0, exp:"8³ = 512, so 7³ = 343."},
{q:"Analogy — 6 : 35 :: 8 : ?", opts:["48","63","64","65"], ans:1, exp:"n² − 1 → 64 − 1 = 63."},
{q:"Analogy — ACE : BDF :: PRT : ?", opts:["QSU","QTV","RSU","SUW"], ans:0, exp:"Every letter shifts +1: P→Q, R→S, T→U."},
{q:"25 : 36 :: 49 : ?", opts:["56","64","81","100"], ans:1, exp:"5²:6² → consecutive squares. 49 = 7², so answer is 8² = 64."},
{q:"4, 9, 25, 49, 121, ?", opts:["144","169","196","225"], ans:1, exp:"Squares of PRIMES: 2², 3², 5², 7², 11² → next prime 13 → 169."}
]
},

/* ============ 2. CUBE & DICE ============ */
{
id:"dice", icon:"🎲", title:"Cube & Dice",
desc:"Opposite faces, unfolded dice, painted-cube counting.",
learn: `
<h2>Dice basics</h2>
<p>A die has <strong>6 faces, 12 edges, 8 corners</strong>. On a <em>standard die</em>, opposite faces always add to <strong>7</strong>: 1↔6, 2↔5, 3↔4.</p>
<div class="card trick">
<h3>🎯 Rule 1 — The "common face" trick (two views of one die)</h3>
<p>When two positions of the same die are shown and <strong>two faces are common</strong> to both views, the <em>remaining</em> two faces (one from each view) are opposite to each other.</p>
<p><em>Example:</em> View 1 shows 1, 2, 3. View 2 shows 2, 3, 5. Common: 2 and 3. So the leftover pair → <strong>1 is opposite 5</strong>. And since 2, 3 touch both 1 and 5, the pair left (4, 6) are opposite... no wait — the remaining numbers 4 and 6 never appeared, so 2↔? Use elimination: faces adjacent to 2 seen are 1, 3, 5 — so 2's opposite is 4 or 6. Combine clues to finish.</p>
</div>
<div class="card trick">
<h3>🎯 Rule 2 — Adjacency elimination</h3>
<p>If a number is seen adjacent to four different numbers across the views, its opposite is the <strong>only number it never touched</strong>. E.g. if 1 appears adjacent to 2, 3, 4, 5 → 1 is opposite 6.</p>
</div>
<h2>Open (unfolded) dice</h2>
<p>For a cross/T-shaped unfolding:</p>
<ul>
<li>In any straight line of the net, faces that are <strong>one square apart (alternate)</strong> become opposite when folded.</li>
<li>The two "wing" squares sticking out on either side of the spine are opposite <strong>each other</strong> only if they are alternate; a wing is <em>adjacent</em> to the square it is attached to.</li>
<li>Quick check: faces that <strong>share an edge in the net</strong> are always adjacent (never opposite) in the cube.</li>
</ul>
<h2>Painted cube — the counting formulas</h2>
<p>A big cube is painted on all faces, then cut into <strong>n × n × n</strong> small cubes:</p>
<table>
<tr><th>Painted faces</th><th>Where they live</th><th>Formula</th><th>n = 4 example</th></tr>
<tr><td>3 faces</td><td>corners</td><td><strong>8</strong> (always!)</td><td>8</td></tr>
<tr><td>2 faces</td><td>edges</td><td><strong>12(n−2)</strong></td><td>24</td></tr>
<tr><td>1 face</td><td>face centres</td><td><strong>6(n−2)²</strong></td><td>24</td></tr>
<tr><td>0 faces</td><td>hidden core</td><td><strong>(n−2)³</strong></td><td>8</td></tr>
</table>
<p>Sanity check: they must total n³. For n = 4: 8 + 24 + 24 + 8 = 64 ✓</p>
<div class="card tip"><h3>⚡ Speed tips</h3>
<ul><li>Number of cuts → n: cutting into 64 pieces means n = 4 (since 4³ = 64).</li>
<li>"At least one face painted" = n³ − (n−2)³.</li>
<li>In dice questions, <strong>never assume</strong> opposite = 7 unless they say "standard die".</li></ul></div>
`,
examples:[
{q:"A cube painted blue on all sides is cut into 27 small cubes. How many have exactly 2 painted faces?", a:"n = 3 (since 3³ = 27). Two-face cubes sit on edges: 12(n−2) = 12 × 1 = <b>12</b>."},
{q:"Two positions of a die show faces (1, 2, 3) and (2, 3, 5). Which number is opposite 1?", a:"Faces 2 and 3 are common to both views → the two leftover faces are opposite: <b>1 ↔ 5</b>."},
{q:"An unfolded die in a vertical strip reads 1, 2, 3, 4 (top to bottom) with 5 and 6 as wings attached beside 2. Which face is opposite 1?", a:"In a straight strip, alternate faces are opposite: 1↔3 and 2↔4. Wings 5 and 6 fold to the sides: 5↔6. So opposite of 1 is <b>3</b>."},
{q:"A 5×5×5 painted cube is cut up. How many small cubes have NO paint?", a:"(n−2)³ = 3³ = <b>27</b> — the hidden inner core."}
],
quiz:[
{q:"On a standard die, the number opposite 2 is:", opts:["3","4","5","6"], ans:2, exp:"Standard die: opposite faces sum to 7 → 2 ↔ 5."},
{q:"A die has 6 faces. How many edges and corners does a cube have?", opts:["12 edges, 8 corners","8 edges, 12 corners","12 edges, 6 corners","6 edges, 8 corners"], ans:0, exp:"Cube: 6 faces, 12 edges, 8 vertices (Euler: 6 + 8 − 12 = 2)."},
{q:"Two views of a die: (1, 2, 3) and (2, 3, 5). The face opposite 1 is:", opts:["2","4","5","6"], ans:2, exp:"2 and 3 are common to both views → remaining faces 1 and 5 are opposite."},
{q:"In views of a die, 1 appears adjacent to 2, 3, 4 and 5. The face opposite 1 is:", opts:["2","4","5","6"], ans:3, exp:"1 touches everything except 6 → 1 ↔ 6."},
{q:"A cube painted on all faces is cut into 27 cubes. Cubes with exactly 3 painted faces:", opts:["6","8","12","27"], ans:1, exp:"Three-face cubes are the corners — always 8, for any n."},
{q:"A cube is cut into 64 small cubes after painting. Cubes with NO painted face:", opts:["4","8","16","24"], ans:1, exp:"n = 4 → (4−2)³ = 8 hidden core cubes."},
{q:"A 5×5×5 painted cube: how many small cubes have exactly one painted face?", opts:["36","45","54","60"], ans:2, exp:"6(n−2)² = 6 × 9 = 54."},
{q:"A 4×4×4 painted cube: cubes with exactly two painted faces?", opts:["12","16","24","32"], ans:2, exp:"12(n−2) = 12 × 2 = 24 (edge cubes)."},
{q:"A cube cut into 64 cubes: how many have AT LEAST one face painted?", opts:["48","52","56","60"], ans:2, exp:"64 − unpainted core 8 = 56."},
{q:"In an unfolded cross, two faces that share an edge in the net will be ___ in the cube.", opts:["opposite","adjacent","the same","cannot say"], ans:1, exp:"Sharing an edge in the net → they stay adjacent after folding. Only alternate faces in a line become opposite."}
]
},

/* ============ 3. CALENDAR ============ */
{
id:"calendar", icon:"📅", title:"Calendar",
desc:"Odd days, leap years, finding the day of any date.",
learn: `
<h2>The whole topic = ODD DAYS</h2>
<p><strong>Odd days</strong> = remainder when days are divided by 7. Everything in calendar problems reduces to counting odd days.</p>
<div class="card trick">
<h3>🧠 Must-memorise facts</h3>
<ul>
<li>Ordinary year = 365 days = 52 weeks + <strong>1 odd day</strong>.</li>
<li>Leap year = 366 days = <strong>2 odd days</strong>.</li>
<li><strong>Leap year rule:</strong> divisible by 4 → leap; BUT century years must be divisible by 400. So 2000, 1600, 2400 ✓ leap; 1700, 1800, 1900, 2100 ✗ not leap.</li>
<li>Odd days in: <strong>100 years = 5</strong>, <strong>200 years = 3</strong>, <strong>300 years = 1</strong>, <strong>400 years = 0</strong>. (Cycle repeats every 400 years.)</li>
<li>Day codes: <strong>0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday</strong>.</li>
</ul>
</div>
<h2>Finding the day of any date</h2>
<ol>
<li>Split: complete 400-blocks + complete centuries + complete years + current-year days.</li>
<li>Add odd days from each piece, take mod 7, read the day code.</li>
</ol>
<h2>Month odd days (days mod 7)</h2>
<table>
<tr><th>Month</th><td>Jan</td><td>Feb</td><td>Mar</td><td>Apr</td><td>May</td><td>Jun</td><td>Jul</td><td>Aug</td><td>Sep</td><td>Oct</td><td>Nov</td><td>Dec</td></tr>
<tr><th>Odd days</th><td>3</td><td>0 / 1*</td><td>3</td><td>2</td><td>3</td><td>2</td><td>3</td><td>3</td><td>2</td><td>3</td><td>2</td><td>3</td></tr>
</table>
<p class="small">*Feb: 0 in ordinary year (28), 1 in leap year (29).</p>
<h2>Repeating calendars</h2>
<ul>
<li>A <strong>leap year's</strong> calendar repeats after <strong>28 years</strong> (e.g. 2024 → 2052).</li>
<li>An ordinary year repeats after 6 or 11 years depending on where it sits relative to leap years — add years until total odd days = 0 (mod 7).</li>
<li>Same date next year moves forward <strong>+1 day</strong> (or +2 if a 29 Feb falls in between).</li>
</ul>
<div class="card tip"><h3>⚡ Killer facts for quizzes</h3>
<ul>
<li><strong>The last day of a century can never be Tuesday, Thursday or Saturday.</strong> (100y → 5 odd days = Friday; 200y → Wednesday; 300y → Monday; 400y → Sunday.)</li>
<li>15 August 1947 → <strong>Friday</strong>. 26 January 1950 → <strong>Thursday</strong>. 2 October 1869 (Gandhiji's birth) → <strong>Saturday</strong>.</li>
<li>February 29 appears only in leap years — a person born on 29 Feb has a "real" birthday roughly every 4 years (but 1900-style centuries skip it!).</li>
</ul></div>
`,
examples:[
{q:"What day of the week was 15 August 1947?", a:"Odd days: 1600 years → 0; 300 years → 1; 46 complete years (1901–1946) = 11 leap + 35 ordinary = 22 + 35 = 57 → 57 mod 7 = 1; days in 1947 up to 15 Aug: 31+28+31+30+31+30+31+15 = 227 → 227 mod 7 = 3. Total = 0+1+1+3 = 5 → code 5 = <b>Friday</b>."},
{q:"If today is Monday, what day will it be after 61 days?", a:"61 mod 7 = 5 odd days. Monday + 5 = <b>Saturday</b>."},
{q:"Which year will have the same calendar as 2024?", a:"2024 is a leap year → add 28 → <b>2052</b>."},
{q:"1 Jan 2026 is a Thursday. What day is 1 Jan 2027?", a:"2026 is an ordinary year → 1 odd day → Thursday + 1 = <b>Friday</b>."},
{q:"Why can't a century end on a Saturday?", a:"Odd days after 100y/200y/300y/400y are 5, 3, 1, 0 → last days are Friday, Wednesday, Monday, Sunday only. <b>Tuesday, Thursday, Saturday are impossible.</b>"}
],
quiz:[
{q:"Which of these is a leap year?", opts:["1900","2100","2000","1800"], ans:2, exp:"Century years need division by 400 → only 2000 qualifies."},
{q:"Number of odd days in an ordinary year:", opts:["0","1","2","3"], ans:1, exp:"365 = 52×7 + 1 → 1 odd day."},
{q:"Number of odd days in 100 years:", opts:["3","4","5","6"], ans:2, exp:"76 ordinary + 24 leap years → 76 + 48 = 124 odd days → 124 mod 7 = 5."},
{q:"15 August 1947 was a:", opts:["Thursday","Friday","Saturday","Sunday"], ans:1, exp:"Classic result via odd-days method → Friday."},
{q:"26 January 1950 was a:", opts:["Tuesday","Wednesday","Thursday","Friday"], ans:2, exp:"India became a Republic on a Thursday."},
{q:"If today is Monday, the day after 61 days is:", opts:["Friday","Saturday","Sunday","Monday"], ans:1, exp:"61 mod 7 = 5 → Monday + 5 = Saturday."},
{q:"The calendar of leap year 2024 repeats in:", opts:["2048","2050","2052","2056"], ans:2, exp:"Leap-year calendars repeat after 28 years → 2024 + 28 = 2052."},
{q:"The last day of a century CANNOT be a:", opts:["Monday","Wednesday","Friday","Tuesday"], ans:3, exp:"Century ends can only be Fri, Wed, Mon or Sun — never Tue, Thu, Sat."},
{q:"Odd days contributed by February in a leap year:", opts:["0","1","2","3"], ans:1, exp:"29 mod 7 = 1."},
{q:"If 5 March is a Wednesday, 5 April the same year is a:", opts:["Friday","Saturday","Sunday","Monday"], ans:1, exp:"March has 31 days → 31 mod 7 = 3 odd days → Wednesday + 3 = Saturday."},
{q:"Number of odd days in 400 years:", opts:["0","1","2","5"], ans:0, exp:"400-year cycle has exactly 0 odd days — that's why the calendar repeats."},
{q:"A year has 365 days. How many complete weeks is that?", opts:["51","52","53","50"], ans:1, exp:"365 ÷ 7 = 52 weeks + 1 day."}
]
},

/* ============ 4. DIRECTION SENSE ============ */
{
id:"direction", icon:"🧭", title:"Direction Sense",
desc:"Turns, displacement, shadows — always draw the diagram!",
learn: `
<h2>The compass rose</h2>
<p>Memorise the ring (clockwise): <strong>N → NE → E → SE → S → SW → W → NW → N</strong>. Each step = 45°.</p>
<div class="card trick">
<h3>🧠 Turning rules</h3>
<ul>
<li><strong>Right turn = clockwise</strong> (N→E→S→W). <strong>Left turn = anticlockwise</strong> (N→W→S→E).</li>
<li>90° = quarter turn, 180° = about turn (face opposite), 45° = half-step to a diagonal.</li>
<li>Track facing direction after EVERY turn — write it beside each move.</li>
</ul>
</div>
<div class="card trick">
<h3>📐 Distance from start → Pythagoras</h3>
<p>Reduce all moves to net <em>east-west</em> and net <em>north-south</em> displacement. Then distance = √(x² + y²). The classic triples save time: <strong>3-4-5, 6-8-10, 5-12-13, 9-12-15, 8-15-17</strong>.</p>
</div>
<h2>Shadow logic (very common!)</h2>
<ul>
<li>Sun rises in the <strong>east</strong> → <strong>morning shadows point WEST</strong>.</li>
<li>Sun sets in the <strong>west</strong> → <strong>evening shadows point EAST</strong>.</li>
<li>At noon the sun is overhead → shadow is shortest, points north (in India).</li>
<li>Puzzle method: "shadow falls to his right" → figure out which facing makes west (or east) lie on his right.</li>
</ul>
<h2>Method that never fails</h2>
<ol>
<li><strong>Draw!</strong> Mark N up, E right on your rough sheet. Trace every move as an arrow.</li>
<li>Label start as O, end as P. Answer "direction from start" by looking where P sits relative to O (N/S/E/W or a diagonal).</li>
<li>For "how far", use net displacements + Pythagoras.</li>
</ol>
<div class="card tip"><h3>⚡ Traps to avoid</h3>
<ul>
<li>"Left" and "right" depend on <strong>current facing</strong>, not on the page!</li>
<li>Question may ask direction of <em>start from the finish</em> — that's the OPPOSITE of finish-from-start.</li>
<li>Rotated-compass puzzles ("if SE becomes N…"): find the rotation angle, apply the same rotation to the asked direction.</li></ul></div>
`,
examples:[
{q:"Ram walks 3 km north, then 4 km east. How far and in which direction is he from the start?", a:"Net: 3 N and 4 E → distance = √(9+16) = <b>5 km</b>, direction <b>north-east</b> of the start."},
{q:"A man facing north turns 90° clockwise, then 180° anticlockwise. Which direction is he facing?", a:"N → (90° CW) → E → (180°) → <b>West</b>."},
{q:"One morning, Ravi's shadow falls to his right. Which direction is he facing?", a:"Morning shadow points west. West is on his right → he faces <b>South</b>. (Facing south: right hand = west ✓)"},
{q:"Sita walks 5 km south, turns left and walks 3 km, turns left again and walks 5 km. Where is she now?", a:"5 S, then left of south = east 3 km, then left of east = north 5 km. Net: south cancels, 3 km east → <b>3 km east of start</b>."},
{q:"If South-East becomes North, what does West become?", a:"SE (135°) → N (0°) is a 135° anticlockwise rotation. West (270°) − 135° = 135° = <b>South-East</b>."}
],
quiz:[
{q:"Facing north, you turn 90° clockwise, then 180° anticlockwise. You now face:", opts:["East","West","South","North"], ans:1, exp:"N → E (90° CW) → W (180° turn)."},
{q:"A man walks 3 km north then 4 km east. Distance from the starting point:", opts:["5 km","6 km","7 km","1 km"], ans:0, exp:"3-4-5 Pythagorean triple → 5 km."},
{q:"Sita walks 5 km south, turns left 3 km, turns left 5 km. Her position from start:", opts:["3 km west","3 km east","5 km south","8 km east"], ans:1, exp:"The two 5-km legs (S then N) cancel; the 3-km leg went east."},
{q:"In the morning, Mohan's shadow falls to his right. He is facing:", opts:["North","South","East","West"], ans:1, exp:"Morning shadow points west; west on the right means facing south."},
{q:"In the evening, shadows point towards the:", opts:["East","West","North","South"], ans:0, exp:"Sun sets in the west → evening shadows point east."},
{q:"A man facing west turns 45° clockwise, then 180°, then 45° clockwise again. He faces:", opts:["South","North","East","West"], ans:0, exp:"W → NW (45° CW) → SE (180°) → S (45° CW)."},
{q:"Walk 10 m east, 10 m north, then 10 m west. Where are you from the start?", opts:["10 m north","10 m east","10 m south","at the start"], ans:0, exp:"East and west cancel → net 10 m north."},
{q:"If South-East becomes North, then West becomes:", opts:["North-East","South-West","South-East","North-West"], ans:2, exp:"Rotation of 135° anticlockwise: W(270°) − 135° = 135° = SE."},
{q:"Ravi goes 4 km north, turns right 3 km, turns right again 4 km. How far from start?", opts:["3 km","4 km","5 km","11 km"], ans:0, exp:"North and south legs cancel → 3 km east of start."},
{q:"At 3:00, if the HOUR hand points east, the minute hand (at 12) points:", opts:["North","South","East","West"], ans:0, exp:"At 3:00 the hands are 90° apart; hour at '3'→east means '12' is a quarter-turn anticlockwise → north."}
]
},

/* ============ 6. MIRROR IMAGES ============ */
{
id:"mirror", icon:"🪞", title:"Mirror Images",
desc:"Lateral inversion, symmetric letters, mirror clocks, water images.",
learn: `
<h2>What a mirror does</h2>
<p>A plane mirror causes <strong>lateral inversion</strong>: LEFT and RIGHT swap, but <strong>top and bottom stay the same</strong>. (A water image/reflection is the opposite: top-bottom flips.)</p>
<div class="mirror-demo">
  <div class="pane"><div class="word">MATHS</div><div class="lbl">Original</div></div>
  <div class="mirror-line"></div>
  <div class="pane"><div class="word mirror">MATHS</div><div class="lbl">Mirror image</div></div>
</div>
<div class="card trick">
<h3>🔤 Letters UNCHANGED in a mirror (vertical symmetry)</h3>
<p style="font-size:22px;letter-spacing:6px"><strong>A H I M O T U V W X Y</strong></p>
<p>11 capital letters. Memory hook: <em>"HI MAT — U V W X Y + O"</em>. A whole <strong>word</strong> survives only if it uses these letters AND is a palindrome: <strong>MOM, WOW, TOT, OTTO, TOOT, AHA, MAAM</strong>.</p>
<h3>🔢 Digits unchanged in a mirror: <strong>0, 1, 8</strong></h3>
</div>
<div class="card trick">
<h3>🌊 Water image (top-bottom flip)</h3>
<p>Letters unchanged in water: <strong>B C D E H I K O X</strong> (horizontal symmetry). Digits: <strong>0, 1, 3, 8</strong>.</p>
</div>
<h2>Mirror clock — the 11:60 trick</h2>
<p><strong>Real time + mirror time = 11:60</strong> (i.e. 12 hours). So:</p>
<ul>
<li>Real time 4:30 → mirror shows 11:60 − 4:30 = <strong>7:30</strong>.</li>
<li>Mirror shows 2:40 → real time = 11:60 − 2:40 = <strong>9:20</strong>.</li>
<li>If the time is between 11:00 and 1:00, use <strong>23:60</strong> instead.</li>
</ul>
<div class="card tip"><h3>⚡ Exam technique</h3>
<ul>
<li>Mirror on the RIGHT or LEFT side → flip left-right. Mirror BELOW (water) → flip top-bottom.</li>
<li>For figure questions, check one distinctive element (an arrow, a dot) — eliminate options fast.</li>
<li>Why is <span class="mirror">AMBULANCE</span> painted like that? So drivers in front read "AMBULANCE" correctly in their <strong>rear-view mirror</strong>!</li>
</ul></div>
`,
examples:[
{q:"What is the mirror image of 4:30 on a clock?", a:"11:60 − 4:30 = <b>7:30</b>."},
{q:"A mirror clock shows 2:40. What is the real time?", a:"11:60 − 2:40 = <b>9:20</b>."},
{q:"Which of MOM, DAD, BOB looks unchanged in a mirror?", a:"<b>MOM</b> — M and O are mirror-symmetric letters and the word is a palindrome. D, A, B combinations change."},
{q:"Which digits look the same in a WATER image?", a:"<b>0, 1, 3, 8</b> — they have horizontal symmetry."}
],
quiz:[
{q:"Which letter looks exactly the same in a mirror?", opts:["N","M","S","Z"], ans:1, exp:"M has a vertical line of symmetry. N, S, Z reverse."},
{q:"Which word reads the same in a mirror?", opts:["DAD","MOM","BOB","EYE"], ans:1, exp:"MOM: symmetric letters + palindrome. The others contain letters (D, B, E/Y) that flip."},
{q:"Mirror image of the time 4:30 is:", opts:["6:30","7:30","8:30","5:30"], ans:1, exp:"11:60 − 4:30 = 7:30."},
{q:"A clock seen in a mirror shows 2:40. The actual time is:", opts:["9:20","10:20","8:40","9:40"], ans:0, exp:"11:60 − 2:40 = 9:20."},
{q:"Which digit looks the same in a water image (flipped top-bottom)?", opts:["2","3","4","5"], ans:1, exp:"3 has horizontal symmetry → unchanged in water. (0, 1, 3, 8 all work.)"},
{q:"A mirror image swaps:", opts:["top and bottom","left and right","both","neither"], ans:1, exp:"Lateral inversion: left-right swap only. Water images swap top-bottom."},
{q:"This word is seen in a mirror: <span class='mirror'>TRIANGLE</span>. The original word is:", opts:["TRIANGLE","ELGNAIRT","TRAINGLE","RECTANGLE"], ans:0, exp:"Un-flip it mentally — the original is TRIANGLE."},
{q:"Which of these words looks IDENTICAL in a mirror?", opts:["OTTO","TOTO","MOTO","ONTO"], ans:0, exp:"OTTO: all symmetric letters (O, T) and a palindrome."},
{q:"How many capital letters of the English alphabet look the same in a mirror?", opts:["9","10","11","13"], ans:2, exp:"A H I M O T U V W X Y → 11 letters."},
{q:"AMBULANCE is written laterally inverted on vans so that:", opts:["it looks stylish","drivers ahead read it in their rear-view mirror","it confuses traffic","it saves paint"], ans:1, exp:"The rear-view mirror flips it back to normal for the driver in front."}
]
}
];
