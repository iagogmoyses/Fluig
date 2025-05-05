function validateForm(form) {	
	var atividade = getValue("WKNumState");
	var ativ = parseInt(atividade);
	
	form.setValue("atividade", atividade);
	
	var constraints = new Array();

	var ativ_destino = parseInt(getValue("WKNextState"));

	if(ativ == 0 || ativ == 1){
		validaCampo("LOCALIZAÇÃO", form.getValue("rbLocaliz"));
		validaCampo("TIPO", form.getValue("tipo"));
		validaCampo("RAMAL", form.getValue("ramal"));
		validaCampo("ESTABELECIMENTO", form.getValue("estabelecimento"));
		validaCampo("FORNECEDOR", form.getValue("fornecedor"));
		validaCampo("VENCIMENTO", form.getValue("vencimento"));
		validaCampo("MOEDA", form.getValue("moeda"));
		validaCampo("VALOR", form.getValue("valor"));
		validaCampo("CENTRO DE CUSTOS", form.getValue("centro_custo"));
		validaCampo("TIPO FLUXO FINANCEIRO", form.getValue("tpFluxo"));
		validaCampo("CONTA CONTÁBIL", form.getValue("cta_ctbl"));
		validaCampo("DESCRIÇÃO", form.getValue("descricao"));
		// validaCampo("TIPO FLUXO FINANCEIRO", form.getValue("tipo_financeiro"));
		// validaCampo("CONTA CONTÁBIL", form.getValue("conta_contabil"));
		
	}

	if(ativ == 2){
		validaCampo("Código de referência", form.getValue("cod_referencia"));
	}

	if(ativ == 30){
		validaCampo("Retorno de ciência", form.getValue("ciente"));

		if(form.getValue("ciente") == "nao"){
			throw "Atenção: o fluxo só seguirá para pagamento mediante a ciência do solicitante. Em caso de dúvidas, entre em contato com o setor Fiscal pelo e-mail equipefiscal@fornodeminas.com.br ou com qualquer colaborador da área.";
		}
	}
} 
function validaCampo(nome,campo){
	if (campo == null || campo == "")
		throw "Campo " + nome.toUpperCase() + " é obrigatório!";
}
