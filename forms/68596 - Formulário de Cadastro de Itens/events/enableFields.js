function enableFields(form){ 

var ATIVIDADE = getValue("WKNumState");
var ativ = parseInt(ATIVIDADE);
var login = getValue("WKUser");
var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST); 
var constraints = new Array(c1); 
var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null); 
var solicitante = colaborador.getValue(0, "colleagueName");
var email       = colaborador.getValue(0, "mail");

	if(ativ == 0 || ativ == 1){
		form.setValue("loginRequester", login);
        form.setValue("nomeRequester", colaborador.getValue(0, "colleagueName"));
        form.setValue("emailRequester", colaborador.getValue(0, "mail"));
        form.setValue("cad_nom_user_br", colaborador.getValue(0, "colleagueName"));
	}

	if(ativ != 0 && ativ != 1 && ativ != 6 && ativ != 8 && ativ != 91){
		form.setEnabled("rbTipoCadastro", false);
		form.setEnabled("rbTipoItem", false);
		form.setEnabled("rbItemEstoque", false);
		form.setEnabled("cbGrupoEstoque", false);
		form.setEnabled("rbTipoUnidade", false);
		
		indexes = form.getChildrenIndexes("tbItemServ");	    
			    for (var i = 0; i < indexes.length; i++) {
			    	form.setEnabled("ItemServTb___" + indexes[i], false);
			    	form.setEnabled("DescServTb___" + indexes[i], false);
			    	form.setEnabled("AplicServTb___" + indexes[i], false);
		    	}

	    indexes2 = form.getChildrenIndexes("tbItemMat");	    
			    for (var i = 0; i < indexes2.length; i++) {
			    	form.setEnabled("ItemTb___" + indexes2[i], false);
			    	form.setEnabled("DescTb___" + indexes2[i], false);
			    	form.setEnabled("NarrativaTb___" + indexes2[i], false);
			    	form.setEnabled("AplicacaoTb___" + indexes2[i], false);
			    	form.setEnabled("UnidadeTb___" + indexes2[i], false);
			    	form.setEnabled("AplicacaoTb___" + indexes2[i], false);
			    	form.setEnabled("UnidadeTb___" + indexes2[i], false);
			    	form.setEnabled("NcmTb___" + indexes2[i], false);
			    	form.setEnabled("EstoqueTb___" + indexes2[i], false);
			    }
	    indexes3 = form.getChildrenIndexes("tbItemFab");	    
			    for (var i = 0; i < indexes3.length; i++) {
			    	form.setEnabled("ItemFabTb___" + indexes3[i], false);
			    	form.setEnabled("DescFabTb___" + indexes3[i], false);
			    	form.setEnabled("UnidadeFabTb___" + indexes3[i], false);
			    	form.setEnabled("GrupoFabTb___" + indexes3[i], false);
			    	form.setEnabled("FamiliaFabTb___" + indexes3[i], false);
			    	form.setEnabled("NarrativaFabTb___" + indexes3[i], false);
			    	form.setEnabled("EanFabTb___" + indexes3[i], false);
			    	form.setEnabled("DunFabTb___" + indexes3[i], false);

		    	}

		 indexes4 = form.getChildrenIndexes("tbItemEmb");	    
			    for (var i = 0; i < indexes4.length; i++) {
			    	form.setEnabled("ItemEmbTb___" + indexes4[i], false);
			    	form.setEnabled("DescEmbTb___" + indexes4[i], false);
			    	form.setEnabled("UnidadeEmbTb___" + indexes4[i], false);
			    	form.setEnabled("GrupoEmbTb___" + indexes4[i], false);
			    	form.setEnabled("FamiliaEmbTb___" + indexes4[i], false);
			    	form.setEnabled("NarrativaEmbTb___" + indexes4[i], false);
			    	form.setEnabled("NcmEmbTb___" + indexes4[i], false);
			    	

		    	}    	

	}

	if (ativ != 97){
		form.setEnabled("gestor", false);
		form.setEnabled("aprovacao", false);
		form.setEnabled("justificativaGestor", false);
	} 
	if (ativ == 97 || ativ == 8 || ativ == 26){
		if (form.getFormMode() == "VIEW"){
			form.setEnabled("gestor", false);
			form.setEnabled("aprovacao", false);
			form.setEnabled("justificativaGestor", false);
		}
	}
	if (ativ == 97){
		if (form.getFormMode() != "VIEW"){
			form.setEnabled("gestor", true);
			form.setEnabled("aprovacao", true);
			form.setEnabled("justificativaGestor", true);
		}
	} 

	if(ativ == 6 || ativ == 8){
		form.setEnabled("rbTipoCadastro", false);
		form.setEnabled("rbTipoItem", false);
		form.setEnabled("rbItemEstoque", false);
		form.setEnabled("cbGrupoEstoque", false);
		form.setEnabled("rbTipoUnidade", false);
		
		indexes = form.getChildrenIndexes("tbItemServ");	    
			    for (var i = 0; i < indexes.length; i++) {
			    	
			    	form.setEnabled("DescServTb___" + indexes[i], false);
			    	form.setEnabled("AplicServTb___" + indexes[i], false);
		    	}

	    indexes2 = form.getChildrenIndexes("tbItemMat");	    
			    for (var i = 0; i < indexes2.length; i++) {
			    	
			    	form.setEnabled("DescTb___" + indexes2[i], false);
			    	form.setEnabled("NarrativaTb___" + indexes2[i], false);
			    	form.setEnabled("AplicacaoTb___" + indexes2[i], false);
			    	form.setEnabled("UnidadeTb___" + indexes2[i], false);
			    	form.setEnabled("AplicacaoTb___" + indexes2[i], false);
			    	form.setEnabled("UnidadeTb___" + indexes2[i], false);
			    	form.setEnabled("NcmTb___" + indexes2[i], false);
			    	form.setEnabled("EstoqueTb___" + indexes2[i], false);
			    }
	    indexes3 = form.getChildrenIndexes("tbItemFab");	    
			    for (var i = 0; i < indexes3.length; i++) {
			    	
			    	form.setEnabled("ItemFabTb___" + indexes3[i], false);
			    	form.setEnabled("DescFabTb___" + indexes3[i], false);
			    	form.setEnabled("UnidadeFabTb___" + indexes3[i], false);
			    	form.setEnabled("GrupoFabTb___" + indexes3[i], false);
			    	form.setEnabled("FamiliaFabTb___" + indexes3[i], false);
			    	form.setEnabled("NarrativaFabTb___" + indexes3[i], false);
			    	form.setEnabled("EanFabTb___" + indexes3[i], false);
			    	form.setEnabled("DunFabTb___" + indexes3[i], false);

		    	}
		indexes4 = form.getChildrenIndexes("tbItemEmb");	    
			    for (var i = 0; i < indexes4.length; i++) {
			    	form.setEnabled("ItemEmbTb___" + indexes4[i], false);
			    	form.setEnabled("DescEmbTb___" + indexes4[i], false);
			    	form.setEnabled("UnidadeEmbTb___" + indexes4[i], false);
			    	form.setEnabled("GrupoEmbTb___" + indexes4[i], false);
			    	form.setEnabled("FamiliaEmbTb___" + indexes4[i], false);
			    	form.setEnabled("NarrativaEmbTb___" + indexes4[i], false);
			    	form.setEnabled("NcmEmbTb___" + indexes4[i], false);
			    	

		    	}    	    	

	}
}
