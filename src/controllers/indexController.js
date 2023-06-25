import chatGPTAsync from '../utils/apiGPT.js'

class IndexController {
  async indexGET (req, res){
    res.render('./index/index.ejs')
  }

  async indexLogout(req, res) {
    console.log(req.session.contexto)
    req.session.contexto = false;
  }

  async indexPOST (req, res){
    console.log(req.session)
    const { mensagem } = req.body;

    if (!req.session.contexto) {
      req.session.contexto = [
        { role: 'system', content: 'Voce atuara como professor de uma universidade de historia, porem somente explicara sobre a segunda guerra mundial, qualquer pergunta nao relacionada a isso nao deve ser respondida, tente sempre responder com curiossidades sobre o fato perguntado.' },
        { role: 'user', content: mensagem }
      ]
    } 

    (req.session.contexto).push({ role: 'user', content: mensagem })
    const respostaAPI = await chatGPTAsync(mensagem, req.session.contexto);
    (req.session.contexto).push({ role: 'system', content: respostaAPI })

    if(respostaAPI === null) return res.status(400).json({status: 'Erro', 'erro': 'API retornando resposta invalida'});
    res.status(200).json({retornoAPi: respostaAPI})

  }
}

export default new IndexController();

