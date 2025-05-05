function enableFields(form){ 
	var numAtividade = parseInt(getValue("WKNumState"));
	
	
	var login = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST); 
    var constraints = new Array(c1); 
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null); 
    var solicitante = colaborador.getValue(0, "colleagueName");
    var email       = colaborador.getValue(0, "mail");

	//requester
	if(numAtividade == 0 || numAtividade == 2){
		form.setValue("loginRequester", login);
		form.setValue("nomeRequester",  colaborador.getValue(0, "colleagueName"));
		form.setValue("emailRequester",  colaborador.getValue(0, "mail"));
		form.setValue("cad_nom_user_br",  colaborador.getValue(0, "colleagueName"));
	}

	if(numAtividade == 4){
		form.setValue("loginFiscal", login);
		form.setValue("nomeFiscal", colaborador.getValue(0, "colleagueName"));
		form.setValue("emailFiscal",  colaborador.getValue(0, "mail"));
	}

	if(numAtividade != 0 && numAtividade != 2){
		form.setEnabled("rbTipoSolic", false);
		form.setEnabled("frete", false);
		form.setEnabled("qtdVolumes", false);
		form.setEnabled("observ", false);
		form.setEnabled("dataSaida", false);
		indexes = form.getChildrenIndexes("tbItem");	    
		    for (var i = 0; i < indexes.length; i++) {
		    	form.setEnabled("valor___" + indexes[i], false);
		    	form.setEnabled("qtd___" + indexes[i], false);
		    
		     }			
	}

	if(numAtividade == 20){
		form.setEnabled("divComodato", true);
	}

	if(numAtividade != 20){
		form.setEnabled("divComodato", false);
	}

	if(numAtividade == 13){ //Validacao 2 Fiscal
		form.setEnabled("aprov_fase1"           , true);
		form.setEnabled("just_fase1"            , true);
		form.setValue('aprovador_fase1', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase1_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase1_mail', colaborador.getValue(0, "mail"));
	}
}