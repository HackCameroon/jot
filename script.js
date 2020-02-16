rangy.init();

let spanHighlighter = rangy.createHighlighter();
let divHighlighter = rangy.createHighlighter();
let spanApplier = rangy.createClassApplier('span');
let divApplier = rangy.createClassApplier('div');

spanHighlighter.addClassApplier(spanApplier);
divHighlighter.addClassApplier(divHighlighter);

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

//getGraphable("x=7");



let doc = {
    typing: true,
    selection: null,
    $textArea: $('#textArea'),
    bulletTypes: {
        BULLET: 0,
        ROMAN: 1,
        LETTER: 2,
        NUM: 3
    },
    toggle: (className)=>{

    },
    makeItalic: ()=>{
        spanHighlighter.highlight('italic');
    },

    makeBold: ()=>{
        spanHighlighter.highlight('bold');
    },

    highlight: ()=>{
        spanHighlighter.highlight('highlight');
    },
    makeStrikethrough: ()=>{
        spanHighlighter.highlight('strikethrough');
    },
    addCheckBox: ()=>{
        rangey.createRange().insertNode('<input type="checkbox">');
    },
    addUrl: (url)=>{
        spanHighlighter.highlight('bold');
    }
}

/**doc.$textArea.on('mouseup', 'keyup', function(e) {
    if(typingMode){
        doc.selection  = rangey.
    }
});**/

doc.$textArea.on('input', ()=>{
    const cursorPos = doc.$textArea.selectionStart;
    let currText = doc.$textArea.val();
    let prevText = currText.slice(0, cursorPos);
    
    console.log(cursorPos);
    console.log(currText);
    console.log(prevText);


    const patterns = [
        [/(^|[\r\n])(-|\*)( |\t)$/i, ()=>{
            doc.makeBullet(doc.bulletTypes.PLAIN);
        }],
        [/`(la)?tex$/, doc.makeTex],
        [/'img$/, doc.insertImg],
        [/(^|[\r\n])1(\)|.)$/i, ()=>{
            doc.makeBullet(doc.bulletTypes.NUM);
        }],
        [/(^|[\r\n])i(\)|.)$/i, ()=>{
            doc.makeBullet(doc.bulletTypes.ROMAN);
        }],
        [/(^|[\r\n])a(\)|.)$/i, ()=>{
            doc.makeBullet(doc.bulletTypes.LETTER);
        }],
        [/'(b|(bold)|(strong))$/i, doc.makeBold],
        [/'(i|(em)|(italics?))$/i, doc.makeItalic],
        [/'(u(nderline)?)$/i, doc.underline],
        [/'c(ode)?$/i, doc.addCode],
        [/'table$/i, doc.addTable],
        [/'check(box)?$/i, doc.addCheckBox],
        [/'h(ighlight)?$/i, doc.addUrl],
        [/'url$/i, doc.addUrl],
        [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, (url)=>{
            doc.addUrl(url);
        }]
    ];
    for(pattern of patterns){
        const matches = pattern[0].exec(prevText);
        console.log(prevText);
        console.log(matches);
        if(matches){
            console.log('matched');
            const match = matches[0];
            pattern[1](match);
            currText = currText.slice;
            doc.$textArea.value = prevtext.slice(0, match.firstIndex) + currText.slice(cursorPos);
            return;
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
    console.log(`Combination of altKey + ${keyName}`);
  } else {
    console.log(`Key pressed ${keyName}`);
  }
});

document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  // As the user releases the Ctrl key,
  // so event.ctrlKey is false.
  if (keyName === 'Control') {
    console.log('Control key was released');
  }
});

