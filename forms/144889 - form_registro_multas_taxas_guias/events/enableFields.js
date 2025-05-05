function enableFields(form){ 
	var numAtividade = parseInt(getValue("WKNumState"));
	
	
	var login = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST); 
    var constraints = new Array(c1); 
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null); 
    var solicitante = colaborador.getValue(0, "colleagueName");
    var email       = colaborador.getValue(0, "mail");
			
			if(numAtividade != 0 && numAtividade != 1){
		
				form.setEnabled("ramal", false);
				form.setEnabled("estabelecimento", false);
				form.setEnabled("vencimento", false);
				form.setEnabled("moeda", false);
				form.setEnabled("valor", false);
				form.setEnabled("centro_custo", false);
				form.setEnabled("descricao", false);
				form.setEnabled("fornecedor", false);
				form.setEnabled("rbLocaliz", false);
				form.setEnabled("tipo", false);
			}
		
		
	
	//requester
	if(numAtividade == 0 || numAtividade == 4){
		form.setValue("loginRequester", login);
		form.setValue("nomeRequester",  colaborador.getValue(0, "colleagueName"));
		form.setValue("emailRequester",  colaborador.getValue(0, "mail"));
		form.setValue("cad_nom_user_br",  colaborador.getValue(0, "colleagueName"));
	}
	
	//Setor Cadastro
	if (numAtividade == 5) {
		
		
		form.setValue("loginController", login);
		form.setValue("nomeController",  colaborador.getValue(0, "colleagueName"));
		form.setValue("mailController",  colaborador.getValue(0, "mail"));
	}
}