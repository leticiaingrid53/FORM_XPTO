function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();
    
    //Colunas
    ds.addColumn("CODIGO");
    ds.addColumn("DESCRICAO");
      
    //Linhas
    ds.addRow(new Array("50.15.012", "NOTEBOOK LOCADO"));
    ds.addRow(new Array("01.01.955", "MEDIDOR DE ANGULO DIGITAL DWM 40 L BOSCH - 0 A 220 GRAUS"));
    ds.addRow(new Array("08.99.266", "PILHA REGARREGAVEL AA 2400MHA"));
 
     
    return ds;
}
function onMobileSync(user) {

}