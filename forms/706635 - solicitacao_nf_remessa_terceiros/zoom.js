
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
				var idObj = $(this).attr("id");
				
				
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

	if (tipo == "estab_origem"){
		$("#estab_origem"      ).val("");
		$("#estab_origem"      ).val(selectedItem.campoPesquisa);
	}

	if (tipo == "fornecedor" ) {
		$("#fornecedor"      ).val("");
		$("#fornecedor").val(selectedItem.campoPesquisa);
	}

	if (tipo == "transportadora" ) {
		$("#transportadora"      ).val("");
		$("#transportadora").val(selectedItem.campoPesquisa);
	}

	if (tipo.substring(0,4) == "item" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#item" + idx).val(selectedItem.campoPesquisa);
	    $("#codItem" + idx).val(selectedItem.codItem);
		$("#controlaLote" + idx).val(selectedItem.controlaLote);
		$("#tipoContr" + idx).val(selectedItem.tipoContr);
		$("#unidade" + idx).val(selectedItem.un);

		console.log(selectedItem.campoPesquisa);
		console.log(tipo);
		console.log($("#item" + idx));
		console.log("tipo:", tipo);
		console.log("substring(0,4):", tipo.substring(0, 4));
		console.log("idx:", idx);
	    
	}
	

	/*if(tipo == "item"){
		$("#item").val("");
		$("#codItem").val("");
		$("#controlaLote").val("");
		$("#tipoContr").val("");
		$("#unidade").val("");
		$("#item").val(selectedItem.campoPesquisa);
		$("#codItem").val(selectedItem.codItem);
		$("#controlaLote").val(selectedItem.controlaLote);
		$("#tipoContr").val(selectedItem.tipoContr);
		$("#unidade").val(selectedItem.un);

		console.log(selectedItem.campoPesquisa);

		/*if (selectedItem.controlaLote === 3) {
            $("#dvLote").show(); // Exibe o campo lotes
        } else {
            $("#dvLote").hide(); // Esconde o campo lotes
        
	}*/

	/*if(tipo == "dep_saida"){
		$("#dep_saida").val("");
		$("#codDepos").val("");
		$("#dep_saida").val(selectedItem.nomeDepos);
		$("#codDepos").val(selectedItem.codDepos);
	}*/

	/*if(tipo == "lote"){
		$("#lote").val("");
		$("#cod_item_lt").val("");
		$("#codLote").val("");
		$("#lote").val(selectedItem.lote);
		$("#cod_item_lt").val(selectedItem.cod_item);
		$("#codLote").val(selectedItem.lote);
		$("#qtidade_atu").val(selectedItem.qtd);
	}*/

	if (tipo.substring(0,11) == "localizacao" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
		$("#localizacao" + idx).val(selectedItem.localizacao);
		$("#codDepos" + idx).val(selectedItem.deposCod);
		$("#lote" + idx).val(selectedItem.loteLoc);
		$("#qtidade_atu" + idx).val(selectedItem.quant);
	}

	if (tipo == "EstabComodFor"){
		$("#EstabComodFor"      ).val("");
		$("#num_estab_comod_for"      ).val("");
		$("#EstabComodFor"      ).val(selectedItem.campoPesquisa);
		$("#num_estab_comod_for"      ).val(selectedItem.codEstab);
	}

	if (tipo == "EstabComodCli"){
		$("#EstabComodCli"      ).val("");
		$("#num_estab_comod_cli"      ).val("");
		$("#EstabComodCli"      ).val(selectedItem.campoPesquisa);
		$("#num_estab_comod_cli"      ).val(selectedItem.codEstab);
	}	

	if (tipo.substring(0,9) == "itemComod" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#itemComod" + idx).val(selectedItem.campoPesquisa);
	    $("#codItemComod" + idx).val(selectedItem.codItem);
	}

	if (tipo.substring(0,12) == "itemComodCli" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#itemComodCli" + idx).val(selectedItem.campoPesquisa);
	    $("#codItemComodCli" + idx).val(selectedItem.codItem);
	}

	if (tipo.substring(0,9) == "itemArmaz" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#itemArmaz" + idx).val(selectedItem.campoPesquisa);
	    $("#codItemArmaz" + idx).val(selectedItem.codItem);
	}

	if (tipo.substring(0,12) == "itemConserto" ) {
	    var idx = tipo.substring(tipo.lastIndexOf("___"), tipo.length);
	    $("#itemConserto" + idx).val(selectedItem.campoPesquisa);
	    $("#codItemConserto" + idx).val(selectedItem.codItem);
	}

	if (tipo == "EstabArmaz"){
		$("#EstabArmaz"      ).val("");
		$("#num_estab_armaz"      ).val("");
		$("#EstabArmaz"      ).val(selectedItem.campoPesquisa);
		$("#num_estab_armaz"      ).val(selectedItem.codEstab);
	}	

	if (tipo == "EstabConserto"){
		$("#EstabConserto"      ).val("");
		$("#num_estab_conserto"      ).val("");
		$("#EstabConserto"      ).val(selectedItem.campoPesquisa);
		$("#num_estab_conserto"      ).val(selectedItem.codEstab);
	}	

	if (tipo == "clienteConserto" ) {
		$("#clienteConserto"      ).val("");
		$("#clienteConserto").val(selectedItem.campoPesquisa);
	}

	if (tipo == "clienteComodCli" ) {
		$("#clienteComodCli"      ).val("");
		$("#clienteComodCli").val(selectedItem.campoPesquisa);
	}
}

function zooms(ev, idObj){

	if ( ev == 'estab_origem' && fnBtnLiberado("btnestab_origem") ) {
		if((getWKNumState() == 0 || getWKNumState() == 2) ){
			var filtro = "campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_NF_terc", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "estab_origem", "Pesquisa Estabelecimento", filtro , 'estab_origem' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'fornecedor' && fnBtnLiberado("btncad_fornecedor") ) {
		if(getWKNumState() == 0 || getWKNumState() == 2){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_fornec-NF_terc", "codEmitente,Código,cgc,CGC,nomeEmit,Nome", "fornecedor", "Pesquisa Fornecedor", filtro , 'fornecedor' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'transportadora' && fnBtnLiberado("btncad_transportadora") ) {
		if(getWKNumState() == 0 || getWKNumState() == 2){
			modalzoom.open("ems_consulta_transp_NF_terc", "codTransp,Código,nome,Nome,nomeAbrev,Nome Abreviado", "transportadora", "Pesquisa Transportadoras", "" , 'transportadora' , "" , "", "" );
		}
    }

	if ( ev == 'item' && fnBtnLiberado("btnitem") ) {
		if(getWKNumState() == 0 || getWKNumState() == 2){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_item_NF_terc", "codItem,Código,un,UN,descItem,Descrição", "item", "Pesquisa Itens", filtro , 'item_' + idObj , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'dep_saida' && fnBtnLiberado("btndep_saida") ) {
		if(getWKNumState() == 0 || getWKNumState() == 2){
			modalzoom.open("ems_consulta_depositoSaida_NF_terc", "codDepos,Código,nomeDepos,Nome", "dep_saida", "Pesquisa Depósito", "" , 'dep_saida' , "" , "", "" );
		}
    }

	if(ev == 'lote' && fnBtnLiberado("btnlote")){
		if(getWKNumState() == 0 || getWKNumState() == 2){
			var codItem = $("#codItem").val();
			var codDepos = $("#codDepos").val();
			var filtro = "codItem," + codItem + ",codDepos," + codDepos;
			modalzoom.open("ems_consulta_lote_NF_terc", "cod_item,Código Item,qtd,Quantidade,cod_depos,Código Depósito,lote,Lote", "lote", "Pesquisa lote", filtro , 'lote' , "" , "" , "" );
		}
	}

	if ( ev == 'localizacao' && fnBtnLiberado("btnlocalizacao") ) {
		if(getWKNumState() == 0 || getWKNumState() == 2){
			var idx = idObj.substring(idObj.lastIndexOf("___"), idObj.length);
			var codItem = $("#codItem" + idx).val();
			var filtro = "codItem," + codItem;
			modalzoom.open("ems_consulta_localizacao_NF_terc", "itemCod,Código Item,deposCod,Código Depósito,loteLoc,Lote,localizacao,Localização,quant,Quantidade", "localizacao", "Pesquisa Localização", filtro , 'localizacao_' + idObj , "" , "", "" );
		}
    }

	if ( ev == 'EstabComodFor' && fnBtnLiberado("btnEstabComodFor") ) {
		if((getWKNumState() == 20) ){
			var filtro = "campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_NF_terc", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "EstabComodFor", "Pesquisa Estabelecimento", filtro , 'EstabComodFor' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'EstabComodCli' && fnBtnLiberado("btnEstabComodCli") ) {
		if((getWKNumState() == 20) ){
			var filtro = "campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_NF_terc", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "EstabComodCli", "Pesquisa Estabelecimento", filtro , 'EstabComodCli' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'itemComod' && fnBtnLiberado("btnitemComod") ) {
		if(getWKNumState() == 20){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_item_NF_terc", "codItem,Código,un,UN,descItem,Descrição", "itemComod", "Pesquisa Itens", filtro , 'itemComod_' + idObj , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'itemComodCli' && fnBtnLiberado("btnitemComodCli") ) {
		if(getWKNumState() == 20){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_item_NF_terc", "codItem,Código,un,UN,descItem,Descrição", "itemComodCli", "Pesquisa Itens", filtro , 'itemComodCli_' + idObj , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'EstabArmaz' && fnBtnLiberado("btnEstabArmaz") ) {
		if((getWKNumState() == 21) ){
			var filtro = "campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_NF_terc", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "EstabArmaz", "Pesquisa Estabelecimento", filtro , 'EstabArmaz' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'itemArmaz' && fnBtnLiberado("btnitemArmaz") ) {
		if(getWKNumState() == 21){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_item_NF_terc", "codItem,Código,un,UN,descItem,Descrição", "itemArmaz", "Pesquisa Itens", filtro , 'itemArmaz_' + idObj , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'EstabConserto' && fnBtnLiberado("btnEstabConserto") ) {
		if((getWKNumState() == 22) ){
			var filtro = "campoPesquisa,";	
			modalzoom.open("ems_consulta_estab_NF_terc", "codEstab,Código,nomeEstab,Nome,cidade,Cidade,estado,Estado", "EstabConserto", "Pesquisa Estabelecimento", filtro , 'EstabConserto' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'clienteConserto' && fnBtnLiberado("btncad_clienteConserto") ) {
		if(getWKNumState() == 22){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_fornec-NF_terc", "codEmitente,Código,cgc,CGC,nomeEmit,Nome", "clienteConserto", "Pesquisa Fornecedor", filtro , 'clienteConserto' , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'itemConserto' && fnBtnLiberado("btnitemConserto") ) {
		if(getWKNumState() == 22){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_item_NF_terc", "codItem,Código,un,UN,descItem,Descrição", "itemConserto", "Pesquisa Itens", filtro , 'itemConserto_' + idObj , "" , "", "campoPesquisa" );
		}
    }

	if ( ev == 'clienteComodCli' && fnBtnLiberado("btnclienteComodCli") ) {
		if(getWKNumState() == 20){
			var filtro = "campoPesquisa,";
			modalzoom.open("ems_consulta_cliente_NF_terc", "codEmitente,Código,cgc,CGC,nomeEmit,Nome", "clienteComodCli", "Pesquisa Cliente", filtro , 'clienteComodCli' , "" , "", "campoPesquisa" );
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
