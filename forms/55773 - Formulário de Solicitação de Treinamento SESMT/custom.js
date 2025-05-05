var atividade = "";
var processo = "";
var isView = false;

$(document).ready(function(){
	//calendario
	/*$(".date").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);*/
	if ($("#CpfTb").length) {
		$("#CpfTb").mask("000.000.000-00");
	}		

	
	if(getWKNumState() == 9){ //RH-DP AVALIAR DOCUMENTOS
		$("#aprov_nr").val("false");
		$("input[id^='NomeTb___']").each(function() {
			if(this.id.indexOf("NomeTb___") > -1){
				var index = this.id;
				index = index.replace("NomeTb___", "");
	
				if($("#_NR35Tb___"   + index).attr("checked")=="checked") $("#aprov_nr").val("true");
				if($("#_NR33Tb___"   + index).attr("checked")=="checked") $("#aprov_nr").val("true");
				if($("#_NR18Tb___"   + index).attr("checked")=="checked") $("#aprov_nr").val("true");
				if($("#_NR11Tb___"   + index).attr("checked")=="checked") $("#aprov_nr").val("true");
				if($("_NR10BTb___"   + index).attr("checked")=="checked") $("#aprov_nr").val("true");
				if($("_NR10SEPTb___" + index).attr("checked")=="checked") $("#aprov_nr").val("true");
			}
		});		
	} 

	
	var dataAtual = new Date();
	dataAtual.setDate(dataAtual.getDate());

	var dataInt = new Date();
	var dias = 1;
	dataInt.setDate(dataInt.getDate() + dias);
	var dtInicio = FLUIGC.calendar('#dtInicio');
	dtInicio.setMinDate(dataAtual);

	var dtFim = FLUIGC.calendar('#dtFim');
	dtInicio.setMinDate(dataAtual);

	var dtEncerramento = FLUIGC.calendar('#dtEncerramento');
		

	var dtIntegracao = FLUIGC.calendar('#dtIntegracao', {
		daysOfWeekDisabled: [0,1,3,4,6]
	});

	dtIntegracao.setMinDate(dataInt);

	if(getWKNumState() == 0 || getWKNumState() == 4){
		var dataInicioAtividade = FLUIGC.calendar('#dtInicioAtividade');
		var dataFimAtividade = FLUIGC.calendar('#dtFimAtividade');
		dataInicioAtividade.setMinDate(dataAtual);
	}

	let qtdDias = calcularDiferencaEmDias(dtIniAtiv,dtFimAtiv);

	$( "#dtInicioAtividade" ).on( "blur", function() {
		var dtIniAtiv = $("#dtInicioAtividade").val();
		var dtFimAtiv = $("#dtFimAtividade").val();
		if(dtIniAtiv != "" && dtFimAtiv != ""){
			
			if(qtdDias > 30) $("#maiorque30").val("true");
			else $("#maiorque30").val("false");
		}
	  } );

	  $( "#dtFimAtividade" ).on( "blur", function() {
		var dtIniAtiv = $("#dtInicioAtividade").val();
		var dtFimAtiv = $("#dtFimAtividade").val();
		if(dtIniAtiv != "" && dtFimAtiv != ""){
			
			if(qtDias > 30) $("#maiorque30").val("true");
			else $("#maiorque30").val("false");
		}
	  } );

	/*
	$(".date").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
		calendario.setMinDate(dataAtual);
	});
	*/	
	var node_list = document.getElementsByTagName('*');
    for (var i = 0; i < node_list.length; i++) {
    	var node = node_list[i];
		if(getWKNumState() > 4){
			if(node.nodeName == "SPAN" && node.className == "flaticon flaticon-paperclip icon-sm" ) {
				node.className = "flaticon flaticon-internal-view icon-sm"
			}
		}
	}
});

function calcularDiferencaEmDias(dataInicial, dataFinal) {
    
    var data1 = new Date(dataInicial);
    var data2 = new Date(dataFinal);    
    var diferencaEmMilissegundos = data2 - data1;    
    var diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);
    
    diferencaEmDias = Math.round(diferencaEmDias);

    return diferencaEmDias;
}

	function addTableRow(tabela) {
     
         row = wdkAddChild(tabela);
     
         if (tabela == "tbTerceiros") {
             $("#idTbTerceiros___" + row).val(row);
         }
         
     }
	
	
     
     function delTableRow(tabela) {
         var tr = $(tabela).closest('tr');
     
         //tr.fadeOut(400, function(){ 
         tr.remove();
         //}); 	  
     
         return false;
     }

     function showTipo(target){
	console.log(target.id + " - " + target.name);
	if (target.value == "emissao"){
		$("#divNumIntegracao").show();
		$("#divAvisoPermissao").show();
		$("#divAvisoIntegracao").hide();
		
	}
	else{
		$("#divNumIntegracao").hide();
		$("#divAvisoPermissao").hide();
		$("#divAvisoIntegracao").show();
		
	}
}

function fnValidaArqruivo(obj){
	if(!isValidPDF(obj.value)){
		throw("<b> Arquivo anexado, deve ser PDF</b> <br> <b>Arquivo Anexado: </b> " + obj.value);
		obj.value = "";
	}
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
		if(!isValidPDF(obj)){
			if(!isValidPDF(attachment.description)){
				parent.WKFViewAttachment.removeAttach([i]);
			}
		}
	});

}


var beforeSendValidate = function (numState, nextState) {
    var atividade = getWKNumState();
	var listaUpload = new Array();
	
    
	if(atividade == 0 || atividade == 4){
		$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
			if(!isValidPDF(attachment.description)){
				throw("<b> Arquivo anexado, deve ser PDF</b> <br> <b>Arquivo Anexado: </b> " + attachment.description);
			}
		});
	}
}
	

function isValidPDF(fileName) {
    var validExtensions = /(\.pdf)$/i;
    return validExtensions.test(fileName);
}

function fnUpload(obj){
	obj = obj.previousElementSibling;
	var nameInput = obj.id;
	var control = false;
	
	//nameInput = nameInput.replace('btUpload_anexoNC', 'anexoNC');
	//nameInput = nameInput.substring(0, nameInput.length - 4);
	
   if($("#" + nameInput).val() == ""){
	   FLUIGC.toast({
        		title: 'ERRO - CAMPO EM BRANCO ',
        		message: " FAVOR INFORMAR O NOME DO ARQUIVO",
        		type: 'danger'
        	});
		$("#" + nameInput).attr('readonly', false);	
		$("#" + nameInput).val("");
		$("#" + nameInput).focus();
	   	
   } else {
       $.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
    	   if(attachment.description == $("#" + nameInput).val() ){
    	     parent.WKFViewAttachment.removeAttach([i]);
			 control = true;
			 
    	   }
       });
       
	   if(!control){
		JSInterface.showCamera($("#" + nameInput).val());
		$("#" + nameInput).attr('readonly', true);
	   } else {
		$("#" + nameInput).val("");
		fnUpload(obj);
	   }
         
   }
}
		
var beforeSendValidate = function (numState, nextState) {
    var atividade = getWKNumState();
	var listaUpload = new Array();
	
    
	if(atividade == 67){
		$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
			if(!isValidPDF(attachment.description)){
				throw("<b> Arquivo anexado, deve ser PDF</b> <br> <b>Arquivo Anexado: </b> " + attachment.description);
			}
		});
	}
}

function fucriafilho() {
	var row = wdkAddChild('tbAnexo');
}

function openDoc(docId, version) {
    var urlFtl = parent.WCMAPI.serverUR + "/ecm_documentview/documentView.ftl";
    parent.ECM.documentView = {};
    var cfg = {
        url: urlFtl,
        //width: 700,
        //height: 200,
        maximized: true,
        showbtclose: false,
        title: "Buscando documento...",
        callBack: function () {
            parent.ECM.documentView.getDocument(docId, version);
        },
        customButtons: []
    };
    parent.ECM.documentView.panel = parent.WCMC.panel(cfg);
    //$('#ecm-documentview-toolbar').hide(); // Oculta o menu de ações
}