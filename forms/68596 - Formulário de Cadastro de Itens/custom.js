var atividade = "";
var processo = "";
var isView = false;

$(document).ready(function(){
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

	//calendario
	$(".formato_data").each(function(){
		if ($(this).prop('readonly') == false){			
			var calendario = FLUIGC.calendar(this);
		}
	});
	
	
	$('.money').maskNumber({
        decimal: ',',
        thousands: '.'
    });

})

window.parent.$("[data-send]").on("click", function(){	
	
});


window.parent.$("[data-save]").on("click", function(){

});

	function fnEnableButtonField(nomeObj, stat){
	if(stat) 
	$('#'+nomeObj).removeClass('input-group-addon group-zoom no-view zoom-click btn-primary').addClass('input-group-addon group-zoom no-view zoom-click btn-info');
	else
	$('#'+nomeObj).removeClass('input-group-addon group-zoom no-view zoom-click btn-info').addClass('input-group-addon group-zoom no-view zoom-click btn-primary');
	}


	function fnEnableRSButtonField(nomeObj, stat){
	if(stat) 
	$('#'+nomeObj).removeClass('input-group-addon btn-primary').addClass('input-group-addon btn-info');
	else
	$('#'+nomeObj).removeClass('input-group-addon btn-info').addClass('input-group-addon btn-primary');
	}

	
	function addTableRow(tabela) {
     
         row = wdkAddChild(tabela);

         $('.ncm').mask('####.##.##', {reverse: true});
     
         if (tabela == "tbItemServ") {
             $("#tbItemServ" + row).val(row);
         }
         if (tabela == "tbItemMat") {
             $("#tbItemMat" + row).val(row);
         }
         if (tabela == "tbItemFab") {
             $("#tbItemFab" + row).val(row);
         }
         if (tabela == "tbItemEmb") {
             $("#tbItemEmb" + row).val(row);
         }
         
     }
	
	
     
     function delTableRow(tabela) {
         var tr = $(tabela).closest('tr');
     
         //tr.fadeOut(400, function(){ 
         tr.remove();
         //}); 	  
     
         return false;
     }

     function showForm(){
	
	
		$("#divCadastroAlteracao").show();
		$("#divConsulta").hide();
		
	}
	function showOptions(){
		
			$("#divOptions").show();
		
	}

	function showCadastro(target){
		if (target.value == "comprado"){
			$("#divComprados").show();
			$("#divFabricados").hide();
			$("#divEmbalagens").hide();
			
		}
		if (target.value == "embalagem"){
			$("#divComprados").hide();
			$("#divEmbalagens").show();
			$("#divPanelItemMat").hide();
			$("#divPanelItemServ").hide();
			$("#divFabricados").hide();
		}
		if (target.value == "fabricado"){
			$("#divComprados").hide();
			$("#divEmbalagens").hide();
			$("#divPanelItemMat").hide();
			$("#divPanelItemServ").hide();
			$("#divFabricados").show();
		}
		if (target.value == "mccain"){
			$("#divComprados").hide();
			$("#divEmbalagens").hide();
			$("#divPanelItemMat").hide();
			$("#divPanelItemServ").hide();
			$("#divFabricados").show();
		}
	
	}
	function showServ(target){
		if (target.value == "material"){
			$("#divPanelItemMat").show();
			$("#divPanelItemServ").hide();
		}
		else{
			$("#divPanelItemMat").hide();
			$("#divPanelItemServ").show();
		}
	}

	function hideEstoque(target){
		if (target.value == "nao"){
			$('.colestoque').hide();
			$("#divTbItemMat").show();
			
			
		}
		else{
			$('.colestoque').show();
			$("#divTbItemMat").show();

		

	}
}
	function setSelectedZoomItem(selectedItem) {
           
            if (selectedItem.inputId.indexOf("ItemFabTb___") > -1) {
                var seq = selectedItem.inputId.split("___");
                $("#DescFabTb___" + seq[1]).val(selectedItem["descItem"]);
                $("#UnidadeFabTb___" + seq[1]).val(selectedItem["un"]);
                $("#GrupoFabTb___" + seq[1]).val(selectedItem["grupoEstoque"]);
                $("#FamiliaFabTb___" + seq[1]).val(selectedItem["familia"]);
                $("#NarrativaFabTb___" + seq[1]).val(selectedItem["narrativa"]);
                $("#DunFabTb___" + seq[1]).val(selectedItem["codDun"]);
                $("#EanFabTb___" + seq[1]).val(selectedItem["codEan"]);

            }

            if (selectedItem.inputId.indexOf("ItemEmbTb___") > -1) {
                var seq = selectedItem.inputId.split("___");
                $("#DescEmbTb___" + seq[1]).val(selectedItem["descItem"]);
                $("#UnidadeEmbTb___" + seq[1]).val(selectedItem["un"]);
                $("#GrupoEmbTb___" + seq[1]).val(selectedItem["grupoEstoque"]);
                $("#FamiliaEmbTb___" + seq[1]).val(selectedItem["familia"]);
                $("#NarrativaEmbTb___" + seq[1]).val(selectedItem["narrativa"]);
                
            }
        }
	function initForm(modeView, WKNumState, user, WKNumProces, documentId, mobile) {

		if (WKNumState == 0 || WKNumState == 1)
			{
				
				$("#divConsulta").show();
				$('.colitem').attr('readonly', true);
				$('.btn').show();
			} 
			
			else if (WKNumState == 91){
				$('.colitem').attr('readonly', true);
				$('.btn').show();
				$("#divConsulta").hide();
			}
			
			else if (WKNumState == 6 || WKNumState == 8 || WKNumState ==50){
				$('.colitem').attr('readonly', false);
				$('.colitem').removeAttr('readonly');
				$("#divConsulta").hide();
				$('.btn').hide();
			}
			else
			{
				$('.colitem').attr('readonly', true);
				$("#divConsulta").hide();
				$('.btn').hide();

			}

		}

		function showTipo(target){
			if (target.value == "cadastro"){
				$("#divCadastro").show();
				$("#divAlteracao").hide();
			}
			else if(target.value == "alteracao"){
				$("#divCadastro").hide();
				$("#divAlteracao").show();
			}
		}

		function showAlteracao(target) {
			const value = target.value;
		
			if (value === "familia") {
				$("#divAlteraFamilia").toggle(target.checked);
			}
			else if (value === "un") {
				$("#divAlteraUnidade").toggle(target.checked);
			}
			else if (value === "status") {
				$("#divAlteraStatus").toggle(target.checked);
			}
			else if (value === "descricao") {
				$("#divAlteraDescricao").toggle(target.checked);
			}
		}
		
		