/**
 *
 * @desc        Script padrão do formulário
 * @copyright   2023 Leticia Ingrid
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */


/**
 *
 * @desc Set modos 
 *
**/
ctrlFrm.mod = {
        
       /**
        * Ações executadas no modo de inclusãoa
        */
        ADD: function() {

			if(infoWorkflow.WKFormMode == "ADD"){
				// data atual apenas para informativo
				$('input[name="PROTOCOLO"]').val( '0' );
				$('input[name="cpDataAbertura"]').val( moment().format('DD/MM/YYYY') );
				$('[data-idoriginal="PROTOCOLO"]').html( '0' );
				$('[data-idoriginal="cpDataAbertura"]').html( moment().format('DD/MM/YYYY') );
			}

			//da init ao campo de calendário
            var dataMin = moment(infoWorkflow.TodayDate).format("DD/MM/YYYY");
            FLUIGC.calendar('#txtPrazoEntrega', {
                pickDate: true,
                pickTime: false,
                minDate: dataMin,
            });

			//chama configurações da tabela de materiais
			ctrlFrm.tbl.tbl_material.mod();

			//inicia a tabela de materiais já adiconando uma linha
			$("#btnAddRow").click();

			//adicoiona validação para o form não ser enviado sem ter pelo menos uma linha na tabela materiais
			$("[name='DESCRITOR']").rules("add", {min_row:true});

			// desabilita os campos não utilizados
			$('#secCabecalho, #secSolicitante').setDisabled();
            
            //Remove autocomplete
			$("input, select, textarea").attr("autocomplete","off");
			
        },

       /**
        * Ações executadas no modo de edição
        */
        MOD: function() {
						
			if( moment($('[name="cpDataAbertura"]').val(), "DD/MM/YYYY").format("DD/MM/YYYY") == "Invalid date" ){				
				$('[name="cpDataAbertura"]').val( moment($('[name="cpDataAbertura"]').val(), "YYYY-MM-DD").format("DD/MM/YYYY") );
			}
			
			// desabilita os campos não utilizados
			$('#secCabecalho, #secSolicitante, #secInfoEntrega, #secFilialOrigem, #secFilialDestino').setDisabled();

			//esconde o campo de zoom da filial e mostra somente o input com código e nome da filial
            $('.controlaview').hide();
			$('#txtCodigoFilialOrigem, #txtCodigoFilialDestino').show();

			//Remove autocomplete
			$("input, select, textarea").attr("autocomplete","off");

            //Controla ações nas atividades
			switch(true){
					
					case WKNumState == ATV.APROV_ALMOXARIFE:
						ctrlFrm.cmp.APROV_PADRAO.mod("APROV_ALMOXARIFE","APROV_ALMOXARIFE_OBS");
					break;

                    case WKNumState == ATV.INICIO:

					break;
            }			
		},

       /**
        * Ações executadas no modo de visualização
        */
        VIEW: function() {
						
			if( moment($('[name="cpDataAbertura"]').val(), "DD/MM/YYYY").format("DD/MM/YYYY") == "Invalid date" ){
				
				$('[name="cpDataAbertura"]').val( moment($('[name="cpDataAbertura"]').val(), "YYYY-MM-DD").format("DD/MM/YYYY") );
			}
			
			// desabilita os campos não utilizados
			$('#secCabecalho, #secSolicitante, #secInfoEntrega, #secFilialOrigem, #secFilialDestino').setDisabled();

            //Esconde os botões no modo VIEW
            $('button').hide();

            //Desabilita as seções de aprovação no modo VIEW
            $("#secAPROV_ALMOXARIFE").setDisabled();

			//esconde o campo de zoom da filial e mostra somente o input com código e nome da filial
			$('.controlaview').hide();
			$('#txtCodigoFilialOrigem, #txtCodigoFilialDestino').show();

        }, 
        
    }
/**
 *
 * @desc Controla tabela de materiais
 *
**/
ctrlFrm.tbl.tbl_material = {
            
	// variáveis do objeto
	$tbl: $('table[tablename="tbl_material"]'),
	$btnAdd: $('button#btnAddRow'),

	// inicializa o campo para edição
	mod: function () {
		// adiciona o botão no contexto do fluig
		this.addbtn();

	},
	
	// para visualização
	view: function () {
		
		var self = this;
		
	
	},
	
	// objeto de manipulação das linhas da tabela
	lin: {
		
		// eventos executados após inserção da linha
		adicionar_callback: function($elLinha) {
			//console.info('Callback após adiçao da linha:', $elLinha);
			
			//ctrlFrm.scroll( $elLinha ); // scroll até a linha
		   
			var self = ctrlFrm.tbl.tbl_material;    // retorna o objeto parente
			
			self.lin.inicializar($elLinha);
							
		},
		
		// eventos executados após remoção da linha
		remover_callback: function(pk) {
			//console.info('Callback após remoção da linha da tabela (pk):', pk);
			
		},	        
		
		// inicializa os eventos da linha
		inicializar: function($elLinha) {
			//console.info('Inicializa os eventos nos elementos da linha:', $elLinha);
			
		},
		
	},
	
	// adiciona o botão do contexto do Fluig
	addbtn: function() {
		
		this.$btnAdd.show();
	   
		this.$btnAdd.on('click',function(){

			//cria nova linha ao clicar no botão adicionar linha
			CustomBPM.cltrTabela.novaLinha('tbl_material', ctrlFrm.tbl.tbl_material.lin.adicionar_callback);

			//varre a tabela de material procurando as linhas, menos a primeira, verificando se foi preenchida, se não gera erro de obrigatoriedade
			var trs = $('[tablename="tbl_material"] tbody tr:not(:first)');

			trs.each(function() {
				var txtMaterial = $(this).find('[name^="txtMaterial"]');
				// Verifica se o campo está vazio
				if (txtMaterial.val() === '') {
					// Atribui a propriedade required
					txtMaterial.prop('required', true);
				}
			});


			MaskEvent.init();
			
			
		});
		
	},
	
	
}

/**
 *
 * @desc Atividades
 *
**/

var ATV = 	{
    INICIO: 4,   
    APROV_ALMOXARIFE: 37,    
}

$.validator.addMethod("min_row", function (value, element) {
   
	var len = $('[tablename="tbl_material"] tbody tr:visible').length;
	
    if(len > 0) return true;
    else return false;

}, "Favor preencha no minimo 1 linha.");