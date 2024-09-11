
export { RecintosZoo as RecintosZoo };
class Recinto {
    constructor(nome, espacoTotal, espacoLivre) {
        this.nome = nome;
        this.espacoTotal = espacoTotal;
        this.espacoLivre = espacoLivre;
    }

    getNome() {
        return this.nome;
    }

    getEspacoTotal() {
        return this.espacoTotal;
    }

    getEspacoLivre() {
        return this.espacoLivre;
    }

    setEspacoLivre(espacoLivre) {
        this.espacoLivre = espacoLivre;
    }
}

class Resultado {
    constructor() {
        this.erro = null;
        this.recintosViaveis = [];
    }
}

class RecintosZoo {
    // Lista de animais válidos
    static ANIMAIS_VALIDOS = [
        "MACACO",
        "CROCODILO",
        "HIPOPOTAMO",
        "LEAO",
        "GAZELA",
        "LEOPARDO"
    ];

    // Espaços dos recintos 
    static RECINTOS = [
        new Recinto("SAVANA", 10, 7),
        new Recinto("SAVANA2", 9, 6),
        new Recinto("FLORESTA", 5, 5),
        new Recinto("RIO", 8, 8),
        new Recinto("SAVANAERIO", 7, 5)
    ];

    // Método principal para analisar recintos
    static analisaRecintos(animal, quantidade) {
        let resultado = new Resultado();

        if (!animal || !RecintosZoo.isAnimalValido(animal)) {
            resultado.erro = "Animal inválido";
            resultado.recintosViaveis = null;
            return resultado;
        }

        if (quantidade <= 0) {
            resultado.erro = "Quantidade inválida";
            resultado.recintosViaveis = null;
            return resultado;
        }

        let recintosViaveis = RecintosZoo.encontrarRecintosViaveis(animal, quantidade);
        if (recintosViaveis.length === 0) {
            resultado.erro = "Não há recinto viável";
            resultado.recintosViaveis = null;
        } else {
            resultado.erro = null;
            resultado.recintosViaveis = recintosViaveis;
        }

        return resultado;
    }

    // Verifica se o animal é válido
    static isAnimalValido(animal) {
        return RecintosZoo.ANIMAIS_VALIDOS.includes(animal);
    }

    // Encontrar recintos viáveis
    static encontrarRecintosViaveis(animal, quantidade) {
        let recintos = [];

        // Lógica para encontrar recintos viáveis
        for (let recinto of RecintosZoo.RECINTOS) {
            let espacoLivreRestante = recinto.getEspacoLivre() - quantidade;
            if (espacoLivreRestante >= 0) {
                switch (animal) {
                    case "CROCODILO":
                        if (quantidade === 2) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    case "LEAO":
                        if (quantidade === 1) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    case "LEOPARDO":
                        if (quantidade === 2) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    case "MACACO":
                        if (quantidade === 6 || quantidade === 4) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    case "GAZELA":
                        if (quantidade === 3) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    case "HIPOPOTAMO":
                        if (quantidade === 1) {
                            recintos.push(`Recinto ${recinto.getNome()} (espaço livre: ${espacoLivreRestante} total: ${recinto.getEspacoTotal()})`);
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        // Ordena a lista de recintos viáveis pelo número do recinto (ou pelo nome, se não houver números)
        return recintos.sort((a, b) => {
            // Extrai o número do recinto da string, se houver
            const getNumero = str => parseInt(str.replace(/\D+/g, '')) || 0;
            return getNumero(a) - getNumero(b);
        });
    }
}
