
$(document).ready(function() {
	var paiFilho ="";
	setTimeout(function() {
		formADIComplementar.start();
	}, 100)
});


//** funcao de apoio para funcoes de calculo e index
var formADIComplementar = (function() {
	var today = new Date();
	var current = null;
	var loading = FLUIGC.loading(window);
	var index = 0;
	return {
		start : function() {//inicia processo

			events.setup();

		}
	}
})();


var events = (function() {
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				var ev = $(this).data("event");
				var idObj = this.previousElementSibling.id;
				
			    zooms(ev, idObj);
			});
		}
	}
})();



//FUNCAO PARA SABER O SISTEMA OPERACIONAL MOBILE 
function retornaSO() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    } else if (/android/i.test(userAgent)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    } else {
        return "unknown";
    }                
}

//atribui o valor selecionado do zoom para o campo do formulário
function setSelectedZoomItem(selectedItem) {

	var tipo = selectedItem.type;

	if (tipo.substring(0,5) == "anexo" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#anexo" + idx).val(selectedItem.Arquivo);
	}

	if (tipo == "cbUnidade"){
		$("#cbUnidade").val(selectedItem.unidade);
	}
}

function zooms(ev,idObj){

	if (ev == "cbUnidade" && fnBtnLiberado("btncbUnidade")){
		if(getWKNumState() == 0 || getWKNumState() == 4){
			
			var filtro  = "unidade,CONTAGEM|CONCEIÇÃO DO PARÁ";
			modalzoom.open("dsGenerico", "unidade,Unidade", "unidade", "Pesquisa Unidades", filtro , "cbUnidade", "" , "", "" );
		}
	}

	if ( ev ==  'uploadx' ){
		if(getWKNumState() == 67){
			var lista = "";
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
				if(!isValidPDF(attachment.description)){
					parent.WKFViewAttachment.removeAttach([i]);
				}
			});
			$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
                var controle = false;
				if(!isValidPDF(attachment.description)){
					controle = true;
					parent.WKFViewAttachment.removeAttach([i]);
				}
				$("input[name^='anexo___']").each(function(index, value){
					if($("#" + value.name).val() ==  attachment.description) controle = true;
				});	
				$("input[name^='anexo___']").each(function(index, value){
					if($("#" + value.name).val() ==  attachment.description) controle = true;
				});
				$("input[name^='anexo___']").each(function(index, value){
					if($("#" + value.name).val() ==  attachment.description) controle = true;
				});
				if(!controle) lista += ";" + attachment.description;
			});
			 if(lista == ""){
				FLUIGC.toast({
					title: 'Necessário efetuar upload!  ',
					message: " Aba Anexos contem 0 arquivos ou você já selecionou todos os arquivos!",
					type: 'danger'
				});
			 } else {
				 if(lista.substring(0,1) == ";") lista = lista.substring(1,lista.length);
		 
				 var filtro = "lista,"+lista+"";
			 
				 modalzoom.open("dsUpload", "Arquivo,Arquivo", "Arquivo", "Pesquisa Arquivo", filtro , idObj, "" , "", "" ); 

			 }
		} else {
			fnGetAttachment(idObj); 
		}

	}
}

//MODAL NORMAL AJAX VIA API REST - ASSINCRONO 
var modalzoom = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading(window);
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			
			loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			var tipo = type ;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide'>" +
					"<div class='input-group'>" +
					"<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
					"<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
					"</div>" +
					"<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
					"<table class='table table-hover table-zoom'>" +
					"<thead>" +
					"</thead>" +
					"<tbody>" +
					"</tbody>" +
					"</table>" +
					"</div>" +
					"</body>";
			
			var zoommodal = FLUIGC.modal({
				title: title,
				content: html,
				formModal: false,
				size: "large",
				id: 'modal-zoom-' + type,
				actions: [{
					'label': 'Selecionar',
					'classType': 'btn-primary zoom-selected',
					'autoClose': true,
				},{
					'label': 'Fechar',
					'autoClose': true
				}]
			}, function(err, data) {
				if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
				} else {
					var trimarray = function (fields) {
						for(var i=0; i < fields.length; i++){
							fields[i] = fields[i].trim();
						}
						return fields;
					}
					
					var urlrequest = function(){
						var request = "/ecm/api/rest/ecm/dataset/",
							json = {};
						
						if (dataset != null) {
							request += "getDatasetZoom";
							json.datasetId = dataset;
						} else if(cardDatasetId != null){
							request += "getCardDatasetValues";
							json.cardDatasetId = cardDatasetId;
						}
						
						if (resultfields != null && resultfields.length > 0 ){
							json.resultFields = trimarray(resultfields.split(","));
						}
						
						if (filters != null && filters.length > 0 ){
							json.filterFields = trimarray(filters.split(","));
						}
						
						if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
							json.likeField = likefield;
							json.likeValue = likevalue;
						}
						
						var searchValue = $("#search").val();
						if(searchValue && searchValue.length > 0) {
							json.searchValue = searchValue;
							
							if (searchby && searchby != "") {
								json.searchField = searchby;
							} else {
								json.searchField = fields.split(",")[0];
							}
							
						}
						
						return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}
					
					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
						$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
							$(".table-zoom > tbody").append(html);
						}
						$(".table-zoom > tbody > tr").click(function() {
							$(".table-zoom > tbody > tr").removeClass("active");
							$(this).addClass("active");
							current = $(this).data("dataset");
						});
						$(".table-zoom > tbody > tr").dblclick(function() {
							var row = globaldataset[$(this).data("dataset")];
							row["type"] = type;
							setSelectedZoomItem(row);
							zoommodal.remove();
						});
						
						loading.hide();
					}
					
					var dosearch = function() {
						var url = urlrequest();
						$(".table-zoom > tbody").html("");
						
						loading.show();
						
						$.ajax({
							type: "GET",
							dataType: "json",
							url: url,
							data: "",
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
							},
							success: function (data, status, xhr) {
								var dataset = data["invdata"];
								readydataset(dataset);
							}
						});
					}
					
					var timeout;
					$('#search').keyup(function() {
						clearTimeout(timeout);
						var keycode;
						if (window.event) {
							keycode = window.event.keyCode;
						} else if (event) {
							keycode = event.which;
						} else { 
							return true;
						}
						if (keycode == 13) {
							dosearch();
						} else {
							timeout = setTimeout(searchtable($(this).val()), 500);
						}
					});
					
					$('.zoom-selected').click(function() {
						var row = globaldataset[current];
						row["type"] = type;
						setSelectedZoomItem(row);
					});
					
					setup(fields);
					dosearch();
					
				}
			});
		}
	}
})();






function modal( title , html) {
    var myModal = parent.FLUIGC.modal({
        title: title ,
        content: html,
        id: 'fluig-modal',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}

function fnBtnLiberado(nomeObj){
    var teste = $('#'+nomeObj).hasClass("input-group-addon group-zoom no-view zoom-click btn-info");
    if (teste) 
	return true;
    else 
	return false;
}


function fnGetAttachment(anexoName){

	var c1 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", getProcess(), getProcess(), ConstraintType.MUST);
    var constraints = new Array(c1);
    var processAttachment = DatasetFactory.getDataset("processAttachment", null, constraints, null);

	var retorno = new Array();
	var document;


	if (processAttachment.values.length > 0) {

		for (var i = 0; i < processAttachment.values.length; i++) {
			retorno.push(processAttachment.values[i]["documentId"]);
			document = processAttachment.values[i]["documentId"];
			var c2 = DatasetFactory.createConstraint("documentPK.documentId", document, document, ConstraintType.MUST);
            var constraints2 = new Array(c2);
            var dsDocument = DatasetFactory.getDataset("document", null, constraints2, null);
            if(dsDocument.values.length > 0){
               if(dsDocument.values[0]["relatedFiles"] == $("#" + anexoName).val()){
					openDoc(document, dsDocument.values[0]["documentPK.version"]) ;
				   
			   }
			}
		}

	}

    

	return retorno;

	//processAttachment - processAttachmentPK.processInstanceId | documentId
	//		document - documentId

	//		getValue("WKNumProces")

	//		getProcess()
}

function fnBuscaColleagueByMail(mail){
    var c1 = DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    if(colaborador.values.length > 0){
	var result = colaborador.values[0];
	return result["colleagueName"] + " - " + result["colleaguePK.colleagueId"];
    } else return "";
    
}

function fnBuscaColleagueByMail2(mail){
    var c1 = DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    if(colaborador.values.length > 0){
	var result = colaborador.values[0];
	return result["colleaguePK.colleagueId"];
    } else return "";
    
}

function fnGetGestor(group){

	var cGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId", group, group, ConstraintType.MUST);
	var constraintsGroup = new Array(cGrupo);
	var colleagues = DatasetFactory.getDataset("colleagueGroup", null, constraintsGroup, null);

	var retorno = new Array();


	if (colleagues.values.length > 0) {

		for (var i = 0; i < colleagues.values.length; i++) {
			retorno.push(colleagues.values[i]["colleagueGroupPK.colleagueId"]);
		}

	}

	return retorno;
}

function fnBuscaColleagueByLogin(login){
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", login, login, ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    if(colaborador.values.length > 0){
	var result = colaborador.values[0];
	return result["colleagueName"] + " - " + result["colleaguePK.colleagueId"];
    } else return "";
    
}
function calculaTotalMedicao() {

	var totalMedicao = 0;

	$('#tbMedicao').find('input').each(
			function() {
				var campo = this.name;
				if (this.name.indexOf("valorMedicao___") == 0 && this.value.trim() != "") {
					totalMedicao = totalMedicao
							+ parseFloat(this.value.replace(/\./g, "").replace(
									/,/g, '.'));
				}
			});

	$("#vTotalMedicao").val(totalMedicao.toFixed(2));
	 
	$("#vTotalMedicao").mask('##.###.###.###.##0,00', {
		reverse : true
	});
	
	var medicao      = $("#vTotalMedicao").val();
	var investimento = $("#vlTotalInvestimento").val(); 
	
	if( parseFloat(medicao.replace(/\./g, "").replace(/,/g, '.')) >  parseFloat(investimento.replace(/\./g, "").replace(/,/g, '.'))){
		FLUIGC
		.toast({
			title : 'ERRO NO PROCESSO',
			message : 'TOTAL DA MEDIÇÃO NÃO PODE SER MAIOR QUE O TOTAL DO INVESTIMENTO!',
			type : 'danger'
		});
	}

}