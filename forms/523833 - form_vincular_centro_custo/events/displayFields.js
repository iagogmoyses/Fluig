function displayFields(form,customHTML){ 

	var atividade = getValue("WKNumState");
	var login = getValue("WKUser");
	
	form.setValue('atividade', atividade);
	
	customHTML.append("<script>");
	customHTML.append("        function getWKUserReal(){ return '" + login + "'} ");
	customHTML.append("        function getWKNumState(){ return " + getValue("WKNumState") + " }  ");
	customHTML.append("</script>");
	
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
    customHTML.append('<script>document.getElementById("dvAprov").style.display  = "none";</script>');

    if (atividade == 0 || atividade == 1) {
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

		/*if(controlaLote == "true"){
			form.setVisibleById("dvLote", true);
		}*/
	
		
	} 
	else if (atividade != 0 && atividade != 1){
        if (form.getValue("numDocumento") == "" || form.getValue("numDocumento") == null) {
            form.setValue("numDocumento", getValue("WKNumProces"));
        }

    }	

    if(atividade == 2){
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
		form.setValue("dt_aprovador_custos", data);
		form.setValue('aprovador_custos_login', login);
        customHTML.append('<script>document.getElementById("dvAprov").style.display  = "";</script>');
    }

    if(atividade == 4){
        customHTML.append('<script>document.getElementById("dvAprov").style.display  = "";</script>');
    }

		// Retorna datas
		var data = new Date();
		var dia  = data.getDate();
		var mes  = data.getMonth() + 1;
		var ano  = data.getFullYear();
		let hora = data.getHours();
		dia  = (dia<=9 ? "0"+dia : dia);
		mes  = (mes<=9 ? "0"+mes : mes);
		var newData = dia+"/"+mes+"/"+ano;
	
		// Esconde o botão de envio
		function hideSendButton(){
			customHTML.append('<script>');
			customHTML.append('window.parent.$("#workflowActions").hide();');
			customHTML.append('</script>');
		}
    }