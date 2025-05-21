function beforeStateEntry(sequenceId){
		var arrayProduto	    = new Array();
		var numProcesso = getValue("WKNumProces");
		var atividade = parseInt(getValue("WKNumState")); 
		var atividade_destino = parseInt(getValue("WKNextState"));
		var message = "";
		
		
			
		if ( atividade == 14 && sequenceId == 6){
			try{
						
			
			var fieldsForm          = hAPI.getCardData(parseInt(getValue("WKNumProces")));
			var fields		        = fieldsForm.keySet().iterator();
			
			while (fields.hasNext()) {
			    
			    var id = fields.next();
			    
			    if (id.match(/idtbTransacoesDiversas___/)) {
					var aux = id.split("___");
					id = aux[1];				
					var camposTabela = new Object();				
					camposTabela.id = new String (fieldsForm.get("idtbTransacoesDiversas___" + id));
					
					log.info("==========> Id: " + id);
					log.info("==========> Campos tabela: " + camposTabela.id);
					
					camposTabela["numDocumento"]		 = new String(fieldsForm.get("numDocumento"));
					camposTabela["entrada-saida"]		 = new String(fieldsForm.get("entrada_saida___" + id));
					camposTabela["it-codigo"]		     = new String(fieldsForm.get("it_codigo___" + id));
					camposTabela["cod-estabel"]		     = new String(fieldsForm.get("cod_estabel___" + id));
					camposTabela["localizacao"]			 = new String(fieldsForm.get("localizacao___" + id));
					camposTabela["deposito"]			 = new String(fieldsForm.get("deposito___" + id));
					camposTabela["lote"]	     		 = new String(fieldsForm.get("lote___" + id));				
					camposTabela["dt-validade"]	 		 = new String(fieldsForm.get("dt_validade___" + id));
					camposTabela["centro-custo"]	     = new String(fieldsForm.get("centro_custo___" + id));	
					camposTabela["quantidade"]		     = new String(fieldsForm.get("quantidade___" + id));
					camposTabela["cad_user_br"]		     = new String(fieldsForm.get("cad_user_br"));
					
					log.info("DocIago123 - " + camposTabela["numDocumento"]);
					log.info("DocIago123 - " + camposTabela["cad_user_br"]);
					log.info("DocIago123 - " + camposTabela["entrada-saida"]);
					log.info("DocIago123 - " + camposTabela["it-codigo"]);
					log.info("DocIago123 - " + camposTabela["cod-estabel"]);
					log.info("DocIago123 - " + camposTabela["localizacao"]);
					log.info("DocIago123 - " + camposTabela["deposito"]);
					log.info("DocIago123 - " + camposTabela["lote"]);
					log.info("DocIago123 - " + camposTabela["dt-validade"]);
					log.info("DocIago123 - " + camposTabela["centro-custo"]);
					log.info("DocIago123 - " + camposTabela["quantidade"]);
					//camposTabela["un"]		     		 = new String("");
					//camposTabela["valor-material"]		 = new String(fieldsForm.get("valor_material___" + id));
					//camposTabela["conta-contabil"]		 = new String(fieldsForm.get("conta_contabil"));				
					
					
					arrayProduto.push(camposTabela);
				
			    }
			    
			}
			
			var paramItem = new Object();
			paramItem.dataType = "longchar";
			paramItem.name = "pItens";
			paramItem.type = "input";
			paramItem.value = JSON.stringify(arrayProduto);
			
			var iSeq = new Object();
			iSeq.type = "integer";
			iSeq.name = "iseq";
			iSeq.label = "iseq";
			
			var codErro = new Object();
			codErro.type = "integer";
			codErro.name = "codErro";
			codErro.label = "codErro";	
			
			var msgErro = new Object();
			msgErro.type = "character";
			msgErro.name = "msgErro";
			msgErro.label = "msgErro";	    
			
			var camposTempTable = new Object();
			camposTempTable.name = "tt-erro2";
			camposTempTable.records = new Array();
			camposTempTable.fields = [iSeq, codErro, msgErro];
			
			var  ttErro2 = new Object();
			ttErro2.dataType = "temptable";
			ttErro2.name = "tt-erro2";
			ttErro2.type = "output";
			ttErro2.value = camposTempTable;	 
		 
			
			var params = [paramItem, ttErro2];	    	
			
			var jsonParams = JSON.stringify(params);
			log.info("JSON enviado para o Progress: " + jsonParams);
						
			    var serviceProvider = ServiceManager.getService('WSEXECBO');
			    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
			    var service = serviceLocator.getWebServiceExecBOPort();			
			    var token = service.userLogin("acordosfluig");
			    var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/transfere-item.p", "TransfereItem", jsonParams);
			    
			    log.info("Response - " + response);
			   
			    
			}catch(e){
				hAPI.setCardValue("statusProcesso", "ERRO");
			    throw "ERRO AO INTEGRAR OS DADOS COM ERP. MENSAGEM: " + e.message;
			}
			var objResp = JSON.parse(response);
			log.info("ObjResp - " + objResp);
			var errosObj = JSON.parse(objResp[0].value);
			var records = errosObj.records;
			
			log.info("--- records: " + JSON.stringify(records));
			
			if (!response){
				log.info("Iago - Response vazio - Operação concluída !");
				return;
			}

			
			for (var i = 0; i < records.length; i++) {
				message = message + new String(records[i].codErro) + " - " + new String(records[i].msgErro);
			}
			
			if(message != ""){ 
				hAPI.setCardValue("statusProcesso", "ERRO");
				throw "ERRO AO INTEGRAR OS DADOS COM ERP. MENSAGEM: " + message;
			}
		    
		
		
		}
			
	
}