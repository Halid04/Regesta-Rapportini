namespace rapportini.srv;

using {rapportini.db as db} from '../db/schema';

service AppService {

  entity Rapportini as projection on db.Rapportini;
  entity RapportiniCestinati as projection on db.RapportiniCestinati;
  entity Clienti as projection on db.Clienti;
  entity RapportiniAllegati as projection on db.RapportiniAllegati;
  entity ClientiSedi as projection on db.ClientiSedi;
  entity Commesse as projection on db.Commesse;
  entity TodoList as projection on db.TodoList;


}