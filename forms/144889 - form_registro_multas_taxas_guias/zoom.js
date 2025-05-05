
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
				
				
			    zooms(ev);
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

	if (tipo == "estabelecimento"){
		$("#estabelecimento"      ).val("");
		$("#estabelecimento"      ).val(selectedItem.campoPesquisa);
	}


	if (tipo == "fornecedor" ) {
		$("#fornecedor"      ).val("");
		$("#fornecedor").val(selectedItem.campoPesquisa);
	}

	if (tipo == "centro_custo" ) {
		$("#centro_custo"      ).val("");
		$("#centro_custo").val(selectedItem.campoPesquisa);
	}

	if(tipo == "tpFluxo"){
		$("#tpFluxo").val("");
		$("#tpFluxo").val(selectedItem.campoPesquisa);
	}

	if(tipo == "cta_ctbl"){
		$("#cta_ctbl").val("");
		$("#cta_ctbl").val(selectedItem.campoPesquisa);
	}
	
	
}

function zooms(ev){

	if ( ev == 'estabelecimento' && fnBtnLiberado("btnestabelecimento") ) {
		if((getWKNumState() == 0 || getWKNumState() == 4 || getWKNumState() == 6) ){
			var rbLocaliz = $('input[name="rbLocaliz"]:checked').val();
			if(rbLocaliz != "" && rbLocaliz != undefined){
			var filtro = "rbLocaliz," + rbLocaliz + ",campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_USA", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "estabelecimento", "Pesquisa Estabelecimento", filtro , 'estabelecimento' , "" , "", "campoPesquisa" );
		}else{
			FLUIGC.toast({
				title: '',
				message: "Erro ao buscar estabelecimentos. Localização não atribuída.",
				type: 'warning',
				timeout: 3000
			});
        }
		}
    }

	if ( ev == 'fornecedor' && fnBtnLiberado("btncad_fornecedor") ) {
		if(getWKNumState() == 0 || getWKNumState() == 4 || getWKNumState() == 6){
		var rbLocaliz = $('input[name="rbLocaliz"]:checked').val();
        console.log("Localiz" + rbLocaliz);
		if(rbLocaliz != "" && rbLocaliz != undefined){
        var filtro = "rbLocaliz," + rbLocaliz + ",campoPesquisa,";
		console.log("Filtro:" + filtro);
		modalzoom.open("ems_consulta_fornecedor_usa", "cod,Código,nome,Nome,nomeAbrev,Nome Abreviado", "fornecedor", "Pesquisa Fornecedor", filtro , 'fornecedor' , "" , "", "campoPesquisa" );
        }else{
			FLUIGC.toast({
				title: '',
				message: "Erro ao buscar fornecedores. Localização não atribuída.",
				type: 'warning',
				timeout: 3000
			});
        }
		}
    }

	if ( ev == 'centro_custo' && fnBtnLiberado("btncad_centro_custo") ) {
		if(getWKNumState() == 0 || getWKNumState() == 4 || getWKNumState() == 6){
			var rbLocaliz = $('input[name="rbLocaliz"]:checked').val();
			console.log("Localiz" + rbLocaliz);
			if(rbLocaliz != "" && rbLocaliz != undefined){
			var filtro = "rbLocaliz," + rbLocaliz + ",campoPesquisa,";
			console.log("Filtro:" + filtro);
			modalzoom.open("ems_consulta_centro_custos", "codCcusto,Código,descricao,Descrição", "centro_custo", "Pesquisa Centro de Custo", filtro , 'centro_custo' , "" , "", "campoPesquisa" );
		}else{
			FLUIGC.toast({
				title: '',
				message: "Erro ao buscar centros de custo. Localização não atribuída.",
				type: 'warning',
				timeout: 3000
			});
        }
		}
    }

	if ( ev == 'tpFluxo' && fnBtnLiberado("btntpFluxo") ) {
		if(getWKNumState() == 0 || getWKNumState() == 4 || getWKNumState() == 6){
			var rbLocaliz = $('input[name="rbLocaliz"]:checked').val();
			console.log("Localiz" + rbLocaliz);
			if(rbLocaliz != "" && rbLocaliz != undefined){
			var filtro = "rbLocaliz," + rbLocaliz + ",campoPesquisa,";
			console.log("Filtro:" + filtro);
			modalzoom.open("ems_consulta_fluxo_guias_usa", "codFluxo,Código,descricao,Descrição", "tpFluxo", "Pesquisa Fluxos Financeiros", filtro , 'tpFluxo' , "" , "", "campoPesquisa" );
		}else{
			FLUIGC.toast({
				title: '',
				message: "Erro ao buscar fluxos financeiros. Localização não atribuída.",
				type: 'warning',
				timeout: 3000
			});
        }
		}
    }

	if(ev == 'cta_ctbl' && fnBtnLiberado("btncta_ctbl")){
		if(getWKNumState() == 0 || getWKNumState() == 4 || getWKNumState() == 6){
			var rbLocaliz = $('input[name="rbLocaliz"]:checked').val();
			console.log("Localiz" + rbLocaliz);
			if(rbLocaliz != "" && rbLocaliz != undefined){
			var filtro = "rbLocaliz," + rbLocaliz + ",campoPesquisa,";
			console.log("Filtro:" + filtro);
			modalzoom.open("ems_consulta_conta_contabil_usa", "plano,Plano,codigo,Código,titulo,Título", "cta_ctbl", "Pesquisa Conta Contábil", filtro, 'cta_ctbl', "", "", "campoPesquisa");
		}else{
			FLUIGC.toast({
				title: '',
				message: "Erro ao buscar contas contábeis. Localização não atribuída.",
				type: 'warning',
				timeout: 3000
			});
        }
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
						
						var searchValue = $("#search").val();
						
						if (filters != null && filters.length > 0 ){
						    var filtro = filters;
						    if(searchby != ""){
							filtro = searchby + ',' + searchValue;
						    }
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


function fnBuscaColleagueByMail(mail){
    var c1 = DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
    
    if(colaborador.values.length > 0){
	var result = colaborador.values[0];
	return result["colleaguePK.colleagueId"];
    } else return "";
    
}