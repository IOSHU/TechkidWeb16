'use strict'

function sort(input) {
  for(var i=0;i<input.length-1;i++){
    for(var j=i+1;j<input.length;j++){
      if(input[i]> input[j]) {
          var temp;
          temp=input[i];
          input[i]=input[j];
          input[j]=temp;
      } 
    }
  }
  return input
 // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
}

module.exports = sort
