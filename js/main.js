var lista = [
    {
        "desc":"rice",      
        "amount":"1",
        "value":"5.40"
    },
    {
        "desc":"beer",      
        "amount":"12",
        "value":"1.99"
    },
    {
        "desc":"meat",      
        "amount":"1",
        "value":"15.00"
    } 
];

function getTotal(list) {
    var total = 0;
    for(var key in list) {
        total += list[key].value * list[key].amount;
    
    }
    document.getElementById("totalValue").innerHTML = formatValue(total)
}

function setList(list) {
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead>'

    for (var key in list) {
        table += '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount)+'</td><td>'+formatValue(list[key].amount * list[key].value)+'</td><td><button class="btn btn-primary" onclick="setUpdate('+key+')";>Edit</button> | <button class= "btn btn-danger" onclick="deleteData('+key+');">Delete</button></td></tr>';
    }

    table += '</tbody>'

    document.getElementById("listTable").innerHTML = table;

    getTotal(lista);
    saveListStorage(list);
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "$ " + str;

    return str;

}

function formatAmount(amount) {
    return parseInt(amount);

}

function addData() {

    if (!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    lista.unshift({"desc":desc, "amount":amount, "value":value});

    setList(lista)
    resetForm()
}

function setUpdate(id) {
    var obj = lista[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block"
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">'
}

function resetForm() {
  

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none"
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData() {

    if (!validation()){
        return;
    }
    

    var id = document.getElementById("idUpdate").value;

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    lista[id] = {
        "desc":desc,      
        "amount":amount,
        "value":value
    }
    resetForm();
    setList(lista);
    
}

function deleteData(id) {
    if (confirm("Confirma deletar Item " + lista[id].desc + "?")){
        if (id === lista.length - 1) {
            lista.pop();
        } else if(id === 0) {
            lista.shift();
        } else {
            var arrAuxIni = lista.slice(0, id);
            var arrAuxEnd = lista.slice(id + 1);
            lista = arrAuxIni.concat(arrAuxEnd);
        }
        setList(lista)
    }
}


function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if (desc === "") {
        errors += '<p>Fill out Description</p>';
    }

    if(amount === "") {
        errors += '<p>Fill out a quantity</p>';
    }else if (amount != parseInt(amount)) {
        errors += '<p>Fill out a valid amount</p>';
    }

    if(value === "") {
        errors += '<p>Fill out a value</p>';
    }else if (value != parseFloat(value)) {
        errors += '<p>Fill out a valid value</p>';
    }

    if (errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").innerHTML = '<div class="alert alert-danger" role="alert">' + errors;
        return 0;
    } else {
        return 1;
    }
}

function deleteList() {
    if (confirm("Deseja mesmo deletar essa Lista? ")){
        lista = [];
        setList(lista)
    }
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var testList = localStorage.getItem("list");

    if (testList) {
        lista = JSON.parse(testList);
    }

    setList(lista)
}


initListStorage();