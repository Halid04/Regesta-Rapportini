namespace rapportini.db;

entity Rapportini {
    key ID                 : UUID;
        IDUtente           : Integer;
        utente             : String(50);
        IDCliente          : Association to one Clienti;
        IDCommessa         : Association to one Commesse;
        IDClienteSede      : Association to one ClientiSedi;
        IDProgetto         : Integer;
        IDProgettoAttivita : Integer;
        IDTicket         : Association to one Tickets;
        codice             : String(50);
        descrizione        : String(250);
        attivita           : String(50);
        sede               : String(10);
        destinazione       : String(50);
        giorno             : Date;
        ore                : Decimal(18, 1);
        oreLavorate        : Decimal(18, 1);
        km                 : Integer;
        kmEuro             : Decimal(18, 2);
        pedaggio           : Decimal(18, 2);
        forfait            : Decimal(18, 2);
        vitto              : Decimal(18, 2);
        alloggio           : Decimal(18, 2);
        noleggio           : Decimal(18, 2);
        trasporti          : Decimal(18, 2);
        varie              : Decimal(18, 2);
        plus               : Boolean;
        fatturabile        : Boolean;
        bloccato           : Boolean;
        speseVarie         : Decimal(18, 2);
        docente            : String(100);
        IDCommessa2        : Association to one Commesse;
        IDTicket2        : Association to one Tickets;
        ore2               : Decimal(18, 1);
        descrizione2       : String(250);
        ruolo              : String(50);
        bloccatoAdmin      : Boolean;
        IDCorso            : Integer;
        amsh24             : Boolean;

}


entity RapportiniCestinati {
    key ID                 : UUID;
        IDUtente           : Integer;
        utente             : String(50);
        IDCliente          : Association to one Clienti;
        IDCommessa         : Association to one Commesse;
        IDClienteSede      : Association to one ClientiSedi;
        IDProgetto         : Integer;
        IDProgettoAttivita : Integer;
        IDTicket       : Association to one Tickets;
        codice             : String(50);
        descrizione        : String(250);
        attivita           : String(50);
        sede               : String(10);
        destinazione       : String(50);
        giorno             : DateTime;
        ore                : Decimal(18, 1);
        oreLavorate        : Decimal(18, 1);
        km                 : Integer;
        kmEuro             : Decimal(18, 2);
        pedaggio           : Decimal(18, 2);
        forfait            : Decimal(18, 2);
        vitto              : Decimal(18, 2);
        alloggio           : Decimal(18, 2);
        noleggio           : Decimal(18, 2);
        trasporti          : Decimal(18, 2);
        varie              : Decimal(18, 2);
        plus               : Boolean;
        fatturabile        : Boolean;
        bloccato           : Boolean;
        speseVarie         : Decimal(18, 2);
        docente            : String(100);
        IDCommessa2        : Association to one Commesse;
        IDTicket2        : Association to one Tickets;
        ore2               : Decimal(18, 1);
        descrizione2       : String(250);
        ruolo              : String(50);
        bloccatoAdmin      : Boolean;
        IDCorso            : Integer;
        amsh24             : Boolean;

}

entity Clienti {
    key ID                   : Integer default 1;
        codice               : String(50);
        descrizione          : String(250);
        password             : String(250);
        giorniProgettoAnno   : Decimal(18, 1);
        giorniFunzionaleAnno : Decimal(18, 1);
        giorniSviluppoAnno   : Decimal(18, 1);
        revisione            : Boolean;
        sapCodice            : String(250);
        logo                 : String(250);
        scheda               : String(250);
        account              : String(150);
}

entity RapportiniAllegati {
    key ID           : Integer @(
            IncrementalCounter: true,
            InitialValue      : 1
        );
        IDRapportino : Integer;
        allegato     : String(250);
        descrizione  : String(250);
}

entity ClientiSedi {
    key ID               : Integer @(
            IncrementalCounter: true,
            InitialValue      : 1
        );
        IDCliente        : Association to one Clienti;
        codiceSede       : String(50);
        sede             : String(250);
        km               : Integer;
        pedaggio         : Decimal(18, 2);
        km2              : Integer;
        pedaggio2        : Decimal(18, 2);
        km3              : Integer;
        pedaggio3        : Decimal(18, 2);
        km4              : Integer;
        pedaggio4        : Decimal(18, 2);
        km5              : Integer;
        pedaggioedaggio5 : Decimal(18, 2);
}



entity Commesse {
    key ID                : Integer default 1;
        IDSocieta         : Integer;
        codice            : String(50);
        macroCommessa     : String(50);
        descrizione       : String(250);
        stato             : Integer;
        dataInizio        : Date;
        dataFine          : Date;
        dataGolive        : Date;
        rifCliente        : String(250);
        rifProgetto       : String(250);
        rifFunzionale     : String(250);
        rifTecnico        : String(250);
        giorniProgetto    : Decimal(18, 1);
        giorniFunzionale  : Decimal(18, 1);
        giorniSviluppo    : Decimal(18, 1);
        note              : String(250);
        pianificabile     : Boolean;
        visibileCliente   : Boolean;
        codiceIcms        : String(100);
        sapOdv            : String(50);
        tipologia         : String(50);
        categoria         : String(50);
        fixOrTimeMaterial : String(2);
        IDCliente         : Association to one Clienti;
}

entity Tickets {
    key ID                          : UUID;
        insertDate                  : Date;
        utente                      : String(50);
        IDCliente                   : Association to Clienti;
        IDCommessa                  : Association to Commesse;
        areaFunzionale              : String(50);
        titolo                      : String(250);
        testo                       : LargeString;
        propostoA                   : String(50);
        giorniStima                 : Decimal(18, 3);
        dataConsegnaRichiesta       : Date;
        assegnatoA                  : String(250);
        giorniCons                  : Decimal(18, 3);
        dataConsegnaSchedulata      : Date;
        status                      : Integer;
        dataChiusura                : Date;
        ordinamento                 : Integer;
        allegato                    : String(250);
        statusPrev                  : Integer;
        externalID                  : String(50);
        flagVisibileCliente         : Boolean;
        dataProduzione              : Date;
        flagBugFix                  : Boolean;
        giorniConsCliente           : Decimal(18, 3);
        chatPubblica                : LargeString;
        assegnatoAPrev              : String(250);
        flagCR                      : Boolean;
        flagArxivar                 : Boolean;
        IDParent                    : Integer;
        chatPrivata                 : LargeString;
        dataSpecifiche              : Date;
        giorniConsDev               : Decimal(18, 3);
        giorniStimaDev              : Decimal(18, 3);
        giorniStimaFunz             : Decimal(18, 3);
        giorniConsFunz              : Decimal(18, 3);
        dataSviluppi                : Date;
        flagDev                     : Boolean;
        flagFunz                    : Boolean;
        criticita                   : LargeString;
        flagPadre                   : Boolean;
        flagFiglio                  : Boolean;
        nRilavorazioni              : Integer;
        supportoFunzionale          : String(250);
        flagNeedDev                 : Boolean;
        flagNeedFunz                : Boolean;
        flagIngegnerizzabile        : Boolean;
        nAllegati                   : Integer;
        ultimaModifica              : Date;
        ultimaModificaUtente        : String(50);
        ultimaModificaCliente       : Date;
        ultimaModificaUtenteCliente : String(50);
        flagAms                     : Boolean;
        IDTipologia                 : Association to Tipologia;
        inoltraA                    : String(250);
        messageID                   : String(255);
}

entity TicketsCestinati {
        key ID                          : UUID;
        insertDate                  : Date;
        utente                      : String(50);
        IDCliente                   : Association to Clienti;
        IDCommessa                  : Association to Commesse;
        areaFunzionale              : String(50);
        titolo                      : String(250);
        testo                       : LargeString;
        propostoA                   : String(50);
        giorniStima                 : Decimal(18, 3);
        dataConsegnaRichiesta       : Date;
        assegnatoA                  : String(250);
        giorniCons                  : Decimal(18, 3);
        dataConsegnaSchedulata      : Date;
        status                      : Integer;
        dataChiusura                : Date;
        ordinamento                 : Integer;
        allegato                    : String(250);
        statusPrev                  : Integer;
        externalID                  : String(50);
        flagVisibileCliente         : Boolean;
        dataProduzione              : Date;
        flagBugFix                  : Boolean;
        giorniConsCliente           : Decimal(18, 3);
        chatPubblica                : LargeString;
        assegnatoAPrev              : String(250);
        flagCR                      : Boolean;
        flagArxivar                 : Boolean;
        IDParent                    : Integer;
        chatPrivata                 : LargeString;
        dataSpecifiche              : Date;
        giorniConsDev               : Decimal(18, 3);
        giorniStimaDev              : Decimal(18, 3);
        giorniStimaFunz             : Decimal(18, 3);
        giorniConsFunz              : Decimal(18, 3);
        dataSviluppi                : Date;
        flagDev                     : Boolean;
        flagFunz                    : Boolean;
        criticita                   : LargeString;
        flagPadre                   : Boolean;
        flagFiglio                  : Boolean;
        nRilavorazioni              : Integer;
        supportoFunzionale          : String(250);
        flagNeedDev                 : Boolean;
        flagNeedFunz                : Boolean;
        flagIngegnerizzabile        : Boolean;
        nAllegati                   : Integer;
        ordineSap                   : String(40);
        ultimaModifica              : Date;
        ultimaModificaUtente        : String(50);
        ultimaModificaCliente       : Date;
        ultimaModificaUtenteCliente : String(50);
        flagAms                     : Boolean;
        IDTipologia                 : Association to Tipologia;
        inoltraA                    : String(250);
        messageID                   : String(255);
}

entity ClientiAreeFunzionali {
    key ID             : Integer;
        IDCliente      : Association to Clienti;
        IDCommessa     : Association to Commesse;
        areaFunzionale : String(50);
        emailList      : String(4000);
        flagAms        : Boolean;
}

entity ChangeLog {
    key ID                     : Integer;
        insertDate             : Date;
        utente                 : String(50);
        IDTicket               : Association to Tickets;
        titolo                 : String(250);
        testo                  : LargeString;
        propostoA              : String(50);
        giorniStima            : Decimal(18, 3);
        dataConsegnaRichiesta  : Date;
        assegnatoA             : String(250);
        giorniCons             : Decimal(18, 3);
        dataConsegnaSchedulata : Date;
        status                 : Integer;
        dataChiusura           : Date;
        ordinamento            : Integer;
        allegato               : String(250);
        statusPrev             : Integer;
        externalID             : String(50);
        flagVisibileCliente    : Boolean;
        updateDate             : Date;
        updateUtente           : String(50);
        dataProduzione         : Date;
        flagBugFix             : Boolean;
        giorniConsCliente      : Decimal(18, 3);
        chatPubblica           : LargeString;
        assegnatoAPrev         : String(250);
        flagCR                 : Boolean;
        chatPrivata            : LargeString;
        dataSpecifiche         : Date;
        giorniConsDev          : Decimal(18, 3);
        giorniStimaDev         : Decimal(18, 3);
        giorniStimaFunz        : Decimal(18, 3);
        giorniConsFunz         : Decimal(18, 3);
        dataSviluppi           : Date;
        flagDev                : Boolean;
        flagFunz               : Boolean;
        criticita              : String(20);
        flagFiglio             : Boolean;
        flagPadre              : Boolean;
        nRilavorazioni         : Integer;
        supportoFunzionale     : String(250);
        flagNeedDev            : Boolean;
        flagNeedFunz           : Boolean;
        areaFunzionale         : String(10);
        IDParent               : Integer;
        flagArxivar            : Boolean;
        flagIngegnerizzabile   : Boolean;
        nAllegati              : Integer;
        sentTo                 : String(2000);
        ordineSap              : String(40);
        flagAms                : Boolean;
        IDTipologia            : Association to Tipologia;
        inoltraA               : String(250);
}

entity Status {
    key ID       : Integer;
        status   : String(30);
        statusIT : String(30);
        statusEN : String(30);
}

entity Tipologia {
    key ID                  : Integer;
        tipologiaCommessa   : String(50);
        fixOrTimeMaterial   : String(2);
        tipologia           : String(50);
        flagMonitorBudget   : Boolean;
        flagConfrontoBudget : Boolean;
        IDCliente           : Association to Clienti;
        flagDefault         : Boolean;
}

entity AssegnatoA {
    key ID           : Integer;
        IDTicket     : Association to Tickets;
        assegnatoA   : String(50);
        giorniPrev   : Decimal(18, 3);
        giorniCons   : Decimal(18, 3);
        status       : Integer;
        dataInizio   : Date;
        dataFine     : Date;
        avanzamento  : Integer;
        ruolo        : String(50);
        responsabile : Boolean;
        completato   : Boolean;
        standby      : Boolean;
}

entity Allegati {
    key ID               : Integer;
        IDTicket         : Association to Tickets;
        allegato         : String(250);
        descrizione      : String(250);
        visibileCliente  : Boolean;
        fileName         : String(50);
        mimeType         : String(50);
        utente           : String(250);
        insertDate       : Date;
        docnumberarx5    : String(50);
        docnumberarxnext : String(50);
}

entity AreeFunzionali {
    key ID             : Integer;
        areaFunzionale : String(10);
        descrizione    : String(150);
}
