function validateForm(form){

	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 4){
		indexes = form.getChildrenIndexes("tbCancela");
		if (!indexes.length > 0){
			throw "Nenhuma solicitação foi informada, gentileza informar ao menos uma.";
		}

		for(var i=0; i<indexes.length; i++){
			if (form.getValue("numSolic___" + indexes[i]) == "" || form.getValue("numSolic___" + indexes[i]) == null){
				throw "Gentileza informar a solicitação " + indexes[i];
				}
		}

        validaCampo("Justificativa", form.getValue("justificativa"));
	}

}

function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}

