namespace rapportini.srv;

using {rapportini.db as db} from '../db/schema';

service AppService {

  entity Rapportini            as projection on db.Rapportini;
  entity RapportiniCestinati   as projection on db.RapportiniCestinati;
  entity Clienti               as projection on db.Clienti;
  entity RapportiniAllegati    as projection on db.RapportiniAllegati;
  entity ClientiSedi           as projection on db.ClientiSedi;
  entity Commesse              as projection on db.Commesse;
  entity Tickets               as projection on db.Tickets;
  entity TicketsCestinati      as projection on db.TicketsCestinati;
  entity Allegati              as projection on db.Allegati;
  entity AreeFunzionali        as projection on db.AreeFunzionali;
  entity AssegnatoA            as projection on db.AssegnatoA;
  entity ChangeLog             as projection on db.ChangeLog;
  entity ClientiAreeFunzionali as projection on db.ClientiAreeFunzionali;
  entity Status                as projection on db.Status;
  entity Tipologia             as projection on db.Tipologia;

}
