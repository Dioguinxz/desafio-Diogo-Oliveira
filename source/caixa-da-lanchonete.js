class CaixaDaLanchonete {

    cardapio = [

      { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    ];
  
    calcularValorDaCompra(metodoDePagamento, itens) {
      const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];
  
      if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      let valorTotal = 0;
  
      for (const itemStr of itens) {
        const [codigo, quantidade] = itemStr.split(',');
        const item = this.cardapio.find(item => item.codigo === codigo);
  
        if (!item) {
          return "Item inválido!";
        }
  
        if (codigo !== 'chantily' && codigo !== 'queijo' && quantidade > 1) {
          valorTotal += item.valor * quantidade;
        } else if (codigo === 'chantily' || codigo === 'queijo') {
          const itemPrincipal = this.cardapio.find(item => item.codigo === codigo.split(',')[0]);
  
          if (!itemPrincipal) {
            return "Item extra não pode ser pedido sem o principal";
          }
  
          valorTotal += item.valor * quantidade;
        } else {
          valorTotal += item.valor;
        }
      }
  
      if (metodoDePagamento === 'dinheiro') {
        valorTotal *= 0.95;
      } else if (metodoDePagamento === 'credito') {
        valorTotal *= 1.03;
      }
  
      return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }

  }
  
  export { CaixaDaLanchonete };

  // Exemplos de uso
  const caixa = new CaixaDaLanchonete();
  
  console.log();;
  console.log('Valor total: ' + caixa.calcularValorDaCompra('debito', ['chantily,1'])); 
  console.log('Valor total: ' + caixa.calcularValorDaCompra('debito', ['cafe,1','chantily,1'])); 
  console.log('Valor total: ' + caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2'])); 
  
  
