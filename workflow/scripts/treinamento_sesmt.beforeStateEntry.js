function beforeStateEntry(sequenceId){
	
	if(sequenceId == 33){

		if(hAPI.getCardValue("cbUnidade") == "contagem"){
			try{
			
			var dataInteg = hAPI.getCardValue("dtIntegracao");
			var solic = hAPI.getCardValue("num_solicitacao");
			var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		    //Monta mapa com parâmetros do template
		    var parametros = new java.util.HashMap();
		    parametros.put("subject", "AGENDAMENTO DE INTEGRAÇÃO - " + hAPI.getCardValue("dtIntegracao"));
			parametros.put("NUM_SOLIC", solic);
		    parametros.put("DT_INTEG", dataInteg);
		    parametros.put("LINK", link);
	    //Monta lista de destinatários
		    var destinatarios = new java.util.ArrayList();
		    destinatarios.add("integracaoterceiros@fornodeminas.com.br");
		    destinatarios.add("flaviane.salles@fornodeminas.com.br");
		    destinatarios.add("barbara.aguiar@fornodeminas.com.br");
		    destinatarios.add("gustavo.marques@fornodeminas.com.br");
		    
		    notifier.notify(getValue("WKUser"), "TPL_EMAIL_INTEGRACAO", parametros, destinatarios, "text/html");

			}catch(e){
		    log.error("MAVM - Erro ao enviar email integracao: " + e.message);
		 	}
	 	}

	 	if(hAPI.getCardValue("cbUnidade") == "conceicao"){
			try{
			
			var dataInteg = hAPI.getCardValue("dtIntegracao");
			var solic = hAPI.getCardValue("num_solicitacao");
			var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		    //Monta mapa com parâmetros do template
		    var parametros = new java.util.HashMap();
		    parametros.put("subject", "AGENDAMENTO DE INTEGRAÇÃO - " + hAPI.getCardValue("dtIntegracao"));
			parametros.put("NUM_SOLIC", solic);
		    parametros.put("DT_INTEG", dataInteg);
		    parametros.put("LINK", link);
	    //Monta lista de destinatários
		    var destinatarios = new java.util.ArrayList();
		    destinatarios.add("integracaolaticinios@fornodeminas.com.br");
		    destinatarios.add("flaviane.salles@fornodeminas.com.br");
		    destinatarios.add("barbara.aguiar@fornodeminas.com.br");
		    destinatarios.add("gustavo.marques@fornodeminas.com.br");
		    
		    notifier.notify(getValue("WKUser"), "TPL_EMAIL_INTEGRACAO", parametros, destinatarios, "text/html");

			}catch(e){
		    log.error("MAVM - Erro ao enviar email integracao: " + e.message);
		 	}
	 	}				
	}

	if(sequenceId == 33){

		if(hAPI.getCardValue("cbUnidade") == "contagem"){
			try{
			
			var dataInteg = hAPI.getCardValue("dtIntegracao");
			var solic = hAPI.getCardValue("num_solicitacao");
			var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		    var fornec = hAPI.getCardValue("Empresa");
		    var tabela = montaTabela();

		    //Monta mapa com parâmetros do template
		    var parametros = new java.util.HashMap();
		    parametros.put("subject", "AGENDAMENTO DE INTEGRAÇÃO - " + hAPI.getCardValue("dtIntegracao"));
			parametros.put("NUM_SOLIC", solic);
		    parametros.put("DT_INTEG", dataInteg);
		    parametros.put("EMPRESA", fornec);
		    parametros.put("TABLE_PARTICIPANTES", tabela);
		    parametros.put("LINK", link);
	    //Monta lista de destinatários
		    var destinatarios = new java.util.ArrayList();
		    destinatarios.add("flaviane.salles@fornodeminas.com.br");
		    destinatarios.add("barbara.aguiar@fornodeminas.com.br");
		    destinatarios.add("gustavo.marques@fornodeminas.com.br");
		    
		    notifier.notify(getValue("WKUser"), "TPL_EMAIL_LISTA", parametros, destinatarios, "text/html");

			}catch(e){
		    log.error("MAVM - Erro ao enviar email integracao: " + e.message);
		 	}
	 	}

	 	if(hAPI.getCardValue("cbUnidade") == "conceicao"){
			try{
			
			var dataInteg = hAPI.getCardValue("dtIntegracao");
			var solic = hAPI.getCardValue("num_solicitacao");
			var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		    var fornec = hAPI.getCardValue("Empresa");
		    var tabela = montaTabela();

		    //Monta mapa com parâmetros do template
		    var parametros = new java.util.HashMap();
		    parametros.put("subject", "AGENDAMENTO DE INTEGRAÇÃO - " + hAPI.getCardValue("dtIntegracao"));
			parametros.put("NUM_SOLIC", solic);
		    parametros.put("DT_INTEG", dataInteg);
		    parametros.put("EMPRESA", fornec);
		    parametros.put("TABLE_PARTICIPANTES", tabela);
		    parametros.put("LINK", link);
	    //Monta lista de destinatários
		    var destinatarios = new java.util.ArrayList();
		    destinatarios.add("flaviane.salles@fornodeminas.com.br");
		    destinatarios.add("barbara.aguiar@fornodeminas.com.br");
		    destinatarios.add("gustavo.marques@fornodeminas.com.br");
		    
		    notifier.notify(getValue("WKUser"), "TPL_EMAIL_LISTA", parametros, destinatarios, "text/html");

			}catch(e){
		    log.error("MAVM - Erro ao enviar email integracao: " + e.message);
		 	}
	 	}
	}
}

function montaTabela(){
	var html = "";
	html += "<table>";
	html += "	<thead>";
	html += "		<tr>";
	html += "			<th>Nome</th>";
	html += "			<th>RG</th>";
	html += "			<th>CPF</th>";
	html += "			<th>Cargo</th>";
	html += "		</tr>";
	html += "	</thead>";
	html += "	<tbody>";

	var processo = getValue("WKNumProces");
	var campos = hAPI.getCardData(processo);

	var contador = campos.keySet().iterator();

	while (contador.hasNext()) {

		var id = contador.next();

		if(id.match(/NomeTb___/)) {

			var campo = campos.get(id);
			var id = id.split("___")[1];

			var nome = campos.get("NomeTb___" + id);
			var id = campos.get("IdTb___" + id);
			var cpf = campos.get("CpfTb___" + id);
			var cargo = campos.get("CargoTb___" + id);

			html += "<tr>";
			html += "	<td style='text-align:center'>" + nome + "</td>";
			html += "	<td style='text-align:center'>" + id + "</td>";
			html += "	<td style='text-align:center'>" + cpf + "</td>";
			html += "	<td style='text-align:center'>" + cargo + "</td>";
			html += "</tr>";

			log.info("#%$ retorno");
			log.info(html);

		}

	}

	html += "</tbody></table>"

	return html
}

	

