function validateForm(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 2){
		validaCampo("Tipo de Remessa", form.getValue("rbTipoSolic"));
		validaCampo("Estabelecimento de Origem", form.getValue("estab_origem"));
		validaCampo("Fornecedor", form.getValue("fornecedor"));
		validaCampo("Transportadora", form.getValue("transportadora"));
		validaCampo("Modalidade de Frete", form.getValue("frete"));
		validaCampo("Data de saída", form.getValue("dataSaida"));
		validaCampo("Quantidade de Volumes", form.getValue("qtdVolumes"));
		validaCampo("Observações", form.getValue("observ"));
		
	indexes = form.getChildrenIndexes("tbItem"); 
		if (!indexes.length > 0){
				throw "Nenhum item foi selecionado, gentileza informar ao menos um.";
			}
		
			for (var i = 0; i < indexes.length; i++) {
				var qtd = parseFloat(form.getValue("qtd___" + indexes[i]));
				var qtd_atu = parseFloat(form.getValue("qtidade_atu___" + indexes[i]));
				if (form.getValue("item___" + indexes[i]) == "" || form.getValue("item___" + indexes[i]) == null){
					throw "Gentileza informar o item";
					}
				if (form.getValue("valor___" + indexes[i]) == ""){
					throw "Gentileza informar o valor unitário";
					}
				if (form.getValue("qtd___" + indexes[i]) == ""){
					throw "Gentileza informar a quantidade";
					}
				if(qtd > qtd_atu){
					throw "A quantidade solicitada é maior que o saldo disponível. Consulte o saldo do item e tente novamente!";
						}
				
					}
	}

	if(ativ == 13){
		validaCampo("Validação", form.getValue("aprov_fase1"));
		validaCampo("Justificativa", form.getValue("just_fase1"));
	}

	if(ativ == 20){
		validaCampo("Tipo de Remessa de Comodato", form.getValue("rbTipoComodato"));
		validaCampo("Tipo de retorno", form.getValue("tipoRetornoComod"));
		if(form.getValue("rbTipoComodato") == "forno"){
			if(form.getValue("tipoRetornoComod") == "parcial"){
				indexes = form.getChildrenIndexes("tbItemComod"); 
		if (!indexes.length > 0){
			throw "Em caso de retorno parcial, informe o() item(ns).";
			}
		
			for (var i = 0; i < indexes.length; i++) {
				if (form.getValue("itemComod___" + indexes[i]) == "" || form.getValue("itemComod___" + indexes[i]) == null){
					throw "Gentileza informar o item";
					}
				if (form.getValue("qtdComod___" + indexes[i]) == ""){
					throw "Gentileza informar a quantidade";
					}
				
					}
			}
			validaCampo("Estabelecimento", form.getValue("EstabComodFor"));
			validaCampo("Nota de saída", form.getValue("notaComodFor"));
		}

		if(form.getValue("rbTipoComodato") == "cliente"){
			if(form.getValue("tipoRetornoComod") == "parcial"){
				indexes = form.getChildrenIndexes("tbItemComodCli"); 
		if (!indexes.length > 0){
			throw "Em caso de retorno parcial, informe o(s) item(ns).";
			}
		
			for (var i = 0; i < indexes.length; i++) {
				if (form.getValue("itemComodCli___" + indexes[i]) == "" || form.getValue("itemComodCli___" + indexes[i]) == null){
					throw "Gentileza informar o item";
					}
				if (form.getValue("qtdComodCli___" + indexes[i]) == ""){
					throw "Gentileza informar a quantidade";
					}
				
					}
			}
			validaCampo("Estabelecimento", form.getValue("EstabComodCli"));
			validaCampo("Número nota cliente", form.getValue("notaComodCli"));
			validaCampo("Cliente", form.getValue("clienteComodCli"));
		}
	}

	if(ativ == 21){
		validaCampo("Tipo de retorno", form.getValue("tipoRetornoArmaz"));
		validaCampo("Estabelecimento", form.getValue("EstabArmaz"));
		validaCampo("Número nota cliente", form.getValue("notaArmaz"));
		validaCampo("Depósito", form.getValue("depArmaz"));
		if(form.getValue("tipoRetornoArmaz") == "parcial"){
			indexes = form.getChildrenIndexes("tbItemArmaz"); 
	if (!indexes.length > 0){
			throw "Em caso de retorno parcial, informe o() item(ns).";
		}
	
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue("itemArmaz___" + indexes[i]) == "" || form.getValue("itemArmaz___" + indexes[i]) == null){
				throw "Gentileza informar o item";
				}
			if (form.getValue("qtdArmaz___" + indexes[i]) == ""){
				throw "Gentileza informar a quantidade";
				}
			
				}
		}

	}

	if(ativ == 22){
		validaCampo("Tipo de retorno", form.getValue("tipoRetornoConserto"));
		validaCampo("Estabelecimento", form.getValue("EstabConserto"));
		validaCampo("Número nota fornecedor", form.getValue("notaConserto"));
		validaCampo("Fornecedor", form.getValue("clienteConserto"));
		if(form.getValue("tipoRetornoConserto") == "parcial"){
			indexes = form.getChildrenIndexes("tbItemConserto"); 
	if (!indexes.length > 0){
			throw "Nenhum item foi selecionado, gentileza informar ao menos um.";
		}
	
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue("itemConserto___" + indexes[i]) == "" || form.getValue("itemConserto___" + indexes[i]) == null){
				throw "Gentileza informar o item";
				}
			if (form.getValue("qtdConserto___" + indexes[i]) == ""){
				throw "Gentileza informar a quantidade";
				}
			
				}
		}
	}
}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}

