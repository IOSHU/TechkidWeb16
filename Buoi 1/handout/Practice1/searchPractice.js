'use strict'

function search(input, target) {
  for(var i=0;i<input.length;i++){
      if(target==input[i]) return i;
  }
  return -1
 // return  input.indexOf(target);  // Remove this line and change to your own algorithm
}

module.exports = search
