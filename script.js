function isGraphable(s){
    let calculator = Desmos.GraphingCalculator();
    calculator.setExpression({ id: 'graph1', latex: s});
    calculator.observe('expressionAnalysis', function() {
        let analysis = calculator.expressionAnalysis["graph1"];
        return analysis.isGraphable;
    });
}

function getGraphableParts(s){
    // to be implemented 
}

getGraphable("x=7");



doc = {
    typing: true,
    selection,
    getSelectionText: function () {
        let text = "";
        let activeEl = document.activeElement;
        let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (activeElTagName == "textarea") {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        }
        return text;
    }
}
$textArea = $('#textArea');
$textArea.on('mouseup', 'keyup', function(e) {
    if(typingMode){
        doc.selection  = getSelectionText();
    }
});

$textArea.on('input', ()=>{
    let prevText = text = $textArea.value.slice(0, $textArea.selectionStart);

    const patterns = [
        [/(-|*)( |\t)$/, ()=>{
            
        }],
        [/`(la)?tex$/, ()=>{
            
        }],
        [/'img$/, ()=>{
            
        }],
        [/1(\)|.)$/, ()=>{
            
        }],
        [/1(\)|.)$/, ()=>{
            
        }],
        [/'(b|bold|strong)$/, ()=>{
            
        }],
        [/'(i|em|italics?)$/, ()=>{
            
        }],
        [/'(u|underline)$/, ()=>{
            
        }],
        [/'code$/, ()=>{
            
        }],
        [/'table$/, ()=>{
            
        }],
        [/'check(box)?$/, ()=>{
            
        }],
        [/'url$/, ()=>{
            
        }],
        [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, (url)=>{
            
        }]
    ];
    for(pattern of patterns){
        const mathch = prevText.match(pattern[0]);
        if(match){
            pattern[1](match);
        }
    }
});

// const keywords =    ["e", "pi", 
//                     "+", "-", "*", "/", "^",
//                     "sin", "cos", "tan", "cot", "sec", "csc",
//                     "arcsin", "arccos", "arctan", "arccot", "arcsec", "arccsc",
//                     "ln", "log", "sqrt",
//                     "x", "y"
//                     ];

// function getLatexParts(s){
//     s.includes("=")
// }



document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (event.ctrlKey) {
    // event.key is not 'Control' (different key is pressed),
    // event.ctrlKey true if Ctrl key is pressed at the same time.
    console.log(`Combination of ctrlKey + ${keyName}`);
  } else if (event.altKey){
    console.log(`Cosmbination of altKey + ${keyName}`);
  } else {
    console.log(`Key pressed ${keyName}`);
  }
});

