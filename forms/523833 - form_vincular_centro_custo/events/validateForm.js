function validateForm(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 1 || ativ == 4){
		indexes = form.getChildrenIndexes("tbVinculaCC");
		if (!indexes.length > 0){
			throw "Nenhuma relação usuário X centro de custo foi informada, gentileza informar ao menos uma.";
		}

		for(var i=0; i<indexes.length; i++){
			if (form.getValue("usuario___" + indexes[i]) == "" || form.getValue("usuario___" + indexes[i]) == null){
				throw "Gentileza informar o usuário " + indexes[i];
				}
				if (form.getValue("centro_custo___" + indexes[i]) == "" || form.getValue("centro_custo___" + indexes[i]) == null){
					throw "Gentileza informar o centro de custo " + indexes[i];
					}
		}
	}

	if(ativ == 2){
		validaCampo("Validação", form.getValue("aprov_custos"));
		if(form.getValue("aprov_custos") == "false"){
		validaCampo("Justificativa", form.getValue("just_aprov"));
		}
	}
}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}

