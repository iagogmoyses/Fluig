function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();	
	var filtroCC = "";
	var rbLocaliz = "";
		if (constraints != null) {
	    	
	    	for (var i = 0; i < constraints.length; i++) {
	    		log.info("brunoxyz"+constraints[i].fieldName);
	    		if (constraints[i].fieldName == "campoPesquisa")
	    			{
	    			filtroCC = constraints[i].initialValue;
	    			} 
	    		if (constraints[i].fieldName == "rbLocaliz")
	    			{
	    			rbLocaliz = constraints[i].initialValue;
	    			} 
	    		
	    		}
			}  
	
	try{
		
	    	if (rbLocaliz == "usa"){
            var serviceProvider = ServiceManager.getService('WSEXECBOUSA');
            log.info("Serviço BR inicializado: " + serviceProvider);
            var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
            var service = serviceLocator.getWebServiceExecBOPort();
            var progressParameters = [];
            }
            else{
            var serviceProvider = ServiceManager.getService('WSEXECBO');
            log.info("Serviço USA inicializado: " + serviceProvider);
            var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
            var service = serviceLocator.getWebServiceExecBOPort();
            var progressParameters = [];
            }
		
		var token = service.userLogin("super");
		
		var parametrosProgress = 
		    [  
		     	{
		     		"name":"cFiltro", "dataType":"character", "type":"input", "value":new String(filtroCC)
		     	},
		       {
		    	   "name":"ttCcusto",
		    	   "type":"output",
		    	   "dataType":"tempTable",
		    	   "value":{		    		   
		    	       "name": "ttCcusto",		    	       
		    	       "fields":[		    	                		    	                 
		    	            {"name":"codCcusto", "label":"codCcusto", "type":"character"},
		    	            {"name":"descricao", "label":"descricao", "type":"character"},
		    	            {"name":"dtIni", "label":"dtIni", "type":"character"},
		    	            {"name":"dtFim", "label":"dtFim", "type":"character"},
		    	            {"name":"campoPesquisa", "label":"campoPesquisa", "type":"character"}

		    	   	   ],
		    	   	   "records":[]
		    	   }
		       }		       
		    ];   
		
		var response = service.callProcedureWithToken(token, "especificos/ems2/fluig/api_busca_centro_custos.p", "pi-zoom-centro-custo", JSON.stringify(parametrosProgress) );
		
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

