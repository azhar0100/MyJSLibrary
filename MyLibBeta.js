var MyLib={
	/*
	*myLib is a bean style object that contains many useful functions
	*/



	table:{
		/*
		*Table is an object that will
		*/

		HTML:{

			head:{
				DOM :  document.createElement('thead')               ,
				rows: [/*This  must   contain   <tr>     elements*/] ,
				cell: [/*This 2d array must contain <td> elements*/] ,
				present:false,

				set : function(DOM,rows,cell,present){
					this.DOM    = DOM     ;
					this.rows   = rows    ;
					this.cell   = cell    ;
					this.present= present ;
				}

			},
			body:{
				DOM :  document.createElement('tbody')               ,
				rows: [/*This  must   contain   <tr>     elements*/] ,
				cell: [/*This 2d array must contain <td> elements*/] ,
				present:false,

				set : function(DOM,rows,cell,present){
					this.DOM    = DOM     ;
					this.rows   = rows    ;
					this.cell   = cell    ;
					this.present= present ;
				}

			},
			foot:{
				DOM :  document.createElement('tfoot')               ,
				rows: [/*This  must   contain   <tr>     elements*/] ,
				cell: [/*This 2d array must contain <td> elements*/] ,
				present:false,

				set : function(DOM,rows,cell,present){
					this.DOM    = DOM     ;
					this.rows   = rows    ;
					this.cell   = cell    ;
					this.present= present ;
				}

			},
			
			tabl:{
				DOM :document.createElement('table'),
			},

			set : function (table,wellFormed){
				/*
				*This sets the table as a DOM object
				*	//table is the HTML table//
				*	//wellFormed is a boolean specifying that the table
				* 	has proper thead,tbody and tfoot//
				*/
				if( !( isElement(table) && table.tagName === 'table' ) )
					throw new Error("Not a table");

				(function(){
					if(wellFormed){
				})();

			},
		},


		setArrayOfObjects:function(displayObj,displayOrder,displayHeadings){

			var typeOfObj=myLib.typeOf(displayObj);//stores the type in the variable

			if(typeOfObj !== "Array"){
				throw new Error('Type mismatch!displayObj is not an aray')
			}
					

			var objectKeys = []
			if(arguments.length === 2){
				var objectKeys = displayOrder;
			}else{
				objectKeys=(
					function (){
						var objectKeys=[];
						var keys=[];
				
						for (var i = 0; i < displayObj.length; i++) {
	
							keys[i]=[];
							keys[i]=Object.keys(displayObj[i]);
				
						}//for loop
						for (var i = 0; i < displayObj.length; i++) {
							for (var j = 0; j < keys.length; j++) {
								for (var k = 0; k < keys[i].length; k++) {
									if(!(myLib.arrays.isInArray(objectKeys,(keys[j][k])))){
										objectKeys[objectKeys.length]=keys[j][k];
									}
								}
							}
						}//for loop
						return objectKeys;
					}
				)
			}


			for (var i = 0; i < displayObj.length; i++) {
				cell[i]=[];

				for (var j = 0; j < objectKeys.length; j++) {

					cell[i][j]=document.createElement("td");

					if(displayObj[i].hasOwnProperty(objectKeys[j])){

						cell[i][j].innerHTML=displayObj[i][objectKeys[j]];

					}else{

						cell[i][j].innerHTML="";

					}
				}

			}

			
			if(arguments.length===3){
				theadArray=displayHeadings;
			}
			else{
				theadArray=objectKeys;
			}
			

			this.thead=(function(){
				var th_row=document.createElement("tr")
				for (var i = 0; i < theadArray.length; i++) {
					th[i]=document.createElement('th');
					th[i].innerHTML=theadArray[i];
					th_row.appendChild(th[i]);
				}
				this.thead.appendChild(th_row);
				return this.thead;
			});

			for (var i = 0; i < cell.length; i++) {

				row[i]=document.createElement("tr");

				for (var j = 0; j < cell[i].length; j++)
					row[i].appendChild(cell[i][j]);
				
				this.tbody.appendChild(row[i]);
			}

			this.table.appendChild(thead);
			this.table.appendChild(tbody);
			return this.table;
		},

		displayArrayofArraysInTable:function(displayObj){
			if(this.arrays.isSameType(displayObj)){
				if(this.typeOf(displayObj[0])==="array"){
					//if the arrays are of same type

					//executes if the table is horizontal

					for (var i = 0; i < displayObj.length; i++) {

						row[i]=document.createElement("tr");
						var childObj=displayObj[i];

						for (var j = 0; j < displayObj[i].length; j++) {

							cel[j]=document.createElement("td");
							cel[j].innerHTML=childObj[j];
							row[i].appendChild(cel[j])

						}

						tbody.appendChild(row[i]);
					}

					table.appendChild(tbody);
					return table;
				}
			}
		},

		mathTranspose:function(testMat){
			var returnMat=[];
			for (var i = 0; i < testMat.length; i++) {
				returnMat[i]=[];
				for (var j = 0; j < testMat[i].length; j++) {
					returnMat[j][i]=testMat[i][j];
				}
			}
			return returnMat;
		},

		displayArrayInTableRow:function(displayObj){
			//this function is the root of diplayInTable
			//displayObj and displayOrder are the same
			var tableRow=document.createElement("tr");
			var tableCel=[];
			for (var i = 0; i < displayObj.length; i++) {
				tableCel[i]=document.createElement("td");
				if(typeOf(displayObj[i])==="object"){
					tableCel[i].innerHTML=myLib.objects.displayInObjNotation(displayObj[i]);
				}else{
					tableCel[i].innerHTML=displayObj[i];
				}
				tableRow.appendChild(tableCel[i]);
			}
			return tableRow;
		},

		transpose:function(table){
			var rows=[];
			var cell=[];
			var thead=[];
			var tbody=[];
			var tfoot=[];
			for (var i = 0; i < table.childNodes.length; i++) {
				if(table.childNodes[i].tagName==="thead"){
					thead[thead.length]=table.childNodes[i];
					for (var j = 0; i < thead.length; j++) {
						rows[rows.length]=thead[j];
					}
				}else if(table.childNodes[i].tagName==="tbody"){
					tbody[tbody.length]=table.childNodes[i];
					for (var j = 0; i < tbody.length; j++) {
						rows[rows.length]=tbody[j];
					}
				}else if(table.childNodes[i].tagName==="tfoot"){
					tfoot[tfoot.length]=table.childNodes[i];
					for (var j = 0; i < tfoot.length; j++) {
						rows[rows.length]=tfoot[j];
					}			
				}else{
					rows[rows.length]=table.childNodes[i];
				}
			}
			for (var i = 0; i < rows.length; i++) {
				cell[i]=[];
				for (var j = 0; j < rows[i].childNodes.length; j++) {
					cell[i][j]=rows[i].childNodes[j];
				}
			}
			var transposed=this.math.transpose(cell);
			var newRows=[];
			for (var i = 0; i < transposed.length; i++) {
				newRows[i]=document.createElement("tr");
				for (var j = 0; j < transposed[i].length; j++) {
					newRows[i].appendChild(transposed[i][j]);
				}
			}
			var newTable=document.createElement("table");
			for (var i = 0; i < newRows.length; i++) {
				newTable.appendChild(newRows[i]);
			}
			return newTable;
		},

	},

	arrays:{

		typeOfArray:function (testArray){
			var typeArray=[];
			for(var i=0;i<testArray.length;i++){
				typeArray[i]=myLib.typeOf(testArray[i]);
			}
			return typeArray;
		},

		isSameType:function(testArray){
			var typeArray=this.typeOfArray(testArray);
			return (this.isSameValues(typeArray)); 
		},

		isSameValues:function(testArray){
			for(var i=0;i<testArray.length;i++){
				if(testArray[i] !== testArray[0]){
					return false;
				}
			}
			return true;	
		},

		maxArrayInTheArray:function(testArray){
			var lengthArray=[];
			for (var i = 0; i < testArray.length; i++) {
				lengthArray[i]=testArray[i].length;
			}
			var max=Math.max.apply(Math,lengthArray);
			return max;
		},

		isInArray:function(testArray,testVal){
			return (testArray.indexOf(testVal)>-1)
		},

	},


	typeOf : function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	},


	Math:{

		convertDegreesToRadians : function(degrees){
			return ((Math.PI/180)*degrees);
		},


		convertRadiansToDegrees : function(radians){
			return ((180/Math.Pi)*radians);
		},

	},
	isElement:function(obj) {
		try {
		//Using W3 DOM2 (works for FF, Opera and Chrom)
		return obj instanceof HTMLElement;
		}
		catch(e){
		//Browsers not supporting W3 DOM2 don't have HTMLElement and
		//an exception is thrown and we end up here. Testing some
		//properties that all elements have. (works on IE7)
		return (typeof obj==="object") &&
		  (obj.nodeType===1) && (typeof obj.style === "object") &&
		  (typeof obj.ownerDocument ==="object");
		}
	},
};
