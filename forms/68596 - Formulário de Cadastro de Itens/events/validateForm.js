function validateForm(form){
	
	var numState = getValue("WKNumState");
	var atividade_destino = parseInt(getValue("WKNextState"));
	var indexes = 0;

	if(form.getValue("rbTipoSolic") == "cadastro"){

	/*validaCampo("UNIDADE DE CADASTRO", form.getValue("rbTipoUnidade"));*/
	validaCampo("TIPO DE CADASTRO", form.getValue("rbTipoCadastro"));
	
	if(form.getValue("rbTipoCadastro") == "comprado"){
		validaCampo("TIPO DE ITEM", form.getValue("rbTipoItem"));
	}
	if(form.getValue("rbTipoCadastro") == "embalagem"){

		indexes = form.getChildrenIndexes("tbItemEmb");
		if(!indexes.length > 0){
			throw "Nenhum item foir adicionado, gentileza informar ao menos um.";
		}

		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemEmbTb___" + indexes[i]) == "" || form.getValue("ItemEmbTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item";
				}
			if (form.getValue("NcmEmbTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar o ncm do item";
	    		}
			}
	}
	if(form.getValue("rbTipoCadastro") == "fabricado"){
		
		indexes = form.getChildrenIndexes("tbItemFab");
		if (!indexes.length > 0){
	    	throw "Nenhum item foi adicionado, gentileza informar ao menos um.";
	    }	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemFabTb___" + indexes[i]) == "" || form.getValue("ItemFabTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item";
				}
			}
		}

	if(form.getValue("rbTipoCadastro") == "mccain"){
		
		indexes = form.getChildrenIndexes("tbItemFab");
		if (!indexes.length > 0){
	    	throw "Nenhum item foi adicionado, gentileza informar ao menos um.";
	    }	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemFabTb___" + indexes[i]) == "" || form.getValue("ItemFabTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item";
				}
			}
		}

	if(form.getValue("rbTipoItem") == "servico"){
		indexes = form.getChildrenIndexes("tbItemServ");
		if (!indexes.length > 0){
	    	throw "Nenhum item foi adicionado, gentileza informar ao menos um.";
	    }	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("DescServTb___" + indexes[i]) == "" || form.getValue("DescServTb___" + indexes[i]) == null){
	    		throw "Gentileza informar a descrição do item";
				}
			if (form.getValue("AplicServTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar a aplicação do item";
	    		}

			}
		}

	if(form.getValue("rbTipoItem") == "material"){

		validaCampo("CONTROLA ESTOQUE", form.getValue("rbItemEstoque"));
		validaCampo("GRUPO DE ESTOQUE", form.getValue("cbGrupoEstoque"));

		indexes = form.getChildrenIndexes("tbItemMat");
		if (!indexes.length > 0){
	    	throw "Nenhum item foi adicionado, gentileza informar ao menos um.";
	    }	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("DescTb___" + indexes[i]) == "" || form.getValue("DescTb___" + indexes[i]) == null){
	    		throw "Gentileza informar a descrição do item";
				}
			if (form.getValue("NarrativaTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar a narrativa do item";
	    		}
    		if (form.getValue("AplicacaoTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar a aplicação do item";
	    		}
    		if (form.getValue("UnidadeTb___" + indexes[i]) == ""){
	    		throw "Gentileza selecionar a unidade de medida do item";
	    		}
    		if (form.getValue("NcmTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar o ncm do item";
	    		}
    		if (form.getValue("rbItemEstoque") == "sim" && form.getValue("EstoqueTb___" + indexes[i]) == ""){
	    		throw "Gentileza informar o estoque minimo do item";
	    		}
    		

			}
		}
	}

	if (form.getValue("rbTipoSolic") == "alteracao") {
		validaCampo("Item a ser alterado", form.getValue("itemAltera"));
	
		if (form.getValue("rbTipoAlteracao_familia") == "familia") {
			validaCampo("Família", form.getValue("familia_nova"));
		}
		if (form.getValue("rbTipoAlteracao_un") == "un") {
			validaCampo("Unidade", form.getValue("unidade_nova"));
		}
		if (form.getValue("rbTipoAlteracao_status") == "status") {
			validaCampo("Status", form.getValue("status_novo"));
		}
		if (form.getValue("rbTipoAlteracao_descricao") == "descricao") {
			validaCampo("Descrição", form.getValue("descricao_nova"));
		}
	}
	
	
	
	

	if(numState == 6 && atividade_destino == 12){

		if(form.getValue("rbTipoItem") == "material"){

		indexes = form.getChildrenIndexes("tbItemMat");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemTb___" + indexes[i]) == "" || form.getValue("ItemTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

		if(form.getValue("rbTipoItem") == "servico"){

		indexes = form.getChildrenIndexes("tbItemServ");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemServTb___" + indexes[i]) == "" || form.getValue("ItemServTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

	}

	if(numState == 8 && atividade_destino == 26){

		if(form.getValue("rbTipoItem") == "material"){

		indexes = form.getChildrenIndexes("tbItemMat");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemTb___" + indexes[i]) == "" || form.getValue("ItemTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

		if(form.getValue("rbTipoItem") == "servico"){

		indexes = form.getChildrenIndexes("tbItemServ");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemServTb___" + indexes[i]) == "" || form.getValue("ItemServTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

	}

	if(numState == 50 && atividade_destino == 26){

		if(form.getValue("rbTipoItem") == "material"){

		indexes = form.getChildrenIndexes("tbItemMat");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemTb___" + indexes[i]) == "" || form.getValue("ItemTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

		if(form.getValue("rbTipoItem") == "servico"){

		indexes = form.getChildrenIndexes("tbItemServ");	    
	 	
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ItemServTb___" + indexes[i]) == "" || form.getValue("ItemServTb___" + indexes[i]) == null){
	    		throw "Gentileza informar o item cadastrado";
				}
			}
		}

	}

	if (numState == 97){
		if(form.getValue("aprovacao") == ""){
            throw "Você deve Aprovar ou Reprovar a solicitação para continuar";
        }
        if(form.getValue("justificativaGestor") == ""){
            throw "O Campo JUSTIFICATIVA não foi preenchido.";
        }
	}
 }
 



function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}