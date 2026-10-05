export type HubSearchId='faculdade'|'concursos'|'ipe'|'carreira'|'certificados'|'projetos';
export type HubSearchItem={id:HubSearchId;title:string;category:string;keywords:string};

export const hubSearchItems:HubSearchItem[]=[
 {id:'faculdade',title:'Faculdade',category:'Agente',keywords:'estudos engenharia computação aulas'},
 {id:'concursos',title:'Concursos',category:'Agente',keywords:'editais questões preparação'},
 {id:'ipe',title:'IPE Trading',category:'Agente',keywords:'mercado estratégia dados diário trades'},
 {id:'carreira',title:'Carreira & Tecnologia',category:'Agente',keywords:'carreira tecnologia portfólio evolução profissional'},
 {id:'certificados',title:'Certificados',category:'Carreira',keywords:'certificado cursos conquistas formações'},
 {id:'projetos',title:'Projetos',category:'Espaço',keywords:'projeto ideias portfólio entregas'},
];

const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();

export function filterHubSearch(query:string){
 const term=normalize(query);
 if(!term)return hubSearchItems;
 return hubSearchItems.filter(item=>normalize(`${item.title} ${item.category} ${item.keywords}`).includes(term));
}
