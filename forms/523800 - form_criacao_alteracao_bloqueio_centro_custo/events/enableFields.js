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
        form.setEnabled("codigo", false);
	}

    if(ativ == 5){
		form.setValue("aprovador_custos", colaborador.getValue(0, "colleagueName"));
		form.setValue("aprovador_custos_mail", colaborador.getValue(0, "mail"));
    }

    if(ativ != 0 && ativ != 1 && ativ != 14){
        form.setEnabled("rb_tipo_solic", false);
        form.setEnabled("titulo", false);
        form.setEnabled("dataInicio", false);
        form.setEnabled("dataValidade", false);
        form.setEnabled("rb_tipo_alteracao", false);
        form.setEnabled("cod_altera", false);
        form.setEnabled("tit_altera", false);
        form.setEnabled("dtIni_altera", false);
        form.setEnabled("dtFim_altera", false);
        form.setEnabled("dtBloqueio", false);
    }

    if(ativ != 5){
        form.setEnabled("aprov_custos", false);
        form.setEnabled("just_aprov", false);
    }


}