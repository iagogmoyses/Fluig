function displayFields(form, customHTML) {
	var atividade = getValue("WKNumState");
	var ativ = parseInt(atividade);

	var login = getValue("WKUser");
	var controlaLote = getValue("it_lote");
	
	form.setValue('atividade', atividade);

	customHTML.append('<script>document.getElementById("dvFiscal").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divFinanceiro").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divAvisoTitulo").style.display  = "none";</script>');
	customHTML.append('<script>document.getElementById("divCiente").style.display  = "none";</script>');
	
	customHTML.append("<script>");
	customHTML.append("        function getWKUserReal(){ return '" + login + "'} ");
	customHTML.append("        function getWKNumState(){ return " + getValue("WKNumState") + " }  ");
	customHTML.append("</script>");
	
	customHTML.append("<script>function getModePage(){ return '" + form.getFormMode() + "'; } </script>");
	
	customHTML.append('<script>document.getElementById("dvAprovar").style.display = "none";</script>');
	customHTML.append('<script>document.getElementById("dvIntegra").style.display = "none";</script>');
	customHTML.append('<script>document.getElementById("dvFinanceiro").style.display = "none";</script>');

	if(form.getFormMode() == "VIEW"){
		
	}

	function PenultimoDiaUtilDoMes() {
		let today = new Date();
		let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
		let penultimateDayOfMonth = new Date(lastDayOfMonth - (24 * 60 * 60 * 1000));

		if (today.getDate() === penultimateDayOfMonth.getDate()) {
			return true;
		} else {
			return false;
		}
	}

	function isLastWorkingDayOfMonth() {
		const date = new Date();
		const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		const day = date.getDate();
		const weekDay = date.getDay();
		return lastDayOfMonth === day && weekDay !== 0 && weekDay !== 6;
	}


	
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

		if(controlaLote == "true"){
			form.setVisibleById("dvLote", true);
		}
	
		
	} 

	switch(ativ){
		case 0:

			var today = new Date();     
		    var year = today.getFullYear();     
		    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);     
		    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
			form.setValue('data_solicitacao', day + '/' + month  + '/' + year);

			var USER = fluigAPI.getUserService().getCurrent().getFullName();
			
			form.setValue('nm_solicitante', USER);
		break;

		case 2:

		customHTML.append('<script>document.getElementById("dvFiscal").style.display  = "";</script>');

		break;

		case 9:

		customHTML.append('<script>document.getElementById("divFinanceiro").style.display  = "";</script>');

		break;

		case 30:

		customHTML.append('<script>document.getElementById("dvFiscal").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("divAvisoTitulo").style.display  = "";</script>');
		customHTML.append('<script>document.getElementById("divCiente").style.display  = "";</script>');

		break;

	}
}
