function beforeStateEntry(sequenceId){
		var arrayProduto	    = new Array();
		var numProcesso = getValue("WKNumProces");
		var atividade = parseInt(getValue("WKNumState")); 
		var atividade_destino = parseInt(getValue("WKNextState"));
		
		
		try{
			
		if ( atividade == 14 && sequenceId == 6){
						
			
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
		 
			
			var params = [paramItem];	    	
			
			var jsonParams = JSON.stringify(params);
			log.info("JSON enviado para o Progress: " + jsonParams);
						
			    var serviceProvider = ServiceManager.getService('WSEXECBO');
			    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
			    var service = serviceLocator.getWebServiceExecBOPort();			
			    var token = service.userLogin("acordosfluig");
			    var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/transfere-item.p", "TransfereItem", jsonParams);
			    
			
		    }
		} catch(e){
		    throw "ERRO AO INTEGRAR OS DADOS COM ERP. MENSAGEM: " + e.message;
		}
	
}