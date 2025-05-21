function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var atividade = getValue("WKNumState");
	var rb_tipo_solic = hAPI.getCardValue("rb_tipo_solic");
	
	if(nextSequenceId == 12 ){
		if(rb_tipo_solic == "criacao"){
			try{
				
				var remetente = getValue("WKUser");
				var user = hAPI.getCardValue("emailRequester");
				var nomeUser = hAPI.getCardValue("cad_nom_user_br");
				var solic = hAPI.getCardValue("numDocumento");
				var dataSolic = hAPI.getCardValue("cad_dt_trans_br");
				var codigo = hAPI.getCardValue("codigo");
				var link = "http://fluig.fornodeminas.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + solic; 
		
				var parametros = new java.util.HashMap();
				parametros.put("subject", "CRIAÇÃO DE CENTRO DE CUSTO FINALIZADA");
				parametros.put("SOLICITANTE", nomeUser);
				parametros.put("NUM_SOLIC", solic);
				parametros.put("DT_SOLIC", dataSolic);
				parametros.put("LINK", link);
				parametros.put("CODIGO", codigo);
		
				var destinatarios = new java.util.ArrayList();
				destinatarios.add(user);
		
				notifier.notify(remetente, "TPL_EMAIL_CRIACAO_CC", parametros, destinatarios, "text/html");
			}catch(e){
				log.error("MAVM - Erro ao enviar email CRIACAO_CC: " + e.message);
		 	}

	}
	
	
	}
}