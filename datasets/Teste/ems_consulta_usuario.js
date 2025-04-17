function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();	
	var filtro = "";
	var rbLocaliz = "";
		if (constraints != null) {
	    	
	    	for (var i = 0; i < constraints.length; i++) {
	    		log.info("brunoxyz"+constraints[i].fieldName);
	    		if (constraints[i].fieldName == "campoPesquisa")
	    			{
	    			filtro = constraints[i].initialValue;
	    			} 
	    		
	    		}
			}  
	
	try{
            var serviceProvider = ServiceManager.getService('WSEXECBO');
            log.info("Serviço USA inicializado: " + serviceProvider);
            var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
            var service = serviceLocator.getWebServiceExecBOPort();
            var progressParameters = [];
            
		var token = service.userLogin("fluig");
		
		var parametrosProgress = 
		    [  
		     	{
		     		"name":"filtro", "dataType":"character", "type":"input", "value":new String(filtro)
		     	},
		       {
		    	   "name":"ttUsuario",
		    	   "type":"output",
		    	   "dataType":"tempTable",
		    	   "value":{		    		   
		    	       "name": "ttUsuario",		    	       
		    	       "fields":[		    	                		    	                 
		    	            {"name":"codUsuario", "label":"Login", "type":"character"},
		    	            {"name":"nome", "label":"Nome", "type":"character"},
		    	            {"name":"email", "label":"Email", "type":"character"},
		    	             {"name":"campoPesquisa", "label":"campoPesquisa", "type":"character"}

		    	   	   ],
		    	   	   "records":[]
		    	   }
		       }		       
		    ];   
		
		var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/api_busca_usuario.p", "pi-busca-usuario", JSON.stringify(parametrosProgress) );
		
		log.info("response: " + response);
		log.info(JSON.parse(response));
		
		
		
		if (response && response != null) {
			
			var responseObj = JSON.parse(response);
			
			var registros = JSON.parse(responseObj[0].value);
			
		    
		    log.info("Registros fields: " + registros.fields.length);		    
											    			
		    for(var i = 0; i < registros.fields.length; i++) {
		    	log.info("registros: " + i + " - " + registros.fields[i].name);
		    	dataset.addColumn(registros.fields[i].name);
		    }
		    
		    for(var i = 0; i < registros.records.length; i++) {
		    	var row = [];
		    	for(var j = 0; j < registros.fields.length; j++) {
		    		row.push(registros.records[i][registros.fields[j].name]);
		    	}
		    	dataset.addRow(row);
		    }
		    
		}		
		
		
	}catch(e){
		
		dataset.addRow(new Array(e.message));
		
	}
	
	return dataset;
	    	
}

