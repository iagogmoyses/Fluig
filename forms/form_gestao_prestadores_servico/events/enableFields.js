function enableFields(form){ 
	var ativ = getValue("WKNumState");
	indexes = form.getChildrenIndexes("tbTerceiros");	
	indexes2 = form.getChildrenIndexes("tbAnexo");
    var login = getValue("WKUser");
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST); 
    var constraints = new Array(c1); 
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null); 
    var solicitante = colaborador.getValue(0, "colleagueName");
    var email       = colaborador.getValue(0, "mail");

	//fase1
	form.setEnabled("aprov_fase1"           , false);
	form.setEnabled("just_fase1"            , false);
	//fase2
	form.setEnabled("aprov_fase2"           , false);
	form.setEnabled("just_fase2"            , false);
	//fase3
	form.setEnabled("aprov_fase3"           , false);
	form.setEnabled("just_fase3"            , false);
	//fase3_1 dvIntegracao
	form.setEnabled("aprov_fase3_1"           , false);
	form.setEnabled("just_fase3_1"            , false);
	//Integracao
	form.setEnabled("dtIntegracao"          , false);
	//fase4
	form.setEnabled("aprov_fase4"           , false);
	form.setEnabled("just_fase4"            , false);
	//fase5
	form.setEnabled("just_fase5"            , false);
	//fase5
	form.setEnabled("just_fase5"            , false);
	for (var i = 0; i < indexes2.length; i++) {
		form.setEnabled("obs_anexo___"    + indexes2[i], false);
		form.setEnabled("anexo___"        + indexes2[i], false);
	}
	//fase6
	form.setEnabled("aprov_fase6"           , false);
	form.setEnabled("just_fase6"            , false);
	//fase7
	form.setEnabled("aprov_fase7"           , false);
	form.setEnabled("just_fase7"            , false);
	//fase8
    form.setEnabled("aprov_fase8"           , false);
	form.setEnabled("just_fase8"            , false);

	form.setEnabled("rbPortaria"        , false);
	form.setEnabled("rbisAso"        , false);
	    
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("NomeTb___"    + indexes[i], false);
		form.setEnabled("IdTb___"      + indexes[i], false);
		form.setEnabled("CpfTb___"     + indexes[i], false);
		form.setEnabled("CargoTb___"   + indexes[i], false);
		form.setEnabled("EmailTb___"   + indexes[i], false);
		form.setEnabled("NR35Tb___"    + indexes[i], false);
		form.setEnabled("NR33Tb___"    + indexes[i], false);
		form.setEnabled("NR18Tb___"    + indexes[i], false);
		form.setEnabled("NR11Tb___"    + indexes[i], false);
		form.setEnabled("NR10BTb___"   + indexes[i], false);
		form.setEnabled("NR10SEPTb___" + indexes[i], false);
			
	}			

	//form.setEnabled("rbTipoSolic"      , false);
	form.setEnabled("Empresa"          , false);
	form.setEnabled("Cnpj"             , false);
	form.setEnabled("AtividadeEmpresa" , false);
	form.setEnabled("DescAtividade"    , false);
	form.setEnabled("DescFerramentas"   , false);
	form.setEnabled("LocalAtividade"   , false);
	form.setEnabled("dtInicioAtividade", false);
	form.setEnabled("dtFimAtividade"   , false);
	form.setEnabled("numIntegracao"    , false);
	form.setEnabled("cbUnidade"        , false);

	if(ativ == 0 || ativ == 4){
        form.setValue("loginRequester", login);
        form.setValue("nomeRequester", colaborador.getValue(0, "colleagueName"));
        form.setValue("emailRequester", colaborador.getValue(0, "mail"));
        form.setValue("cad_nom_user_br", colaborador.getValue(0, "colleagueName"));
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("NomeTb___"    + indexes[i], true);
			form.setEnabled("IdTb___"      + indexes[i], true);
			form.setEnabled("CpfTb___"     + indexes[i], true);
			form.setEnabled("CargoTb___"   + indexes[i], true);
			form.setEnabled("EmailTb___"   + indexes[i], true);
			form.setEnabled("NR35Tb___"    + indexes[i], true);
			form.setEnabled("NR33Tb___"    + indexes[i], true);
			form.setEnabled("NR18Tb___"    + indexes[i], true);
			form.setEnabled("NR11Tb___"    + indexes[i], true);
			form.setEnabled("NR10BTb___"   + indexes[i], true);
			form.setEnabled("NR10SEPTb___" + indexes[i], true);
				
		}			
		//form.setEnabled("rbTipoSolic"      , true);
		form.setEnabled("Empresa"          , true);
		form.setEnabled("Cnpj"             , true);
		form.setEnabled("AtividadeEmpresa" , true);
		form.setEnabled("DescAtividade"    , true);
		form.setEnabled("DescFerramentas"   , true);
		form.setEnabled("LocalAtividade"   , true);
		form.setEnabled("dtInicioAtividade", true);
		form.setEnabled("dtFimAtividade"   , true);
		form.setEnabled("numIntegracao"    , true);
		form.setEnabled("cbUnidade"        , true);
		form.setEnabled("rbPortaria"        , true);
		form.setEnabled("rbisAso"        , true);
	}

	if(ativ == 18){ //Emissao Permissao de Trabalho
		form.setEnabled("aprov_fase1"           , true);
		form.setEnabled("just_fase1"            , true);
		form.setValue('aprovador_fase1', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase1_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase1_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase1', getToday());
	}
	if(ativ == 36){ //RH-DP CONFIRMA CAPACITAÇÕES
		form.setEnabled("aprov_fase2"           , true);
		form.setEnabled("just_fase2"            , true);
		form.setValue('aprovador_fase2', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase2_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase2_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase2', getToday());
	}
	if(ativ == 38){ //MED. TRABALHO VERIFICA ASO/PCMSO
		form.setEnabled("aprov_fase3"           , true);
		form.setEnabled("just_fase3"            , true);
		form.setValue('aprovador_fase3', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase3_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase3_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase3', getToday());
	}
	if(ativ == 61){ // Integracao
		form.setEnabled("aprov_fase3_1"           , true);
		form.setEnabled("just_fase3_1"            , true);
		form.setValue('aprovador_fase3_1', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase3_1_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase3_1_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase3_1', getToday());
		form.setEnabled("dtIntegracao"            , true);
	} 
	if(ativ == 63){ // Aprov Integracao
		form.setEnabled("aprov_fase3_1"           , true);
		form.setEnabled("just_fase3_1"            , true);
		form.setValue('aprovador_fase3_1', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase3_1_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase3_1_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase3_1', getToday());
	} 


	if(ativ == 20){ //CD AVALIA RISCO
		form.setEnabled("aprov_fase4"           , true);
		form.setEnabled("just_fase4"            , true);
		form.setValue('aprovador_fase4', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase4_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase4_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase4', getToday());
	}
	
	if(ativ == 22){ //ANEXAR DOC ASSINADO
		for (var i = 0; i < indexes2.length; i++) {
			form.setEnabled("obs_anexo___"    + indexes2[i], true);
			form.setEnabled("anexo___"        + indexes2[i], true);
		}
	
		form.setEnabled("just_fase5"            , true);
		form.setValue('aprovador_fase5', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase5_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase5_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase5', getToday());
	}
	if(ativ == 24){ //CQ VALIDAR DOOC
		form.setEnabled("aprov_fase6"           , true);
		form.setEnabled("just_fase6"            , true);
		form.setValue('aprovador_fase6', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase6_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase6_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase6', getToday());
	}
	if(ativ == 34 ){ //Libera Portaria de Inicio de Trabalho
		form.setEnabled("aprov_fase7"           , true);
		form.setEnabled("just_fase7"            , true);
		form.setValue('aprovador_fase7', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase7_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase7_mail', colaborador.getValue(0, "mail"));
		form.setValue('dt_aprovador_fase7', getToday());
	}
	if(ativ == 15){ //SESMT AGUARDANDO DOCS
        form.setEnabled("aprov_fase8"           , true);
		form.setEnabled("just_fase8"            , true);
		form.setValue('aprovador_fase8', colaborador.getValue(0, "colleagueName"));
		form.setValue('haprovador_fase8_login', colaborador.getValue(0, "login"));
		form.setValue('haprovador_fase8_mail', colaborador.getValue(0, "mail"));
        form.setValue('dt_aprovador_fase8', getToday());
	}

	if(ativ == 108){ //RETORNO SOLICITANTE
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("NomeTb___"    + indexes[i], true);
			form.setEnabled("IdTb___"      + indexes[i], true);
			form.setEnabled("CpfTb___"     + indexes[i], true);
			form.setEnabled("CargoTb___"   + indexes[i], true);
			form.setEnabled("EmailTb___"   + indexes[i], true);
			form.setEnabled("NR35Tb___"    + indexes[i], true);
			form.setEnabled("NR33Tb___"    + indexes[i], true);
			form.setEnabled("NR18Tb___"    + indexes[i], true);
			form.setEnabled("NR11Tb___"    + indexes[i], true);
			form.setEnabled("NR10BTb___"   + indexes[i], true);
			form.setEnabled("NR10SEPTb___" + indexes[i], true);
				
		}			
		//form.setEnabled("rbTipoSolic"      , true);
		form.setEnabled("Empresa"          , true);
		form.setEnabled("Cnpj"             , true);
		form.setEnabled("AtividadeEmpresa" , true);
		form.setEnabled("DescAtividade"    , true);
		form.setEnabled("DescFerramentas"   , true);
		form.setEnabled("LocalAtividade"   , true);
		form.setEnabled("dtInicioAtividade", true);
		form.setEnabled("dtFimAtividade"   , true);
		form.setEnabled("numIntegracao"    , true);
		form.setEnabled("cbUnidade"        , true);
		form.setEnabled("rbPortaria"        , true);
		form.setEnabled("rbisAso"        , true);
	}


}



function getToday(){
    var date = new Date();
    var dd = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    var mm = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1));
    var aaaa = date.getFullYear();
    
    return dd+"/"+mm+"/"+aaaa;
}