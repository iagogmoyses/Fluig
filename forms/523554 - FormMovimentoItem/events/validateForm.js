function validateForm(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 1){
		indexes = form.getChildrenIndexes("tbTransacoesDiversas"); 
		if (!indexes.length > 0){
				throw "Nenhum item foi selecionado, gentileza informar ao menos um.";
			}
		
			for (var i = 0; i < indexes.length; i++) {
				var quantidade = parseFloat(form.getValue("quantidade___" + indexes[i]));
				var qtd = parseFloat(form.getValue("qtd___" + indexes[i]));
				
				if (form.getValue("it_codigo___" + indexes[i]) == "" || form.getValue("it_codigo___" + indexes[i]) == null){
					throw "Gentileza informar o item";
					}
				if (form.getValue("entrada_saida___" + indexes[i]) == ""){
					throw "Gentileza informar a natureza da operação";
					}
				if (form.getValue("cod_estabel___" + indexes[i]) == ""){
					throw "Gentileza informar o estabelecimento";
					}
				if (form.getValue("deposito___" + indexes[i]) == ""){
					throw "Gentileza informar o depósito";
					}
				if (form.getValue("lote___" + indexes[i]) == ""){
					throw "Gentileza informar o lote";
					}
				if (form.getValue("dt_validade___" + indexes[i]) == ""){
					throw "Gentileza informar a data de validade";
					}
				if (form.getValue("centro_custo___" + indexes[i]) == ""){
					throw "Gentileza informar o centro de custo";
					}
				if (form.getValue("quantidade___" + indexes[i]) == ""){
					throw "Gentileza informar a quantidade";
					}
				if (form.getValue("valor_material___" + indexes[i]) == ""){
					throw "Gentileza informar o valor";
					}
					if (form.getValue("entrada_saida___" + indexes[i]) == "2" && quantidade > qtd){
						throw "A quantidade solicitada é maior que o saldo disponível. Consulte o saldo do item e tente novamente!";
						}
				
					}
	}
}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}

