// let listaDeProdutos = []

const submitBtn = document.getElementById('submitBtn')


submitBtn.addEventListener('click', cadastrarProduto)


async function cadastrarNoBanco(produto) {

    const url = 'http://localhost:3000/produtos'

    const cadastro = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(produto)
    })

    if(cadastro.ok === true && cadastro.status === 201) {
        alert('Produto cadastrado com sucesso.')
        return
    }
    alert('Erro ao cadastrar produto: ' + cadastro.status + " " + cadastro.statusText)
}

document.addEventListener('DOMContentLoaded', () => listarProdutos())


async function listarProdutos() {
    const url = 'http://localhost:3000/produtos'
    const produtos = await fetch(url).then(res => res.json())

    produtos.map((elem, ind) => {
        
        const container = document.getElementsByClassName('products-list-container')[0]

        const idPar = document.createElement('p')
        const nomePar = document.createElement('p')
        const descPar = document.createElement('p')
        const precoPar = document.createElement('p')
        const trashIcon = document.createElement('i')
        const productList = document.createElement('div')
        productList.innerHTML = ''
        
        const iconDiv = document.createElement('div')
        trashIcon.classList.add('fa-regular', 'fa-trash-can')
        iconDiv.classList.add('icon-container')
        
        productList.setAttribute('id', 'product-list')
        
        
        idPar.textContent = 'ID: ' + produtos[ind].id
        nomePar.textContent = 'Nome: ' + produtos[ind].nome
        descPar.textContent = 'Descrição: ' + produtos[ind].descricao
        precoPar.textContent = 'Preço: R$' + produtos[ind].preco


        container.appendChild(productList)
        productList.appendChild(idPar)
        productList.appendChild(nomePar)
        productList.appendChild(descPar)
        productList.appendChild(precoPar)
        iconDiv.appendChild(trashIcon)
        productList.appendChild(iconDiv)

        container.scrollTop = container.scrollHeight

        iconDiv.addEventListener('click', async () => {
            await excluirProduto(produtos[ind].id)
            container.removeChild(productList)
        })

    })

}



async function cadastrarProduto() {
    const nomeForm = document.getElementById('nome-form').value
    const descricaoForm = document.getElementById('descricao-form').value
    const precoForm = document.getElementById('preco-form').value

    const produto = {
        nome: nomeForm,
        descricao: descricaoForm,
        preco: precoForm
    }

    await cadastrarNoBanco(produto)
    await listarProdutos()
}

async function excluirProduto(id) {
    const url = `http://localhost:3000/produtos/${id}`
    console.log(id)
    const deleted = await fetch(url, {
        method: 'DELETE'
    })

}

