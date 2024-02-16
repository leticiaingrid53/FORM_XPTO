/**
 *
 * @desc        Script padrão do formulário
 * @copyright   2023 Leticia Ingrid
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */

/**
 * @desc   	Desabilita todos os campos colocando-os no formato de VIEW do Fluig
 * @version	2.3.0
 */
$.fn.setDisabled = function () {
    console.info('DESABILITA', $(this), 'Desabilita os elementos.');
    
    var $el = $(this);  // resgata o elemento atual
    
    //Span group
    $el.find('.spanGroup').removeClass("input-group-addon");
    $el.find('.divSpanGroup').removeClass("input-group");
    $el.find('.divSpanGroup').addClass("form-group");
    
    // retira a(s) opção(es) de remover linha da(s) tabela(s)
    $el.find('tbody tr:not(:first-child) td.acoes-linha a.remove-linha').hide();
    
    // desabilita todos os botões
    $el.find('div.form-group button[type="button"]').attr('disabled', true);
    
    // oculta os addons e botões agrupados aos campos
    $el.find('div.form-group div.input-group .input-group-addon').hide();
    $el.find('div.form-group div.input-group .input-group-btn').hide();
    
    // retira a classe .input-group para melhor formatação do valor do campo
    $el.find('div.form-group div.input-group').attr('class', '');

    // oculta todos os help-block da seção
    $el.find('div.form-group p.help-block').hide();
    
    // retira as mensagens indicadas para serem retiradas no modo view
    $el.find('[retirar-view]').hide();
    
    // define a altura dos elementos para melhor visual da tela (principalmente para <textarea>)
    $el.find('span.form-control').css('height','auto');
    
    // percorre todos os inputs do tipo radios que estão marcados
    $el.find('input[type="radio"]:checked').each(function() {
        
        // resgata o valor que será exbido
        var conteudo = $(this).data('exibicao');
        
        // resgata nome do campo
        var nm = $(this).attr('name');
    
        // resgata o elemento pai de todos os radios
        var $pai = $(this).parents('div.btn-group');
        $pai.hide();    // oculta ele
        
        // adiciona um novo elemento com o valor do campo e seus atributos
        $('<span>', {html: conteudo, 'data-idoriginal': nm}).addClass('form-control').insertAfter( $pai );
        
    });
	
    // percorre todos os elementos com .form-control
    $el.find('.form-group:not(.Customiza-disabled) .form-control:not([type="hidden"])').each(function () {
        var el = $(this);
        var valor, id = '';

        // verifica o nome do elemento
        switch (this.localName) {
            case 'input':
            case 'textarea':
                desabilitar(el, this.value, el.attr('name'));
                break;
            case 'select':
                desabilitar(el, el.find('option:selected').text(), el.attr('name'));
                break;
        };

    });
    
    // função que cria um novo elemento e esconde o campo original 
    function desabilitar(elemento, valor, id) {
        
        // resgata as classes aplicadas ao elemento
        var cls = elemento.attr('class');
        
        // adiciona um novo elemento (logo após o original) com o valor do campo e seus atributos
        $('<span>', {html: valor, 'data-idoriginal': id}).addClass(cls).insertAfter(elemento);

        // adiciona uma classe informativa no elemento
        // para não desabilitar duas vezes quando for chamada
        // a função duas vezes no mesmo elemento
        elemento.parents('.form-group').addClass('Customiza-disabled');
        
        // esconde o campo original do DOM
        elemento.hide();
    };
	
	var duplicados = $('[data-idoriginal]').filter(function(){
		var nome = $(this).data("idoriginal");
		return $('[data-idoriginal="'+nome+'"]').length > 1;
	});

	duplicados.each(function(i,e){
		var nome = $(e).data("idoriginal");
		$('[data-idoriginal="'+nome+'"]:not(:first)').hide();
	});
    
}


/**
* Função padrão do Fluig. É executada quando o usuário pressiona o botão Movimentar
* antes de serem exibidas as opções de movimentação do processo.
* ## Se o fluxo não necessitar da interação do usuário, este método não será executado!  
* return false: impedirá a execução do processo. Esta opção permite que sejam exibidos erros personalizados no formulário.
* throw(“Erro”): impedirá a execução e exibirá uma tela de erro padrão do fluig com o texto informado.
* @param numState - número da atividade atual
*/
var beforeMovementOptions = function(numState){
    console.info('VALIDAÇÃO', 'Atividade:', numState);
	
	// verifica a validação do formulário
	if ( !$validator.form() ){ 
		
		var retorno = 'Não será possível enviar os dados pois há campos com erro.</br>Por favor, verifique os campos destacados de vermelho.</br>'+listaErros();
		
		
		if( infoWorkflow.WKMobile == "true"){
			retorno = retorno.replaceAll("</br>","\n");
			retorno = retorno.replaceAll("&eacute;","é");
			retorno = retorno.replaceAll("<strong>;","");
			retorno = retorno.replaceAll("</strong>;","");
		}
		
        throw retorno;
    }
    
}

/**
 * Função padrão do Fluig. Ocorre antes da solicitação ser movimentada, após já ter sido
 * selecionada a atividade destino, o usuário e demais informações necessárias à solicitação.
 * @param numState - número da atividade atual
 * @param nextState - número da atividade destino
 */
 var beforeSendValidate = function (numState, nextState) {
    console.info('CONFIRMAÇÃO', 'De:', numState, 'Para:', nextState);
    
	// verifica a validação do formulário
	if ( !$validator.form() ) {
		
		var retorno = 'Não será possível enviar os dados pois há campos com erro.</br>Por favor, verifique os campos destacados de vermelho.</br>'+listaErros();
		
		
		if( infoWorkflow.WKMobile == "true"){
			retorno = retorno.replaceAll("</br>","\n");
			retorno = retorno.replaceAll("&eacute;","é");
			retorno = retorno.replaceAll("<strong>;","");
			retorno = retorno.replaceAll("</strong>;","");
		}
		
		FLUIGC.message.alert({
			message: retorno,
			title: 'Formulário não validado',
			label: 'OK'
		});
	
		return false;
	}
    
    //====> não faz validação
    return true;
    
    var opt = {
        message: 'Você realmente deseja enviar o processo para o próximo estágio?',
        title: 'Confirmação de Envio de Tarefa',
        labelYes: 'Enviar',
        labelNo: 'Voltar'
    };
    
    // verifica as condições temporais do processo (apenas uma é atendida)
    switch (true) {
        case (numState == 1):   // se movimentou a atividade de Início (preenchimento do formulário)
            
            //opt.message = 'O pedido será enviado para aprovção. Você tem certeza que deseja prosseguir?';
			
            break;
        case (numState == 2):   // se movimentou a atividade de XXXX (xxx)
			
            break;
        default:
            console.error('Sem mensagem de confirmação para movimento da tarefa.');
    };
    
    var isOk = confirm( opt.message );
    
    return isOk;
    
}


// variáreis declaradas no evento displayFields.js do Formulário verifica se elas existem, se não, define valores padrão
if (typeof modForm         == 'undefined') modForm         = 'ADD';    // modo do formulário
if (typeof infoWorkflow    == 'undefined') infoWorkflow    = {};       // objeto com informações do workflow

/**
 * Função ocorre em todos os processos, executando ações basicas
 */
$(document).ready(function() {

    // adicona a classe de edição ao form
    $('form').addClass(modForm);
    console.info('==> Iniciou formulário no modo:', modForm);
    
    // variável global com o ID da atividade atual do processo
    WKNumState = ((typeof infoWorkflow.WKNumState != 'undefined')?Number(infoWorkflow.WKNumState):0); // número da atividade atual

    CustomBPM.atvElementos(WKNumState); 
        
    // monta as regras de validação do formulário
    $validator = $('form').validate();
   	
    // dispara quando altera qualquer campo do formulário
    $('form [name]').on('change', function () {
        
        // efetua a validação total do formulário
        try{
            var name = $(this).attr("name");
            if(name){
                $('[name="'+name+'"]').valid();
            }
        }
        catch(e){
            e = e;
        }
        
    });
    
    // executa as ações conforme o estado de edição do formulário
    switch (modForm) {
        case 'ADD':     // indicando modo de inclusão
            //ctrlFrm.mod.ADD();
            window.setTimeout(function() { ctrlFrm.mod.ADD(); }, 800);
            break;
        case 'MOD':     // indicando modo de edição
            //ctrlFrm.mod.MOD();
            window.setTimeout(function() { ctrlFrm.mod.MOD(); }, 800);
            break;
        case 'VIEW':    // indicando mode de visualização
            //ctrlFrm.mod.VIEW();
            window.setTimeout(function() { ctrlFrm.mod.VIEW(); }, 800);
            break;
        case 'NONE':    // indicando que não há comunicação com o formulário
            break;
        default:
            console.error('Modo do formulário não foi reconhecido.', modForm);
    };
        
	// atualiza a cor dos elementos com a mesma cor do menu do Fluig
	if (typeof parent.WCMAPI != 'undefined') $('Customiza-colormenu').css('color', parent.WCMAPI.colorMenu);    
    
});

/**
 * Objeto de automação do processo e controle das informações de todo o formulário
 */	
var ctrlFrm = {
    
   /**
    * Executa as ações conforme o estado de inicialização do formulário
    */
    mod: {
        
       /**
        * Ações executadas no modo de inclusão
        */
        ADD: function() {},

       /**
        * Ações executadas no modo de edição
        */
        MOD: function() {},

       /**
        * Ações executadas no modo de visualização
        */
        VIEW: function() {}, 
        
    },
    
    /**
     * Controle individual de cada campo do formulário
     */
    cmp: {	
		APROV_PADRAO : {
            
            // variáveis do objeto
            $cmp: "",
            $cmpObs: "",

            // inicializa o campo para edição
            mod: function (NAME,NAME_OBS) {
                
                var self = this;
                
                self.$cmp = $('[name="'+NAME+'"]');
                self.$cmpObs = $('[name="'+NAME_OBS+'"]');
                
                $cmp: $('[name="'+NAME+'_EXECUTOR"]').val(infoWorkflow.WKUser);
                
                
                parent.$("[data-send]").on("click",function(){
                    $('[name="'+NAME+'_DATA"]').val(moment(infoWorkflow.TodayDate).format("DD/MM/YYYY"));
                });
                        		
                self.validCmp();
               
               self.$cmp.on('change',function(){
                  
                  if(this.value == 'Sim'){
                     self.$cmpObs.rules('remove');
                     self.$cmpObs.blur();
                  }
                  else{
                     self.validObs();
                  }
                  
               });
               
            },
            
            // adiciona validação ao campo
            validCmp: function() {
                
                this.$cmp.rules('add', {
                    required: true,
                });
                
            },
            
            validObs: function() {
                
                this.$cmpObs.rules('add', {
                    required: true,
                    minlength: 5,
                });
                
            },
            
        },
    },
    
   /**
    * Controle individual de cada tabela pai-filho do formulário
    */
    tbl: {},
    
}

/**
 * Objeto de integração e controle das atividades do diagrama do processo
 */	
var CustomBPM = {
    // objeto de manipulação de tabelas pai-filho
    cltrTabela: {
        
        // variáveis do objeto
        $tbl: function(tbl) { return $('table[tablename="' + tbl + '"]'); },

        // adiciona nova linha na tabela
        novaLinha: function(tbl, callback) {
            //console.info('LINHA', 'Adiciona nova linha à tabela.');
            
            var $lin = this.adicLinhaPadrao(tbl); // adiciona linha padrão
            
            this.atuaIndex(tbl);
                        
            callback($lin); // chama o callback para as próximas ações da linha

        },
        
        // remove a linha da tabela
        removeLinha: function(el, callback) {
            var self = this;

            $(el).find('input[name^=ITMSEQPQ___]').val();

			acoesRemoveLinha();


            var self = this; // resgata o objeto para usa-lo dentro da função

            // ações antes e depois de remover a linha
            function acoesRemoveLinha() {

                // resgata de qual tabela a linha pertence
                var tbl = $(el).parents('table').attr('tablename');

				// função padrão que remove a linha da tabela
				fnWdkRemoveChild(el);


            }
            

        },
        
        // adiciona uma nova linha na tabela e executa todas ações básicas necessárias
        // adiciona linha da mesma forma para todas as tabelas
        // retorna o elemento jQuery da linha inserida
        adicLinhaPadrao: function(tbl) {
            //console.info('LINHA PADRÃO', tbl, 'Adiciona nova linha padrão à tabela.');

            // função padrão que adiciona a linha da tabela
            // essa função retorna o ID que é adiconado em cada campo filho
            var linhaIdx = wdkAddChild(tbl);

            // resgata a última linha da tabela, que é a linha recém criada
            var $lin = this.$tbl(tbl).find('tbody tr:last-child');

            // adiciona atributo na linha (tr) com o index
            $lin.attr('idLinha',  linhaIdx);

            // atualiza os campos de index
            this.atuaIndex(tbl);

            // retorna o elemento da linha recém criada
            return $lin;

        },

        // atualiza o número dos itens nas tabelas pai-filho
        atuaIndex: function(tbl) {
            // percorre os inputs de index atualizando o número do item na tabela
            // o index 0 sempre será a linha oculta (linha template)
            $.each(this.$tbl(tbl).find('tbody tr td.itm-id input[id^="ITMSEQ"], tbody tr td.itm-id input[id^="ITMPQ"]'), function(id, el) {
                this.value = id;    // adiciona o valor o index ao campo
            });

        },

    },
    
    // exibe/oculta elementos conforme atividade
    atvElementos: function(cod) {

		// retorna apenas os elementos marcados para serem ocultados na atividade atual
		var sectionShow = $('[data-contem-info]').filter(function () {
								return $("[name='"+ $(this).data('contem-info') + "']" ).val() != "";
							}).show();

		sectionShow.filter(function () {
								return  $(this).data('exibe-active').indexOf( cod ) < 0;
							}).setDisabled();

		if($("form.VIEW").length == 0){
			// retorna apenas os elementos marcados para serem ocultados na atividade atual
			$('[data-exibe-active]').filter(function () {
				var filt = ($(this).data('exibe-active')).toString().split(',').filter(function(r){return r == cod})
				return filt.length != 0 
			}).show();
		}
		
		//Retira a observação que está vazia
		$("[data-contem-info][data-exibe-active] textarea[name$='_OBS'],[data-contem-info][data-exibe-active] span[name$='_OBS']").each(function(i,$tr){
            
            var $tr = $($tr);
            
            var temConteudo = false;
            if($tr.prop("tagName") == "SPAN"){
                if( !($tr.html() == "" || $tr.html() == "&nbsp;") ){
                    temConteudo = true;
                }
            }
            else{
                if( !($tr.val() == "") ){
                    temConteudo = true;
                }
            }
            
			if((!temConteudo) && ( $tr.parent().attr("class").indexOf("Customiza-disabled") >=0 || $('form.VIEW').length >= 1 ) ){
				$tr.parent().parent().hide();
			}

		});
		
        
    },
};
