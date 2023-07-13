const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

const copiarBdsController = require('./controller/copiarBdsController');
const getCtrecController = require('./controller/getCtrecController');
const getHistoricoClienteController = require('./controller/historicoClienteController');
const getClientes = require('./controller/todosClientesController');
const getEstoque = require('./controller/controleEstoqueController');
const getEstoqueConsolidado = require('./controller/estoqueConsolidadoController');
const getEstoqueMateriaPrima = require('./controller/MateriaPrima/estoqueMateriaPrimaController');
const getEstoquePorDataFortyflex = require('./controller/estoquePorDataFortyflexController');
const getMovimentoNfsFortyvinil = require('./controller/movimentoNFsFortyvinilController');
const getMovimentoNfsAlphaflex = require('./controller/movimentoNFsAlphaflexController');
const getMovimentoNfsMangmaster = require('./controller/movimentoNFsMangmasterController');
const getMPMapFortyflex = require('./controller/MateriaPrima/fortyflex/getMPMapFortyflexController');
const postMPMapFortyflex = require('./controller/MateriaPrima/fortyflex/postMPMapFortyflexController');
const getMateriaPrimaAlmoController = require('./controller/MateriaPrima/fortyflex/getMateriaPrimaAlmoController');
const getMangueiraAlmoController = require('./controller/MateriaPrima/fortyflex/getMangueiraAlmoController');

const getMPMapAlphaflex = require('./controller/MateriaPrima/alphaflex/getMPMapAlphaflexController');
const postMPMapAlphaflex = require('./controller/MateriaPrima/alphaflex/postMPMapAlphaflexController');
const getMateriaPrimaAlmoAlphaController = require('./controller/MateriaPrima/alphaflex/getMateriaPrimaAlmoController');
const getMangueiraAlmoAlphaController = require('./controller/MateriaPrima/alphaflex/getMangueiraAlmoController');

const getMPMapMangmaster = require('./controller/MateriaPrima/mangmaster/getMPMapMangmasterController');
const postMPMapMangmaster = require('./controller/MateriaPrima/mangmaster/postMPMapMangmasterController');
const getMateriaPrimaAlmoMangController = require('./controller/MateriaPrima/mangmaster/getMateriaPrimaAlmoController');
const getMangueiraAlmoMangController = require('./controller/MateriaPrima/mangmaster/getMangueiraAlmoController');

const getMPMapFortyvinil = require('./controller/MateriaPrima/fortyvinil/getMPMapFortyvinilController');
const postMPMapFortyvinil = require('./controller/MateriaPrima/fortyvinil/postMPMapFortyvinilController');
const getMateriaPrimaAlmoVinilController = require('./controller/MateriaPrima/fortyvinil/getMateriaPrimaAlmoController');
const getMangueiraAlmoVinilController = require('./controller/MateriaPrima/fortyvinil/getMangueiraAlmoController');

const getComissaoController = require('./controller/comissaoController');
const getComissaoRepresentanteController = require('./controller/comissaoRepresentanteController');

const auth = require('./controller/authenticationController');

app.use(cors());

app.use(bodyParser.json());

app.use("/comissao-representante", getComissaoRepresentanteController);

app.use("/comissao", getComissaoController);

app.use("/mang-almo-fortyvinil", getMangueiraAlmoVinilController);

app.use("/mp-almo-fortyvinil", getMateriaPrimaAlmoVinilController);

app.use("/post-map-mp-fortyvinil", postMPMapFortyvinil);

app.use("/map-mp-fortyvinil", getMPMapFortyvinil);

app.use("/mang-almo-mangmaster", getMangueiraAlmoMangController);

app.use("/mp-almo-mangmaster", getMateriaPrimaAlmoMangController);

app.use("/post-map-mp-mangmaster", postMPMapMangmaster);

app.use("/map-mp-mangmaster", getMPMapMangmaster);

app.use("/mang-almo-alphaflex", getMangueiraAlmoAlphaController);

app.use("/mp-almo-alphaflex", getMateriaPrimaAlmoAlphaController);

app.use("/post-map-mp-alphaflex", postMPMapAlphaflex);

app.use("/map-mp-alphaflex", getMPMapAlphaflex);

app.use("/mang-almo-fortyflex", getMangueiraAlmoController);

app.use("/mp-almo-fortyflex", getMateriaPrimaAlmoController);

app.use("/post-map-mp-fortyflex", postMPMapFortyflex);

app.use("/map-mp-fortyflex", getMPMapFortyflex);

app.use("/estoque-materia-prima", getEstoqueMateriaPrima);

app.use("/movimento-mangmaster", getMovimentoNfsMangmaster);

app.use("/movimento-alphaflex", getMovimentoNfsAlphaflex);

app.use("/movimento-fortyvinil", getMovimentoNfsFortyvinil);

app.use("/estoque-data-fortyflex", getEstoquePorDataFortyflex);

app.use("/estoque-total", getEstoqueConsolidado);

app.use("/estoque", getEstoque);

app.use("/copiar", copiarBdsController);

app.use("/getctrec", getCtrecController);

app.use("/historico", getHistoricoClienteController);

app.use("/clientes", getClientes);

app.use("/authentication", auth);

module.exports = app;