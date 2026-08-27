const { createApp, ref, computed, onMounted, watch } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// --- MOCK DATA ---
const progettiData = [
    {
        id: 'newsletter',
        titolo: 'Newsletter intelligenti e automatizzate',
        descrizione: 'Usare agenti e automazioni Microsoft 365 per raccogliere contenuti, proporre sintesi e supportare la produzione delle newsletter interne.',
        area: 'Comunicazione',
        stato: 'in corso',
        badge: 'IN CORSO',
        badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
        obiettivoDUP: 'DA INSERIRE NEL DUP',
        responsabili: ['Nicoletta Levi'],
        categorie: ['Comunicazione interna', 'Automazione', 'Intelligenza Artificiale']
    },
    {
        id: 'riscossione',
        titolo: 'Riscossione proattiva dei tributi locali',
        descrizione: 'Intervenire prima della riscossione coattiva, migliorando la capacità dell\'Ente di accompagnare il contribuente verso la regolarizzazione.',
        area: 'Area Finanziaria',
        stato: 'in corso',
        badge: 'IN CORSO',
        badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
        obiettivoDUP: 'DA INSERIRE NEL DUP - OB. TRASVERSALE',
        responsabili: ['Roberto Lenzu'],
        categorie: ['Innovazione dei processi', 'Dati', 'Servizi al cittadino']
    },
    { id: 'm365', titolo: "Ecosistema Microsoft 365", area: "Innovazione e Digitale", responsabili: ["Andrea Bertani", "Marcello Capucci"], stato: "in corso", avanzamento: 65, descrizione: "Non solo nuovi strumenti: un nuovo modo di lavorare insieme.", categorie: ["Trasformazione", "Digitale"], dataPrevista: "2027", badge: "🔵 In corso", badgeClass: "badge-in-corso", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Ore recuperate/anno", value: "12.000", trend: "Disruptive" }, { label: "Riduzione email interne", value: "-45%", trend: "Efficienza" }, { label: "Indice Smart Working", value: "+30%", trend: "Benessere" }] },
    { id: 'reacts', titolo: "Progetto RE_ACTS", area: "Ambiente", responsabili: ["Davide Giovannini"], stato: "in sperimentazione", avanzamento: 45, descrizione: "Azioni di adattamento ai cambiamenti climatici e miglioramento della resilienza urbana.", categorie: ["Sostenibilità", "Ambiente"], dataPrevista: "2026", badge: "🟣 In sperimentazione", badgeClass: "badge-in-sperimentazione", obiettivoDUP: "DA INSERIRE NEL DUP", valorePubblico: [{ label: "Aree riqualificate", value: "3", trend: "Impatto urbano" }, { label: "Riduzione CO2", value: "-12%", trend: "Sostenibilità" }] },
    { id: 'pums', titolo: "PUMS: Mobilità Sostenibile", area: "Mobilità", responsabili: ["Paolo Gandolfi"], stato: "in corso", avanzamento: 80, descrizione: "Piano Urbano della Mobilità Sostenibile per ripensare gli spostamenti in città.", categorie: ["Mobilità", "Infrastrutture"], dataPrevista: "2027", badge: "🔵 In corso", badgeClass: "badge-in-corso", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Mobilità ciclabile", value: "+25%", trend: "Salute pubblica" }, { label: "Sinistri stradali", value: "-15%", trend: "Sicurezza" }] },
    { id: 'polizia', titolo: "Nuova Polizia di prossimità", area: "Sicurezza", responsabili: ["Italo Pasquale Enrico Rosati"], stato: "in corso", avanzamento: 30, descrizione: "Un nuovo modello di presidio del territorio e vicinanza ai cittadini.", categorie: ["Sicurezza", "Territorio"], dataPrevista: "2026", badge: "🔵 In corso", badgeClass: "badge-in-corso", obiettivoDUP: "DA INSERIRE NEL DUP", valorePubblico: [{ label: "Presidio quartieri", value: "100%", trend: "Sicurezza percepita" }, { label: "Tempi intervento", value: "-20%", trend: "Efficienza" }] },
    { id: 'welfare', titolo: "Rete Cura delle Persone e Contrasto Povertà", area: "Welfare", responsabili: ["Antonio Costantini", "Germana Corradini"], stato: "da avviare", avanzamento: 10, descrizione: "Integrazione dei servizi sociali per una risposta più efficace alle nuove fragilità.", categorie: ["Sociale", "Persone"], dataPrevista: "2027", badge: "⚪ Da avviare", badgeClass: "badge-da-avviare", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Famiglie supportate", value: "1.200", trend: "Inclusione" }, { label: "Tempi presa in carico", value: "48h", trend: "Disruptive" }] },
    { id: 'cultura', titolo: "Polo Educativo Culturale Integrato", area: "Cultura e Educazione", responsabili: ["Nando Rinaldi", "Nicoletta Levi"], stato: "in corso", avanzamento: 60, descrizione: "Sinergia tra biblioteche, musei e servizi educativi per l'infanzia.", categorie: ["Cultura", "Educazione"], dataPrevista: "2028", badge: "🔵 In corso", badgeClass: "badge-in-corso", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Nuovi iscritti", value: "+40%", trend: "Capitale Sociale" }, { label: "Eventi integrati", value: "150", trend: "Partecipazione" }] },
    { id: 'org', titolo: "Governance Partecipate", area: "Organizzazione", responsabili: ["Isabella Medicina", "Lorenza Benedetti"], stato: "realizzato", avanzamento: 100, descrizione: "Nuovo modello di analisi dei bisogni organizzativi e gestione delle partecipate.", categorie: ["Organizzazione", "Risorse Umane"], dataPrevista: "2025", badge: "🟢 Realizzato", badgeClass: "badge-realizzato", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Risparmio di spesa", value: "2M €", trend: "Efficienza" }, { label: "Performance servizi", value: "+18%", trend: "Qualità" }] },
    { id: 1, titolo: "Osservatorio Urbano", area: "Territorio", responsabili: ["Marcello Capucci", "Andrea Illari", "Irene Manzini Ceinar"], stato: "in corso", avanzamento: 72, descrizione: "Trasformare dati territoriali in conoscenza per leggere meglio la città.", categorie: ["Dati", "Territorio"], dataPrevista: "Dicembre 2026", badge: "🔵 In corso", badgeClass: "badge-in-corso", obiettivoDUP: "DA INSERIRE NEL DUP", valorePubblico: [{ label: "Dataset aperti", value: "45", trend: "Trasparenza" }, { label: "Tempi analisi", value: "-60%", trend: "Disruptive" }] },
    { id: 2, titolo: "Digital Twin di Reggio Emilia", area: "Innovazione e Digitale", responsabili: ["Andrea Bertani"], stato: "in sperimentazione", avanzamento: 40, descrizione: "Replica digitale della città per simulare impatti ambientali e urbanistici.", categorie: ["Digitale", "Dati"], dataPrevista: "Giugno 2027", badge: "🟣 In sperimentazione", badgeClass: "badge-in-sperimentazione", obiettivoDUP: "INSERITO NEL DUP", valorePubblico: [{ label: "Costi simulazione", value: "-80%", trend: "Disruptive" }, { label: "Precisione predittiva", value: "95%", trend: "Innovazione" }] }
];

const areeData = [
    { id: "dir-gen", nome: "Direzione Generale", descrizione: "Coordinamento strategico e governo complessivo dell'Ente.", progettiAttivi: 5, risultatiRecenti: 2 },
    { id: "finanza", nome: "Area Finanziaria", descrizione: "Gestione delle risorse economiche e bilancio.", progettiAttivi: 3, risultatiRecenti: 4 },
    { id: "prog-urbana", nome: "Area Progettazione Urbana Strategica", descrizione: "Progettiamo la città di domani attraverso strategie, dati e nuovi strumenti.", progettiAttivi: 8, risultatiRecenti: 3, missione: "Governare lo sviluppo del territorio integrando urbanistica, mobilità e innovazione digitale per una città più vivibile." },
    { id: "svil-sostenibile", nome: "Area Sviluppo Sostenibile", descrizione: "Transizione ecologica e politiche ambientali.", progettiAttivi: 6, risultatiRecenti: 2 },
    { id: "rigenerazione", nome: "Area Rigenerazione Urbana", descrizione: "Infrastrutture sostenibili e cura dello spazio pubblico.", progettiAttivi: 12, risultatiRecenti: 5 }
];

const videoData = [
    { id: 1, titolo: "Microsoft 365 in 3 minuti: Perché non è semplicemente un nuovo Office", durata: "3:10", thumb: "☁️" },
    { id: 2, titolo: "Teams: non è solo videoconferenza", durata: "2:45", thumb: "👥" },
    { id: 3, titolo: "Dove salvo i documenti? OneDrive, Teams o SharePoint?", durata: "2:20", thumb: "📁" },
    { id: 4, titolo: "Collaborare sullo stesso documento: Come evitare copie e allegati", durata: "1:55", thumb: "✍️" }
];

// --- COMPONENTS ---

const HomeView = {
    template: `
    <div>
        <!-- Hero Section -->
        <section class="bg-reggio-bg py-20 border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-6xl md:text-7xl font-semibold tracking-tight text-reggio-ink mb-4">Reggio Cambia</h1>
                <p class="text-3xl md:text-4xl font-medium text-gray-600 mb-6">Persone, progetti e trasformazioni del Comune di Reggio Emilia</p>
                <p class="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Scopri cosa stiamo facendo, cosa sta cambiando e come le innovazioni dell'Ente possono migliorare il nostro lavoro e la città.
                </p>
                <!-- Indicatori Hero (Il Comune che cambia, in numeri) - Spostati in alto -->
                <div class="mt-16 animate-fade-in-up" style="animation-delay: 0.2s;">
                    <h3 class="text-xl md:text-2xl font-medium text-reggio-ink mb-10 text-center">Il Comune che cambia, in numeri</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                        <div class="text-center">
                            <div class="text-5xl md:text-6xl font-light text-reggio-ink mb-3">42</div>
                            <div class="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Progetti<br>monitorati</div>
                        </div>
                        <div class="text-center">
                            <div class="text-5xl md:text-6xl font-light text-reggio-ink mb-3">18</div>
                            <div class="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Risultati<br>raggiunti</div>
                        </div>
                        <div class="text-center">
                            <div class="text-5xl md:text-6xl font-light text-reggio-ink mb-3">27</div>
                            <div class="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Servizi<br>coinvolti</div>
                        </div>
                        <div class="text-center">
                            <div class="text-5xl md:text-6xl font-light text-reggio-red mb-3">1520</div>
                            <div class="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Dipendenti<br>raggiunti</div>
                        </div>
                        <div class="text-center col-span-2 md:col-span-1 lg:col-span-1">
                            <div class="text-5xl md:text-6xl font-light text-reggio-ink mb-3">14</div>
                            <div class="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Innovazioni<br>introdotte</div>
                        </div>
                    </div>
                </div>
                
                            </div>
        </section>



        
            <!-- Valore Pubblico & Organizzazione (Indicatori Disruptive) -->
            <section class="mb-16" v-if="progetto && progetto.valorePubblico">
                <div class="bg-white p-8 lg:p-12 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 class="text-3xl font-semibold tracking-tight text-reggio-ink mb-8 flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-red-100 text-reggio-red flex items-center justify-center"><i class="bi bi-graph-up-arrow text-xl"></i></div>
                        Valore Pubblico & Impatto Organizzativo
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="ind in progetto.valorePubblico" class="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden group">
                            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><i class="bi bi-bullseye text-6xl text-reggio-red"></i></div>
                            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">{{ ind.label }}</div>
                            <div class="text-5xl font-light tracking-tight text-reggio-ink mb-3">{{ ind.value }}</div>
                            <div class="text-sm font-semibold text-reggio-green bg-white inline-block px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                                {{ ind.trend }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Cosa sta cambiando -->
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-4">Cosa sta cambiando?</h2>
                    <p class="text-xl text-gray-500 max-w-2xl mx-auto">La trasformazione del Comune non riguarda solo la tecnologia. Stiamo agendo contemporaneamente su quattro leve fondamentali.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Persone -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-red-50 text-reggio-red w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform -rotate-3">
                            <i class="bi bi-people-fill text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Persone e Competenze</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Formazione continua, change management e nuove figure professionali per guidare l'innovazione dall'interno.</p>
                    </div>
                    
                    <!-- Processi -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-blue-50 text-blue-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform rotate-3">
                            <i class="bi bi-arrow-repeat text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Processi Agili</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Semplificazione burocratica, dematerializzazione e automazione dei flussi per ridurre i tempi di attraversamento.</p>
                    </div>

                    <!-- Tecnologie -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-indigo-50 text-indigo-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform -rotate-3">
                            <i class="bi bi-cpu-fill text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Ecosistemi Digitali</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Passaggio al cloud, adozione di Microsoft 365 e piattaforme integrate per collaborare in tempo reale ovunque.</p>
                    </div>

                    <!-- Spazi -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-green-50 text-green-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform rotate-3">
                            <i class="bi bi-building text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Spazi di Lavoro</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Ambienti ibridi e sostenibili, pensati per favorire lo smart working e il benessere lavorativo.</p>
                    </div>

                    <!-- Dati -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-orange-50 text-orange-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform -rotate-3">
                            <i class="bi bi-database-fill text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Data Management</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Governance dei dati, sicurezza e piattaforme integrate per decisioni strategiche data-driven e servizi su misura.</p>
                    </div>

                    <!-- AI -->
                    <div class="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="bg-cyan-50 text-cyan-600 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm transform rotate-3">
                            <i class="bi bi-robot text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">Intelligenza Artificiale</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">Sperimentazione di soluzioni AI e assistenti virtuali per supportare le decisioni, automatizzare task e innovare i servizi.</p>
                    </div>
                </div>
                    
                    


            </div>
        </section>

        

        <!-- Ultimamente Reggio Cambia -->
        <section class="py-20 bg-gray-50 border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200 pb-6">
                    <div>
                        <h2 class="text-4xl font-semibold tracking-tight text-reggio-ink border-l-4 border-reggio-red pl-5 mb-2">Ultimamente in Comune</h2>
                        <p class="text-gray-500 text-lg">I progetti strategici e le trasformazioni più recenti a colpo d'occhio.</p>
                    </div>
                    <router-link to="/progetti" class="mt-4 md:mt-0 text-reggio-red font-semibold hover:text-red-700 hover:underline flex items-center gap-1 transition-colors">Vedi tutti i progetti <i class="bi bi-arrow-right text-xl mt-0.5"></i></router-link>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <!-- Card 1: M365 -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-blue-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-cloud-fill text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-in-corso shadow-sm">In corso</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">Innovazione Digitale</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-blue-700 transition-colors">Ecosistema Microsoft 365</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">Non stiamo semplicemente cambiando software, stiamo costruendo un ecosistema digitale unico per collaborare e condividere documenti in tempo reale.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-bullseye text-reggio-red text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">Obiettivo DUP</strong>
                                    <span class="text-gray-500">Nuovo ecosistema collaborativo Ente</span>
                                </div>
                            </div>
                            
                            <router-link to="/progetti/m365" class="inline-flex items-center justify-center w-full sm:w-auto bg-blue-50 text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-colors group/btn">
                                Scopri il nuovo ecosistema <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>

                    <!-- Card 2: Digital Twin -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-purple-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-map-fill text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-in-sperimentazione shadow-sm">In sperimentazione</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md">Territorio / Dati</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-purple-700 transition-colors">Un nuovo modo di leggere la città</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">Dati integrati, mappe intelligenti e Digital Twin per supportare le decisioni strategiche sul territorio in modo predittivo e accurato.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-graph-up-arrow text-reggio-red text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">Impatto Stimato</strong>
                                    <span class="text-gray-500">-80% sui costi di simulazione urbana</span>
                                </div>
                            </div>

                            <router-link to="/progetti/2" class="inline-flex items-center justify-center w-full sm:w-auto bg-purple-50 text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-colors group/btn">
                                Esplora il progetto <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>
                    
                    <!-- Card 3: Processi -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-green-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-check-circle-fill text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-realizzato shadow-sm">Realizzato</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-md">Servizi Interni</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-green-700 transition-colors">Processi amministrativi più semplici</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">L'introduzione di nuove procedure interamente digitali riduce sensibilmente i passaggi intermedi e le attività manuali per le determine.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-clock-history text-reggio-red text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">Risultato Raggiunto</strong>
                                    <span class="text-gray-500">-40% tempo medio di gestione</span>
                                </div>
                            </div>

                            <router-link to="/risultati" class="inline-flex items-center justify-center w-full sm:w-auto bg-green-50 text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-600 hover:text-white transition-colors group/btn">
                                Guarda il risultato <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>

                    <!-- Card 4: Energia -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-yellow-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-lightning-charge-fill text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-in-corso shadow-sm">In corso</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md">Sostenibilità</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-yellow-600 transition-colors">Energia sotto controllo</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">Sistemi automatizzati, dashboard integrate e raccolta dati capillare per comprendere consumi e prestazioni degli edifici in tempo reale.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-bar-chart-fill text-reggio-red text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">KPI Monitorato</strong>
                                    <span class="text-gray-500">12 M€ di spesa energetica mappata</span>
                                </div>
                            </div>

                            <router-link to="/progetti/3" class="inline-flex items-center justify-center w-full sm:w-auto bg-yellow-50 text-yellow-700 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 hover:text-white transition-colors group/btn">
                                Vedi gli indicatori <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>
                    <!-- Card 5: Riscossione -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-red-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-wallet2 text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-in-corso shadow-sm">In corso</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-md">Area Finanziaria</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-red-700 transition-colors">Riscossione proattiva</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">Un nuovo approccio per individuare prima le situazioni da regolarizzare e ridurre il ricorso alla riscossione coattiva.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-person-fill text-reggio-red text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">Responsabile</strong>
                                    <span class="text-gray-500">Roberto Lenzu</span>
                                </div>
                            </div>
                            
                            <router-link to="/progetti/riscossione" class="inline-flex items-center justify-center w-full sm:w-auto bg-red-50 text-red-700 font-semibold px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-colors group/btn">
                                Scopri il progetto <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>

                    <!-- Card 6: Newsletter -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute -right-6 -top-6 text-purple-50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-robot text-[12rem]"></i>
                        </div>
                        <div class="relative z-10 flex flex-col h-full">
                            <div class="flex justify-between items-start mb-6">
                                <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold badge-in-corso shadow-sm">In corso</span>
                                <span class="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md">Comunicazione</span>
                            </div>
                            <h3 class="text-2xl font-semibold text-reggio-ink mb-3 group-hover:text-purple-700 transition-colors">Newsletter automatizzate</h3>
                            <p class="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">Sperimentazione di agenti Microsoft 365 che raccolgono le novità dell'Ente e supportano la preparazione delle newsletter.</p>
                            
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 mb-6">
                                <i class="bi bi-microsoft-teams text-purple-600 text-xl"></i>
                                <div class="text-sm">
                                    <strong class="block text-gray-800">Collegato a</strong>
                                    <span class="text-gray-500">Ecosistema M365</span>
                                </div>
                            </div>
                            
                            <router-link to="/progetti/newsletter" class="inline-flex items-center justify-center w-full sm:w-auto bg-purple-50 text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-colors group/btn">
                                Scopri il progetto <i class="bi bi-arrow-right ml-2 group-hover/btn:translate-x-1 transition-transform"></i>
                            </router-link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        

        <!-- Ultimamente Reggio Cambia -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink border-l-4 border-reggio-red pl-4">Ultimamente Reggio Cambia</h2>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="text-xs font-semibold text-green-600 mb-2 tracking-wider">RISULTATO</div>
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">-35% allegati email inviati</h4>
                        <p class="text-sm text-gray-500">Ieri (M365)</p>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="text-xs font-semibold text-blue-600 mb-2 tracking-wider">PROGETTO</div>
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Parte la sperimentazione del Digital Twin</h4>
                        <p class="text-sm text-gray-500">2 giorni fa</p>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="text-xs font-semibold text-purple-600 mb-2 tracking-wider">VIDEO</div>
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Teams: non è solo videoconferenza</h4>
                        <p class="text-sm text-gray-500">3 giorni fa</p>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
                        <div class="text-xs font-semibold text-orange-600 mb-2 tracking-wider">PROCESSO</div>
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Nuovo flusso digitale per gli affidamenti</h4>
                        <p class="text-sm text-gray-500">1 settimana fa</p>
                    </div>
                </div>
            </div>
        </section>
        
        
    </div>
        <!-- Esempi Pratici (Cosa cambia per te) -->
        <section class="py-20 bg-gray-50 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-4">Cosa cambia nella pratica?</h2>
                    <p class="text-xl text-gray-500 max-w-2xl mx-auto">Alcuni esempi concreti di come l'innovazione organizzativa semplifica il lavoro di tutti i giorni.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Esempio 1: Documenti -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                        <div class="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <i class="bi bi-file-earmark-text text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-4">Meno email, più condivisione</h3>
                        <div class="space-y-4">
                            <div class="flex items-start gap-3 opacity-50">
                                <i class="bi bi-x-circle-fill text-red-500 mt-1"></i>
                                <p class="text-sm text-gray-600 line-through">Inviare il file "Bozza_v3.docx" a 5 colleghi e aspettare i ritorni.</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                <p class="text-sm text-gray-800 font-medium">Condividere un link sicuro e modificare lo stesso file in tempo reale.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Esempio 2: Firme -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                        <div class="bg-purple-50 text-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <i class="bi bi-pen text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-4">Approvazioni Agili</h3>
                        <div class="space-y-4">
                            <div class="flex items-start gap-3 opacity-50">
                                <i class="bi bi-x-circle-fill text-red-500 mt-1"></i>
                                <p class="text-sm text-gray-600 line-through">Stampare un documento, firmare a penna, scansionare e ricaricare.</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                <p class="text-sm text-gray-800 font-medium">Flusso di approvazione interamente digitale con la firma elettronica.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Esempio 3: Lavoro Agile -->
                    <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                        <div class="bg-teal-50 text-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <i class="bi bi-laptop text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-4">Ufficio Ovunque</h3>
                        <div class="space-y-4">
                            <div class="flex items-start gap-3 opacity-50">
                                <i class="bi bi-x-circle-fill text-red-500 mt-1"></i>
                                <p class="text-sm text-gray-600 line-through">Impossibilità di accedere ai propri file se non dalla postazione fissa.</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <i class="bi bi-check-circle-fill text-green-500 mt-1"></i>
                                <p class="text-sm text-gray-800 font-medium">Accesso in sicurezza ai propri strumenti da qualsiasi postazione.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    setup() {
        onMounted(() => {
            
            
            // Initialize Chart.js
            setTimeout(() => {
                const ctx = document.getElementById('homeTrendChart');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago'],
                            datasets: [{
                                label: 'Progetti avviati',
                                data: [12, 19, 22, 28, 35, 42],
                                borderColor: '#cc1f2c', // reggio-red
                                backgroundColor: 'rgba(204, 31, 44, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                            },
                            {
                                label: 'Risultati raggiunti',
                                data: [5, 8, 10, 14, 15, 18],
                                borderColor: '#2f6f59', // reggio-green
                                backgroundColor: 'rgba(47, 111, 89, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: { legend: { position: 'bottom' } },
                            scales: { y: { beginAtZero: true } }
                        }
                    });
                }
            }, 300);
        });
        const categorieLavoro = [
            "Lavoro negli uffici amministrativi",
            "Gestisco progetti",
            "Lavoro sul territorio",
            "Coordino persone",
            "Utilizzo dati",
            "Lavoro con cittadini e imprese",
            "Mi occupo di acquisti e contratti",
            "Mi occupo di comunicazione"
        ];
        const catSelezionata = ref(categorieLavoro[1]); 
        return { categorieLavoro, catSelezionata };
    }
};

const ProgettiView = {
    template: `
    <div class="bg-reggio-soft min-h-screen py-10 animate-fade-in-up">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-2">Progetti</h1>
            <p class="text-xl text-gray-600 mb-8">Scopri cosa stiamo realizzando per migliorare l'Ente e la città.</p>
            
            <!-- Filters -->
            <div class="flex flex-col md:flex-row gap-4 mb-8">
                <div class="flex flex-wrap gap-2 flex-grow">
                    <button @click="filtroStato = ''" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', filtroStato === '' ? 'bg-reggio-ink text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100']">Tutti gli stati</button>
                    <button @click="filtroStato = 'da avviare'" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', filtroStato === 'da avviare' ? 'bg-gray-200 text-gray-800 shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100']">Da avviare</button>
                    <button @click="filtroStato = 'in corso'" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', filtroStato === 'in corso' ? 'bg-blue-100 text-blue-800 shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100']">In corso</button>
                    <button @click="filtroStato = 'in sperimentazione'" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', filtroStato === 'in sperimentazione' ? 'bg-purple-100 text-purple-800 shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100']">In sperimentazione</button>
                    <button @click="filtroStato = 'realizzato'" :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors', filtroStato === 'realizzato' ? 'bg-green-100 text-green-800 shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100']">Realizzati</button>
                </div>
                <div class="w-full md:w-72">
                    <select v-model="filtroResponsabile" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-reggio-red focus:border-reggio-red shadow-sm transition-all">
                        <option value="">Tutti i responsabili</option>
                        <option v-for="resp in responsabiliList" :key="resp" :value="resp">{{ resp }}</option>
                    </select>
                </div>
            </div>

            <!-- Grid -->
            <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                <div v-for="progetto in progettiFiltrati" :key="progetto.id" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full">
                    <div class="p-6 flex-grow">
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span :class="['inline-block px-3 py-1 rounded-full text-xs font-semibold', progetto.badgeClass]">{{ progetto.badge }}</span>
                            <span v-if="progetto.obiettivoDUP" :class="['inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold border', progetto.obiettivoDUP === 'INSERITO NEL DUP' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200']">
                                <i class="bi bi-bullseye"></i> {{ progetto.obiettivoDUP }}
                            </span>
                        </div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-2">{{ progetto.titolo }}</h3>
                        <p class="text-sm text-reggio-red font-semibold mb-2">{{ progetto.area }}</p>
                        
                        <div class="text-xs text-gray-500 mb-4 flex items-start gap-1">
                            <i class="bi bi-person mt-0.5"></i>
                            <span>{{ progetto.responsabili ? progetto.responsabili.join(', ') : '' }}</span>
                        </div>
                        
                        <p class="text-gray-600 text-sm mb-6">{{ progetto.descrizione }}</p>
                        
                        <div class="flex flex-wrap gap-1 mt-4">
                            <span v-for="cat in progetto.categorie" class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{{ cat }}</span>
                        </div>
                    </div>
                    <div class="p-4 border-t border-gray-100 bg-reggio-soft">
                        <router-link :to="'/progetti/' + progetto.id" class="text-reggio-ink font-semibold text-sm hover:text-reggio-red flex items-center justify-between w-full">
                            Scopri il progetto
                            <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                </div>
            </transition-group>
            
            <div v-if="progettiFiltrati.length === 0" class="text-center py-20 text-gray-500 animate-fade-in-up">
                <i class="bi bi-search text-4xl font-light tracking-tight mb-4 opacity-50"></i>
                <p>Nessun progetto trovato con questi filtri.</p>
            </div>
        </div>
    </div>
    `,
    setup() {
        const filtroStato = Vue.ref('');
        const filtroResponsabile = Vue.ref('');
        const progetti = Vue.ref(progettiData);
        
        const responsabiliList = Vue.computed(() => {
            const allResp = [];
            progetti.value.forEach(p => {
                if (p.responsabili) {
                    p.responsabili.forEach(r => {
                        if (!allResp.includes(r)) allResp.push(r);
                    });
                }
            });
            return allResp.sort();
        });

        const progettiFiltrati = Vue.computed(() => {
            return progetti.value.filter(p => {
                const matchStato = !filtroStato.value || p.stato === filtroStato.value;
                const matchResp = !filtroResponsabile.value || (p.responsabili && p.responsabili.includes(filtroResponsabile.value));
                return matchStato && matchResp;
            });
        });

        return { filtroStato, filtroResponsabile, progettiFiltrati, responsabiliList };
    }
};
const ProgettoM365View = {
    template: `
    <div class="bg-white min-h-screen pb-20">
        <!-- Header -->
        <div class="bg-reggio-soft py-12 border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <router-link to="/progetti" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-reggio-red mb-6">
                    <i class="bi bi-arrow-left text-lg mr-1"></i> Torna ai progetti
                </router-link>
                
                <div class="flex items-center gap-3 mb-4">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold badge-in-corso">🔵 In corso</span>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">Trasformazione organizzativa</span>
                </div>
                
                <h1 class="text-5xl font-semibold tracking-tight text-reggio-ink mb-4 tracking-tight">Ecosistema Microsoft 365</h1>
                <p class="text-2xl text-gray-600 mb-8 font-light">Non solo nuovi strumenti: un nuovo modo di lavorare insieme.</p>
                
                <div class="flex flex-wrap gap-2 mb-8">
                    <span class="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">Digitale</span>
                    <span class="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">Collaborazione</span>
                    <span class="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">Persone</span>
                    <span class="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">Change Management</span>
                    <span class="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">Processi</span>
                </div>
                
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6">
                    <div>
                        <span class="text-xs text-gray-500 uppercase font-semibold block mb-1">Dirigente d'Area</span>
                        <span class="font-medium text-reggio-ink">CAPUCCI MARCELLO</span>
                    </div>
                    <div>
                        <span class="text-xs text-gray-500 uppercase font-semibold block mb-1">Dirigente di Servizio</span>
                        <span class="font-medium text-reggio-ink">BERTANI ANDREA</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            
            
            <!-- Strategic Plan Connection -->
            <div class="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all mb-8">
                <div class="flex items-start gap-4">
                    <i class="bi bi-journal-bookmark-fill text-3xl text-blue-600 mt-1"></i>
                    <div>
                        <h4 class="font-semibold text-blue-900 text-lg mb-1">Piano Strategico Digitale</h4>
                        <p class="text-sm text-blue-800 mb-3">L'Ecosistema Microsoft 365 è un pilastro centrale del <strong>Reggio Emilia Next - Piano Strategico Digitale</strong>.</p>
                        <a href="https://comune-di-reggio-emilia.gitbook.io/reggio-emilia-next-piano-strategico-digitale" target="_blank" class="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 font-medium text-xs px-4 py-2 rounded-full transition-colors">
                            Consulta il documento di riferimento <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Il progetto in 10 secondi -->
            <section class="bg-white border-2 border-gray-100 p-8 rounded-[2rem] shadow-sm mb-12">
                <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink mb-8 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center"><i class="bi bi-lightning-fill text-xl"></i></div>
                    Il progetto in 10 secondi
                </h2>
                
                <div class="space-y-8">
                    <div>
                        <h3 class="text-lg font-semibold text-reggio-ink border-l-4 border-reggio-red pl-3 mb-2">Cosa stiamo facendo</h3>
                        <p class="text-gray-600 text-lg">Stiamo costruendo un ecosistema digitale unico e integrato per comunicare, collaborare, condividere documenti e organizzare il lavoro.</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-reggio-ink border-l-4 border-reggio-red pl-3 mb-2">Perché</h3>
                        <p class="text-gray-600 text-lg">Per superare strumenti separati, duplicazioni di file, scambi continui via email e modalità di lavoro poco integrate.</p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-reggio-ink border-l-4 border-reggio-red pl-3 mb-4">Cosa cambia</h3>
                        <div class="flex flex-col sm:flex-row gap-4 items-stretch">
                            <div class="bg-gray-50 p-6 rounded-2xl flex-1 w-full text-center border border-gray-200">
                                <span class="text-sm text-gray-500 font-semibold uppercase tracking-wider block mb-2">Da una logica basata su:</span>
                                <span class="text-gray-400 font-medium line-through text-lg">email + allegati + cartelle locali</span>
                            </div>
                            <div class="text-gray-400 flex items-center justify-center"><i class="bi bi-arrow-right text-3xl hidden sm:block"></i><i class="bi bi-arrow-down text-3xl block sm:hidden"></i></div>
                            <div class="bg-red-50 p-6 rounded-2xl flex-1 w-full text-center border border-reggio-red shadow-sm">
                                <span class="text-sm text-reggio-red font-semibold uppercase tracking-wider block mb-2">A una logica basata su:</span>
                                <span class="text-reggio-ink font-semibold text-lg">collaborazione + condivisione + accesso comune alle informazioni</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Non è una migrazione tecnologica -->
            <section>
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink">Non stiamo semplicemente cambiando software</h2>
                    <p class="text-lg text-gray-500 mt-2">Da strumenti separati a un ecosistema digitale condiviso.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    
                    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 z-10 hidden md:block">
                        <div class="bg-gray-100 rounded-full p-3 text-gray-500 shadow-sm border border-gray-200">
                            <i class="bi bi-arrow-right text-3xl"></i>
                        </div>
                    </div>

                    <div class="bg-reggio-soft p-8 rounded-2xl border border-gray-200">
                        <h3 class="text-xl font-black text-gray-400 mb-6 tracking-wide text-center">PRIMA</h3>
                        <ul class="space-y-4">
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> Zimbra e LibreOffice isolati</li>
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> File allegati alle email</li>
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> Cartelle locali e di rete frammentate</li>
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> Versioni multiple dello stesso documento</li>
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> Informazioni distribuite ovunque</li>
                            <li class="flex items-center gap-3 text-gray-600"><i class="bi bi-x-circle text-xl text-red-400 flex-shrink-0"></i> Collaborazione principalmente via email</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200 shadow-md">
                        <h3 class="text-xl font-black text-blue-600 mb-6 tracking-wide text-center">DOPO</h3>
                        <ul class="space-y-4">
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Microsoft 365 (Outlook, Teams, SharePoint, OneDrive)</li>
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Documenti condivisi tramite link</li>
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Spazi di lavoro comuni centralizzati</li>
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Collaborazione simultanea su un'unica versione</li>
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Automazioni dei processi</li>
                            <li class="flex items-center gap-3 text-gray-800 font-medium"><i class="bi bi-check-circle text-xl text-blue-500 flex-shrink-0"></i> Assistenti digitali e intelligenza artificiale</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Cosa cambia per me (Card grid) -->
            <section class="bg-gray-50 rounded-[2rem] p-8 lg:p-12 border border-gray-200 mb-20 shadow-inner">
                <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink mb-10 text-center flex items-center justify-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><i class="bi bi-person-badge text-xl"></i></div>
                    Cosa cambia per te? 
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Documenti -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-blue-100 w-12 h-12 rounded-xl text-blue-600 flex items-center justify-center mb-4"><i class="bi bi-file-earmark-text-fill text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Documenti e File</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Niente più allegati email infiniti ("Versione_Finale_3"). Lavoriamo tutti <strong>simultaneamente</strong> sullo stesso documento cloud, sempre aggiornato.</p>
                    </div>
                    <!-- Comunicazione -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-indigo-100 w-12 h-12 rounded-xl text-indigo-600 flex items-center justify-center mb-4"><i class="bi bi-chat-left-dots-fill text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Meno Email Interne</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Spostiamo le comunicazioni di servizio o i messaggi rapidi sulle <strong>chat di Teams</strong>, disintasando la casella di posta e velocizzando le risposte.</p>
                    </div>
                    <!-- Riunioni -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-purple-100 w-12 h-12 rounded-xl text-purple-600 flex items-center justify-center mb-4"><i class="bi bi-camera-video-fill text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Riunioni Ibride</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Conferenze di altissima qualità in cui condividere lo schermo, usare lavagne virtuali e collaborare ai file di progetto senza uscire dalla chiamata.</p>
                    </div>
                    <!-- Flessibilità -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-teal-100 w-12 h-12 rounded-xl text-teal-600 flex items-center justify-center mb-4"><i class="bi bi-laptop text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Lavoro Flessibile</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Accedi a tutte le tue risorse aziendali in totale sicurezza <strong>da qualsiasi postazione</strong> (PC fisso, laptop, smartphone) inserendo solo le tue credenziali uniche.</p>
                    </div>
                    <!-- Intranet -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-yellow-100 w-12 h-12 rounded-xl text-yellow-600 flex items-center justify-center mb-4"><i class="bi bi-search text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Ricerca Informazioni</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Un'Intranet moderna dove trovare rapidamente <strong>modulistica, procedure e notizie</strong>. Il motore di ricerca interno scandaglia tutti i tuoi documenti in un secondo.</p>
                    </div>
                    <!-- Organizzazione -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="bg-green-100 w-12 h-12 rounded-xl text-green-600 flex items-center justify-center mb-4"><i class="bi bi-list-check text-2xl"></i></div>
                        <h4 class="text-lg font-semibold text-reggio-ink mb-2">Organizzazione Attività</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">Con Planner hai una bacheca visiva (stile Kanban) per capire subito chi fa cosa, quali sono le scadenze del team e a che punto è un processo.</p>
                    </div>
                </div>
            </section>
            
            <!-- Diagramma: Da strumenti a Ecosistema -->
            <section class="mb-20">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink">Da strumenti a ecosistema</h2>
                    <p class="text-gray-600 mt-2 max-w-2xl mx-auto">Non si tratta di singole applicazioni isolate, ma di componenti intelligenti interconnessi all'interno di un unico ambiente digitale protetto.</p>
                </div>
                
                <div class="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-8 lg:p-12 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex flex-col lg:flex-row items-center gap-12">
                        <!-- Il Centro (M365) -->
                        <div class="w-full lg:w-1/3 flex flex-col items-center text-center">
                            <div class="w-48 h-48 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[2rem] flex flex-col items-center justify-center shadow-xl border-4 border-blue-50 mb-6 transform transition-transform hover:scale-105">
                                <i class="bi bi-cloud-fill text-6xl mb-2"></i>
                                <span class="font-black text-2xl leading-tight">Microsoft<br>365</span>
                            </div>
                            <h3 class="text-xl font-semibold text-reggio-ink">Il Cuore Digitale</h3>
                            <p class="text-sm text-gray-500 mt-2">Identità singola, dati centralizzati e collaborazione sincrona.</p>
                        </div>

                        <!-- Freccia di connessione (Desktop) -->
                        <div class="hidden lg:flex flex-col items-center justify-center text-gray-300">
                            <i class="bi bi-arrow-left-right text-5xl"></i>
                            <span class="text-xs font-semibold tracking-wider uppercase mt-2">Ecosistema</span>
                        </div>

                        <!-- Le App (Ecosistema) -->
                        <div class="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-5">
                            <!-- Outlook -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm">
                                <div class="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-envelope-fill text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">Outlook</strong>
                                <span class="text-xs text-gray-500 leading-tight">Comunicazione</span>
                            </div>
                            <!-- Teams -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm">
                                <div class="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-chat-square-text-fill text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">Teams</strong>
                                <span class="text-xs text-gray-500 leading-tight">Collaborazione Hub</span>
                            </div>
                            <!-- SharePoint -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all duration-300 shadow-sm">
                                <div class="bg-teal-100 text-teal-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-globe2 text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">SharePoint</strong>
                                <span class="text-xs text-gray-500 leading-tight">Intranet & Conoscenza</span>
                            </div>
                            <!-- OneDrive -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm">
                                <div class="bg-blue-100 text-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-hdd-fill text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">OneDrive</strong>
                                <span class="text-xs text-gray-500 leading-tight">Archivio Personale</span>
                            </div>
                            <!-- Planner -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-300 shadow-sm">
                                <div class="bg-green-100 text-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-check-square-fill text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">Planner</strong>
                                <span class="text-xs text-gray-500 leading-tight">Gestione Attività</span>
                            </div>
                            <!-- Forms -->
                            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm">
                                <div class="bg-red-100 text-red-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner"><i class="bi bi-file-earmark-bar-graph-fill text-2xl"></i></div>
                                <strong class="text-reggio-ink text-sm font-semibold mb-1">Forms</strong>
                                <span class="text-xs text-gray-500 leading-tight">Sondaggi & Dati</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Change Management -->
            <section class="bg-white border-y border-gray-200 py-12">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink">La tecnologia è solo una parte del progetto</h2>
                    <p class="text-xl text-reggio-red font-semibold mt-4 max-w-3xl mx-auto italic">"Il successo del progetto non si misura nel numero di account migrati, ma nella capacità dell'organizzazione di utilizzare gli strumenti per lavorare meglio insieme."</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="text-center p-4">
                        <div class="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-gray-700">
                            <i class="bi bi-cpu text-3xl"></i>
                        </div>
                        <h4 class="font-semibold text-lg mb-2">Tecnologia</h4>
                        <p class="text-sm text-gray-600">Migrazione dati, sicurezza, identità e configurazione degli strumenti tecnici.</p>
                    </div>
                    <div class="text-center p-4 relative">
                        <div class="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-700">
                            <i class="bi bi-building text-3xl"></i>
                        </div>
                        <h4 class="font-semibold text-lg mb-2">Organizzazione</h4>
                        <p class="text-sm text-gray-600">Definizione di nuove regole condivise e modalità di collaborazione tra uffici.</p>
                    </div>
                    <div class="text-center p-4">
                        <div class="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-700">
                            <i class="bi bi-people text-3xl"></i>
                        </div>
                        <h4 class="font-semibold text-lg mb-2">Persone</h4>
                        <p class="text-sm text-gray-600">Formazione mirata, accompagnamento al cambiamento e sviluppo delle competenze digitali.</p>
                    </div>
                    <div class="text-center p-4">
                        <div class="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-700">
                            <i class="bi bi-diagram-2 text-3xl"></i>
                        </div>
                        <h4 class="font-semibold text-lg mb-2">Processi</h4>
                        <p class="text-sm text-gray-600">Ripensamento progressivo e semplificazione dei flussi di lavoro quotidiani.</p>
                    </div>
                </div>
            </section>

            <!-- Roadmap -->
            <section>
                <h2 class="text-2xl font-semibold text-reggio-ink mb-8 border-l-4 border-reggio-red pl-4">Il percorso</h2>
                <div class="space-y-6">
                    <!-- Step 1 -->
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold shadow-sm"><i class="bi bi-check text-xl"></i></div>
                            <div class="w-1 h-full bg-green-200 mt-2"></div>
                        </div>
                        <div class="pb-6">
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-xl font-semibold text-reggio-ink">1 — Preparazione</h3>
                                <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">Completato</span>
                            </div>
                            <p class="text-gray-600 text-sm">Analisi dell'ambiente esistente, definizione architettura e pianificazione migrazione.</p>
                        </div>
                    </div>
                    
                    <!-- Step 2 -->
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm">2</div>
                            <div class="w-1 h-full bg-blue-200 mt-2"></div>
                        </div>
                        <div class="pb-6 bg-blue-50/50 p-4 rounded-xl -ml-4 border border-blue-100 w-full">
                            <div class="flex items-center gap-3 mb-1 ml-4">
                                <h3 class="text-xl font-semibold text-reggio-ink">2 — Migrazione</h3>
                                <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">In corso</span>
                            </div>
                            <p class="text-gray-600 text-sm ml-4">Posta elettronica, account, documenti base e configurazioni di sicurezza.</p>
                        </div>
                    </div>
                    
                    <!-- Step 3 -->
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm">3</div>
                            <div class="w-1 h-full bg-gray-200 mt-2"></div>
                        </div>
                        <div class="pb-6 bg-blue-50/50 p-4 rounded-xl -ml-4 border border-blue-100 w-full mt-4">
                            <div class="flex items-center gap-3 mb-1 ml-4">
                                <h3 class="text-xl font-semibold text-reggio-ink">3 — Adozione</h3>
                                <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">In corso</span>
                            </div>
                            <p class="text-gray-600 text-sm ml-4">Apertura Teams, SharePoint, OneDrive e formazione sulla collaborazione documentale.</p>
                        </div>
                    </div>
                    
                    <!-- Step 4 -->
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">4</div>
                            <div class="w-1 h-full bg-gray-200 mt-2"></div>
                        </div>
                        <div class="pb-6 mt-4">
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-xl font-semibold text-gray-500">4 — Nuovi modi di lavorare</h3>
                                <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Prossimo passo</span>
                            </div>
                            <p class="text-gray-400 text-sm">Planner, Lists, Forms, Automazioni base e creazione di nuovi spazi collaborativi strutturati.</p>
                        </div>
                    </div>
                    
                    <!-- Step 5 -->
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">5</div>
                        </div>
                        <div class="mt-4">
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-xl font-semibold text-gray-500">5 — Ecosistema intelligente</h3>
                                <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Evoluzione</span>
                            </div>
                            <p class="text-gray-400 text-sm">Power Platform, Copilot, Assistenti AI, automazione avanzata e knowledge management.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Indicatori -->
            <section class="bg-reggio-soft rounded-2xl p-8 border border-gray-200">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-reggio-ink">Indicatori di adozione</h2>
                    <span class="text-xs text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded">Dati dimostrativi</span>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="text-center p-2">
                        <div class="text-4xl font-light tracking-tight font-black text-gray-800 mb-1">1.200</div>
                        <div class="text-sm font-semibold text-gray-500 uppercase">Dipendenti coinvolti</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-4xl font-light tracking-tight font-black text-blue-600 mb-1">85%</div>
                        <div class="text-sm font-semibold text-gray-500 uppercase">Account migrati</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-4xl font-light tracking-tight font-black text-gray-800 mb-1">380</div>
                        <div class="text-sm font-semibold text-gray-500 uppercase">Dipendenti formati</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-4xl font-light tracking-tight font-black text-gray-800 mb-1">62</div>
                        <div class="text-sm font-semibold text-gray-500 uppercase">Team collaborativi</div>
                    </div>
                    
                    <div class="text-center p-2">
                        <div class="text-3xl font-light tracking-tight font-black text-green-600 mb-1">-35%</div>
                        <div class="text-xs font-semibold text-gray-500 uppercase">Allegati scambiati internamente</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-3xl font-light tracking-tight font-black text-green-600 mb-1">+48%</div>
                        <div class="text-xs font-semibold text-gray-500 uppercase">Documenti collaborativi attivi</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-3xl font-light tracking-tight font-black text-gray-800 mb-1">140</div>
                        <div class="text-xs font-semibold text-gray-500 uppercase">Spazi SharePoint creati</div>
                    </div>
                    <div class="text-center p-2">
                        <div class="text-3xl font-light tracking-tight font-black text-gray-800 mb-1">27</div>
                        <div class="text-xs font-semibold text-gray-500 uppercase">Processi digitalizzati</div>
                    </div>
                </div>
            </section>

            <!-- Storie di cambiamento -->
            <section>
                <h2 class="text-2xl font-semibold text-reggio-ink mb-6 border-l-4 border-reggio-red pl-4">Il cambiamento raccontato dalle persone</h2>
                
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div class="bg-blue-50 text-blue-500 p-4 rounded-full flex-shrink-0">
                        <i class="bi bi-chat-dots text-5xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-reggio-ink mb-2">"Prima mandavamo dieci versioni dello stesso file"</h3>
                        <p class="text-gray-600 italic mb-4">"Un gruppo di lavoro utilizzava email e allegati per predisporre un documento condiviso per una gara d'appalto. Era il caos per unire i pezzi. Oggi il documento viene gestito direttamente nello spazio Teams del progetto in contemporanea."</p>
                        <div class="flex gap-4 text-sm font-semibold text-green-600">
                            <span><i class="bi bi-check text-lg inline"></i> Una sola versione</span>
                            <span><i class="bi bi-check text-lg inline"></i> Meno email</span>
                            <span><i class="bi bi-check text-lg inline"></i> Maggiore tracciabilità</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Videopillole collegate -->
            <section>
                <h2 class="text-2xl font-semibold text-reggio-ink mb-6 border-l-4 border-reggio-red pl-4">Videopillole correlate</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="video in videoList" :key="video.id" class="flex gap-4 bg-white p-3 border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 cursor-pointer">
                        <div class="w-24 h-16 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                            <span class="text-2xl">{{ video.thumb }}</span>
                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="bi bi-play-fill text-2xl text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm text-reggio-ink line-clamp-2 leading-tight">{{ video.titolo }}</h4>
                            <span class="text-xs text-gray-500 mt-1 block">{{ video.durata }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FAQ -->
            <section class="bg-reggio-soft p-8 rounded-2xl border border-gray-200">
                <h2 class="text-2xl font-semibold text-reggio-ink mb-6">Domande rapide</h2>
                <div class="space-y-4">
                    
                    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Devo continuare a usare gli allegati?</h4>
                        <p class="text-gray-600"><strong>Non sempre.</strong> Quando lavoriamo sullo stesso documento internamente è preferibile condividere il collegamento (link) al file, in modo che tutti vedano sempre l'ultima versione senza generare copie inutili.</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Teams sostituisce la posta elettronica?</h4>
                        <p class="text-gray-600"><strong>No.</strong> I due strumenti hanno funzioni differenti. La mail serve per comunicazioni formali (esterne o interne) o asincrone. Teams è lo spazio per la collaborazione quotidiana all'interno di gruppi, uffici e progetti.</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-semibold text-lg mb-2 text-reggio-ink">Dove devono stare i documenti?</h4>
                        <p class="text-gray-600">Dipende dal loro utilizzo e dal loro ciclo di vita:</p>
                        <ul class="list-disc ml-5 mt-2 text-gray-600 text-sm space-y-1">
                            <li><strong>Documenti personali di lavoro</strong> → OneDrive (bozze, appunti)</li>
                            <li><strong>Documenti di gruppo/progetto</strong> → Teams / SharePoint</li>
                            <li><strong>Documenti amministrativi ufficiali protocollati</strong> → Sistemi documentali storici dell'Ente</li>
                        </ul>
                    </div>

                </div>
            </section>

            <!-- Cosa succede adesso (CTA) -->
            <section class="bg-reggio-ink text-white p-10 rounded-3xl text-center">
                <h2 class="text-3xl font-semibold tracking-tight mb-4">Cosa succede adesso</h2>
                <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Siamo nella fase di formazione e adozione. I prossimi passi prevedono l'attivazione di nuovi spazi collaborativi e la definizione delle regole di utilizzo per tutti i servizi.</p>
                
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button class="bg-reggio-red text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition-colors shadow-lg">Scopri il percorso Microsoft 365</button>
                    <button class="bg-gray-800 text-white border border-gray-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-700 transition-colors">Guarda le videopillole</button>
                    <button class="text-gray-300 font-semibold py-3 px-4 hover:text-white transition-colors underline">Consulta le guide</button>
                </div>
            </section>
            
        </div>
    </div>
    `,
    setup() {
        const progetto = Vue.computed(() => progettiData.find(p => p.id === 'm365'));
        Vue.onMounted(() => {
            window.scrollTo(0, 0);
        });
        return { videoList: videoData, progetto };
    }
};

const ProgettoRiscossioneView = {
    template: `
    <div class="bg-reggio-bg min-h-screen">
        <!-- Hero Section -->
        <section class="bg-white border-b border-gray-200 py-20 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <i class="bi bi-wallet2 text-[15rem]"></i>
            </div>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
                <div class="flex flex-wrap gap-2 mb-6">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">IN CORSO</span>
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Area Finanziaria</span>
                    <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold border bg-orange-50 text-orange-700 border-orange-200">
                        <i class="bi bi-bullseye"></i> INSERITO NEL DUP
                    </span>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-reggio-ink mb-6">
                    Riscossione proattiva dei tributi locali
                </h1>
                
                <p class="text-2xl text-reggio-red font-light leading-snug mb-10 max-w-4xl">
                    Intervenire prima della riscossione coattiva, migliorando la capacità dell'Ente di accompagnare il contribuente verso la regolarizzazione.
                </p>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Servizio</div>
                        <div class="font-medium text-reggio-ink">Servizio Entrate</div>
                    </div>
                    <div>
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Responsabile</div>
                        <div class="font-medium text-reggio-ink">Roberto Lenzu</div>
                    </div>
                    <div>
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Categoria</div>
                        <div class="font-medium text-reggio-ink">Innovazione dei processi</div>
                    </div>
                    <div>
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Tag</div>
                        <div class="font-medium text-gray-700">Tributi &middot; Entrate &middot; Dati</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 10 Secondi & Principio -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div class="lg:col-span-2 space-y-12">
                    <!-- Il progetto in 10 secondi -->
                    <div>
                        <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-6 border-b-2 border-reggio-red pb-2 inline-block">Il progetto in 10 secondi</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
                                    <i class="bi bi-lightbulb-fill"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-reggio-ink mb-3">Cosa stiamo facendo</h3>
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    Stiamo sviluppando un modello di gestione delle entrate locali capace di individuare tempestivamente situazioni di mancato o incompleto pagamento e di intervenire <strong class="text-reggio-ink">prima dell'avvio della riscossione coattiva</strong>.
                                </p>
                            </div>
                            
                            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div class="w-12 h-12 bg-red-50 text-reggio-red rounded-xl flex items-center justify-center text-xl mb-4">
                                    <i class="bi bi-question-circle-fill"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-reggio-ink mb-3">Perché</h3>
                                <p class="text-gray-600 text-sm leading-relaxed mb-3">Più passa il tempo, più aumentano:</p>
                                <ul class="text-gray-600 text-sm space-y-1 mb-3 list-disc pl-5">
                                    <li>difficoltà di riscossione</li>
                                    <li>costi amministrativi e complessità</li>
                                    <li>oneri per il contribuente e contenzioso</li>
                                    <li>attività manuali per gli uffici</li>
                                </ul>
                                <p class="text-gray-800 text-sm font-medium">L'obiettivo è anticipare il problema anziché gestirlo quando è già coattivo.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Principio Editoriale -->
                    <div class="bg-reggio-ink text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-8 opacity-10">
                            <i class="bi bi-quote text-8xl"></i>
                        </div>
                        <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-6 opacity-80">Il principio</h2>
                        <p class="text-2xl md:text-3xl font-light leading-snug relative z-10">
                            "Riscossione proattiva non significa aumentare i controlli. Significa intervenire prima, utilizzare meglio le informazioni disponibili e creare maggiori opportunità di regolarizzazione spontanea."
                        </p>
                    </div>
                </div>

                <!-- Sidebar laterale (Video, Quote) -->
                <div class="space-y-8">
                    <!-- Responsabile -->
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Il responsabile racconta</h3>
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl overflow-hidden shrink-0">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-reggio-ink text-lg">Roberto Lenzu</div>
                                <div class="text-sm text-gray-500">Dirigente Servizio Entrate</div>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm italic border-l-4 border-reggio-red pl-4 py-1">
                            &ldquo;L'obiettivo non è arrivare prima alla riscossione coattiva, ma fare esattamente il contrario: creare le condizioni perché, dove possibile, non sia necessario arrivarci.&rdquo;
                        </p>
                    </div>

                    <!-- Videopillola -->
                    <div class="bg-reggio-soft p-6 rounded-3xl border border-gray-200 group cursor-pointer hover:border-reggio-red transition-colors">
                        <h3 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-4">Videopillola associata</h3>
                        <div class="aspect-video bg-gray-800 rounded-xl relative flex items-center justify-center mb-4 overflow-hidden">
                            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-reggio-ink transform group-hover:scale-110 transition-transform relative z-10 shadow-lg">
                                <i class="bi bi-play-fill text-3xl ml-1"></i>
                            </div>
                            <div class="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">2:40</div>
                        </div>
                        <h4 class="font-semibold text-reggio-ink mb-2">Perché il Comune sta lavorando sulla riscossione proattiva?</h4>
                        <p class="text-sm text-gray-600 mb-4">Roberto Lenzu racconta perché intervenire prima può rendere la riscossione più efficace e più equa.</p>
                        <button class="text-reggio-red font-semibold text-sm flex items-center gap-2 group-hover:underline">
                            Guarda la videopillola <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cambio Prospettiva (Prima vs Dopo) -->
        <section class="bg-white py-16 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 class="text-3xl font-semibold text-reggio-ink mb-4">Da una riscossione reattiva a una riscossione proattiva</h2>
                <p class="text-gray-500 text-lg">Il cambio di prospettiva nel modello organizzativo.</p>
            </div>
            
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Prima -->
                    <div class="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                        <h3 class="text-center font-bold text-gray-500 uppercase tracking-widest mb-8">Prima</h3>
                        <div class="space-y-4 relative">
                            <div class="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gray-300 -translate-x-1/2"></div>
                            
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Scadenza del tributo</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Mancato pagamento</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Attesa</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Controllo</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Avviso</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-red-300 text-red-700 font-semibold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center bg-red-50">Riscossione coattiva</div></div>
                            <div class="relative flex justify-center"><div class="bg-red-50 border-2 border-red-200 text-red-700 font-bold px-6 py-3 rounded-2xl shadow-sm relative z-10 w-full text-center mt-4 text-sm">Maggiori costi e complessità</div></div>
                        </div>
                    </div>
                    
                    <!-- Dopo -->
                    <div class="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 shadow-sm relative">
                        <h3 class="text-center font-bold text-blue-600 uppercase tracking-widest mb-8">Modello in evoluzione</h3>
                        <div class="space-y-4 relative">
                            <div class="absolute left-1/2 top-4 bottom-4 w-0.5 bg-blue-200 -translate-x-1/2"></div>
                            
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-blue-200 text-blue-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Scadenza</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-blue-200 text-blue-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Analisi tempestiva</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-blue-200 text-blue-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Individuazione anomalie</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-blue-200 text-blue-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Comunicazione preventiva</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-blue-200 text-blue-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center text-sm leading-tight">Informazione e accompagnamento</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-green-300 text-green-700 font-semibold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center bg-green-50">Regolarizzazione spontanea</div></div>
                            <div class="relative flex justify-center"><div class="bg-blue-100 border-2 border-blue-200 text-blue-800 font-bold px-6 py-3 rounded-2xl shadow-sm relative z-10 w-full text-center mt-4 text-sm">Riscossione coattiva solo se necessaria</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Come funziona -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-semibold text-reggio-ink mb-4">Come funziona</h2>
                <p class="text-gray-500 text-lg">Le sei fasi del nuovo processo proattivo.</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                <!-- Linea connettiva -->
                <div class="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>
                
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300 mb-4 shadow-sm">1</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Dati</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Raccolta delle informazioni sui tributi e pagamenti.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300 mb-4 shadow-sm">2</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Analisi</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Individuazione di scadenze, insoluti o anomalie.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300 mb-4 shadow-sm">3</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Priorità</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Classificazione delle posizioni con regole definite.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-reggio-red rounded-full flex items-center justify-center text-2xl font-bold text-reggio-red mb-4 shadow-md bg-red-50">4</div>
                    <h3 class="font-semibold text-reggio-red mb-2">Contatto</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Attivazione di comunicazioni preventive e informative.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-green-500 mb-4 shadow-md bg-green-50">5</div>
                    <h3 class="font-semibold text-green-600 mb-2">Regolarizzazione</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Possibilità per il cittadino di verificare e intervenire.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-blue-500 mb-4 shadow-md bg-blue-50">6</div>
                    <h3 class="font-semibold text-blue-600 mb-2">Monitoraggio</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Analisi degli esiti e miglioramento del processo.</p>
                </div>
            </div>
        </section>

        <!-- Attenzione comunicazione -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 md:p-8 rounded-r-2xl shadow-sm">
                <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div class="text-yellow-600 text-4xl shrink-0"><i class="bi bi-exclamation-triangle-fill"></i></div>
                    <div>
                        <h3 class="text-lg font-bold text-yellow-800 mb-3">Attenzione alla comunicazione</h3>
                        <p class="text-yellow-800 text-sm mb-4">
                            La comunicazione del progetto <strong>NON</strong> deve trasmettere un'immagine di maggiore pressione fiscale o aggressività nella riscossione.
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">tempestività</span>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">prevenzione</span>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">chiarezza</span>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">regolarizzazione spontanea</span>
                            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">equità</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cosa cambia per il cittadino -->
        <section class="bg-white py-16 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-8 border-b-2 border-reggio-red pb-2 inline-block">Cosa cambia per il cittadino</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-reggio-bg p-6 rounded-2xl">
                        <div class="text-reggio-red text-3xl mb-4"><i class="bi bi-info-circle"></i></div>
                        <h3 class="font-semibold text-reggio-ink mb-2">Più informazione</h3>
                        <p class="text-sm text-gray-600">Ricevere indicazioni più tempestive sulla propria posizione.</p>
                    </div>
                    <div class="bg-reggio-bg p-6 rounded-2xl">
                        <div class="text-reggio-red text-3xl mb-4"><i class="bi bi-clock-history"></i></div>
                        <h3 class="font-semibold text-reggio-ink mb-2">Più tempo per intervenire</h3>
                        <p class="text-sm text-gray-600">Possibilità di verificare e regolarizzare prima dell'avvio delle procedure coattive.</p>
                    </div>
                    <div class="bg-reggio-bg p-6 rounded-2xl">
                        <div class="text-reggio-red text-3xl mb-4"><i class="bi bi-piggy-bank"></i></div>
                        <h3 class="font-semibold text-reggio-ink mb-2">Meno costi</h3>
                        <p class="text-sm text-gray-600">Ridurre, quando possibile, gli oneri derivanti dall'avvio delle procedure di riscossione.</p>
                    </div>
                    <div class="bg-reggio-bg p-6 rounded-2xl">
                        <div class="text-reggio-red text-3xl mb-4"><i class="bi bi-person-hearts"></i></div>
                        <h3 class="font-semibold text-reggio-ink mb-2">Rapporto più semplice</h3>
                        <p class="text-sm text-gray-600">Passare da una relazione amministrativa successiva a una preventiva e orientata al servizio.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Uffici / Dati / Equita / Storia -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <!-- Uffici -->
                <div>
                    <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-6 border-b-2 border-reggio-red pb-2 inline-block">Cosa cambia per gli uffici</h2>
                    <h3 class="text-xl font-semibold text-reggio-ink mb-6">Dal controllo manuale alla gestione per priorità</h3>
                    <div class="flex flex-col sm:flex-row gap-6">
                        <div class="flex-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm opacity-70">
                            <h4 class="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Prima</h4>
                            <ul class="text-sm text-gray-600 space-y-2 list-disc pl-4">
                                <li>controlli distribuiti</li>
                                <li>informazioni da sistemi differenti</li>
                                <li>interventi spesso successivi</li>
                                <li>attività manuali e grandi quantità</li>
                                <li>difficoltà nel distinguere rapidamente i casi</li>
                            </ul>
                        </div>
                        <div class="flex-1 bg-white p-6 rounded-2xl border-2 border-reggio-red shadow-md relative">
                            <div class="absolute top-0 right-0 translate-x-2 -translate-y-2 text-reggio-red"><i class="bi bi-arrow-right-circle-fill text-2xl"></i></div>
                            <h4 class="font-bold text-reggio-red uppercase text-xs tracking-wider mb-4">Progressivamente</h4>
                            <ul class="text-sm text-gray-800 space-y-2 font-medium list-disc pl-4">
                                <li>maggiore integrazione dei dati</li>
                                <li>identificazione automatica anomalie</li>
                                <li>segmentazione e priorità</li>
                                <li>comunicazioni tempestive e monitoraggio</li>
                                <li>operatori concentrati sui casi complessi</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Dati -->
                <div>
                    <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-6 border-b-2 border-reggio-red pb-2 inline-block">Il ruolo dei dati</h2>
                    <h3 class="text-xl font-semibold text-reggio-ink mb-4">Dati che aiutano a intervenire prima</h3>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        Il progetto può progressivamente mettere in relazione informazioni da più fonti. Il valore non è solo la quantità, ma la capacità di:
                    </p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">Integrarli</span>
                        <span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">Interpretarli</span>
                        <span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">Individuare anomalie</span>
                        <span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">Definire priorità</span>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-xl text-xs text-gray-500 italic">
                        Le decisioni amministrative rimangono sempre soggette alle regole, responsabilità e controlli dell'Ente.
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Storia -->
                <div class="bg-gradient-to-br from-reggio-ink to-gray-800 rounded-3xl p-8 text-white shadow-lg">
                    <h3 class="text-reggio-red font-bold uppercase tracking-widest text-xs mb-6">Storia di cambiamento</h3>
                    <h4 class="text-2xl font-semibold mb-4">Prima che diventi un problema</h4>
                    <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                        Un mancato pagamento non sempre deriva dalla volontà di non pagare. Può dipendere da dimenticanza, errore, informazione incompleta o difficoltà nella comprensione.
                    </p>
                    <p class="text-gray-200 font-medium text-sm mb-6">
                        Intervenire tempestivamente permette di risolvere molte situazioni senza arrivare alla fase coattiva.
                    </p>
                    <div class="bg-white/10 rounded-xl p-4 grid grid-cols-2 gap-4 text-sm font-semibold">
                        <div class="flex items-center gap-2"><i class="bi bi-check-circle text-reggio-red"></i> meno procedure</div>
                        <div class="flex items-center gap-2"><i class="bi bi-check-circle text-reggio-red"></i> meno costi</div>
                        <div class="flex items-center gap-2"><i class="bi bi-check-circle text-reggio-red"></i> mag. tempestività</div>
                        <div class="flex items-center gap-2"><i class="bi bi-check-circle text-reggio-red"></i> migl. rapporto</div>
                    </div>
                </div>

                <!-- Equita -->
                <div class="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-center">
                    <h3 class="text-reggio-red font-bold uppercase tracking-widest text-xs mb-6">Una questione di equità</h3>
                    <h4 class="text-2xl font-semibold text-reggio-ink mb-4">Perché riguarda tutti</h4>
                    <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                        La capacità di riscuotere correttamente significa garantire equità tra i contribuenti, disponibilità delle risorse per i servizi pubblici, riduzione dei costi della riscossione e maggiore efficacia.
                    </p>
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                        <p class="text-green-800 font-semibold text-sm">
                            Pagamenti più tempestivi e processi più efficienti significano più risorse disponibili per i servizi della città.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- KPI / Indicatori -->
        <section class="bg-reggio-ink text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-semibold mb-4">Indicatori di Efficacia</h2>
                    <p class="text-gray-400 max-w-2xl mx-auto">Dati dimostrativi nel prototipo. Gli indicatori racconteranno l'efficacia del nuovo modello proattivo.</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <!-- Kpi -->
                    <div class="text-center">
                        <div class="text-4xl font-light text-reggio-red mb-2">3.200</div>
                        <div class="text-sm font-medium text-gray-300">Posizioni analizzate preventivamente</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-reggio-red mb-2">840</div>
                        <div class="text-sm font-medium text-gray-300">Contribuenti contattati prima del coattivo</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-green-400 mb-2">61%</div>
                        <div class="text-sm font-medium text-gray-300">Regolarizzazioni spontanee post contatto</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-green-400 mb-2">-28%</div>
                        <div class="text-sm font-medium text-gray-300">Posizioni avviate a riscossione coattiva</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-blue-400 mb-2">18 gg</div>
                        <div class="text-sm font-medium text-gray-300">Tempo medio anticipato di presa in carico</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-green-400 mb-2">-22%</div>
                        <div class="text-sm font-medium text-gray-300">Costi amministrativi sulle pos. regolarizzate</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline & Conclusione -->
        <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2">
                    <h2 class="text-2xl font-semibold text-reggio-ink mb-8">Il percorso del progetto</h2>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                        
                        <!-- Timeline Item 1 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"><i class="bi bi-check"></i></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <span class="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 block">Completato</span>
                                <h4 class="font-semibold text-reggio-ink">Analisi del processo attuale</h4>
                                <p class="text-xs text-gray-500 mt-1">Mappatura attività e punti di attenzione.</p>
                            </div>
                        </div>
                        
                        <!-- Timeline Item 2 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"><i class="bi bi-arrow-repeat animate-spin-slow"></i></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-blue-50/50 p-4 rounded-xl shadow-sm border border-blue-100">
                                <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">In corso</span>
                                <h4 class="font-semibold text-reggio-ink">Analisi dati & Modello</h4>
                                <p class="text-xs text-gray-500 mt-1">Individuazione informazioni e regole operative.</p>
                            </div>
                        </div>

                        <!-- Timeline Item 3 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 opacity-60">
                                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Da avviare</span>
                                <h4 class="font-semibold text-gray-700">Sperimentazione e Valutazione</h4>
                                <p class="text-xs text-gray-500 mt-1">Applicazione a un primo insieme di posizioni.</p>
                            </div>
                        </div>
                        
                        <!-- Timeline Item 4 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 opacity-60">
                                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Evoluzione</span>
                                <h4 class="font-semibold text-gray-700">Estensione</h4>
                                <p class="text-xs text-gray-500 mt-1">Applicazione progressiva ad altri ambiti.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-8">
                    <!-- KPI Evolutivi -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Prossimi KPI Evolutivi</h3>
                        <ul class="text-sm text-gray-600 space-y-2 list-disc pl-4">
                            <li>% regolarizzazione spontanea</li>
                            <li>valore riscosso prima del coattivo</li>
                            <li>riduzione posizioni a coattivo</li>
                            <li>tempo medio scadenza - primo intervento</li>
                            <li>numero comunicazioni preventive</li>
                            <li>costo medio gestione posizione</li>
                            <li>tasso di risposta alle comunicazioni</li>
                            <li>riduzione del contenzioso</li>
                        </ul>
                    </div>

                    <!-- Collegamenti -->
                    <div class="bg-reggio-soft p-6 rounded-2xl border border-gray-200">
                        <h3 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-4">Collegamenti</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Data Governance</span>
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Interoperabilità</span>
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Digitalizzazione processi</span>
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Servizi digitali</span>
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Intelligenza Artificiale</span>
                            <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Comunicazione al cittadino</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
    `,
    setup() {
        Vue.onMounted(() => { window.scrollTo(0, 0); });
        return {};
    }
};


const ProgettoNewsletterView = {
    template: `
    <div class="bg-reggio-bg min-h-screen">
        <!-- Hero Section -->
        <section class="bg-white border-b border-gray-200 py-20 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <i class="bi bi-robot text-[15rem]"></i>
            </div>
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
                <div class="flex flex-wrap gap-2 mb-6">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">IN CORSO</span>
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">Area Comunicazione</span>
                    <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold border bg-purple-50 text-purple-700 border-purple-200">
                        <i class="bi bi-microsoft-teams"></i> ECOSISTEMA MICROSOFT 365
                    </span>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-reggio-ink mb-6">
                    Newsletter intelligenti e automatizzate
                </h1>
                
                <p class="text-2xl text-purple-700 font-light leading-snug mb-10 max-w-4xl">
                    Usare agenti e automazioni Microsoft 365 per raccogliere contenuti, proporre sintesi e supportare la produzione delle newsletter interne.
                </p>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Categoria</div>
                        <div class="font-medium text-reggio-ink">Comunicazione interna &middot; Automazione &middot; AI</div>
                    </div>
                    <div class="col-span-2">
                        <div class="text-gray-500 uppercase tracking-wide text-xs font-bold mb-1">Tag</div>
                        <div class="font-medium text-gray-700">Microsoft 365 &middot; Copilot &middot; Agenti &middot; Newsletter</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 10 Secondi & Principio -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div class="lg:col-span-2 space-y-12">
                    <!-- Il progetto in 10 secondi -->
                    <div>
                        <h2 class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6 border-b-2 border-purple-600 pb-2 inline-block">Il progetto in 10 secondi</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4">
                                    <i class="bi bi-lightbulb-fill"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-reggio-ink mb-3">Cosa stiamo facendo</h3>
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    Stiamo sperimentando un modello nel quale agenti digitali possono supportare la redazione delle newsletter interne, raccogliendo contenuti da fonti autorizzate, organizzandoli e proponendo una prima bozza editoriale.
                                </p>
                            </div>
                            
                            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4">
                                    <i class="bi bi-question-circle-fill"></i>
                                </div>
                                <h3 class="text-lg font-semibold text-reggio-ink mb-3">Perché</h3>
                                <p class="text-gray-600 text-sm leading-relaxed mb-3">Oggi la produzione periodica richiede molte attività manuali:</p>
                                <ul class="text-gray-600 text-sm space-y-1 mb-3 list-disc pl-5">
                                    <li>ricerca e raccolta dei contributi</li>
                                    <li>verifica delle novità</li>
                                    <li>sintesi, impaginazione e bozza</li>
                                </ul>
                                <p class="text-gray-800 text-sm font-medium">L'obiettivo è automatizzare il ripetitivo e lasciare alla Comunicazione il valore: <span class="text-purple-600 font-bold">scelta editoriale, tono di voce, approvazione.</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Principio -->
                <div class="space-y-8">
                    <!-- Editoriale -->
                    <div class="bg-reggio-ink text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-center h-full">
                        <div class="absolute top-0 right-0 p-8 opacity-10">
                            <i class="bi bi-pen text-8xl"></i>
                        </div>
                        <h2 class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6 opacity-80">Il principio</h2>
                        <h3 class="text-2xl font-semibold mb-4 text-white">L'agente prepara.<br>La Comunicazione decide.</h3>
                        <p class="text-gray-300 text-sm mb-6">La tecnologia non pubblica autonomamente contenuti istituzionali.</p>
                        
                        <div class="space-y-4">
                            <div class="bg-white/10 p-4 rounded-xl">
                                <h4 class="font-semibold text-purple-300 mb-2 text-sm"><i class="bi bi-robot mr-2"></i>L'agente può:</h4>
                                <ul class="text-xs text-gray-300 space-y-1 list-disc pl-4">
                                    <li>cercare e raccogliere aggiornamenti</li>
                                    <li>individuare contenuti rilevanti</li>
                                    <li>sintetizzare e proporre titoli</li>
                                    <li>organizzare la bozza</li>
                                </ul>
                            </div>
                            <div class="bg-purple-900/50 border border-purple-500/30 p-4 rounded-xl">
                                <h4 class="font-semibold text-white mb-2 text-sm"><i class="bi bi-person-check mr-2"></i>La redazione mantiene:</h4>
                                <ul class="text-xs text-gray-300 space-y-1 list-disc pl-4">
                                    <li>controllo editoriale e verifica</li>
                                    <li>scelta dei contenuti</li>
                                    <li>revisione del linguaggio</li>
                                    <li>approvazione e pubblicazione</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Come funziona -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-semibold text-reggio-ink mb-4">Come funziona</h2>
                <p class="text-gray-500 text-lg">Il flusso dalla fonte grezza alla pubblicazione.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                <!-- Linea connettiva -->
                <div class="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>
                
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-400 mb-4 shadow-sm group-hover:border-purple-400 group-hover:text-purple-500 transition-colors">1</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Fonti</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">SharePoint, Teams, Lists, documenti di progetto, calendari, portale interno.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-400 mb-4 shadow-sm group-hover:border-purple-400 group-hover:text-purple-500 transition-colors">2</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Agente</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Analizza esclusivamente fonti autorizzate: trova progetti, risultati, scadenze, eventi.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-400 mb-4 shadow-sm group-hover:border-purple-400 group-hover:text-purple-500 transition-colors">3</div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Bozza</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">L'agente propone titolo, sommario, contenuti principali e link.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 bg-purple-50 border-4 border-purple-400 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 mb-4 shadow-md">4</div>
                    <h3 class="font-semibold text-purple-700 mb-2">Revisione umana</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">La Comunicazione verifica, modifica, integra, elimina e approva.</p>
                </div>
                <div class="relative z-10 flex flex-col items-center text-center group">
                    <div class="w-16 h-16 bg-green-50 border-4 border-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-green-500 mb-4 shadow-md">5</div>
                    <h3 class="font-semibold text-green-600 mb-2">Pubblicazione</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">Distribuzione attraverso gli strumenti istituzionali dell'Ente.</p>
                </div>
            </div>
        </section>

        <!-- Cambio Prospettiva (Prima vs Dopo) -->
        <section class="bg-white py-16 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 class="text-3xl font-semibold text-reggio-ink mb-4">Il salto organizzativo</h2>
            </div>
            
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Prima -->
                    <div class="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                        <h3 class="text-center font-bold text-gray-500 uppercase tracking-widest mb-8">Prima</h3>
                        <div class="space-y-4 relative">
                            <div class="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gray-300 -translate-x-1/2"></div>
                            
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Ricerca manuale</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Email agli uffici</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Raccolta contributi</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Copia e incolla</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Sintesi</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Impaginazione</div></div>
                            <div class="relative flex justify-center"><div class="bg-gray-200 border-2 border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-2xl shadow-sm relative z-10 w-full text-center mt-4 text-sm">Revisione e Invio</div></div>
                        </div>
                    </div>
                    
                    <!-- Dopo -->
                    <div class="bg-purple-50/50 rounded-3xl p-8 border border-purple-100 shadow-sm relative">
                        <h3 class="text-center font-bold text-purple-600 uppercase tracking-widest mb-8">Dopo</h3>
                        <div class="space-y-4 relative">
                            <div class="absolute left-1/2 top-4 bottom-4 w-0.5 bg-purple-200 -translate-x-1/2"></div>
                            
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-purple-200 text-purple-800 font-medium px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center text-sm leading-tight">Fonti condivise M365</div></div>
                            <div class="relative flex justify-center"><div class="bg-purple-100 border-2 border-purple-300 text-purple-800 font-semibold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center"><i class="bi bi-robot mr-2"></i>Agente raccoglie</div></div>
                            <div class="relative flex justify-center"><div class="bg-purple-100 border-2 border-purple-300 text-purple-800 font-semibold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center text-sm leading-tight">Selezione automatica</div></div>
                            <div class="relative flex justify-center"><div class="bg-purple-100 border-2 border-purple-300 text-purple-800 font-semibold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center"><i class="bi bi-robot mr-2"></i>Bozza generata</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-purple-400 text-purple-800 font-bold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center"><i class="bi bi-person-check mr-2"></i>Revisione editoriale</div></div>
                            <div class="relative flex justify-center"><div class="bg-white border-2 border-green-300 text-green-700 font-bold px-6 py-2 rounded-full shadow-sm relative z-10 w-3/4 text-center">Approvazione umana</div></div>
                            <div class="relative flex justify-center"><div class="bg-green-100 border-2 border-green-200 text-green-800 font-bold px-6 py-3 rounded-2xl shadow-sm relative z-10 w-full text-center mt-4 text-sm">Pubblicazione</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cosa cambia per la Comunicazione -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-8 border-b-2 border-purple-600 pb-2 inline-block">Cosa cambia per la Comunicazione</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-purple-600 text-3xl mb-4"><i class="bi bi-search"></i></div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Meno ricerca manuale</h3>
                    <p class="text-sm text-gray-600">Le informazioni emergono direttamente dagli spazi digitali utilizzati dai servizi.</p>
                </div>
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-purple-600 text-3xl mb-4"><i class="bi bi-stars"></i></div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Più tempo per la qualità</h3>
                    <p class="text-sm text-gray-600">La redazione può concentrarsi maggiormente su contenuti, linguaggio e storytelling.</p>
                </div>
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-purple-600 text-3xl mb-4"><i class="bi bi-lightning-charge"></i></div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Maggiore tempestività</h3>
                    <p class="text-sm text-gray-600">Le novità possono essere intercettate molto più rapidamente e in autonomia.</p>
                </div>
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-purple-600 text-3xl mb-4"><i class="bi bi-diagram-3"></i></div>
                    <h3 class="font-semibold text-reggio-ink mb-2">Migliore copertura</h3>
                    <p class="text-sm text-gray-600">Più semplice valorizzare iniziative provenienti da strutture differenti dell'Ente.</p>
                </div>
            </div>
        </section>

        <!-- Collegamento IN COMUNE & Obiettivo -->
        <section class="bg-white py-16 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    <div>
                        <h2 class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6 border-b-2 border-purple-600 pb-2 inline-block">Collegamento con il portale "IN COMUNE"</h2>
                        <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                            Questo progetto è strettamente collegato al nuovo portale interno, che diventerà una delle principali fonti strutturate per l'agente. Ogni scheda progetto contiene:
                        </p>
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium border border-gray-200">titolo e stato</span>
                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium border border-gray-200">responsabile</span>
                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium border border-gray-200">risultato</span>
                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium border border-gray-200">prossimo passo</span>
                            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium border border-gray-200">indicatori</span>
                        </div>
                        
                        <p class="text-gray-800 font-medium text-sm mb-4">L'agente può utilizzare queste informazioni per proporre rubriche automatiche:</p>
                        
                        <div class="space-y-3">
                            <div class="bg-purple-50 text-purple-800 p-4 rounded-xl border border-purple-100 font-semibold shadow-sm flex items-center gap-3">
                                <i class="bi bi-magic text-xl"></i> "Le novità della settimana"
                            </div>
                            <div class="bg-purple-50 text-purple-800 p-4 rounded-xl border border-purple-100 font-semibold shadow-sm flex items-center gap-3">
                                <i class="bi bi-magic text-xl"></i> "5 cose che stanno cambiando in Comune"
                            </div>
                            <div class="bg-purple-50 text-purple-800 p-4 rounded-xl border border-purple-100 font-semibold shadow-sm flex items-center gap-3">
                                <i class="bi bi-magic text-xl"></i> "Progetti da conoscere"
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center">
                        <div class="bg-reggio-ink text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-8 opacity-10">
                                <i class="bi bi-bullseye text-8xl"></i>
                            </div>
                            <h2 class="text-xs font-bold text-reggio-red uppercase tracking-widest mb-6 opacity-80">Obiettivo organizzativo</h2>
                            <p class="text-gray-300 text-sm mb-4">La finalità NON è soltanto "automatizzare una newsletter". La finalità più ampia è:</p>
                            <p class="text-xl md:text-2xl font-light leading-snug relative z-10 italic">
                                "Trasformare la comunicazione interna da attività prevalentemente manuale a processo alimentato direttamente dall'ecosistema digitale dell'Ente."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Mockup Newsletter e Formati -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                <!-- Mockup -->
                <div>
                    <h2 class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6 border-b-2 border-purple-600 pb-2 inline-block">Esempio di output dell'agente</h2>
                    
                    <div class="bg-gray-100 p-6 rounded-[2rem] shadow-inner border border-gray-200">
                        <!-- Finestra simil-email -->
                        <div class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div class="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                                <div class="text-xs text-gray-500 font-medium ml-2">Bozza generata dall'Agente - Da approvare</div>
                            </div>
                            <div class="p-8">
                                <h1 class="text-3xl font-bold text-reggio-ink mb-8 border-b-4 border-reggio-red pb-4 inline-block">Questa settimana in Comune</h1>
                                
                                <div class="space-y-8">
                                    <div>
                                        <h3 class="text-xl font-bold text-reggio-ink mb-2">Ecosistema Microsoft 365</h3>
                                        <p class="text-gray-600 text-sm mb-2">Continua il percorso di migrazione e adozione dei nuovi strumenti collaborativi.</p>
                                        <a href="#" class="text-reggio-red font-semibold text-sm">Scopri cosa cambia per il tuo lavoro &rarr;</a>
                                    </div>
                                    <hr class="border-gray-100">
                                    <div>
                                        <h3 class="text-xl font-bold text-reggio-ink mb-2">Riscossione proattiva</h3>
                                        <p class="text-gray-600 text-sm mb-2">Il Servizio Entrate sta lavorando a un modello per favorire la regolarizzazione prima della fase coattiva.</p>
                                        <a href="#" class="text-reggio-red font-semibold text-sm">Approfondisci &rarr;</a>
                                    </div>
                                    <hr class="border-gray-100">
                                    <div>
                                        <h3 class="text-xl font-bold text-reggio-ink mb-2">Osservatorio Urbano</h3>
                                        <p class="text-gray-600 text-sm mb-2">Nuovi dati territoriali entrano nell'ambiente di analisi della città.</p>
                                        <a href="#" class="text-reggio-red font-semibold text-sm">Esplora il progetto &rarr;</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Formati -->
                <div>
                    <h2 class="text-xs font-bold text-purple-600 uppercase tracking-widest mb-6 border-b-2 border-purple-600 pb-2 inline-block">Possibili newsletter</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-reggio-ink text-lg">IN COMUNE | Settimana</h3>
                                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-semibold">Settimanale</span>
                            </div>
                            <p class="text-sm text-gray-600">Le principali novità interne e aggiornamenti trasversali.</p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-reggio-ink text-lg">IN COMUNE | Innovazione</h3>
                                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-semibold">Mensile</span>
                            </div>
                            <p class="text-sm text-gray-600">Progetti digitali, organizzativi e sperimentazioni per gli addetti ai lavori.</p>
                        </div>
                        
                        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 border-dashed">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-gray-600 text-lg">IN COMUNE | Per te</h3>
                                <span class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold">Evoluzione</span>
                            </div>
                            <p class="text-sm text-gray-500">Contenuti selezionati sulla base dell'Area o degli interessi professionali.</p>
                        </div>
                        
                        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 border-dashed">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-bold text-gray-600 text-lg">IN COMUNE | Leadership</h3>
                                <span class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold">Evoluzione</span>
                            </div>
                            <p class="text-sm text-gray-500">Sintesi di progetti, KPI e criticità per dirigenti e responsabili.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Human Oversight Alert -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-red-50 border-l-4 border-reggio-red p-6 md:p-8 rounded-r-2xl shadow-sm">
                <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div class="text-reggio-red text-4xl shrink-0"><i class="bi bi-shield-check"></i></div>
                    <div>
                        <h3 class="text-lg font-bold text-red-900 mb-2">Nessuna pubblicazione automatica</h3>
                        <p class="text-red-800 text-sm mb-4">L'agente deve essere utilizzato esclusivamente come <strong>assistente editoriale</strong>. Ogni contenuto destinato alla comunicazione istituzionale deve essere:</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-white text-red-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm border border-red-100"><i class="bi bi-check-circle mr-1"></i> verificato</span>
                            <span class="bg-white text-red-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm border border-red-100"><i class="bi bi-check-circle mr-1"></i> validato</span>
                            <span class="bg-white text-red-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm border border-red-100"><i class="bi bi-check-circle mr-1"></i> approvato</span>
                        </div>
                        <p class="text-red-800 text-sm mt-3">da una persona responsabile prima della pubblicazione.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- KPI / Indicatori -->
        <section class="bg-reggio-ink text-white py-20 mt-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-semibold mb-4">Indicatori di Efficacia</h2>
                    <p class="text-gray-400 max-w-2xl mx-auto">Dati dimostrativi nel prototipo. Obiettivi attesi dal nuovo processo assistito.</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div class="text-center">
                        <div class="text-4xl font-light text-purple-400 mb-2">-50%</div>
                        <div class="text-sm font-medium text-gray-300">Tempo per preparare la prima bozza</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-purple-400 mb-2">80%</div>
                        <div class="text-sm font-medium text-gray-300">Contenuti raccolti in automatico</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-gray-200 mb-2">25</div>
                        <div class="text-sm font-medium text-gray-300">Strutture potenzialmente coinvolte</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-light text-green-400 mb-2">+40%</div>
                        <div class="text-sm font-medium text-gray-300">Contenuti valorizzati rispetto a prima</div>
                    </div>
                    <div class="text-center col-span-2 md:col-span-1">
                        <div class="text-4xl font-light text-green-400 mb-2">100%</div>
                        <div class="text-sm font-medium text-gray-300">Newsletter validate umanamente</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Collegamento Strategico & Timeline -->
        <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                <!-- Timeline -->
                <div>
                    <h2 class="text-2xl font-semibold text-reggio-ink mb-8">Il percorso del progetto</h2>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                        
                        <!-- Timeline Items -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"><i class="bi bi-check"></i></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <span class="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 block">Completato</span>
                                <h4 class="font-semibold text-reggio-ink">Mappatura fonti</h4>
                                <p class="text-xs text-gray-500 mt-1">Identificazione degli spazi M365 da cui recuperare informazioni.</p>
                            </div>
                        </div>
                        
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"><i class="bi bi-arrow-repeat animate-spin-slow"></i></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-blue-50/50 p-4 rounded-xl shadow-sm border border-blue-100">
                                <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">In corso</span>
                                <h4 class="font-semibold text-reggio-ink">Modello editoriale</h4>
                                <p class="text-xs text-gray-500 mt-1">Struttura, tono, categorie e criteri di rilevanza.</p>
                            </div>
                        </div>

                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"><i class="bi bi-arrow-repeat animate-spin-slow"></i></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-blue-50/50 p-4 rounded-xl shadow-sm border border-blue-100">
                                <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 block">In corso</span>
                                <h4 class="font-semibold text-reggio-ink">Configurazione agente</h4>
                                <p class="text-xs text-gray-500 mt-1">Definizione delle fonti autorizzate e delle istruzioni.</p>
                            </div>
                        </div>
                        
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 opacity-60">
                                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Da avviare</span>
                                <h4 class="font-semibold text-gray-700">Prima newsletter pilota & Valutazione</h4>
                                <p class="text-xs text-gray-500 mt-1">Produzione assistita e misurazione qualitativa.</p>
                            </div>
                        </div>
                        
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white"></div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 opacity-60">
                                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Evoluzione</span>
                                <h4 class="font-semibold text-gray-700">Personalizzazione</h4>
                                <p class="text-xs text-gray-500 mt-1">Newsletter differenziate sulla base dei destinatari.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Strategia -->
                <div class="flex flex-col justify-center">
                    <h2 class="text-2xl font-semibold text-reggio-ink mb-8">Collegamento strategico</h2>
                    <div class="bg-purple-50 p-8 rounded-[2rem] border border-purple-100 mb-8">
                        <div class="space-y-3">
                            <div class="bg-white px-4 py-2 rounded-xl shadow-sm font-semibold text-purple-800 text-center text-sm border border-purple-100">Ecosistema Microsoft 365</div>
                            <div class="text-center text-purple-300"><i class="bi bi-arrow-down font-bold"></i></div>
                            <div class="bg-white px-4 py-2 rounded-xl shadow-sm font-semibold text-purple-800 text-center text-sm border border-purple-100">Condivisione strutturata delle informazioni</div>
                            <div class="text-center text-purple-300"><i class="bi bi-arrow-down font-bold"></i></div>
                            <div class="bg-white px-4 py-2 rounded-xl shadow-sm font-semibold text-purple-800 text-center text-sm border border-purple-100">Automazione</div>
                            <div class="text-center text-purple-300"><i class="bi bi-arrow-down font-bold"></i></div>
                            <div class="bg-white px-4 py-2 rounded-xl shadow-sm font-semibold text-purple-800 text-center text-sm border border-purple-100">Agenti digitali</div>
                            <div class="text-center text-purple-300"><i class="bi bi-arrow-down font-bold"></i></div>
                            <div class="bg-purple-600 px-4 py-3 rounded-xl shadow-md font-bold text-white text-center text-sm">Comunicazione proattiva</div>
                        </div>
                    </div>
                    
                    <div class="border-l-4 border-reggio-red pl-6 py-2 italic text-gray-700 text-lg font-medium leading-relaxed">
                        "Quando le informazioni dell'Ente diventano strutturate e condivise, possono alimentare nuovi servizi interni senza dover essere ogni volta ricercate e ricostruite manualmente."
                    </div>
                </div>

            </div>
        </section>

    </div>
    `,
    setup() {
        Vue.onMounted(() => { window.scrollTo(0, 0); });
        return {};
    }
};


const ProgettoDetailView = {
    template: `
    <div class="bg-reggio-bg min-h-screen pb-20 animate-fade-in-up" v-if="progetto">
        <div class="bg-white py-12 border-b border-reggio-line">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <router-link to="/progetti" class="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-reggio-red mb-6 transition-colors">
                    <i class="bi bi-arrow-left mr-2"></i> Torna alla dashboard progetti
                </router-link>
                
                <div class="flex flex-wrap items-center gap-3 mb-6">
                    <span :class="['px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm', progetto.badgeClass]">{{ progetto.badge }}</span>
                    <span :class="['px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border', progetto.obiettivoDUP === 'INSERITO NEL DUP' ? 'bg-reggio-soft text-reggio-green border-reggio-green' : 'bg-orange-50 text-orange-700 border-orange-200']">
                        <i class="bi bi-bullseye mr-1"></i> {{ progetto.obiettivoDUP }}
                    </span>
                    <span class="text-sm text-gray-500 ml-auto"><i class="bi bi-calendar-event mr-1"></i> Traguardo: {{ progetto.dataPrevista }}</span>
                </div>
                
                <h1 class="text-5xl font-light tracking-tight text-reggio-ink mb-4">{{ progetto.titolo }}</h1>
                <p class="text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed">{{ progetto.descrizione }}</p>
                
                <div class="flex items-center gap-6 border-t border-gray-100 pt-6">
                    <div>
                        <div class="text-xs uppercase tracking-wider text-gray-400 mb-1">Area di Riferimento</div>
                        <div class="text-reggio-red font-semibold">{{ progetto.area }}</div>
                    </div>
                    <div class="w-px h-8 bg-gray-200"></div>
                    <div>
                        <div class="text-xs uppercase tracking-wider text-gray-400 mb-1">Responsabili</div>
                        <div class="text-reggio-ink font-semibold flex items-center gap-1">
                            <i class="bi bi-people text-gray-400"></i>
                            {{ progetto.responsabili ? progetto.responsabili.join(', ') : '-' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">

                <!-- Strategic Plan Connection -->
                <div v-if="progetto.area === 'Innovazione e Digitale' || (progetto.categorie && progetto.categorie.includes('Digitale'))" class="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div class="flex items-start gap-4">
                        <i class="bi bi-journal-bookmark-fill text-3xl text-blue-600 mt-1"></i>
                        <div>
                            <h4 class="font-semibold text-blue-900 text-lg mb-1">Piano Strategico Digitale</h4>
                            <p class="text-sm text-blue-800 mb-3">Questa progettualità concorre direttamente agli obiettivi di innovazione definiti nel <strong>Reggio Emilia Next - Piano Strategico Digitale</strong>.</p>
                            <a href="https://comune-di-reggio-emilia.gitbook.io/reggio-emilia-next-piano-strategico-digitale" target="_blank" class="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 font-medium text-xs px-4 py-2 rounded-full transition-colors">
                                Consulta il documento <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                
                <!-- Disruptive Indicators -->
                <div class="bg-white p-8 rounded-2xl border border-reggio-line shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h3 class="text-2xl font-light tracking-tight text-reggio-ink mb-6 border-l-4 border-reggio-red pl-4 flex items-center gap-2">
                        <i class="bi bi-graph-up-arrow text-reggio-red"></i> Valore Pubblico & Organizzazione
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="ind in progetto.valorePubblico" class="bg-reggio-soft p-5 rounded-xl border border-gray-100">
                            <div class="text-xs text-reggio-muted uppercase tracking-wider mb-2 font-semibold">{{ ind.label }}</div>
                            <div class="text-4xl font-light tracking-tight text-reggio-ink mb-2">{{ ind.value }}</div>
                            <div class="text-sm font-semibold text-reggio-green bg-white inline-block px-2 py-1 rounded-md shadow-sm border border-gray-200">
                                {{ ind.trend }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Line Chart -->
                <div class="bg-white p-8 rounded-2xl border border-reggio-line shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h3 class="text-2xl font-light tracking-tight text-reggio-ink mb-6 border-l-4 border-reggio-red pl-4 flex items-center gap-2">
                        <i class="bi bi-activity text-reggio-red"></i> Andamento KPI (Ultimi 4 Trimestri)
                    </h3>
                    <div class="w-full h-64">
                        <canvas :id="'chart-' + progetto.id"></canvas>
                    </div>
                </div>

            </div>
            
            <div class="space-y-8">
                <!-- Avanzamento -->
                <div class="bg-white p-8 rounded-2xl border border-reggio-line shadow-sm hover:shadow-xl transition-all duration-300">
                    <h3 class="text-xl font-light tracking-tight text-reggio-ink mb-6">Stato di Avanzamento</h3>
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-4xl font-light tracking-tight text-reggio-red">{{ progetto.avanzamento }}%</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                        <div class="bg-reggio-red h-4 rounded-full transition-all duration-1000 ease-out" :style="{ width: progetto.avanzamento + '%' }"></div>
                    </div>
                </div>
                
                <!-- Categorie -->
                <div class="bg-white p-8 rounded-2xl border border-reggio-line shadow-sm hover:shadow-xl transition-all duration-300">
                    <h3 class="text-xl font-light tracking-tight text-reggio-ink mb-4">Tag Strategici</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="cat in progetto.categorie" class="bg-gray-100 border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg">{{ cat }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-20 text-xl text-gray-500 font-light">Progetto non trovato</div>
    `,
    setup() {
        const route = VueRouter.useRoute();
        const progetto = Vue.computed(() => {
            const id = route.params.id;
            return progettiData.find(p => p.id == id || p.id === id) || progettiData[1]; 
        });

        Vue.onMounted(() => {
            window.scrollTo(0, 0);
            
            // Initialize dynamic chart based on project
            setTimeout(() => {
                if (!progetto.value) return;
                const canvasId = 'chart-' + progetto.value.id;
                const ctx = document.getElementById(canvasId);
                if (ctx) {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['T1', 'T2', 'T3', 'T4', 'Oggi'],
                            datasets: [{
                                label: 'Miglioramento Performance',
                                data: [10, 25, 45, 70, 95],
                                borderColor: '#cc1f2c', // reggio-red
                                backgroundColor: 'rgba(204, 31, 44, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#fff',
                                pointBorderColor: '#cc1f2c',
                                pointRadius: 5
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { 
                                y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                                x: { grid: { display: false } }
                            }
                        }
                    });
                }
            }, 300);
        });

        return { progetto };
    }
};

const RisultatiView = {
    template: `
    <div class="bg-gray-50 min-h-screen py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-2">Risultati di Valore Pubblico</h1>
            <p class="text-xl text-gray-600 mb-12">L'impatto misurabile dei progetti sui processi, sui servizi e sulle persone del Comune di Reggio Emilia.</p>
            
            <!-- Indicatori Globali -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-reggio-red mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-clock-history text-3xl"></i> -40%
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Tempo medio di gestione</h3>
                    <p class="text-sm text-gray-500 mb-4">Delle pratiche interne, grazie al nuovo ecosistema collaborativo.</p>
                </div>
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-blue-600 mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-send-check text-3xl"></i> 24.500
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Notifiche digitali inviate</h3>
                    <p class="text-sm text-gray-500 mb-4">Tramite canali integrati (App IO), riducendo drasticamente le spese postali.</p>
                </div>
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-green-600 mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-tree text-3xl"></i> -18%
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Impronta Carbonica (CO2)</h3>
                    <p class="text-sm text-gray-500 mb-4">Riduzione stimata nei processi amministrativi grazie al cloud e dematerializzazione.</p>
                </div>
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-indigo-600 mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-people text-3xl"></i> +32%
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Indice Collaborazione</h3>
                    <p class="text-sm text-gray-500 mb-4">Lavoro simultaneo su documenti, rispetto agli scambi tradizionali via email.</p>
                </div>
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-yellow-600 mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-file-earmark-x text-3xl"></i> -65%
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Allegati Email Interni</h3>
                    <p class="text-sm text-gray-500 mb-4">Sostituiti da link diretti ai documenti condivisi in SharePoint/OneDrive.</p>
                </div>
                
                <div class="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-5xl font-light tracking-tight text-teal-600 mb-3 flex items-center justify-center gap-2">
                        <i class="bi bi-shield-check text-3xl"></i> 100%
                    </div>
                    <h3 class="text-lg font-semibold text-reggio-ink mb-2">Dati in Sicurezza</h3>
                    <p class="text-sm text-gray-500 mb-4">File precedentemente su cartelle locali ora migrati in cloud centralizzato.</p>
                </div>
                
            </div>
            
            <!-- Grafico a Linee (Sostituisce il Doughnut) -->
            <h2 class="text-3xl font-semibold tracking-tight text-reggio-ink mb-8 border-l-4 border-reggio-red pl-4">Andamento Efficienza e Dematerializzazione</h2>
            <div class="bg-white p-8 rounded-3xl border border-gray-200 mb-16 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-full h-96">
                    <canvas id="lineChartRisultati"></canvas>
                </div>
                <div class="mt-6 text-center text-gray-500 text-sm">
                    I dati mostrano il trend di adozione delle piattaforme cloud (linea blu) e la conseguente riduzione dei processi manuali/cartacei (linea rossa).
                </div>
            </div>
            
        </div>
    </div>
    `,
    setup() {
        onMounted(() => { 
            window.scrollTo(0, 0); 
            
            setTimeout(() => {
                const ctx = document.getElementById('lineChartRisultati');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Oggi'],
                            datasets: [
                                {
                                    label: 'Adozione Strumenti Cloud',
                                    data: [10, 25, 40, 55, 75, 85, 92],
                                    borderColor: '#1d4ed8', // blue-700
                                    backgroundColor: 'rgba(29, 78, 216, 0.1)',
                                    borderWidth: 3,
                                    fill: true,
                                    tension: 0.4,
                                    pointBackgroundColor: '#fff',
                                    pointBorderColor: '#1d4ed8',
                                    pointRadius: 6
                                },
                                {
                                    label: 'Processi Manuali (Riduzione)',
                                    data: [100, 95, 80, 65, 45, 30, 15],
                                    borderColor: '#cc1f2c', // reggio-red
                                    backgroundColor: 'transparent',
                                    borderWidth: 3,
                                    borderDash: [5, 5],
                                    fill: false,
                                    tension: 0.4,
                                    pointBackgroundColor: '#fff',
                                    pointBorderColor: '#cc1f2c',
                                    pointRadius: 6
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8, font: { family: "'Titillium Web', sans-serif", size: 14 } } },
                                tooltip: { mode: 'index', intersect: false }
                            },
                            scales: {
                                y: { 
                                    beginAtZero: true, 
                                    max: 100,
                                    grid: { borderDash: [5, 5], color: '#f3f4f6' },
                                    ticks: { callback: function(value) { return value + '%'; } }
                                },
                                x: { 
                                    grid: { display: false } 
                                }
                            },
                            interaction: { mode: 'nearest', axis: 'x', intersect: false }
                        }
                    });
                }
            }, 300);
        });
    }
};

const AreeView = {
    template: `
    <div class="bg-reggio-soft min-h-screen py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-2">Le nostre Aree</h1>
            <p class="text-xl text-gray-600 mb-8">Esplora i progetti e le innovazioni divisi per struttura organizzativa.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="area in aree" :key="area.id" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div class="p-6 flex-grow">
                        <h3 class="text-xl font-semibold text-reggio-ink mb-3">{{ area.nome }}</h3>
                        <p class="text-gray-600 text-sm mb-6 line-clamp-2">{{ area.descrizione }}</p>
                        <div class="flex gap-4 mb-4">
                            <div>
                                <div class="text-2xl font-semibold text-reggio-ink">{{ area.progettiAttivi }}</div>
                                <div class="text-xs text-gray-500 uppercase">Progetti attivi</div>
                            </div>
                            <div>
                                <div class="text-2xl font-semibold text-reggio-ink">{{ area.risultatiRecenti }}</div>
                                <div class="text-xs text-gray-500 uppercase">Risultati recenti</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 border-t border-gray-100 bg-reggio-soft">
                        <router-link :to="'/aree/' + area.id" class="text-reggio-red font-semibold text-sm hover:underline w-full text-center block">Esplora l'Area</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    setup() {
        onMounted(() => window.scrollTo(0, 0));
        return { aree: areeData };
    }
};

const AreaDetailView = {
    template: `
    <div class="bg-white min-h-screen pb-20" v-if="area">
        <div class="bg-gray-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <router-link to="/aree" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white mb-6 transition-colors">
                    <i class="bi bi-arrow-left text-lg mr-1"></i> Tutte le aree
                </router-link>
                <h1 class="text-4xl font-semibold tracking-tight mb-4">{{ area.nome }}</h1>
                <p class="text-2xl font-light text-gray-300 max-w-3xl">{{ area.missione || area.descrizione }}</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 class="text-2xl font-semibold text-reggio-ink mb-6 border-l-4 border-reggio-red pl-4">Progetti in evidenza</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <!-- Highlight M365 -->
                <div class="bg-white rounded-xl border border-blue-200 p-5 shadow-md bg-blue-50/50">
                    <span class="inline-block px-2 py-1 rounded text-xs font-semibold badge-in-corso mb-3">In corso</span>
                    <h4 class="font-semibold text-lg mb-2">Ecosistema Microsoft 365</h4>
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">Non solo nuovi strumenti: un nuovo modo di lavorare insieme.</p>
                    <router-link to="/progetti/m365" class="text-reggio-red text-sm font-semibold hover:underline mt-2 inline-block">Vedi la trasformazione</router-link>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <span class="inline-block px-2 py-1 rounded text-xs font-semibold badge-in-sperimentazione mb-3">In sperimentazione</span>
                    <h4 class="font-semibold text-lg mb-2">Digital Twin</h4>
                    <router-link to="/progetti/2" class="text-reggio-red text-sm font-medium hover:underline mt-2 inline-block">Vedi dettagli</router-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-20">Area non trovata</div>
    `,
    setup() {
        const route = VueRouter.useRoute();
        const area = computed(() => areeData.find(a => a.id === route.params.id) || areeData[2]); 
        onMounted(() => {
            window.scrollTo(0, 0);
        });
        return { area };
    }
};

const VideoView = {
    template: `
    <div class="bg-reggio-soft min-h-screen py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-10">
                <h1 class="text-4xl font-semibold tracking-tight text-reggio-ink mb-2">3 minuti per capire</h1>
                <p class="text-xl text-gray-600">Videopillole veloci per comprendere nuovi strumenti, concetti e progetti.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div v-for="video in videoList" :key="video.id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
                    <div class="aspect-video bg-gray-800 relative flex items-center justify-center">
                        <div class="text-5xl font-light tracking-tight">{{ video.thumb }}</div>
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-reggio-ink transform group-hover:scale-110 transition-transform">
                                <i class="bi bi-play-fill text-2xl ml-1"></i>
                            </div>
                        </div>
                        <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{{ video.durata }}</div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-reggio-ink line-clamp-2 text-sm">{{ video.titolo }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    setup() {
        onMounted(() => { window.scrollTo(0, 0);   });
        return { videoList: videoData };
    }
};

const RoadmapView = {
    template: `<div class="bg-reggio-soft min-h-screen py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-24">
                <h1 class="text-5xl font-semibold tracking-tight text-reggio-ink mb-6">La Roadmap dell'Ente</h1>
                <p class="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Le tappe operative della transizione digitale e organizzativa del Comune di Reggio Emilia dal 2026 al 2028.</p>
            </div>
            
            <!-- Timeline Verticale Light -->
            <div class="relative max-w-5xl mx-auto">
                <!-- Linea centrale verticale -->
                <div class="absolute left-8 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                <div class="space-y-24 relative">
                    
                    <!-- 2026 -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between md:justify-normal group">
                        <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full pl-24 md:pl-0">
                            <h3 class="text-5xl font-bold text-reggio-ink mb-3 group-hover:text-reggio-red transition-colors">2026</h3>
                            <h4 class="text-2xl font-semibold text-gray-600 mb-6">Fondamenta e Migrazione</h4>
                            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300">
                                <ul class="text-gray-600 space-y-5">
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Lancio Ecosistema Microsoft 365 per tutto l'Ente</span> <div class="bg-red-50 text-reggio-red w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-cloud-fill text-xl"></i></div></li>
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Migrazione dati in cloud e setup Data Governance</span> <div class="bg-red-50 text-reggio-red w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-database-fill text-xl"></i></div></li>
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Avvio piano di change management e formazione</span> <div class="bg-red-50 text-reggio-red w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-people-fill text-xl"></i></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="absolute left-8 md:left-1/2 md:-ml-[16px] w-8 h-8 rounded-full bg-white border-4 border-reggio-red z-10 shadow-md group-hover:scale-125 transition-transform duration-300"></div>
                        <div class="md:w-1/2 md:pl-16 hidden md:block"></div>
                    </div>

                    <!-- 2027 -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between md:justify-normal group">
                        <div class="md:w-1/2 md:pr-16 hidden md:block"></div>
                        <div class="absolute left-8 md:left-1/2 md:-ml-[16px] w-8 h-8 rounded-full bg-white border-4 border-blue-500 z-10 shadow-md group-hover:scale-125 transition-transform duration-300"></div>
                        <div class="md:w-1/2 md:pl-16 text-left w-full pl-24 md:pl-0">
                            <h3 class="text-5xl font-bold text-reggio-ink mb-3 group-hover:text-blue-600 transition-colors">2027</h3>
                            <h4 class="text-2xl font-semibold text-gray-600 mb-6">Accelerazione e Dati</h4>
                            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                                <ul class="text-gray-600 space-y-5">
                                    <li class="flex items-center gap-4"><div class="bg-blue-50 text-blue-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"><i class="bi bi-map-fill text-xl"></i></div> <span class="font-medium text-gray-800 text-lg leading-tight text-left">Integrazione Digital Twin e cruscotti direzionali</span></li>
                                    <li class="flex items-center gap-4"><div class="bg-blue-50 text-blue-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"><i class="bi bi-robot text-xl"></i></div> <span class="font-medium text-gray-800 text-lg leading-tight text-left">Primi test di AI applicata ai servizi interni</span></li>
                                    <li class="flex items-center gap-4"><div class="bg-blue-50 text-blue-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"><i class="bi bi-file-earmark-check-fill text-xl"></i></div> <span class="font-medium text-gray-800 text-lg leading-tight text-left">Dematerializzazione avanzata dei flussi organizzativi</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 2028 -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between md:justify-normal group">
                        <div class="md:w-1/2 md:pr-16 text-left md:text-right w-full pl-24 md:pl-0">
                            <h3 class="text-5xl font-bold text-reggio-ink mb-3 group-hover:text-green-600 transition-colors">2028</h3>
                            <h4 class="text-2xl font-semibold text-gray-600 mb-6">L'Ente Proattivo</h4>
                            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300">
                                <ul class="text-gray-600 space-y-5">
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Full cloud adoption e dismissione server fisici</span> <div class="bg-green-50 text-green-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-hdd-network-fill text-xl"></i></div></li>
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Automazione processi core e interoperabilità totale</span> <div class="bg-green-50 text-green-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-gear-wide-connected text-xl"></i></div></li>
                                    <li class="flex items-center md:justify-end gap-4"><span class="md:order-1 font-medium text-gray-800 text-lg leading-tight text-left md:text-right">Erogazione di servizi proattivi tramite AI</span> <div class="bg-green-50 text-green-600 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:order-2"><i class="bi bi-stars text-xl"></i></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="absolute left-8 md:left-1/2 md:-ml-[16px] w-8 h-8 rounded-full bg-white border-4 border-green-500 z-10 shadow-md group-hover:scale-125 transition-transform duration-300"></div>
                        <div class="md:w-1/2 md:pl-16 hidden md:block"></div>
                    </div>

                </div>
            </div>
            
        </div>
    </div>`,    setup() {
        Vue.onMounted(() => window.scrollTo(0, 0));
        return {};
    }
};

const RicercaView = {
    template: `
    <div class="bg-white min-h-screen py-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative mb-8">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i class="bi bi-search text-gray-400 text-2xl"></i>
                </div>
                <input type="text" v-model="query" autofocus placeholder="Cerca 'Microsoft 365'..." class="block w-full pl-12 pr-4 py-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-reggio-red transition-colors bg-transparent">
            </div>
            
            <div v-if="query.toLowerCase().includes('365') || query.toLowerCase().includes('micro')" class="space-y-6">
                <div class="bg-blue-50 p-5 rounded-xl border border-blue-200 hover:border-blue-400 cursor-pointer transition-colors shadow-sm" @click="$router.push('/progetti/m365')">
                    <div class="text-xs font-semibold text-blue-600 mb-1">PROGETTO CHIAVE</div>
                    <h3 class="text-lg font-semibold text-reggio-ink">Ecosistema Microsoft 365</h3>
                    <p class="text-gray-600 text-sm mt-1">Non solo nuovi strumenti: un nuovo modo di lavorare insieme.</p>
                </div>
            </div>
            <div v-else class="text-gray-500 text-center py-10">
                Digita "Microsoft" o "365" per testare la ricerca...
            </div>
        </div>
    </div>
    `,
    setup() {
        const query = ref('');
        onMounted(() => { window.scrollTo(0, 0);   });
        return { query };
    }
};

const IdeaView = {
    template: `<div class="bg-reggio-soft min-h-screen py-10"><div class="max-w-3xl mx-auto text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">Modulo "Proponi un'idea" (Demo)</div></div>`,
    setup() { onMounted(() => window.scrollTo(0, 0)); }
};

// --- ROUTER CONFIG ---
const routes = [
    { path: '/', component: HomeView },
    { path: '/progetti', component: ProgettiView },
    { path: '/progetti/m365', component: ProgettoM365View },
    { path: '/progetti/riscossione', component: ProgettoRiscossioneView },
    { path: '/progetti/newsletter', component: ProgettoNewsletterView },
    { path: '/progetti/:id', component: ProgettoDetailView },
    { path: '/risultati', component: RisultatiView },
    { path: '/aree', component: AreeView },
    { path: '/aree/:id', component: AreaDetailView },
    { path: '/video', component: VideoView },
    { path: '/roadmap', component: RoadmapView },
    { path: '/ricerca', component: RicercaView },
    { path: '/idea', component: IdeaView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { top: 0 };
    }
});

// --- APP INIT ---
const app = createApp({});
app.use(router);
app.mount('#app');




























