namespace Rapportini_database.srv;

using { Rapportini_database.db as db} from '../db/schema';

service AppService{
    entity Rapportini as projection on db.Rapportini;
    entity Clienti as projection on db.Clienti;
    entity Commesse as projection on db.Commesse;
    entity ToDoList as projection on db.ToDoList;
    entity ClientiSedi as projection on db.ClientiSedi;
    entity RapportiniAllegati as projection on db.RapportiniAllegati;
}


