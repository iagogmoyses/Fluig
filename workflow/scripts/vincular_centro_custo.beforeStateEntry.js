function beforeStateEntry(sequenceId){
		var arrayUser	    = new Array();
		var numProcesso = getValue("WKNumProces");
		var atividade = parseInt(getValue("WKNumState")); 
		var atividade_destino = parseInt(getValue("WKNextState"));
		
		
		try{
			
		if (sequenceId == 6){
						
			
			var fieldsForm          = hAPI.getCardData(parseInt(getValue("WKNumProces")));
			log.info("fieldsForm -  " + fieldsForm);
			var fields		        = fieldsForm.keySet().iterator();
			log.info("Campos no keySet: " + fieldsForm.keySet());  // Verifique as chaves disponíveis
			log.info("Tipo de fieldsForm: " + typeof fieldsForm);
			log.info("fields - " + fields);
			
			while (fields.hasNext()) {
				log.info("Iago entrou no while 123");
			    
			    var id = fields.next();
			    log.info("id123 - " + id);
			    
			    
			    if (id.match(/idtbVinculaCC___/)) {
					var aux = id.split("___");
					id = aux[1];				
					var camposTabela = new Object();				
					camposTabela.id = new String (fieldsForm.get("idtbVinculaCC___" + id));
					
					log.info("==========> Id: " + id);
					log.info("==========> Campos tabela: " + camposTabela.id);
					
					camposTabela["cod_usuario"]		 = new String(fieldsForm.get("cod_usuario___" + id));
					camposTabela["cod_centro_custo"]		     = new String(fieldsForm.get("cod_centro_custo___" + id));
					
					log.info("Iago12345 - " + camposTabela["cod_usuario"]);
					log.info("Iago12345 - " + camposTabela["cod_centro_custo"]);
					
					
					arrayUser.push(camposTabela);
				
			    }
			    
			}
			
			var paramUser = new Object();
			paramUser.dataType = "longchar";
			paramUser.name = "pUser";
			paramUser.type = "input";
			paramUser.value = JSON.stringify(arrayUser);
			
			 var codErro = new Object();
			    codErro.type = "integer";
			    codErro.name = "codErro";
			    codErro.label = "codErro";	
			    
			    var msgErro = new Object();
			    msgErro.type = "character";
			    msgErro.name = "msgErro";
			    msgErro.label = "msgErro";	    
			    
			    var camposTempTable = new Object();
			    camposTempTable.name = "tt-erro";
			    camposTempTable.records = new Array();
			    camposTempTable.fields = [codErro, msgErro];
			     
			    var  ttErro = new Object();
			    ttErro.dataType = "temptable";
			    ttErro.name = "tt-erro";
			    ttErro.type = "output";
			    ttErro.value = camposTempTable;
		 
			
			var params = [paramUser, ttErro];	    	
			
			var jsonParams = JSON.stringify(params);
			log.info("JSON enviado para o Progress: " + jsonParams);
						
			    var serviceProvider = ServiceManager.getService('WSEXECBO');
			    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
			    var service = serviceLocator.getWebServiceExecBOPort();			
			    var token = service.userLogin("acordosfluig");
			    var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/api_vincula_centro_custo.p", "pi-vincula-centro-custo", jsonParams);
			    
			
		    }
		} catch(e){
		    throw "ERRO AO INTEGRAR OS DADOS COM ERP. MENSAGEM: " + e.message;
		}
	
}