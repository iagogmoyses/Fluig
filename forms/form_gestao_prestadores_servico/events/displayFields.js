function displayFields(form,customHTML){ 
	var ATIVIDADE = getValue("WKNumState");
	var ativ = parseInt(ATIVIDADE);
    var login = getValue("WKUser");
	

	var numForm = form.getDocumentId();
	
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	
	customHTML.append('<script>document.getElementById("dvFase1").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase2").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase3").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase4").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase5").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase6").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase7").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase8").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFase9").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divAnexo").style.display  = "none";</script>');
    customHTML.append('<script>document.getElementById("divAvisoUser").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divIntegracao").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divPermissaoTrabalho").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divEncerramento").style.display  = "none";</script>');
	customHTML.append("<script>function getWKUser(){ return '" + login + "'}; </script>");
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	customHTML.append("<script>function mobile(){ return '" + form.getMobile() + "'; } </script>");
	customHTML.append("<script>function getProcess(){ return " + getValue("WKNumProces") + "; }</script>");

	if(form.getFormMode() == "VIEW"){
	    if(form.getValue("aprov_fase1") != "") customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
		if(form.getValue("aprov_fase2") != "") customHTML.append('<script>document.getElementById("dvFase2").style.display  = "";</script>');
	    if(form.getValue("aprov_fase3") != "") customHTML.append('<script>document.getElementById("dvFase3").style.display  = "";</script>');
		if(form.getValue("aprov_fase3_1") != "") customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "";</script>');
	    if(form.getValue("aprov_fase4") != "") {
			customHTML.append('<script>document.getElementById("dvFase4").style.display  = "";</script>');
		}
	    if(form.getValue("aprov_fase7") != "") customHTML.append('<script>document.getElementById("dvFase7").style.display  = "";</script>');
	    if(form.getValue("aprov_fase8") != "") customHTML.append('<script>document.getElementById("dvFase8").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("dvFase6").style.display  = "none";</script>');
		customHTML.append('<script>document.getElementById("dvFase9").style.display  = "none";</script>');
	
	}

    if(ativ == 0 || ativ == 4){
        var fullDate = new Date();
		var hours = fullDate.getHours();
		var minutes = fullDate.getMinutes();
		if (minutes <= 9) {
			minutes = "0" + minutes;
		}

		var timeValue = hours + ":" + minutes;
		var date = fullDate.getDate().toString();
		
		if (date.length == 1) {
			date = 0 + date;
		}
		
		var mes = (fullDate.getMonth() + 1).toString();
		if (mes.length == 1) {
			mes = 0 + mes;
		}
		
		var data = date + "/" + mes + "/" + fullDate.getFullYear();
		form.setValue("cad_dt_trans_br", data);
		form.setValue('cad_user_br', login);

		customHTML.append('<script>document.getElementById("divAnexo").style.display  = "";</script>');
    } else if (ativ != 0 && ativ != 4){
        if (form.getValue("numDocumento") == "" || form.getValue("numDocumento") == null) {
            form.setValue("numDocumento", getValue("WKNumProces"));
        }

    }

	if(ativ == 18){ //Emissao Permissao de Trabalho
		customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
	}
	if(ativ == 36){ //RH-DP CONFIRMA CAPACITAÇÕES
		customHTML.append('<script>document.getElementById("dvFase2").style.display  = "";</script>');
	}
	if(ativ == 38){ //MED. TRABALHO VERIFICA ASO/PCMSO
		customHTML.append('<script>document.getElementById("dvFase3").style.display  = "";</script>');
	}
	if(ativ == 61){ // Integracao
		
		customHTML.append('<script>document.getElementById("divIntegracao").style.display  = "";</script>');
	} 
	if(ativ == 63){ //Aprova Integração
		customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "";</script>');
	}
	if(ativ == 20){ //CD AVALIA RISCO
		customHTML.append('<script>document.getElementById("dvFase4").style.display  = "";</script>');
	}
	if(ativ == 22){ //ANEXAR DOC ASSINADO
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "";</script>');
	}
	if(ativ == 24){ //CQ VALIDAR DOOC
		customHTML.append('<script>document.getElementById("dvFase5").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("dvFase6").style.display  = "";</script>');
	}
	if(ativ == 34){ //Libera Portaria de Inicio de Trabalho
		customHTML.append('<script>document.getElementById("dvFase7").style.display  = "";</script>');
		//customHTML.append('<script>document.getElementById("divPermissaoTrabalho").style.display  = "";</script>');
		//customHTML.append('<script>document.getElementById("divEncerramento").style.display  = "";</script>');
	}
	if(ativ == 15){ //SESMT AGUARDANDO DOCS
		customHTML.append('<script>document.getElementById("dvFase8").style.display  = "";</script>');
	}

    if(ativ == 108){ //Retorno Solicitante
        customHTML.append('<script>document.getElementById("divAvisoUser").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase1").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase2").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase3").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase3_1").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase4").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase7").style.display  = "";</script>');
        customHTML.append('<script>document.getElementById("dvFase8").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("divAnexo").style.display  = "";</script>');
    }
		
	/*
	if(form.getValue("rbTipoSolic") == "emissao"){
		form.setVisibleById(divNumIntegracao);
	}
	*/

		switch(ativ){
		case 1:
					
			
			if(form.getFormMode() != "VIEW")
				{
				form.setVisibleById("divIntegracao");
				//form.setVisibleById("divPermissaoTrabalho");
				//form.setVisibleById("divEncerramento");
				
				}
		break;
		
		case 0:
			
			if(form.getFormMode() != "VIEW")
			{
				form.setVisibleById("divIntegracao",false);
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
			
			}
			
		break;
		
		case 20:
			
			if(form.getFormMode() != "VIEW")
			{
				form.setVisibleById("divIntegracao",false);
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
		break;
		
		case 15:
			
			if(form.getFormMode() != "VIEW")
			{
				
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');

			
		break;
		
		case 61:
			
			if(form.getFormMode() != "VIEW")
			{
				
				form.setVisibleById("divPermissaoTrabalho",false);
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);

			
		break;
		
		case 18:
			
			
			
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
			if(form.getFormMode() != "VIEW")
			{
				
				
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			
			if (form.getValue("dtIntegracao") == null || form.getValue("dtIntegracao") == ""){
				form.setVisibleById("divIntegracao", false);
			}
			
			
		break;
		
		case 34:
			
			
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');

			
		break;

		case 36:
			
		
			var processo = getValue("WKNumProcess");
			form.setValue("num_solicitacao", processo);
			
			if(form.getFormMode() != "VIEW")
			{
				
				
				form.setVisibleById("divEncerramento",false);
						
			}
			form.setVisibleById("btnAdicionaTerceiro",false);
			customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').css(\'display\', \'none\');var closers = $(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').find(\'input, textarea, select\');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != \'none\' && close.type != \'hidden\') {hideDiv = false;}});if (hideDiv == true) {$(\'*[name="btnDeletaTerceiro"]\').closest(\'.form-field\').css(\'display\', \'none\');}'); customHTML.append('</script>');customHTML.append('<script>');customHTML.append('$(\'*[name="btnDeletaTerceiro"]\').closest("li").hide()');customHTML.append('</script>');
			
			if (form.getValue("dtIntegracao") == null || form.getValue("dtIntegracao") == ""){
				form.setVisibleById("divIntegracao", false);
			}
		
		break;
		
		}
}
	
			
	
	