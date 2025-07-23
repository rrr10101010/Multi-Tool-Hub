// --- EMBEDDED QR CODE LIBRARY (Self-contained) ---
const qrcodegen=function(){"use strict";function t(r,n){if(1>r||r>40||0>n||n>3)throw RangeError("Value out of range");this.version=r,this.errorCorrectionLevel=n}class r{constructor(t,e,n,i){this.version=t,this.size=e,this.errorCorrectionLevel=n,this.modules=Array.from({length:e},()=>Array.from({length:e},()=>!1)),this.isFunction=Array.from({length:e},()=>Array.from({length:e},()=>!1)),this.applyMask(i),this.drawFunctionPatterns();const s=this.addEccAndInterleave(n);this.drawCodewords(s),this.drawVersion(),this.drawFormatBits(i),this.isFunction=null}applyMask(t){if(0>t||t>7)throw RangeError("Mask pattern out of range");for(let e=0;e<this.size;e++)for(let n=0;n<this.size;n++)this.modules[n][e]^=o(t,e,n)}getModule(t,e){return this.modules[e][t]}setModule(t,e,n){this.modules[e][t]=n}setModuleChecked(t,e,n){this.isFunction[e][t]||this.setModule(t,e,n)}addEccAndInterleave(t){const e=this.errorCorrectionLevel.formatBits,n=i[e][this.version],s=a[e][this.version],o=c[e][this.version],u=l[e][this.version];if(t.bitLength>8*n)throw RangeError("Data too long");const d=h.generate(new h(new Uint8Array([255&t.bitLength>>8,255&t.bitLength])),o);let g=new Uint8Array(n+s);g.set(t.getBytes(),0),g.set(d.getBytes(),n);const p=Math.ceil(n/u),f=u-1,w=Math.floor(n/u),b=w-1,m=o-w;let v=new Uint8Array(g.length);let y=0;for(let t=0;t<w;t++)for(let e=0;e<u;e++)v[e*p+t]=g[y++];for(let t=0;t<m;t++)v[w+t*p]=g[y++];return v}drawFunctionPatterns(){for(let t=0;t<7;t++)this.setModuleChecked(t,0,!0),this.setModuleChecked(0,t,!0),this.setModuleChecked(this.size-1-t,0,!0),this.setModuleChecked(0,this.size-1-t,!0),this.setModuleChecked(t,this.size-1,!0),this.setModuleChecked(this.size-1,t,!0);for(let t=0;t<8;t++)this.setModuleChecked(t,7,!1),this.setModuleChecked(7,t,!1),this.setModuleChecked(this.size-8+t,7,!1),this.setModuleChecked(7,this.size-8+t,!1);if(this.version>1){const t=d[this.version];for(let e=0;e<t.length;e++)for(let n=0;n<t.length;n++){const i=t[e],s=t[n];0==e&&0==n||e==t.length-1&&0==n||0==e&&n==t.length-1||this.drawAlignmentPattern(i,s)}}this.drawTimingPatterns(),this.drawDarkModule()}drawFormatBits(t){const e=this.errorCorrectionLevel.formatBits<<3|t;let n=e;for(let t=0;t<10;t++)n=n<<1^1335*(n>>>9);const i=21522^(e<<10|n);for(let t=0;t<15;t++){const e=(i>>>t&1)==1;let s,o;t<6?s=t:t<8?s=t+1:s=this.size-15+t,t<8?o=8:o=this.size-8+t-15;const a=8,c=this.size-1-t;t<8&&(this.setModule(a,c,e),this.setModule(c,a,e)),t<6?this.setModule(t,8,e):6==t?this.setModule(7,8,e):7==t?this.setModule(8,7,e):this.setModule(8,this.size-7+t-8,e),this.setModule(this.size-8,t<8?t:t-7,e)}}drawVersion(){if(this.version<7)return;let t=this.version;for(let e=0;e<12;e++)t=t<<1^7973*(t>>>11);const e=this.version<<12|t;for(let t=0;t<18;t++){const n=(e>>>t&1)==1,i=this.size-11+t%3,s=Math.floor(t/3);this.setModule(i,s,n),this.setModule(s,i,n)}}drawAlignmentPattern(t,e){for(let n=-2;n<=2;n++)for(let i=-2;i<=2;i++)this.setModuleChecked(t+i,e+n,1!=Math.max(Math.abs(n),Math.abs(i)))}drawTimingPatterns(){for(let t=8;t<this.size-8;t++){const e=t%2==0;this.setModuleChecked(6,t,e),this.setModuleChecked(t,6,e)}}drawDarkModule(){this.setModuleChecked(8,4*this.version+9,!0)}drawCodewords(t){let e=this.size-1,n=this.size-1,i=0,s=-1;for(let o=0;o<t.length;o++){const a=o%2==0;let c=Math.floor(o/2);for(let o=0;o<8;o++){const u=a?7-o:o,l=t[c]>>>u&1;let h=!1;for(;;){if(!this.isFunction[n][e]&&(this.setModule(e,n,1==l),h=!0),e--,h)break;if(e+=i>0?1:-1,n+=s,0>e||e>=this.size||0>n||n>=this.size){do{if(e-=i>0?1:-1,n-=s,s*=-1,0>n||n>=this.size)return;e+=i>0?1:-1,n+=s}while(0>e||e>=this.size||0>n||n>=this.size)}if(!this.isFunction[n][e])break}c>>=1}}}drawCanvas(t,e,n){if("string"==typeof n&&(n=document.getElementById(n)),!n)throw"Element not found";const i=n.getContext("2d"),s=this.size+2*e,o=t*(this.size+2*e);n.width=o,n.height=o;for(let r=0;r<s;r++)for(let a=0;a<s;a++)i.fillStyle=this.getModule(a-e,r-e)?"#000000":"#ffffff",i.fillRect(a*t,r*t,t,t)}}function o(t,e,n){switch(t){case 0:return(e+n)%2==0;case 1:return n%2==0;case 2:return e%3==0;case 3:return(e+n)%3==0;case 4:return(Math.floor(e/3)+Math.floor(n/2))%2==0;case 5:return e*n%2+e*n%3==0;case 6:return(e*n%2+e*n%3)%2==0;case 7:return(e*n%3+(e+n)%2)%2==0;default:throw RangeError("Invalid mask pattern")}}class n{constructor(t,e,n=void 0){if(t instanceof n){this.data=t.data.slice(),this.mode=t.mode}else if("string"==typeof t)if(null!=n)this.data=n.encode(t),this.mode=n;else{const e=g.from(t);this.data=e.text.slice(),this.mode=e.mode}else if(t instanceof Uint8Array)this.data=t.slice(),this.mode=p.BYTE;else{if(!Array.isArray(t))throw TypeError("Invalid argument");this.data=t.slice(),this.mode=e}if(null!=this.mode){this.bitLength=this.data.length*(this.mode==p.KANJI?13:8)}else{let t=0;for(const e of this.data)t+=e.bitLength;this.bitLength=t}this.getBytes=function(){return new Uint8Array(this.data)}}}const i=[[1,19,16,13],[1,34,28,22],[1,55,44,34],[1,80,64,48],[1,108,86,62],[1,136,108,76],[1,156,124,88],[1,180,144,100],[1,213,171,119],[1,251,203,141],[1,300,241,165],[1,331,265,185],[1,385,309,211],[1,425,341,235],[1,458,368,254],[1,520,416,288],[1,586,470,326],[1,644,516,364],[1,718,576,394],[1,792,632,428],[1,858,686,462],[1,929,741,501],[1,1003,803,543],[1,1091,871,589],[1,1171,935,627],[1,1273,1017,677],[1,1367,1091,729],[1,1465,1169,785],[1,1528,1228,820],[1,1628,1308,876],[1,1732,1392,932],[1,1840,1480,992],[1,1952,1568,1056],[1,2068,1660,1124],[1,2188,1756,1196],[1,2303,1843,1263],[1,2431,1945,1335],[1,2563,2051,1411],[1,2699,2159,1491],[1,2809,2249,1575]],a=[[1,10,7,17],[1,16,10,28],[1,26,15,44],[1,36,20,64],[1,48,26,86],[1,60,32,108],[1,72,38,124],[1,80,44,144],[1,97,53,171],[1,112,62,203],[1,120,68,241],[1,132,74,265],[1,150,82,309],[1,168,90,341],[1,180,96,368],[1,196,104,416],[1,224,114,470],[1,224,124,516],[1,240,136,576],[1,256,144,632],[1,288,154,686],[1,288,164,741],[1,320,174,803],[1,336,186,871],[1,360,198,935],[1,390,210,1017],[1,420,222,1091],[1,450,236,1169],[1,480,252,1228],[1,510,270,1308],[1,540,288,1392],[1,570,306,1480],[1,600,324,1568],[1,630,342,1660],[1,660,362,1756],[1,720,382,1843],[1,750,402,1945],[1,780,422,2051],[1,810,442,2159],[1,870,464,2249]],c=[[1,26,19,13],[1,44,34,22],[1,70,55,34],[1,100,80,48],[1,134,108,62],[1,162,136,76],[1,180,156,88],[1,206,180,100],[1,242,213,119],[1,292,251,141],[1,332,300,165],[1,356,331,185],[1,416,385,211],[1,460,425,235],[1,496,458,254],[1,556,520,288],[1,620,586,326],[1,664,644,364],[1,732,718,394],[1,784,792,428],[1,848,858,462],[1,912,929,501],[1,988,1003,543],[1,1056,1091,589],[1,1128,1171,627],[1,1200,1273,677],[1,1264,1367,729],[1,1360,1465,785],[1,1420,1528,820],[1,1518,1628,876],[1,1610,1732,932],[1,1708,1840,992],[1,1812,1952,1056],[1,1914,2068,1124],[1,1984,2188,1196],[1,2102,2303,1263],[1,2220,2431,1335],[1,2344,2563,1411],[1,2472,2699,1491],[1,2604,2809,1575]],l=[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,2,1,1],[1,2,1,1],[1,2,2,1],[1,2,2,1],[1,2,2,1],[1,2,2,1],[1,2,2,1],[1,2,2,1],[1,2,2,2],[1,2,2,2],[1,2,2,2],[1,4,2,2],[1,4,2,2],[1,4,2,2],[1,3,2,2],[1,4,2,2],[1,4,2,2],[1,4,2,2],[1,4,2,2],[1,4,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,5,2,2],[1,6,2,2]];class h{constructor(t,e=void 0){if(t instanceof h){this.coeffs=t.coeffs.slice();return}if(e)if(e.length>t)this.coeffs=e.slice();else{this.coeffs=new Uint8Array(t);for(let n=0;n<e.length;n++)this.coeffs[n]=e[n]}else this.coeffs=new Uint8Array(t)}get degree(){return this.coeffs.length-1}get(t){return this.coeffs[t]}static multiply(t,e){const n=new h(t.degree+e.degree+1);for(let i=0;i<=t.degree;i++)for(let s=0;s<=e.degree;s++)n.coeffs[i+s]^=u.multiply(t.coeffs[i],e.coeffs[s]);return n}static remainder(t,e){const n=new h(t.coeffs);for(let i=0;i<=t.degree-e.degree;i++){const s=u.reciprocal(e.coeffs[e.degree]),o=u.multiply(n.coeffs[n.degree-i],s);for(let t=0;t<=e.degree;t++)n.coeffs[n.degree-i-t]^=u.multiply(e.coeffs[e.degree-t],o)}return n}static generate(t){const e=new h(1);for(let n=0;n<t.degree;n++)e.coeffs[n]=u.EXP_LOG_TABLE[n];let n=new h(2,[1,1]);for(let i=0;i<t.degree;i++)n=h.multiply(n,new h(2,[1,u.exp(i)]));return h.remainder(t,n)}}const d=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]];class g{constructor(t,e,n){this.modeBits=t,this.numBitsCharCount=e,this.displayName=n}charCountBits(t){return this.numBitsCharCount[Math.floor((t+7)/17)]}static from(t){if(t.match(/^[0-9]*$/))return new n(t,p.NUMERIC);if(t.match(/^[A-Z0-9 $%*+.\/:-]*$/))return new n(t,p.ALPHANUMERIC);{let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i>=20480&&i<=22527?e++:i>=33088&&i<=40959?e++:e+=2}return new n(new Uint8Array(e*2),p.KANJI)}return new n(t,p.BYTE)}}const u={EXP_LOG_TABLE:(()=>{const t=new Uint8Array(512);let e=1;for(let n=0;n<255;n++)t[n]=e,t[n+255]=n,e<<=1,256&e&&(e^=285);for(let n=255;n<512;n++)t[n]=t[n-255];return t})(),exp:t=>u.EXP_LOG_TABLE[t],log:t=>{if(0==t)throw"Log of zero";return u.EXP_LOG_TABLE[t+255]},reciprocal:t=>{if(0==t)throw"Division by zero";return u.EXP_LOG_TABLE[255-u.log(t)]},multiply:(t,e)=>0==t||0==e?0:u.exp((u.log(t)+u.log(e))%255)};t.QrCode=r,t.QrSegment=n;const p={NUMERIC:new g(1,3,"Numeric"),ALPHANUMERIC:new g(2,3,"Alphanumeric"),BYTE:new g(4,3,"Byte"),KANJI:new g(8,3,"Kanji"),ECI:new g(7,0,"ECI")};t.Mode=p,t.Ecc=class{constructor(t,e,n){this.ordinal=t,this.formatBits=e,this.displayName=n}};const f=t.Ecc;return f.LOW=new f(0,1,"L"),f.MEDIUM=new f(1,0,"M"),f.QUARTILE=new f(2,3,"Q"),f.HIGH=new f(3,2,"H"),t}();

// Main application script
document.addEventListener('DOMContentLoaded', () => {
    // --- MASTER TOOL LIST (100 Tools) ---
    const tools = [
        {id:'imageConverter',name:'Image Converter',description:'Convert images between JPG, PNG, and WEBP formats.',category:'Image & Media Tools',tags:['image','media','converter','jpg','png','webp','format']},
        {id:'imageCompressor',name:'Image Compressor',description:'Reduce image file size with quality settings.',category:'Image & Media Tools',tags:['image','media','compress','reduce','size','quality','jpeg']},
        {id:'imageCropper',name:'Image Cropper',description:'Upload, crop, and export a section of an image.',category:'Image & Media Tools',tags:['image','media','crop','edit','cut']},
        {id:'imgToBase64',name:'Image to Base64',description:'Encode an image file into a Base64 text string.',category:'Image & Media Tools',tags:['image','base64','encoder','text','string','data','developer']},
        {id:'base64ToImage',name:'Base64 to Image',description:'Decode a Base64 string to view the original image.',category:'Image & Media Tools',tags:['image','base64','decoder','viewer','data','developer']},
        {id:'ageCalculator',name:'Age Calculator',description:'Calculate age in years, months, and days.',category:'Math & Number Tools',tags:['age','date','birth','calculator','time']},
        {id:'emiCalculator',name:'EMI Calculator',description:'Calculate Equated Monthly Installment for loans.',category:'Math & Number Tools',tags:['emi','loan','interest','finance','calculator']},
        {id:'sipCalculator',name:'SIP Calculator',description:'Calculate the future value of your investments.',category:'Math & Number Tools',tags:['sip','investment','finance','future','value','calculator']},
        {id:'bmiCalculator',name:'BMI Calculator',description:'Calculate your Body Mass Index and see your category.',category:'Math & Number Tools',tags:['bmi','health','weight','height','calculator']},
        {id:'unitConverter',name:'Unit Converter',description:'Convert values between length, weight, temperature.',category:'Math & Number Tools',tags:['unit','converter','length','weight','temp','math']},
        {id:'percentageCalc',name:'Percentage Calculator',description:'Calculate percentages, tips, and fractions.',category:'Math & Number Tools',tags:['percentage','percent','math','calculator']},
        {id:'discountCalc',name:'Discount Calculator',description:'Calculate the final price after a discount.',category:'Math & Number Tools',tags:['discount','sale','price','shop','calculator']},
        {id:'lcmHcfFinder',name:'LCM & HCF Finder',description:'Find the Least Common Multiple & Highest Common Factor.',category:'Math & Number Tools',tags:['lcm','hcf','gcd','math','numbers']},
        {id:'primeChecker',name:'Prime Number Checker',description:'Check if a given number is a prime number.',category:'Math & Number Tools',tags:['prime','number','math','checker']},
        {id:'factorialCalc',name:'Factorial Calculator',description:'Calculate the factorial of a non-negative integer.',category:'Math & Number Tools',tags:['factorial','math','number','!']},
        {id:'romanConverter',name:'Roman Numeral Converter',description:'Convert between Roman numerals and numbers.',category:'Math & Number Tools',tags:['roman','numeral','converter','history','math']},
        {id:'decBinHex',name:'Decimal-Binary-Hex Converter',description:'Convert numbers between decimal, binary, and hex.',category:'Developer Tools',tags:['decimal','binary','hex','base','converter','developer']},
        {id:'randomNumGen',name:'Random Number Generator',description:'Generate a random number within a specified range.',category:'Productivity Tools',tags:['random','number','generator','rng']},
        {id:'wordCounter',name:'Word Counter',description:'Live count of words, characters, and reading time.',category:'Text & Writing Tools',tags:['word','character','count','text','writing']},
        {id:'textCaseConverter',name:'Text Case Converter',description:'Convert text to UPPERCASE, lowercase, Title Case etc.',category:'Text & Writing Tools',tags:['text','case','converter','uppercase','lowercase']},
        {id:'textReverser',name:'Text Reverser',description:'Reverse the characters or words in a string.',category:'Text & Writing Tools',tags:['text','reverse','flip','string']},
        {id:'whitespaceRemover',name:'Whitespace Remover',description:'Remove extra spaces and line breaks from text.',category:'Text & Writing Tools',tags:['text','space','whitespace','clean','format']},
        {id:'palindromeChecker',name:'Palindrome Checker',description:'Check if a word or phrase is a palindrome.',category:'Text & Writing Tools',tags:['text','palindrome','checker','reverse']},
        {id:'loremIpsum',name:'Lorem Ipsum Generator',description:'Generate placeholder text in paragraphs, sentences or words.',category:'Text & Writing Tools',tags:['lorem','ipsum','text','placeholder','generator']},
        {id:'lineRemover',name:'Duplicate Line Remover',description:'Remove duplicate lines from a list or text block.',category:'Text & Writing Tools',tags:['text','duplicate','line','remover','clean']},
        {id:'jsonFormatter',name:'JSON Formatter & Validator',description:'Paste and validate JSON with automatic formatting.',category:'Developer Tools',tags:['json','formatter','validator','code','developer','api']},
        {id:'base64Coder',name:'Base64 Encoder / Decoder',description:'Encode plain text to Base64 and vice versa.',category:'Developer Tools',tags:['base64','encoder','decoder','text','developer']},
        {id:'urlCoder',name:'URL Encoder / Decoder',description:'Encode or decode text for safe use in URLs.',category:'Developer Tools',tags:['url','encoder','decoder','percent','encoding']},
        {id:'cssBoxShadow',name:'CSS Box Shadow Generator',description:'Visually create box-shadow CSS code.',category:'Design Tools',tags:['css','box-shadow','design','developer','generator']},
        {id:'cssBorderRadius',name:'CSS Border Radius Tool',description:'Visually create border-radius CSS code.',category:'Design Tools',tags:['css','border-radius','design','developer','generator']},
        {id:'localStorageViewer',name:'LocalStorage Viewer',description:'View, edit, and delete localStorage entries for this site.',category:'Developer Tools',tags:['localstorage','browser','storage','developer','debug']},
        {id:'passwordGenerator',name:'Password Generator',description:'Create secure, random passwords with custom rules.',category:'Productivity Tools',tags:['password','security','generator','secure']},
        {id:'notepad',name:'Notepad (LocalStorage)',description:'A simple notepad that saves your text in the browser.',category:'Productivity Tools',tags:['notepad','notes','text','editor','localstorage']},
        {id:'pomodoroTimer',name:'Pomodoro Timer',description:'A timer to boost productivity using the Pomodoro Technique.',category:'Time Tools',tags:['pomodoro','timer','productivity','focus','time']},
        {id:'stopwatch',name:'Stopwatch',description:'A simple stopwatch with start, stop, reset and lap functionality.',category:'Time Tools',tags:['stopwatch','timer','time','lap']},
        {id:'qrGenerator',name:'QR Code Generator',description:'Generate a functional, downloadable QR code.',category:'Visual & Interactive Tools',tags:['qr','code','generator','image','link']},
        {id:'colorPicker',name:'Color Picker',description:'Pick a color to see its HEX, RGB, and HSL values.',category:'Design Tools',tags:['color','picker','hex','rgb','hsl','design']},
        {id:'diceRoller',name:'Dice Roller Simulator',description:'Roll one or more virtual dice.',category:'Visual & Interactive Tools',tags:['dice','roll','random','game','simulator']},
        {id:'coinFlip',name:'Coin Flip Simulator',description:'Flip a virtual coin for a random heads or tails result.',category:'Visual & Interactive Tools',tags:['coin','flip','random','heads','tails']},
        {id:'textToSpeech',name:'Text to Speech',description:'Convert text into spoken words.',category:'Image & Media Tools',tags:['text','speech','audio','voice','tts']},
        {id:'speechToText',name:'Speech to Text',description:'Convert your voice into text using the microphone.',category:'Image & Media Tools',tags:['speech','text','voice','mic','stt']},
        {id:'textDiffChecker',name:'Text Diff Checker',description:'Compare two texts and highlight the differences.',category:'Developer Tools',tags:['text','diff','compare','difference','developer']},
        {id:'countdownTimer',name:'Countdown Timer',description:'Set a timer that counts down to a specific date or time.',category:'Time Tools',tags:['countdown','timer','event','date']},
    ];
    
    const toolGrid = document.querySelector('.tool-grid');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const noResults = document.getElementById('noResults');
    const loadingMessage = document.getElementById('loadingMessage');

    loadingMessage.style.display = 'none';

    const categories = [...new Set(tools.map(tool => tool.category))].sort();
    categories.forEach(cat => {
        const option = new Option(cat, cat);
        categoryFilter.appendChild(option);
    });

    tools.sort((a, b) => a.name.localeCompare(b.name)).forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.dataset.id = tool.id; card.dataset.name = tool.name;
        card.dataset.category = tool.category; card.dataset.tags = tool.tags.join(',');
        card.innerHTML = `<span class="card-category">${tool.category}</span><h2>${tool.name}</h2><p>${tool.description}</p><button>Open Tool</button>`;
        toolGrid.appendChild(card);
        card.querySelector('button').addEventListener('click', () => openTool(tool.id, tool.name));
    });

    function filterTools() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        let visibleCount = 0;
        document.querySelectorAll('.tool-card').forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const category = card.dataset.category;
            const categoryMatch = (selectedCategory === 'All' || category === selectedCategory);
            const searchMatch = (name.includes(searchTerm) || tags.includes(searchTerm));
            if (categoryMatch && searchMatch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    searchInput.addEventListener('input', filterTools);
    categoryFilter.addEventListener('change', filterTools);
    
    closeButton.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => { if (event.target === modal) modal.style.display = 'none'; });

    function openTool(toolId, toolName) {
        // === AD CODE 2 (300x250 MODAL BANNER) YAHAN ADD KIYA GAYA HAI ===
        const adCodeForModal = `
            <div class="ad-container">
                <script type="text/javascript">
                    atOptions = {
                        'key' : 'e27b43d908bed8c11b9385723a061dfc',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                    };
                <\/script>
                <script type="text/javascript" src="//www.highperformanceformat.com/e27b43d908bed8c11b9385723a061dfc/invoke.js"><\/script>
            </div>
        `;
        // ================================================================

        modalBody.innerHTML = `<h2>${toolName}</h2>` 
                            + (toolImplementations[toolId]?.html || `<div class="status">This tool is under development.</div>`)
                            + adCodeForModal;

        modal.style.display = 'block';
        if (toolImplementations[toolId]?.attach) {
            toolImplementations[toolId].attach();
        }
    }
    
    // --- TOOL IMPLEMENTATIONS (SABHI TOOLS KA CODE) ---
    const toolImplementations = {
        imageConverter: {
            html: `<p>Upload image to convert</p><input type="file" id="fileInput" accept="image/*"><select id="formatSelect"><option value="png">PNG</option><option value="jpeg">JPEG</option><option value="webp">WEBP</option></select><div class="status"></div><div class="result"></div>`,
            attach: () => {
                const fileInput = document.getElementById('fileInput'), formatSelect = document.getElementById('formatSelect');
                const convert = () => {
                    const file = fileInput.files[0]; if (!file) return;
                    const format = formatSelect.value, status = modalBody.querySelector('.status'), result = modalBody.querySelector('.result');
                    status.textContent = 'Processing...';
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width; canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            const dataUrl = canvas.toDataURL(`image/${format}`);
                            const link = document.createElement('a');
                            link.href = dataUrl; link.download = `converted.${format}`;
                            link.textContent = `Download Converted Image (${format.toUpperCase()})`;
                            result.innerHTML = ''; result.appendChild(link);
                            status.textContent = 'Conversion successful!';
                        };
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                };
                fileInput.onchange = convert;
                formatSelect.onchange = convert;
            }
        },
        imageCompressor: {
            html: `<p>Upload an image to compress.</p><input type="file" id="fileInput" accept="image/jpeg,image/png"><label>Quality (0.1 to 1.0):</label><input type="range" id="quality" min="0.1" max="1.0" value="0.7" step="0.1"><div class="status"></div><div class="result"></div>`,
            attach: () => {
                 const fileInput = document.getElementById('fileInput'), qualityInput = document.getElementById('quality');
                 const compress = () => {
                     const file = fileInput.files[0]; if (!file) return;
                     const quality = parseFloat(qualityInput.value), status = modalBody.querySelector('.status'), result = modalBody.querySelector('.result');
                     status.textContent = 'Compressing...';
                     const reader = new FileReader();
                     reader.onload = (event) => {
                         const img = new Image();
                         img.onload = () => {
                             const canvas = document.createElement('canvas');
                             canvas.width = img.width; canvas.height = img.height;
                             const ctx = canvas.getContext('2d');
                             ctx.drawImage(img, 0, 0);
                             const dataUrl = canvas.toDataURL('image/jpeg', quality);
                             const originalSize = (file.size / 1024).toFixed(2);
                             const compressedSize = (dataUrl.length * 0.75 / 1024).toFixed(2);
                             const link = document.createElement('a');
                             link.href = dataUrl; link.download = `compressed.jpg`;
                             link.innerHTML = `Download Compressed Image<br><small>(Original: ${originalSize} KB, Compressed: ~${compressedSize} KB)</small>`;
                             result.innerHTML = ''; result.appendChild(link);
                             status.textContent = 'Compression successful!';
                         };
                         img.src = event.target.result;
                     };
                     reader.readAsDataURL(file);
                 }
                 fileInput.onchange = compress;
                 qualityInput.onchange = compress;
            }
        },
        imgToBase64: {
            html: `<p>Select an image to encode into a Base64 string.</p><input type="file" id="fileInput" accept="image/*"><div class="status"></div><textarea class="result" rows="6" readonly placeholder="Base64 output will appear here..."></textarea>`,
            attach: () => {
                document.getElementById('fileInput').onchange = (e) => {
                    const file = e.target.files[0]; if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => { modalBody.querySelector('.result').value = event.target.result; };
                    reader.readAsDataURL(file);
                };
            }
        },
        base64ToImage: {
            html: `<p>Paste a Base64 image string below to view it.</p><textarea id="base64Input" rows="6" placeholder="data:image/png;base64,iVBORw0KGgo..."></textarea><button id="viewBtn">View Image</button><div class="result"><img id="imgOutput" style="max-width:100%; border-radius: 5px; margin-top:1rem;"/></div>`,
            attach: () => {
                document.getElementById('viewBtn').onclick = () => {
                    try {
                        const b64 = document.getElementById('base64Input').value;
                        if(!b64.startsWith('data:image')) throw new Error("Invalid Base64 image string.");
                        document.getElementById('imgOutput').src = b64;
                    } catch(e) {
                        alert(e.message);
                    }
                };
            }
        },
        ageCalculator: {
            html: `<input type="date" id="dob"><button id="btn">Calculate</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const dob = new Date(document.getElementById('dob').value); const resultDiv = modalBody.querySelector('.result');
                    if(isNaN(dob.getTime())) { resultDiv.innerText = "Please select a valid date."; return; }
                    const today = new Date(); let years = today.getFullYear() - dob.getFullYear();
                    let months = today.getMonth() - dob.getMonth(); let days = today.getDate() - dob.getDate();
                    if (months < 0 || (months === 0 && days < 0)) years--;
                    if (days < 0) { let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += prevMonth.getDate(); months--; }
                    if (months < 0) months += 12;
                    resultDiv.innerText = `You are ${years} years, ${months} months, and ${days} days old.`;
                };
            }
        },
        emiCalculator: {
            html: `<input type="number" id="p" placeholder="Loan Amount"><input type="number" id="r" placeholder="Annual Interest Rate (%)"><input type="number" id="n" placeholder="Loan Tenure (Years)"><button id="btn">Calculate</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const p = parseFloat(document.getElementById('p').value), r = parseFloat(document.getElementById('r').value) / 100 / 12, n = parseFloat(document.getElementById('n').value) * 12, resultDiv = modalBody.querySelector('.result');
                    if(p>0 && r>0 && n>0){
                        const emi = (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
                        resultDiv.innerHTML = `Monthly EMI: <strong>${emi.toFixed(2)}</strong><br>Total Interest: <strong>${((emi*n)-p).toFixed(2)}</strong><br>Total Payment: <strong>${(emi*n).toFixed(2)}</strong>`;
                    } else { resultDiv.innerText = 'Please enter valid values.'; }
                }
            }
        },
        bmiCalculator: {
            html: `<input type="number" id="h" placeholder="Height (cm)"><input type="number" id="w" placeholder="Weight (kg)"><button id="btn">Calculate</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const h = parseFloat(document.getElementById('h').value), w = parseFloat(document.getElementById('w').value), resultDiv = modalBody.querySelector('.result');
                    if (h > 0 && w > 0) {
                        const bmi = (w / ((h / 100) ** 2)).toFixed(2);
                        let category = bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal weight' : bmi < 29.9 ? 'Overweight' : 'Obesity';
                        resultDiv.innerText = `Your BMI is ${bmi} (${category}).`;
                    } else { resultDiv.innerText = 'Please enter valid height and weight.'; }
                };
            }
        },
        percentageCalc: {
            html: `<input type="number" id="val1" placeholder="What is"> % of <input type="number" id="val2" placeholder="this number?"><button id="btn">Calculate</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const val1 = parseFloat(document.getElementById('val1').value), val2 = parseFloat(document.getElementById('val2').value);
                    if (!isNaN(val1) && !isNaN(val2)) {
                        modalBody.querySelector('.result').innerText = `Result: ${((val1 / 100) * val2).toFixed(2)}`;
                    } else { modalBody.querySelector('.result').innerText = 'Please enter valid numbers.'; }
                };
            }
        },
        primeChecker: {
            html: `<input type="number" id="num" placeholder="Enter a number"><button id="btn">Check</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const n = parseInt(document.getElementById('num').value), result = modalBody.querySelector('.result');
                    if(isNaN(n) || n < 2) { result.innerText = "Please enter a number greater than 1."; return; }
                    let isPrime = true;
                    for(let i = 2, s = Math.sqrt(n); i <= s; i++) if(n % i === 0) { isPrime = false; break; }
                    result.innerText = `${n} is ${isPrime ? '' : 'not '}a prime number.`;
                }
            }
        },
        factorialCalc: {
            html: `<input type="number" id="num" placeholder="Enter a non-negative integer"><button id="btn">Calculate Factorial</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    let n = parseInt(document.getElementById('num').value);
                    if(isNaN(n) || n < 0) { modalBody.querySelector('.result').innerText = "Please enter a non-negative integer."; return; }
                    if(n > 170) { modalBody.querySelector('.result').innerText = "Input too large, result is Infinity."; return; }
                    let result = 1;
                    for(let i=2; i<=n; i++) result *= i;
                    modalBody.querySelector('.result').innerText = `Factorial of ${n} is ${n > 20 ? result.toExponential(2) : result}`;
                };
            }
        },
        wordCounter: {
            html: `<textarea id="textInput" placeholder="Paste text here..." rows="8"></textarea><div class="result">Words: <strong>0</strong> | Chars: <strong>0</strong> | Reading Time: ~0.0 min</div>`,
            attach: () => {
                document.getElementById('textInput').oninput = (e) => {
                    const text = e.target.value;
                    const words = text.match(/\b\w+\b/g)?.length || 0;
                    const readTime = (words / 200).toFixed(1);
                    modalBody.querySelector('.result').innerHTML = `Words: <strong>${words}</strong> | Chars: <strong>${text.length}</strong> | Reading Time: ~${readTime} min`;
                };
            }
        },
        textCaseConverter: {
            html: `<textarea id="textInput" rows="6" placeholder="Enter text..."></textarea><select id="caseType"><option value="upper">UPPERCASE</option><option value="lower">lowercase</option><option value="title">Title Case</option><option value="sentence">Sentence case</option></select><button id="btn">Convert</button>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const text = document.getElementById('textInput');
                    const type = document.getElementById('caseType').value;
                    if(type === 'upper') text.value = text.value.toUpperCase();
                    else if(type === 'lower') text.value = text.value.toLowerCase();
                    else if(type === 'title') text.value = text.value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
                    else if(type === 'sentence') text.value = text.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                }
            }
        },
        textReverser: {
             html: `<textarea id="textInput" rows="6" placeholder="Enter text..."></textarea><button id="btn">Reverse Text</button>`,
             attach: () => {
                 document.getElementById('btn').onclick = () => {
                     document.getElementById('textInput').value = document.getElementById('textInput').value.split('').reverse().join('');
                 };
             }
        },
        whitespaceRemover: {
            html: `<textarea id="textInput" rows="6" placeholder="Paste text with extra spaces..."></textarea><button id="btn">Remove Extra Whitespace</button>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    document.getElementById('textInput').value = document.getElementById('textInput').value.replace(/\s+/g, ' ').trim();
                };
            }
        },
        palindromeChecker: {
            html: `<input id="textInput" placeholder="Enter a word or phrase"><button id="btn">Check</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const rawInput = document.getElementById('textInput').value;
                    const input = rawInput.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if(!input) return;
                    const isPalindrome = input === input.split('').reverse().join('');
                    modalBody.querySelector('.result').innerText = `"${rawInput}" is ${isPalindrome ? '' : 'not '}a palindrome.`;
                }
            }
        },
        loremIpsum: {
             html: `<p>Generate how many paragraphs?</p><input type="number" id="num" value="3"><button id="btn">Generate</button><div class="result" style="max-height: 200px; overflow-y:auto;"></div>`,
             attach: () => {
                 document.getElementById('btn').onclick = () => {
                     const n = parseInt(document.getElementById('num').value) || 1;
                     const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                     modalBody.querySelector('.result').innerHTML = Array(n).fill(`<p>${lorem}</p>`).join('');
                 };
             }
        },
        jsonFormatter: {
            html: `<textarea id="jsonInput" placeholder="Paste JSON here..." rows="8"></textarea><button id="btn">Format & Validate</button><div class="result"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const input = document.getElementById('jsonInput'), result = modalBody.querySelector('.result');
                    try {
                        input.value = JSON.stringify(JSON.parse(input.value), null, 4);
                        result.innerHTML = `<span style="color: var(--success-color);">✓ Valid JSON & Formatted</span>`;
                    } catch (e) {
                        result.innerHTML = `<span style="color: var(--error-color);">✗ Invalid JSON: ${e.message}</span>`;
                    }
                }
            }
        },
        base64Coder: {
            html: `<textarea id="textInput" rows="6" placeholder="Enter text or Base64..."></textarea><button id="encBtn">Encode to Base64</button><button id="decBtn">Decode from Base64</button><div class="result"></div>`,
            attach: () => {
                const input = document.getElementById('textInput'), result = modalBody.querySelector('.result');
                document.getElementById('encBtn').onclick = () => { try { result.innerText = btoa(input.value); } catch (e) { result.innerText = "Error: Invalid character for encoding."; } };
                document.getElementById('decBtn').onclick = () => { try { result.innerText = atob(input.value); } catch (e) { result.innerText = "Error: Invalid Base64 string."; } };
            }
        },
        urlCoder: {
            html: `<textarea id="textInput" rows="6" placeholder="Enter text or URL component..."></textarea><button id="encBtn">Encode</button><button id="decBtn">Decode</button><div class="result"></div>`,
            attach: () => {
                const input = document.getElementById('textInput'), result = modalBody.querySelector('.result');
                document.getElementById('encBtn').onclick = () => { result.innerText = encodeURIComponent(input.value); };
                document.getElementById('decBtn').onclick = () => { try { result.innerText = decodeURIComponent(input.value); } catch(e) { result.innerText = "Error: Invalid URL component."}};
            }
        },
        cssBoxShadow: {
            html: `<div style="display:flex; gap:1rem; align-items:center; margin-bottom: 1rem;"><div id="preview" style="width:100px; height:100px; background:var(--accent-color); border-radius:10px; transition: all 0.2s;"></div><textarea id="cssOutput" rows="4" readonly style="flex:1;"></textarea></div><label>Horizontal Offset</label><input type="range" id="h" min="-50" max="50" value="10"><label>Vertical Offset</label><input type="range" id="v" min="-50" max="50" value="10"><label>Blur Radius</label><input type="range" id="b" min="0" max="100" value="15"><label>Spread Radius</label><input type="range" id="s" min="-50" max="50" value="5"><label>Shadow Color</label><input type="color" id="c" value="#000000">`,
            attach: () => {
                const preview = document.getElementById('preview'), output = document.getElementById('cssOutput');
                const inputs = ['h','v','b','s','c'];
                const updateShadow = () => {
                    const h = document.getElementById('h').value + 'px'; const v = document.getElementById('v').value + 'px';
                    const b = document.getElementById('b').value + 'px'; const s = document.getElementById('s').value + 'px';
                    const c = document.getElementById('c').value;
                    const shadow = `${h} ${v} ${b} ${s} ${c}`;
                    preview.style.boxShadow = shadow;
                    output.value = `box-shadow: ${shadow};`;
                }
                inputs.forEach(id => document.getElementById(id).addEventListener('input', updateShadow));
                updateShadow();
            }
        },
        passwordGenerator: {
            html: `<div class="result" id="passResult" style="text-align:center; font-weight:bold; letter-spacing: 1px;">Click Generate</div><label>Password Length: <span id="lenLabel">16</span></label><input type="range" id="passLength" min="8" max="64" value="16"><div class="checkbox-group"><label><input type="checkbox" id="incSymbols" checked> Symbols</label><label><input type="checkbox" id="incNumbers" checked> Numbers</label><label><input type="checkbox" id="incUpper" checked> Uppercase</label></div><button id="btn">Generate</button>`,
            attach: () => {
                const passResult = document.getElementById('passResult');
                const passLength = document.getElementById('passLength');
                const lenLabel = document.getElementById('lenLabel');
                const generate = () => {
                    const len = passLength.value;
                    const symbols = document.getElementById('incSymbols').checked;
                    const numbers = document.getElementById('incNumbers').checked;
                    const upper = document.getElementById('incUpper').checked;
                    const chars_lower = "abcdefghijklmnopqrstuvwxyz";
                    const chars_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    const numChars = "0123456789";
                    const symChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
                    let allChars = chars_lower;
                    if(upper) allChars += chars_upper;
                    if(numbers) allChars += numChars;
                    if(symbols) allChars += symChars;
                    if(!allChars) { passResult.innerText = "Please select at least one character type."; return; }
                    let password = "";
                    for (let i = 0; i < len; i++) password += allChars.charAt(Math.floor(Math.random() * allChars.length));
                    passResult.innerText = password;
                };
                passLength.oninput = () => { lenLabel.innerText = passLength.value; };
                document.getElementById('btn').onclick = generate;
                generate();
            }
        },
        notepad: {
            html: `<textarea id="notepadArea" rows="10" placeholder="Your text here is saved automatically..."></textarea><button id="clearBtn">Clear Notepad</button>`,
            attach: () => {
                const area = document.getElementById('notepadArea');
                area.value = localStorage.getItem('multiToolHubNotepad') || '';
                area.oninput = () => localStorage.setItem('multiToolHubNotepad', area.value);
                document.getElementById('clearBtn').onclick = () => {
                    if(confirm('Are you sure you want to clear the notepad? This cannot be undone.')) {
                        area.value = ''; localStorage.removeItem('multiToolHubNotepad');
                    }
                }
            }
        },
        pomodoroTimer: {
            html: `<div style="font-size:3rem; text-align:center;" id="timerDisplay">25:00</div><div style="display:flex; gap:10px;"><button id="start">Focus (25m)</button><button id="short">Short Break (5m)</button><button id="long">Long Break (15m)</button></div><button id="stop">Stop & Reset</button>`,
            attach: () => {
                let interval, timeLeft;
                const display = document.getElementById('timerDisplay');
                const setTime = (minutes) => {
                    clearInterval(interval);
                    timeLeft = minutes * 60;
                    const mins = Math.floor(timeLeft / 60); const secs = timeLeft % 60;
                    display.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
                };
                const startTimer = () => {
                    clearInterval(interval);
                    interval = setInterval(() => {
                        timeLeft--;
                        const mins = Math.floor(timeLeft / 60); const secs = timeLeft % 60;
                        display.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
                        if(timeLeft <= 0) { clearInterval(interval); alert("Time's up!"); document.title = "Time's Up!"; }
                        else { document.title = display.textContent; }
                    }, 1000);
                };
                document.getElementById('start').onclick = () => { setTime(25); startTimer(); };
                document.getElementById('short').onclick = () => { setTime(5); startTimer(); };
                document.getElementById('long').onclick = () => { setTime(15); startTimer(); };
                document.getElementById('stop').onclick = () => { setTime(25); document.title = "Multi Tool Hub"; };
                setTime(25);
            }
        },
        stopwatch: {
             html: `<div style="font-size:3rem; text-align:center;" id="display">00:00:00.000</div><div style="display:flex; gap:10px;"><button id="start">Start</button><button id="stop">Stop</button><button id="reset">Reset</button><button id="lap">Lap</button></div><div class="result" id="laps" style="max-height: 150px; overflow-y: auto;"></div>`,
             attach: () => {
                let timer, startTime, elapsedTime = 0, running = false;
                const display = document.getElementById('display'), laps = document.getElementById('laps');
                const formatTime = ms => new Date(ms).toISOString().substr(11, 12);
                document.getElementById('start').onclick = () => {
                    if (!running) { startTime = Date.now() - elapsedTime; timer = setInterval(() => { elapsedTime = Date.now() - startTime; display.innerText = formatTime(elapsedTime); }, 10); running = true; }
                };
                document.getElementById('stop').onclick = () => { if (running) { clearInterval(timer); running = false; } };
                document.getElementById('reset').onclick = () => { clearInterval(timer); running = false; elapsedTime = 0; display.innerText = '00:00:00.000'; laps.innerHTML = ''; };
                document.getElementById('lap').onclick = () => { if (running) laps.innerHTML += `<div>Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}</div>`; };
             }
        },
        qrGenerator: {
            html: `<input type="text" id="qrText" placeholder="Enter text or URL"><button id="btn">Generate QR Code</button><div class="result" style="text-align:center; margin-top:1rem;"><canvas id="qrCanvas" style="display:none; background:white; padding:10px; border-radius:5px;"></canvas></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const text = document.getElementById('qrText').value, resultDiv = modalBody.querySelector('.result');
                    resultDiv.innerHTML = '<canvas id="qrCanvas" style="display:none; background:white; padding:10px; border-radius:5px;"></canvas>';
                    const newCanvas = document.getElementById('qrCanvas');
                    if (!text) { resultDiv.innerText = "Please enter text to generate a QR code."; return; }
                    try {
                        const qr = qrcodegen.QrCode.encodeText(text, qrcodegen.QrCode.Ecc.MEDIUM);
                        qr.drawCanvas(5, 4, newCanvas);
                        newCanvas.style.display = 'inline-block';
                        const link = document.createElement('a');
                        link.href = newCanvas.toDataURL('image/png'); link.download = 'qrcode.png';
                        link.textContent = 'Download PNG'; link.style="display:block; margin-top:1rem;";
                        resultDiv.appendChild(link);
                    } catch (e) { resultDiv.innerText = `Error: ${e.message}`; }
                };
            }
        },
        colorPicker: {
            html: `<div style="display:flex; justify-content:center; align-items:center; gap: 2rem;"><input type="color" id="colorInput" value="#FFD700" style="width:100px; height:100px; border:none; padding:0; border-radius:50%;"><div class="result" id="colorResult" style="margin-top:0;"></div></div>`,
            attach: () => {
                const colorInput = document.getElementById('colorInput'); const colorResult = document.getElementById('colorResult');
                const updateColor = () => {
                    const hex = colorInput.value.toUpperCase();
                    const r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16);
                    colorResult.innerHTML = `<strong>HEX:</strong> ${hex}<br><strong>RGB:</strong> ${r}, ${g}, ${b}`;
                };
                colorInput.oninput = updateColor;
                updateColor();
            }
        },
        diceRoller: {
            html: `<p>How many dice to roll?</p><input type="number" id="num" value="2" min="1" max="100"><button id="btn">Roll Dice</button><div class="result" style="font-size: 2rem; text-align:center; letter-spacing: 10px;"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const n = parseInt(document.getElementById('num').value) || 1;
                    let rolls = '';
                    for(let i=0; i<n; i++) rolls += Math.floor(Math.random() * 6) + 1 + ' ';
                    modalBody.querySelector('.result').innerText = rolls.trim();
                };
            }
        },
        coinFlip: {
            html: `<button id="btn">Flip Coin</button><div class="result" style="font-size: 2rem; text-align:center;"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                     modalBody.querySelector('.result').innerText = Math.random() < 0.5 ? 'Heads' : 'Tails';
                };
            }
        },
        textToSpeech: {
            html: `<textarea id="ttsInput" placeholder="Enter text to speak..." rows="6"></textarea><button id="btn">Speak</button><div class="status"></div>`,
            attach: () => {
                const status = modalBody.querySelector('.status');
                if('speechSynthesis' in window) {
                    document.getElementById('btn').onclick = () => {
                        const text = document.getElementById('ttsInput').value;
                        if(text) speechSynthesis.speak(new SpeechSynthesisUtterance(text));
                    };
                } else { status.innerText = 'Text-to-Speech not supported in this browser.'; }
            }
        },
        speechToText: {
            html: `<button id="btn">Start Listening</button><div class="status"></div><div class="result"></div>`,
            attach: () => {
                const btn = document.getElementById('btn'), status = modalBody.querySelector('.status'), result = modalBody.querySelector('.result');
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if(SpeechRecognition) {
                    const recognition = new SpeechRecognition();
                    recognition.onstart = () => { btn.innerText = "Stop Listening"; status.innerText = "Listening..."; };
                    recognition.onend = () => { btn.innerText = "Start Listening"; status.innerText = ""; };
                    recognition.onresult = (event) => { result.innerText = event.results[0][0].transcript; };
                    btn.onclick = () => {
                        if (btn.innerText === "Start Listening") recognition.start();
                        else recognition.stop();
                    };
                } else { status.innerText = 'Speech-to-Text not supported in this browser.'; btn.disabled = true; }
            }
        },
        textDiffChecker: {
            html: `<div style="display:flex; gap:1rem;"><textarea id="text1" rows="8" style="flex:1;" placeholder="Original text"></textarea><textarea id="text2" rows="8" style="flex:1;" placeholder="Changed text"></textarea></div><button id="btn">Compare Texts</button><div class="result" id="diffOutput"></div>`,
            attach: () => {
                document.getElementById('btn').onclick = () => {
                    const text1 = document.getElementById('text1').value.split(/\r?\n/);
                    const text2 = document.getElementById('text2').value.split(/\r?\n/);
                    const diffOutput = document.getElementById('diffOutput');
                    // Basic diff logic for demonstration
                    let result = '';
                    const maxLen = Math.max(text1.length, text2.length);
                    for(let i=0; i<maxLen; i++){
                        if(text1[i] !== text2[i]){
                            if(text1[i] !== undefined) result += `<del>- ${text1[i]}</del>\n`;
                            if(text2[i] !== undefined) result += `<ins>+ ${text2[i]}</ins>\n`;
                        } else {
                            if(text1[i] !== undefined) result += `  ${text1[i]}\n`;
                        }
                    }
                    diffOutput.innerHTML = result || 'No differences found.';
                }
            }
        },
        countdownTimer: {
            html: `<p>Set countdown to:</p><input type="datetime-local" id="datetime"><button id="btn">Start Countdown</button><div class="result" style="font-size:2rem; text-align:center;"></div><div class="status"></div>`,
            attach: () => {
                let interval;
                document.getElementById('btn').onclick = () => {
                    clearInterval(interval);
                    const targetDate = new Date(document.getElementById('datetime').value).getTime();
                    const result = modalBody.querySelector('.result'), status = modalBody.querySelector('.status');
                    if(isNaN(targetDate)) { status.innerText = "Please select a valid date and time."; return; }
                    status.innerText = "";

                    interval = setInterval(() => {
                        const now = new Date().getTime();
                        const distance = targetDate - now;
                        if (distance < 0) {
                            clearInterval(interval);
                            result.innerText = "EXPIRED";
                            return;
                        }
                        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        result.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    }, 1000);
                }
            }
        }
    };
});