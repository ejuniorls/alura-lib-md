import chalk from "chalk";

function extrairLinks(arrLinks) {
    // loop
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return manejaErros(error)
            }
        })
    );
    return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
    const links = extrairLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}

function manejaErros(error) {
    // console.log(chalk.red('algo deu errado'), error);
    if (error.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }

// [Teste de retorno 400](https://httpstat.us/404).
// [gatinho salsicha](http://gatinhosalsicha.com.br/)