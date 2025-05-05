function validateForm(form){
	
	var numState = getValue("WKNumState");
	var atividade_destino = parseInt(getValue("WKNextState"));
	var indexes = 0;

	if (numState == 0 || numState == 4 || numState == 108){
		//validaCampo("TIPO DE SOLICITAÇÃO", form.getValue("rbTipoSolic"));
		validaCampo("EMPRESA", form.getValue("Empresa"));
		validaCampo("CNPJ", form.getValue("Cnpj"));
		validaCampo("Atividade DA EMPRESA", form.getValue("AtividadeEmpresa"));
		validaCampo("DESCRIÇÃO DA ATIVIDADE", form.getValue("DescAtividade"));
		validaCampo("DATA INICIO DA ATIVIDADE", form.getValue("dtInicioAtividade"));
		validaCampo("DATA FIM DA ATIVIDADE", form.getValue("dtFimAtividade"));
		validaCampo("LOCAL DA ATIVIDADE", form.getValue("LocalAtividade"));
		validaCampo("UNIDADE", form.getValue("cbUnidade"));
	
		/*
		if(form.getValue("rbTipoSolic") == "emissao"){
			validaCampo("NUMERO DA SOLICITAÇÃO DE INTEGRAÇÃO", form.getValue("numIntegracao"));
		}*/
	
		//TERCEIROS
		indexes = form.getChildrenIndexes("tbTerceiros");	    
		 if (!indexes.length > 0){
		    	throw "Nenhum terceiro foi adicionado, gentileza informar ao menos um.";
		    }
		
			for (var i = 0; i < indexes.length; i++) {
		    	if (form.getValue("NomeTb___" + indexes[i]) == "" || form.getValue("NomeTb___" + indexes[i]) == null){
		    		throw "Gentileza informar o nome";
		    		}
		    	if (form.getValue("IdTb___" + indexes[i]) == ""){
		    		throw "Gentileza informar a identidade";
		    		}
		    	if (form.getValue("CpfTb___" + indexes[i]) == ""){
		    		throw "Gentileza informar o CPF";
		    		}
		    	if (form.getValue("CargoTb___" + indexes[i]) == ""){
		    		throw "Gentileza informar o cargo";
		    		}
		    	if (form.getValue("EmailTb___" + indexes[i]) == ""){
		    		throw "Gentileza informar o email";
		    		}
			}
	}

	if(numState == 15){
		if(form.getValue("aprov_fase8") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase8"));
		}
	}

	if(numState == 20){

		if(form.getValue("aprov_fase4") == "true"){
			validaCampo("Riscos existentes", form.getValue("just_fase4"));
		}
	}


	if(numState == 18){
		if(form.getValue("aprov_fase1") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase1"));
		}
	}

	if(numState == 34){
		if(form.getValue("aprov_fase7") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase7"));
		}
	}
	
	if(numState == 36){
		if(form.getValue("aprov_fase2") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase2"));
		}
	}

	if(numState == 63){
		if(form.getValue("aprov_fase3_1") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase3_1"));
		}
	}

	if(numState == 38){
		if(form.getValue("aprov_fase3") == "false"){
			validaCampo("Justificativa", form.getValue("just_fase3"));
		}
	}
	/*
	if (numState == 15){
		validaCampo("DATA DA INTEGRAÇÃO", form.getValue("dtIntegracao"));
	}
	
	if (numState == 9 && atividade_destino == 11){
		validaCampo("NUMERO DA PERMISSÃO", form.getValue("numPt"));
		validaCampo("DATA INICIO DA PERMISSÃO", form.getValue("dtInicio"));
		validaCampo("DATA FIM DA PERMISSÃO", form.getValue("dtFim"));
	}
	if (numState == 11 && atividade_destino == 13){
		validaCampo("DATA DE ENCERRAMENTO", form.getValue("dtEncerramento"));
	}
	*/
}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}
	    	

