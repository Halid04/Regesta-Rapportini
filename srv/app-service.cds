namespace rapportini.srv;

using {rapportini.db as db} from '../db/schema';

service AppService {

  entity TblRapportini as projection on db.TblRapportini;
  entity TblClienti as projection on db.TblClienti;
  entity TblRapportiniAllegati as projection on db.TblRapportiniAllegati;
  entity TblClientiSedi as projection on db.TblClientiSedi;
  entity TblCommesse as projection on db.TblCommesse;
  entity TblTodoList as projection on db.TblTodoList;

  action onPostRapportini(rapportini: TblRapportini);

}