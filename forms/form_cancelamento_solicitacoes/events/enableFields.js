function enableFields(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
    var login = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST); 
    var constraints = new Array(c1); 
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null); 
    var solicitante = colaborador.getValue(0, "colleagueName");
    var email       = colaborador.getValue(0, "mail");

	//requester
	if (ativ == 0 || ativ == 4) {
		form.setValue("loginRequester", login);
		form.setValue("nomeRequester", colaborador.getValue(0, "colleagueName"));
		form.setValue("emailRequester", colaborador.getValue(0, "mail"));
		form.setValue("cad_nom_user_br", colaborador.getValue(0, "colleagueName"));
	}

	if(ativ != 0 && ativ != 4){
		form.setEnabled("justificativa", false);
	}


}