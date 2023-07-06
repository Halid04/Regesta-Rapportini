namespace rapportini.db;

entity Rapportini
{
   key ID: UUID;
    IDUtente : Integer;
    utente : String(50);
    IDCliente : Association to one Clienti;
    IDCommessa : Association to one Commesse;
    IDClienteSede : Association to one ClientiSedi;
    IDProgetto : Integer;
    IDProgettoAttivita : Integer;
    IDToDoList : Association to one TodoList;
    codice : String(50);
    descrizione : String(250);
    attivita : String(50);
    sede : String(10);
    destinazione : String(50);
    giorno : DateTime;
    ore : Decimal(18,1);
    oreLavorate : Decimal(18,1);
    km : Integer;
    kmEuro : Decimal(18,2);
    pedaggio : Decimal(18,2);
    forfait : Decimal(18,2);
    vitto : Decimal(18,2);
    alloggio : Decimal(18,2);
    noleggio : Decimal(18,2);
    trasporti : Decimal(18,2);
    varie : Decimal(18,2);
    plus : Boolean;
    fatturabile : Boolean;
    bloccato : Boolean;
    speseVarie : Decimal(18,2);
    docente : String(100);
    IDCommessa2 : Association to one Commesse;
    IDToDoList2 : Association to one TodoList;
    ore2 : Decimal(18,1);
    descrizione2 : String(250);
    ruolo : String(50);
    bloccatoAdmin : Boolean;
    IDCorso : Integer;
    amsh24 : Boolean;
    
}


entity RapportiniCestinati
{
   key ID: UUID;
    IDUtente : Integer;
    utente : String(50);
    IDCliente : Association to one Clienti;
    IDCommessa : Association to one Commesse;
    IDClienteSede : Association to one ClientiSedi;
    IDProgetto : Integer;
    IDProgettoAttivita : Integer;
    IDToDoList : Association to one TodoList;
    codice : String(50);
    descrizione : String(250);
    attivita : String(50);
    sede : String(10);
    destinazione : String(50);
    giorno : DateTime;
    ore : Decimal(18,1);
    oreLavorate : Decimal(18,1);
    km : Integer;
    kmEuro : Decimal(18,2);
    pedaggio : Decimal(18,2);
    forfait : Decimal(18,2);
    vitto : Decimal(18,2);
    alloggio : Decimal(18,2);
    noleggio : Decimal(18,2);
    trasporti : Decimal(18,2);
    varie : Decimal(18,2);
    plus : Boolean;
    fatturabile : Boolean;
    bloccato : Boolean;
    speseVarie : Decimal(18,2);
    docente : String(100);
    IDCommessa2 : Association to one Commesse;
    IDToDoList2 : Association to one TodoList;
    ore2 : Decimal(18,1);
    descrizione2 : String(250);
    ruolo : String(50);
    bloccatoAdmin : Boolean;
    IDCorso : Integer;
    amsh24 : Boolean;
    
}

entity Clienti
{
   key ID: Integer @(IncrementalCounter: true, InitialValue: 1);
    codice : String(50);
    descrizione : String(250);
    password : String(250);
    giorniProgettoAnno : Decimal(18,1);
    giorniFunzionaleAnno : Decimal(18,1);
    giorniSviluppoAnno : Decimal(18,1);
    revisione : Boolean;
    sapCodice : String(250);
    logo : String(250);
    scheda : String(250);
    account : String(150);
}

entity RapportiniAllegati
{
    key ID: Integer @(IncrementalCounter: true, InitialValue: 1);
    IDRapportino : Integer;
    allegato : String(250);
    descrizione : String(250);
}

entity ClientiSedi
{
    key ID: Integer @(IncrementalCounter: true, InitialValue: 1);
    IDCliente : Association to one Clienti;
    codiceSede : String(50);
    sede : String(250);
    km : Integer;
    pedaggio : Decimal(18,2);
    km2 : Integer;
    pedaggio2: Decimal(18,2);
    km3 : Integer;
    pedaggio3 : Decimal(18,2);
    km4 : Integer;
    pedaggio4 : Decimal(18,2);
    km5 : Integer;
    pedaggioedaggio5 : Decimal(18,2);
}

entity TodoList
{
    key ID: Integer @(IncrementalCounter: true, InitialValue: 1);
    insertDate : DateTime;
    utente : String(50);
    IDCliente : Association to one Clienti;
    IDCommessa : Association to one Commesse;
    areaFunzionale : String(10);
    titolo : String(250);
    testo : String;
    propostoA : String(50);
    giorniStima : Decimal(18,3);
    dataConsegnaRichiesta : DateTime;
    assegnatoA : String(250);
    giorniCons : Decimal(18,3);
    dataConsegnaSchedulata : DateTime;
    status : Integer;
    dataChiusura : DateTime;
    ordinamento : Integer;
    allegato : String(250);
    statusPrev : Integer;
    externalID : String(50);
    flagVisibileCliente : Boolean;
    dataProduzione : DateTime;
    flagBugFix : Boolean;
    giorniConsCliente : Decimal(18,3);
    chatPubblica : String;
    assegnatoAPrev : String(250);
    flagCR : Boolean;
    flagArxivar : Boolean;
    IDTodoListParent : Integer;
    chatPrivata : String;
    dataSpecifiche : DateTime;
    giorniConsDev : Decimal(18,3);
    giorniStimaDev : Decimal(18,3);
    giorniStimaFunz : Decimal(18,3);
    giorniConsFunz : Decimal(18,3);
    dataSviluppi : DateTime;
    flagDev : Boolean;
    flagFunz : Boolean;
    criticita : String(20);
    flagPadre : Boolean;
    flagFiglio : Boolean;
    nRilavorazioni : Integer;
    supportoFunzionale : String(250);
    flagNeedDev : Boolean;
    flagNeedFunz : Boolean;
    flagIngegnerizzabile : Boolean;
    nAllegati : Integer;
    ordineSap : String(40);
    ultimaModifica : DateTime;
    ultimaModificaUtente : String(50);
    ultimaModificaCliente : DateTime;
    ultimaModificaUtenteCliente : String(50);
    flagAms : Boolean;
    IDTodoListTipologia : Integer;
    inoltraA : String(250);
    messageID : String(255);
}

entity Commesse
{
    key ID : Integer default 1;
    IDSocieta : Integer;
    codice : String(50);
    macroCommessa: String(50);
    descrizione : String(250);
    stato : Integer;
    dataInizio : Date;
    dataFine : Date;
    dataGolive : Date;
    rifCliente : String(250);
    rifProgetto : String(250);
    rifFunzionale : String(250);
    rifTecnico : String(250);
    giorniProgetto : Decimal(18,1);
    giorniFunzionale : Decimal(18,1);
    giorniSviluppo : Decimal(18,1);
    note : String(250);
    pianificabile : Boolean;
    visibileCliente : Boolean;
    codiceIcms : String(100);
    sapOdv : String(50);
    tipologia : String(50);
    categoria : String(50);
    fixOrTimeMaterial : String(2);
    IDCliente : Association to one Clienti;
}
