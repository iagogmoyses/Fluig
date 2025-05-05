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
	if (ativ == 0 || ativ == 1) {
		form.setValue("loginRequester", login);
		form.setValue("nomeRequester", colaborador.getValue(0, "colleagueName"));
		form.setValue("emailRequester", colaborador.getValue(0, "mail"));
		form.setValue("cad_nom_user_br", colaborador.getValue(0, "colleagueName"));
	}

	if(ativ == 2){
		form.setValue("loginGestor", login);
		form.setValue("nomeGestor", colaborador.getValue(0, "colleagueName"));
		form.setValue("emailGestor",  colaborador.getValue(0, "mail"));
	}

	if(ativ == 14){
		form.setValue("loginCustos", login);
		form.setValue("nomeCustos", colaborador.getValue(0, "colleagueName"));
		form.setValue("emailCustos",  colaborador.getValue(0, "mail"));
	}

	if(ativ != 0 && ativ != 1){
		indexes = form.getChildrenIndexes("tbTransacoesDiversas");	    
		    for (var i = 0; i < indexes.length; i++) {
		    	form.setEnabled("entrada_saida___" + indexes[i], false);
		    	form.setEnabled("cod_estabel___" + indexes[i], false);
				form.setEnabled("localizacao___" + indexes[i], false);
				form.setEnabled("deposito___" + indexes[i], false);
				form.setEnabled("lote___" + indexes[i], false);
				form.setEnabled("dt_validade___" + indexes[i], false);
				form.setEnabled("centro_custo___" + indexes[i], false);
				form.setEnabled("quantidade___" + indexes[i], false);
				form.setEnabled("valor_material___" + indexes[i], false);
		    
		     }			
	}


	




		
}