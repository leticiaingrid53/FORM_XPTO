/**
 *
 * @desc        Script padrão do Fluig para exibição do formulário (displayFields.js)
 *              Esse evento é disparado no momento em que os objetos do formulário são apresentados.
 * @version     1.0.0
 * @author      Leticia Ingrid <leticiaingrid53@gmail.com>
 *
 */

function displayFields(form, customHTML) {
    
     // cria objeto com os parâmetros do workflow e envia para o html
    var scp = "var infoWorkflow = {";
        scp += "TodayDate:"+new java.util.Date().getTime()+",";   // Data e hora atual do servidor.
        scp += "WKDef:'"+getValue('WKDef')+"',";                    // Código do processo.
        scp += "WKVersDef:'"+getValue('WKVersDef')+"',";            // Versão do processo.        
        scp += "WKFormMode:'"+form.getFormMode()+"',";              // Mod do formulário(ADD/MOD/VIEW).            
        scp += "WKNumProces:'"+getValue('WKNumProces')+"',";        // Número da solicitação de processo.            
        scp += "WKNumState:'"+getValue('WKNumState')+"',";          // Número da atividade movimentada.        
        scp += "WKCurrentState:'"+getValue('WKCurrentState')+"',";  // Número da atividade atual.                
        scp += "WKCompany:'"+getValue('WKCompany')+"',";            // Número da empresa.        
        scp += "WKUser:'"+getValue('WKUser')+"',";                  // Código do usuário corrente.
        scp += "WKCompletTask:'"+getValue('WKCompletTask')+"',";    // Se a tarefa foi completada (true/false).                
        scp += "WKNextState:'"+getValue('WKNextState')+"',";        // Número da próxima atividade (destino).            
        scp += "WKCardId:'"+getValue('WKCardId')+"',";              // Código do formulário do processo.    
        scp += "WKFormId:'"+getValue('WKFormId')+"',";              // Código da definição de formulário do processo.    
        scp += "WKMobile:'"+form.getMobile()+"',";                  // Acesso pelo mobile (true/false).
    scp += "};"
    customHTML.append("<script type='text/javascript'>"+scp+"</script>");
    
    
    if(form.getFormMode() == 'ADD'){
        // resgata informações do usuário logado
        var filter = new java.util.HashMap();
        filter.put('colleaguePK.colleagueId', getValue('WKUser'));
        var solicitante = getDatasetValues('colleague', filter);    // variável com dados do usuário logado

        // por padrão, os dados do usuário logado como solicitante
        form.setValue('cpSolicitante', solicitante.get(0).get("colleagueName"));
        form.setValue('cpMatriculaSolicitante', getValue("WKUser"));
        form.setValue('cpLoginFluig', solicitante.get(0).get("login"));
        form.setValue('cpEmailSol', solicitante.get(0).get("mail"));
    }
    // envia a variável (string) para o HTML com o modo de edição do formulário
	customHTML.append("<script type='text/javascript'>var modForm = '"+form.getFormMode()+"';</script>");
    
    // leva as informações do status para o front-end
    var statusAtivAtual = lstAtiv[4];
    if (form.getFormMode() != 'ADD') statusAtivAtual = lstAtiv[getValue('WKNumState')];
    form.setValue('STATUSCOD', getValue('WKNumState'));
    form.setValue('STATUS', statusAtivAtual.tit);
    customHTML.append("<script type='text/javascript'>var SkFlyStatus = "+JSON.stringify(statusAtivAtual)+";</script>");
	
	
    
}