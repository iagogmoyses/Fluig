function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("numeroSolicitacao");
    dataset.addColumn("codigoProcesso");
    dataset.addColumn("solicitante");
    dataset.addColumn("status");

    var c1 = DatasetFactory.createConstraint("status", "0", "0", ConstraintType.MUST);
    var arrayConstraints = [c1];

    try {
        var ds = DatasetFactory.getDataset("workflowProcess", null, arrayConstraints, null);

        for (var i = 0; i < ds.rowsCount; i++) {
            var numeroSolicitacao = ds.getValue(i, "workflowProcessPK.processInstanceId");
            var codigoProcesso     = ds.getValue(i, "processId");
            var solicitante        = ds.getValue(i, "requesterId");

            dataset.addRow([
                numeroSolicitacao,
                codigoProcesso,
                solicitante,
                "Aberta"
            ]);
        }
    } catch (e) {
        dataset.addRow(["Erro: " + e.message, "", "", "", "", ""]);
    }

    return dataset;
}
