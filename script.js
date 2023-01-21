const form = document.querySelector("#form-habits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")

//Monitora os componentes e vê se algo mudou para executar uma função
button.addEventListener("click", add)
form.addEventListener("change", save)

function add() {
  //new Date é uma biblioteca já existente no js, e o slice é uma funcionalidade
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)

  //if sempre checa se está em true, caso não for especificado
  if (dayExists) {
    alert("Dia já incluso ❌")
    return
  }

  alert("Dia inserido com sucesso ✅")
  nlwSetup.addDay(today)
}

function save() {
  //localStorage é modo de guardar as coisas no navegador, tipo cookie. O JSON.stringify serve pra transformar um objeto em string para ser salva pelo localstorage, que só aceita strings para salvar
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
}

//Aqui o parse torna uma string em objeto novamente. Depois a gente usa a chave criada antes para buscar os dados salvos e utiliza-los no formato de objeto
//O sinal || representa ou. No caso, a primeira vez que a aplicação for executada vai dar erro, pq o localstorage tá vazio. Então o const vai pegar o conjunto vazio para usar no data
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
nlwSetup.load()
