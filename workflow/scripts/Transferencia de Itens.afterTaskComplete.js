function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var atividade = getValue("WKNumState");
	
	if(atividade == 2 && nextSequenceId == 6 ){
		try{
			
		var gestor = getValue("WKUser");
		var gestorName = hAPI.getCardValue("nomeGestor");
		var user = hAPI.getCardValue("emailRequester");
		var nomeUser = hAPI.getCardValue("cad_nom_user_br");
		var solic = hAPI.getCardValue("numDocumento");
		var dataSolic = hAPI.getCardValue("cad_dt_trans_br");
		var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		
		var parametros = new java.util.HashMap();
		parametros.put("subject", "TAREFA RECUSADA PELO GESTOR " + gestor);
		parametros.put("SOLICITANTE", nomeUser);
		parametros.put("APROVADOR", gestor);
		parametros.put("NUM_SOLIC", solic);
		parametros.put("DT_SOLIC", dataSolic);
		parametros.put("LINK", link);
		parametros.put("GESTOR", gestorName);
		
		var destinatarios = new java.util.ArrayList();
		destinatarios.add(user);
		
		notifier.notify(gestor, "TPL_EMAIL_RECUSA_TRANSF_ITENS", parametros, destinatarios, "text/html");
		}catch(e){
		    log.error("MAVM - Erro ao enviar email RECUSA_TRANSF_ITENS: " + e.message);
		 	}

	}
	
	if(atividade == 14 && nextSequenceId == 6){
		try{
			
			var userCustos = getValue("WKUser");
			var userCustosName = hAPI.getCardValue("nomeCustos");
			var user = hAPI.getCardValue("emailRequester");
			var solic = hAPI.getCardValue("numDocumento");
			var dataSolic = hAPI.getCardValue("cad_dt_trans_br");
			var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
			
			var parametros = new java.util.HashMap();
			parametros.put("subject", "TAREFA FINALIZADA POR " + userCustos);
			parametros.put("SOLICITANTE", user);
			parametros.put("APROVADOR", userCustos);
			parametros.put("NUM_SOLIC", solic);
			parametros.put("DT_SOLIC", dataSolic);
			parametros.put("LINK", link);
			parametros.put("USERCUSTOS", userCustosName);
			
			var destinatarios = new java.util.ArrayList();
			destinatarios.add(user);
			
			notifier.notify(userCustos, "TPL_EMAIL_FINALIZA_TRANSF_ITENS", parametros, destinatarios, "text/html");
			}catch(e){
			    log.error("MAVM - Erro ao enviar email FINALIZA_TRANSF_ITENS: " + e.message);
			 	}
	}
}