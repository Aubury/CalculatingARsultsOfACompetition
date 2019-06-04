
let thText = ['№','Команда/ участник','ПІБ Участників','Місто',
               'Організація','Тренер','Суддя-1','Суддя-2','Суддя-3','Суддя-4','Суддя-5','Суддя-6','Штраф','Бал'],
    color = '',cell = '',  cellText = ' ', tablesMass = [],  number = 1,  type_programm ='', age_category ='',
    // cellId = ' ',button = '',
   // tables = document.querySelectorAll('table'),// randomColor = Math.floor(Math.random()*16777215).toString(16),
   // body = document.getElementsByTagName('body')[0],
    footer = document.querySelector('footer');

//------------------------------------------------------------ 
    const form = {

        programmType : document.getElementById('programm'),
        ageType  : document.getElementById('agetype'),
        create   : document.getElementById('create')
    }
//--------------------------------------------------------------   
    function readData(){

        let data = {
       
            programm : form.programmType.value,
            agetype  : form.ageType.value,
            teams    : 2,
            rowLength: 14,
            color    : SetColor(),
            tdtextValue: []
          
        };
    
        form.programmType.value = '';
        form.ageType.value = '';
    
        return data;
    }

//===================================================================================================
form.create.addEventListener('click', controller);
//====================================================================================================
function controller(ev){

    let obj = readData(ev);

    generate_table(obj);

    tablesMass.push(obj);

    window.localStorage.setItem('tablesMass',JSON.stringify(tablesMass));

}
//=================================changeAmoundOfTeams ============================================
function cangeTeams(type, age, data){

    let storageMass = JSON.parse(window.localStorage.getItem('tablesMass'));

    let massIndex = storageMass.findIndex((i=>i.programm == type && i.agetype == age));

    storageMass[massIndex].teams++;
    storageMass[massIndex].tdtextValue.push(data);

    window.localStorage.setItem('tablesMass', JSON.stringify(storageMass));
}

//=======================================================================================================
function initMemory(){

     let Mass = window.localStorage.getItem('tablesMass');

    if(Mass == null){
     
        window.localStorage.setItem('tablesMass', JSON.stringify(tablesMass)); 

    }else{
        
        tablesMass = JSON.parse(Mass); 

        for(let i  = 0; i < tablesMass.length; i++){
            
            generate_table(tablesMass[i]);
        }
    
    }
}

//====================== Create the Table ================================================================
function generate_table(e) {

    this.type_programm = e.programm;
    this.age_category = e.agetype;
    this.teams = e.teams;
    this.rowLength = e.rowLength,
    this.tdtextValue = e.tdtextValue;
    let tables = document.querySelectorAll('table');

   
    let divClassInput = document.getElementsByClassName('row justify-content-around h3 font-italic border-top border-bottom')[0],
        table = document.createElement('table'),
        tbody = document.createElement('tbody');
        

        table.setAttribute('id', this.type_programm + "_" + this.age_category);
        table.setAttribute.margin = "20px auto 50px";
        footer.setAttribute('class','hide');
        
    

    for(let i = 0; i < this.teams; i++){

        let row = document.createElement('tr');
        if(this.tdtextValue[i] == null){
        
                this.tdtextValue.push([]);
                this.tdtextValue[i].push(new Array(this.rowLength));
        
        }

        for (let j = 0; j < this.rowLength; j++){

                    if( i == 0){

                        cell = document.createElement('th');
                        cellText = document.createTextNode(thText[j]);
                        cell.appendChild(cellText);

                    } else {

                        cell = document.createElement('td');

                        if( i > 0 && j == 0){

                            ( i==1 && tables.length == 0 ) ? cellText = document.createTextNode(number) : cellText = document.createTextNode(++number);
                            cell.appendChild(cellText);

                         }else if(j == 2){

                            let input = document.createElement('input');
                                   ol = document.createElement('ol'),
                     
                                input.setAttribute('type','text');
                                input.classList.add('tdInput');
                                input.classList.add('hide');
                                cell.appendChild(ol);
                                cell.appendChild(input);
        
                         }else if(j==13) {

                            let p = document.createElement('p');
                                 cell.appendChild(p);

                        }else {

                            let input = document.createElement('input');
                                   p = document.createElement('p'),
                     
                                input.setAttribute('type','text');
                                input.classList.add('tdInput');
                                input.classList.add('hide');
                                cell.appendChild(p);
                                cell.appendChild(input);
                         }

                    }
            if(i === 0 || j===0){

                this.tdtextValue[i][j] = cell.innerText;

            }else if( i > 0 && j > 0 && this.tdtextValue[i][j]  != null){

                cell.firstElementChild.innerHTML = this.tdtextValue[i][j];

            }else{

                this.tdtextValue[i][j] = cell.firstElementChild.innerHTML;
            }

            row.appendChild(cell);
           
        }
        
        row.style.backgroundColor = e.color;

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    divClassInput.insertAdjacentElement("beforebegin", table);

    divClassInput.style.margin = '15% auto';
    divClassInput.style.borderTop = '5px solid black';
    
    let new_h1 = document.createElement('h1');
    new_h1.style.margin = '20px';
    new_h1.style.textAlign = 'center';
    new_h1.style.boxShadow = '0 3px 60px 10px rgb(120, 120, 124)';
    new_h1.style.backgroundColor = tbody.lastChild.style.backgroundColor;
    new_h1.innerHTML = this.type_programm + '    ' + this.age_category;

    table.insertAdjacentElement("beforebegin",new_h1);

    let divButtons = document.createElement('div');
        divButtons.classList.add('buttons');
        table.insertAdjacentElement('afterend',divButtons);

   let  addButton = document.createElement('button');
        addButton.setAttribute('type','button');
          //-----------------addTeam----------------------------------------------------------
        addButton.addEventListener('click', function(){

                        let _tbody = table.lastChild,
                            row = document.createElement('tr'),
                            _tdtextValue = [],
                            allRows = tbody.rows.length,
                            allCells = 0,
                            num = 0;

                        _tdtextValue.push([]);

                        for(let i = 0; i < allRows; i++) {

                            allCells = tbody.rows.item(i).cells;
                            num = allCells.item(0).innerText;

                        }
                        for (i = 0; i < allCells.length; i++){

                            cell = document.createElement('td');

                            if (i == 0){

                                let cellText = document.createTextNode(++num);
                                cell.appendChild(cellText);
                            }else if( i == 2){

                                let input = document.createElement('input');
                                       ol = document.createElement('ol'),

                                    input.setAttribute('type','text');
                                    input.classList.add('tdInput');
                                    input.classList.add('hide');
                                    cell.appendChild(ol);
                                    cell.appendChild(input);

                             }else {

                                let input = document.createElement('input');
                                       p = document.createElement('p'),

                                    input.setAttribute('type','text');
                                    input.classList.add('tdInput');
                                    input.classList.add('hide');
                                    cell.appendChild(p);
                                    cell.appendChild(input);
                             }



                            row.appendChild(cell);
                            if(i===0){
                                _tdtextValue[i] = cell.innerText;

                            }else{

                                _tdtextValue[i] = cell.firstElementChild.innerHTML;
                            }

                        }

                        color = _tbody.lastChild.style.backgroundColor;
                        row.style.backgroundColor = color;
                        _tbody.appendChild(row);

                        let name = table.id.split('_');
                        cangeTeams(name[0], name[1], _tdtextValue);


            });
            //--------------------------------------------------------------------------------------
        addButton.setAttribute('class','btn btn-primary btn-lg');
        addButton.style.margin = '20px';
        addButton.innerText = 'Додати команду';
        //----------------------PrintTable--------------------------------------------------------
       let printButton = document.createElement('button');
           printButton.setAttribute('type','button');
           printButton.setAttribute('class','btn btn-primary btn-lg');
           printButton.style.margin = '20px';
           printButton.innerText = 'Роздрук';

           printButton.addEventListener('click', function(){
               let storageMass = JSON.parse ( window.localStorage.getItem ( 'tablesMass' ) ),
                   _table = this.parentElement.previousElementSibling.id.split('_'),
                   massIndex = storageMass.findIndex ( i => i.programm == _table[0] && i.agetype == _table[1] );
               printTable(massIndex, this.parentElement.previousElementSibling.id)
           });

    //----------------SortTeamsWinner-----------------------------------------------------
       let sortButton =   document.createElement('button');
        sortButton.setAttribute('type','button');


        sortButton.addEventListener('click', function() {

            let storageMass = JSON.parse ( window.localStorage.getItem ( 'tablesMass' ) ),
                _table = this.parentElement.previousElementSibling.id.split('_'),
                massIndex = storageMass.findIndex ( i => i.programm == _table[0] && i.agetype == _table[1] );
            sortPoints ( massIndex );
        });
        sortButton.setAttribute('class','btn btn-primary btn-lg');
        sortButton.style.margin = '20px';
        sortButton.innerText = 'Знайти переможця';

    divButtons.appendChild(addButton);
    divButtons.appendChild(printButton);
    divButtons.appendChild(sortButton);


}

//================= Generating random colors ============================================
function getRandomInt(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;
}
function SetColor(){

    let r = getRandomInt(200,255);
    let g = getRandomInt(200,255);
    let b = getRandomInt(200,255);

    return "rgb(" + r + "," + g + "," + b + ")";

}
initMemory();
//========================Fill up td=================================================
document.addEventListener('click', function(event){
     
     if(event.target.tagName === 'TD'){
           
        let storageMass = JSON.parse(window.localStorage.getItem('tablesMass')),
            name = event.target.parentElement.parentElement.parentElement.id.split('_'),
            tbody = event.target.parentElement.parentElement,
            massIndex = storageMass.findIndex(i=>i.programm == name[0] && i.agetype == name[1]),
            index = 1, rowIndex = 1;
           
            for(let i = 1; i < tbody.rows.length; i++){

                for(let j = 1; j < tbody.rows[i].cells.length; j++){

                     if(tbody.rows[i] == event.target.parentElement){
                          
                          rowIndex = i;
                        }
                     if(tbody.rows[i].cells[j] == event.target){
                          
                        index = j;
                        break;
                    }
                }
            }

        let item =  tbody.rows[rowIndex].cells[index],
            itemParent = tbody.rows[rowIndex];
       
        let  input =  item.querySelector('input');
             input.classList.remove('hide');
             input.focus();

        input.addEventListener('keypress', function(e){
    
                if(e.keyCode === 13){
                              if(index === 2){
                                  
                              let ol =  item.querySelector('ol'),
                                  li = document.createElement('li');

                                  li.innerHTML = input.value;
                                  ol.appendChild(li);

                              }else{

                              let  p =  item.querySelector('p');
                                   p.innerHTML = input.value;

                              }

                    input.value = '';

                    let  len = storageMass[massIndex].tdtextValue[rowIndex].length;
                    tbody.rows[rowIndex].lastChild.firstElementChild.innerHTML = point(itemParent);

                    storageMass[massIndex].tdtextValue[rowIndex][index] = item.firstElementChild.innerHTML;
                    storageMass[massIndex].tdtextValue[rowIndex][len-1] = tbody.rows[rowIndex].lastElementChild.firstElementChild.innerHTML;
                    window.localStorage.setItem('tablesMass', JSON.stringify(storageMass));
                   return;
                }
             });

         input.onblur = function(){
             input.classList.add('hide');
        };

        
    }

});
//============================End point=============================================
function point(data){
   
    let point = 0;

    for(let i = 6; i < 12; i++){
      
        if(data.cells[i].firstElementChild != null){

            point += (data.cells[i].firstElementChild.innerText)*1;
        }
    }

    if(data.cells[12].firstElementChild.innerText != ''){

        point -= (data.cells[12].firstElementChild.innerText)*1;
    }
    return point;
}

//===========================Sort=================================================
function sortPoints(index){

    let storageMass = JSON.parse(window.localStorage.getItem('tablesMass')),
         lastChild = storageMass[index].tdtextValue[1].length-1 , reg = /(\d+)/g,
        massTd = [];

        for(let i = 0; i < storageMass[index].tdtextValue.length; i++){

            massTd[i] = storageMass[index].tdtextValue[i+1];
        }

        massTd.sort(function(a,b){

            return b[lastChild].match(reg) - a[lastChild].match(reg);

    });

     for(let i = 1; i < storageMass[index].tdtextValue.length; i++){

         storageMass[index].tdtextValue[i] = massTd[i-1];

     }
    window.localStorage.setItem('tablesMass', JSON.stringify(storageMass));

    window.location.reload();

}
//===========================PrintTable==============================================

function printTable(tableIndex, Id) {

    let storageMass = JSON.parse(window.localStorage.getItem('tablesMass')),
        massData = storageMass[tableIndex].tdtextValue,
        table = document.createElement('table'),
        tbody = document.createElement('tbody'),
        num = 1;

    for(let i = 0; i < massData.length; i++){

        let row = document.createElement('tr');

        for (let j = 0; j < massData[i].length-8; j++){

            if(i==0){
                    cell = document.createElement('th');
                    if(j==0){
                        cellText = document.createTextNode('Місце');
                    } else {
                        (j != 0 && j < massData[i].length - 9) ? cellText = document.createTextNode ( massData[i][j] ) :
                            cellText = document.createTextNode ( massData[i][massData[i].length - 1] );
                    }
            } else{

                cell = document.createElement('td');
                if( j == 0 && i > 0){

                     if(i == 1) {
                         cellText = document.createTextNode(num);

                     }else {
                         massData[i][massData[i].length - 1] == massData[i-1][massData[i].length - 1]  ?   cellText = document.createTextNode ( massData[i-1][j] ) :
                             cellText = document.createTextNode (++num );

                     }
                }else  if( j==2 ) {
                    cellText = document.createElement('ol');
                     cellText.innerHTML = "<ol>"+massData[i][j]+"</ol>";

                } else {
                    ( j != 2 && j !=0 && j < massData[i].length - 9) ? cellText = document.createTextNode ( massData[i][j] ) :
                        cellText = document.createTextNode ( massData[i][massData[i].length - 1] );
                }

            }
            cell.appendChild(cellText);
            row.appendChild(cell);

        }

     tbody.appendChild(row);
    }
    table.appendChild(tbody);

    let new_h1 = document.createElement('h1');
    new_h1.style.margin = '20px';
    new_h1.style.textAlign = 'center';
    new_h1.innerHTML = Id;

     let div = document.createElement('div');
     div.appendChild(new_h1);
     div.appendChild(table);


    let style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "ol {padding: .8em; counter-reset:item; text-align: left; }";
    style = style + "</style>";


    let win = window.open('');
        win.document.write('<html><head>');
        win.document.write('<title>TablePrintePDF</title>');
        win.document.write(style);
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(div.outerHTML);
        win.document.write('</body></html>');
        win.print();
        win.close();

}



