module.exports = function(app){	
	app.get('/formulario_inclusao_noticia', function(requisicao, resposta){
		resposta.render("admin/form_add_noticia");
	});

	app.post('/noticias/salvar', function(requisicao, resposta){
		var noticia = requisicao.body;

		requisicao.assert('titulo', 'Título é obrigatório').notEmpty();
		requisicao.assert('resumo', 'Resumo é obrigatório').notEmpty();
		requisicao.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
		requisicao.assert('autor', 'Autor é obrigatório').notEmpty();
		requisicao.assert('data_noticia', 'Data é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
		requisicao.assert('noticia', 'Notícia é obrigatória').notEmpty();

		var erros = requisicao.validationErrors();

		if(erros)
		{
			resposta.render("admin/form_add_noticia", {validacao : erros, noticia: {} });
			return;
		}

		var connection = app.config.dbConnection();
		var noticiasModel = new app.app.models.NoticiasDAO(connection);

		noticiasModel.salvarNoticia(noticia, function(error, result){
			resposta.redirect('../noticias');
		});
	});
};